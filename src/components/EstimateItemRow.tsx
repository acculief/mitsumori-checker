"use client";

import { marketRates } from "@/data/market-rates";
import { EstimateItem } from "@/lib/types";

interface Props {
  item: EstimateItem;
  usedIds: Set<string>;
  onChange: (uid: string, field: "itemId" | "amount", value: string) => void;
  onRemove: (uid: string) => void;
  canRemove: boolean;
}

export default function EstimateItemRow({
  item,
  usedIds,
  onChange,
  onRemove,
  canRemove,
}: Props) {
  return (
    <div className="flex items-start gap-2">
      <select
        value={item.itemId}
        onChange={(e) => onChange(item.uid, "itemId", e.target.value)}
        className="flex-1 min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">項目を選択</option>
        {marketRates.map((rate) => (
          <option
            key={rate.id}
            value={rate.id}
            disabled={usedIds.has(rate.id) && item.itemId !== rate.id}
          >
            {rate.label}
          </option>
        ))}
      </select>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          ¥
        </span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="金額"
          value={item.amount}
          onChange={(e) => onChange(item.uid, "amount", e.target.value)}
          className="w-32 rounded-md border border-slate-300 bg-white pl-7 pr-3 py-2 text-sm text-slate-800 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <button
        onClick={() => onRemove(item.uid)}
        disabled={!canRemove}
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md border border-slate-300 text-slate-400 hover:text-red-500 hover:border-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="削除"
      >
        ✕
      </button>
    </div>
  );
}
