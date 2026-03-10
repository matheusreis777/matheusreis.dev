import { Brain, MessageSquare, Network, BookOpen, Users, Gauge, Search } from "lucide-react";

const softSkills = [
  {
    title: "Resolução de Problemas",
    description: "Mentalidade focada em resolver problemas reais usando tecnologia. Capacidade analítica para investigar bugs complexos, entender fluxos de dados e estruturar soluções eficientes.",
    icon: Brain,
  },
  {
    title: "Comunicação Técnica",
    description: "Facilidade para traduzir problemas técnicos complexos em soluções claras para equipes e stakeholders, facilitando a tomada de decisão.",
    icon: MessageSquare,
  },
  {
    title: "Pensamento Sistêmico",
    description: "Visão ampla de arquitetura de sistemas, garantindo escalabilidade e manutenção a longo prazo. Entendimento completo do fluxo da aplicação, do banco de dados à interface.",
    icon: Network,
  },
  {
    title: "Capacidade Analítica",
    description: "Desenvolvida naturalmente através de anos trabalhando com backend, APIs e banco de dados. Habilidade para investigar problemas complexos e estruturar soluções eficientes.",
    icon: Search,
  },
  {
    title: "Adaptabilidade Tecnológica",
    description: "Experiência com tecnologias diversas — .NET, Angular, FlutterFlow, SQL, Frontend Web — demonstrando grande capacidade de adaptação às necessidades do projeto.",
    icon: BookOpen,
  },
  {
    title: "Colaboração em Equipe",
    description: "Experiência trabalhando em times ágeis e colaborando com desenvolvedores, designers e gestores de produto em ambientes corporativos.",
    icon: Users,
  },
  {
    title: "Foco em Performance",
    description: "Preocupação constante com otimização de sistemas, performance de APIs, eficiência de banco de dados e otimização de queries.",
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
