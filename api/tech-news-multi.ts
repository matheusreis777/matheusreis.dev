import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── API Keys ────────────────────────────────────────────────
const NEWSDATA_API_KEY = "pub_824d888f4b7f43a6972d48b4a04ad446";
const GNEWS_API_KEY = "a176687cae217492df237f68208aa4c6";
const CURRENTS_API_KEY = "Ue98yrrd6Ky-DGx5rRYIeZuwV4_dWDg_awDIHlUL4dphbArG";

// ─── Cache em memória ────────────────────────────────────────
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 3 * 60 * 1000; // 3 minutos

// ─── Interfaces ──────────────────────────────────────────────
interface Article {
    title: string;
    description: string;
    url: string;
    image: string | null;
    publishedAt: string;
    source: { name: string; url: string };
}

interface NewsDataResult {
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

interface GNewsArticle {
    title: string;
    description: string;
    url: string;
    image: string | null;
    publishedAt: string;
    source: { name: string; url: string };
}

interface CurrentsArticle {
    title: string;
    description: string;
    url: string;
    image: string | null;
    published: string;
}

// ─── Tech filter ─────────────────────────────────────────────
const TECH_TERMS = [
    "tecnologia", "technology", "software", "hardware", "app", "aplicativo",
    "inteligência artificial", "ia", "ai", "machine learning", "deep learning",
    "programação", "programming", "developer", "desenvolvedor", "código", "code",
    "startup", "fintech", "blockchain", "crypto", "bitcoin", "smartphone",
    "iphone", "android", "samsung", "apple", "google", "microsoft", "meta",
    "openai", "chatgpt", "gpt", "llm", "nvidia", "chip", "processador",
    "cloud", "nuvem", "servidor", "server", "dados", "data", "cibersegurança",
    "cybersecurity", "hacker", "robô", "robot", "automação", "automation",
    "iot", "api", "web", "linux", "python", "javascript", "react", "github",
    "aws", "azure", "docker", "kubernetes", "vr", "ar", "metaverso", "digital",
    "tech", "inovação", "innovation", "algoritmo", "algorithm", "database",
    "tesla", "spacex", "elon musk", "semiconductor", "gaming", "game",
];

function isTechRelated(title: string, description: string): boolean {
    const text = `${title} ${description}`.toLowerCase();
    return TECH_TERMS.some((term) => text.includes(term));
}

// ─── Fetch: NewsData.io ──────────────────────────────────────
async function fetchNewsData(lang: string, cursor?: string): Promise<{ articles: Article[]; nextPage: string | null }> {
    const apiLang = lang.startsWith("pt") ? "pt" : "en";
    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.set("apikey", NEWSDATA_API_KEY);
    url.searchParams.set("category", "technology");
    url.searchParams.set("language", apiLang);
    url.searchParams.set("size", "10");
    if (cursor) url.searchParams.set("page", cursor);

    let res = await fetch(url.toString());
    if (!res.ok && apiLang === "pt") {
        url.searchParams.set("language", "en");
        res = await fetch(url.toString());
    }
    if (!res.ok) return { articles: [], nextPage: null };

    const data = await res.json();
    const results: NewsDataResult[] = data.results || [];

    return {
        nextPage: data.nextPage ?? null,
        articles: results
            .filter((a) => a.title && isTechRelated(a.title, a.description || ""))
            .map((a) => ({
                title: a.title,
                description: a.description || "",
                url: a.link,
                image: a.image_url || null,
                publishedAt: a.pubDate,
                source: { name: a.source_name || "News", url: a.source_url || "" },
            })),
    };
}

// ─── Fetch: GNews (busca em EN para mais volume/recência) ────
async function fetchGNews(lang: string): Promise<Article[]> {
    if (!GNEWS_API_KEY) return [];

    // Busca em inglês para ter mais volume + artigos recentes
    // E também no idioma do user se for PT
    const languages = lang.startsWith("pt") ? ["en", "pt"] : ["en"];
    const allArticles: Article[] = [];

    for (const apiLang of languages) {
        try {
            const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=${apiLang}&max=10&apikey=${GNEWS_API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) continue;

            const data = await res.json();
            const articles = (data.articles || []).map((a: GNewsArticle) => ({
                title: a.title,
                description: a.description || "",
                url: a.url,
                image: a.image || null,
                publishedAt: a.publishedAt,
                source: { name: a.source?.name || "GNews", url: a.source?.url || "" },
            }));
            allArticles.push(...articles);
        } catch {
            // silently continue
        }
    }

    return allArticles;
}

// ─── Fetch: Currents API ─────────────────────────────────────
async function fetchCurrents(lang: string): Promise<Article[]> {
    if (!CURRENTS_API_KEY) return [];

    try {
        // Currents funciona melhor em EN
        const url = `https://api.currentsapi.services/v1/latest-news?category=technology&language=en&apiKey=${CURRENTS_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) return [];

        const data = await res.json();
        return (data.news || [])
            .filter((a: CurrentsArticle) => a.title)
            .slice(0, 15)
            .map((a: CurrentsArticle) => ({
                title: a.title,
                description: a.description || "",
                url: a.url,
                image: a.image && a.image !== "None" ? a.image : null,
                publishedAt: a.published,
                source: { name: "Currents", url: "" },
            }));
    } catch {
        return [];
    }
}

// ─── Deduplicação ────────────────────────────────────────────
function deduplicateArticles(articles: Article[]): Article[] {
    const seen = new Set<string>();
    return articles.filter((a) => {
        const key = a.title.toLowerCase().trim().slice(0, 80);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// ─── Tradução (Google Translate free endpoint) ───────────────
const TRANSLATE_SEPARATOR = " ||| ";

async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    if (texts.length === 0) return [];

    // Junta tudo com separador para traduzir numa única chamada
    const joined = texts.join(TRANSLATE_SEPARATOR);

    try {
        const url = new URL("https://translate.googleapis.com/translate_a/single");
        url.searchParams.set("client", "gtx");
        url.searchParams.set("sl", "auto");
        url.searchParams.set("tl", targetLang);
        url.searchParams.set("dt", "t");
        url.searchParams.set("q", joined);

        const res = await fetch(url.toString());
        if (!res.ok) return texts; // fallback: retorna originais

        const data = await res.json();
        // Resposta: [[["texto traduzido","texto original",null,null,10],...],null,"en",...]
        const translated = (data[0] as Array<[string]>)
            .map((segment: [string]) => segment[0])
            .join("");

        const parts = translated.split(/\s*\|\|\|\s*/);

        // Se a quantidade de partes bater, retorna; senão fallback
        if (parts.length === texts.length) return parts;

        return texts; // fallback seguro
    } catch {
        return texts; // fallback: retorna originais
    }
}

async function translateArticles(articles: Article[], targetLang: string): Promise<Article[]> {
    if (articles.length === 0) return [];

    const titles = articles.map((a) => a.title);
    const descriptions = articles.map((a) => a.description || "");

    const [translatedTitles, translatedDescs] = await Promise.all([
        translateBatch(titles, targetLang),
        translateBatch(descriptions, targetLang),
    ]);

    return articles.map((a, i) => ({
        ...a,
        title: translatedTitles[i] || a.title,
        description: translatedDescs[i] || a.description,
    }));
}

// ─── Handler ─────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    if (req.method === "OPTIONS") return res.status(200).end();

    const lang = typeof req.query.lang === "string" ? req.query.lang : "pt";
    const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;

    // Paginação: só NewsData suporta cursor
    if (cursor) {
        const cacheKey = `cursor-${cursor}`;
        if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_TTL) {
            res.setHeader("X-Cache", "HIT");
            return res.status(200).json(cache[cacheKey].data);
        }

        try {
            const nd = await fetchNewsData(lang, cursor);
            let articles = nd.articles;
            if (lang.startsWith("pt")) {
                articles = await translateArticles(articles, "pt");
            }
            const result = { totalArticles: articles.length, articles, nextPage: nd.nextPage };
            cache[cacheKey] = { data: result, timestamp: Date.now() };
            return res.status(200).json(result);
        } catch (err) {
            console.error("tech-news-multi cursor error:", err);
            return res.status(500).json({ error: "Erro ao carregar mais notícias." });
        }
    }

    // Carga inicial: cache check
    const cacheKey = `multi-${lang}`;
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_TTL) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("Cache-Control", "s-maxage=180, stale-while-revalidate=60");
        return res.status(200).json(cache[cacheKey].data);
    }

    try {
        // Busca em paralelo de todas as fontes
        const [ndResult, gnResult, crResult] = await Promise.allSettled([
            fetchNewsData(lang),
            fetchGNews(lang),
            fetchCurrents(lang),
        ]);

        const ndArticles = ndResult.status === "fulfilled" ? ndResult.value.articles : [];
        const ndNextPage = ndResult.status === "fulfilled" ? ndResult.value.nextPage : null;
        const gnArticles = gnResult.status === "fulfilled" ? gnResult.value : [];
        const crArticles = crResult.status === "fulfilled" ? crResult.value : [];

        const sourceInfo = {
            newsdata: ndArticles.length,
            gnews: gnArticles.length,
            currents: crArticles.length,
        };
        console.log("Sources fetched:", sourceInfo);

        if (ndArticles.length === 0 && gnArticles.length === 0 && crArticles.length === 0) {
            return res.status(502).json({ error: "Nenhuma fonte de notícias disponível." });
        }

        // Mescla, deduplica e ordena por data
        let merged = deduplicateArticles([...ndArticles, ...gnArticles, ...crArticles])
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        // Traduz para português se necessário
        if (lang.startsWith("pt")) {
            merged = await translateArticles(merged, "pt");
        }

        const result = {
            totalArticles: merged.length,
            articles: merged,
            nextPage: ndNextPage,
            sources: sourceInfo,
        };

        cache[cacheKey] = { data: result, timestamp: Date.now() };
        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", "s-maxage=180, stale-while-revalidate=60");
        return res.status(200).json(result);
    } catch (err) {
        console.error("tech-news-multi error:", err);
        return res.status(500).json({ error: "Erro ao buscar notícias." });
    }
}
