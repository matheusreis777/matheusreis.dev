import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { toPng } from "html-to-image";
import { Share2, Download, X, Globe, Newspaper, Eye } from "lucide-react";

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
  if (!dateStr) return lang.startsWith("pt") ? "Agora" : "Now";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return lang.startsWith("pt") ? "Agora" : "Now";
  return date.toLocaleDateString(lang.startsWith("pt") ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const CTA_LINE1 = "Fique por dentro do mundo tech";
const CTA_LINE1_EN = "Stay up to date with tech";
const CTA_LINE2 = "Notícias atualizadas em tempo real.";
const CTA_LINE2_EN = "Real-time news.";

export const NewsShareStory = ({ article, lang }: NewsShareStoryProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "share">("preview");
  const storyRef = useRef<HTMLDivElement>(null);

  const ctaLine1 = lang.startsWith("pt") ? CTA_LINE1 : CTA_LINE1_EN;
  const ctaLine2 = lang.startsWith("pt") ? CTA_LINE2 : CTA_LINE2_EN;

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    if (!storyRef.current) return null;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(storyRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
        cacheBust: false,
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
                className="relative bg-card border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-0">
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

                {/* Tabs */}
                <div className="flex gap-1 px-5 pt-4 pb-0">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-medium transition-colors ${
                      activeTab === "preview"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye size={13} />
                    {t("news.share_tab_preview")}
                  </button>
                  <button
                    onClick={() => setActiveTab("share")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-medium transition-colors ${
                      activeTab === "share"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Share2 size={13} />
                    {t("news.share_tab_actions")}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bg-muted/50 border-t border-border overflow-y-auto flex-1">
                  {activeTab === "preview" ? (
                    <div className="p-5 flex flex-col items-center gap-4">
                      {/* Story Preview */}
                      <div className="w-[216px] h-[384px] rounded-xl overflow-hidden shadow-lg border border-border">
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
                              ctaLine1={ctaLine1}
                              ctaLine2={ctaLine2}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quick actions under preview */}
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={handleShare}
                          disabled={isGenerating}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          <Share2 size={14} />
                          {isGenerating
                            ? t("news.share_generating")
                            : t("news.share_story")}
                        </button>
                        <button
                          onClick={handleDownload}
                          disabled={isGenerating}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-sm font-medium text-muted-foreground hover:text-primary transition-all disabled:opacity-50"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 space-y-3">
                      {/* Share Link */}
                      <button
                        onClick={handleShareLink}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
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

                      {/* Generate + Share Story */}
                      <button
                        onClick={handleShare}
                        disabled={isGenerating}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left disabled:opacity-50"
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
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left disabled:opacity-50"
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
                  )}
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
              <StoryTemplate
                article={article}
                lang={lang}
                ctaLine1={ctaLine1}
                ctaLine2={ctaLine2}
              />
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
  ctaLine1,
  ctaLine2,
}: {
  article: Article;
  lang: string;
  ctaLine1: string;
  ctaLine2: string;
}) => (
  <div
    style={{
      width: 1080,
      height: 1920,
      background: "#050505",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "0 70px",
    }}
  >
    {/* Background pattern — subtle grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    {/* Top glow */}
    <div
      style={{
        position: "absolute",
        top: -300,
        left: "50%",
        transform: "translateX(-50%)",
        width: 800,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)",
      }}
    />

    {/* Header bar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 0 28px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "#000",
          }}
        >
          M
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 0.5,
          }}
        >
          MRM<span style={{ color: "#22c55e" }}>.</span>
        </div>
      </div>
      <div
        style={{
          padding: "8px 20px",
          borderRadius: 999,
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.2)",
          fontSize: 16,
          color: "#22c55e",
          fontWeight: 600,
        }}
      >
        Tech News
      </div>
    </div>

    {/* Main content area */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* News card container */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32,
          padding: "56px 52px",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Source + Date row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.2)",
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
            <span style={{ fontSize: 16, color: "#22c55e", fontWeight: 600 }}>
              {article.source.name}
            </span>
          </div>
          <span style={{ fontSize: 16, color: "#52525b", fontWeight: 500 }}>
            {formatStoryDate(article.publishedAt, lang)}
          </span>
        </div>

        {/* Green top accent */}
        <div
          style={{
            width: 60,
            height: 4,
            background: "#22c55e",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.25,
            marginBottom: 28,
            letterSpacing: -0.5,
          }}
        >
          {truncate(article.title, 130)}
        </div>

        {/* Description */}
        {article.description && (
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              lineHeight: 1.65,
            }}
          >
            {truncate(article.description, 220)}
          </div>
        )}

        {/* Fonte */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
          }}
        >
          <span style={{ fontSize: 18, color: "#52525b", fontWeight: 500 }}>
            {lang.startsWith("pt") ? "Fonte:" : "Source:"}
          </span>
          <span style={{ fontSize: 18, color: "#22c55e", fontWeight: 600 }}>
            {article.source.name}
          </span>
        </div>
      </div>
    </div>

    {/* Footer CTA area */}
    <div
      style={{
        padding: "28px 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.25) 50%, transparent 100%)",
          marginBottom: 4,
        }}
      />

      {/* CTA text */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 6,
          }}
        >
          {ctaLine1}
        </div>
        <div style={{ fontSize: 18, color: "#52525b", lineHeight: 1.4 }}>
          {ctaLine2}
        </div>
      </div>
    </div>
  </div>
);

export default NewsShareStory;
