"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import ScrollReveal from "@/components/ScrollReveal";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import { gsap } from "@/lib/gsap";

/* ─── Layout constants — matching StayingInformed / home page ──── */
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Panel data for "With a Will" rows ────────────────────────── */
const WILL_OPTIONS: (PanelItem & { description: string })[] = [
  {
    label: "WITH A WILL",
    title: "Probate of a Will in Texas",
    description:
      "The traditional probate process — an executor is appointed, granted Letters Testamentary, and authorized to administer the estate from start to finish.",
    href: "#probate-will",
    panel: {
      headline: "Probate of a Will in Texas — Executor Appointment & Administration",
      sections: [
        {
          heading: "The Traditional Probate Process",
          body: "When a valid Last Will and Testament is filed with the probate court, an executor is appointed to administer the estate. In most cases, the court grants independent administration — allowing the executor to gather assets, address estate obligations, distribute property to beneficiaries, and move the administration forward without court involvement at every step.\n\nThis is the standard path when a valid will exists and the estate has assets or obligations that require active management.",
        },
        {
          heading: "Letters Testamentary",
          body: "Once appointed, the executor receives Letters Testamentary — a document issued by the probate court that authorizes the executor to act on behalf of the estate. Letters Testamentary can be used to access financial accounts, address title issues, transfer or sell real property, and handle other estate matters that require evidence of authority.\n\nFor many families, this is the clearest and most complete path when a will exists and ongoing legal authority is needed to properly close the estate.",
        },
        {
          heading: "What This Process Involves",
          body: "Filing and completing the probate administration in Texas typically involves the following steps:",
          list: [
            "Filing an Application to Probate the Will in the appropriate county",
            "Court hearing to admit the will and appoint the executor",
            "Obtaining Letters Testamentary from the probate court clerk",
            "Publishing a Notice to Creditors in a local legal newspaper",
            "Notifying all beneficiaries by certified mail",
            "Filing a Certificate of Compliance with the court",
            "Filing an Inventory of the probate estate (or an Affidavit in Lieu of Inventory)",
            "Recording certified copies in each county where the deceased owned real property",
          ],
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether independent administration applies to your estate and what the process will involve for your specific situation.",
        },
      ],
    },
  },
  {
    label: "WITH A WILL",
    title: "Muniment of Title",
    description:
      "A Texas-specific streamlined procedure to establish title to estate assets without a full administration — available in qualifying circumstances.",
    href: "#muniment",
    panel: {
      headline: "Probate of a Will as a Muniment of Title in Texas",
      sections: [
        {
          heading: "What Is Muniment of Title?",
          body: "Muniment of title is a procedure unique to Texas law that allows a will to be admitted to probate without appointing an executor or opening a full administration. When approved by the court, the recorded will itself serves as evidence of the new owner's title to estate property — without the need for ongoing executor authority.",
        },
        {
          heading: "When It May Apply",
          body: "Muniment of title is generally available when there are no unpaid debts of the estate (other than debts secured by real property) and when an ongoing administration is not otherwise required. It can also become especially relevant when more than four years have passed since the date of death — a period after which standard probate administration may no longer be available under Texas law.\n\nIn those situations, muniment of title may offer a path forward that would otherwise be unavailable.",
        },
        {
          heading: "Understanding the Limitations",
          body: "Because muniment of title does not result in the appointment of an executor, it does not grant broad ongoing authority to act for the estate. It is a more limited procedure suited for specific circumstances — typically when the primary goal is establishing title to property rather than conducting a full estate administration.\n\nFor estates that require someone to collect assets, resolve creditor claims, or manage ongoing obligations, a full administration with executor appointment is likely the better path.",
          closing:
            "Contact Troy M. Moore, PLLC to evaluate whether muniment of title is the appropriate option for your estate or whether a full administration is required.",
        },
      ],
    },
  },
];

