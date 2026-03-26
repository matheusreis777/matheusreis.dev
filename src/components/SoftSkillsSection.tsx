import { Brain, MessageSquare, Network, BookOpen, Users, Gauge, Search, Zap, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const SoftSkillsSection = () => {
  const { t } = useTranslation();

  const softSkills = [
    {
      title: t("skills.soft.items.problem_solving.title"),
      description: t("skills.soft.items.problem_solving.desc"),
      icon: Brain,
    },
    {
      title: t("skills.soft.items.tech_comm.title"),
      description: t("skills.soft.items.tech_comm.desc"),
      icon: MessageSquare,
    },
    {
      title: t("skills.soft.items.systemic_thinking.title"),
      description: t("skills.soft.items.systemic_thinking.desc"),
      icon: Network,
    },
    {
      title: t("skills.soft.items.analytical_capacity.title"),
      description: t("skills.soft.items.analytical_capacity.desc"),
      icon: Search,
    },
    {
      title: t("skills.soft.items.tech_adaptability.title"),
      description: t("skills.soft.items.tech_adaptability.desc"),
      icon: BookOpen,
    },
    {
      title: t("skills.soft.items.team_collab.title"),
      description: t("skills.soft.items.team_collab.desc"),
      icon: Users,
    },
    {
      title: t("skills.soft.items.performance_focus.title"),
      description: t("skills.soft.items.performance_focus.desc"),
      icon: Gauge,
    },
    {
      title: t("skills.soft.items.proactivity.title"),
      description: t("skills.soft.items.proactivity.desc"),
      icon: Zap,
    },
    {
      title: t("skills.soft.items.time_management.title"),
      description: t("skills.soft.items.time_management.desc"),
      icon: Clock,
    },
  ];

  return (
    <section id="soft-skills" className="min-h-screen flex items-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <Brain className="text-primary" size={32} />
            {t("skills.soft.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-body">
            {t("skills.soft.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {softSkills.map((skill, index) => {
            const Icon = skill.icon;
            const delayClass = `delay-[${(index + 1) * 100}ms]`;
            
            return (
              <div
                key={skill.title}
                className={`group flex flex-col p-6 bg-card/20 border border-border/40 rounded-2xl transition-all duration-300 hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in fade-in slide-in-from-bottom-8 duration-700 ${delayClass}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-auto">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftSkillsSection;
