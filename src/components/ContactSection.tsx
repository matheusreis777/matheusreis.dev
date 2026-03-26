import { Phone, Mail, Linkedin, Contact } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contato" className="min-h-screen flex flex-col justify-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center justify-center gap-3">
            <Contact className="text-primary" size={32} />
            {t("contact.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-6 text-lg font-body">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <a href="tel:+5567991431860" className="flex flex-col items-center text-center p-8 bg-card/20 border border-border/40 rounded-3xl backdrop-blur-sm transition-all hover:bg-card/40 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              <Phone size={24} className="text-primary" />
            </div>
            <p className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("contact.phone")}</p>
            <p className="font-body text-base lg:text-lg text-foreground group-hover:text-primary transition-colors">+55 67 9 9143-1860</p>
          </a>
          
          <a href="mailto:matheusreismendonca1@gmail.com" className="flex flex-col items-center text-center p-8 bg-card/20 border border-border/40 rounded-3xl backdrop-blur-sm transition-all hover:bg-card/40 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              <Mail size={24} className="text-primary" />
            </div>
            <p className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("contact.email")}</p>
            <p className="font-body text-sm lg:text-base text-foreground group-hover:text-primary transition-colors break-words w-full">matheusreismendonca1<br/>@gmail.com</p>
          </a>
          
          <a href="https://www.linkedin.com/in/matheus-reis-584098306" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center p-8 bg-card/20 border border-border/40 rounded-3xl backdrop-blur-sm transition-all hover:bg-card/40 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              <Linkedin size={24} className="text-primary" />
            </div>
            <p className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("contact.linkedin")}</p>
            <p className="font-body text-sm lg:text-base text-foreground group-hover:text-primary transition-colors break-words w-full">matheus-reis-584098306</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
