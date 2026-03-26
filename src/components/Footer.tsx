import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <p className="font-heading text-sm font-medium text-foreground">{t("footer.name")}</p>
          <p className="font-body text-xs text-muted-foreground">{t("footer.role")}</p>
        </div>
        <a
          href="https://biblia.matheusreis.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body"
        >
          <BookOpen size={13} />
          {t("footer.bible")}
        </a>
        <p className="font-body text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
