import type { I18nText } from "@/lib/types";

/**
 * Kalkulyator konfiguratsiyasi.
 * Barcha narxlar so'mda. Keyinchalik bu obyekt admin paneldan
 * tahrirlanadigan bazaga ko'chiriladi — formula o'zgarmaydi.
 *
 *   narx = (maydon_m2 × asosiy_m2_narx × material_k × chuqurlik_k
 *           + boshqaruv_narxi) × soni + asosiy_yig'im
 */

export interface Option {
  id: string;
  label: I18nText;
  /** koeffitsient (material uchun) */
  k?: number;
  /** qo'shimcha qat'iy narx (boshqaruv uchun) */
  add?: number;
  note?: I18nText;
}

export interface CalcType {
  id: string;
  label: I18nText;
  image: string;
  /** 1 m² uchun asosiy narx */
  perM2: number;
  /** har bir buyum uchun qat'iy yig'im (montaj tayyorgarligi, furnitura) */
  baseFee: number;
  width: { min: number; max: number; default: number };
  height: { min: number; max: number; default: number };
  /** chuqurlik faqat shkaflar uchun */
  depth?: { min: number; max: number; default: number };
  materials: Option[];
  controls: Option[];
  /** narx pog'onametr bo'yicha hisoblansa (otkatnoy darvoza) */
  perMeter?: boolean;
}

const M = (uz: string, ru: string): I18nText => ({ uz, ru });

const CONTROL_MANUAL: Option = {
  id: "manual",
  label: M("Qo'lda (tasma/karniz)", "Ручное (лента/карниз)"),
  add: 0,
};
const CONTROL_MOTOR: Option = {
  id: "motor",
  label: M("Elektr yuritma + 2 pult", "Электропривод + 2 пульта"),
  add: 1_950_000,
};
const CONTROL_SMART: Option = {
  id: "smart",
  label: M("Smart (telefon orqali)", "Smart (через телефон)"),
  add: 3_100_000,
};

