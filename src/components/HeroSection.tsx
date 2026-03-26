import { useState, useEffect } from "react";
import { Mail, Linkedin, BookOpen, Copy } from "lucide-react";
import { toast } from "sonner";
import ParticleNetwork from "./ParticleNetwork";

const HeroSection = () => {
  const [dailyVerse, setDailyVerse] = useState<{ text: string; reference: string } | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const storedData = localStorage.getItem("dailyVerse");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.date === today) {
            setDailyVerse(parsedData.verse);
            return;
          }
        }

        const response = await fetch("https://bible-api.com/?random=verse&translation=almeida");
        if (response.ok) {
          const data = await response.json();
          const verse = { text: data.text.trim(), reference: data.reference };
          setDailyVerse(verse);
          localStorage.setItem("dailyVerse", JSON.stringify({ date: today, verse }));
        }
      } catch (error) {
        console.error("Error fetching daily verse:", error);
      }
    };

    fetchVerse();
  }, []);

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
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-4 max-w-2xl text-justify">
            Desenvolvedor Fullstack com especialização em backend utilizando <span className="text-foreground">.NET</span> e a linguagem <span className="text-foreground">C#</span>, com sólida experiência no desenvolvimento de <span className="text-foreground">APIs REST</span> escaláveis, integrações entre sistemas e aplicações corporativas.
          </p>
          <p className="text-base text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl text-justify">
            Atuo na construção de soluções completas, desde a modelagem e otimização de banco de dados até o desenvolvimento de interfaces modernas com <span className="text-foreground">Angular</span>, <span className="text-foreground">JavaScript</span> e aplicações mobile com <span className="text-foreground">React Native</span>, sempre com foco em performance, escalabilidade e qualidade de código.
          </p>
          
          {dailyVerse && (
            <div 
              onClick={() => {
                navigator.clipboard.writeText(`"${dailyVerse.text}" - ${dailyVerse.reference}`);
                toast.success("Versículo copiado para a área de transferência!");
              }}
              className="mb-8 max-w-2xl p-4 sm:p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-2 relative overflow-hidden group hover:bg-primary/10 transition-all cursor-pointer"
              title="Clique para copiar"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
              <div className="flex items-start gap-3 relative">
                <div className="shrink-0 mt-1">
                  <BookOpen className="text-primary/70 group-hover:opacity-0 transition-opacity absolute" size={18} />
                  <Copy className="text-primary group-hover:opacity-100 opacity-0 transition-opacity" size={18} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed font-body">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-primary text-right font-heading">
                    - {dailyVerse.reference}
                  </p>
                </div>
              </div>
            </div>
          )}

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
