import { EducationStackSection } from "@/components/sections/EducationStackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeaderNavbar } from "@/components/sections/HeaderNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { StickyProjectsSection } from "@/components/sections/StickyProjectsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <HeaderNavbar />
      <main>
        <HeroSection />
        <StickyProjectsSection />
        <PortfolioSection />
        <ExperienceSection />
        <EducationStackSection />
      </main>
      <FooterSection />
    </div>
  );
}
