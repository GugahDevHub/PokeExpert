import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const securityHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_REQUESTS = 10
const RATE_LIMIT_WINDOW = 60000 // 1 minute

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const clientData = rateLimitMap.get(ip)
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    return false
  }
  
  clientData.count++
  return true
}

function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required and must be a string' }
  }
  
  if (message.length > 2000) {
    return { isValid: false, error: 'Message too long (max 2000 characters)' }
  }
  
  if (message.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' }
  }
  
  // Basic content filtering for potential abuse
  const suspiciousPatterns = [
    /(?:hack|exploit|bypass|injection|xss|script)/i,
    /(?:admin|password|token|secret|key)\s*[:=]/i
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      console.warn(`Suspicious content detected from IP: ${getClientIP}`, { message: message.substring(0, 100) })
      // Don't block, just log for monitoring
      break
    }
  }
  
  return { isValid: true }
}

function logRequest(req: Request, message: string, ip: string) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] Request from ${ip}`, {
    method: req.method,
    messageLength: message.length,
    userAgent: req.headers.get('user-agent'),
  })
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const clientIP = getClientIP(req)

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`)
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.' 
        }),
        {
          status: 429,
          headers: securityHeaders,
        }
      )
    }

    const { message } = await req.json()

    // Input validation
    const validation = validateMessage(message)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          error: validation.error 
        }),
        {
          status: 400,
          headers: securityHeaders,
        }
      )
    }

    // Log the request
    logRequest(req, message, clientIP)

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured')
      throw new Error('GEMINI_API_KEY not configured')
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é o PokéExpert, um especialista apaixonado por Pokémon com conhecimento enciclopédico. Responda de forma amigável, educativa e detalhada. Seja proativo sugerindo dicas extras relevantes. Sua especialidade inclui: estatísticas, movimentos, evoluções, estratégias competitivas, lore, jogos, anime, TCG e mercadoria. Use emojis relacionados a Pokémon quando apropriado. Pergunta do usuário: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API error:', data)
      throw new Error(data.error?.message || 'API request failed')
    }

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const responseText = data.candidates[0].content.parts[0].text
      console.log(`[${new Date().toISOString()}] Successful response for ${clientIP}`, {
        responseLength: responseText.length
      })
      
      return new Response(
        JSON.stringify({ 
          response: responseText 
        }),
        {
          headers: securityHeaders,
        }
      )
    } else {
      console.error('Invalid API response structure:', data)
      throw new Error('Invalid API response')
    }

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error for ${clientIP}:`, {
      error: error.message,
      stack: error.stack
    })
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: securityHeaders,
      }
    )
  }
})