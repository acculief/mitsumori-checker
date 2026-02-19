"use client";

import { VehicleSize } from "@/lib/types";
import {
  vehicleSizeLabels,
  vehicleSizeDescriptions,
  vehicleSizeExamples,
} from "@/lib/constants";

const sizes: VehicleSize[] = ["kei", "small", "medium", "large"];

const sizeIllustrations: Record<VehicleSize, { icon: string; scale: string }> = {
  kei:    { icon: "🚗", scale: "text-4xl" },
  small:  { icon: "🚙", scale: "text-4xl" },
  medium: { icon: "🚐", scale: "text-5xl" },
  large:  { icon: "🚛", scale: "text-5xl" },
};

interface Props {
  selected: VehicleSize | null;
  onSelect: (size: VehicleSize) => void;
}

export default function VehicleSelector({ selected, onSelect }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1a2332] mb-2">
          あなたの車を選んでください
        </h2>
        <p className="text-[#64748b]">
          車検証に記載の排気量をもとにお選びください
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size, i) => {
          const ill = sizeIllustrations[size];
          const isSelected = selected === size;
          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              aria-pressed={isSelected}
              className={`group relative rounded-2xl border-2 p-5 text-center transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg ${
                isSelected
                  ? "border-[#0d7377] bg-[#e0f5f5] shadow-md ring-2 ring-[#0d7377]/20"
                  : "border-slate-200 bg-white hover:border-[#0d7377]/40 hover:bg-[#f0fafa]"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0d7377] text-white flex items-center justify-center text-xs animate-scale-in">
                  ✓
                </div>
              )}
              <div className={`${ill.scale} mb-2 transition-transform duration-200 group-hover:scale-110`} aria-hidden="true">
                {ill.icon}
              </div>
              <div className="font-bold text-lg text-[#1a2332]">
                {vehicleSizeLabels[size]}
              </div>
              <div className="text-sm font-medium text-[#0d7377] mt-0.5">
                {vehicleSizeDescriptions[size]}
              </div>
              <div className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                {vehicleSizeExamples[size]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
