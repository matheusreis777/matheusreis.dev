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
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-body">04</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Experiência<br />Técnica
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-foreground text-xl font-heading font-medium mb-10">
              Especialista em desenvolvimento de APIs e integrações entre sistemas.
            </p>
            <div className="border-l border-border pl-8 space-y-0">
              {experiences.map((item, index) => (
                <div
                  key={item}
                  className="group py-4 border-b border-border last:border-b-0 flex items-baseline gap-4"
                >
                  <span className="font-heading text-xs text-muted-foreground min-w-[24px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-foreground text-base group-hover:text-primary transition-colors">
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
