"use client";

import { useState } from "react";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

/**
 * Formaga qo'shiladigan yashirin maydon.
 * Ishlatish:
 *   const hp = useHoneypot();
 *   <form>… {hp.field} …</form>
 *   mutation.mutate({ …, [HONEYPOT_FIELD]: hp.value })
 *
 * `display:none` emas, ekrandan tashqariga chiqariladi — ba'zi botlar
 * yashirin maydonlarni o'tkazib yuboradi, bu esa oddiy input'dek ko'rinadi.
 */
export function useHoneypot() {
  const [value, setValue] = useState("");

  const field = (
    <input
      type="text"
      name={HONEYPOT_FIELD}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );

  return { field, value };
}