/* ─── Panel data for "Without a Will" rows ─────────────────────── */
const NO_WILL_OPTIONS: (PanelItem & { description: string })[] = [
  {
    label: "HEIRSHIP",
    title: "Heirship Proceeding — Judicial Determination of Heirship",
    description:
      "The formal court proceeding to establish who inherits when someone dies without a will — clarifying ownership rights and providing the legal basis for transferring title to property.",
    href: "#heirship",
    panel: {
      headline: "Judicial Determination of Heirship in Texas",
      sections: [
        {
          heading: "What Is a Determination of Heirship?",
          body: "A judicial determination of heirship is the formal court proceeding used to establish who inherits a decedent's property when no valid will exists. The court reviews family history and applies Texas intestacy law to identify the legal heirs and each heir's fractional ownership interest in the estate.\n\nThis proceeding produces an order that is filed in the real property records of each county where the decedent owned property — giving surviving family members a documented legal basis to assert their ownership rights.",
        },
        {
          heading: "When It Is Required",
          body: "A determination of heirship is typically required when real estate or other titled property needs to be transferred to heirs but no will exists to direct that transfer. Without this court order, title cannot be clearly established — which can prevent property from being sold, refinanced, or transferred.\n\nIt may also be required even when no ongoing administration is needed. In some cases the estate's only need is establishing who the heirs are and what they own, without the appointment of a personal representative.",
        },
        {
          heading: "The Role of an Attorney Ad Litem",
          body: "Texas law requires the appointment of an attorney ad litem in heirship proceedings. This attorney is appointed by the court to independently investigate the family history and represent the interests of unknown or missing heirs — a safeguard that protects the integrity of the proceeding and the interests of all potential claimants.\n\nThe attorney ad litem's role is separate from the attorney representing the petitioning family. Both serve different functions within the same proceeding.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether a judicial determination of heirship applies to your situation and what steps would be involved.",
        },
      ],
    },
  },
  {
    label: "ADMINISTRATION",
    title: "Heirship With Administration — When Authority Is Also Needed",
    description:
      "When identifying the heirs is not enough — someone also needs legal authority to collect assets, manage property, and handle estate obligations. This procedure addresses both needs in a single proceeding.",
    href: "#heirship-admin",
    panel: {
      headline: "Heirship With Administration — Combining Identification and Authority",
      sections: [
        {
          heading: "When Both Are Required",
          body: "In some intestate estates, a determination of who inherits is only part of what is needed. The estate may also have assets that need to be collected, property that requires active management, or creditor obligations that require someone with the legal authority to act on behalf of the estate.\n\nA judicial determination of heirship with administration addresses both — the court identifies the heirs and, in the same proceeding, appoints an administrator who is granted the authority needed to handle the estate.",
        },
        {
          heading: "Letters of Administration",
          body: "Once appointed, the administrator receives Letters of Administration — a court-issued document authorizing the administrator to act on behalf of the estate. These letters function similarly to Letters Testamentary in a will-based probate, and can be used to access financial accounts, address real property title issues, resolve creditor claims, and manage other estate matters that require documented legal authority.",
        },
        {
          heading: "Independent vs. Dependent Administration",
          body: "Texas law generally favors independent administration, which allows the administrator to manage the estate without court approval at every step. Dependent administration — which requires court oversight for significant decisions — may apply in certain circumstances.\n\nThe appropriate type of administration depends on the estate's particular circumstances, whether the heirs agree, and whether the court approves independent authority.",
          closing:
            "Contact Troy M. Moore, PLLC to evaluate whether a heirship proceeding with administration is the right path and what level of court involvement your estate will require.",
        },
      ],
    },
  },
  {
    label: "AFFIDAVIT",
    title: "Small Estate Affidavit — A Limited Option for Qualifying Estates",
    description:
      "A Texas alternative to full probate that may be available for qualifying intestate estates — with strict eligibility requirements and important limitations families should understand before relying on it.",
    href: "#small-estate",
    panel: {
      headline: "Small Estate Affidavit in Texas — Eligibility, Limitations, and Risks",
      sections: [
        {
          heading: "What Is a Small Estate Affidavit?",
          body: "A small estate affidavit is a Texas procedure that allows heirs to collect certain assets of an intestate estate without opening a formal probate administration. When approved by the court, the affidavit can be used to collect personal property, financial accounts, and other assets that fall within the eligibility requirements.\n\nIt is one of the less formal options in Texas probate law — but it comes with specific limitations that many families underestimate when first considering the process.",
        },
        {
          heading: "Eligibility Requirements",
          body: "To qualify for a small estate affidavit in Texas, the estate must meet specific statutory requirements — including a cap on the total value of assets subject to the affidavit (excluding the homestead), and the absence of a pending application for appointment of a personal representative. All known heirs must sign the affidavit, and the process requires court approval before it can be used.",
        },
        {
          heading: "Important Limitations",
          body: "A small estate affidavit cannot typically be used to transfer real estate — with limited exceptions involving the homestead. For estates that include real property other than the homestead, a full determination of heirship or administration is generally required to establish clear title.\n\nAssuming a small estate affidavit will work — without first confirming eligibility and understanding its limitations — can create title problems and delays that are far more expensive to resolve after the fact.",
          closing:
            "Contact Troy M. Moore, PLLC to determine whether a small estate affidavit is appropriate for the estate or whether a different procedure is required.",
        },
      ],
    },
  },
  {
    label: "ALTERNATIVES",
    title: "Alternatives to Probate — When Full Probate May Not Be Required",
    description:
      "In limited situations, options outside of formal probate may be available — including affidavits of heirship and other non-probate mechanisms. The key is knowing when they apply and when they create more problems than they solve.",
    href: "#alternatives",
    panel: {
      headline: "Probate Alternatives in Texas — Understanding When They Apply",
      sections: [
        {
          heading: "When Alternatives May Be Available",
          body: "Not every estate requires a full probate administration. Depending on the nature of the assets, the family circumstances, and the goals of the heirs, there may be alternatives that allow property to pass without opening a formal court proceeding.\n\nOne example is an affidavit of heirship — a document used to establish title to real property based on family history and consistent acknowledgment of ownership. When properly prepared and recorded, an affidavit of heirship can establish chain of title for real estate without a court proceeding.",
        },
        {
          heading: "The Risk of Choosing the Wrong Option",
          body: "Alternatives to probate are not universally available and are not always the right choice. An affidavit of heirship, for example, does not provide the same level of legal protection as a judicial determination — and a title company or lender may decline to rely on it in certain transactions.\n\nChoosing a simpler path without a clear understanding of its limitations can result in title defects, disputes between heirs, and the need to undo prior work — often at greater cost than a proper proceeding would have required at the outset.",
        },
        {
          heading: "Getting the Right Answer First",
          body: "The most practical approach is an early legal review of the estate — before any documents are signed, any assets collected, or any assumptions made about which process applies. A clear-eyed evaluation of the options can save time, expense, and the risk of choosing a path that creates problems later.",
          closing:
            "Contact Troy M. Moore, PLLC for guidance on which option — probate or an available alternative — makes the most sense for your specific circumstances.",
        },
      ],
    },
  },
];

