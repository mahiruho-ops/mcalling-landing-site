import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { cn } from "@/lib/utils";

/**
 * Same composition as mChatBot child pages: copy on the left, stage card on the right.
 * Words stay the page's own. An em dash already in the title becomes the gradient line.
 */
export function ChildPageHero({
  eyebrow,
  title,
  support,
  actions,
  stage,
  stageLabel = "mKcalling",
  lead,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  support?: ReactNode;
  actions?: ReactNode;
  stage: ReactNode;
  stageLabel?: string;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border pb-16 pt-28 md:pb-20 md:pt-32",
        className,
      )}
    >
      <Atmosphere variant="hero" />
      <div className="relative mx-auto max-w-6xl px-6">
        {lead ? <div className="mb-8">{lead}</div> : null}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.25rem]">
              {typeof title === "string" ? <AccentTitle text={title} /> : title}
            </h1>
            {support ? (
              <div className="max-w-md space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {typeof support === "string" ? <p>{support}</p> : support}
              </div>
            ) : null}
            {actions ? <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div> : null}
          </div>
          <StageChrome label={stageLabel}>{stage}</StageChrome>
        </div>
      </div>
    </section>
  );
}

function AccentTitle({ text }: { text: string }) {
  const splitAt = text.indexOf(" — ");
  if (splitAt === -1) return text;
  return (
    <>
      {text.slice(0, splitAt)}
      {" — "}
      <span className="gradient-text-primary inline pb-1 md:mt-1 md:block">
        {text.slice(splitAt + 3)}
      </span>
    </>
  );
}

export function StageChrome({
  children,
  label = "mKcalling",
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("v15-stage-3d", className)}>
      <div className="v15-stage-3d-inner v15-depth-plate relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function BulletStage({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 px-5 py-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm leading-relaxed text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NoteStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-5 py-6 text-sm leading-relaxed text-muted-foreground", className)}>{children}</div>;
}
