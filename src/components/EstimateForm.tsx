"use client";

import { EstimateItem, VehicleSize } from "@/lib/types";
import { vehicleSizeLabels } from "@/lib/constants";
import EstimateItemRow from "./EstimateItemRow";

interface Props {
  vehicleSize: VehicleSize;
  items: EstimateItem[];
  onUpdateItem: (uid: string, field: "itemId" | "amount", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (uid: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function EstimateForm({
  vehicleSize,
  items,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onSubmit,
  onBack,
}: Props) {
  const usedIds = new Set(items.map((it) => it.itemId).filter(Boolean));
  const hasValidItem = items.some(
    (it) => it.itemId !== "" && it.amount !== "" && Number(it.amount) > 0
  );
  const validCount = items.filter(
    (it) => it.itemId !== "" && it.amount !== "" && Number(it.amount) > 0
  ).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidItem) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up" aria-label="見積もり入力フォーム">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2332]">
            見積もり内容を入力
          </h2>
          <p className="text-[#64748b] mt-1">
            <span className="inline-flex items-center gap-1.5 bg-[#e0f5f5] text-[#0d7377] px-2.5 py-0.5 rounded-full text-sm font-medium">
              {vehicleSizeLabels[vehicleSize]}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0d7377] transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          車両を変更
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <EstimateItemRow
            key={item.uid}
            item={item}
            vehicleSize={vehicleSize}
            usedIds={usedIds}
            onChange={onUpdateItem}
            onRemove={onRemoveItem}
            canRemove={items.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-sm font-medium text-[#64748b] hover:border-[#0d7377] hover:text-[#0d7377] hover:bg-[#f0fafa] transition-all cursor-pointer"
      >
        ＋ 項目を追加する
      </button>

      {/* Fixed bottom CTA on mobile, inline on desktop */}
      <div className="mt-6 hidden sm:block">
        <button
          type="submit"
          disabled={!hasValidItem}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f28c28] to-[#e67e22] text-white font-bold text-base shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {hasValidItem
            ? `${validCount}件の項目を診断する`
            : "項目と金額を入力してください"}
        </button>
      </div>

      {/* Mobile fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 sm:hidden z-50">
        <button
          type="submit"
          disabled={!hasValidItem}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f28c28] to-[#e67e22] text-white font-bold text-base shadow-lg shadow-orange-200 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {hasValidItem
            ? `${validCount}件の項目を診断する`
            : "項目と金額を入力してください"}
        </button>
      </div>
      {/* Spacer for mobile fixed button */}
      <div className="h-20 sm:hidden" />
    </form>
  );
}
