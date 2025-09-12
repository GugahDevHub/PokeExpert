import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Zap, Shield, Heart } from "lucide-react";

const popularPokemon = [
  { name: "Pikachu", type: "Elétrico", generation: "1ª Gen", color: "electric" },
  { name: "Charizard", type: "Fogo/Voador", generation: "1ª Gen", color: "pokeball" },
  { name: "Mewtwo", type: "Psíquico", generation: "1ª Gen", color: "psychic" },
  { name: "Lucario", type: "Lutador/Aço", generation: "4ª Gen", color: "water" },
  { name: "Garchomp", type: "Dragão/Terra", generation: "4ª Gen", color: "grass" },
  { name: "Rayquaza", type: "Dragão/Voador", generation: "3ª Gen", color: "electric" },
];

const quickSearches = [
  "Pokémon mais fortes",
  "Evoluções por pedra",
  "Tipos efetivos contra Dragão",
  "Melhores moves físicos",
  "Pokémon lendários Gen 1",
  "Estratégias VGC",
];

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (query?: string) => {
    const searchQuery = query || searchTerm;
    if (!searchQuery.trim()) return;
    
    // Simular busca - em um app real, isso faria uma busca na API
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      // Simular preenchimento do input do chat
      setTimeout(() => {
        const chatInput = chatSection.querySelector('input') as HTMLInputElement;
        if (chatInput) {
          chatInput.value = searchQuery;
          chatInput.focus();
        }
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'electric':
        return 'bg-electric/10 text-electric border-electric/30 hover:bg-electric/20';
      case 'pokeball':
        return 'bg-pokeball/10 text-pokeball border-pokeball/30 hover:bg-pokeball/20';
      case 'psychic':
        return 'bg-psychic/10 text-psychic border-psychic/30 hover:bg-psychic/20';
      case 'water':
        return 'bg-water/10 text-water border-water/30 hover:bg-water/20';
      case 'grass':
        return 'bg-grass/10 text-grass border-grass/30 hover:bg-grass/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="search-section" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-water/20 text-water">Busca Inteligente</Badge>
          <h2 className="text-4xl font-bold mb-4">Encontre Qualquer Pokémon</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Busca rápida por nome, tipo, geração, habilidade ou qualquer característica. 
            Nossa IA entende o que você procura!
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex gap-3 mb-6">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: Pokémon tipo fogo da primeira geração..."
              className="text-lg py-6"
            />
            <Button 
              onClick={() => handleSearch()}
              size="lg"
              className="px-8 bg-water text-water-foreground hover:bg-water/90"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(search)}
                className="text-sm hover:bg-muted/50 transition-colors"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-electric" />
              Pokémon Populares
            </h3>
            <div className="grid gap-3">
              {popularPokemon.map((pokemon, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-md ${getColorClasses(pokemon.color)}`}
                  onClick={() => handleSearch(pokemon.name)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">{pokemon.name}</h4>
                      <p className="text-sm opacity-80">{pokemon.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pokemon.generation}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-electric" />
              Categorias Especiais
            </h3>
            <div className="space-y-4">
              <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSearch('Pokémon lendários')}>
                <div className="flex items-center mb-3">
                  <Shield className="w-8 h-8 mr-3 text-psychic" />
                  <div>
                    <h4 className="font-bold text-lg">Lendários & Míticos</h4>
                    <p className="text-sm text-muted-foreground">Criaturas raras e poderosas</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSearch('Pokémon competitivo')}>
                <div className="flex items-center mb-3">
                  <Star className="w-8 h-8 mr-3 text-water" />
                  <div>
                    <h4 className="font-bold text-lg">Meta Competitivo</h4>
                    <p className="text-sm text-muted-foreground">Estratégias e builds vencedoras</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSearch('Pokémon shinies')}>
                <div className="flex items-center mb-3">
                  <Heart className="w-8 h-8 mr-3 text-pokeball" />
                  <div>
                    <h4 className="font-bold text-lg">Shinies & Variantes</h4>
                    <p className="text-sm text-muted-foreground">Formas alternativas especiais</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;