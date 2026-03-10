import { CheckCircle2 } from "lucide-react";

const experiences = [
  "Desenvolvimento de APIs REST com .NET",
  "Integração entre plataformas",
  "Consumo e criação de serviços HTTP",
  "Arquitetura de microsserviços",
  "Otimização de banco de dados",
  "Aplicações web modernas",
  "Aplicações mobile com React Native",
];

const ExperienceSection = () => {
  return (
    <section id="experiencia" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Experiência<br />Técnica
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-foreground text-xl font-heading font-medium mb-10">
              Especialista em desenvolvimento de APIs e integrações entre sistemas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.map((item) => (
                <div
                  key={item}
                  className="group flex items-start gap-3 p-4 rounded-lg border border-border transition-all hover:border-primary/50 hover:bg-card/50"
                >
                  <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-foreground text-sm group-hover:text-primary transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
