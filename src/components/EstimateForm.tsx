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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Step 2: 見積もり項目を入力
          </h2>
          <p className="text-sm text-slate-500">
            車両: {vehicleSizeLabels[vehicleSize]}
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          車両を変更
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <EstimateItemRow
            key={item.uid}
            item={item}
            usedIds={usedIds}
            onChange={onUpdateItem}
            onRemove={onRemoveItem}
            canRemove={items.length > 1}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onAddItem}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          ＋ 項目を追加
        </button>

        <button
          onClick={onSubmit}
          disabled={!hasValidItem}
          className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          診断する
        </button>
      </div>
    </div>
  );
}
