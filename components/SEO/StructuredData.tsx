import { siteConfig, faqs, videoTutorials } from "@/lib/content";

// FAQPage 结构化数据
export function FAQStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// SoftwareApplication 结构化数据
export function SoftwareStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpenClaw",
    operatingSystem: "macOS, Linux, Windows (WSL2)",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Organization",
      name: "OpenClaw Community",
      url: "https://github.com/openclaw",
    },
    license: "https://opensource.org/licenses/MIT",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// VideoObject 结构化数据
export function VideoStructuredData() {
  const schemas = videoTutorials.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: "2026-01-01",
    duration: `PT${video.duration.replace(":", "M")}S`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    description: video.notes.map((n) => n.title).join(", "),
  }));

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// WebSite 结构化数据
export function WebSiteStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
