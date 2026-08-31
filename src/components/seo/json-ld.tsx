/**
 * Strukturaviy ma'lumotlarni sahifaga qo'shadi.
 * Server komponenti — brauzerga qo'shimcha JS ketmaydi.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Ma'lumot o'z kodimizdan keladi (foydalanuvchi kiritmaydi),
      // shunga qaramay `<` belgisini ekranlab qo'yamiz.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
