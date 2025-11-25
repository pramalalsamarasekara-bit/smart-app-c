// lib/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  title: string;
  price?: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (payload: { id: string; title: string; price?: number }) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  count: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: ({ id, title, price }) => {
        const items = get().items.slice();
        const idx = items.findIndex((it) => it.id === id);
        if (idx >= 0) {
          items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
        } else {
          items.push({ id, title, price, qty: 1 });
        }
        set({ items });
      },

      removeItem: (id) => set({ items: get().items.filter((it) => it.id !== id) }),

      increment: (id) => {
        const items = get().items.map((it) =>
          it.id === id ? { ...it, qty: it.qty + 1 } : it
        );
        set({ items });
      },

      decrement: (id) => {
        const items = get().items
          .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it))
          .filter((it) => it.qty > 0);
        set({ items });
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((n, it) => n + it.qty, 0),

      total: () =>
        get().items.reduce((sum, it) => sum + (it.price ?? 0) * it.qty, 0),
    }),
    {
      name: 'smartshopping-cart',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
