"use client";

import { useMemo } from "react";
import { EstimateItem, VehicleSize } from "@/lib/types";
import { vehicleSizeLabels } from "@/lib/constants";
import { marketRates } from "@/data/market-rates";
import EstimateItemRow from "./EstimateItemRow";

const MAX_ITEMS = marketRates.length;

interface Props {
  vehicleSize: VehicleSize;
  items: EstimateItem[];
  onUpdateItem: (uid: string, field: "itemId" | "amount" | "quantity", value: string) => void;
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
  const usedIds = useMemo(
    () => new Set(items.map((it) => it.itemId).filter(Boolean)),
    [items]
  );
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
          <h2 className="text-xl font-bold text-slate-900">
            見積もり内容を入力
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-medium">
              {vehicleSizeLabels[vehicleSize]}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors cursor-pointer py-2 px-1"
          aria-label="車両サイズを変更する"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          変更
        </button>
      </div>

      <p className="text-xs text-slate-500 mb-3 leading-relaxed">
        見積書の項目名で検索して選択し、金額を入力してください。「+ 項目を追加」で行を増やせます。
      </p>

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

      {items.length < MAX_ITEMS && (
        <button
          type="button"
          onClick={onAddItem}
          className="mt-3 w-full py-2.5 rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 hover:border-primary hover:text-primary hover:bg-primary-light transition-all cursor-pointer"
        >
          + 項目を追加
        </button>
      )}

      {/* Desktop CTA */}
      <div className="mt-6 hidden sm:block">
        <button
          type="submit"
          disabled={!hasValidItem}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-sm hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {hasValidItem
            ? `${validCount}件の見積もりを診断する`
            : "項目と金額を入力してください"}
        </button>
      </div>

      {/* Mobile fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-white/95 backdrop-blur-sm border-t border-slate-200 sm:hidden z-[60]">
        <button
          type="submit"
          disabled={!hasValidItem}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {hasValidItem
            ? `${validCount}件の見積もりを診断する`
            : "項目と金額を入力してください"}
        </button>
      </div>
      <div className="h-32 sm:hidden" />
    </form>
  );
}
