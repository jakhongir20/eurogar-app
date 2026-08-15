"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, Product } from "./types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  /** oxirgi qo'shilgan mahsulot id — "Qo'shildi" animatsiyasi uchun */
  lastAdded: string | null;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAdded: null,

      add: (product, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.productId === product.id);
        if (i >= 0) {
          lines[i] = {
            ...lines[i],
            qty: Math.min(lines[i].qty + qty, Math.max(product.stock, 1)),
          };
        } else {
          lines.push({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0],
            qty: Math.min(qty, Math.max(product.stock, 1)),
            stock: product.stock,
          });
        }
        set({ lines, lastAdded: product.id, isOpen: true });
        setTimeout(() => {
          if (get().lastAdded === product.id) set({ lastAdded: null });
        }, 1600);
      },

      remove: (productId) =>
        set({ lines: get().lines.filter((l) => l.productId !== productId) }),

      setQty: (productId, qty) =>
        set({
          lines: get()
            .lines.map((l) =>
              l.productId === productId
                ? { ...l, qty: Math.max(1, Math.min(qty, Math.max(l.stock, 1))) }
                : l,
            )
            .filter((l) => l.qty > 0),
        }),

      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "eurogar-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      /**
       * MUHIM: localStorage sinxron o'qiladi, shuning uchun avtomatik
       * gidratsiya SSR natijasi bilan mos kelmay qoladi (React #418).
       * Shu sababli qo'lda — Providers ichidagi effektda — tiklanadi.
       */
      skipHydration: true,
    },
  ),
);

/* ---- derived selektorlar ---- */
export const cartCount = (lines: CartLine[]) =>
  lines.reduce((a, l) => a + l.qty, 0);

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((a, l) => a + l.qty * l.price, 0);
