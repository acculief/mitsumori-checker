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
  // 法定費用など固定価格の項目: 正確な金額なら「適正」
  if (range.low === range.high) {
    if (amount <= range.low) return "fair";
    if (amount <= range.high * 1.3) return "high";
    return "very_high";
  }
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

    const baseRange = rateItem.rates[vehicleSize];
    const qty = item.quantity || 1;
    const amount = Number(item.amount);

    // 数量分をかけたレンジで比較
    const range: PriceRange = {
      low: baseRange.low * qty,
      median: baseRange.median * qty,
      high: baseRange.high * qty,
    };

    results.push({
      itemId: item.itemId,
      label: rateItem.label,
      amount,
      quantity: qty,
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
