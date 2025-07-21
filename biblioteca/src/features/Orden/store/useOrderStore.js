import { create } from 'zustand'

export const useOrderStore = create((set) => ({  
  order: {
    userId: '',
    total: '',
    tipoEntrega: 'retiro',
    observaciones: '',
    sedeId: '',
    sedeNombre: '',
  },
  orderDetails: [],  
  setOrder: (newOrder) => set({ order: newOrder }),
  setOrderDetails: (newDetails) => set({ orderDetails: newDetails }),  
  updateField: (name, value) =>
    set((state) => ({
      order: { ...state.order, [name]: value },
    })),
  updateOrderDetailsField: (index, field, value) =>
    set((state) => {
      const updated = [...state.orderDetails]
      updated[index] = { ...updated[index], [field]: value }
      return { orderDetails: updated }
    }),
  resetAll: () =>
    set({
      order: {
        userId: '',
        total: '',
        tipoEntrega: 'retiro',
        observaciones: '',
        sedeId: '',
        sedeNombre: '',
      },
      orderDetails: [],      
    }),
}))
