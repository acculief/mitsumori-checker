"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { marketRates } from "@/data/market-rates";
import { MarketRateItem } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  legal: "法定費用",
  inspection: "車検基本料",
  maintenance: "メンテナンス・部品交換",
};

const categoryOrder = ["legal", "inspection", "maintenance"] as const;

interface Props {
  value: string; // itemId
  usedIds: Set<string>;
  onChange: (itemId: string) => void;
}

export default function ItemCombobox({ value, usedIds, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedItem = value
    ? marketRates.find((r) => r.id === value) ?? null
    : null;

  // Filter items by query
  const filteredByCategory = useCallback(() => {
    const q = query.trim().toLowerCase();
    const groups: { category: string; items: MarketRateItem[] }[] = [];

    for (const cat of categoryOrder) {
      const items = marketRates.filter((r) => {
        if (r.category !== cat) return false;
        if (!q) return true;
        return r.label.toLowerCase().includes(q);
      });
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    }
    return groups;
  }, [query]);

  const groups = filteredByCategory();

  // Flat list for keyboard navigation
  const flatItems = groups.flatMap((g) => g.items);

  function isDisabled(id: string) {
    return usedIds.has(id) && id !== value;
  }

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-item-index]");
    const target = items[highlightIndex];
    if (target) {
      target.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  function handleSelect(itemId: string) {
    onChange(itemId);
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
  }

  function handleClear() {
    onChange("");
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleInputFocus() {
    setIsOpen(true);
    setHighlightIndex(-1);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setIsOpen(true);
    setHighlightIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) => {
          let next = prev + 1;
          while (next < flatItems.length && isDisabled(flatItems[next].id)) {
            next++;
          }
          return next < flatItems.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && isDisabled(flatItems[next].id)) {
            next--;
          }
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < flatItems.length) {
          const item = flatItems[highlightIndex];
          if (!isDisabled(item.id)) {
            handleSelect(item.id);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setQuery("");
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected state: show label with clear button */}
      {selectedItem && !isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setQuery("");
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 text-left flex items-center justify-between gap-2 hover:border-slate-300 transition-colors cursor-pointer"
        >
          <span className="truncate">{selectedItem.label}</span>
          <button
            type="button"
            aria-label="項目をクリア"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="shrink-0 text-slate-300 hover:text-slate-500 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="項目を検索..."
          aria-label="見積もり項目を検索"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
          aria-autocomplete="list"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-transparent"
        />
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-40 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl"
        >
          {flatItems.length === 0 ? (
            <div className="px-3 py-4 text-sm text-slate-400 text-center">
              該当する項目がありません
            </div>
          ) : (
            groups.map((group) => {
              return (
                <div key={group.category}>
                  <div className="sticky top-0 px-3 py-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 border-b border-slate-100 uppercase tracking-wider">
                    {categoryLabels[group.category]}
                  </div>
                  {group.items.map((item) => {
                    const flatIndex = flatItems.indexOf(item);
                    const disabled = isDisabled(item.id);
                    const isHighlighted = flatIndex === highlightIndex;
                    const isSelected = item.id === value;

                    return (
                      <div
                        key={item.id}
                        data-item-index={flatIndex}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={disabled}
                        onClick={() => {
                          if (!disabled) handleSelect(item.id);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between ${
                          disabled
                            ? "text-slate-300 cursor-not-allowed"
                            : isHighlighted
                              ? "bg-[#fff2e6] text-slate-900"
                              : "text-slate-700 hover:bg-slate-50"
                        } ${isSelected ? "font-medium text-[#c2410c]" : ""}`}
                      >
                        <span className="truncate">{item.label}</span>
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-[#c2410c]">
                            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
