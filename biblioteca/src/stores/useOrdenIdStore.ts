import { create } from 'zustand'

export const useOrdenIdStore = create((set) => ({
  ordenId: null,
  setOrdenId: (id) => set({ ordenId: id }),
  clearOrdenId: () => set({ ordenId: null }),
}))
