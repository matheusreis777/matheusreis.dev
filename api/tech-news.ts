import type { VercelRequest, VercelResponse } from "@vercel/node";

// Cache em memória: { key: { data, timestamp } }
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

const NEWSDATA_API_KEY = "pub_824d888f4b7f43a6972d48b4a04ad446";

interface NewsDataArticle {
    article_id: string;
    title: string;
    description: string | null;
    link: string;
    image_url: string | null;
    pubDate: string;
    source_name: string;
    source_url: string;
    category: string[];
    language: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    if (req.method === "OPTIONS") return res.status(200).end();

    const lang = typeof req.query.lang === "string" ? req.query.lang : "pt";
    const period = typeof req.query.period === "string" ? req.query.period : "7d";
    const cacheKey = `${lang}-${period}`;

    // Verifica cache em memória
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_TTL) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
        return res.status(200).json(cache[cacheKey].data);
    }

    try {
        // newsdata.io — notícias de tecnologia
        const url = new URL("https://newsdata.io/api/1/latest");
        url.searchParams.set("apikey", NEWSDATA_API_KEY);
        url.searchParams.set("category", "technology");
        url.searchParams.set("size", "30");

        if (lang === "pt") {
            url.searchParams.set("language", "pt");
            url.searchParams.set("country", "br");
            url.searchParams.set("q", "tecnologia OR software OR inteligência artificial OR programação OR startup OR smartphone OR inovação");
        } else {
            url.searchParams.set("language", "en");
            url.searchParams.set("q", "technology OR software OR AI OR programming OR startup OR smartphone OR innovation");
        }

        // Filtra por período
        if (period === "1d") {
            url.searchParams.set("timeframe", "24");
        }

        const apiRes = await fetch(url.toString());

        if (!apiRes.ok) {
            // Fallback: tenta inglês se PT falhar
            if (lang === "pt") {
                url.searchParams.set("language", "en");
                url.searchParams.delete("country");
                const fallbackRes = await fetch(url.toString());
                if (fallbackRes.ok) {
                    const fallbackData = await fallbackRes.json();
                    const normalized = normalizeResponse(fallbackData);
                    cache[cacheKey] = { data: normalized, timestamp: Date.now() };
                    res.setHeader("X-Cache", "MISS-FALLBACK");
                    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
                    return res.status(200).json(normalized);
                }
            }
            throw new Error(`newsdata.io error: ${apiRes.status}`);
        }

        const data = await apiRes.json();
        const normalized = normalizeResponse(data);

        cache[cacheKey] = { data: normalized, timestamp: Date.now() };

        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
        return res.status(200).json(normalized);
    } catch (err) {
        console.error("tech-news error:", err);
        return res.status(500).json({ error: "Não foi possível buscar as notícias." });
    }
}

function normalizeResponse(data: { totalResults?: number; results?: NewsDataArticle[] }) {
    const articles = (data.results || [])
        .filter((a) => a.title)
        .map((a) => ({
            title: a.title,
            description: a.description || "",
            url: a.link,
            image: a.image_url || null,
            publishedAt: a.pubDate,
            tags: a.category || [],
            source: {
                name: a.source_name || "News",
                url: a.source_url || "",
            },
        }));

    return { totalArticles: articles.length, articles };
}
