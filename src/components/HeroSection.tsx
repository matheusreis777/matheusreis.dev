import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, BookOpen, Copy, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import ParticleNetwork from "./ParticleNetwork";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

const HeroSection = () => {
  const [dailyVerse, setDailyVerse] = useState<{ text: string; reference: string } | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const generatePngBlob = async (): Promise<Blob | null> => {
    if (!storyRef.current) return null;
    try {
      const { width, height } = storyRef.current.getBoundingClientRect();
      const dataUrl = await toPng(storyRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#09090b",
        width,
        height,
        style: {
          margin: "0",
          padding: storyRef.current.style.padding,
          borderRadius: "0",
        },
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    } catch (e) {
      console.error("Erro ao gerar imagem:", e);
      return null;
    }
  };

  const handleDownload = async () => {
    if (!dailyVerse) return;
    setIsGenerating(true);
    const blob = await generatePngBlob();
    setIsGenerating(false);
    if (!blob) { toast.error("Erro ao gerar imagem."); return; }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `versiculo-${dailyVerse.reference.replace(/\s/g, "-")}.png`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Vers\u00edculo baixado com sucesso!");
  };

  const handleShare = async () => {
    if (!dailyVerse) return;
    setIsGenerating(true);
    const blob = await generatePngBlob();
    setIsGenerating(false);
    if (!blob) { toast.error("Erro ao gerar imagem."); return; }
    const file = new File([blob], `versiculo-${dailyVerse.reference.replace(/\s/g, "-")}.png`, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Vers\u00edculo Di\u00e1rio",
          text: `"${dailyVerse.text}" - ${dailyVerse.reference}\n\nmatheusreis.dev`,
          files: [file],
        });
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== "AbortError") toast.error("Erro ao compartilhar.");
      }
    } else {
      toast.error("Seu navegador n\u00e3o suporta compartilhamento. Use o bot\u00e3o de baixar.");
    }
  };

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
            <>
              <div 
                onClick={() => {
                  navigator.clipboard.writeText(`"${dailyVerse.text}" - ${dailyVerse.reference}`);
                  toast.success("Versículo copiado para a área de transferência!");
                  setIsStoryModalOpen(true);
                }}
                className="mb-8 max-w-2xl p-4 sm:p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-2 relative overflow-hidden group hover:bg-primary/10 transition-all cursor-pointer"
                title="Copiar e criar Story"
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

              <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
                <DialogContent className="
                  p-0 border-none bg-transparent shadow-none gap-0
                  w-screen h-[100dvh] max-w-none
                  flex flex-col items-center justify-center
                  [&>button]:absolute [&>button]:top-4 [&>button]:right-4 [&>button]:z-50
                  [&>button]:text-white [&>button]:bg-black/40 [&>button]:hover:bg-black/60
                  [&>button]:p-2 [&>button]:rounded-full [&>button]:backdrop-blur-sm
                ">
                  <DialogTitle className="sr-only">Story do Versículo Diário</DialogTitle>

                  {/* Story Card — ocupa o máximo possível da tela mantendo aspect 9:16 */}
                  <div className="flex flex-col items-center gap-4 w-full px-4 max-w-xs sm:max-w-sm">
                    <div
                      ref={storyRef}
                      className="
                        w-full aspect-[9/16]
                        bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950
                        relative rounded-2xl border border-primary/20
                        p-6 flex flex-col justify-center items-center text-center
                        shadow-2xl shadow-black/60 overflow-hidden
                      "
                    >
                      {/* Borrões decorativos */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-10 left-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

                      {/* Icone */}
                      <BookOpen className="text-primary/50 mb-6 shrink-0 relative z-10" size={28} />

                      {/* Versículo */}
                      <p className="text-base leading-relaxed text-white/90 italic font-body relative z-10">
                        "{dailyVerse.text}"
                      </p>

                      {/* Referência */}
                      <p className="mt-6 text-sm text-primary font-heading font-semibold relative z-10">
                        — {dailyVerse.reference}
                      </p>

                      {/* Rodapé */}
                      <div className="absolute bottom-6 left-0 w-full text-center z-10">
                        <span className="text-[9px] text-white/30 tracking-[0.3em] font-heading uppercase">
                          matheusreis.dev
                        </span>
                      </div>
                    </div>

                    {/* Botões abaixo do card */}
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl text-sm font-heading font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-primary/30"
                      >
                        <Download size={15} />
                        {isGenerating ? "Gerando..." : "Baixar"}
                      </button>
                      {typeof navigator !== "undefined" && navigator.share && (
                        <button
                          onClick={handleShare}
                          disabled={isGenerating}
                          className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl text-sm font-heading font-medium transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                        >
                          <Share2 size={15} />
                          {isGenerating ? "Gerando..." : "Compartilhar"}
                        </button>
                    )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
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
