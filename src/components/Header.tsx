export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#0d7377] to-[#14919b] shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl backdrop-blur-sm">
            🔍
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              見積もりチェッカー
            </h1>
            <p className="text-sm text-white/75">
              車検・自動車修理の見積もりを相場とかんたん比較
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
