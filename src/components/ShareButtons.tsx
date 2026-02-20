"use client";

import { useState } from "react";
import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import { getOverallVerdict, overallVerdictLabels } from "@/lib/verdict-utils";

interface Props {
  summary: SummaryResult;
}

function buildShareText(summary: SummaryResult): string {
  const verdict = getOverallVerdict(summary.totalAmount, summary.totalMedian);
  return `車検の見積もり${formatYen(summary.totalAmount)}を診断したら「${overallVerdictLabels[verdict]}」でした`;
}

const siteUrl = "https://mitsumori-checker.vercel.app";

export default function ShareButtons({ summary }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = buildShareText(summary);

  const handleXShare = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=550,height=420");
  };

  const handleLineShare = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=550,height=520");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${siteUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleXShare}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg bg-black text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
        aria-label="X（Twitter）で共有する"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>
      <button
        type="button"
        onClick={handleLineShare}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#06C755] text-white text-xs font-bold hover:bg-[#05b34c] transition-colors cursor-pointer"
        aria-label="LINEで共有する"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
        LINE
      </button>
      <button
        type="button"
        onClick={handleCopyUrl}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        aria-label="診断結果をコピーする"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            コピー済
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 11V3.5C3 2.67 3.67 2 4.5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            コピー
          </>
        )}
      </button>
    </div>
  );
}
