"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { minuteRechargePackages } from "@/content/mkcalling/minute-recharge-packages";

const INITIAL_VISIBLE = 5;

type Props = {
  title: string;
  intro: string;
  minutesColumnLabel: string;
  validityColumnLabel: string;
  rateLine: string;
};

export function MinuteRechargePackagesTable({ title, intro, minutesColumnLabel, validityColumnLabel, rateLine }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = minuteRechargePackages.length > INITIAL_VISIBLE;
  const visibleRows = expanded ? minuteRechargePackages : minuteRechargePackages.slice(0, INITIAL_VISIBLE);

  return (
    <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{intro}</p>
        <p className="text-xs text-foreground mt-2">{rateLine}</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left font-medium text-foreground px-3 py-2">{minutesColumnLabel}</th>
              <th className="text-left font-medium text-foreground px-3 py-2">{validityColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.minutes} className="border-b border-border/30 last:border-0">
                <td className="px-3 py-2 tabular-nums text-foreground">{row.minutes.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 text-muted-foreground">{row.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs text-primary hover:text-primary"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      ) : null}
    </div>
  );
}
