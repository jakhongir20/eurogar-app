"use client";

import { useMutation } from "@tanstack/react-query";
import type { CartLine } from "./types";
import { HONEYPOT_FIELD } from "./honeypot";

/** Har bir forma payload'iga qo'shiladigan yashirin bot-maydoni */
type WithHoneypot = { [HONEYPOT_FIELD]?: string };

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`request_failed_${res.status}`);
  return res.json() as Promise<T>;
}

export interface LeadPayload extends WithHoneypot {
  name: string;
  phone: string;
  note?: string;
  source: "cta" | "contact" | "calculator";
  meta?: Record<string, string | number>;
}

export function useLeadMutation() {
  return useMutation({
    mutationFn: (payload: LeadPayload) =>
      post<{ ok: true; id: string }>("/api/lead", payload),
  });
}

export interface ReviewPayload extends WithHoneypot {
  name: string;
  phone?: string;
  rating: number;
  text: string;
}

export function useReviewMutation() {
  return useMutation({
    mutationFn: (payload: ReviewPayload) =>
      post<{ ok: true; id: string }>("/api/review", payload),
  });
}

export interface OrderPayload extends WithHoneypot {
  name: string;
  phone: string;
  note?: string;
  items: Pick<CartLine, "name" | "qty" | "price">[];
}

export function useOrderMutation() {
  return useMutation({
    mutationFn: (payload: OrderPayload) =>
      post<{ ok: true; code: string; id: string }>("/api/order", payload),
  });
}
