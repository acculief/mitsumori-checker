"use client";

interface Props {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoClick?.();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <a
          href="/"
          onClick={handleClick}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity w-fit"
        >
          <div className="shrink-0" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#c2410c"/>
              <path d="M8 20h20v3a2 2 0 01-2 2H10a2 2 0 01-2-2v-3z" fill="rgba(255,255,255,0.25)"/>
              <path d="M10.5 20l2.5-5h10l2.5 5" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <line x1="17" y1="15.5" x2="17" y2="20" stroke="white" strokeWidth="1" opacity="0.5"/>
              <circle cx="13" cy="24" r="1.5" fill="white"/>
              <circle cx="23" cy="24" r="1.5" fill="white"/>
              <circle cx="27" cy="11" r="6" fill="white"/>
              <path d="M24 11l2 2 4-4" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        </a>
      </div>
    </header>
  );
}
