const CACHE='firewall-portfolio-v2-sales';
const ROOT=new URL('./',self.location.href);
const CORE=['./','index.html','style.css','sales.css','app.js','pwa.js','sales.js','marketing-config.js','marketing.js','story.html','privacy.html','build-your-mvp/index.html','manifest.webmanifest','assets/icon-192.png','assets/icon-512.png','assets/icon-maskable.png','assets/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const file of CORE){const url=new URL(file,ROOT);const response=await fetch(url,{cache:'reload'});if(!response.ok||response.redirected)throw new Error('Offline shell unavailable');await cache.put(url,response)}})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('firewall-portfolio-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('fetch',event=>{
const req=event.request;const url=new URL(req.url);
if(req.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
const local=url.pathname.slice(ROOT.pathname.length);
if(req.mode==='navigate'){
const navigationFile=(local===''||local==='index.html')?'./':/^build-your-mvp(?:\/|\/index.html)?$/.test(local)?'build-your-mvp/index.html':['story.html','privacy.html'].includes(local)?local:null;
if(!navigationFile)return;
event.respondWith((async()=>{try{const response=await fetch(req);if(response.ok&&!response.redirected&&(response.headers.get('content-type')||'').includes('text/html')){const cache=await caches.open(CACHE);await cache.put(new URL(navigationFile,ROOT),response.clone())}return response}catch{return await caches.match(new URL(navigationFile,ROOT))||Response.error()}})());return;
}
if(!CORE.includes(local)&&!local.startsWith('assets/'))return;
event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(req);if(cached)return cached;const response=await fetch(req);if(response.ok&&!response.redirected)await cache.put(req,response.clone());return response})());
});
