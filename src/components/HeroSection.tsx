import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search, Star, Trophy } from "lucide-react";
import heroImage from "@/assets/pokemon-hero-bg.jpg";
import pikachuAvatar from "@/assets/pikachu-avatar.jpg";

const HeroSection = () => {
  const handleStartChat = () => {
    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSearch = () => {
    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-electric/80 to-pokeball/90"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-electric/30 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-pokeball/30 animate-bounce-gentle"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-water/40 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={pikachuAvatar} 
              alt="Pokemon Expert Avatar" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl animate-glow"
            />
            <div className="absolute -bottom-2 -right-2 bg-electric text-electric-foreground rounded-full p-2">
              <Star className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-electric/20 text-electric-foreground border-electric/50">
            <Trophy className="w-4 h-4 mr-2" />
            Especialista Pokédex
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-water/20 text-water-foreground border-water/50">
            Estratégias Competitivas
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-grass/20 text-grass-foreground border-grass/50">
            TCG & Anime Expert
          </Badge>
        </div>

        {/* Main title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Seu Especialista 
          <span className="block bg-gradient-to-r from-electric to-secondary bg-clip-text text-transparent">
            Pokémon
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Conhecimento enciclopédico sobre estatísticas, movimentos, evoluções, estratégias competitivas, 
          lore, jogos, anime e TCG. Respostas detalhadas e dicas proativas para todos os níveis!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg" 
            className="text-xl px-8 py-6 bg-electric text-electric-foreground hover:bg-electric/90 shadow-[var(--shadow-electric)] transition-all duration-300 hover:scale-105"
            onClick={handleStartChat}
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Conversar Agora
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-xl px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary shadow-[var(--shadow-primary)] transition-all duration-300 hover:scale-105"
            onClick={handleQuickSearch}
          >
            <Search className="w-6 h-6 mr-3" />
            Busca Rápida
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-electric mb-2">1000+</div>
            <div className="text-white/80">Pokémon Catalogados</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-electric mb-2">24/7</div>
            <div className="text-white/80">Disponibilidade</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-electric mb-2">100%</div>
            <div className="text-white/80">Informações Precisas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;