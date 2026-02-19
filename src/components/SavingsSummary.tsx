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
    <div className="grid grid-cols-3 gap-3 animate-fade-in-up-delay-1">
      <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
        <div className="text-xs text-[#64748b] mb-1">診断項目数</div>
        <div className="text-2xl font-bold text-[#1a2332]">
          {summary.items.length}
          <span className="text-sm font-normal text-[#64748b] ml-0.5">件</span>
        </div>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
        <div className="text-xs text-[#64748b] mb-1">適正価格</div>
        <div className="text-2xl font-bold text-emerald-600">
          {fairCount}
          <span className="text-sm font-normal text-[#64748b] ml-0.5">件</span>
        </div>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
        <div className="text-xs text-[#64748b] mb-1">要確認</div>
        <div className={`text-2xl font-bold ${warnCount > 0 ? "text-amber-600" : "text-slate-300"}`}>
          {warnCount}
          <span className="text-sm font-normal text-[#64748b] ml-0.5">件</span>
        </div>
      </div>

      {summary.potentialSaving > 0 && (
        <div className="col-span-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-amber-700 font-medium mb-0.5">
                交渉で節約できる可能性
              </div>
              <div className="text-sm text-[#64748b]">
                中央値まで交渉した場合の節約見込み額
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-700">
              {formatYen(summary.potentialSaving)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
