const AboutSection = () => {
  return (
    <section id="sobre" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
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
              Minha principal força está no backend com C# e .NET, uma stack muito utilizada em sistemas corporativos. Tenho capacidade de desenvolver APIs REST escaláveis, implementar regras de negócio complexas e criar serviços robustos para aplicações web e mobile.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              Sou apaixonado por resolver problemas reais através da tecnologia e construir soluções que gerem valor para empresas e usuários. Minha formação é em Análise e Desenvolvimento de Sistemas.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              Meu perfil fullstack me permite trabalhar em todo o fluxo da aplicação — do banco de dados à interface — algo que empresas valorizam muito por permitir entender o sistema completo.
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
