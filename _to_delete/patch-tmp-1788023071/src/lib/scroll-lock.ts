/**
 * Overlay (savat, qidiruv, menyu, video modal) ochilganda sahifaning
 * "sakrashi"ga qarshi umumiy skroll-qulf.
 *
 * Sabab: `overflow: hidden` skrollbarni yo'qotadi va sahifa kengayib
 * kontent yon tomonga siljiydi. Yechim: skrollbar enini o'lchab, xuddi
 * shuncha `padding-right` beramiz — geometriya o'zgarmaydi.
 * Header `sticky` (oqim ichida) bo'lgani uchun body padding unga ham ta'sir qiladi.
 */
let locks = 0;

export function lockScroll() {
  if (typeof window === "undefined") return;
  if (++locks > 1) return;

  const gap = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (gap > 0) document.body.style.paddingRight = `${gap}px`;
}

export function unlockScroll() {
  if (typeof window === "undefined") return;
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}
