import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Law Office of Troy M. Moore, PLLC",
  robots: { index: false },
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

const LINKS = [
  { label: "Practices",    href: "/practices" },
  { label: "Probate",      href: "/probate" },
  { label: "Estate Planning", href: "/estate-planning" },
  { label: "Blog",         href: "/blog" },
  { label: "Videos",       href: "/videos" },
  { label: "FAQ",          href: "/faq" },
  { label: "Our Team",     href: "/team-members" },
  { label: "Contact",      href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: center;
          min-height: calc(100vh - 72px);
          padding-top: calc(72px + clamp(3rem, 5vw, 5rem));
          padding-bottom: clamp(3rem, 5vw, 5rem);
        }
        @media (max-width: 800px) {
          .nf-grid {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-top: calc(72px + 3rem);
          }
          .nf-visual { display: none; }
        }

        .nf-numeral {
          font-family: var(--font-heading);
          font-size: clamp(6rem, 12vw, 14rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.12);
          user-select: none;
          pointer-events: none;
        }

        .nf-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nf-links li a {
          color: rgba(255,255,255,0.55);
          font-family: var(--font-eyebrow);
          font-size: clamp(0.62rem, 0.72vw, 0.78rem);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s ease;
        }
        .nf-links li a:hover { color: var(--gold); }
        .nf-links li a::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.6;
          flex-shrink: 0;
        }
      `}</style>

      <Navbar />

      <main style={{ background: "var(--hero-gradient)" }}>
        <div style={WRAP}>
          <div className="nf-grid">

            {/* ── Left: message ── */}
            <div>
              <p
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
                  marginBottom: "clamp(0.5rem, 0.8vw, 0.75rem)",
                }}
              >
                Error 404
              </p>

              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 3.5vw, 4rem)",
                  lineHeight: 1.15,
                  marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
                  maxWidth: "18ch",
                }}
              >
                This page doesn&apos;t exist.
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  lineHeight: 1.75,
                  maxWidth: "42ch",
                  marginBottom: "clamp(2rem, 3vw, 3rem)",
                }}
              >
                The link may be outdated or the page may have moved. Start from one of these sections, or call us directly.
              </p>

              <ul className="nf-links">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "clamp(2rem, 3.5vw, 3.5rem)",
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                  Call (281) 609-0303
                  <span className="cta-circle">
                    <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                      <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                      <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                      <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </span>
                </a>
                <a
                  href="/"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-eyebrow)",
                    fontSize: "clamp(0.62rem, 0.7vw, 0.78rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    textDecoration: "none",
                  }}
                >
                  ← Home
                </a>
              </div>
            </div>

            {/* ── Right: decorative numeral ── */}
            <div
              className="nf-visual"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "0",
              }}
            >
              <div className="nf-numeral">4</div>
              <div className="nf-numeral" style={{ marginTop: "-0.15em" }}>0</div>
              <div className="nf-numeral" style={{ marginTop: "-0.15em" }}>4</div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
