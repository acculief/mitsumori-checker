export type VehicleSize = "kei" | "small" | "medium" | "large";

export interface PriceRange {
  low: number;
  median: number;
  high: number;
}

export type MarketRateMap = Record<VehicleSize, PriceRange>;

export interface MarketRateItem {
  id: string;
  label: string;
  category: "legal" | "inspection" | "maintenance";
  rates: MarketRateMap;
}

export interface EstimateItem {
  uid: string;
  itemId: string;
  amount: number | "";
  quantity: number;
}

export type Verdict = "cheap" | "fair" | "slightly_high" | "high" | "very_high";

export interface CompareResult {
  itemId: string;
  label: string;
  amount: number;
  quantity: number;
  range: PriceRange;
  verdict: Verdict;
  diffFromMedian: number;
}

export interface SummaryResult {
  totalAmount: number;
  totalMedian: number;
  totalDiff: number;
  potentialSaving: number;
  items: CompareResult[];
}
