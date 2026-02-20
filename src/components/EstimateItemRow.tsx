"use client";

import { marketRates, quantityConfig } from "@/data/market-rates";
import { EstimateItem, VehicleSize } from "@/lib/types";
import { formatYen } from "@/lib/formatters";
import ItemCombobox from "./ItemCombobox";

interface Props {
  item: EstimateItem;
  vehicleSize: VehicleSize;
  usedIds: Set<string>;
  onChange: (uid: string, field: "itemId" | "amount" | "quantity", value: string) => void;
  onRemove: (uid: string) => void;
  canRemove: boolean;
}

export default function EstimateItemRow({
  item,
  vehicleSize,
  usedIds,
  onChange,
  onRemove,
  canRemove,
}: Props) {
  const selectedRate = item.itemId
    ? marketRates.find((r) => r.id === item.itemId)
    : null;
  const range = selectedRate ? selectedRate.rates[vehicleSize] : null;
  const qtyConfig = item.itemId ? quantityConfig[item.itemId] : null;
  const qty = item.quantity || 1;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0 space-y-2.5">
          {/* Combobox */}
          <ItemCombobox
            value={item.itemId}
            usedIds={usedIds}
            onChange={(itemId) => onChange(item.uid, "itemId", itemId)}
          />

          {/* Quantity selector (only for per-unit items) */}
          {qtyConfig && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">数量</span>
              <div className="inline-flex items-center rounded-md border border-slate-200">
                {Array.from({ length: qtyConfig.max }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        onChange(item.uid, "quantity", String(n))
                      }
                      className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
                        qty === n
                          ? "bg-[#c2410c] text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      } ${n > 1 ? "border-l border-slate-200" : ""}`}
                      aria-label={`${n}${qtyConfig.unit}`}
                      aria-pressed={qty === n}
                    >
                      {n}{qtyConfig.unit}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Amount input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
              ¥
            </span>
            <input
              type="number"
              inputMode="numeric"
              placeholder={qtyConfig && qty > 1 ? `${qty}${qtyConfig.unit}分の合計金額` : "金額を入力"}
              aria-label="見積もり金額"
              aria-describedby={range ? `hint-${item.uid}` : undefined}
              value={item.amount}
              onChange={(e) => onChange(item.uid, "amount", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white pl-7 pr-3 py-2 text-sm text-slate-900 text-right font-medium focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Market rate hint */}
          {range && (
            <div id={`hint-${item.uid}`} className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
              <span className="text-[#c2410c] font-medium">相場</span>
              <span>
                {formatYen(range.low * qty)} 〜 {formatYen(range.high * qty)}
              </span>
              <span className="text-slate-300">&middot;</span>
              <span>中央値 {formatYen(range.median * qty)}</span>
              {qtyConfig && qty > 1 && (
                <span className="text-slate-400">
                  （{qty}{qtyConfig.unit}分）
                </span>
              )}
            </div>
          )}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.uid)}
          disabled={!canRemove}
          className="shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
          aria-label={canRemove ? "この項目を削除" : "最後の項目は削除できません"}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
