"use client";

import { useState, useRef, useCallback } from "react";
import type { OcrExtractedItem, OcrApiResponse } from "@/lib/ocr-types";
import { trackEvent } from "@/lib/analytics";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB（元ファイル上限）
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp", "application/pdf"];

interface Props {
  onResult: (items: OcrExtractedItem[]) => void;
}

export default function OcrUploader({ onResult }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        setStatus("error");
        setMessage("ファイルサイズが10MBを超えています。");
        return;
      }

      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const isImage = file.type.startsWith("image/");

      if (!isPdf && !isImage) {
        setStatus("error");
        setMessage("画像またはPDFファイルを選択してください。");
        return;
      }

      setStatus("loading");
      setMessage("");
      trackEvent("ocr_upload_start", { file_type: isPdf ? "pdf" : "image" });

      try {
        let base64: string;
        if (isPdf) {
          // PDFはそのまま送る
          base64 = await fileToBase64(file);
        } else {
          // 画像はリサイズしてペイロードを抑える
          base64 = await compressImage(file);
        }

        const res = await fetch("/api/ocr/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) {
          let errorMsg = "サーバーエラーが発生しました。もう一度お試しください。";
          try {
            const errData: OcrApiResponse = await res.json();
            if (!errData.success) errorMsg = errData.error;
          } catch { /* JSONパース失敗時はデフォルトメッセージ */ }
          setStatus("error");
          setMessage(errorMsg);
          trackEvent("ocr_upload_error", { error: `http_${res.status}` });
          return;
        }

        const data: OcrApiResponse = await res.json();

        if (!data.success) {
          setStatus("error");
          setMessage(data.error);
          trackEvent("ocr_upload_error", { error: data.error });
          return;
        }

        if (data.data.items.length === 0) {
          setStatus("error");
          setMessage("見積もり項目を検出できませんでした。鮮明な写真で再度お試しください。");
          trackEvent("ocr_upload_no_items");
          return;
        }

        setStatus("done");
        setResultCount(data.data.items.length);
        setMessage(`${data.data.items.length}件の項目を検出しました`);
        onResult(data.data.items);
        trackEvent("ocr_upload_success", { item_count: data.data.items.length });
      } catch {
        setStatus("error");
        setMessage("通信エラーが発生しました。ファイルサイズを小さくして再度お試しください。");
        trackEvent("ocr_upload_error", { error: "network" });
      }
    },
    [onResult]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setMessage("");
    setResultCount(0);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className="mb-4"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,application/pdf"
        capture="environment"
        onChange={handleChange}
        className="hidden"
        aria-label="見積書の写真またはPDFを選択"
      />

      {status === "idle" && (
        <button
          type="button"
          onClick={handleClick}
          className={`w-full py-3 rounded-xl border-2 border-dashed transition-all cursor-pointer group ${
            dragging
              ? "border-primary bg-orange-50 scale-[1.02]"
              : "border-primary/40 bg-orange-50/50 hover:border-primary hover:bg-orange-50"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="group-hover:scale-110 transition-transform">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-sm font-bold">
              {dragging ? "ここにドロップ" : "写真・PDFから読み取る"}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {dragging ? "ファイルをドロップしてください" : "見積書の写真やPDFをアップロード / ドラッグ&ドロップ"}
          </p>
        </button>
      )}

      {status === "loading" && (
        <div className="w-full py-4 rounded-xl border border-slate-200 bg-slate-50 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm font-medium">読み取り中...</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">ファイルを解析しています</p>
        </div>
      )}

      {status === "done" && (
        <div className="w-full py-3 px-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-sm font-medium">{resultCount}件の項目を自動入力しました</span>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="text-xs text-emerald-600 underline underline-offset-2 hover:text-emerald-800 cursor-pointer"
          >
            別のファイル
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xs">{message}</span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="text-xs text-rose-600 underline underline-offset-2 hover:text-rose-800 cursor-pointer shrink-0 ml-2"
            >
              再試行
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** 画像をcanvasでリサイズし、JPEG base64に変換（ペイロードサイズ削減） */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const MAX_DIM = 2048;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
