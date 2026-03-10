const skillGroups = [
  {
    title: "Backend",
    skills: ["C#", ".NET", "ASP.NET Core", "Web API", "Integrações REST", "Arquitetura de APIs"],
  },
  {
    title: "Frontend",
    skills: ["Angular", "AngularJS", "JavaScript", "React Native"],
  },
  {
    title: "Banco de Dados",
    skills: ["SQL Server", "PostgreSQL", "Supabase", "Modelagem de dados", "Otimização de queries"],
  },
  {
    title: "Integrações",
    skills: ["APIs externas", "Requisições HTTP", "Integração entre sistemas", "Automação de fluxos"],
  },
];

const HardSkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-body">02</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Hard<br />Skills
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-heading text-sm tracking-[0.2em] uppercase text-primary mb-6">
                    {group.title}
                  </h3>
                  <ul className="skill-group space-y-3">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="skill-item font-body text-foreground text-base"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardSkillsSection;
