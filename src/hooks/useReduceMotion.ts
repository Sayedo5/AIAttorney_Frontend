import { useEffect, useState } from "react";

const STORAGE_KEY = "ai_attorney_reduce_upgrade_motion";
const EVENT = "reduce-upgrade-motion-change";

export function useReduceUpgradeMotion() {
  const [reduceMotion, setReduceMotionState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      setReduceMotionState(detail);
    };
    window.addEventListener(EVENT, handler as EventListener);
    return () => window.removeEventListener(EVENT, handler as EventListener);
  }, []);

  const setReduceMotion = (val: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(val));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: val }));
    setReduceMotionState(val);
  };

  return { reduceMotion, setReduceMotion };
}
