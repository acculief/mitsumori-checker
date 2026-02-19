import { PriceRange, Verdict } from "@/lib/types";
import { verdictColors } from "@/lib/constants";
import { formatYen } from "@/lib/formatters";

interface Props {
  amount: number;
  range: PriceRange;
  verdict: Verdict;
}

export default function PriceRangeBar({ amount, range, verdict }: Props) {
  // Display range: 0 to high * 1.5 (to show "very high" zone)
  const displayMax = range.high * 1.5;
  const clampedAmount = Math.min(amount, displayMax);
  const pinPercent = (clampedAmount / displayMax) * 100;
  const lowPercent = (range.low / displayMax) * 100;
  const highPercent = (range.high / displayMax) * 100;
  const c = verdictColors[verdict];

  return (
    <div className="mt-2">
      {/* Bar */}
      <div className="relative h-3 rounded-full bg-slate-100 overflow-hidden">
        {/* Fair zone (low ~ high) */}
        <div
          className="absolute top-0 h-full bg-emerald-100 rounded-full"
          style={{ left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` }}
        />
        {/* Pin marker */}
        <div
          className={`absolute top-0 h-full w-1.5 rounded-full ${c.bar} animate-expand`}
          style={{ left: `${Math.max(0, pinPercent - 0.5)}%` }}
        />
      </div>
      {/* Labels */}
      <div className="relative mt-1 h-4 text-[10px] text-slate-400">
        <span className="absolute" style={{ left: `${lowPercent}%`, transform: "translateX(-50%)" }}>
          {formatYen(range.low)}
        </span>
        <span className="absolute" style={{ left: `${highPercent}%`, transform: "translateX(-50%)" }}>
          {formatYen(range.high)}
        </span>
      </div>
    </div>
  );
}
