import { Phone, Mail, Linkedin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="min-h-screen flex items-center section-glow py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Contato
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <a href="tel:+5567991431860" className="flex items-center gap-4 group">
                <Phone size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Telefone</p>
                  <p className="font-body text-foreground group-hover:text-primary transition-colors">+55 67 9 9143-1860</p>
                </div>
              </a>
              <a href="mailto:matheusreismendonca1@gmail.com" className="flex items-center gap-4 group">
                <Mail size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                  <p className="font-body text-foreground group-hover:text-primary transition-colors">matheusreismendonca1@gmail.com</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/matheus-reis-584098306" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <Linkedin size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">LinkedIn</p>
                  <p className="font-body text-foreground group-hover:text-primary transition-colors">linkedin.com/in/matheus-reis-584098306</p>
                </div>
              </a>
            </div>
            <div className="pt-6">
              <a
                href="https://wa.me/5567991431860"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-heading text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} />
                Entrar em contato pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
