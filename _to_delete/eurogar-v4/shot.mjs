import { chromium } from 'playwright';
const B='http://localhost:3300';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({viewport:{width:1440,height:950}, reducedMotion:'reduce'});
const full = async(u,out)=>{ await p.goto(B+u,{waitUntil:'load'}); await p.waitForTimeout(1500);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  for (let y=0;y<H;y+=450){ await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(100); }
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);
  await p.screenshot({path:out, fullPage:true}); console.log('→',out); };
await full('/uz','/tmp/v3-home.png');
await full('/uz/blog','/tmp/v3-blog.png');
await full('/uz/blog/rolstavniy-darvoza-nima','/tmp/v3-article.png');
await full('/uz/about','/tmp/v3-about.png');
await full('/uz/catalog','/tmp/v3-catalog.png');
await b.close();
