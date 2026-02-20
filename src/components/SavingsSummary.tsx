import { SummaryResult } from "@/lib/types";
import { dataLastUpdated } from "@/data/market-rates";

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
          <div className="text-[11px] font-medium text-slate-400 mb-0.5">割安・適正</div>
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

      <p className="text-[11px] text-slate-400 mt-2 text-center">
        全国の整備工場の公開価格情報・業界統計をもとに算出 · 25項目対応 · {dataLastUpdated}更新
      </p>
    </div>
  );
}
