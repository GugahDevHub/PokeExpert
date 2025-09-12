import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import pikachuAvatar from "@/assets/pikachu-avatar.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou seu especialista Pokémon! 🔥⚡ Posso ajudar com estatísticas, movimentos, evoluções, estratégias competitivas, lore, jogos, anime, TCG e muito mais! Qual Pokémon desperta sua curiosidade hoje?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key necessária",
        description: "Por favor, insira sua chave API do Gemini 2.5 Flash",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('gemini-api-key', apiKey);
    setShowApiInput(false);
    toast({
      title: "API Key salva!",
      description: "Agora você pode conversar comigo sobre Pokémon!",
    });
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    if (!apiKey) {
      setShowApiInput(true);
      toast({
        title: "Configure sua API Key",
        description: "Insira sua chave API do Gemini para continuar",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é um especialista apaixonado por Pokémon com conhecimento enciclopédico. Responda de forma amigável, educativa e detalhada. Seja proativo sugerindo dicas extras relevantes. Sua especialidade inclui: estatísticas, movimentos, evoluções, estratégias competitivas, lore, jogos, anime, TCG e mercadoria. Use emojis relacionados a Pokémon quando apropriado. Pergunta do usuário: ${inputValue}`
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
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: data.candidates[0].content.parts[0].text,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro na comunicação",
        description: "Verifique sua conexão e API Key. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (showApiInput) {
    return (
      <section id="chat-section" className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-md">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <img 
                src={pikachuAvatar} 
                alt="Pokemon Expert" 
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Configure sua API Key</h3>
              <p className="text-muted-foreground">
                Insira sua chave API gratuita do Gemini 2.5 Flash para começar a conversar!
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Sua API Key do Gemini"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveApiKey()}
              />
              <Button onClick={saveApiKey} className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Salvar e Continuar
              </Button>
              <p className="text-xs text-muted-foreground">
                Gratuito em: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="text-primary underline">Google AI Studio</a>
              </p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="chat-section" className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-electric/20 text-electric-foreground">Chat Inteligente</Badge>
          <h2 className="text-4xl font-bold mb-4">Converse com o Especialista</h2>
          <p className="text-xl text-muted-foreground">
            Faça qualquer pergunta sobre Pokémon e receba respostas detalhadas instantaneamente!
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-2">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.isUser ? 'bg-primary text-primary-foreground' : 'bg-electric text-electric-foreground'
                }`}>
                  {message.isUser ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-electric text-electric-foreground flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-6 border-t">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre qualquer Pokémon..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-electric text-electric-foreground hover:bg-electric/90"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-muted-foreground">
                Pressione Enter para enviar
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowApiInput(true)}
                className="text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                Alterar API Key
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ChatSection;