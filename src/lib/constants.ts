import { VehicleSize, Verdict } from "./types";

export const vehicleSizeLabels: Record<VehicleSize, string> = {
  kei: "軽自動車",
  small: "小型車",
  medium: "中型車",
  large: "大型車",
};

export const vehicleSizeDescriptions: Record<VehicleSize, string> = {
  kei: "660cc以下",
  small: "〜1,500cc",
  medium: "〜2,000cc",
  large: "2,000cc超",
};

export const vehicleSizeExamples: Record<VehicleSize, string> = {
  kei: "N-BOX, タント, ワゴンR",
  small: "アクア, フィット, ヤリス",
  medium: "プリウス, カローラ, CX-5",
  large: "アルファード, ランクル, エルグランド",
};

export const verdictLabels: Record<Verdict, string> = {
  cheap: "割安",
  fair: "適正",
  slightly_high: "やや高い",
  high: "高い",
  very_high: "非常に高い",
};

export const verdictEmoji: Record<Verdict, string> = {
  cheap: "✨",
  fair: "✅",
  slightly_high: "⚠️",
  high: "🔶",
  very_high: "🚨",
};

export const verdictColors: Record<
  Verdict,
  { bg: string; text: string; border: string; bar: string }
> = {
  cheap: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-300",
    bar: "bg-sky-400",
  },
  fair: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-300",
    bar: "bg-emerald-500",
  },
  slightly_high: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    bar: "bg-amber-400",
  },
  high: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-300",
    bar: "bg-orange-500",
  },
  very_high: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-300",
    bar: "bg-rose-500",
  },
};

export const stepLabels = ["車両選択", "見積入力", "診断結果"] as const;
