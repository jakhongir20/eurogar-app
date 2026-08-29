import type { OrderStatus } from "@/lib/types";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Yangi",
  in_progress: "Jarayonda",
  done: "Bajarildi",
  canceled: "Bekor qilindi",
};

export const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-brand-400 text-ink-950",
  in_progress: "bg-steel-400/20 text-steel-500",
  done: "bg-emerald-100 text-emerald-700",
  canceled: "bg-bone-300 text-muted",
};

export const STATUS_ORDER: OrderStatus[] = [
  "new",
  "in_progress",
  "done",
  "canceled",
];
