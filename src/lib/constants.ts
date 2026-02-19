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

export const vehicleSizeIcons: Record<VehicleSize, string> = {
  kei: "🚗",
  small: "🚙",
  medium: "🚐",
  large: "🚛",
};

export const verdictLabels: Record<Verdict, string> = {
  cheap: "割安",
  fair: "適正",
  slightly_high: "やや高い",
  high: "高い",
  very_high: "非常に高い",
};

export const verdictColors: Record<
  Verdict,
  { bg: string; text: string; border: string }
> = {
  cheap: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  fair: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
  slightly_high: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  high: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-300",
  },
  very_high: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
  },
};
