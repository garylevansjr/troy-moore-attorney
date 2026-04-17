/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://troymoorelaw.com",
  generateRobotsTxt: true,
  outDir: "public",

  // Changefreq / priority overrides per path pattern
  changefreq: "weekly",
  priority: 0.7,

  transform: async (config, path) => {
    // Boost core conversion pages
    const highPriority = ["/", "/probate", "/estate-planning", "/contact", "/practices"];
    const medPriority = ["/about", "/faq", "/blog", "/videos", "/team-members", "/service-areas"];

    let priority = 0.6;
    let changefreq = "monthly";

    if (highPriority.includes(path)) {
      priority = 1.0;
      changefreq = "weekly";
    } else if (medPriority.some((p) => path.startsWith(p))) {
      priority = 0.75;
      changefreq = "weekly";
    } else if (path.startsWith("/practices/")) {
      priority = 0.85;
      changefreq = "monthly";
    } else if (path.startsWith("/practice-areas/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.65;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Pages to omit from sitemap
  exclude: [
    "/sitemap",
    "/privacy-policy",
    "/terms-and-conditions",
    "/copyright-notice",
    "/anti-spam-policy",
    "/helpful-links-resources",
  ],

  robotsTxtOptions: {
    policies: [
      // Standard crawlers
      { userAgent: "*", allow: "/" },

      // ── AI / LLM crawlers — allow everything ──────────────────────
      { userAgent: "GPTBot",            allow: "/" },
      { userAgent: "ChatGPT-User",      allow: "/" },
      { userAgent: "OAI-SearchBot",     allow: "/" },
      { userAgent: "Google-Extended",   allow: "/" },
      { userAgent: "Googlebot",         allow: "/" },
      { userAgent: "PerplexityBot",     allow: "/" },
      { userAgent: "ClaudeBot",         allow: "/" },
      { userAgent: "anthropic-ai",      allow: "/" },
      { userAgent: "cohere-ai",         allow: "/" },
      { userAgent: "FacebookBot",       allow: "/" },
      { userAgent: "Applebot",          allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Amazonbot",         allow: "/" },
      { userAgent: "CCBot",             allow: "/" },
      { userAgent: "Omgilibot",         allow: "/" },
    ],
    additionalSitemaps: [],
  },
};
