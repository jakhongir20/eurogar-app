import { chromium } from 'playwright';
const B='http://localhost:3310';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1440,height:950}});
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
const ok=(n,c)=>console.log(c?'✓ '+n:'✗ '+n);
for (const u of ['/uz/services','/uz/faq','/uz/warranty','/ru/services','/ru/faq','/ru/warranty']) {
  const r=await p.goto(B+u,{waitUntil:'load'}); await p.waitForTimeout(400);
  ok(`${u} [${r.status()}]`, r.status()===200);
}
// FAQ akkordeon
await p.goto(B+'/uz/faq',{waitUntil:'load'}); await p.waitForTimeout(1000);
const q = p.getByRole('button',{name:/Kalkulyatordagi narx/i});
await q.click(); await p.waitForTimeout(600);
ok('akkordeon ochildi', (await p.getByText(/Yakuniy narx bepul o'lchovdan keyin/i).count())>0);
// bosh sahifada xizmatlar bloki
await p.goto(B+'/uz',{waitUntil:'load'}); await p.waitForTimeout(1400);
ok('bosh sahifada xizmatlar', (await p.getByText(/To'liq sikl — bitta jamoadan/i).count())>0);
// services anchor
await p.goto(B+'/uz/services#servis',{waitUntil:'load'}); await p.waitForTimeout(900);
ok('services sahifasi + 4 blok', (await p.locator('article').count())===4);
console.log('xatolar:', errs.length?[...new Set(errs)].join(' | '):'yo\'q');
await b.close();
