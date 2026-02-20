export interface OcrExtractedItem {
  /** marketRatesのID（マッチしない場合は空文字） */
  itemId: string;
  /** 見積書上の項目名（原文） */
  label: string;
  /** 金額 */
  amount: number;
  /** 数量（デフォルト1） */
  quantity: number;
  /** マッチ確信度 */
  confidence: "high" | "medium" | "low";
}

export interface OcrResult {
  items: OcrExtractedItem[];
  /** 推定できた場合の車両サイズ */
  vehicleSize: string | null;
}

export type OcrApiResponse =
  | { success: true; data: OcrResult }
  | { success: false; error: string };
