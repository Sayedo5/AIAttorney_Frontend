// Plan API Service
import { apiService } from './api';
import type { Plan, ApiResponse } from '@/types';

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface UsageStats {
  chatMessages: { used: number; limit: number };
  documents: { used: number; limit: number };
  cases: { used: number; limit: number };
  storage: { used: number; limit: number };
}

class PlanApiService {
  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return apiService.get<Plan[]>('/plans');
  }

  async getCurrentSubscription(): Promise<ApiResponse<Subscription>> {
    return apiService.get<Subscription>('/subscription');
  }

  async getUsageStats(): Promise<ApiResponse<UsageStats>> {
    return apiService.get<UsageStats>('/subscription/usage');
  }

  async subscribeToPlan(planId: string, paymentMethod: string): Promise<ApiResponse<Subscription>> {
    return apiService.post<Subscription>('/subscription', { planId, paymentMethod });
  }

  async cancelSubscription(): Promise<ApiResponse<Subscription>> {
    return apiService.post<Subscription>('/subscription/cancel');
  }

  async resumeSubscription(): Promise<ApiResponse<Subscription>> {
    return apiService.post<Subscription>('/subscription/resume');
  }

  async getPaymentMethods(): Promise<ApiResponse<{ type: string; last4?: string }[]>> {
    return apiService.get('/payment/methods');
  }

  async addPaymentMethod(paymentDetails: unknown): Promise<ApiResponse<void>> {
    return apiService.post('/payment/methods', paymentDetails);
  }
}

export const planApi = new PlanApiService();
export default planApi;