export const calcTypes: CalcType[] = [
  {
    id: "rolstavni",
    label: M("Rolstavni (deraza/eshik)", "Рольставни (окно/дверь)"),
    image: "/products/rolstavni-silver.svg",
    perM2: 890_000,
    baseFee: 350_000,
    width: { min: 500, max: 4500, default: 1500 },
    height: { min: 500, max: 3200, default: 1600 },
    materials: [
      { id: "ar40", label: M("AR/40 — standart", "AR/40 — стандарт"), k: 1 },
      { id: "ar555", label: M("AR/555 — issiqlik izolyatsiya", "AR/555 — теплоизоляция"), k: 1.28 },
      { id: "ext77", label: M("Ekstruziya 77 — anti-vandal", "Экструзия 77 — антивандал"), k: 1.75 },
      { id: "poly", label: M("Shaffof (polikarbonat)", "Прозрачный (поликарбонат)"), k: 2.15 },
    ],
    controls: [CONTROL_MANUAL, CONTROL_MOTOR, CONTROL_SMART],
  },
  {
    id: "shkaf",
    label: M("Roletli shkaf", "Роллетный шкаф"),
    image: "/products/shkaf-parking-graphite.svg",
    perM2: 1_180_000,
    baseFee: 900_000,
    width: { min: 800, max: 4000, default: 2000 },
    height: { min: 800, max: 2600, default: 1200 },
    depth: { min: 300, max: 1000, default: 600 },
    materials: [
      { id: "steel", label: M("Po'lat karkas", "Стальной каркас"), k: 1 },
      { id: "alu", label: M("Alyumin karkas", "Алюминиевый каркас"), k: 1.22 },
      { id: "inox", label: M("Nerjaveyka", "Нержавейка"), k: 1.68 },
    ],
    controls: [
      CONTROL_MANUAL,
      CONTROL_MOTOR,
      {
        id: "motor_led",
        label: M("Elektr + LED yoritish", "Электро + LED-подсветка"),
        add: 2_450_000,
      },
    ],
  },
  {
    id: "sektsion",
    label: M("Seksion darvoza", "Секционные ворота"),
    image: "/products/vorota-sectional-white.svg",
    perM2: 1_420_000,
    baseFee: 1_800_000,
    width: { min: 2000, max: 6000, default: 3000 },
    height: { min: 1800, max: 4000, default: 2500 },
    materials: [
      { id: "sw40", label: M("Sendvich 40 mm", "Сэндвич 40 мм"), k: 1 },
      { id: "sw45", label: M("Sendvich 45 mm (kuchaytirilgan)", "Сэндвич 45 мм (усиленный)"), k: 1.18 },
      { id: "panoram", label: M("Panoramik (alyumin+shaffof)", "Панорамные (алюминий+прозрачное)"), k: 2.05 },
    ],
    controls: [
      { id: "manual", label: M("Qo'lda (zanjirli)", "Ручное (цепное)"), add: 0 },
      CONTROL_MOTOR,
      CONTROL_SMART,
    ],
  },
  {
    id: "otkatnoy",
    label: M("Otkatnoy (surma) darvoza", "Откатные ворота"),
    image: "/products/vorota-sliding.svg",
    perM2: 2_150_000,
    baseFee: 2_400_000,
    perMeter: true,
    width: { min: 3000, max: 8000, default: 4000 },
    height: { min: 1500, max: 2500, default: 2000 },
    materials: [
      { id: "profnastil", label: M("Profnastil", "Профнастил"), k: 1 },
      { id: "shtaket", label: M("Yevroshtaketnik", "Евроштакетник"), k: 1.25 },
      { id: "sandwich", label: M("Sendvich-panel", "Сэндвич-панель"), k: 1.55 },
    ],
    controls: [
      { id: "manual", label: M("Avtomatikasiz", "Без автоматики"), add: 0 },
      { id: "auto", label: M("Avtomatika + 2 pult", "Автоматика + 2 пульта"), add: 4_200_000 },
    ],
  },
  {
    id: "svingli",
    label: M("Sving (raspashnoy) darvoza", "Распашные ворота"),
    image: "/products/vorota-swing.svg",
    perM2: 1_050_000,
    baseFee: 1_200_000,
    width: { min: 2000, max: 6000, default: 3500 },
    height: { min: 1500, max: 2600, default: 2000 },
    materials: [
      { id: "profnastil", label: M("Profnastil", "Профнастил"), k: 1 },
      { id: "kovka", label: M("Yasama bezaklar bilan", "С коваными элементами"), k: 1.62 },
    ],
    controls: [
      { id: "manual", label: M("Avtomatikasiz", "Без автоматики"), add: 0 },
      { id: "auto", label: M("Avtomatika + 2 pult", "Автоматика + 2 пульта"), add: 3_600_000 },
    ],
  },
  {
    id: "panjara",
    label: M("Panjara / to'siq", "Решётка / ограждение"),
    image: "/products/panjara-classic.svg",
    perM2: 640_000,
    baseFee: 180_000,
    width: { min: 400, max: 4000, default: 1500 },
    height: { min: 400, max: 3000, default: 1500 },
    materials: [
      { id: "square", label: M("Kvadrat profil 16×16", "Квадрат 16×16"), k: 1 },
      { id: "square20", label: M("Kvadrat profil 20×20", "Квадрат 20×20"), k: 1.2 },
      { id: "kovka", label: M("Yasama, dekorativ", "Ковка, декоративная"), k: 1.75 },
    ],
    controls: [{ id: "none", label: M("Kerak emas", "Не требуется"), add: 0 }],
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

  /* otkatnoy darvoza — pog'onametr bo'yicha, aks holda m² */
  const area = type.perMeter ? wM : wM * hM;

  /* chuqurlik koeffitsienti: har 100 mm uchun +4% (600 mm — bazaviy) */
  const depthK = type.depth
    ? 1 + (((input.depth ?? type.depth.default) - type.depth.default) / 100) * 0.04
    : 1;

  const base = area * type.perM2 * depthK;
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
