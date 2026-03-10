const softSkills = [
  {
    title: "Resolução de Problemas",
    description: "Capacidade analítica para identificar gargalos técnicos e propor soluções eficientes.",
  },
  {
    title: "Comunicação Técnica",
    description: "Facilidade para traduzir problemas técnicos complexos em soluções claras para equipes e stakeholders.",
  },
  {
    title: "Pensamento Sistêmico",
    description: "Visão ampla de arquitetura de sistemas, garantindo escalabilidade e manutenção a longo prazo.",
  },
  {
    title: "Aprendizado Contínuo",
    description: "Comprometimento constante com evolução profissional e atualização tecnológica.",
  },
  {
    title: "Colaboração em Equipe",
    description: "Experiência trabalhando em times ágeis e colaborando com desenvolvedores, designers e gestores de produto.",
  },
  {
    title: "Foco em Performance",
    description: "Preocupação constante com otimização de sistemas, performance de APIs e eficiência de banco de dados.",
  },
];

const SoftSkillsSection = () => {
  return (
    <section id="soft-skills" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-body">03</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Soft<br />Skills
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.title}
                  className="group p-6 border border-border transition-colors hover:border-primary"
                >
                  <p className="font-heading text-xs text-muted-foreground mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
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

export default SoftSkillsSection;
