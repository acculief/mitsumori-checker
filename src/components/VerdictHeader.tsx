import type { ReactNode } from "react";
import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import { getOverallVerdict, OverallVerdict } from "@/lib/verdict-utils";

interface Props {
  summary: SummaryResult;
}

const verdictStyles: Record<OverallVerdict, {
  message: string;
  subTemplate: (pct: number) => string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
}> = {
  cheap: {
    message: "この見積もりは相場より割安です",
    subTemplate: (pct) => `相場中央値より ${pct}% 安い見積もりです。この工場での車検を検討してよいでしょう。`,
    borderColor: "border-sky-400",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  fair: {
    message: "この見積もりは適正価格です",
    subTemplate: () => "相場の範囲内です。安心してお任せできます。",
    borderColor: "border-emerald-400",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  slightly_high: {
    message: "この見積もりはやや高めです",
    subTemplate: (pct) => `相場中央値より ${pct}% 高め。他社比較をおすすめします。`,
    borderColor: "border-amber-400",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  high: {
    message: "この見積もりは相場より割高です",
    subTemplate: (pct) => `相場中央値より ${pct}% 高い。相見積もりを取りましょう。`,
    borderColor: "border-rose-400",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

function getOverallMessage(summary: SummaryResult) {
  const verdict = getOverallVerdict(summary.totalAmount, summary.totalMedian);
  const style = verdictStyles[verdict];
  const ratio = summary.totalMedian > 0 ? summary.totalAmount / summary.totalMedian : 1;
  const pct = verdict === "cheap"
    ? Math.round((1 - ratio) * 100)
    : Math.round((ratio - 1) * 100);

  return {
    message: style.message,
    sub: style.subTemplate(pct),
    borderColor: style.borderColor,
    iconBg: style.iconBg,
    iconColor: style.iconColor,
    icon: style.icon,
  };
}

export default function VerdictHeader({ summary }: Props) {
  const v = getOverallMessage(summary);

  return (
    <div
      className={`rounded-xl border-l-4 ${v.borderColor} bg-white p-5 shadow-sm animate-scale-in`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-11 h-11 rounded-lg ${v.iconBg} ${v.iconColor} flex items-center justify-center`} aria-hidden="true">
          {v.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-0.5">
            {v.message}
          </h3>
          <p className="text-sm text-slate-500">{v.sub}</p>
        </div>
      </div>
      <dl className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">見積もり合計</dt>
          <dd className="text-2xl font-bold text-slate-900 tabular-nums">
            {formatYen(summary.totalAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">相場中央値</dt>
          <dd className="text-lg font-medium text-slate-500 tabular-nums">
            {formatYen(summary.totalMedian)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
