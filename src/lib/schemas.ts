export const SITE_URL = "https://troymoorelaw.com";
export const FIRM_NAME = "Law Office of Troy M. Moore, PLLC";
export const FIRM_PHONE = "+12816090303";
export const FIRM_EMAIL = "info@troymoorelaw.com";

const ADDRESSES = [
  {
    "@type": "PostalAddress",
    streetAddress: "20333 State Highway 249 Suite 140",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77070",
    addressCountry: "US",
  },
  {
    "@type": "PostalAddress",
    streetAddress: "408 E 7th Street Suite B",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77007",
    addressCountry: "US",
  },
];

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: FIRM_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/icon-white.svg`,
    telephone: FIRM_PHONE,
    email: FIRM_EMAIL,
    openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00",
    priceRange: "$$",
    address: ADDRESSES,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.9012,
      longitude: -95.5522,
    },
    areaServed: [
      "Houston, TX",
      "Harris County, TX",
      "Fort Bend County, TX",
      "Montgomery County, TX",
      "Brazoria County, TX",
      "Galveston County, TX",
      "Chambers County, TX",
      "Waller County, TX",
    ],
    knowsAbout: [
      "Texas Probate Law",
      "Estate Planning",
      "Will Contests",
      "Life Insurance Disputes",
      "Fiduciary Litigation",
      "Muniment of Title",
      "Heirship Proceedings",
    ],
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/team-members/troy-moore#person`,
      name: "Troy M. Moore",
      jobTitle: "Attorney",
      url: `${SITE_URL}/team-members/troy-moore`,
    },
    sameAs: [
      "https://www.facebook.com/troymmoorepllc/",
      "https://www.youtube.com/channel/UCeJvFWBkRiXtWwHaamQ-8Tg",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: FIRM_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160),
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.imageUrl ?? `${SITE_URL}/assets/og-default.jpg`,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/team-members/troy-moore#person`,
      name: "Troy M. Moore",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };
}

export function personSchema(member: {
  name: string;
  role: string;
  slug: string;
  bio: string;
  photo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team-members/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: `${SITE_URL}/team-members/${member.slug}`,
    image: member.photo ? `${SITE_URL}${member.photo}` : undefined,
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}

export function localServiceSchema(location: { name: string; county: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${FIRM_NAME} — ${location.name}`,
    url: `${SITE_URL}/practice-areas/${location.slug}`,
    telephone: FIRM_PHONE,
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.county,
      },
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}
