import {
  ExternalLink,
  Code2,
  Globe,
  Smartphone,
  LayoutGrid,
  BookOpen,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/use-in-view";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();

  const projects = [
    {
      title: "V4 System - Site",
      description: t("projects.items.v4_site.desc"),
      tech: ["React", "JavaScript", "Tailwind CSS", "Next.js"],
      link: "https://v4system.com.br/",
      icon: Globe,
    },
    {
      title: "V4 System - CRM",
      description: t("projects.items.v4_crm.desc"),
      tech: [".NET", "AngularJS", "C#", "SQL Server"],
      link: "https://crm.v4system.com.br/",
      icon: Code2,
    },
    {
      title: "V4 System - CRM Mobile",
      description: t("projects.items.v4_mobile.desc"),
      tech: ["React Native", "TypeScript", "Expo", "API .NET"],
      link: "#",
      status: t("projects.items.v4_mobile.status"),
      icon: Smartphone,
    },
    {
      title: "Under Control",
      description: t("projects.items.under_control.desc"),
      tech: ["Next.js", ".NET", "TypeScript", "Tailwind CSS"],
      link: "https://www.undercontrol.online",
      status: t("projects.items.under_control.status"),
      icon: LayoutGrid,
    },
    {
      title: "Bíblia Online",
      description: t("projects.items.bible.desc"),
      tech: ["React", "TypeScript", "Vite", "bible-api.com"],
      link: "https://biblia.matheusreis.dev/",
      icon: BookOpen,
    },
    {
      title: "Crochetando",
      description: t("projects.items.crochetando.desc"),
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link: "https://crochetanto.matheusreis.dev/",
      icon: Heart,
    },
  ];

  return (
    <section
      id="projetos"
      className="min-h-screen flex items-center section-glow py-24 mb-12"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div
          ref={headerRef}
          className={`mb-16 transition-opacity duration-700 ${headerVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <Code2 className="text-primary" size={32} />
            {t("projects.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-body">
            {t("projects.subtitle")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`group bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col h-full ${gridVisible ? `animate-fade-up stagger-${idx + 1}` : "opacity-0"}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <project.icon size={24} className="text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  {project.status && (
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {project.status}
                    </span>
                  )}
                  {"path" in project ? (
                    <Link
                      to={project.path as string}
                      className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Abrir ${project.title}`}
                    >
                      <ExternalLink size={20} />
                    </Link>
                  ) : (
                    project.link !== "#" && (
                      <a
                        href={project.link as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Ver projeto ${project.title}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )
                  )}
                </div>
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
