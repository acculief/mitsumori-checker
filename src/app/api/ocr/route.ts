import { NextRequest, NextResponse } from "next/server";
import { parseOcrText } from "@/lib/ocr-parser";
import type { OcrApiResponse } from "@/lib/ocr-types";

const MAX_BASE64_SIZE = 4 * 1024 * 1024; // 4MB

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
      { success: false, error: "画像データがありません。" },
      { status: 400 }
    );
  }

  // base64部分を取り出す（data:image/...;base64, プレフィックスを除去）
  const base64Data = image.includes(",") ? image.split(",")[1] : image;

  if (base64Data.length > MAX_BASE64_SIZE) {
    return NextResponse.json(
      { success: false, error: "画像サイズが大きすぎます（4MB以下にしてください）。" },
      { status: 400 }
    );
  }

  try {
    const visionRes = await fetch(
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

    if (!visionRes.ok) {
      const errText = await visionRes.text();
      console.error("Vision API error:", visionRes.status, errText);
      return NextResponse.json(
        { success: false, error: "画像の読み取りに失敗しました。もう一度お試しください。" },
        { status: 502 }
      );
    }

    const visionData = await visionRes.json();
    const annotations = visionData.responses?.[0]?.fullTextAnnotation;

    if (!annotations?.text) {
      return NextResponse.json(
        { success: false, error: "画像からテキストを読み取れませんでした。鮮明な写真で再度お試しください。" },
        { status: 200 }
      );
    }

    const ocrText: string = annotations.text;
    const items = parseOcrText(ocrText);

    return NextResponse.json({
      success: true,
      data: {
        items,
        vehicleSize: null,
      },
    });
  } catch (error) {
    console.error("OCR processing error:", error);
    return NextResponse.json(
      { success: false, error: "処理中にエラーが発生しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}
