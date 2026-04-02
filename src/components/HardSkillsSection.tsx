import { Code2, Layout, Database, Globe, Smartphone, Cloud } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/use-in-view";

const HardSkillsSection = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();

  const skillGroups = [
    {
      title: t("skills.hard.groups.backend"),
      icon: Code2,
      skills: ["C#", ".NET", "ASP.NET Core", "Web API", t("skills.hard.items.scalable_apis"), t("skills.hard.items.complex_rules"), t("skills.hard.items.enterprise_arch")],
    },
    {
      title: t("skills.hard.groups.frontend"),
      icon: Layout,
      skills: ["Angular", "AngularJS", "JavaScript", "HTML", "CSS"],
    },
    {
      title: t("skills.hard.groups.mobile"),
      icon: Smartphone,
      skills: ["React Native", "FlutterFlow", t("skills.hard.items.mobile_apps")],
    },
    {
      title: t("skills.hard.groups.db"),
      icon: Database,
      skills: ["SQL Server", "PostgreSQL", "Supabase", t("skills.hard.items.data_modeling"), t("skills.hard.items.complex_queries"), t("skills.hard.items.perf_opt"), t("skills.hard.items.db_rel")],
    },
    {
      title: t("skills.hard.groups.integrations"),
      icon: Globe,
      skills: [t("skills.hard.items.ext_apis"), t("skills.hard.items.svc_comm"), t("skills.hard.items.auth_tokens"), t("skills.hard.items.data_flow_auto"), t("skills.hard.items.http_req")],
    },
    {
      title: t("skills.hard.groups.cloud"),
      icon: Cloud,
      skills: ["Azure", "Docker", "CI/CD", "Git", t("skills.hard.items.deployments"), t("skills.hard.items.hosting")],
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div
          ref={headerRef}
          className={`mb-16 transition-opacity duration-700 ${headerVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <Code2 className="text-primary" size={32} />
            {t("skills.hard.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-body">
            {t("skills.hard.subtitle")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            
            return (
              <div
                key={group.title}
                className={`group flex flex-col p-6 bg-card/20 border border-border/40 rounded-2xl transition-colors duration-300 hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${gridVisible ? `animate-fade-up stagger-${index + 1}` : "opacity-0"}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {group.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-body text-sm font-medium px-3 py-1.5 rounded-lg bg-secondary/50 text-secondary-foreground border border-border/50 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20"
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
    </section>
  );
};

export default HardSkillsSection;
