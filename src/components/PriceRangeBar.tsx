import { PriceRange, Verdict } from "@/lib/types";
import { verdictColors } from "@/lib/constants";
import { formatYen } from "@/lib/formatters";

interface Props {
  amount: number;
  range: PriceRange;
  verdict: Verdict;
}

export default function PriceRangeBar({ amount, range, verdict }: Props) {
  const displayMax = range.high * 1.5;
  const clampedAmount = Math.min(amount, displayMax);
  const pinPercent = (clampedAmount / displayMax) * 100;
  const lowPercent = (range.low / displayMax) * 100;
  const highPercent = (range.high / displayMax) * 100;
  const c = verdictColors[verdict];

  return (
    <div className="mt-2">
      {/* Bar */}
      <div className="relative h-2 rounded-full bg-slate-100 overflow-hidden">
        {/* Fair zone */}
        <div
          className="absolute top-0 h-full bg-emerald-100/70"
          style={{ left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` }}
        />
        {/* Pin marker */}
        <div
          className={`absolute top-0 h-full w-2 rounded-full ${c.bar} ring-1 ring-white animate-expand origin-left`}
          style={{ left: `${Math.max(0, pinPercent - 0.75)}%` }}
        />
      </div>
      {/* Labels */}
      <div className="relative mt-0.5 h-4 text-[11px] text-slate-400 tabular-nums">
        {range.low === range.high ? (
          <span className="absolute" style={{ left: `${lowPercent}%`, transform: "translateX(-50%)" }}>
            固定 {formatYen(range.low)}
          </span>
        ) : (
          <>
            <span className="absolute" style={{ left: `${lowPercent}%`, transform: "translateX(-50%)" }}>
              {formatYen(range.low)}
            </span>
            <span className="absolute" style={{ left: `${highPercent}%`, transform: "translateX(-50%)" }}>
              {formatYen(range.high)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
