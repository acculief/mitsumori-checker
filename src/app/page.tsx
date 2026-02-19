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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* Step indicator */}
        <nav className="mb-8" aria-label="診断ステップ">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isActive = store.step >= stepNum;
              const isComplete = store.step > stepNum;
              return (
                <div key={label} className="flex items-center gap-0 flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      aria-current={isActive && !isComplete ? "step" : undefined}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isComplete
                          ? "bg-[#0d7377] text-white shadow-md shadow-[#0d7377]/30"
                          : isActive
                            ? "bg-[#0d7377] text-white shadow-md shadow-[#0d7377]/30 ring-4 ring-[#0d7377]/10"
                            : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isComplete ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isActive ? "text-[#0d7377]" : "text-slate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mt-[-18px] rounded-full transition-all duration-500 ${
                        isComplete ? "bg-[#0d7377]" : "bg-slate-200"
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
          <VehicleSelector
            selected={store.vehicleSize}
            onSelect={store.selectVehicle}
          />
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
            onBack={store.reset}
          />
        )}

        {/* Step 3: Results */}
        {store.step === 3 && summary && (
          <div className="space-y-6">
            <VerdictHeader summary={summary} />
            <SavingsSummary summary={summary} />

            <AffiliateCTA
              hasExpensiveItems={summary.items.some((i) =>
                ["slightly_high", "high", "very_high"].includes(i.verdict)
              )}
            />

            <div>
              <h3 className="font-bold text-[#1a2332] text-lg mb-3">
                項目別の詳細比較
              </h3>
              <ResultsTable items={summary.items} />
            </div>

            <div className="space-y-3">
              <ShareButtons summary={summary} />
              <div className="flex gap-3">
                <button
                  onClick={store.backToForm}
                  className="flex-1 py-3 rounded-xl border-2 border-[#0d7377] text-sm font-bold text-[#0d7377] hover:bg-[#e0f5f5] transition-all cursor-pointer"
                >
                  見積もりを修正
                </button>
                <button
                  onClick={store.reset}
                  className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-bold text-[#64748b] hover:bg-slate-50 transition-all cursor-pointer"
                >
                  最初からやり直す
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-[#94a3b8]">
            ※ 相場データは全国の車検・整備工場の一般的な価格帯をもとに作成しています。
            地域・車種・年式により実際の費用は異なります。
          </p>
          <p className="text-xs text-[#94a3b8]">
            主要15項目 ・ 4車両サイズ ・ 価格レンジ3段階のデータベースで判定
          </p>
          <p className="text-xs text-[#94a3b8]">
            &copy; 2025 見積もりチェッカー
          </p>
        </div>
      </footer>
    </div>
  );
}
