import { create } from 'zustand'

export const usePaymentsStore = create((set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
  clearPayments: () => set({ payments: [] }),
}))