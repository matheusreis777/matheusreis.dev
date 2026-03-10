const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-heading text-sm font-medium text-foreground">Matheus Reis Mendonça</p>
          <p className="font-body text-xs text-muted-foreground">Fullstack Developer</p>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
