/**
 * Schema.org JSON-LD builders.
 *
 * Each function returns a plain object you can drop into <JsonLd data={...}/>.
 * Builders are pure (no I/O) so they're safe in any rendering environment.
 *
 * SEO note: we use named graph references (`@id`) so multiple schemas on the
 * same page share entities. This is the "richer" approach Google + LLMs prefer.
 */
import { site } from "./site";

const ORG_ID = `${site.url}#organization`;
const PERSON_ID = `${site.url}#founder`;
const SITE_ID = `${site.url}#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.brand,
    legalName: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}${site.ogImage}`,
    foundingDate: site.org.foundingDate,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.org.address.city,
      addressRegion: site.org.address.region,
      addressCountry: site.org.address.countryCode,
    },
    areaServed: site.org.areaServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    serviceType: [...site.org.serviceTypes],
    sameAs: [...site.founder.sameAs],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
  } as const;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    description: site.founder.bio,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    email: site.email,
    worksFor: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.org.address.city,
      addressRegion: site.org.address.region,
      addressCountry: site.org.address.countryCode,
    },
    sameAs: [...site.founder.sameAs],
    knowsAbout: [
      "Website development",
      "Digital marketing",
      "Search engine optimization",
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Large Language Model Optimization",
      "Conversion rate optimization",
      "Next.js",
      "Webflow",
      "Shopify",
      "WordPress",
      "AI agents",
      "Anthropic Claude API",
      "OpenAI API",
    ],
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.brand,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  } as const;
}

/**
 * Service schema for the homepage. We aggregate the 3 service lines as one
 * Service with hasOfferCatalog so search/AI engines can pick up the catalog.
 */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital growth services",
    provider: { "@id": ORG_ID },
    areaServed: site.org.areaServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Saurabh Bhayana & Team — Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description:
              "Custom design, e-commerce, web apps, and integrations on Next.js, Webflow, WordPress, and Shopify.",
            url: `${site.url}/services/website-development`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
            description:
              "Full-stack growth marketing: SEO, Google & Meta Ads, content, social, email, CRO, and analytics.",
            url: `${site.url}/services/digital-marketing`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Services",
            description:
              "AI SEO (GEO/AEO/LLMO), AI content, AI chatbots, AI sales outreach, and custom OpenAI/Anthropic integrations.",
            url: `${site.url}/services/ai-services`,
          },
        },
      ],
    },
  } as const;
}

/**
 * Service schema for an individual sub-service page (e.g. Custom Website
 * Design). Pairs with breadcrumbSchema + faqSchema on the same page.
 */
export function singleServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  /** Absolute or root-relative image URL — we resolve it against site.url. */
  image?: string;
  /** Optional offerings the service includes. Each gets a sub-Service entry
   *  inside hasOfferCatalog so engines can lift specific deliverables. */
  offerings?: ReadonlyArray<{ name: string; description?: string }>;
}) {
  const image = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : `${site.url}${opts.image.startsWith("/") ? opts.image : `/${opts.image}`}`
    : `${site.url}${site.ogImage}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    image,
    provider: { "@id": ORG_ID },
    areaServed: site.org.areaServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    ...(opts.offerings && opts.offerings.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${opts.name} — what's included`,
            itemListElement: opts.offerings.map((o) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.name,
                ...(o.description ? { description: o.description } : {}),
              },
            })),
          },
        }
      : {}),
  } as const;
}

export function faqSchema(
  faqs: ReadonlyArray<{ q: string; a: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(f.a),
      },
    })),
  } as const;
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  } as const;
}

/** Strip HTML tags safely for schema text fields. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}
