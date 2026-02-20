"use client";

import { VehicleSize } from "@/lib/types";
import {
  vehicleSizeLabels,
  vehicleSizeDescriptions,
  vehicleSizeExamples,
} from "@/lib/constants";

const sizes: VehicleSize[] = ["kei", "small", "medium", "large"];

/* SVG car silhouettes — distinct shape per size */
function CarIcon({ size }: { size: VehicleSize }) {
  const cls = "text-slate-400 group-hover:text-primary transition-colors";
  switch (size) {
    case "kei":
      return (
        <svg width="48" height="28" viewBox="0 0 48 28" fill="none" className={cls}>
          <rect x="6" y="8" width="36" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="3" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="34" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "small":
      return (
        <svg width="52" height="28" viewBox="0 0 52 28" fill="none" className={cls}>
          <rect x="4" y="10" width="44" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 10L18 3H32L40 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="14" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="38" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "medium":
      return (
        <svg width="56" height="28" viewBox="0 0 56 28" fill="none" className={cls}>
          <rect x="3" y="10" width="50" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 10L17 2H36L46 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="14" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="42" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="3" x2="25" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "large":
      return (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className={cls}>
          <rect x="2" y="10" width="56" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 10L14 2H42L52 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="14" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="46" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="26" y1="3" x2="26" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

interface Props {
  selected: VehicleSize | null;
  onSelect: (size: VehicleSize) => void;
}

export default function VehicleSelector({ selected, onSelect }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          車両サイズを選択
        </h2>
        <p className="text-sm text-slate-500">
          車検証の排気量、または車種名を参考にお選びください
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sizes.map((size) => {
          const isSelected = selected === size;
          return (
            <button
              type="button"
              key={size}
              onClick={() => onSelect(size)}
              aria-pressed={isSelected}
              className={`group relative rounded-xl border p-4 text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary-light ring-1 ring-primary/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className="mb-3" aria-hidden="true">
                <CarIcon size={size} />
              </div>
              <div className="font-bold text-sm text-slate-900">
                {vehicleSizeLabels[size]}
              </div>
              <div className="text-xs font-medium text-primary">
                {vehicleSizeDescriptions[size]}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100 leading-relaxed">
                {vehicleSizeExamples[size]}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed">
        迷ったら車種名（例: N-BOX → 軽自動車、プリウス → 中型車）を参考に。
        <br />
        多少違っても診断結果に大きな差は出ません。
      </p>
    </div>
  );
}
