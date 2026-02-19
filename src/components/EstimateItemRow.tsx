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
    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0 space-y-2.5">
          {/* Dropdown */}
          <select
            value={item.itemId}
            onChange={(e) => onChange(item.uid, "itemId", e.target.value)}
            aria-label="見積もり項目を選択"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M4%206L8%2010L12%206%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center] pr-8 focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent"
          >
            <option value="">-- 項目を選択 --</option>
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
              className="w-full rounded-md border border-slate-200 bg-white pl-7 pr-3 py-2 text-sm text-slate-900 text-right font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Market rate hint */}
          {range && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-[#0d7377] font-medium">相場</span>
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
