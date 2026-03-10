import { Mail, Linkedin } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleNetwork />
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
            Desenvolvedor Fullstack com forte especialização em backend utilizando a plataforma <span className="text-foreground">.NET</span> e a linguagem <span className="text-foreground">C#</span>, com sólida experiência no desenvolvimento de <span className="text-foreground">APIs REST</span> escaláveis, integrações entre sistemas e aplicações corporativas.
          </p>
          <p className="text-base text-muted-foreground font-body leading-relaxed mb-10 max-w-2xl">
            Atuo na construção de soluções completas, desde a modelagem e otimização de banco de dados até o desenvolvimento de interfaces modernas com <span className="text-foreground">Angular</span>, <span className="text-foreground">JavaScript</span> e aplicações mobile com <span className="text-foreground">React Native</span>, sempre com foco em performance, escalabilidade e qualidade de código.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5567991431860"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-[10px] font-heading text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            >
              <Mail size={16} />
              Entrar em contato
            </a>
            <a
              href="https://www.linkedin.com/in/matheus-reis-584098306"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3 rounded-[10px] font-heading text-sm font-medium tracking-wide transition-all hover:border-primary hover:text-primary hover:bg-primary/5 hover:-translate-y-1"
            >
              <Linkedin size={16} />
              Ver LinkedIn
            </a>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
