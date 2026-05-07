import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Logos } from "@/components/Logos";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Services } from "@/components/Services";
// Case studies hidden for now, uncomment to bring back:
// import { CaseStudies } from "@/components/CaseStudies";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { FreeTools } from "@/components/FreeTools";
import { Testimonial } from "@/components/Testimonial";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, servicesSchema } from "@/lib/schema";
import { getHomepageFaqs } from "@/lib/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Website Development, Digital Marketing & AI Services for Founders",
  description:
    "Founder-led web development, digital marketing, and AI services (incl. GEO/AEO/LLMO) for ambitious brands. Conversion-focused websites on Next.js, Webflow & Shopify, full-stack SEO and Google + Meta ads, and AI growth systems. India · US · UK · EU.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Saurabh Bhayana — Website Development, Digital Marketing & AI Services",
    description:
      "Founder-led growth without the agency bloat. Strategy by Saurabh. Execution by his team. Three services: Website Development, Digital Marketing, AI Services.",
    url: site.url,
    type: "website",
  },
};

export default async function Home() {
  const faqs = await getHomepageFaqs();
  return (
    <>
      <Navbar />
      <main id="main" role="main" className="flex-1">
        <Hero />
        <Logos />
        <Problem />
        <Solution />
        <Services />
        <About />
        <Process />
        <FreeTools />
        <Testimonial />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      {/* Page-specific JSON-LD: Service catalog + FAQPage. The site-wide
          Organization, Person, and WebSite schema live in app/layout.tsx. */}
      <JsonLd id="ld-services-home" data={servicesSchema()} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqs)} />
    </>
  );
}
