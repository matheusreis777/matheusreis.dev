import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Clock,
  Calendar,
  Newspaper,
  AlertCircle,
  Cpu,
  Code,
  Smartphone,
  Rocket,
} from "lucide-react";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  tags: string[];
  source: {
    name: string;
    url: string;
  };
}

interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}

type PeriodFilter = "7d" | "1d";
type CategoryFilter = "all" | "ai" | "programming" | "gadgets" | "startups";

const CATEGORY_KEYWORDS: Record<CategoryFilter, string[]> = {
  all: [],
  ai: [
    "inteligência artificial",
    "ia",
    "ai",
    "machine learning",
    "chatgpt",
    "openai",
    "gpt",
    "llm",
    "deep learning",
    "neural",
  ],
  programming: [
    "programação",
    "programming",
    "developer",
    "código",
    "code",
    "software",
    "github",
    "javascript",
    "python",
    "react",
    "api",
  ],
  gadgets: [
    "gadget",
    "smartphone",
    "iphone",
    "samsung",
    "apple",
    "google pixel",
    "hardware",
    "dispositivo",
    "device",
    "wearable",
  ],
  startups: [
    "startup",
    "venture",
    "funding",
    "investimento",
    "unicórnio",
    "unicorn",
    "fintech",
    "valuation",
  ],
};

const fetchNews = async (
  lang: string,
  period: PeriodFilter,
): Promise<NewsResponse> => {
  const apiLang = lang.startsWith("pt") ? "pt" : "en";
  const res = await fetch(`/api/tech-news?lang=${apiLang}&period=${period}`);
  if (!res.ok) throw new Error("Erro ao buscar notícias");
  return res.json();
};

const formatDate = (dateStr: string, lang: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return lang.startsWith("pt") ? "Agora há pouco" : "Just now";
  }
  if (diffHours < 24) {
    return lang.startsWith("pt") ? `${diffHours}h atrás` : `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return lang.startsWith("pt") ? `${diffDays}d atrás` : `${diffDays}d ago`;
  }
  return date.toLocaleDateString(lang.startsWith("pt") ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "short",
  });
};

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' fill='%23111'%3E%3Crect width='600' height='400' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='40' fill='%2322c55e'%3ETech%3C/text%3E%3C/svg%3E";

// ─── Skeleton ────────────────────────────────────────────────
const SkeletonCard = ({ featured = false }: { featured?: boolean }) => (
  <div
    className={`animate-pulse rounded-2xl bg-card border border-border overflow-hidden ${
      featured ? "md:col-span-2 md:row-span-2" : ""
    }`}
  >
    <div className={`bg-muted ${featured ? "h-64 md:h-80" : "h-44"}`} />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-muted rounded w-24" />
      <div className="h-5 bg-muted rounded w-full" />
      <div className="h-5 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  </div>
);

// ─── News Card ───────────────────────────────────────────────
const NewsCard = ({
  article,
  featured = false,
  lang,
}: {
  article: Article;
  featured?: boolean;
  lang: string;
}) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${
      featured ? "md:col-span-2 md:row-span-2" : ""
    }`}
  >
    {/* Imagem */}
    <div
      className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-44"}`}
    >
      <img
        src={article.image || PLACEHOLDER_IMG}
        alt={article.title}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
        }}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-bold backdrop-blur-sm">
        {article.source.name}
      </span>
    </div>

    {/* Conteúdo */}
    <div className="flex flex-col flex-1 p-5 gap-2">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-body">
        <Clock size={12} />
        {formatDate(article.publishedAt, lang)}
      </div>

      <h3
        className={`font-heading font-semibold leading-snug text-foreground group-hover:text-primary transition-colors ${
          featured ? "text-xl md:text-2xl" : "text-sm"
        }`}
      >
        {article.title}
      </h3>

      {article.description && (
        <p
          className={`font-body text-muted-foreground leading-relaxed line-clamp-3 ${
            featured ? "text-sm" : "text-xs"
          }`}
        >
          {article.description}
        </p>
      )}

      <div className="mt-auto pt-3 flex items-center gap-1.5 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={13} />
        <span>
          {lang.startsWith("pt") ? "Ler notícia completa" : "Read full article"}
        </span>
      </div>
    </div>
  </a>
);

// ─── Page ────────────────────────────────────────────────────
const News = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [period, setPeriod] = useState<PeriodFilter>("7d");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<NewsResponse>({
      queryKey: ["tech-news", lang, period],
      queryFn: () => fetchNews(lang, period),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Filtra por categoria localmente (usa tags do Dev.to + keywords no texto)
  const filteredArticles = (data?.articles ?? []).filter((a) => {
    if (category === "all") return true;
    const keywords = CATEGORY_KEYWORDS[category];
    const text =
      `${a.title} ${a.description ?? ""} ${(a.tags ?? []).join(" ")}`.toLowerCase();
    return keywords.some((kw) => text.includes(kw));
  });

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  const periodOptions: {
    value: PeriodFilter;
    labelKey: string;
    icon: typeof Clock;
  }[] = [
    { value: "7d", labelKey: "news.filter_week", icon: Calendar },
    { value: "1d", labelKey: "news.filter_today", icon: Clock },
  ];

  const categoryOptions: {
    value: CategoryFilter;
    labelKey: string;
    icon: typeof Cpu;
  }[] = [
    { value: "all", labelKey: "news.cat_all", icon: Newspaper },
    { value: "ai", labelKey: "news.cat_ai", icon: Cpu },
    { value: "programming", labelKey: "news.cat_programming", icon: Code },
    { value: "gadgets", labelKey: "news.cat_gadgets", icon: Smartphone },
    { value: "startups", labelKey: "news.cat_startups", icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
          >
            <ArrowLeft size={16} />
            {t("news.back_to_site")}
          </Link>
          <span className="font-heading text-sm font-medium text-foreground tracking-wide">
            MRM<span className="text-primary">.</span>
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Título + Refresh */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t("news.title")}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {t("news.subtitle")}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all disabled:opacity-50 font-body"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            {t("news.refresh")}
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Período */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-muted/40 border border-border">
            {periodOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setPeriod(opt.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                    period === opt.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={12} />
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>

          {/* Categoria */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-muted/40 border border-border overflow-x-auto">
            {categoryOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setCategory(opt.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all ${
                    category === opt.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={12} />
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard featured />
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Erro */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle size={28} className="text-destructive" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {t("news.error_title")}
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              {t("news.error_desc")}
            </p>
            <button
              onClick={handleRefresh}
              className="mt-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t("news.retry")}
            </button>
          </div>
        )}

        {/* Sem resultados */}
        {!isLoading && !isError && filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Newspaper size={28} className="text-muted-foreground" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {t("news.empty_title")}
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              {t("news.empty_desc")}
            </p>
          </div>
        )}

        {/* Notícias */}
        {!isLoading && !isError && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured && <NewsCard article={featured} featured lang={lang} />}
            {rest.map((article, i) => (
              <NewsCard
                key={`${article.url}-${i}`}
                article={article}
                lang={lang}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer simples */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="font-body text-xs text-muted-foreground">
            {t("news.powered_by")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default News;
