/**
 * Centralized SEO, Brand, Entity, and Local Search Configuration for BIODROPS.
 * Single source of truth across metadata, JSON-LD structured data, sitemaps, and robots.
 */

export const SITE_CONFIG = {
  brandName: "BIODROPS",
  brandNameFull: "BIODROPS — Premium Packaged Mineral Water",
  parentCompany: "Biofix Technology LLP",
  parentCompanyUrl: "https://biofixtechnology.com",
  siteUrl: "https://www.biodropsindia.com",
  siteUrlAlt: "https://biodropsindia.com",
  tagline: "Quality can be canned.",
  description:
    "Kerala's premier 14-stage purified packaged mineral water brand by Biofix Technology LLP. Mineral-balanced 20L jars with instant online batch verification. Certified under BIS IS 14543 and FSSAI standards.",

  // Contact & NAP (Name, Address, Phone)
  contact: {
    phone: "+91-88845-77773",
    phoneDisplay: "+91 88845 77773",
    email: "hello@biodrops.com",
    whatsapp: "https://wa.me/918884577773",
    customerServiceHours: "Mo-Sa 08:00-19:00",
  },

  // Registered / Corporate Office Address (Verified NAP)
  address: {
    streetAddress: "MC Building, Bypass Road",
    addressLocality: "Kondotty",
    addressRegion: "Kerala",
    postalCode: "673638",
    addressCountry: "IN",
  },

  // Geographic & Local SEO
  geo: {
    region: "Kerala",
    country: "India",
    countryCode: "IN",
    state: "Kerala",
    serviceAreas: [
      "Kerala",
      "Kozhikode (Calicut)",
      "Malappuram",
      "Ernakulam (Kochi)",
      "Thrissur",
      "Kannur",
      "Palakkad",
    ],
  },

  // Accreditations & Standards
  standards: [
    "Bureau of Indian Standards (BIS IS:14543)",
    "Food Safety and Standards Authority of India (FSSAI)",
    "ISO 9001:2015 Quality Management",
    "Biofix Quality Management System (BQMS)",
  ],

  // Social & Entity Profiles (SameAs)
  socialProfiles: [
    "https://www.instagram.com/biodrops.india",
    "https://biofixtechnology.com",
  ],

  // Default Assets
  images: {
    ogImage: "https://www.biodropsindia.com/images/premium-jar-studio.jpg",
    logo: "https://www.biodropsindia.com/images/logo.png",
    jarImage: "https://www.biodropsindia.com/images/biodrops-jar.png",
  },
};

/**
 * Cleanly format canonical URLs
 */
export function buildCanonical(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? SITE_CONFIG.siteUrl : `${SITE_CONFIG.siteUrl}${cleanPath}`;
}

/**
 * Organization + LocalBusiness Structured Data (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.parentCompany,
    alternateName: ["biodrops", "Bio Drops", "BIODROPS India", "BIODROPS Mineral Water", "Biodrops Water", "BIODROPS Official"],
    url: SITE_CONFIG.siteUrl,
    logo: SITE_CONFIG.images.logo,
    image: SITE_CONFIG.images.ogImage,
    description: SITE_CONFIG.description,
    disambiguatingDescription:
      "Official manufacturer and distributor of BIODROPS 14-stage purified packaged drinking mineral water in 20L jars across Kerala, distinct from wastewater treatment or domestic purifiers.",
    slogan: SITE_CONFIG.tagline,
    knowsAbout: [
      "Packaged Drinking Water",
      "14-Stage Water Purification",
      "Bureau of Indian Standards IS 14543",
      "FSSAI Water Quality Regulations",
      "20L Mineral Water Delivery Kerala",
    ],
    parentOrganization: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.parentCompanyUrl}/#organization`,
      name: SITE_CONFIG.parentCompany,
      url: SITE_CONFIG.parentCompanyUrl,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    areaServed: SITE_CONFIG.geo.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    sameAs: SITE_CONFIG.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contact.phone,
      contactType: "customer service",
      email: SITE_CONFIG.contact.email,
      areaServed: SITE_CONFIG.geo.countryCode,
      availableLanguage: ["English", "Malayalam"],
    },
  };
}

/**
 * LocalBusiness schema for Local Search & Maps
 */
export function generateLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.siteUrl}/#localbusiness`,
    name: SITE_CONFIG.brandNameFull,
    image: SITE_CONFIG.images.ogImage,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    url: SITE_CONFIG.siteUrl,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    areaServed: SITE_CONFIG.geo.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
  };
}

/**
 * WebSite Schema with optional search action
 */
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.siteUrl}/#website`,
    url: SITE_CONFIG.siteUrl,
    name: SITE_CONFIG.brandName,
    alternateName: ["biodrops", "Bio Drops", "BIODROPS Water", "BIODROPS Official Website"],
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}/KNOWYOURWATER?batch={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Sitelinks Navigation List Schema
 */
export function generateSitelinksSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_CONFIG.siteUrl}/#sitenavigation`,
    name: "BIODROPS Primary Navigation",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Know Your Water",
        description: "Enter your 20L jar sleeve batch number to inspect certified water quality test reports",
        url: `${SITE_CONFIG.siteUrl}/KNOWYOURWATER`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Purification Process",
        description: "Explore the clinical 14-stage water purification pipeline from sand filtration to UV and ozone sterilization",
        url: `${SITE_CONFIG.siteUrl}/process`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "BQMS System",
        description: "Biofix Quality Management System ensuring BIS IS 14543 and FSSAI standards",
        url: `${SITE_CONFIG.siteUrl}/bqms`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Why BIODROPS",
        description: "Zero contaminants, balanced pH 7.4, and touch-free automated bottling in Kerala",
        url: `${SITE_CONFIG.siteUrl}/why-us`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Certifications",
        description: "BIS IS 14543, FSSAI, and ISO 9001:2015 national compliance and accreditations",
        url: `${SITE_CONFIG.siteUrl}/certifications`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Frequently Asked Questions",
        description: "Common questions about BIODROPS water purity, corporate delivery, and testing reports",
        url: `${SITE_CONFIG.siteUrl}/faq`,
      },
    ],
  };
}

/**
 * Product Schema for 20L Water Jar
 */
export function generateProductSchema() {
  return {
    "@type": "Product",
    "@id": `${SITE_CONFIG.siteUrl}/#product`,
    name: "BIODROPS Premium Mineral Water 20L",
    image: SITE_CONFIG.images.ogImage,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.brandName,
      slogan: SITE_CONFIG.tagline,
    },
    manufacturer: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    description:
      "14-stage purified premium packaged drinking water in a 20-liter heavy-duty jar featuring our signature BQMS pure lock safety sleeve and online batch verification.",
    category: "Packaged Drinking Water",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${SITE_CONFIG.siteUrl}/#organization`,
      },
    },
  };
}

/**
 * Breadcrumb Schema Generator
 */
export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: buildCanonical(item.path),
      })),
    ],
  };
}
