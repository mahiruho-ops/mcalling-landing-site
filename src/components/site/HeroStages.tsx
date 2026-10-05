import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Same rail family as the mChatBot catalog stage. Amber is mKcalling’s own hue, used as one rail. */
const RAILS = ["bg-violet-500", "bg-sky-500", "bg-amber-500", "bg-teal-500", "bg-rose-500"] as const;
const DOTS = ["bg-violet-500", "bg-sky-500", "bg-amber-500", "bg-teal-500", "bg-rose-500"] as const;

export function StageFooter({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export function ShelfRows({
  rows,
}: {
  rows: readonly { title: string; detail?: string; href?: string; icon?: ReactNode }[];
}) {
  return (
    <ul>
      {rows.map((row, index) => {
        const body = (
          <>
            {row.icon ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                {row.icon}
              </span>
            ) : (
              <span className={cn("mt-1 h-8 w-1 shrink-0 rounded-full", RAILS[index % RAILS.length])} aria-hidden />
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-snug tracking-tight text-foreground">{row.title}</span>
              {row.detail ? (
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{row.detail}</span>
              ) : null}
            </span>
            {row.href ? (
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
            ) : null}
          </>
        );
        return (
          <li key={row.title} className="border-b border-border last:border-b-0">
            {row.href ? (
              <Link href={row.href} className="group flex items-start gap-3 px-5 py-3.5 transition hover:bg-muted/40">
                {body}
              </Link>
            ) : (
              <div className="flex items-start gap-3 px-5 py-3.5">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Short phrases as a 2-up plate, each with a hue bar — for hero bullets that have no second line. */
export function PhraseTiles({
  items,
  footer,
}: {
  items: readonly string[];
  footer?: ReactNode;
}) {
  return (
    <div>
      <ul className="grid sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={item} className="relative border-b border-border px-4 py-5 sm:odd:border-r">
            <span className={cn("absolute inset-x-0 top-0 h-[3px]", RAILS[index % RAILS.length])} aria-hidden />
            <p className="text-sm font-semibold leading-snug tracking-tight">{item}</p>
          </li>
        ))}
      </ul>
      {footer ? <StageFooter>{footer}</StageFooter> : null}
    </div>
  );
}

export function StepFlow({
  steps,
  footer,
}: {
  steps: readonly string[];
  footer?: ReactNode;
}) {
  return (
    <div>
      <ol className="px-5 py-5">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
            {index < steps.length - 1 ? (
              <span className="absolute bottom-0 left-[0.7rem] top-7 w-px bg-border" aria-hidden />
            ) : null}
            <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-semibold text-primary">
              {index + 1}
            </span>
            <span className="pt-0.5 text-sm font-medium leading-snug">{step}</span>
          </li>
        ))}
      </ol>
      {footer ? <StageFooter>{footer}</StageFooter> : null}
    </div>
  );
}

export function PointGrid({
  points,
  footer,
}: {
  points: readonly string[];
  footer?: ReactNode;
}) {
  return (
    <div>
      <ul className="grid sm:grid-cols-2">
        {points.map((point, index) => (
          <li key={point} className="flex items-start gap-2.5 border-b border-border px-4 py-3.5 sm:odd:border-r">
            <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", DOTS[index % DOTS.length])} aria-hidden />
            <span className="text-sm leading-snug">{point}</span>
          </li>
        ))}
      </ul>
      {footer ? <StageFooter>{footer}</StageFooter> : null}
    </div>
  );
}

export function ChipCloud({
  items,
}: {
  items: readonly { label: string; href?: string }[];
}) {
  return (
    <ul className="flex flex-wrap gap-1.5 px-5 py-4">
      {items.map((item, index) => {
        const className =
          "inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs transition hover:border-primary/40";
        const chip = (
          <>
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOTS[index % DOTS.length])} aria-hidden />
            {item.label}
          </>
        );
        return (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} className={className}>
                {chip}
              </Link>
            ) : (
              <span className={className}>{chip}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
