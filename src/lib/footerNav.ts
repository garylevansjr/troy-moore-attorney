export interface FooterNavItem {
  label: string;
  description: string;
  href: string;
}

export interface PageFooterNav {
  prev: FooterNavItem;
  next: FooterNavItem;
}

const DEFAULT: PageFooterNav = {
  prev: {
    label: "Practice Areas",
    description: "Probate, estate planning & litigation.",
    href: "/practices",
  },
  next: {
    label: "Meet Our Team",
    description: "25+ years of Texas probate & estate planning.",
    href: "/team-members",
  },
};

const NAV: Record<string, PageFooterNav> = {
  "/": {
    prev: { label: "Contact Us",     description: "Speak with an attorney today.",                href: "/contact"    },
    next: { label: "Practice Areas", description: "Probate, estate planning & litigation.",       href: "/practices"  },
  },
  "/about": {
    prev: { label: "Home",           description: "Return to the firm overview.",                 href: "/"           },
    next: { label: "Meet the Team",  description: "Our attorneys and staff are here to help.",    href: "/team-members" },
  },
  "/probate": {
    prev: { label: "Practice Areas", description: "Browse all services we offer.",                href: "/practices"  },
    next: { label: "Estate Planning",description: "Protect your family's future.",                href: "/estate-planning" },
  },
  "/estate-planning": {
    prev: { label: "Probate",        description: "Expert probate guidance for Texas families.",  href: "/probate"    },
    next: { label: "Practice Areas", description: "View all areas of practice.",                  href: "/practices"  },
  },
  "/practices": {
    prev: { label: "About the Firm", description: "25+ years of trusted Texas legal service.",    href: "/about"      },
    next: { label: "Contact Us",     description: "Schedule your free case review.",              href: "/contact"    },
  },
  "/service-areas": {
    prev: { label: "Practice Areas", description: "View all services we provide.",                href: "/practices"  },
    next: { label: "Contact Us",     description: "Ready to discuss your matter?",                href: "/contact"    },
  },
  "/team-members": {
    prev: { label: "About the Firm", description: "Learn more about our history and mission.",    href: "/about"      },
    next: { label: "Contact Us",     description: "Reach out to schedule a consultation.",        href: "/contact"    },
  },
  "/blog": {
    prev: { label: "FAQ",            description: "Answers to common probate questions.",         href: "/faq"        },
    next: { label: "Videos",         description: "Watch our educational video library.",         href: "/videos"     },
  },
  "/videos": {
    prev: { label: "Blog",           description: "Read our latest articles and insights.",       href: "/blog"       },
    next: { label: "FAQ",            description: "Common questions about Texas probate.",        href: "/faq"        },
  },
  "/faq": {
    prev: { label: "Blog",           description: "Articles on probate and estate planning.",     href: "/blog"       },
    next: { label: "Contact Us",     description: "Still have questions? We can help.",           href: "/contact"    },
  },
  "/contact": {
    prev: { label: "Meet the Team",  description: "Get to know the attorneys who'll serve you.", href: "/team-members" },
    next: { label: "Practice Areas", description: "Explore the services we offer.",              href: "/practices"  },
  },
  "/sitemap": {
    prev: { label: "Home",           description: "Return to the firm overview.",                 href: "/"           },
    next: { label: "Contact Us",     description: "Reach out to our team today.",                 href: "/contact"    },
  },
};

const DYNAMIC: Array<{ match: (p: string) => boolean; nav: PageFooterNav }> = [
  {
    match: (p) => p.startsWith("/practices/"),
    nav: {
      prev: { label: "All Practice Areas", description: "Browse every service we offer.",          href: "/practices"  },
      next: { label: "Free Consultation",  description: "Speak with an attorney — no obligation.", href: "/contact"    },
    },
  },
  {
    match: (p) => p.startsWith("/practice-areas/"),
    nav: {
      prev: { label: "Service Areas",      description: "All communities we serve.",               href: "/service-areas" },
      next: { label: "Free Case Review",   description: "Talk to us about your matter today.",     href: "/contact"    },
    },
  },
  {
    match: (p) => p.startsWith("/team-members/"),
    nav: {
      prev: { label: "Our Team",           description: "Meet all of our attorneys and staff.",    href: "/team-members" },
      next: { label: "Contact Us",         description: "Schedule a consultation today.",          href: "/contact"    },
    },
  },
  {
    match: (p) => p.startsWith("/blog/"),
    nav: {
      prev: { label: "All Articles",       description: "Browse our full blog archive.",           href: "/blog"       },
      next: { label: "Free Consultation",  description: "Questions? We're ready to help.",         href: "/contact"    },
    },
  },
  {
    match: (p) => p.startsWith("/videos/"),
    nav: {
      prev: { label: "All Videos",         description: "Browse our educational video library.",   href: "/videos"     },
      next: { label: "Blog",               description: "Read our latest legal insights.",         href: "/blog"       },
    },
  },
];

export function getFooterNav(pathname: string): PageFooterNav {
  if (NAV[pathname]) return NAV[pathname];
  for (const { match, nav } of DYNAMIC) {
    if (match(pathname)) return nav;
  }
  return DEFAULT;
}
