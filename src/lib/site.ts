/**
 * Single source of truth for brand metadata.
 * Imported by metadata, JSON-LD schema, sitemap, robots, footer, etc.
 *
 * Update SITE_URL via NEXT_PUBLIC_SITE_URL env var when you deploy.
 */
export const site = {
  name: "Saurabh Bhayana",
  brand: "Saurabh Bhayana & Team",
  legalName: "Saurabh Bhayana & Team",
  tagline:
    "Website development, digital marketing & AI services for ambitious brands.",
  description:
    "Founder-led studio shipping conversion-focused websites, full-stack SEO & paid ads, and AI growth systems (incl. GEO/AEO/LLMO) for founders in India, the US, UK and EU. Strategy by Saurabh Bhayana. Execution by his 8-person team.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://saurabhbhayana.com",
  email: "hello@saurabhbhayana.com",
  founder: {
    name: "Saurabh Bhayana",
    jobTitle: "Founder, SEO & Growth Consultant",
    bio: "Saurabh Bhayana is a founder-led web development, digital marketing and AI services consultant based in Fatehabad, India. He has 5+ years of experience helping founders ship websites and growth systems for B2B SaaS, D2C and professional services companies.",
    sameAs: ["https://www.linkedin.com/in/saurabh-bhayana-63240a115/"],
  },
  org: {
    address: {
      city: "Fatehabad",
      region: "Haryana",
      country: "India",
      countryCode: "IN",
    },
    foundingDate: "2021-01-01",
    areaServed: ["India", "United States", "United Kingdom", "European Union"],
    serviceTypes: [
      "Website Development",
      "Digital Marketing",
      "AI Services",
      "SEO Services",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Large Language Model Optimization (LLMO)",
    ],
  },
  social: {
    linkedin: "https://www.linkedin.com/in/saurabh-bhayana-63240a115/",
  },
  ogImage: "/og.png",
} as const;

export type Site = typeof site;
