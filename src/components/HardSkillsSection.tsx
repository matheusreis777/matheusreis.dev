import { Code2, Layout, Database, Globe, Smartphone } from "lucide-react";

const skillGroups = [
  {
    title: "Backend",
    icon: Code2,
    skills: ["C#", ".NET", "ASP.NET Core", "Web API", "APIs REST escaláveis", "Regras de negócio complexas", "Arquitetura corporativa"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["Angular", "AngularJS", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "FlutterFlow", "Aplicações mobile multiplataforma"],
  },
  {
    title: "Banco de Dados",
    icon: Database,
    skills: ["SQL Server", "PostgreSQL", "Supabase", "Modelagem de dados", "Queries complexas", "Otimização de performance", "Relacionamento entre tabelas"],
  },
  {
    title: "Integrações",
    icon: Globe,
    skills: ["APIs externas", "Comunicação entre serviços", "Autenticação e tokens", "Automação de fluxos de dados", "Requisições HTTP"],
  },
];

const HardSkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Hard<br />Skills
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="group p-6 border border-border rounded-lg transition-all hover:border-primary/50 hover:bg-card/50"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h3 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-body text-sm px-3 py-1.5 rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

export default HardSkillsSection;
