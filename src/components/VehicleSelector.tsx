"use client";

import { VehicleSize } from "@/lib/types";
import {
  vehicleSizeLabels,
  vehicleSizeDescriptions,
  vehicleSizeIcons,
} from "@/lib/constants";

const sizes: VehicleSize[] = ["kei", "small", "medium", "large"];

interface Props {
  selected: VehicleSize | null;
  onSelect: (size: VehicleSize) => void;
}

export default function VehicleSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-1">
        Step 1: 車両サイズを選択
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        車検証の排気量をもとに選んでください
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`rounded-lg border-2 p-4 text-center transition-all cursor-pointer ${
              selected === size
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-3xl mb-1">{vehicleSizeIcons[size]}</div>
            <div className="font-bold text-slate-800">
              {vehicleSizeLabels[size]}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {vehicleSizeDescriptions[size]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
