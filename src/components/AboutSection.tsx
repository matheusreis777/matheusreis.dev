const AboutSection = () => {
  return (
    <section id="sobre" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-body">01</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Sobre<br />Mim
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-foreground text-lg leading-relaxed font-body">
              Meu nome é Matheus Reis Mendonça e sou desenvolvedor Fullstack Pleno com experiência no desenvolvimento de sistemas completos, desde o banco de dados até a interface do usuário.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              Possuo aproximadamente 4 anos de experiência no desenvolvimento de aplicações utilizando .NET e Angular, e cerca de 8 anos trabalhando com banco de dados e modelagem de dados.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              Sou apaixonado por resolver problemas complexos através da tecnologia e construir soluções robustas que gerem valor real para empresas e usuários.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              Minha formação é em Análise e Desenvolvimento de Sistemas. Tenho grande experiência no desenvolvimento de APIs REST, integrações entre sistemas, automação de processos e consumo de serviços via HTTP.
            </p>
            <div className="pt-6 flex gap-12 border-t border-border">
              <div>
                <p className="font-heading text-3xl font-medium text-primary">4+</p>
                <p className="text-muted-foreground text-sm font-body mt-1">Anos .NET & Angular</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-medium text-primary">8+</p>
                <p className="text-muted-foreground text-sm font-body mt-1">Anos Banco de Dados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
