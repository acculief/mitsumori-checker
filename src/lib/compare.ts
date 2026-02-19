import { marketRates } from "@/data/market-rates";
import {
  VehicleSize,
  EstimateItem,
  CompareResult,
  SummaryResult,
  Verdict,
  PriceRange,
} from "./types";

function judge(amount: number, range: PriceRange): Verdict {
  if (amount <= range.low) return "cheap";
  if (amount <= range.median * 1.1) return "fair";
  if (amount <= range.high) return "slightly_high";
  if (amount <= range.high * 1.3) return "high";
  return "very_high";
}

export function compareEstimate(
  vehicleSize: VehicleSize,
  items: EstimateItem[]
): SummaryResult {
  const results: CompareResult[] = [];

  for (const item of items) {
    if (item.itemId === "" || item.amount === "") continue;

    const rateItem = marketRates.find((r) => r.id === item.itemId);
    if (!rateItem) continue;

    const range = rateItem.rates[vehicleSize];
    const amount = Number(item.amount);

    results.push({
      itemId: item.itemId,
      label: rateItem.label,
      amount,
      range,
      verdict: judge(amount, range),
      diffFromMedian: amount - range.median,
    });
  }

  const totalAmount = results.reduce((s, r) => s + r.amount, 0);
  const totalMedian = results.reduce((s, r) => s + r.range.median, 0);
  const potentialSaving = results.reduce(
    (s, r) => s + Math.max(0, r.amount - r.range.median),
    0
  );

  return {
    totalAmount,
    totalMedian,
    totalDiff: totalAmount - totalMedian,
    potentialSaving,
    items: results,
  };
}
