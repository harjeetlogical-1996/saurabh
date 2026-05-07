import { Nav2 } from "@/components/v2/Nav2";
import { Hero2 } from "@/components/v2/Hero2";
import { LogoBar } from "@/components/v2/LogoBar";
import { Problem } from "@/components/v2/Problem";
import { Solution } from "@/components/v2/Solution";
import { Services } from "@/components/v2/Services";
import { CaseStudies } from "@/components/v2/CaseStudies";
import { AboutMe } from "@/components/v2/AboutMe";
import { Process } from "@/components/v2/Process";
import { FreeTools } from "@/components/v2/FreeTools";
import { Testimonials2 } from "@/components/v2/Testimonials2";
import { Packages } from "@/components/v2/Packages";
import { BlogPreview } from "@/components/v2/BlogPreview";
import { FAQ } from "@/components/v2/FAQ";
import { FinalCTA } from "@/components/v2/FinalCTA";
import { Footer2 } from "@/components/v2/Footer2";

export default function HomeV2() {
  return (
    <>
      <Nav2 />
      <main className="flex-1">
        <Hero2 />
        <LogoBar />
        <Problem />
        <Solution />
        <Services />
        <CaseStudies />
        <AboutMe />
        <Process />
        <FreeTools />
        <Testimonials2 />
        <Packages />
        <BlogPreview />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer2 />
    </>
  );
}
