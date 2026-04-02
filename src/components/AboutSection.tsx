import { User, Briefcase, Database, GraduationCap, FileText, Download, Maximize2, Award } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation, Trans } from "react-i18next";
import { useInView } from "@/hooks/use-in-view";

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: topGridRef, isInView: topGridVisible } = useInView();
  const { ref: bottomRef, isInView: bottomVisible } = useInView();

  const documents = [
    {
      name: "Diploma ADS",
      category: t("about.doc_grad"),
      issuer: "UNIDERP",
      file: "/DiplomaDigital-ADS-MatheusReisMendonca.pdf",
      icon: GraduationCap,
    },
    {
      name: t("pt-BR") === "pt-BR" ? "Entendendo a web por baixo dos panos" : "Understanding the web under the hood",
      category: t("about.doc_course"),
      issuer: "Alura",
      file: "/Matheus Reis Mendonça - Curso HTTP_ Entendendo a web por baixo dos panos - Alura.pdf",
      icon: Award,
    },
  ];

  return (
    <section id="sobre" className="min-h-screen flex items-center section-glow py-24 mb-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div
          ref={headerRef}
          className={`mb-12 transition-opacity duration-700 ${headerVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground flex items-center gap-3">
            <User className="text-primary" size={32} />
            {t("about.title")}
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
        </div>

        {/* Top Grid: Profile + Highlights side-by-side with Bio */}
        <div ref={topGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Sidebar Area (Left) */}
          <div className={`lg:col-span-4 flex flex-col gap-6 transition-opacity duration-700 ${topGridVisible ? "animate-slide-in-left stagger-1" : "opacity-0"}`}>
            {/* Perfil Compacto */}
            <div className="bg-card/20 border border-border/40 rounded-3xl p-6 backdrop-blur-sm shadow-sm flex flex-col items-center text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-zoom-in relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors mb-4 group">
                    <img 
                      src="/profile-me.jpg" 
                      alt="Matheus Reis Mendonça" 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none sm:rounded-none">
                  <img 
                    src="/profile-me.jpg" 
                    alt="Matheus Reis Mendonça" 
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </DialogContent>
              </Dialog>
              
              <h3 className="font-heading text-lg font-semibold text-foreground">Matheus Reis Mendonça</h3>
              <p className="text-primary text-xs font-medium tracking-[0.1em] uppercase mt-1">{t("nav.about")} Pleno</p>
            </div>

            {/* Destaques */}
            <div className="bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm shadow-sm transition-all hover:bg-card/30 flex-1">
              <h3 className="font-heading text-xl font-medium text-foreground mb-6">{t("about.highlights_title")}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-semibold text-foreground">{t("about.exp_years")}</p>
                    <p className="text-muted-foreground text-sm font-body mt-1">{t("about.exp_desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Database className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-semibold text-foreground">{t("about.db_years")}</p>
                    <p className="text-muted-foreground text-sm font-body mt-1">{t("about.db_desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-semibold text-foreground">{t("about.edu_title")}</p>
                    <p className="text-muted-foreground text-sm font-body mt-1">{t("about.edu_desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Content Area (Right) */}
          <div className={`lg:col-span-8 flex flex-col transition-opacity duration-700 ${topGridVisible ? "animate-slide-in-right stagger-2" : "opacity-0"}`}>
            <div className="bg-card/20 border border-border/40 rounded-3xl p-8 lg:p-10 h-full backdrop-blur-sm transition-all hover:bg-card/30">
              <div className="prose prose-invert max-w-none text-justify">
                <p className="text-foreground text-lg leading-relaxed font-body mb-6">
                  <Trans i18nKey="about.bio_intro">
                    Olá, sou o <span className="font-semibold text-primary">Matheus Reis Mendonça</span>, um Desenvolvedor Fullstack Pleno focado em criar sistemas robustos, escaláveis e eficientes, atuando desde a modelagem de dados até a interface do usuário.
                  </Trans>
                </p>
                
                <h4 className="text-foreground font-heading font-medium text-xl mt-8 mb-4 border-b border-border/50 pb-2 text-left">{t("about.bio_trajectory_title")}</h4>
                <p className="text-muted-foreground text-base leading-relaxed font-body mb-4">
                  {t("about.bio_trajectory_p1")}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed font-body mb-4">
                  <Trans i18nKey="about.bio_trajectory_p2">
                    Minha principal expertise reside no backend utilizando <strong className="text-foreground font-medium">C# e a plataforma .NET</strong>, a qual emprego no desenvolvimento de APIs REST escaláveis para sistemas corporativos, garantindo a performance da lógica de negócios mais complexa.
                  </Trans>
                </p>

                <h4 className="text-foreground font-heading font-medium text-xl mt-8 mb-4 border-b border-border/50 pb-2 text-left">{t("about.bio_work_title")}</h4>
                <p className="text-muted-foreground text-base leading-relaxed font-body mb-4">
                  {t("about.bio_work_p1")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Curriculum & Documents */}
        <div
          ref={bottomRef}
          className={`mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-700 ${bottomVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          
          {/* Currículo Card */}
          <div className="lg:col-span-4 bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm shadow-sm transition-all hover:bg-card/30 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <FileText className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">{t("about.resume_title")}</h3>
            <p className="text-muted-foreground text-sm font-body mb-6">{t("about.resume_desc")}</p>
            <Button variant="secondary" size="sm" asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
              <a href="/MATHEUS REIS MENDONÇA - CURRICULO.pdf" download className="flex items-center gap-2">
                <Download size={16} />
                {t("about.resume_btn")}
              </a>
            </Button>
          </div>

          {/* Certificados & Diplomas Table */}
          <div className="lg:col-span-8 bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm shadow-sm transition-all hover:bg-card/30">
            <h3 className="font-heading text-xl font-medium text-foreground mb-6 flex items-center gap-3">
              <Award className="text-primary" size={24} />
              {t("about.certs_title")}
            </h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40 hover:bg-transparent">
                    <TableHead className="text-foreground/70 font-heading">{t("about.table_doc")}</TableHead>
                    <TableHead className="text-foreground/70 font-heading hidden md:table-cell">{t("about.table_type")}</TableHead>
                    <TableHead className="text-foreground/70 font-heading hidden sm:table-cell">{t("about.table_issuer")}</TableHead>
                    <TableHead className="text-right text-foreground/70 font-heading">{t("about.table_action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, idx) => (
                    <TableRow key={idx} className="border-border/40 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <doc.icon size={18} className="text-primary shrink-0" />
                          <span className="text-foreground font-body">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground border border-border/50 font-body">
                          {doc.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-body hidden sm:table-cell">
                        {doc.issuer}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild title={t("hero.btn_download")}>
                            <a href={doc.file} download>
                              <Download size={16} />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
