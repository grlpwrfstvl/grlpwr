import type { ReactNode } from "react";

/** Page title with an optional small green kicker above it */
export function PageTitle({ children, kicker }: { children: ReactNode; kicker?: ReactNode }) {
  return (
    <header className="mb-8 md:mb-12">
      {kicker && <p className="text-sm font-extrabold uppercase tracking-widest text-grlGreen md:text-base">{kicker}</p>}
      <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-grlPink md:text-7xl">{children}</h1>
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-4xl font-extrabold tracking-tight text-grlPink md:text-5xl">{children}</h2>
      {action}
    </div>
  );
}
