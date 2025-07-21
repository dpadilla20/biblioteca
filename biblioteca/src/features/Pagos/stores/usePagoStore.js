import { create } from 'zustand'

export const usePagoStore = create((set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
  clearPayments: () => set({ payments: [] }),
}))