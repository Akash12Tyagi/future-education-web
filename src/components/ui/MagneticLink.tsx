"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticLinkProps extends React.ComponentProps<typeof Link> {
  className?: string;
  children: React.ReactNode;
}

/** A link with a subtle magnetic-follow effect on the pointer, matching the prototype's primary CTAs. */
export function MagneticLink({ className, children, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const my = (e.clientY - (r.top + r.height / 2)) * 0.22;
    ref.current.style.transform = `translate(${mx}px, ${my}px) scale(1.03)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: "transform .15s ease-out, box-shadow .2s ease" }}
      {...props}
    >
      {children}
    </Link>
  );
}
