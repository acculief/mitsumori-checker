import { Verdict } from "@/lib/types";
import { verdictLabels, verdictColors } from "@/lib/constants";

interface Props {
  verdict: Verdict;
}

export default function ResultBadge({ verdict }: Props) {
  const c = verdictColors[verdict];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${c.bg} ${c.text} ${c.border}`}
    >
      {verdictLabels[verdict]}
    </span>
  );
}
