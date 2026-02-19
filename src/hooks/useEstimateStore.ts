"use client";

import { useState, useCallback } from "react";
import { VehicleSize, EstimateItem } from "@/lib/types";

let uidCounter = 0;
function genUid() {
  return `item-${++uidCounter}`;
}

function emptyItem(): EstimateItem {
  return { uid: genUid(), itemId: "", amount: "" };
}

export function useEstimateStore() {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize | null>(null);
  const [items, setItems] = useState<EstimateItem[]>([emptyItem()]);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const selectVehicle = useCallback((size: VehicleSize) => {
    setVehicleSize(size);
    setStep(2);
  }, []);

  const updateItem = useCallback(
    (uid: string, field: "itemId" | "amount", value: string) => {
      setItems((prev) =>
        prev.map((it) => {
          if (it.uid !== uid) return it;
          if (field === "amount") {
            return { ...it, amount: value === "" ? "" : Number(value) };
          }
          return { ...it, [field]: value };
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

  const goToResults = useCallback(() => setStep(3), []);

  const reset = useCallback(() => {
    setVehicleSize(null);
    setItems([emptyItem()]);
    setStep(1);
  }, []);

  const backToForm = useCallback(() => setStep(2), []);

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
    reset,
  };
}
