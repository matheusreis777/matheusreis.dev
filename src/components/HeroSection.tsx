import { Mail, Linkedin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-glow">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6 font-body">
            Fullstack Developer
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight mb-6">
            Matheus Reis
            <br />
            <span className="text-primary">Mendonça</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-4 max-w-2xl">
            Desenvolvedor Fullstack especializado em criação de APIs, integrações e sistemas escaláveis.
          </p>
          <p className="text-base text-muted-foreground font-body leading-relaxed mb-10 max-w-2xl">
            Experiência sólida em desenvolvimento backend com <span className="text-foreground">.NET</span> e frontend moderno com <span className="text-foreground">Angular</span> e <span className="text-foreground">React Native</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5567991431860"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-heading text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
            >
              <Mail size={16} />
              Entrar em contato
            </a>
            <a
              href="https://www.linkedin.com/in/matheus-reis-584098306"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3 font-heading text-sm font-medium tracking-wide transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin size={16} />
              Ver LinkedIn
            </a>
          </div>
        </div>
      </div>
      {/* Vertical line accent */}
      <div className="absolute right-12 top-1/4 bottom-1/4 w-px bg-border hidden lg:block" />
    </section>
  );
};

export default HeroSection;
