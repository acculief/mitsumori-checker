export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#c2410c] flex items-center justify-center" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            車検費用チェッカー
          </h1>
          <p className="text-xs text-slate-500">
            車検費用を相場データで無料診断
          </p>
        </div>
      </div>
    </header>
  );
}
