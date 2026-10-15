import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const variants = {
  primary: "bg-grlPink text-white hover:bg-grlGreen",
  secondary: "border-[3px] border-grlGreen text-grlGreen hover:bg-grlGreen hover:text-white",
  light: "bg-white text-grlPink hover:bg-grlGreen hover:text-white",
};

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-extrabold transition duration-200 hover:-rotate-1 hover:scale-105 active:scale-95 ${variants[variant]} ${className}`;

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
