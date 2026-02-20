import { OcrExtractedItem } from "./ocr-types";

/**
 * itemId → キーワードマッピング辞書
 * keywords: 含まれていればマッチ候補（複数指定はOR）
 * required: 同時に含まれている必要があるキーワード（AND条件、省略可）
 * exclude: このキーワードが含まれていたらマッチしない（省略可）
 */
interface KeywordRule {
  itemId: string;
  keywords: string[];
  required?: string[];
  exclude?: string[];
}

const keywordRules: KeywordRule[] = [
  // 法定費用
  { itemId: "jibaiseki", keywords: ["自賠責", "自賠", "強制保険"] },
  { itemId: "weight_tax", keywords: ["重量税", "自動車重量"] },
  { itemId: "stamp_fee", keywords: ["印紙", "検査手数料", "証紙"] },
  // 車検基本料・点検
  { itemId: "inspection_fee", keywords: ["車検基本料", "基本料", "基本工賃", "検査料", "車検整備", "24ヶ月点検", "24ケ月点検", "12ヶ月点検", "12ケ月点検", "法定点検", "継続検査", "定期点検"], exclude: ["種別"] },
  // メンテナンス
  { itemId: "engine_oil", keywords: ["エンジンオイル", "エンジン オイル"], exclude: ["エレメント", "フィルター", "フィルタ"] },
  { itemId: "oil_element", keywords: ["オイルエレメント", "オイルフィルター", "オイルフィルタ", "オイル エレメント", "オイル フィルター"] },
  { itemId: "timing_belt", keywords: ["タイミングベルト", "タイミングチェーン"] },
  { itemId: "brake_pad_front", keywords: ["ブレーキパッド", "ブレーキパット"], required: ["前", "フロント", "FR", "F/"] },
  { itemId: "brake_pad_rear", keywords: ["ブレーキパッド", "ブレーキパット"], required: ["後", "リア", "リヤ", "RR", "R/"] },
  { itemId: "brake_fluid", keywords: ["ブレーキフルード", "ブレーキオイル", "ブレーキ液"] },
  { itemId: "battery", keywords: ["バッテリー", "バッテリ"], exclude: ["液"] },
  { itemId: "spark_plug", keywords: ["スパークプラグ", "プラグ交換", "点火プラグ"] },
  { itemId: "wiper_blade", keywords: ["ワイパー", "ワイパ"] },
  { itemId: "coolant", keywords: ["冷却水", "クーラント", "LLC", "不凍液"] },
  { itemId: "atf", keywords: ["ATF", "オートマオイル", "CVTF", "ミッションオイル", "ミッションフルード"] },
  { itemId: "windshield", keywords: ["フロントガラス", "ウインドシールド", "ウィンドシールド"], exclude: ["サイド", "リア", "バック"] },
  { itemId: "brake_rotor_front", keywords: ["ブレーキローター", "ブレーキロータ", "ディスクローター", "ディスクロータ"] },
  { itemId: "air_filter", keywords: ["エアクリーナー", "エアクリーナ", "エアフィルター", "エアフィルタ", "エアーフィルター"], exclude: ["エアコン", "キャビン"] },
  { itemId: "cabin_air_filter", keywords: ["エアコンフィルター", "エアコンフィルタ", "キャビンフィルター", "キャビンフィルタ"] },
  { itemId: "v_belt", keywords: ["Vベルト", "ファンベルト", "補機ベルト"] },
  { itemId: "driveshaft_boot", keywords: ["ドライブシャフトブーツ", "ドライブシャフト", "シャフトブーツ"] },
  { itemId: "tire", keywords: ["タイヤ"], exclude: ["空気", "圧"] },
  { itemId: "power_steering_fluid", keywords: ["パワーステアリング", "パワステ", "P/Sフルード"] },
  { itemId: "rear_glass", keywords: ["リアガラス", "バックガラス", "リヤガラス"], exclude: ["サイド"] },
  { itemId: "side_glass", keywords: ["サイドガラス", "ドアガラス"] },
];

// ブレーキパッドで前後の区別がない場合はフロントをデフォルトにするための特別ルール
const brakePadGeneric: KeywordRule = {
  itemId: "brake_pad_front",
  keywords: ["ブレーキパッド", "ブレーキパット"],
};

