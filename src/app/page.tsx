"use client";

import Header from "@/components/Header";
import VehicleSelector from "@/components/VehicleSelector";
import EstimateForm from "@/components/EstimateForm";
import ResultsTable from "@/components/ResultsTable";
import SavingsSummary from "@/components/SavingsSummary";
import { useEstimateStore } from "@/hooks/useEstimateStore";
import { compareEstimate } from "@/lib/compare";

export default function Home() {
  const store = useEstimateStore();

  const summary =
    store.step === 3 && store.vehicleSize
      ? compareEstimate(store.vehicleSize, store.items)
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  store.step >= s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-8 h-0.5 ${
                    store.step > s ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

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
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Step 3: 診断結果
            </h2>

            <SavingsSummary summary={summary} />

            <div className="mt-6 bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-800 mb-3">項目別の比較</h3>
              <ResultsTable items={summary.items} />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={store.backToForm}
                className="px-5 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                見積もりを修正
              </button>
              <button
                onClick={store.reset}
                className="px-5 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                最初からやり直す
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-slate-400">
          ※ 相場データは一般的な目安です。地域や車種により異なります。
        </p>
      </footer>
    </div>
  );
}
