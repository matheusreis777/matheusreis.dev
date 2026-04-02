import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink,
  GitCommit,
  GitBranch,
  Github,
  AlertCircle,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import {
  fetchGitHubActivity,
  type GitHubRepo,
  type GitHubCommit,
} from "@/services/githubService";
import { formatTimeAgo, isRecentCommit } from "@/lib/formatTimeAgo";

/* ── CommitItem ─────────────────────────────────────────────── */
const CommitItem = ({
  commit,
  lang,
}: {
  commit: GitHubCommit;
  lang: string;
}) => {
  const message =
    commit.message.length > 80
      ? commit.message.slice(0, 77) + "..."
      : commit.message;

  const isNew = isRecentCommit(commit.date);

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/commit flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-lg transition-colors hover:bg-primary/5"
    >
      <GitCommit
        size={14}
        className="mt-1 shrink-0 text-muted-foreground group-hover/commit:text-primary transition-colors"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground/90 font-mono leading-relaxed truncate group-hover/commit:text-primary transition-colors">
          {message}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-muted-foreground">
            {formatTimeAgo(commit.date, lang)}
          </span>
          {isNew && (
            <span className="text-[9px] font-heading font-semibold uppercase tracking-wider bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
              new
            </span>
          )}
        </div>
      </div>
      <ExternalLink
        size={12}
        className="mt-1.5 shrink-0 opacity-0 group-hover/commit:opacity-60 transition-opacity text-muted-foreground"
      />
    </a>
  );
};

/* ── RepoCard ───────────────────────────────────────────────── */
const RepoCard = ({
  repo,
  lang,
  index,
  isVisible,
}: {
  repo: GitHubRepo;
  lang: string;
  index: number;
  isVisible: boolean;
}) => {
  const { t } = useTranslation();
  const branch = repo.commits[0]?.branch || "main";

  return (
    <div
      className={`
        group relative bg-card/50 border border-border/50 rounded-2xl p-5
        backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
        ${isVisible ? "animate-fade-up opacity-100" : "opacity-0"}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={repo.avatarUrl}
            alt={repo.author}
            width={28}
            height={28}
            loading="lazy"
            className="rounded-full ring-1 ring-border shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-heading font-medium text-foreground truncate">
              {repo.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            <GitBranch size={10} />
            {branch}
          </span>
        </div>
      </div>

      {/* Commits */}
      <div className="divide-y divide-border/30">
        {repo.commits.map((commit) => (
          <CommitItem key={commit.sha} commit={commit} lang={lang} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border/30">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-heading text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
        >
          <Github size={12} />
          {t("github.view_repo")}
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
};

/* ── Skeleton ───────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-card/50 border border-border/50 rounded-2xl p-5 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-7 h-7 rounded-full bg-muted/60" />
      <div className="h-4 w-32 rounded bg-muted/60" />
      <div className="ml-auto h-5 w-16 rounded-full bg-muted/40" />
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-3 py-2.5">
        <div className="w-3.5 h-3.5 mt-1 rounded-full bg-muted/40" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-full rounded bg-muted/50" />
          <div className="h-2.5 w-20 rounded bg-muted/30" />
        </div>
      </div>
    ))}
    <div className="mt-4 pt-3 border-t border-border/30">
      <div className="h-3 w-28 rounded bg-muted/40" />
    </div>
  </div>
);

/* ── GitHubActivitySection ──────────────────────────────────── */
const GitHubActivitySection = () => {
  const { t, i18n } = useTranslation();
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubActivity()
      .then((data) => {
        if (!cancelled) {
          setRepos(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="py-20 section-glow">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Github size={20} className="text-primary" />
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
              {t("github.title")}
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl">
            {t("github.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div ref={gridRef}>
          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle size={32} className="text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-body text-sm">
                {t("github.error")}
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && repos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Github size={32} className="text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-body text-sm">
                {t("github.empty")}
              </p>
            </div>
          )}

          {/* Repos grid */}
          {!loading && !error && repos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo, index) => (
                <RepoCard
                  key={repo.fullName}
                  repo={repo}
                  lang={i18n.language}
                  index={index}
                  isVisible={gridVisible}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
