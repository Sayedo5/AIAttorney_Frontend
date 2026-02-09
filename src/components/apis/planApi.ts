// Plan/Subscription API Functions
import { post, get } from "./api";

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
  features: string[];
  limits: {
    chatsPerDay: number;
    documentsPerMonth: number;
    draftsPerMonth: number;
  };
}

export interface Subscription {
  id: string;
  planId: string;
  status: "active" | "cancelled" | "expired";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface UsageStats {
  chatsToday: number;
  documentsThisMonth: number;
  draftsThisMonth: number;
  limits: Plan["limits"];
}

export const getPlans = async (): Promise<Plan[]> => {
  return get("/plans");
};

export const getCurrentSubscription = async (
  token: string
): Promise<Subscription | null> => {
  return get("/subscription/current", token);
};

export const subscribeToPlan = async (
  planId: string,
  paymentMethod: string,
  token: string
): Promise<Subscription> => {
  return post("/subscription/subscribe", { planId, paymentMethod }, token);
};

export const cancelSubscription = async (token: string): Promise<void> => {
  return post("/subscription/cancel", {}, token);
};

export const getUsageStats = async (token: string): Promise<UsageStats> => {
  return get("/subscription/usage", token);
};
