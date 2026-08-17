import type { ComponentProps } from "react";
import Link from "next/link";
import { MagneticLink } from "@/components/ui/MagneticLink";

type Variant = "primary" | "cta" | "outline" | "link";

const variantClass: Record<Variant, string> = {
  primary: "fe-btn-primary",
  cta: "fe-btn-cta",
  outline: "fe-btn-outline",
  link: "fe-btn-link",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className"> & {
    href: string;
    magnetic?: boolean;
  };

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Shared pill/link button matching the V2 design — solid ink (primary), solid terracotta (cta), outlined, or underlined text link. */
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, magnetic = variant === "primary" || variant === "cta", ...rest } = props;
    if (magnetic) {
      return (
        <MagneticLink href={href} className={classes} {...rest}>
          {children}
        </MagneticLink>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
