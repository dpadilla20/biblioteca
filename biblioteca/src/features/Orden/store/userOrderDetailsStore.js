import { create } from 'zustand'

export const useOrderDetailsStore = create((set) => ({
  orderDetails: [],
  setOrderDetails: (details) => set({ orderDetails: details }),
  updateField: (index, field, value) =>
    set((state) => {
      const updated = [...state.orderDetails]
      updated[index] = { ...updated[index], [field]: value }
      return { orderDetails: updated }
    }),
  clearOrderDetails: () => set({ orderDetails: [] }), // 👈 IMPORTANTE
}))
