"use client";

import { useState, useCallback } from "react";
import { VehicleSize, EstimateItem } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

function genUid() {
  return crypto.randomUUID();
}

function emptyItem(): EstimateItem {
  return { uid: genUid(), itemId: "", amount: "", quantity: 1 };
}

export function useEstimateStore() {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize | null>(null);
  const [items, setItems] = useState<EstimateItem[]>([emptyItem()]);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectVehicle = useCallback((size: VehicleSize) => {
    setVehicleSize(size);
    setStep(2);
    scrollToTop();
    trackEvent("vehicle_select", { vehicle_size: size });
  }, [scrollToTop]);

  const updateItem = useCallback(
    (uid: string, field: "itemId" | "amount" | "quantity", value: string) => {
      setItems((prev) =>
        prev.map((it) => {
          if (it.uid !== uid) return it;
          if (field === "amount") {
            return { ...it, amount: value === "" ? "" : Number(value) };
          }
          if (field === "quantity") {
            const newQty = Math.max(1, Number(value));
            if (newQty === it.quantity) return it;
            return { ...it, quantity: newQty, amount: "" };
          }
          // itemId変更時は数量を1にリセット
          return { ...it, itemId: value, quantity: 1 };
        })
      );
    },
    []
  );

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, emptyItem()]);
  }, []);

  const removeItem = useCallback((uid: string) => {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  }, []);

  const goToResults = useCallback(() => {
    setStep(3);
    scrollToTop();
    const validItems = items.filter(
      (it) => it.itemId !== "" && it.amount !== "" && Number(it.amount) > 0
    );
    trackEvent("diagnosis_complete", { item_count: validItems.length });
  }, [scrollToTop, items]);

  const reset = useCallback(() => {
    setVehicleSize(null);
    setItems([emptyItem()]);
    setStep(1);
    scrollToTop();
  }, [scrollToTop]);

  const backToForm = useCallback(() => {
    setStep(2);
    scrollToTop();
  }, [scrollToTop]);

  const backToVehicle = useCallback(() => {
    setVehicleSize(null);
    setStep(1);
    scrollToTop();
  }, [scrollToTop]);

  return {
    vehicleSize,
    items,
    step,
    selectVehicle,
    updateItem,
    addItem,
    removeItem,
    goToResults,
    backToForm,
    backToVehicle,
    reset,
  };
}
