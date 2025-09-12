import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Sword, 
  TrendingUp, 
  BookOpen, 
  Gamepad2, 
  Tv,
  CreditCard,
  ShoppingBag,
  Trophy,
  Users,
  Target,
  Zap
} from "lucide-react";

const expertiseAreas = [
  {
    title: "Estatísticas & Dados",
    description: "Base stats, IVs, EVs, nature, calculations e min-max optimization",
    icon: BarChart3,
    color: "water",
    skills: ["Damage Calculator", "IV/EV Training", "Stat Optimization", "Nature Analysis"]
  },
  {
    title: "Movimentos & Combate",
    description: "Movesets, type effectiveness, abilities, combos e power rankings",
    icon: Sword,
    color: "pokeball",
    skills: ["Move Tutor", "Type Charts", "Ability Guide", "Combat Mechanics"]
  },
  {
    title: "Evoluções & Breeding",
    description: "Evolution chains, breeding mechanics, egg groups e genetics",
    icon: TrendingUp,
    color: "grass",
    skills: ["Evolution Guide", "Breeding Calculator", "Egg Groups", "Shiny Hunting"]
  },
  {
    title: "Lore & História",
    description: "Pokédex entries, regional variants, mythology e backstories",
    icon: BookOpen,
    color: "psychic",
    skills: ["Pokédex Master", "Regional Forms", "Mythology", "Character Lore"]
  },
  {
    title: "Jogos & Mecânicas",
    description: "Game mechanics, walkthroughs, secrets e version differences",
    icon: Gamepad2,
    color: "electric",
    skills: ["Game Guide", "Mechanics Expert", "Secrets Hunter", "Version Diff"]
  },
  {
    title: "Anime & Séries",
    description: "Episodes, characters, story arcs e trivia from all seasons",
    icon: Tv,
    color: "water",
    skills: ["Episode Guide", "Character Analysis", "Story Arcs", "Trivia Master"]
  },
  {
    title: "TCG & Competitivo",
    description: "Trading Card Game, deck building, meta analysis e tournaments",
    icon: CreditCard,
    color: "pokeball",
    skills: ["Deck Builder", "Meta Analysis", "Card Values", "Tournament Guide"]
  },
  {
    title: "Mercadoria & Colecionáveis",
    description: "Products, collectibles, prices e market trends analysis",
    icon: ShoppingBag,
    color: "grass",
    skills: ["Market Guide", "Collectibles", "Price Tracker", "Authenticity"]
  }
];

const achievements = [
  { icon: Trophy, label: "Pokédex Nacional Completa", count: "1010+" },
  { icon: Users, label: "Trainers Ajudados", count: "10K+" },
  { icon: Target, label: "Accuracy Rate", count: "99.9%" },
  { icon: Zap, label: "Respostas em Tempo Real", count: "24/7" },
];

const ExpertiseSection = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'electric':
        return 'border-electric/30 hover:border-electric/50 group-hover:bg-electric/5';
      case 'pokeball':
        return 'border-pokeball/30 hover:border-pokeball/50 group-hover:bg-pokeball/5';
      case 'psychic':
        return 'border-psychic/30 hover:border-psychic/50 group-hover:bg-psychic/5';
      case 'water':
        return 'border-water/30 hover:border-water/50 group-hover:bg-water/5';
      case 'grass':
        return 'border-grass/30 hover:border-grass/50 group-hover:bg-grass/5';
      default:
        return 'border-muted';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'electric':
        return 'text-electric';
      case 'pokeball':
        return 'text-pokeball';
      case 'psychic':
        return 'text-psychic';
      case 'water':
        return 'text-water';
      case 'grass':
        return 'text-grass';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-electric/20 text-electric-foreground">Especialidades</Badge>
          <h2 className="text-4xl font-bold mb-4">Áreas de Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conhecimento profundo em todas as facetas do universo Pokémon, 
            desde mecânicas de jogo até lore detalhado e estratégias avançadas.
          </p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-6 text-center group hover:shadow-lg transition-all duration-300">
              <achievement.icon className="w-8 h-8 mx-auto mb-3 text-electric group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-primary mb-1">{achievement.count}</div>
              <div className="text-sm text-muted-foreground">{achievement.label}</div>
            </Card>
          ))}
        </div>

        {/* Expertise Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index} 
              className={`p-8 group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${getColorClasses(area.color)}`}
            >
              <div className="flex items-start mb-6">
                <div className={`p-3 rounded-2xl bg-${area.color}/10 mr-4 group-hover:scale-110 transition-transform`}>
                  <area.icon className={`w-8 h-8 ${getIconColor(area.color)}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {area.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex} 
                    variant="outline" 
                    className={`justify-start text-xs py-2 ${area.color === 'electric' ? 'border-electric/30 text-electric' : area.color === 'pokeball' ? 'border-pokeball/30 text-pokeball' : area.color === 'psychic' ? 'border-psychic/30 text-psychic' : area.color === 'water' ? 'border-water/30 text-water' : 'border-grass/30 text-grass'}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-electric/10 via-water/10 to-pokeball/10 border-2 border-electric/20">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para se tornar um Mestre Pokémon?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Combine todo este conhecimento especializado com respostas personalizadas 
              para suas perguntas específicas. Cada consulta é uma oportunidade de aprender!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="text-lg px-4 py-2 bg-electric text-electric-foreground">🔥 Instant Answers</Badge>
              <Badge className="text-lg px-4 py-2 bg-water text-water-foreground">⚡ Real-time Data</Badge>
              <Badge className="text-lg px-4 py-2 bg-pokeball text-pokeball-foreground">🎯 Expert Insights</Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;