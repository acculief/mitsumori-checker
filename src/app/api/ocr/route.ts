import { NextRequest, NextResponse } from "next/server";
import { parseOcrText } from "@/lib/ocr-parser";
import type { OcrApiResponse } from "@/lib/ocr-types";

// PDF処理は時間がかかるため余裕を持たせる
export const maxDuration = 30;

const MAX_BASE64_SIZE = 6 * 1024 * 1024; // 6MB（base64後）

export async function POST(req: NextRequest): Promise<NextResponse<OcrApiResponse>> {
  const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "OCR機能は現在設定中です。しばらくお待ちください。" },
      { status: 503 }
    );
  }

  let body: { image: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "リクエストの形式が正しくありません。" },
      { status: 400 }
    );
  }

  const { image } = body;
  if (!image || typeof image !== "string") {
    return NextResponse.json(
      { success: false, error: "ファイルデータがありません。" },
      { status: 400 }
    );
  }

  // MIMEタイプとbase64データを分離
  const mimeMatch = image.match(/^data:([^;]+);base64,/);
  const mimeType = mimeMatch?.[1] ?? "image/jpeg";
  const base64Data = image.includes(",") ? image.split(",")[1] : image;
  const isPdf = mimeType === "application/pdf";

  if (base64Data.length > MAX_BASE64_SIZE) {
    return NextResponse.json(
      { success: false, error: "ファイルサイズが大きすぎます。もう少し小さいファイルでお試しください。" },
      { status: 400 }
    );
  }

  try {
    let ocrText: string;

    if (isPdf) {
      // PDF → files:annotate エンドポイント
      ocrText = await ocrPdf(base64Data, apiKey);
    } else {
      // 画像 → images:annotate エンドポイント
      ocrText = await ocrImage(base64Data, apiKey);
    }

    if (!ocrText) {
      return NextResponse.json(
        { success: false, error: "テキストを読み取れませんでした。鮮明な写真で再度お試しください。" },
        { status: 422 }
      );
    }

    const items = parseOcrText(ocrText);

    return NextResponse.json({
      success: true,
      data: { items, vehicleSize: null },
    });
  } catch (error) {
    console.error("OCR processing error:", error);
    const msg = error instanceof Error ? error.message : "処理中にエラーが発生しました。";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

async function ocrImage(base64Data: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Data },
            features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 1 }],
            imageContext: { languageHints: ["ja"] },
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    console.error("Vision API error:", res.status, await res.text());
    throw new Error("画像の読み取りに失敗しました。もう一度お試しください。");
  }

  const data = await res.json();

  // Vision APIがエラーを返す場合
  const apiError = data.responses?.[0]?.error;
  if (apiError) {
    console.error("Vision API response error:", apiError);
    throw new Error("この画像は読み取れませんでした。別の画像でお試しください。");
  }

  return data.responses?.[0]?.fullTextAnnotation?.text ?? "";
}

async function ocrPdf(base64Data: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://vision.googleapis.com/v1/files:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            inputConfig: {
              content: base64Data,
              mimeType: "application/pdf",
            },
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
            imageContext: { languageHints: ["ja"] },
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "(response body unreadable)");
    console.error("Vision files API error:", res.status, errText);
    throw new Error("PDFの読み取りに失敗しました。別のファイルでお試しください。");
  }

  const data = await res.json();

  // Vision APIがエラーを返す場合（レスポンス自体は200でもエラーが含まれることがある）
  const apiError = data.responses?.[0]?.error;
  if (apiError) {
    console.error("Vision files API response error:", apiError);
    throw new Error("このPDFは読み取れませんでした。画像として撮影するか、別のPDFでお試しください。");
  }

  // 全ページのテキストを結合
  const pages = data.responses?.[0]?.responses ?? [];
  const texts: string[] = [];
  for (const page of pages) {
    const apiPageError = page?.error;
    if (apiPageError) {
      console.error("Vision files API page error:", apiPageError);
      continue; // エラーページはスキップして他のページを処理
    }
    const text = page?.fullTextAnnotation?.text;
    if (text) texts.push(text);
  }

  return texts.join("\n");
}
