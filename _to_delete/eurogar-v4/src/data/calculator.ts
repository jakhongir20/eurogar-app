import type { I18nText } from "@/lib/types";

/**
 * Kalkulyator konfiguratsiyasi — kompaniyaning 7 rasmiy toifasidan
 * o'lchamga bog'liq narxlanadigan 4 tasi kiritilgan.
 * (Bollard, antitarran va maxsus eshiklar individual hisoblanadi —
 * ular uchun katalogdan ariza qoldiriladi.)
 *
 * Barcha narxlar so'mda va TAXMINIY. Keyinchalik bu obyekt admin
 * paneldan tahrirlanadigan bazaga ko'chiriladi — formula o'zgarmaydi.
 *
 *   narx = (maydon × asosiy_narx × material_k + boshqaruv_narxi) × soni
 *          + yig'ish_narxi
 */

export interface Option {
  id: string;
  label: I18nText;
  /** koeffitsient (material/konstruksiya uchun) */
  k?: number;
  /** qo'shimcha qat'iy narx (boshqaruv uchun) */
  add?: number;
}

export interface CalcType {
  id: string;
  label: I18nText;
  image: string;
  /** 1 m² (yoki perMeter=true bo'lsa 1 pog.m) uchun asosiy narx */
  perM2: number;
  /** har bir buyum uchun qat'iy yig'im (furnitura, montaj tayyorgarligi) */
  baseFee: number;
  width: { min: number; max: number; default: number };
  height: { min: number; max: number; default: number };
  /** ba'zi turlar uchun chuqurlik (hozircha ishlatilmaydi) */
  depth?: { min: number; max: number; default: number };
  materials: Option[];
  controls: Option[];
  /** narx pog'onametr bo'yicha hisoblansa (otkatnoy, shlagbaum) */
  perMeter?: boolean;
}

const M = (uz: string, ru: string): I18nText => ({ uz, ru });

export const calcTypes: CalcType[] = [
  {
    id: "rolstavniy",
    label: M("Rolstavniy darvoza", "Рольставни"),
    image: "/products/rolstavniy-darvoza.webp",
    perM2: 1_100_000,
    baseFee: 400_000,
    width: { min: 800, max: 6000, default: 2500 },
    height: { min: 800, max: 4000, default: 2200 },
    materials: [
      { id: "standard", label: M("Standart profil", "Стандартный профиль"), k: 1 },
      { id: "insulated", label: M("Issiqlik izolyatsiyali", "С теплоизоляцией"), k: 1.25 },
      { id: "reinforced", label: M("Kuchaytirilgan (anti-vandal)", "Усиленный (антивандальный)"), k: 1.6 },
    ],
    controls: [
      { id: "manual", label: M("Qo'lda boshqarish", "Ручное управление"), add: 0 },
      { id: "motor", label: M("Elektr yuritma + 2 pult", "Электропривод + 2 пульта"), add: 2_400_000 },
    ],
  },
  {
    id: "seksion",
    label: M("Seksion darvoza", "Секционные ворота"),
    image: "/products/seksion-darvoza.webp",
    perM2: 1_500_000,
    baseFee: 1_600_000,
    width: { min: 2000, max: 6000, default: 3000 },
    height: { min: 1800, max: 5000, default: 2500 },
    materials: [
      { id: "sw40", label: M("Sendvich-panel 40 mm", "Сэндвич-панель 40 мм"), k: 1 },
      { id: "sw45", label: M("Sendvich-panel 45 mm (kuchaytirilgan)", "Сэндвич 45 мм (усиленная)"), k: 1.18 },
    ],
    controls: [
      { id: "manual", label: M("Qo'lda (zanjirli)", "Ручное (цепное)"), add: 0 },
      { id: "motor", label: M("Avtomatika + 2 pult", "Автоматика + 2 пульта"), add: 3_200_000 },
    ],
  },
  {
    id: "otkatnoy",
    label: M("Otkatnoy darvoza", "Откатные ворота"),
    image: "/products/otkatnoy-darvoza.webp",
    perM2: 2_200_000,
    baseFee: 2_200_000,
    perMeter: true,
    width: { min: 3000, max: 8000, default: 4000 },
    height: { min: 1500, max: 2500, default: 2000 },
    materials: [
      { id: "profnastil", label: M("Profnastil to'ldirma", "Заполнение профнастилом"), k: 1 },
      { id: "panel", label: M("Sendvich-panel to'ldirma", "Заполнение сэндвич-панелью"), k: 1.4 },
    ],
    controls: [
      { id: "manual", label: M("Avtomatikasiz", "Без автоматики"), add: 0 },
      { id: "auto", label: M("Avtomatika + 2 pult", "Автоматика + 2 пульта"), add: 4_500_000 },
    ],
  },
  {
    id: "shlagbaum",
    label: M("Shlagbaum", "Шлагбаум"),
    image: "/products/shlagbaum.svg",
    perM2: 900_000,
    baseFee: 5_500_000,
    perMeter: true,
    width: { min: 3000, max: 8000, default: 4000 },
    height: { min: 1000, max: 1200, default: 1100 },
    materials: [
      { id: "standard", label: M("Standart rejim", "Стандартный режим"), k: 1 },
      { id: "intensive", label: M("Intensiv rejim (100%)", "Интенсивный режим (100%)"), k: 1.5 },
    ],
    controls: [
      { id: "remote", label: M("2 ta pult", "2 пульта"), add: 0 },
      { id: "acs", label: M("Kirish nazorati (karta/GSM)", "Контроль доступа (карта/GSM)"), add: 1_800_000 },
    ],
  },
];

export const getCalcType = (id: string) => calcTypes.find((t) => t.id === id);

export interface CalcInput {
  typeId: string;
  width: number;
  height: number;
  depth?: number;
  materialId: string;
  controlId: string;
  qty: number;
}

export interface CalcResult {
  ok: boolean;
  area: number;
  base: number;
  materialExtra: number;
  controlCost: number;
  baseFee: number;
  total: number;
}

export function calculate(input: CalcInput): CalcResult {
  const type = getCalcType(input.typeId);
  const empty: CalcResult = {
    ok: false,
    area: 0,
    base: 0,
    materialExtra: 0,
    controlCost: 0,
    baseFee: 0,
    total: 0,
  };
  if (!type) return empty;

  const material = type.materials.find((m) => m.id === input.materialId);
  const control = type.controls.find((c) => c.id === input.controlId);
  const k = material?.k ?? 1;

  const wM = input.width / 1000;
  const hM = input.height / 1000;

  /* otkatnoy va shlagbaum — pog'onametr bo'yicha, aks holda m² */
  const area = type.perMeter ? wM : wM * hM;

  const base = area * type.perM2;
  const withMaterial = base * k;
  const materialExtra = withMaterial - base;
  const controlCost = control?.add ?? 0;

  const perUnit = withMaterial + controlCost + type.baseFee;

  return {
    ok: true,
    area: Number(area.toFixed(2)),
    base: Math.round(base),
    materialExtra: Math.round(materialExtra),
    controlCost,
    baseFee: type.baseFee,
    total: Math.round(perUnit * input.qty),
  };
}
