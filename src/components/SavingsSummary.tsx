import { SummaryResult } from "@/lib/types";

function formatYen(n: number) {
  return `¥${n.toLocaleString()}`;
}

interface Props {
  summary: SummaryResult;
}

export default function SavingsSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-lg bg-white border border-slate-200 p-4 text-center">
        <div className="text-xs text-slate-500 mb-1">見積もり合計</div>
        <div className="text-xl font-bold text-slate-800">
          {formatYen(summary.totalAmount)}
        </div>
      </div>
      <div className="rounded-lg bg-white border border-slate-200 p-4 text-center">
        <div className="text-xs text-slate-500 mb-1">相場合計（中央値）</div>
        <div className="text-xl font-bold text-slate-800">
          {formatYen(summary.totalMedian)}
        </div>
      </div>
      <div
        className={`rounded-lg border p-4 text-center ${
          summary.potentialSaving > 0
            ? "bg-red-50 border-red-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="text-xs text-slate-500 mb-1">節約可能額</div>
        <div
          className={`text-xl font-bold ${
            summary.potentialSaving > 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          {summary.potentialSaving > 0
            ? `-${formatYen(summary.potentialSaving)}`
            : formatYen(0)}
        </div>
      </div>
    </div>
  );
}
