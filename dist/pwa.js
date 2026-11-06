const installButton=document.querySelector('#install-app');
const installNote=document.querySelector('#install-note');
let installPrompt;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
window.addEventListener('appinstalled',()=>{installButton.hidden=true;installNote.textContent='Firewall is installed on your device.'});
if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.matchMedia('(display-mode: standalone)').matches)installNote.textContent='On iPhone: open in Safari, tap Share, then Add to Home Screen.';
const connection=document.querySelector('#connection-status');
function updateConnection(){connection.hidden=navigator.onLine;connection.textContent='You’re offline. Previously viewed content is available; email and external links need a connection.'}
window.addEventListener('online',updateConnection);window.addEventListener('offline',updateConnection);updateConnection();
if('serviceWorker'in navigator){window.addEventListener('load',async()=>{try{const registration=await navigator.serviceWorker.register('./sw.js');function offerUpdate(){if(!registration.waiting||!navigator.serviceWorker.controller)return;const button=document.querySelector('#update-app');button.hidden=false;button.onclick=()=>{registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});button.disabled=true}}offerUpdate();registration.addEventListener('updatefound',()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')offerUpdate()})});let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(document.querySelector('#update-app').disabled&&!reloading){reloading=true;location.reload()}})}catch{installNote.textContent='Offline setup is unavailable in this browser. You can keep using the website.'}})}
