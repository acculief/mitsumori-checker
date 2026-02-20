import { CompareResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import ResultBadge from "./ResultBadge";
import PriceRangeBar from "./PriceRangeBar";

interface Props {
  items: CompareResult[];
}

export default function ResultsTable({ items }: Props) {
  return (
    <ul className="space-y-2" aria-label={`診断結果 全${items.length}件`}>
      {items.map((item, i) => (
        <li
          key={`${item.itemId}-${i}`}
          className="rounded-lg border border-slate-200 bg-white p-3.5 animate-fade-in-up"
          style={{ animationDelay: `${Math.min(i, 5) * 50}ms` }}
        >
          {/* Top row: label + badge */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-900 text-sm">
              {item.label}
              {item.quantity > 1 && (
                <span className="text-xs font-normal text-slate-400 ml-1">×{item.quantity}</span>
              )}
            </h4>
            <ResultBadge verdict={item.verdict} />
          </div>

          {/* Price comparison */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 text-sm">
            <div className="min-w-0">
              <span className="text-slate-500 text-xs">見積 </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatYen(item.amount)}
              </span>
            </div>
            <div className="min-w-0">
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
        </li>
      ))}
    </ul>
  );
}
