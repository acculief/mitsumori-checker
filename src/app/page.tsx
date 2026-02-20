"use client";

import Header from "@/components/Header";
import VehicleSelector from "@/components/VehicleSelector";
import EstimateForm from "@/components/EstimateForm";
import VerdictHeader from "@/components/VerdictHeader";
import SavingsSummary from "@/components/SavingsSummary";
import ResultsTable from "@/components/ResultsTable";
import AffiliateCTA from "@/components/AffiliateCTA";
import ShareButtons from "@/components/ShareButtons";
import { useEstimateStore } from "@/hooks/useEstimateStore";
import { compareEstimate } from "@/lib/compare";
import { stepLabels } from "@/lib/constants";

export default function Home() {
  const store = useEstimateStore();

  const summary =
    store.step === 3 && store.vehicleSize
      ? compareEstimate(store.vehicleSize, store.items)
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header onLogoClick={store.reset} />

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-6">
        {/* Step indicator */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          ステップ{store.step}: {stepLabels[store.step - 1]}
        </div>
        <nav className="mb-6" aria-label="診断ステップ">
          <div className="flex items-center justify-between max-w-[240px] mx-auto">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isActive = store.step >= stepNum;
              const isComplete = store.step > stepNum;
              const isCurrent = store.step === stepNum;
              return (
                <div key={label} className="flex items-center gap-0 flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      aria-current={isCurrent ? "step" : undefined}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isComplete
                          ? "bg-[#c2410c] text-white"
                          : isActive
                            ? "bg-[#c2410c] text-white ring-2 ring-[#c2410c]/20"
                            : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isComplete ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="sr-only">完了</span>
                        </>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-medium ${
                        isActive ? "text-[#c2410c]" : "text-slate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-1.5 mt-[-16px] ${
                        isComplete ? "bg-[#c2410c]" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Step 1: Vehicle selection */}
        {store.step === 1 && (
          <div>
            <VehicleSelector
              selected={store.vehicleSize}
              onSelect={store.selectVehicle}
            />
            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-slate-900">25</div>
                <div className="text-[11px] text-slate-500">診断対応項目</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">4</div>
                <div className="text-[11px] text-slate-500">車両サイズ</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">無料</div>
                <div className="text-[11px] text-slate-500">登録不要</div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
              全国の車検・整備工場の一般的な価格帯をもとにした相場データで診断します
            </p>
          </div>
        )}

        {/* Step 2: Estimate form */}
        {store.step === 2 && store.vehicleSize && (
          <EstimateForm
            vehicleSize={store.vehicleSize}
            items={store.items}
            onUpdateItem={store.updateItem}
            onAddItem={store.addItem}
            onRemoveItem={store.removeItem}
            onSubmit={store.goToResults}
            onBack={store.backToVehicle}
          />
        )}

        {/* Step 3: Results */}
        {store.step === 3 && summary && (
          <div className="space-y-4">
            <h2 className="sr-only">診断結果</h2>
            <VerdictHeader summary={summary} />
            <SavingsSummary summary={summary} />

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#c2410c] rounded-full" aria-hidden="true" />
                項目別の詳細比較
              </h3>
              <ResultsTable items={summary.items} />
            </div>

            <AffiliateCTA
              hasExpensiveItems={summary.items.some((i) =>
                ["slightly_high", "high", "very_high"].includes(i.verdict)
              )}
              potentialSaving={summary.potentialSaving}
              expensiveCount={
                summary.items.filter((i) =>
                  ["slightly_high", "high", "very_high"].includes(i.verdict)
                ).length
              }
            />

            <div className="space-y-2 pt-2">
              <ShareButtons summary={summary} />
              <div className="flex gap-2">
                <button
                  onClick={store.backToForm}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  見積もりを修正
                </button>
                <button
                  onClick={store.reset}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  最初からやり直す
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 mt-auto">
        <div className="max-w-xl mx-auto px-4 text-center space-y-1.5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ※ 相場データは全国の車検・整備工場の一般的な価格帯をもとに作成しています。
            地域・車種・年式により実際の費用は異なります。
          </p>
          <p className="text-[11px] text-slate-400">
            25項目 &middot; 4車両サイズ &middot; 価格レンジ3段階のデータベースで判定
          </p>
          <p className="text-[11px] text-slate-500 pt-1">
            &copy; 2026 車検費用チェッカー
          </p>
        </div>
      </footer>
    </div>
  );
}
