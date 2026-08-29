import { chromium } from 'playwright';
const B='http://localhost:3310';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({viewport:{width:1440,height:950}, reducedMotion:'reduce'});
const full = async(u,out)=>{ await p.goto(B+u,{waitUntil:'load'}); await p.waitForTimeout(1400);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  for (let y=0;y<H;y+=450){ await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(90); }
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(500);
  await p.screenshot({path:out, fullPage:true}); console.log('→',out); };
await full('/uz/services','/tmp/s-services.png');
await full('/uz/faq','/tmp/s-faq.png');
await full('/uz/warranty','/tmp/s-warranty.png');
await b.close();