/* ─── Will Options Section (StayingInformed-style rows) ─────────── */
function WillOptionsSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".info-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
      const dividers = section.querySelectorAll(".divider-line");
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
    }, sectionRef);

    // Proximity scale — identical to StayingInformed
    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => {
      rowEls.forEach((row) =>
        gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
      );
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {WILL_OPTIONS.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{
              width: "100%",
              padding: "clamp(1.25rem, 3vw, 3rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0,
            }}
            onClick={() => onOpen(item)}
          >
            {/* Left label */}
            <span
              className="eyebrow font-semibold"
              style={{
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              {item.label}
            </span>
            {/* Title + Description */}
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3
                className="transition-colors duration-300 group-hover:text-[var(--gold)]"
                style={{ color: "var(--navy)", marginBottom: "0.3vw" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>
                {item.description}
              </p>
            </div>
            {/* Circle CTA — identical SVG to StayingInformed */}
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path
                  className="CircleIcon_circle__vewPw"
                  d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0"
                />
                <path
                  className="CircleIcon_circle-overlay__lg7sz"
                  d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5"
                />
                <path
                  className="CircleIcon_icon__n80xg"
                  d="M12.5 11L16 14.5L12.5 18"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── No-Will Options Section (StayingInformed-style rows) ──────── */
function NoWillOptionsSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".info-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
      const dividers = section.querySelectorAll(".divider-line");
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
    }, sectionRef);

    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => {
      rowEls.forEach((row) =>
        gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
      );
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {NO_WILL_OPTIONS.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{
              width: "100%",
              padding: "clamp(1.25rem, 3vw, 3rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0,
            }}
            onClick={() => onOpen(item)}
          >
            <span
              className="eyebrow font-semibold"
              style={{
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              {item.label}
            </span>
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3
                className="transition-colors duration-300 group-hover:text-[var(--gold)]"
                style={{ color: "var(--navy)", marginBottom: "0.3vw" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>
                {item.description}
              </p>
            </div>
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path
                  className="CircleIcon_circle__vewPw"
                  d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0"
                />
                <path
                  className="CircleIcon_circle-overlay__lg7sz"
                  d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5"
                />
                <path
                  className="CircleIcon_icon__n80xg"
                  d="M12.5 11L16 14.5L12.5 18"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── Shared animated circle SVG — matches FeaturedArticle ──────── */
function CircleSVG() {
  return (
    <span className="cta-circle">
      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ─── Small reusable button components ──────────────────────────── */
function PrimaryBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

function GhostBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta-ghost" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

function NavyBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ProbatePage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, []);

  const openPanel = useCallback((item: PanelItem) => {
    setPanelItem(item);
    document.body.style.overflow = "hidden";
    gsap.timeline()
      .to(contentRef.current, { x: 18, duration: 0.13, ease: "power2.out" })
      .to(contentRef.current, { x: "-85vw", duration: 0.85, ease: "expo.inOut" });
    gsap.to(panelRef.current, { x: 0, duration: 0.85, ease: "expo.inOut", delay: 0.06 });
  }, []);

  const closePanel = useCallback(() => {
    gsap.to(panelRef.current, { x: "100%", duration: 0.55, ease: "power4.in" });
    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.72,
      ease: "expo.out",
      delay: 0.08,
      onComplete: () => {
        setPanelItem(null);
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <>
      <style>{`
        /* ── Info-row eyebrow — reduced size, fixed column ── */
        .info-row .eyebrow {
          font-size: 0.7vw;
          flex: 0 0 14vw;
          min-width: 0;
        }
        @media (max-width: 1000px) {
          .info-row .eyebrow {
            font-size: clamp(0.5rem, 1.8vw, 0.62rem);
            flex: 0 0 auto;
          }
        }

        /* ── Info-row (StayingInformed) styles — reused here ── */
        .info-row .cta-circle {
          width: 4.4em; height: 4.4em; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          color: rgba(11,55,93,0.35);
          transition: color 0.6s ease;
        }
        .info-row:hover .cta-circle { color: var(--gold); }
        .info-row .cta-circle svg .CircleIcon_circle__vewPw {
          stroke: rgba(11,55,93,0.2); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 0;
          transition: stroke-dashoffset 1s ease, stroke 0.6s ease;
        }
        .info-row .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke: var(--gold); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 100;
          transition: stroke-dashoffset 1s ease;
        }
        .info-row:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke-dashoffset: 0;
        }
        .info-row .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none;
          transition: stroke 0.6s ease;
        }

        /* ── Grid layouts ── */
        .probate-decision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1rem, 2vw, 2rem);
        }
        .probate-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 2rem);
        }
        .probate-cred-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        .probate-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 1.5vw, 1.5rem);
        }
        .probate-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: start;
        }
        .probate-fees-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: center;
        }
        .probate-mobile-cta { display: none; }

        @media (max-width: 1023px) {
          .probate-decision-grid { grid-template-columns: 1fr; }
          .probate-trust-grid { grid-template-columns: 1fr 1fr; }
          .probate-cred-grid { grid-template-columns: 1fr 1fr; }
          .probate-options-grid { grid-template-columns: 1fr 1fr; }
          .probate-why-grid { grid-template-columns: 1fr; }
          .probate-fees-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .probate-trust-grid { grid-template-columns: 1fr; }
          .probate-cred-grid { grid-template-columns: 1fr; }
          .probate-options-grid { grid-template-columns: 1fr; }
          .probate-mobile-cta { display: flex; }
        }
        .probate-decision-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .probate-decision-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(11,55,93,0.14);
        }
      `}</style>

      {/* ── Main content — slides left when panel opens ─────────── */}
      <div
        ref={contentRef}
        style={{ cursor: panelItem ? "pointer" : "auto" }}
        onClick={panelItem ? closePanel : undefined}
      >
        <Navbar />

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────── */}
          <section
            style={{
              backgroundColor: "var(--navy)",
              paddingTop: "calc(72px + clamp(3rem, 5vw, 6rem))",
              paddingBottom: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.07)", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", top: "5%", right: "-5%", width: "42vw", height: "42vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.05)", pointerEvents: "none" }} />

            <div style={WRAP}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.75rem, 1.2vw, 1.2rem)" }}>
                  Houston Probate Attorney
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h1 style={{ color: "#ffffff", maxWidth: "820px", marginBottom: "clamp(1.2rem, 2vw, 2rem)" }}>
                  Clear Direction for Families Navigating Probate in Houston
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.16}>
                <p style={{ color: "rgba(255,255,255,0.72)", maxWidth: "640px", marginBottom: "clamp(1.8rem, 3vw, 3rem)", lineHeight: 1.85 }}>
                  When a family member passes away, the legal questions that follow can arrive all at once.
                  Troy&nbsp;M.&nbsp;Moore,&nbsp;PLLC helps families move through the Texas probate process
                  with clarity, efficiency, and steady legal guidance — whether there is a valid will or no
                  will at all.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.22}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.2vw, 1rem)", marginBottom: "clamp(3rem, 5vw, 5.5rem)" }}>
                  <PrimaryBtn label="Schedule a Probate Consultation" href="#consult" />
                  <GhostBtn label="Start Here" href="#start-here" />
                </div>
              </ScrollReveal>
            </div>

            {/* Trust strip */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "clamp(1.5rem, 2.5vw, 2.5rem)", paddingBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
              <div style={WRAP}>
                <div className="probate-trust-grid">
                  {[
                    { label: "24+ Years of Experience", sub: "Houston-area probate representation" },
                    { label: "Will & No-Will Guidance", sub: "All probate paths under one roof" },
                    { label: "Harris County & Beyond", sub: "Spring, Tomball, Cypress, The Woodlands" },
                    { label: "Flat-Fee Where Appropriate", sub: "Straightforward pricing when possible" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ color: "var(--gold)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3em" }}>
                        {item.label}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "clamp(0.75rem, 0.75vw, 0.82rem)" }}>
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. CREDIBILITY BAR ───────────────────────────────── */}
          <section style={{ backgroundColor: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal stagger={0.1}>
                <div className="probate-cred-grid">
                  {[
                    { icon: "⚖", heading: "Probate Guidance For Every Situation", body: "Whether a will exists or not, the firm identifies the right legal path and moves the estate forward." },
                    { icon: "📋", heading: "Texas Probate Court Experience", body: "Deep familiarity with Texas probate procedures, timelines, and court requirements in Harris County and surrounding areas." },
                    { icon: "→", heading: "Practical, Direct Communication", body: "Complex legal options explained clearly — no jargon, no unnecessary delay, no confusion about next steps." },
                    { icon: "◎", heading: "Serving Houston and Surrounding Communities", body: "Houston, Spring, Tomball, Cypress, The Woodlands, and neighboring communities throughout the region." },
                  ].map((c) => (
                    <div key={c.heading} style={{ padding: "clamp(1.5rem, 2.5vw, 2.5rem)", border: "1px solid #ebebeb", borderRadius: "4px" }}>
                      <p style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", marginBottom: "0.75rem", color: "var(--gold)" }}>{c.icon}</p>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", lineHeight: 1.3, color: "var(--navy)", marginBottom: "0.6em" }}>
                        {c.heading}
                      </p>
                      <p style={{ color: "#5a6a7a", margin: 0 }}>{c.body}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", textAlign: "center" }}>
                  <a href="tel:2816090303" style={{ fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.65rem, 0.85vw, 0.82rem)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--navy)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "2px" }}>
                    Talk With Our Office — (281) 609-0303
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 3. START HERE — DECISION SPLIT ──────────────────── */}
          <section id="start-here" style={{ backgroundColor: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Start Here</p>
                <h2 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)", maxWidth: "680px" }}>
                  Whether There Is a Will or Not, the Right Probate Path Starts with a Clear Legal Strategy
                </h2>
                <p style={{ color: "#5a6a7a", maxWidth: "600px", marginBottom: "clamp(2rem, 3.5vw, 3.5rem)" }}>
                  The first question in most probate matters is straightforward: did the decedent leave a
                  valid Last Will and Testament, or not? That answer often shapes the legal process, the
                  court filings required, and the authority needed to handle the estate.
                </p>
              </ScrollReveal>

              <ScrollReveal stagger={0.12}>
                <div className="probate-decision-grid">
                  <div className="probate-decision-card" style={{ background: "var(--navy)", padding: "clamp(2rem, 3.5vw, 3.5rem)", borderRadius: "4px" }}>
                    <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>There Is a Will</p>
                    <h3 style={{ color: "#ffffff", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                      Probate With a Valid Last Will and Testament
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                      When a valid will exists, the court can appoint an executor and grant Letters
                      Testamentary. In some cases, a Muniment of Title may provide a more streamlined path.
                      The right option depends on the estate and the authority needed to act.
                    </p>
                    <GhostBtn label="Explore Probate With a Will" href="#with-a-will" />
                  </div>
                  <div className="probate-decision-card" style={{ background: "#ffffff", padding: "clamp(2rem, 3.5vw, 3.5rem)", borderRadius: "4px", border: "1px solid #e8e8e8" }}>
                    <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>There Is No Will</p>
                    <h3 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                      Intestate Probate — When Someone Dies Without a Will
                    </h3>
                    <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                      When there is no will, Texas law provides several possible procedures — including a
                      judicial determination of heirship, administration, or a small estate affidavit. The
                      correct option depends on the family structure, the property involved, and whether the
                      estate needs a personal representative.
                    </p>
                    <NavyBtn label="Explore Probate Without a Will" href="#without-a-will" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", padding: "clamp(1.2rem, 2vw, 2rem) clamp(1.5rem, 2.5vw, 2.5rem)", background: "rgba(11,55,93,0.04)", borderLeft: "3px solid var(--gold)", borderRadius: "0 4px 4px 0" }}>
                  <p style={{ margin: 0, color: "var(--navy)" }}>
                    <strong>Not sure which path applies?</strong> The right legal process depends on the
                    will, the assets, the heirs, and the circumstances. An early consultation can identify
                    the correct option before time and expense increase unnecessarily.{" "}
                    <a href="#consult" style={{ color: "var(--navy)", textDecoration: "none", borderBottom: "1px solid var(--gold)" }}>
                      Get Help Determining the Right Probate Option →
                    </a>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 4. PROBATE WITH A WILL (StayingInformed-style) ───── */}
          <section id="with-a-will" style={{ backgroundColor: "#f9f9f9", paddingTop: "5vw", paddingBottom: "5vw" }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "3vw" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
                    If There Is a Will
                  </p>
                  <h2>Probate Paths With a Will</h2>
                </div>
              </ScrollReveal>

              {/* StayingInformed-style rows */}
              <WillOptionsSection onOpen={openPanel} />

              {/* CTA nudge */}
              <ScrollReveal delay={0.15}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "clamp(1.5rem, 2.5vw, 2.5rem)", background: "#ffffff", border: "1px solid #e8e8e8", borderRadius: "4px" }}>
                  <p style={{ color: "var(--navy)", margin: 0, maxWidth: "480px" }}>
                    <strong>Have a will but not sure which probate option applies?</strong> The distinction
                    between a full administration and a muniment of title can affect authority, title, and
                    cost. Get the right answer early.
                  </p>
                  <PrimaryBtn label="Request a Consultation" href="#consult" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 5. PROBATE WITHOUT A WILL ────────────────────────── */}
          <section id="without-a-will" style={{ backgroundColor: "#f9f9f9", paddingTop: "5vw", paddingBottom: "5vw" }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "3vw" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
                    If There Is No Will
                  </p>
                  <h2>Intestate Estates — Texas Probate Procedures When There Is No Will</h2>
                </div>
              </ScrollReveal>

              {/* StayingInformed-style rows */}
              <NoWillOptionsSection onOpen={openPanel} />

              {/* CTA nudge */}
              <ScrollReveal delay={0.15}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "clamp(1.5rem, 2.5vw, 2.5rem)", background: "#ffffff", border: "1px solid #e8e8e8", borderRadius: "4px" }}>
                  <p style={{ color: "var(--navy)", margin: 0, maxWidth: "480px" }}>
                    <strong>No will — not sure which Texas probate process applies?</strong> The right
                    procedure depends on the heirs, the property, and what the estate requires.
                  </p>
                  <PrimaryBtn label="Find Out Which Option May Apply" href="#consult" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 6. KEY PROBATE OPTIONS IN TEXAS ─────────────────── */}
          <section style={{ backgroundColor: "var(--navy)", ...PAD, position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.06)", pointerEvents: "none" }} />
            <div style={WRAP}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Texas Probate Process</p>
                <h2 style={{ color: "#ffffff", maxWidth: "640px", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                  Key Probate Options in Texas
                </h2>
                <p style={{ color: "rgba(255,255,255,0.68)", maxWidth: "600px", marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                  Not every estate should be handled the same way. One of the most valuable parts of working
                  with an experienced Houston probate attorney is understanding which process is likely to be
                  the most effective, practical, and cost-conscious for the estate at hand.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="probate-options-grid" style={{ marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                  {[
                    { title: "Probate of a Will", body: "Traditional probate with executor appointment and administration authority. The standard path when a valid will exists and ongoing authority is needed." },
                    { title: "Muniment of Title", body: "A streamlined alternative to establish title without full administration. Available in specific circumstances when no unpaid debts exist." },
                    { title: "Heirship Proceeding", body: "A judicial determination of who inherits when no will exists. Clarifies ownership rights and establishes the legal basis for transferring property." },
                    { title: "Heirship With Administration", body: "Combines heirship determination with court appointment of an administrator — used when the estate also requires active management authority." },
                    { title: "Small Estate Affidavit", body: "A limited procedure for qualifying intestate estates under Texas thresholds. Not appropriate for every situation, with important eligibility restrictions." },
                    { title: "Alternatives to Probate", body: "Depending on the assets and circumstances, non-probate solutions may be available. A legal review helps determine whether simpler options are appropriate." },
                  ].map((opt) => (
                    <div key={opt.title} style={{ padding: "clamp(1.2rem, 2vw, 2rem)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ width: "2px", height: "clamp(1.5rem, 2vw, 2rem)", background: "var(--gold)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }} />
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", color: "#ffffff", marginBottom: "0.5em", lineHeight: 1.3 }}>
                        {opt.title}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.58)", margin: 0 }}>{opt.body}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "580px", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                  The right question is not just what can be filed. It is what legal process best
                  accomplishes the family&rsquo;s goals while protecting the estate and minimizing
                  avoidable complications.
                </p>
                <GhostBtn label="Speak With a Houston Probate Attorney" href="#consult" />
              </ScrollReveal>
            </div>
          </section>

          {/* ── 7. WHY TROY M. MOORE, PLLC ───────────────────────── */}
          <section style={{ backgroundColor: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <div className="probate-why-grid">
                <ScrollReveal>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Why Clients Choose Us</p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1.8vw, 1.8rem)", maxWidth: "520px" }}>
                    Clarity, Experience, and a Practical Path Forward
                  </h2>
                  <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)", maxWidth: "500px" }}>
                    Families searching for a probate attorney in Houston often need more than a filing
                    service. They need clear answers, practical direction, and confidence that the matter is
                    being handled correctly — especially during a difficult time.
                  </p>
                  <PrimaryBtn label="Schedule a Consultation" href="#consult" />
                </ScrollReveal>
                <ScrollReveal delay={0.12}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 1.8vw, 1.8rem)" }}>
                    {[
                      { label: "Clear guidance through the Texas probate process", body: "Every client receives a direct explanation of what their estate requires, what options are available, and what to expect at each step." },
                      { label: "Will-based and no-will probate under one roof", body: "From probate of a will in Texas to judicial determination of heirship, the firm handles the full range of Texas probate procedures." },
                      { label: "Efficient handling where possible", body: "Unnecessary delay costs families time and money. Straightforward matters are handled efficiently without manufacturing complexity." },
                      { label: "Service across Houston and surrounding areas", body: "Representing clients in Houston, Harris County, Spring, Tomball, Cypress, The Woodlands, and neighboring communities." },
                      { label: "Experienced, prepared, and direct", body: "With 24+ years of Texas probate experience and more than 1,700 complex cases handled, the approach is grounded in real-world outcomes." },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", gap: "clamp(1rem, 1.5vw, 1.5rem)", alignItems: "flex-start" }}>
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "clamp(1.4rem, 1.8vw, 1.8rem)", height: "clamp(1.4rem, 1.8vw, 1.8rem)", borderRadius: "50%", background: "rgba(195,160,91,0.15)", flexShrink: 0, marginTop: "0.2em" }}>
                          <span style={{ display: "block", width: "0.4em", height: "0.4em", borderRadius: "50%", background: "var(--gold)" }} />
                        </span>
                        <div>
                          <p style={{ color: "var(--navy)", fontWeight: 600, marginBottom: "0.2em", lineHeight: 1.4 }}>{item.label}</p>
                          <p style={{ color: "#5a6a7a", margin: 0 }}>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── 8. FEES / PRICING CLARITY ────────────────────────── */}
          <section style={{ backgroundColor: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <div className="probate-fees-grid">
                <ScrollReveal>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Fees &amp; Pricing</p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)", maxWidth: "480px" }}>
                    Straightforward Answers on What Probate Will Cost
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p style={{ color: "#5a6a7a", marginBottom: "1em" }}>
                    One of the most common questions families ask is what probate will cost. That is a
                    reasonable question, and it deserves a direct answer.
                  </p>
                  <p style={{ color: "#5a6a7a", marginBottom: "1em" }}>
                    Some probate matters can be handled through a straightforward flat-fee structure, while
                    others may involve variables that affect the overall scope of work. The nature of the
                    estate, the number of heirs or beneficiaries, land in multiple counties, and difficulty
                    serving interested parties can all affect complexity.
                  </p>
                  <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                    An early consultation helps identify not only the proper probate path, but also whether
                    the matter is likely to remain simple or require additional work — giving families
                    informed expectations before time and expense increase unnecessarily.
                  </p>
                  <PrimaryBtn label="Ask About Probate Fees" href="#consult" />
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── 9. FINAL CTA ─────────────────────────────────────── */}
          <section id="consult" style={{ backgroundColor: "var(--navy)", ...PAD, position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", maxWidth: "900px", maxHeight: "900px", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.06)", pointerEvents: "none" }} />
            <div style={{ ...WRAP, position: "relative", zIndex: 1 }}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Next Steps</p>
                <h2 style={{ color: "#ffffff", maxWidth: "700px", margin: "0 auto clamp(1rem, 1.8vw, 1.8rem)" }}>
                  Ready to Understand Your Probate Options?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "580px", margin: "0 auto clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.85 }}>
                  If you need help understanding whether an estate should proceed through probate of a will,
                  muniment of title, heirship, administration, a small estate affidavit, or another Texas
                  probate option, Troy&nbsp;M.&nbsp;Moore,&nbsp;PLLC can help you evaluate the situation
                  and determine the right next step.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.2vw, 1rem)", justifyContent: "center" }}>
                  <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                    Call (281) 609-0303
                    <span className="cta-circle" style={{ background: "rgba(255,255,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
                      </svg>
                    </span>
                  </a>
                  <GhostBtn label="Review Probate Process Summary" href="/texas-probate-process" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ marginTop: "clamp(3rem, 5vw, 5rem)", paddingTop: "clamp(2rem, 3vw, 3rem)", borderTop: "1px solid rgba(255,255,255,0.1)", maxWidth: "600px", margin: "clamp(3rem, 5vw, 5rem) auto 0" }}>
                  <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center", marginBottom: "1.2rem" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--gold)">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1rem, 1.4vw, 1.3rem)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    &ldquo;Troy and his team were great throughout our estate planning. Professional, patient,
                    and informative. If you have not already taken care of your future, I highly recommend
                    Troy Moore.&rdquo;
                  </p>
                  <p className="eyebrow" style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.6rem, 0.7vw, 0.72rem)", letterSpacing: "0.2em" }}>
                    — Tim Williams
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* ── Close button — fixed in the 15vw exposed strip ───────── */}
      {panelItem && (
        <div style={{ position: "fixed", top: "1.5rem", left: "7.5vw", transform: "translateX(-50%)", zIndex: 600, padding: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
          <button
            onClick={closePanel}
            aria-label="Close panel"
            style={{ width: 54, height: 54, borderRadius: "50%", border: "none", background: "var(--navy)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", lineHeight: 1, cursor: "pointer", boxShadow: "0 4px 20px rgba(11,55,93,0.4)" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Side panel ───────────────────────────────────────────── */}
      <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />

      <FixedCTA show={!panelItem} />

      {/* ── Mobile sticky CTA bar ────────────────────────────────── */}
      <div
        className="probate-mobile-cta"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400, background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1.25rem", gap: "0.75rem", alignItems: "center" }}
      >
        <a href="tel:2816090303" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", borderRadius: "9999px", background: "var(--gold)", color: "var(--navy)", fontFamily: "var(--font-eyebrow)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>
          Call Now
        </a>
        <a href="#start-here" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", borderRadius: "9999px", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", fontFamily: "var(--font-eyebrow)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}>
          Start Here
        </a>
      </div>
    </>
  );
}
