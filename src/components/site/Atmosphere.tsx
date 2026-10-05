import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hero wash, or soft/mist body bands — the same three atmospheres as mChatBot. */
export type AtmosphereVariant = "hero" | "soft" | "mist";

export function Atmosphere({
  variant = "soft",
  className = "",
}: {
  variant?: AtmosphereVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "v15-atmosphere pointer-events-none absolute inset-0 overflow-hidden",
        `v15-atmosphere--${variant}`,
        className,
      )}
      aria-hidden
    >
      <div className="v15-atmosphere-wash" />
      <div className="v15-atmosphere-pattern" />
      {variant === "hero" ? (
        <>
          <div className="v15-hero-orb v15-hero-orb-a" />
          <div className="v15-hero-orb v15-hero-orb-b" />
          <div className="v15-hero-orb v15-hero-orb-c" />
        </>
      ) : (
        <div className="v15-band-glow" />
      )}
    </div>
  );
}

export function SiteBand({
  children,
  variant = "soft",
  className = "",
  innerClassName = "",
  id,
}: {
  children: ReactNode;
  variant?: AtmosphereVariant;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden border-b border-border py-16 md:py-20", className)}>
      <Atmosphere variant={variant} />
      <div className={cn("relative mx-auto max-w-6xl px-6", innerClassName)}>{children}</div>
    </section>
  );
}

export function BandHeader({
  title,
  support,
}: {
  title: string;
  support?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {support ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{support}</p>
      ) : null}
    </div>
  );
}

export const featureCardClass =
  "mk-card p-6";
