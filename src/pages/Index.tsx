import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HardSkillsSection from "@/components/HardSkillsSection";
import SoftSkillsSection from "@/components/SoftSkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <HardSkillsSection />
        <SoftSkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
