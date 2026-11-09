import { execSync } from "node:child_process"
import { getCollection } from "astro:content"

export const SITE_URL = "https://uhurus.com"

export const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "uhurus",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/favicon.svg`,
    contentUrl: `${SITE_URL}/favicon.svg`,
    caption: "uhurus",
  },
  image: { "@id": `${SITE_URL}/#logo` },
  description:
    "Laboratorio de producto e innovación. Diseño y desarrollo de soluciones digitales de alto impacto en toda España.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barakaldo",
    addressRegion: "Bizkaia",
    addressCountry: "ES",
  },
  email: "hola@uhurus.com",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: ["https://www.linkedin.com/company/uhurus"],
  publishingPrinciples: `${SITE_URL}/legal/aviso-legal`,
  copyrightHolder: { "@id": `${SITE_URL}/#organization` },
  copyrightYear: 2026,
  knowsAbout: ["Fintech", "Software Development", "Product Design", "MVP"],
}

export const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "uhurus",
  publisher: { "@id": `${SITE_URL}/#organization` },
}

export const coreNodes = [organization, website]

export async function serviceNodes() {
  const services = await getCollection("services")
  return services
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      "@type": "Service",
      "@id": `${SITE_URL}/servicios/${entry.id}#service`,
      url: `${SITE_URL}/servicios/${entry.id}`,
      name: entry.data.seo.title.replace(" | uhurus", ""),
      description: entry.data.seo.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "ES",
      serviceType: entry.data.title.replace(/<[^>]*>/g, ""),
    }))
}

export function gitLastmod(filePath: string): Date | null {
  try {
    const log = execSync(`git log -1 --format="%cI" -- "${filePath}"`, {
      encoding: "utf-8",
    }).trim()
    return log ? new Date(log) : null
  } catch {
    return null
  }
}

export function graphForPage({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  datePublished?: Date | string
  dateModified?: Date | string
}) {
  const breadcrumbLabel = title.replace(" | uhurus", "")
  const { pathname } = new URL(url)
  const toIso = (d: Date | string) => (d instanceof Date ? d.toISOString() : d)
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      item: { "@id": `${SITE_URL}/`, name: "Home" },
    },
  ]

  if (pathname.startsWith("/servicios/")) {
    itemListElement.push(
      {
        "@type": "ListItem",
        position: 2,
        item: { "@id": `${SITE_URL}/servicios`, name: "Servicios" },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: { "@id": url, name: breadcrumbLabel },
      },
    )
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...coreNodes,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "es-ES",
        ...(datePublished ? { datePublished: toIso(datePublished) } : {}),
        ...(dateModified ? { dateModified: toIso(dateModified) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement,
      },
    ],
  }
}
