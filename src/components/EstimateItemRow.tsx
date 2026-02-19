"use client";

import { marketRates } from "@/data/market-rates";
import { EstimateItem, VehicleSize } from "@/lib/types";
import { formatYen } from "@/lib/formatters";

interface Props {
  item: EstimateItem;
  vehicleSize: VehicleSize;
  usedIds: Set<string>;
  onChange: (uid: string, field: "itemId" | "amount", value: string) => void;
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-3">
          {/* Dropdown */}
          <select
            value={item.itemId}
            onChange={(e) => onChange(item.uid, "itemId", e.target.value)}
            aria-label="見積もり項目を選択"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent transition-shadow"
          >
            <option value="">-- 項目を選択してください --</option>
            <optgroup label="法定費用">
              {marketRates
                .filter((r) => r.category === "legal")
                .map((rate) => (
                  <option
                    key={rate.id}
                    value={rate.id}
                    disabled={usedIds.has(rate.id) && item.itemId !== rate.id}
                  >
                    {rate.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="車検基本料">
              {marketRates
                .filter((r) => r.category === "inspection")
                .map((rate) => (
                  <option
                    key={rate.id}
                    value={rate.id}
                    disabled={usedIds.has(rate.id) && item.itemId !== rate.id}
                  >
                    {rate.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="メンテナンス・部品交換">
              {marketRates
                .filter((r) => r.category === "maintenance")
                .map((rate) => (
                  <option
                    key={rate.id}
                    value={rate.id}
                    disabled={usedIds.has(rate.id) && item.itemId !== rate.id}
                  >
                    {rate.label}
                  </option>
                ))}
            </optgroup>
          </select>

          {/* Amount input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                ¥
              </span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="見積もり金額を入力"
                aria-label="見積もり金額"
                value={item.amount}
                onChange={(e) => onChange(item.uid, "amount", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-7 pr-3 py-2.5 text-sm text-[#1a2332] text-right font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Market rate hint */}
          {range && (
            <div className="flex items-center gap-2 text-xs text-[#64748b] bg-slate-50 rounded-lg px-3 py-2">
              <span className="text-[#0d7377] font-medium">参考相場</span>
              <span>
                {formatYen(range.low)} 〜 {formatYen(range.high)}
              </span>
              <span className="text-slate-300">|</span>
              <span>中央値 {formatYen(range.median)}</span>
            </div>
          )}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.uid)}
          disabled={!canRemove}
          className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="この項目を削除"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
