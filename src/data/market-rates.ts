import { MarketRateItem } from "@/lib/types";

export const marketRates: MarketRateItem[] = [
  // ── 法定費用 ──
  {
    id: "jibaiseki",
    label: "自賠責保険（24ヶ月）",
    category: "legal",
    rates: {
      kei:    { low: 17540, median: 17540, high: 17540 },
      small:  { low: 17650, median: 17650, high: 17650 },
      medium: { low: 17650, median: 17650, high: 17650 },
      large:  { low: 17650, median: 17650, high: 17650 },
    },
  },
  {
    id: "weight_tax",
    label: "自動車重量税",
    category: "legal",
    rates: {
      kei:    { low: 6600,  median: 6600,  high: 6600 },
      small:  { low: 16400, median: 16400, high: 16400 },
      medium: { low: 24600, median: 24600, high: 24600 },
      large:  { low: 32800, median: 32800, high: 32800 },
    },
  },
  {
    id: "stamp_fee",
    label: "印紙代",
    category: "legal",
    rates: {
      kei:    { low: 1400, median: 1400, high: 1400 },
      small:  { low: 1700, median: 1700, high: 1700 },
      medium: { low: 1800, median: 1800, high: 1800 },
      large:  { low: 1800, median: 1800, high: 1800 },
    },
  },
  // ── 車検基本料 ──
  {
    id: "inspection_fee",
    label: "車検基本料",
    category: "inspection",
    rates: {
      kei:    { low: 10000, median: 15000, high: 25000 },
      small:  { low: 13000, median: 20000, high: 35000 },
      medium: { low: 15000, median: 25000, high: 40000 },
      large:  { low: 18000, median: 30000, high: 50000 },
    },
  },
  // ── メンテナンス項目 ──
  {
    id: "engine_oil",
    label: "エンジンオイル交換",
    category: "maintenance",
    rates: {
      kei:    { low: 2000, median: 3500, high: 5000 },
      small:  { low: 3000, median: 5000, high: 7000 },
      medium: { low: 4000, median: 6000, high: 8000 },
      large:  { low: 5000, median: 7000, high: 10000 },
    },
  },
  {
    id: "oil_element",
    label: "オイルエレメント交換",
    category: "maintenance",
    rates: {
      kei:    { low: 1000, median: 2000, high: 3000 },
      small:  { low: 1500, median: 2500, high: 4000 },
      medium: { low: 2000, median: 3000, high: 5000 },
      large:  { low: 2500, median: 3500, high: 5500 },
    },
  },
  {
    id: "timing_belt",
    label: "タイミングベルト交換",
    category: "maintenance",
    rates: {
      kei:    { low: 20000, median: 35000, high: 50000 },
      small:  { low: 30000, median: 50000, high: 70000 },
      medium: { low: 40000, median: 60000, high: 80000 },
      large:  { low: 50000, median: 70000, high: 100000 },
    },
  },
  {
    id: "brake_pad_front",
    label: "ブレーキパッド交換（フロント）",
    category: "maintenance",
    rates: {
      kei:    { low: 8000,  median: 12000, high: 18000 },
      small:  { low: 10000, median: 15000, high: 25000 },
      medium: { low: 12000, median: 20000, high: 30000 },
      large:  { low: 15000, median: 25000, high: 35000 },
    },
  },
  {
    id: "brake_pad_rear",
    label: "ブレーキパッド交換（リア）",
    category: "maintenance",
    rates: {
      kei:    { low: 8000,  median: 12000, high: 18000 },
      small:  { low: 10000, median: 15000, high: 25000 },
      medium: { low: 12000, median: 20000, high: 30000 },
      large:  { low: 15000, median: 25000, high: 35000 },
    },
  },
  {
    id: "brake_fluid",
    label: "ブレーキフルード交換",
    category: "maintenance",
    rates: {
      kei:    { low: 3000, median: 5000, high: 8000 },
      small:  { low: 4000, median: 6000, high: 10000 },
      medium: { low: 5000, median: 7000, high: 12000 },
      large:  { low: 5000, median: 8000, high: 13000 },
    },
  },
  {
    id: "battery",
    label: "バッテリー交換",
    category: "maintenance",
    rates: {
      kei:    { low: 5000,  median: 10000, high: 15000 },
      small:  { low: 8000,  median: 15000, high: 25000 },
      medium: { low: 10000, median: 20000, high: 30000 },
      large:  { low: 15000, median: 25000, high: 40000 },
    },
  },
  {
    id: "spark_plug",
    label: "スパークプラグ交換",
    category: "maintenance",
    rates: {
      kei:    { low: 3000, median: 5000, high: 8000 },
      small:  { low: 4000, median: 7000, high: 12000 },
      medium: { low: 5000, median: 9000, high: 15000 },
      large:  { low: 6000, median: 10000, high: 18000 },
    },
  },
  {
    id: "wiper_blade",
    label: "ワイパーブレード交換",
    category: "maintenance",
    rates: {
      kei:    { low: 1000, median: 2000, high: 4000 },
      small:  { low: 1500, median: 3000, high: 5000 },
      medium: { low: 2000, median: 3500, high: 6000 },
      large:  { low: 2000, median: 4000, high: 7000 },
    },
  },
  {
    id: "coolant",
    label: "冷却水（LLC）交換",
    category: "maintenance",
    rates: {
      kei:    { low: 3000, median: 5000, high: 8000 },
      small:  { low: 4000, median: 6000, high: 10000 },
      medium: { low: 5000, median: 7000, high: 12000 },
      large:  { low: 5000, median: 8000, high: 14000 },
    },
  },
  {
    id: "atf",
    label: "ATF（オートマオイル）交換",
    category: "maintenance",
    rates: {
      kei:    { low: 5000,  median: 8000,  high: 12000 },
      small:  { low: 6000,  median: 10000, high: 15000 },
      medium: { low: 8000,  median: 12000, high: 18000 },
      large:  { low: 10000, median: 15000, high: 22000 },
    },
  },
];
