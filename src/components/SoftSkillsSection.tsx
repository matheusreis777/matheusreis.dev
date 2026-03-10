import { Brain, MessageSquare, Network, BookOpen, Users, Gauge } from "lucide-react";

const softSkills = [
  {
    title: "Resolução de Problemas",
    description: "Capacidade analítica para identificar gargalos técnicos e propor soluções eficientes.",
    icon: Brain,
  },
  {
    title: "Comunicação Técnica",
    description: "Facilidade para traduzir problemas técnicos complexos em soluções claras para equipes e stakeholders.",
    icon: MessageSquare,
  },
  {
    title: "Pensamento Sistêmico",
    description: "Visão ampla de arquitetura de sistemas, garantindo escalabilidade e manutenção a longo prazo.",
    icon: Network,
  },
  {
    title: "Aprendizado Contínuo",
    description: "Comprometimento constante com evolução profissional e atualização tecnológica.",
    icon: BookOpen,
  },
  {
    title: "Colaboração em Equipe",
    description: "Experiência trabalhando em times ágeis e colaborando com desenvolvedores, designers e gestores de produto.",
    icon: Users,
  },
  {
    title: "Foco em Performance",
    description: "Preocupação constante com otimização de sistemas, performance de APIs e eficiência de banco de dados.",
    icon: Gauge,
  },
];

const SoftSkillsSection = () => {
  return (
    <section id="soft-skills" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Soft<br />Skills
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {softSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.title}
                    className="group relative p-6 border border-border rounded-lg transition-all hover:border-primary/50 hover:bg-card/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftSkillsSection;