/** 合計行・ヘッダー行に含まれるキーワード */
const SUMMARY_KEYWORDS = ["合計", "請求金額", "消費税", "預り", "諸費用", "振込"];

/**
 * 全角数字→半角数字、全角カンマ→半角カンマ、全角スペース→半角に変換
 */
function normalizeText(text: string): string {
  return text
    .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/，/g, ",")
    .replace(/　/g, " ");
}

/**
 * テキストから金額を抽出
 * パターン: ¥5,000 / 5,000円 / ￥5000 / 8400 / ¥ 5,000 等
 */
function extractAmounts(line: string): number[] {
  const normalized = normalizeText(line);
  const amounts: number[] = [];

  // ¥ or ￥ の後に数字
  const yenPrefixPattern = /[¥￥]\s*([0-9,]+)/g;
  let match;
  while ((match = yenPrefixPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1].replace(/,/g, ""), 10);
    if (!isNaN(val) && val > 0) amounts.push(val);
  }

  // 数字の後に「円」
  const yenSuffixPattern = /([0-9,]+)\s*円/g;
  while ((match = yenSuffixPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1].replace(/,/g, ""), 10);
    if (!isNaN(val) && val > 0 && !amounts.includes(val)) amounts.push(val);
  }

  // カンマ区切りの数字（1,000以上）で上記に該当しなかったもの（単位付きを除外）
  const commaNumPattern = /(?<![¥￥\d])([0-9]{1,3}(?:,[0-9]{3})+)(?!円|km|cc|mm|kg|台|名)/gi;
  while ((match = commaNumPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1].replace(/,/g, ""), 10);
    if (!isNaN(val) && val > 0 && !amounts.includes(val)) amounts.push(val);
  }

  // カンマなしの4桁以上の数字（100〜999,999の範囲で、年・日付・単位付きを除外）
  const plainNumPattern = /(?<![¥￥\d,./\-])([0-9]{4,6})(?![0-9,./\-年月日ヶケkKcCmMgG])/g;
  while ((match = plainNumPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1], 10);
    if (!isNaN(val) && val >= 100 && val <= 999999 && !amounts.includes(val)) {
      if (val >= 1900 && val <= 2099) continue;
      amounts.push(val);
    }
  }

  return amounts;
}

/**
 * ¥/￥プレフィックスなしの金額のみ抽出（テーブル内の素の数字用）
 */
function extractTableAmounts(line: string): number[] {
  const normalized = normalizeText(line);
  const amounts: number[] = [];
  let match;

  // カンマ区切りの数字（単位付きを除外）
  const commaNumPattern = /(?<![¥￥\d])([0-9]{1,3}(?:,[0-9]{3})+)(?![円¥￥]|km|cc|mm|kg)/gi;
  while ((match = commaNumPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1].replace(/,/g, ""), 10);
    if (!isNaN(val) && val > 0) amounts.push(val);
  }

  // カンマなしの4桁以上の数字（単位付きを除外）
  const plainNumPattern = /(?<![¥￥\d,./\-])([0-9]{4,6})(?![0-9,./\-年月日ヶケ円¥￥kKcCmMgG])/g;
  while ((match = plainNumPattern.exec(normalized)) !== null) {
    const val = parseInt(match[1], 10);
    if (!isNaN(val) && val >= 100 && val <= 999999) {
      if (val >= 1900 && val <= 2099) continue;
      amounts.push(val);
    }
  }

  return amounts;
}

/**
 * 項目名キーワードマッチング
 */
function matchItem(line: string): { itemId: string; confidence: "high" | "medium" } | null {
  const normalizedLine = normalizeText(line);

  for (const rule of keywordRules) {
    const keywordMatch = rule.keywords.some((kw) => normalizedLine.includes(kw));
    if (!keywordMatch) continue;

    // excludeチェック
    if (rule.exclude?.some((ex) => normalizedLine.includes(ex))) continue;

    // requiredチェック（ブレーキパッド前後の区別等）
    if (rule.required) {
      const hasRequired = rule.required.some((req) => normalizedLine.includes(req));
      if (!hasRequired) continue;
    }

    return { itemId: rule.itemId, confidence: "high" };
  }

  // ブレーキパッド前後区別なしの場合
  if (brakePadGeneric.keywords.some((kw) => normalizedLine.includes(kw))) {
    return { itemId: brakePadGeneric.itemId, confidence: "medium" };
  }

  return null;
}

