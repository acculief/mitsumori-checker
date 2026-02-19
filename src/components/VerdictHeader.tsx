import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";

interface Props {
  summary: SummaryResult;
}

function getOverallMessage(summary: SummaryResult): {
  message: string;
  sub: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
} {
  const ratio = summary.totalAmount / summary.totalMedian;

  if (ratio <= 0.9) {
    return {
      message: "この見積もりは相場より割安です",
      sub: `相場中央値より ${Math.round((1 - ratio) * 100)}% 安い見積もりです。`,
      borderColor: "border-sky-400",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    };
  }
  if (ratio <= 1.1) {
    return {
      message: "この見積もりは適正価格です",
      sub: "相場の範囲内です。安心してお任せできます。",
      borderColor: "border-emerald-400",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    };
  }
  if (ratio <= 1.3) {
    return {
      message: "この見積もりはやや高めです",
      sub: `相場中央値より ${Math.round((ratio - 1) * 100)}% 高め。他社比較をおすすめします。`,
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
    };
  }
  return {
    message: "この見積もりは相場より割高です",
    sub: `相場中央値より ${Math.round((ratio - 1) * 100)}% 高い。相見積もりを取りましょう。`,
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
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">見積もり合計</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {formatYen(summary.totalAmount)}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">相場中央値</div>
          <div className="text-lg font-medium text-slate-500 tabular-nums">
            {formatYen(summary.totalMedian)}
          </div>
        </div>
      </div>
    </div>
  );
}
