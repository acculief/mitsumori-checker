export type OverallVerdict = "cheap" | "fair" | "slightly_high" | "high";

export function getOverallVerdict(
  totalAmount: number,
  totalMedian: number
): OverallVerdict {
  const ratio = totalAmount / totalMedian;
  if (ratio <= 0.9) return "cheap";
  if (ratio <= 1.1) return "fair";
  if (ratio <= 1.3) return "slightly_high";
  return "high";
}

export const overallVerdictLabels: Record<OverallVerdict, string> = {
  cheap: "割安",
  fair: "適正価格",
  slightly_high: "やや高め",
  high: "割高",
};
