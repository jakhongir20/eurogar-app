"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { useCart } from "@/lib/cart-store";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  /* Savatni brauzer xotirasidan tiklash — gidratsiyadan keyin */
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={client}>
      {/*
        reducedMotion="user" — animatsiyani komponent ichida emas, Motion
        darajasida boshqaradi. Shu tufayli server va brauzer bir xil markup
        chiqaradi (React #418 xatosi bo'lmaydi), ammo "harakatni kamaytirish"
        sozlamasi yoqilgan foydalanuvchilarda siljish/masshtab animatsiyalari
        o'chadi.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </QueryClientProvider>
  );
}
