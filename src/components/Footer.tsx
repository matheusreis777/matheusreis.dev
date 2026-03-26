import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-heading text-sm font-medium text-foreground">Matheus Reis Mendonça</p>
          <p className="font-body text-xs text-muted-foreground">Fullstack Developer</p>
        </div>
        <Link
          to="/biblia"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body"
        >
          <BookOpen size={13} />
          Bíblia Online
        </Link>
        <p className="font-body text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
