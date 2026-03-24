"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const polyRef = useRef<SVGPolylineElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const stableOnComplete = useCallback(onComplete, []);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    document.body.style.overflow = "hidden";

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // mask.svg natural dimensions
    const bW = 316, bH = 332.716, bCx = 158, bCy = 166.358;

    // Start: badge at icon size (90px wide), centered in viewport
    const s0 = 90 / bW;
    const tx0 = vw / 2 - bCx * s0;
    const ty0 = vh / 2 - bCy * s0;

    // End: badge covers full viewport + generous bleed
    const s1 = Math.max(vw / bW, vh / bH) * 2.4;
    const tx1 = vw / 2 - bCx * s1;
    const ty1 = vh / 2 - bCy * s1;

    gsap.set(polyRef.current, {
      attr: { transform: `translate(${tx0} ${ty0}) scale(${s0})` },
    });

    const tl = gsap.timeline();

    tl
      // Phase 1: icon enters
      .fromTo(
        iconRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.52, ease: "back.out(1.4)" }
      )
      .to(iconRef.current, { duration: 0.18 })
      // Phase 2: trigger page content reveal + icon exits + badge expands simultaneously
      .add(() => {
        document.body.style.overflow = "";
        stableOnComplete();
      })
      .to(iconRef.current, { opacity: 0, scale: 1.14, duration: 0.36, ease: "power2.in" }, "<")
      .to(
        polyRef.current,
        {
          attr: { transform: `translate(${tx1} ${ty1}) scale(${s1})` },
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            if (svgRef.current) svgRef.current.style.display = "none";
          },
        },
        "<0.06"
      );

    return () => { tl.kill(); };
  }, [stableOnComplete]);

  return (
    <>
      {/* SVG overlay: white rect masked by growing badge shape */}
      <svg
        ref={svgRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <defs>
          {/*
            Mask: large white rect (overlay visible) with black badge shape cut out (overlay transparent).
            In SVG mask luminance mode: white = show, black = hide.
            Badge hole starts icon-sized, expands to cover screen → reveals hero through growing badge.
          */}
          <mask
            id="loader-badge-mask"
            maskUnits="userSpaceOnUse"
            x="-6000"
            y="-6000"
            width="16000"
            height="16000"
          >
            <rect x="-6000" y="-6000" width="16000" height="16000" fill="white" />
            <polyline
              ref={polyRef}
              fill="black"
              points="0 0 316 0 295.0617 302.4691 161.1111 332.716 154.9383 332.716 20.3704 303.7037 0 0"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="white" mask="url(#loader-badge-mask)" />
      </svg>

      {/* Icon centered on top of the overlay */}
      <div
        ref={iconRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/icon.svg" alt="Loading" width={90} height={90} />
      </div>
    </>
  );
}
