import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, ExternalLink, Heart } from "lucide-react";

const FooterSection = () => {
  const handleStartChat = () => {
    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-water to-electric text-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Comece Agora
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Pronto para se tornar um 
            <span className="block bg-gradient-to-r from-electric to-secondary bg-clip-text text-transparent">
              Mestre Pokémon?
            </span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Faça sua primeira pergunta e descubra o poder do conhecimento especializado em Pokémon!
          </p>
          
          <Button 
            size="lg"
            onClick={handleStartChat}
            className="text-xl px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Iniciar Conversa Gratuita
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chat 24/7</h3>
            <p className="opacity-80">Disponível a qualquer hora para suas dúvidas Pokémon</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">API Gratuita</h3>
            <p className="opacity-80">Powered by Google Gemini 2.5 Flash - completamente gratuito</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Feito com ❤️</h3>
            <p className="opacity-80">Criado por fãs de Pokémon para fãs de Pokémon</p>
          </div>
        </div>

        {/* Links and Info */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold mb-2">🔥 PokéExpert</p>
              <p className="text-sm opacity-80">
                Criado em 2025 por Gustavo (GugahDevHub) com amor e dedicação para ajudar você com qualquer dúvida sobre o mundo Pokémon. Inspirado pelo desejo de estar sempre presente para sua esposa e para todos os fãs de Pokémon.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Badge variant="outline" className="border-white/30 text-white">
                Gemini 2.5 Flash
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                100% Gratuito
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                Respostas Instantâneas
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm opacity-70">
              © 2025 PokéExpert by Gustavo (GugahDevHub). Feito com React, TypeScript e muito amor por Pokémon.
            </p>
            <p className="text-xs opacity-60 mt-2">
              Pokémon é marca registrada da The Pokémon Company. Este projeto é não-oficial e educativo.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;