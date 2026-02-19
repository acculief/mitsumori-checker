"use client";

import { marketRates } from "@/data/market-rates";
import { EstimateItem, VehicleSize } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import ItemCombobox from "./ItemCombobox";

interface Props {
  item: EstimateItem;
  vehicleSize: VehicleSize;
  onChange: (uid: string, field: "itemId" | "amount", value: string) => void;
  onRemove: (uid: string) => void;
  canRemove: boolean;
}

export default function EstimateItemRow({
  item,
  vehicleSize,
  onChange,
  onRemove,
  canRemove,
}: Props) {
  const selectedRate = item.itemId
    ? marketRates.find((r) => r.id === item.itemId)
    : null;
  const range = selectedRate ? selectedRate.rates[vehicleSize] : null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0 space-y-2.5">
          {/* Combobox */}
          <ItemCombobox
            value={item.itemId}
            onChange={(itemId) => onChange(item.uid, "itemId", itemId)}
          />

          {/* Amount input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
              ¥
            </span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="金額を入力"
              aria-label="見積もり金額"
              value={item.amount}
              onChange={(e) => onChange(item.uid, "amount", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white pl-7 pr-3 py-2 text-sm text-slate-900 text-right font-medium focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Market rate hint */}
          {range && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-[#c2410c] font-medium">相場</span>
              <span>
                {formatYen(range.low)} 〜 {formatYen(range.high)}
              </span>
              <span className="text-slate-300">&middot;</span>
              <span>中央値 {formatYen(range.median)}</span>
            </div>
          )}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.uid)}
          disabled={!canRemove}
          className="shrink-0 mt-1.5 w-7 h-7 flex items-center justify-center rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="この項目を削除"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
