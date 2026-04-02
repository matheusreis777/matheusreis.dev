import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import Footer from "@/components/Footer";

const Git = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border font-heading">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-heading"
          >
            <ArrowLeft size={16} />
            {t("github.back_to_site")}
          </Link>
          <span className="font-heading text-sm font-medium text-foreground tracking-wide">
            MRM<span className="text-primary">.</span>
          </span>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16">
        <GitHubActivitySection />
      </main>

      <Footer />
    </div>
  );
};

export default Git;
