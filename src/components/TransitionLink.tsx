"use client";

import Link from "next/link";
import { usePageTransition } from "@/context/TransitionContext";

type Props = React.ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that plays the page transition
 * before navigating. Anchor-only hrefs (#foo) and external URLs pass
 * through unchanged.
 */
export default function TransitionLink({ href, onClick, children, ...props }: Props) {
  const { navigate } = usePageTransition();

  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
  const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("//");

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (isInternal && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          navigate(hrefStr);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
