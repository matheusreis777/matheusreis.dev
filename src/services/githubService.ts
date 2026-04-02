export interface GitHubCommit {
    sha: string;
    message: string;
    date: string;
    url: string;
    branch: string;
}

export interface GitHubRepo {
    name: string;
    fullName: string;
    url: string;
    commits: GitHubCommit[];
    avatarUrl: string;
    author: string;
}

const CACHE_KEY = "github-activity";
const CACHE_TTL = 5 * 60 * 1000;

interface CachedData {
    data: GitHubRepo[];
    timestamp: number;
}

function getCached(): GitHubRepo[] | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const cached: CachedData = JSON.parse(raw);
        if (Date.now() - cached.timestamp > CACHE_TTL) {
            sessionStorage.removeItem(CACHE_KEY);
            return null;
        }
        return cached.data;
    } catch {
        return null;
    }
}

function setCache(data: GitHubRepo[]): void {
    try {
        sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, timestamp: Date.now() })
        );
    } catch {
        // sessionStorage full — ignore
    }
}

export async function fetchGitHubActivity(): Promise<GitHubRepo[]> {
    const cached = getCached();
    if (cached) return cached;

    const response = await fetch("/api/github-activity");
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data: GitHubRepo[] = await response.json();
    setCache(data);
    return data;
}
