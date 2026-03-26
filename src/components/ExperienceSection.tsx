import { CheckCircle2, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

const ExperienceSection = () => {
  const { t } = useTranslation();

  const specialties = [
    {
      category: t("exp.categories.backend"),
      items: [
        t("exp.items.net_apis"),
        t("exp.items.complex_rules"),
        t("exp.items.robust_svcs"),
        t("exp.items.microservices"),
      ],
    },
    {
      category: t("exp.categories.integrations"),
      items: [
        t("exp.items.plat_integrations"),
        t("exp.items.ext_apis_io"),
        t("exp.items.svc_comm_auth"),
        t("exp.items.data_flow_auto"),
      ],
    },
    {
      category: t("exp.categories.db"),
      items: [
        t("exp.items.eff_modeling"),
        t("exp.items.complex_queries"),
        t("exp.items.db_perf"),
        t("exp.items.table_rel"),
      ],
    },
    {
      category: t("exp.categories.frontend"),
      items: [
        t("exp.items.modern_web"),
        t("exp.items.resp_interfaces"),
        t("exp.items.mobile_apps"),
      ],
    },
  ];

  return (
    <section id="experiencia" className="min-h-screen flex items-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <Briefcase className="text-primary" size={32} />
            {t("exp.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-body">
            {t("exp.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialties.map((specialty, index) => {
            const delayClass = `delay-[${(index + 1) * 100}ms]`;

            return (
              <div 
                key={specialty.category} 
                className={`bg-card/20 border border-border/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in fade-in slide-in-from-bottom-8 duration-700 ${delayClass}`}
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6 uppercase tracking-wider flex items-center gap-3">
                  <div className="w-2 h-6 bg-primary rounded-full"></div>
                  {specialty.category}
                </h3>
                
                <div className="grid gap-4">
                  {specialty.items.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-background/50 transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                      <p className="font-body text-foreground/90 text-sm md:text-base leading-snug group-hover:text-foreground transition-colors">
                        {item}
                      </p>
                    </div>
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

export default ExperienceSection;