/**
 * Pass 1: 近接行アプローチ（項目名と金額が同じ行or近い行にある場合）
 */
function parseByProximity(lines: string[]): OcrExtractedItem[] {
  const results: OcrExtractedItem[] = [];
  const usedItemIds = new Set<string>();
  const WINDOW = 3;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const itemMatch = matchItem(line);
    if (!itemMatch) continue;
    if (usedItemIds.has(itemMatch.itemId)) continue;

    // 同じ行から探す
    let amounts = extractAmounts(line);

    // 周辺行を探す
    if (amounts.length === 0) {
      for (let offset = 1; offset <= WINDOW; offset++) {
        if (i + offset < lines.length) {
          amounts = extractAmounts(lines[i + offset]);
          if (amounts.length > 0) break;
        }
        if (i - offset >= 0) {
          amounts = extractAmounts(lines[i - offset]);
          if (amounts.length > 0) break;
        }
      }
    }

    if (amounts.length > 0) {
      const amount = Math.max(...amounts);
      usedItemIds.add(itemMatch.itemId);
      results.push({
        itemId: itemMatch.itemId,
        label: line.substring(0, 30),
        amount,
        quantity: 1,
        confidence: itemMatch.confidence,
      });
    }
  }

  return results;
}

/**
 * Pass 2: 順序ベースアプローチ（テーブル形式で項目名と金額が離れている場合）
 * 項目名の出現順序と金額行の出現順序を対応させてペアリングする
 */
function parseByOrder(lines: string[]): OcrExtractedItem[] {
  // 1. 項目マッチを収集（出現順）
  const itemMatches: Array<{
    index: number;
    itemId: string;
    label: string;
    confidence: "high" | "medium";
  }> = [];
  const usedItemIds = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const m = matchItem(lines[i]);
    if (m && !usedItemIds.has(m.itemId)) {
      usedItemIds.add(m.itemId);
      itemMatches.push({
        index: i,
        itemId: m.itemId,
        label: lines[i].substring(0, 30),
        confidence: m.confidence,
      });
    }
  }

  if (itemMatches.length === 0) return [];

  // 2. 金額行を収集（最初の項目以降、合計行・項目行を除外、¥プレフィックスなしの素の数字のみ）
  const itemIndices = new Set(itemMatches.map((m) => m.index));
  const firstItemIndex = itemMatches[0].index;
  const amountLines: Array<{ amounts: number[] }> = [];

  for (let i = firstItemIndex; i < lines.length; i++) {
    if (itemIndices.has(i)) continue;
    if (SUMMARY_KEYWORDS.some((kw) => lines[i].includes(kw))) continue;

    const amounts = extractTableAmounts(lines[i]);
    if (amounts.length > 0) {
      amountLines.push({ amounts });
    }
  }

  // 3. 順序ベースでペアリング
  const results: OcrExtractedItem[] = [];
  const pairCount = Math.min(itemMatches.length, amountLines.length);

  for (let i = 0; i < pairCount; i++) {
    const item = itemMatches[i];
    const amountLine = amountLines[i];
    const amount = Math.max(...amountLine.amounts);

    results.push({
      itemId: item.itemId,
      label: item.label,
      amount,
      quantity: 1,
      confidence: "medium", // テーブル解析は確信度を下げる
    });
  }

  return results;
}

/**
 * OCRテキストから項目と金額を抽出
 * Pass 1（近接行）で見つからなければ Pass 2（順序ベース）にフォールバック
 */
export function parseOcrText(ocrText: string): OcrExtractedItem[] {
  const lines = ocrText.split("\n").map((l) => l.trim()).filter(Boolean);

  // Pass 1: 項目名と金額が近い行にある場合（レシート形式など）
  const results = parseByProximity(lines);
  if (results.length > 0) return results;

  // Pass 2: テーブル形式（項目名と金額が離れている場合）
  return parseByOrder(lines);
}
