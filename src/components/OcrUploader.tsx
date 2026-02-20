"use client";

import { useState, useRef, useCallback } from "react";
import type { OcrExtractedItem, OcrApiResponse } from "@/lib/ocr-types";
import { trackEvent } from "@/lib/analytics";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

interface Props {
  onResult: (items: OcrExtractedItem[]) => void;
}

export default function OcrUploader({ onResult }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        setStatus("error");
        setMessage("ファイルサイズが4MBを超えています。");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setStatus("error");
        setMessage("画像ファイルを選択してください。");
        return;
      }

      setStatus("loading");
      setMessage("");
      trackEvent("ocr_upload_start");

      try {
        const base64 = await fileToBase64(file);

        const res = await fetch("/api/ocr/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

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
        setMessage("通信エラーが発生しました。もう一度お試しください。");
        trackEvent("ocr_upload_error", { error: "network" });
      }
    },
    [onResult]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      // 同じファイルの再選択を可能にする
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

  return (
    <div className="mb-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
        aria-label="見積書の写真を選択"
      />

      {status === "idle" && (
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-3 rounded-xl border-2 border-dashed border-primary/40 bg-orange-50/50 hover:border-primary hover:bg-orange-50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="group-hover:scale-110 transition-transform">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-sm font-bold">写真から読み取る</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">見積書の写真をアップロードして自動入力</p>
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
          <p className="text-[11px] text-slate-400 mt-1">画像を解析しています</p>
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
            別の写真
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
