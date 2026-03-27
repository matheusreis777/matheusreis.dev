import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Clock,
  Newspaper,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

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

interface NewsResponse {
  totalArticles: number;
  articles: Article[];
  nextPage: string | null;
}

const NEWSDATA_API_KEY = "pub_824d888f4b7f43a6972d48b4a04ad446";

interface NewsDataResult {
  article_id: string;
  title: string;
  description: string | null;
  link: string;
  image_url: string | null;
  pubDate: string;
  source_name: string;
  source_url: string;
  category: string[];
  keywords: string[] | null;
}

// Termos que confirmam que o artigo é realmente sobre tecnologia
const TECH_TERMS = [
  "tecnologia",
  "technology",
  "software",
  "hardware",
  "app",
  "aplicativo",
  "inteligência artificial",
  "ia",
  "ai",
  "machine learning",
  "deep learning",
  "programação",
  "programming",
  "developer",
  "desenvolvedor",
  "código",
  "code",
  "startup",
  "fintech",
  "blockchain",
  "crypto",
  "criptomoeda",
  "bitcoin",
  "smartphone",
  "iphone",
  "android",
  "samsung",
  "apple",
  "google",
  "microsoft",
  "meta",
  "openai",
  "chatgpt",
  "gpt",
  "llm",
  "nvidia",
  "chip",
  "processador",
  "computador",
  "pc",
  "notebook",
  "tablet",
  "gadget",
  "wearable",
  "internet",
  "rede",
  "5g",
  "cloud",
  "nuvem",
  "servidor",
  "server",
  "dados",
  "data",
  "cibersegurança",
  "cybersecurity",
  "hacker",
  "segurança digital",
  "robô",
  "robot",
  "automação",
  "automation",
  "iot",
  "api",
  "web",
  "linux",
  "windows",
  "python",
  "javascript",
  "react",
  "angular",
  ".net",
  "github",
  "gitlab",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "realidade virtual",
  "vr",
  "ar",
  "realidade aumentada",
  "metaverso",
  "digital",
  "tech",
  "inovação",
  "innovation",
  "algoritmo",
  "algorithm",
  "banco de dados",
  "database",
  "tesla",
  "spacex",
  "elon musk",
  "semiconductor",
  "semicondutor",
  "pixel",
  "gaming",
  "game",
];

const isTechRelated = (article: NewsDataResult): boolean => {
  const text =
    `${article.title} ${article.description || ""} ${(article.keywords || []).join(" ")}`.toLowerCase();
  return TECH_TERMS.some((term) => text.includes(term));
};

const fetchNews = async (
  lang: string,
  cursor?: string,
): Promise<NewsResponse> => {
  const apiLang = lang.startsWith("pt") ? "pt" : "en";

  const url = new URL("https://newsdata.io/api/1/latest");
  url.searchParams.set("apikey", NEWSDATA_API_KEY);
  url.searchParams.set("category", "technology");
  url.searchParams.set("language", apiLang);
  url.searchParams.set("size", "10");
  url.searchParams.set(
    "q",
    apiLang === "pt"
      ? "tecnologia OR software OR inteligência artificial OR startup"
      : "technology OR software OR AI OR programming OR startup",
  );
  if (cursor) url.searchParams.set("page", cursor);

  let res = await fetch(url.toString());

  if (!res.ok && apiLang === "pt") {
    url.searchParams.set("language", "en");
    url.searchParams.set(
      "q",
      "technology OR software OR AI OR programming OR startup",
    );
    res = await fetch(url.toString());
  }

  if (!res.ok) throw new Error("Erro ao buscar notícias");

  const data = await res.json();
  const results: NewsDataResult[] = data.results || [];
  const techArticles = results.filter((a) => a.title && isTechRelated(a));

  return {
    totalArticles: techArticles.length,
    nextPage: data.nextPage ?? null,
    articles: techArticles.map((a) => ({
      title: a.title,
      description: a.description || "",
      url: a.link,
      image: a.image_url || null,
      publishedAt: a.pubDate,
      source: {
        name: a.source_name || "News",
        url: a.source_url || "",
      },
    })),
  };
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

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<NewsResponse>({
      queryKey: ["tech-news", lang],
      queryFn: () => fetchNews(lang),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (data) {
      setAllArticles(data.articles);
      setNextCursor(data.nextPage);
    }
  }, [data]);

  const handleRefresh = useCallback(() => {
    setAllArticles([]);
    setNextCursor(null);
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await fetchNews(lang, nextCursor);
      setAllArticles((prev) => [...prev, ...res.articles]);
      setNextCursor(res.nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  }, [nextCursor, isLoadingMore, lang]);

  const articles = allArticles;
  const featured = articles[0];
  const rest = articles.slice(1);

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
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
        {!isLoading && !isError && articles.length === 0 && (
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
        {!isLoading && !isError && articles.length > 0 && (
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

        {/* Carregar mais */}
        {!isLoading && !isError && articles.length > 0 && (
          <div className="flex justify-center mt-10">
            {nextCursor ? (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all disabled:opacity-50 font-body"
              >
                {isLoadingMore ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <ChevronDown size={15} />
                )}
                {lang.startsWith("pt") ? "Carregar mais" : "Load more"}
              </button>
            ) : (
              <p className="text-xs text-muted-foreground font-body">
                {lang.startsWith("pt")
                  ? "Todas as notícias carregadas"
                  : "All news loaded"}
              </p>
            )}
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
