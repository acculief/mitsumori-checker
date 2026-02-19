import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";

interface Props {
  summary: SummaryResult;
}

export default function SavingsSummary({ summary }: Props) {
  const fairCount = summary.items.filter(
    (i) => i.verdict === "cheap" || i.verdict === "fair"
  ).length;
  const warnCount = summary.items.length - fairCount;

  return (
    <div className="animate-fade-in-up-delay-1">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-white border border-slate-200 p-3 text-center">
          <div className="text-[11px] font-medium text-slate-400 mb-0.5">診断項目</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {summary.items.length}
            <span className="text-xs font-normal text-slate-400 ml-0.5">件</span>
          </div>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-3 text-center">
          <div className="text-[11px] font-medium text-slate-400 mb-0.5">適正価格</div>
          <div className="text-xl font-bold text-emerald-600 tabular-nums">
            {fairCount}
            <span className="text-xs font-normal text-slate-400 ml-0.5">件</span>
          </div>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-3 text-center">
          <div className="text-[11px] font-medium text-slate-400 mb-0.5">要確認</div>
          <div className={`text-xl font-bold tabular-nums ${warnCount > 0 ? "text-amber-600" : "text-slate-300"}`}>
            {warnCount}
            <span className="text-xs font-normal text-slate-400 ml-0.5">件</span>
          </div>
        </div>
      </div>

      {summary.potentialSaving > 0 && (
        <div className="mt-2 rounded-lg border-l-4 border-amber-400 bg-white border-y border-r border-slate-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-amber-700">
                交渉で節約できる可能性
              </div>
              <div className="text-[11px] text-slate-500">
                中央値まで交渉した場合の見込み額
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-700 tabular-nums">
              {formatYen(summary.potentialSaving)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
