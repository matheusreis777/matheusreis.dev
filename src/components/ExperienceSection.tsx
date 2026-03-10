import { CheckCircle2 } from "lucide-react";

const specialties = [
  {
    category: "Backend & APIs",
    items: [
      "Desenvolvimento de APIs REST escaláveis com .NET",
      "Implementação de regras de negócio complexas",
      "Criação de serviços robustos para aplicações corporativas",
      "Arquitetura de microsserviços",
    ],
  },
  {
    category: "Integrações",
    items: [
      "Integração entre plataformas e sistemas",
      "Consumo e criação de APIs externas",
      "Comunicação entre serviços com autenticação e tokens",
      "Automação de fluxos de dados",
    ],
  },
  {
    category: "Banco de Dados",
    items: [
      "Modelagem de dados eficiente",
      "Criação de queries complexas",
      "Otimização de performance de banco",
      "Relacionamento entre tabelas",
    ],
  },
  {
    category: "Frontend & Mobile",
    items: [
      "Aplicações web modernas com Angular",
      "Interfaces responsivas com JavaScript",
      "Aplicações mobile com React Native e FlutterFlow",
    ],
  },
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
              Especialista em backend .NET, banco de dados e integrações entre sistemas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialties.map((specialty) => (
                <div key={specialty.category} className="space-y-3">
                  <h3 className="font-heading text-sm tracking-[0.15em] uppercase text-primary mb-4">
                    {specialty.category}
                  </h3>
                  {specialty.items.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start gap-3 p-3 rounded-lg border border-border transition-all hover:border-primary/50 hover:bg-card/50"
                    >
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <p className="font-body text-foreground text-sm group-hover:text-primary transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
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
