import type { VercelRequest, VercelResponse } from "@vercel/node";

interface GitHubCommit {
    sha: string;
    message: string;
}

interface GitHubEvent {
    type: string;
    repo: { name: string };
    payload: {
        ref?: string;
        commits?: GitHubCommit[];
    };
    created_at: string;
    actor: {
        avatar_url: string;
        display_login: string;
    };
}

interface ProcessedCommit {
    sha: string;
    message: string;
    date: string;
    url: string;
    branch: string;
}

interface ProcessedRepo {
    name: string;
    fullName: string;
    url: string;
    commits: ProcessedCommit[];
    avatarUrl: string;
    author: string;
}

const cache: { data: ProcessedRepo[] | null; timestamp: number } = {
    data: null,
    timestamp: 0,
};
const CACHE_TTL = 5 * 60 * 1000;

const GITHUB_USERNAME = "matheusreis777";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    if (req.method === "OPTIONS") return res.status(200).end();

    if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
        return res.status(200).json(cache.data);
    }

    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "User-Agent": "matheus-reis-portfolio",
        };

        const token = process.env.GITHUB_TOKEN;
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
            { headers }
        );

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const events: GitHubEvent[] = await response.json();

        const repoMap = new Map<string, ProcessedRepo>();

        for (const event of events) {
            if (event.type !== "PushEvent" || !event.payload.commits) continue;

            const repoFullName = event.repo.name;
            const repoShortName = repoFullName.split("/").pop() || repoFullName;
            const branch = event.payload.ref?.replace("refs/heads/", "") || "main";

            if (!repoMap.has(repoFullName)) {
                repoMap.set(repoFullName, {
                    name: repoShortName,
                    fullName: repoFullName,
                    url: `https://github.com/${repoFullName}`,
                    commits: [],
                    avatarUrl: event.actor.avatar_url,
                    author: event.actor.display_login,
                });
            }

            const repo = repoMap.get(repoFullName)!;

            for (const commit of event.payload.commits) {
                if (repo.commits.length >= 3) break;
                if (repo.commits.some((c) => c.sha === commit.sha)) continue;

                repo.commits.push({
                    sha: commit.sha,
                    message: commit.message,
                    date: event.created_at,
                    url: `https://github.com/${repoFullName}/commit/${commit.sha}`,
                    branch,
                });
            }
        }

        const result = Array.from(repoMap.values())
            .filter((r) => r.commits.length > 0)
            .sort((a, b) => {
                const dateA = new Date(a.commits[0].date).getTime();
                const dateB = new Date(b.commits[0].date).getTime();
                return dateB - dateA;
            })
            .slice(0, 5);

        cache.data = result;
        cache.timestamp = Date.now();

        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
        return res.status(200).json(result);
    } catch (error) {
        console.error("GitHub Activity API Error:", error);
        return res.status(500).json({ error: "Failed to fetch GitHub activity" });
    }
}
