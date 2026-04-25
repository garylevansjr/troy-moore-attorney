import TestimonialCarousel from "./TestimonialCarousel";

interface PageCTAProps {
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  children: React.ReactNode;
  id?: string;
}

const ROW: React.CSSProperties = {
  paddingTop: "clamp(1rem, 1.5vw, 1.75rem)",
  paddingBottom: "clamp(1rem, 1.5vw, 1.75rem)",
  borderTop: "1px solid rgba(255,255,255,0.14)",
};

export default function PageCTA({ eyebrow, heading, description, children, id }: PageCTAProps) {
  return (
    <section
      id={id}
      style={{
        background: [
          "radial-gradient(ellipse at 18% 30%, rgba(14, 62, 115, 0.75) 0%, transparent 46%)",
          "radial-gradient(ellipse at 82% 70%, rgba(3, 10, 28, 0.85) 0%, transparent 44%)",
          "radial-gradient(ellipse at 60% 8%, rgba(10, 44, 90, 0.55) 0%, transparent 38%)",
          "radial-gradient(ellipse at 30% 92%, rgba(5, 18, 48, 0.65) 0%, transparent 36%)",
          "radial-gradient(ellipse at 90% 18%, rgba(15, 58, 112, 0.5) 0%, transparent 34%)",
          "radial-gradient(ellipse at 50% 50%, rgba(11, 55, 93, 0.3) 0%, transparent 60%)",
          "linear-gradient(135deg, #030c1d 0%, #061828 22%, #0b375d 50%, #071d3c 75%, #030c1d 100%)",
        ].join(", "),
        paddingTop: "clamp(3rem, 4.5vw, 5rem)",
        paddingBottom: "clamp(3rem, 4.5vw, 5rem)",
      }}
    >
      <style>{`
        .page-cta-columns {
          display: flex;
          gap: clamp(2.5rem, 5vw, 6rem);
          align-items: stretch;
          paddingLeft: 10vw;
          paddingRight: 10vw;
        }
        .page-cta-left { flex: 0 0 55%; }
        .page-cta-right { flex: 1; min-height: 320px; }
        @media (max-width: 900px) {
          .page-cta-columns { flex-direction: column; }
          .page-cta-left { flex: none; }
          .page-cta-right { min-height: 280px; }
        }
      `}</style>

      <div style={{ paddingLeft: "10vw", paddingRight: "10vw" }}>
        <div className="page-cta-columns">

          {/* Left: content */}
          <div className="page-cta-left">
            {/* Eyebrow — no top border */}
            <div style={{ paddingBottom: "clamp(1rem, 1.5vw, 1.75rem)" }}>
              <p
                className="eyebrow"
                style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.75vw, 0.82rem)", margin: 0, opacity: 0.85 }}
              >
                {eyebrow}
              </p>
            </div>

            {/* Heading */}
            <div style={ROW}>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 2.8vw, 3.25rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {heading}
              </h2>
            </div>

            {/* Description */}
            <div style={ROW}>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(0.88rem, 1vw, 1.05rem)",
                  lineHeight: 1.85,
                  margin: 0,
                  maxWidth: "50ch",
                }}
              >
                {description}
              </p>
            </div>

            {/* CTA slot */}
            <div style={ROW}>
              {children}
            </div>
          </div>

          {/* Right: testimonial carousel */}
          <div className="page-cta-right">
            <TestimonialCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}
