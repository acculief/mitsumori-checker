import { MarketRateItem } from "@/lib/types";

/** 相場データの最終更新日（表示用） */
export const dataLastUpdated = "2026年2月";

/** 数量選択が可能な項目の設定 */
export const quantityConfig: Record<string, { unit: string; max: number }> = {
  tire: { unit: "本", max: 4 },
  driveshaft_boot: { unit: "箇所", max: 4 },
  side_glass: { unit: "枚", max: 4 },
};

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
  {
    id: "windshield",
    label: "フロントガラス交換",
    category: "maintenance",
    rates: {
      kei:    { low: 50000, median: 75000,  high: 100000 },
      small:  { low: 65000, median: 85000,  high: 110000 },
      medium: { low: 70000, median: 90000,  high: 130000 },
      large:  { low: 90000, median: 115000, high: 150000 },
    },
  },
  {
    id: "brake_rotor_front",
    label: "ブレーキディスクローター交換（フロント）",
    category: "maintenance",
    rates: {
      kei:    { low: 10000, median: 18000, high: 28000 },
      small:  { low: 14000, median: 25000, high: 40000 },
      medium: { low: 18000, median: 32000, high: 55000 },
      large:  { low: 25000, median: 45000, high: 80000 },
    },
  },
  {
    id: "air_filter",
    label: "エアクリーナー（エアフィルター）交換",
    category: "maintenance",
    rates: {
      kei:    { low: 2500, median: 4000, high: 7000 },
      small:  { low: 3500, median: 6000, high: 10000 },
      medium: { low: 4000, median: 7000, high: 12000 },
      large:  { low: 5000, median: 8000, high: 15000 },
    },
  },
  {
    id: "cabin_air_filter",
    label: "エアコンフィルター交換",
    category: "maintenance",
    rates: {
      kei:    { low: 2000, median: 3500, high: 6000 },
      small:  { low: 2500, median: 4500, high: 8000 },
      medium: { low: 3000, median: 5500, high: 10000 },
      large:  { low: 3500, median: 6500, high: 12000 },
    },
  },
  {
    id: "v_belt",
    label: "Vベルト（ファンベルト）交換",
    category: "maintenance",
    rates: {
      kei:    { low: 8000,  median: 13000, high: 20000 },
      small:  { low: 10000, median: 16000, high: 25000 },
      medium: { low: 13000, median: 20000, high: 30000 },
      large:  { low: 16000, median: 25000, high: 38000 },
    },
  },
  {
    id: "driveshaft_boot",
    label: "ドライブシャフトブーツ交換（1箇所）",
    category: "maintenance",
    rates: {
      kei:    { low: 8000,  median: 15000, high: 25000 },
      small:  { low: 12000, median: 20000, high: 30000 },
      medium: { low: 15000, median: 25000, high: 40000 },
      large:  { low: 20000, median: 32000, high: 55000 },
    },
  },
  {
    id: "tire",
    label: "タイヤ交換（1本）",
    category: "maintenance",
    rates: {
      kei:    { low: 5000,  median: 9000,  high: 18000 },
      small:  { low: 7000,  median: 12000, high: 25000 },
      medium: { low: 9000,  median: 16000, high: 35000 },
      large:  { low: 12000, median: 22000, high: 50000 },
    },
  },
  {
    id: "power_steering_fluid",
    label: "パワーステアリングフルード交換",
    category: "maintenance",
    rates: {
      kei:    { low: 3000, median: 5000, high: 8000 },
      small:  { low: 4000, median: 6500, high: 10000 },
      medium: { low: 5000, median: 8000, high: 12000 },
      large:  { low: 5500, median: 9000, high: 14000 },
    },
  },
  {
    id: "rear_glass",
    label: "リアガラス（バックガラス）交換",
    category: "maintenance",
    rates: {
      kei:    { low: 30000, median: 55000, high: 80000 },
      small:  { low: 40000, median: 65000, high: 90000 },
      medium: { low: 50000, median: 75000, high: 100000 },
      large:  { low: 60000, median: 85000, high: 120000 },
    },
  },
  {
    id: "side_glass",
    label: "サイドガラス交換（ドアガラス1枚）",
    category: "maintenance",
    rates: {
      kei:    { low: 18000, median: 28000, high: 45000 },
      small:  { low: 22000, median: 35000, high: 55000 },
      medium: { low: 28000, median: 42000, high: 65000 },
      large:  { low: 35000, median: 52000, high: 80000 },
    },
  },
];
