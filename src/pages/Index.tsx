import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const HardSkillsSection = lazy(() => import("@/components/HardSkillsSection"));
const SoftSkillsSection = lazy(() => import("@/components/SoftSkillsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center section-glow"><div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin"></div></div>}>
          <AboutSection />
          <HardSkillsSection />
          <SoftSkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Index;
