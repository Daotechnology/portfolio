(()=>{
const id=window.MARKETING_CONFIG?.metaPixelId;
if(!/^\d{8,25}$/.test(String(id||'')))return;
let enabled=false;let preference;
try{preference=localStorage.getItem('marketing-consent')}catch{}
function enable(){if(enabled||navigator.doNotTrack==='1')return;enabled=true;const fbq=window.fbq=function(){fbq.callMethod?fbq.callMethod.apply(fbq,arguments):fbq.queue.push(arguments)};fbq.queue=[];fbq.loaded=true;fbq.version='2.0';window._fbq=fbq;const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.append(script);fbq('init',String(id));fbq('track','PageView');}
if(preference==='allow')enable();
const banner=document.createElement('aside');banner.className='consent-banner';banner.setAttribute('aria-label','Optional marketing measurement');banner.innerHTML='<p>Allow optional Meta measurement to help understand which ads bring visitors? Inquiry text and contact fields are not included in our custom events. <a href="/privacy.html">Privacy details</a></p><div><button data-consent="allow">Allow</button><button data-consent="deny">No thanks</button></div>';
if(!preference&&navigator.doNotTrack!=='1')document.body.append(banner);
banner.addEventListener('click',event=>{const choice=event.target.closest('[data-consent]')?.dataset.consent;if(!choice)return;try{localStorage.setItem('marketing-consent',choice)}catch{}if(choice==='allow')enable();banner.remove();});
window.addEventListener('portfolio:contact-intent',event=>{if(enabled)window.fbq('trackCustom','ContactIntent',{channel:event.detail.channel,placement:event.detail.placement,page:event.detail.page});});
const settings=document.createElement('button');settings.className='privacy-settings';settings.textContent='Marketing preferences';settings.onclick=()=>{enabled=false;try{localStorage.removeItem('marketing-consent')}catch{}location.reload()};document.querySelector('footer')?.append(settings);
})();
