"use client";

import { useState } from "react";
import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";

interface Props {
  summary: SummaryResult;
}

function buildShareText(summary: SummaryResult): string {
  const ratio = summary.totalAmount / summary.totalMedian;
  let verdict: string;
  if (ratio <= 0.9) verdict = "割安";
  else if (ratio <= 1.1) verdict = "適正価格";
  else if (ratio <= 1.3) verdict = "やや高め";
  else verdict = "割高";

  return `車検の見積もり${formatYen(summary.totalAmount)}を診断したら「${verdict}」でした！\n\n見積もりチェッカーで無料診断 👇`;
}

const siteUrl = "https://mitsumori-checker.vercel.app";

export default function ShareButtons({ summary }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = buildShareText(summary);

  const handleXShare = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=550,height=420");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${siteUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: 古いブラウザ対応は省略
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleXShare}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a2332] text-white text-sm font-bold hover:bg-[#0f1724] transition-colors cursor-pointer"
        aria-label="X（Twitter）で共有する"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Xで共有
      </button>
      <button
        type="button"
        onClick={handleCopyUrl}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold text-[#64748b] hover:bg-slate-50 transition-colors cursor-pointer"
        aria-label="診断結果をコピーする"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            コピーしました
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 11V3.5C3 2.67 3.67 2 4.5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            コピーして共有
          </>
        )}
      </button>
    </div>
  );
}
