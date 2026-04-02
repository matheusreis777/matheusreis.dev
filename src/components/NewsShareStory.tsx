import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { toPng } from "html-to-image";
import { Share2, Download, X, Globe, Newspaper } from "lucide-react";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NewsShareStoryProps {
  article: Article;
  lang: string;
}

const truncate = (text: string, maxLength: number) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
};

const formatStoryDate = (dateStr: string, lang: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang.startsWith("pt") ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const CTA_TEXT =
  "Acesse www.matheusreis.dev/news e fique por dentro das últimas notícias do mundo da tecnologia";
const CTA_TEXT_EN =
  "Visit www.matheusreis.dev/news and stay up to date with the latest tech news";

export const NewsShareStory = ({ article, lang }: NewsShareStoryProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const cta = lang.startsWith("pt") ? CTA_TEXT : CTA_TEXT_EN;

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    if (!storyRef.current) return null;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(storyRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
        cacheBust: true,
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    } catch {
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    const blob = await generateImage();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `news-story-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateImage]);

  const handleShare = useCallback(async () => {
    const blob = await generateImage();
    if (!blob) return;

    if (navigator.share) {
      try {
        const file = new File([blob], "news-story.png", { type: "image/png" });
        await navigator.share({
          title: article.title,
          text: truncate(article.description, 100),
          url: article.url,
          files: [file],
        });
        return;
      } catch {
        // Fallback if share was cancelled or failed
      }
    }

    // Fallback: download
    handleDownload();
  }, [generateImage, article, handleDownload]);

  const handleShareLink = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: truncate(article.description, 100),
          url: article.url,
        });
        return;
      } catch {
        // cancelled
      }
    }
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(article.url);
  }, [article]);

  return (
    <>
      {/* Share Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/40 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
        title={t("news.share_btn")}
      >
        <Share2 size={14} />
      </button>

      {/* Portal: Modal + Hidden Story rendered at document.body */}
      {createPortal(
        <>
          {/* Modal Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {t("news.share_title")}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Share Options */}
                <div className="p-5 space-y-3">
                  {/* Share Link */}
                  <button
                    onClick={handleShareLink}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t("news.share_link")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("news.share_link_desc")}
                      </p>
                    </div>
                  </button>

                  {/* Generate Story */}
                  <button
                    onClick={handleShare}
                    disabled={isGenerating}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Newspaper size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isGenerating
                          ? t("news.share_generating")
                          : t("news.share_story")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("news.share_story_desc")}
                      </p>
                    </div>
                  </button>

                  {/* Download Story */}
                  <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Download size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isGenerating
                          ? t("news.share_generating")
                          : t("news.share_download")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("news.share_download_desc")}
                      </p>
                    </div>
                  </button>
                </div>

                {/* Story Preview */}
                <div className="p-5 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                    {t("news.share_preview")}
                  </p>
                  <div className="flex justify-center">
                    <div className="w-[216px] h-[384px] rounded-xl overflow-hidden shadow-lg border border-border">
                      {/* Miniatura do story (escala 1/5) */}
                      <div
                        style={{
                          width: 216,
                          height: 384,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            transform: "scale(0.2)",
                            transformOrigin: "top left",
                            width: 1080,
                            height: 1920,
                          }}
                        >
                          <StoryTemplate
                            article={article}
                            lang={lang}
                            cta={cta}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Story (full-size for image generation) */}
          <div
            style={{
              position: "fixed",
              left: "-9999px",
              top: 0,
              pointerEvents: "none",
              opacity: 0,
            }}
          >
            <div ref={storyRef}>
              <StoryTemplate article={article} lang={lang} cta={cta} />
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
};

// ─── Story Template ──────────────────────────────────────────
const StoryTemplate = ({
  article,
  lang,
  cta,
}: {
  article: Article;
  lang: string;
  cta: string;
}) => (
  <div
    style={{
      width: 1080,
      height: 1920,
      background:
        "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
      display: "flex",
      flexDirection: "column",
      padding: 80,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Decorative elements */}
    <div
      style={{
        position: "absolute",
        top: -200,
        right: -200,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -100,
        left: -100,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
      }}
    />

    {/* Header: Logo + Brand */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 60,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 800,
          color: "#000",
          letterSpacing: -1,
        }}
      >
        M
      </div>
      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          MRM<span style={{ color: "#22c55e" }}>.</span>
        </div>
        <div style={{ fontSize: 16, color: "#71717a", fontWeight: 500 }}>
          Tech News
        </div>
      </div>
    </div>

    {/* Green accent line */}
    <div
      style={{
        width: 80,
        height: 4,
        background: "#22c55e",
        borderRadius: 2,
        marginBottom: 50,
      }}
    />

    {/* Spacer top */}
    <div style={{ flex: 1 }} />

    {/* News content — centered vertically */}
    {/* Source badge */}
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        background: "rgba(34,197,94,0.1)",
        border: "1px solid rgba(34,197,94,0.2)",
        marginBottom: 40,
        alignSelf: "flex-start",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#22c55e",
        }}
      />
      <span style={{ fontSize: 18, color: "#22c55e", fontWeight: 600 }}>
        {article.source.name}
      </span>
    </div>

    {/* Title */}
    <div
      style={{
        fontSize: 52,
        fontWeight: 800,
        color: "#ffffff",
        lineHeight: 1.2,
        marginBottom: 40,
        letterSpacing: -0.5,
      }}
    >
      {truncate(article.title, 120)}
    </div>

    {/* Description */}
    {article.description && (
      <div
        style={{
          fontSize: 26,
          color: "#a1a1aa",
          lineHeight: 1.6,
          marginBottom: 40,
        }}
      >
        {truncate(article.description, 200)}
      </div>
    )}

    {/* Date */}
    <div
      style={{
        fontSize: 18,
        color: "#52525b",
        marginBottom: 20,
      }}
    >
      {formatStoryDate(article.publishedAt, lang)}
    </div>

    {/* Spacer bottom */}
    <div style={{ flex: 1 }} />

    {/* Divider */}
    <div
      style={{
        width: "100%",
        height: 1,
        background:
          "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)",
        marginBottom: 50,
      }}
    />

    {/* CTA */}
    <div
      style={{
        fontSize: 22,
        color: "#a1a1aa",
        lineHeight: 1.6,
        textAlign: "center",
        marginBottom: 40,
      }}
    >
      {cta}
    </div>

    {/* URL Badge */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 32px",
          borderRadius: 999,
          background: "rgba(34,197,94,0.15)",
          border: "1px solid rgba(34,197,94,0.3)",
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: "#22c55e",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          matheusreis.dev/news
        </span>
      </div>
    </div>
  </div>
);

export default NewsShareStory;
