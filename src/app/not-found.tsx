import Link from "next/link";
import { siteName } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity w-fit"
          >
            <div className="shrink-0" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#c2410c" />
                <path d="M8 20h20v3a2 2 0 01-2 2H10a2 2 0 01-2-2v-3z" fill="rgba(255,255,255,0.25)" />
                <path d="M10.5 20l2.5-5h10l2.5 5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="17" y1="15.5" x2="17" y2="20" stroke="white" strokeWidth="1" opacity="0.5" />
                <circle cx="13" cy="24" r="1.5" fill="white" />
                <circle cx="23" cy="24" r="1.5" fill="white" />
                <circle cx="27" cy="11" r="6" fill="white" />
                <path d="M24 11l2 2 4-4" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 leading-tight">
                {siteName}
              </div>
              <div className="text-xs text-slate-500">
                車検費用を相場データで無料診断
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold text-slate-200 mb-4">404</div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            ページが見つかりません
          </h1>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            お探しのページは移動または削除された可能性があります。
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              車検費用を無料診断する
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="text-xs text-slate-400">
              見積もりが相場と比べて適正か、25項目を無料で診断できます
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 mt-auto">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[11px] text-slate-500">
            &copy; 2026 {siteName}
          </p>
        </div>
      </footer>
    </div>
  );
}
