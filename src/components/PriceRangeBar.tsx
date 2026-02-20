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

  const srText = range.low === range.high
    ? `見積もり${formatYen(amount)}、相場${formatYen(range.low)}（固定）`
    : `見積もり${formatYen(amount)}、相場${formatYen(range.low)}〜${formatYen(range.high)}`;

  return (
    <div className="mt-2">
      <span className="sr-only">{srText}</span>
      {/* Bar */}
      <div className="relative h-2 rounded-full bg-slate-100 overflow-hidden" aria-hidden="true">
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
      <div className="relative mt-0.5 h-4 text-[11px] text-slate-500 tabular-nums" aria-hidden="true">
        {range.low === range.high ? (
          <span
            className="absolute"
            style={{
              left: `${Math.max(10, Math.min(90, lowPercent))}%`,
              transform: lowPercent < 15 ? "translateX(0)" : lowPercent > 85 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            固定 {formatYen(range.low)}
          </span>
        ) : (
          <>
            <span
              className="absolute"
              style={{
                left: `${Math.max(0, lowPercent)}%`,
                transform: lowPercent < 10 ? "translateX(0)" : "translateX(-50%)",
              }}
            >
              {formatYen(range.low)}
            </span>
            <span
              className="absolute"
              style={{
                left: `${Math.min(100, highPercent)}%`,
                transform: highPercent > 85 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {formatYen(range.high)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
