import { Verdict } from "@/lib/types";
import { verdictLabels, verdictColors, verdictEmoji } from "@/lib/constants";

interface Props {
  verdict: Verdict;
  size?: "sm" | "md";
}

export default function ResultBadge({ verdict, size = "sm" }: Props) {
  const c = verdictColors[verdict];
  const sizeClass =
    size === "md"
      ? "px-3 py-1 text-sm"
      : "px-2.5 py-0.5 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold border ${sizeClass} ${c.bg} ${c.text} ${c.border}`}
    >
      <span>{verdictEmoji[verdict]}</span>
      {verdictLabels[verdict]}
    </span>
  );
}
