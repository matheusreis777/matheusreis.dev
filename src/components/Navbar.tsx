import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const links = [
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.soft_skills"), href: "#soft-skills" },
    { label: t("nav.experience"), href: "#experiencia" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.contact"), href: "#contato" },
    { label: t("nav.news"), href: "/news", isRoute: true },
    { label: t("nav.git"), href: "/git", isRoute: true },
  ];

  const toggleLanguage = () => {
    const nextLng = i18n.language.startsWith("pt") ? "en-US" : "pt-BR";
    i18n.changeLanguage(nextLng);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border font-heading">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-center h-16">
        <a
          href="#"
          className="font-heading text-sm font-medium text-foreground tracking-wide absolute left-6 md:left-12 lg:left-24"
        >
          MRM<span className="text-primary">.</span>
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="group relative font-body text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-colors hover:text-primary py-2"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-body text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-colors hover:text-primary py-2"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center absolute right-6 md:right-12 lg:right-24">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group"
            title={
              i18n.language.startsWith("pt")
                ? "Change to English"
                : "Mudar para Português"
            }
          >
            <Globe
              size={14}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/70 group-hover:text-primary">
              {i18n.language.startsWith("pt") ? "EN" : "PT"}
            </span>
          </button>
        </div>

        {/* Mobile menu controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground transition-colors"
          >
            <Globe size={18} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground p-1"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border bg-background/95 backdrop-blur-sm px-6 overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
              >
                {l.label}
              </a>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
