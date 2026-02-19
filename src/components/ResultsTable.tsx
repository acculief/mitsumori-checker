import { CompareResult } from "@/lib/types";
import ResultBadge from "./ResultBadge";
import PriceRangeBar from "./PriceRangeBar";

function formatYen(n: number) {
  return `¥${n.toLocaleString()}`;
}

interface Props {
  items: CompareResult[];
}

export default function ResultsTable({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.itemId}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-fade-in-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {/* Top row: label + badge */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-[#1a2332] text-sm">{item.label}</h4>
            <ResultBadge verdict={item.verdict} />
          </div>

          {/* Price comparison */}
          <div className="flex items-baseline justify-between text-sm">
            <div>
              <span className="text-[#64748b]">見積もり </span>
              <span className="font-bold text-[#1a2332]">
                {formatYen(item.amount)}
              </span>
            </div>
            <div>
              <span className="text-[#64748b]">中央値 </span>
              <span className="font-medium text-[#64748b]">
                {formatYen(item.range.median)}
              </span>
            </div>
            <div>
              <span className="text-[#64748b]">差額 </span>
              <span
                className={`font-bold ${
                  item.diffFromMedian > 0
                    ? "text-rose-600"
                    : item.diffFromMedian < 0
                      ? "text-sky-600"
                      : "text-slate-400"
                }`}
              >
                {item.diffFromMedian > 0 ? "+" : ""}
                {formatYen(item.diffFromMedian)}
              </span>
            </div>
          </div>

          {/* Range bar */}
          <PriceRangeBar
            amount={item.amount}
            range={item.range}
            verdict={item.verdict}
          />
        </div>
      ))}
    </div>
  );
}
