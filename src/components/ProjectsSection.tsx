import { ExternalLink, Code2, Globe, Smartphone } from "lucide-react";

const projects = [
  {
    title: "V4 System - Site",
    description: "Site moderno e performático, focado em experiência do usuário e conversão.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Next.js"],
    link: "https://v4system.com.br/",
    icon: Globe,
  },
  {
    title: "V4 System - CRM",
    description: "Sistema de gestão de relacionamento com o cliente robusto, com integração completa de dados e regras de negócio complexas.",
    tech: [".NET", "AngularJS", "C#", "SQL Server"],
    link: "https://crm.v4system.com.br/",
    icon: Code2,
  },
  {
    title: "V4 System - CRM Mobile",
    description: "Aplicativo mobile corporativo integrado ao CRM, facilitando o acesso a dados e gestão de clientes em tempo real.",
    tech: ["React Native", "TypeScript", "Expo", "API .NET"],
    link: "#",
    status: "Em aprovação na Play Store",
    icon: Smartphone,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projetos" className="min-h-screen flex items-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <Code2 className="text-primary" size={32} />
            Projetos
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-body">
            Alguns dos trabalhos que desenvolvi, utilizando tecnologias de ponta para entregar soluções escaláveis e eficientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <project.icon size={24} className="text-primary" />
                </div>
                {project.status ? (
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {project.status}
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Ver projeto ${project.title}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              
              <h3 className="font-heading text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="font-body text-muted-foreground mb-8 line-clamp-3">
                {project.description}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-body text-xs font-medium px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
