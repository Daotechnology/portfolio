import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname;const file=path==='/'?'index.html':/^\/build-your-mvp\/?$/.test(path)?'build-your-mvp/index.html':path.slice(1);const data=await readFile(new URL('./dist/'+file,import.meta.url));res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':file.endsWith('.webmanifest')?'application/manifest+json':file.endsWith('.png')?'image/png':'image/jpeg');res.end(data)}catch{res.statusCode=404;res.end('Not found')}}).listen(4782,'127.0.0.1');
await mkdir('review',{recursive:true});
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--remote-debugging-port=9347',`--user-data-dir=${process.cwd()}/review/sales-test-${Date.now()}`,'--no-first-run','about:blank'],{windowsHide:true,stdio:'ignore'});
let ws;
try{
  let targets;for(let i=0;i<60;i++){try{targets=await(await fetch('http://127.0.0.1:9347/json')).json();break}catch{await new Promise(r=>setTimeout(r,200))}}
  assert(targets,'Chrome did not start');ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
  let id=0;const pending=new Map();const errors=[];
  ws.onmessage=({data})=>{const m=JSON.parse(data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)};
  const call=(method,params={})=>new Promise(resolve=>{pending.set(++id,resolve);ws.send(JSON.stringify({id,method,params}))});
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
  for(const route of ['/','/build-your-mvp/']){
    await call('Page.navigate',{url:'http://127.0.0.1:4782'+route+'?utm_source=meta&utm_campaign=mvp_test&utm_content=walkthrough'});await new Promise(r=>setTimeout(r,1500));
    assert.equal(await evaluate('document.querySelectorAll(".proof-card").length'),3);
    assert.equal(await evaluate('document.querySelector(".hero [data-whatsapp]").textContent.includes("WhatsApp")'),true);
    assert.equal(await evaluate('document.querySelectorAll("#quick-form [required]").length'),3);
    assert.equal(await evaluate('window.fbq===undefined'),true,'Pixel should stay disabled without an ID');
    for(const width of [320,375,390,600,768,1024,1440,1920]){
      await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});await new Promise(r=>setTimeout(r,150));
      assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,route+' overflow at '+width);
      await evaluate('[...document.images].forEach(i=>i.loading="eager")');await new Promise(r=>setTimeout(r,200));
      assert.equal(await evaluate('[...document.images].every(i=>i.complete&&i.naturalWidth>0)'),true);
      if([390,1440].includes(width)){await evaluate('document.documentElement.style.scrollBehavior="auto";scrollTo(0,0)');const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`review/sales-${route==='/'?'home':'mvp'}-${width}.png`,Buffer.from(shot.data,'base64'))}
    }
    await evaluate(`document.addEventListener('click',event=>{const link=event.target.closest('a');if(link?.href.startsWith('https://wa.me/')){window.capturedWhatsApp=link.href;event.preventDefault()}},true);document.querySelector('#quick-name').value='Test Visitor';document.querySelector('#quick-contact').value='visitor@example.com';document.querySelector('#quick-idea').value='Booking & AI for local businesses';document.querySelector('#quick-budget').value='USD 5000';document.querySelector('#quick-form').requestSubmit();`);
    const message=await evaluate('new URL(window.capturedWhatsApp).searchParams.get("text")');
    assert(message.includes('Booking & AI for local businesses'));assert(message.includes('visitor@example.com'));assert(message.includes('utm_campaign: mvp_test'));
    assert.equal(await evaluate('window.dataLayer.at(-1).event'),'contact_intent');
    assert.equal(await evaluate('JSON.stringify(window.dataLayer).includes("visitor@example.com")'),false,'Do not leak contact fields into events');
    assert.equal(await evaluate('JSON.stringify(window.dataLayer).includes("Booking & AI")'),false);
    assert.equal(await evaluate('document.querySelector("#quick-status").textContent.includes("tap Send")'),true);
    assert.equal(await evaluate('document.querySelector("#quick-fallback").hidden'),false);
    assert.equal(await evaluate('new URL(document.querySelector("#quick-email").href).searchParams.get("body").includes("Booking & AI")'),true);
    if(route==='/')assert.equal(await evaluate('new URL(document.querySelector("[data-campaign-link]").href).searchParams.get("utm_campaign")'),'mvp_test');
  }
  await evaluate('navigator.serviceWorker.ready.then(()=>true)');await new Promise(r=>setTimeout(r,300));
  assert.equal(await evaluate('Boolean(navigator.serviceWorker.controller)'),true);
  await call('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});await call('Page.reload');await new Promise(r=>setTimeout(r,1200));
  assert.equal(await evaluate('document.querySelector("h1").textContent.includes("first real version")'),true,'MVP page loads offline');
  assert.equal(await evaluate('document.querySelector("#connection-status").hidden'),false);
  await call('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  for(const route of ['/story.html','/privacy.html']){await call('Page.navigate',{url:'http://127.0.0.1:4782'+route});await new Promise(r=>setTimeout(r,400));assert.equal(await evaluate('Boolean(document.querySelector("h1,h2"))'),true)}
  assert.deepEqual(errors,[]);
  console.log('PASS: homepage + MVP page at 8 widths; proof images; WhatsApp/email drafts; UTM handoff; no inquiry PII in measurement events; disabled Pixel; offline MVP; story/privacy; no runtime exceptions.');
}finally{ws?.close();chrome.kill();server.close()}
