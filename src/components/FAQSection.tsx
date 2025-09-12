import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Que tipos de perguntas posso fazer sobre Pokémon?",
    answer: "Posso responder sobre qualquer aspecto dos Pokémon! Estatísticas detalhadas, movesets otimizados, estratégias competitivas, evoluções e requisitos, lore e história, diferenças entre jogos, episódios do anime, cartas do TCG, preços de mercadoria, e muito mais. Desde dúvidas básicas até análises complexas de meta competitivo!"
  },
  {
    question: "Suas informações são atualizadas e precisas?",
    answer: "Sim! Mantenho conhecimento atualizado sobre todos os jogos, desde Red/Blue até os lançamentos mais recentes. Incluo dados de Pokémon GO, TCG, anime, e mudanças de balance em jogos competitivos. Sempre indico quando há diferenças entre gerações ou versões específicas."
  },
  {
    question: "Você pode ajudar com estratégias competitivas?",
    answer: "Absolutamente! Posso criar teams completos, analisar matchups, sugerir movesets para diferentes formatos (VGC, Smogon tiers, Battle Stadium), calcular damage ranges, otimizar EVs/IVs, e explicar techs avançadas. Também acompanho o meta atual e posso prever tendências."
  },
  {
    question: "Como funciona o cálculo de damage e stats?",
    answer: "Utilizo as fórmulas oficiais de damage calculation considerando base stats, nature, IVs, EVs, type effectiveness, abilities, items, weather, terrain, e outros modificadores. Posso fazer cálculos precisos para qualquer cenário e explicar como otimizar seus Pokémon."
  },
  {
    question: "Você conhece sobre breeding e shiny hunting?",
    answer: "Sim! Posso explicar todos os métodos de breeding, incluindo Masuda Method, chains, inheritance patterns, Hidden Abilities, egg groups, compatibility, e técnicas de shiny hunting para cada geração. Também sei sobre rates específicos e como maximizar suas chances."
  },
  {
    question: "Pode me ajudar com o anime e lore dos Pokémon?",
    answer: "Com certeza! Conheço episódios específicos, arcos narrativos, desenvolvimento de personagens, diferenças entre anime/games, mythology de cada região, backstories detalhadas, e trivia obscura. Posso conectar elementos do anime com os jogos e explicar referências culturais."
  },
  {
    question: "Você entende sobre o TCG (Trading Card Game)?",
    answer: "Sim! Posso ajudar com deck building, análise de meta, valores de cartas, ruling de mecânicas complexas, estratégias de tournament play, e história do jogo. Desde decks casuais até construções competitivas para torneios oficiais."
  },
  {
    question: "Como posso otimizar meu time para diferentes formatos?",
    answer: "Analiso seu objetivo (story mode, online battles, tournaments) e sugiro compositions balanceadas. Considero synergies, coverage, role compression, speed tiers, common threats, e win conditions. Posso adaptar estratégias para VGC Doubles, Singles, ou formatos alternativos."
  }
];

const quickTips = [
  {
    title: "💡 Dica Pro",
    content: "Seja específico nas perguntas! Ao invés de 'Charizard é bom?', pergunte 'Qual o melhor moveset para Charizard no VGC 2024?'"
  },
  {
    title: "⚡ Resposta Rápida", 
    content: "Posso gerar cálculos de damage em tempo real! Só me dê o scenario: 'Adamant Garchomp Earthquake vs Bold Rotom-W'"
  },
  {
    title: "🎯 Meta Analysis",
    content: "Pergunto sobre trends atuais! 'Quais Pokémon estão dominando o meta?' ou 'Counter para Urshifu Single Strike?'"
  },
  {
    title: "📚 Lore Master",
    content: "Adoro perguntas de lore! 'Por que Alakazam tem colheres?' ou 'Qual a origem do tipo Fairy?' - tenho as respostas!"
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-psychic/20 text-psychic-foreground">Perguntas Frequentes</Badge>
          <h2 className="text-4xl font-bold mb-4">Dúvidas Comuns</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore as perguntas mais frequentes e descubra como posso ajudar você 
            a se tornar um verdadeiro especialista Pokémon!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <HelpCircle className="w-6 h-6 mr-3 text-primary" />
                <h3 className="text-2xl font-bold">Perguntas e Respostas</h3>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Quick Tips */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Dicas Rápidas</h3>
            
            {quickTips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-lg mb-3 text-primary">{tip.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
              </Card>
            ))}

            {/* Contact CTA */}
            <Card className="p-6 bg-gradient-to-br from-electric/10 to-water/10 border-2 border-electric/20">
              <h4 className="font-bold text-lg mb-3">Não encontrou sua resposta?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Faça qualquer pergunta no chat! Quanto mais específica, melhor será minha resposta.
              </p>
              <Badge className="bg-electric text-electric-foreground">
                ⚡ Respostas em segundos
              </Badge>
            </Card>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Categorias Populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Competitivo VGC",
              "Shiny Hunting", 
              "Moveset Building",
              "Breeding Guide",
              "Lore & Historia",
              "TCG Strategy",
              "Anime Episodes",
              "Game Mechanics",
              "Type Matchups",
              "EV Training",
              "Hidden Abilities",
              "Regional Forms"
            ].map((category, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="justify-center py-3 px-4 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;