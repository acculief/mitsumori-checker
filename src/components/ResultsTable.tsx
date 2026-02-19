import { CompareResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import ResultBadge from "./ResultBadge";
import PriceRangeBar from "./PriceRangeBar";

interface Props {
  items: CompareResult[];
}

export default function ResultsTable({ items }: Props) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={item.itemId}
          className="rounded-lg border border-slate-200 bg-white p-3.5 animate-fade-in-up"
          style={{ animationDelay: `${Math.min(i, 5) * 50}ms` }}
        >
          {/* Top row: label + badge */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
            <ResultBadge verdict={item.verdict} />
          </div>

          {/* Price comparison */}
          <div className="flex items-baseline gap-4 text-sm">
            <div>
              <span className="text-slate-500 text-xs">見積 </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatYen(item.amount)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-xs">中央値 </span>
              <span className="font-medium text-slate-500 tabular-nums">
                {formatYen(item.range.median)}
              </span>
            </div>
            <div className="ml-auto">
              <span
                className={`font-bold text-sm tabular-nums ${
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
