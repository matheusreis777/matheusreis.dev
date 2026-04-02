const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const WEEK = 604800;
const MONTH = 2592000;

interface TimeUnits {
    now: string;
    minutes: string;
    hours: string;
    days: string;
    weeks: string;
    months: string;
    ago: string;
}

const units: Record<string, TimeUnits> = {
    pt: {
        now: "agora",
        minutes: "min",
        hours: "h",
        days: "d",
        weeks: "sem",
        months: "mês",
        ago: "atrás",
    },
    en: {
        now: "just now",
        minutes: "min",
        hours: "h",
        days: "d",
        weeks: "w",
        months: "mo",
        ago: "ago",
    },
};

export function formatTimeAgo(dateStr: string, lang = "pt"): string {
    const u = units[lang.startsWith("pt") ? "pt" : "en"];
    const seconds = Math.floor(
        (Date.now() - new Date(dateStr).getTime()) / 1000
    );

    if (seconds < 60) return u.now;
    if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)} ${u.minutes} ${u.ago}`;
    if (seconds < DAY) return `${Math.floor(seconds / HOUR)} ${u.hours} ${u.ago}`;
    if (seconds < WEEK) return `${Math.floor(seconds / DAY)} ${u.days} ${u.ago}`;
    if (seconds < MONTH) return `${Math.floor(seconds / WEEK)} ${u.weeks} ${u.ago}`;
    return `${Math.floor(seconds / MONTH)} ${u.months} ${u.ago}`;
}

export function isRecentCommit(dateStr: string): boolean {
    return Date.now() - new Date(dateStr).getTime() < 24 * 60 * 60 * 1000;
}
