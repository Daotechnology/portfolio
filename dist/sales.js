const campaignKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
const campaignParams=new URLSearchParams(location.search);
const attribution=Object.fromEntries(campaignKeys.filter(key=>campaignParams.has(key)).map(key=>[key,campaignParams.get(key).slice(0,160)]));
const campaignText=Object.entries(attribution).map(([key,value])=>key+': '+value).join('\n');
const isMvpPage=location.pathname.includes('build-your-mvp');
function contactIntent(channel,placement){
  const event={event:'contact_intent',channel,placement,page:isMvpPage?'mvp_landing':'portfolio',...attribution};
  window.dataLayer=window.dataLayer||[];window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent('portfolio:contact-intent',{detail:event}));
}
function whatsappUrl(text){return 'https://wa.me/2349069394998?text='+encodeURIComponent(text+(campaignText?'\n\nHow I found you\n'+campaignText:''));}
document.querySelectorAll('[data-whatsapp]').forEach(link=>{link.href=whatsappUrl('Hi Ayomide, I’d like to discuss '+(isMvpPage?'building an MVP.':'a software project.'));link.addEventListener('click',()=>contactIntent('whatsapp',link.dataset.whatsapp));});
document.querySelectorAll('[data-campaign-link]').forEach(link=>{const url=new URL(link.href,location.href);for(const [key,value] of Object.entries(attribution))url.searchParams.set(key,value);link.href=url.href;});
const proof=document.querySelector('#featured-projects');
if(proof){proof.innerHTML=['ACTA','ChallengeMe','Chekker'].map(name=>{const p=projects.find(project=>project.name===name);return `<article class="proof-card"><a href="${isMvpPage?'/#work':'#work'}" aria-label="Explore ${p.name} case study"><img src="/assets/${p.image}" alt="${p.name} actual ${name==='Chekker'?'local app':'public website'} screenshot" loading="lazy"></a><div><span class="eyebrow">${p.type}</span><h3>${p.name}</h3><p>${p.summary}</p><dl><dt>The problem</dt><dd>${p.problem}</dd><dt>Engineering focus</dt><dd>${p.challenge}</dd><dt>What was built</dt><dd>${p.result}</dd></dl>${p.links.length?`<a class="text-link" href="${p.links[0][1]}" target="_blank" rel="noopener noreferrer">Visit ${p.name} ↗</a>`:`<a class="text-link" href="/#work">Explore the case study ↗</a>`}</div></article>`}).join('');}
const quickForm=document.querySelector('#quick-form');
function prepareQuickInquiry(){const data=new FormData(quickForm);const get=key=>String(data.get(key)||'').trim();return ['Hi Ayomide, I’d like to discuss a project.','Name: '+get('name'),'Contact: '+get('contact'),'Project idea: '+get('idea'),'Budget: '+(get('budget')||'Let’s discuss')].join('\n\n');}
function updateQuickFallback(text){const box=document.querySelector('#quick-fallback');box.hidden=false;document.querySelector('#quick-draft').value=text+(campaignText?'\n\n'+campaignText:'');document.querySelector('#quick-email').href='mailto:daotechnology18@gmail.com?subject='+encodeURIComponent('Project inquiry — Build with Ayomide')+'&body='+encodeURIComponent(document.querySelector('#quick-draft').value);}
quickForm?.addEventListener('submit',event=>{event.preventDefault();if(!quickForm.reportValidity())return;const text=prepareQuickInquiry();updateQuickFallback(text);contactIntent('whatsapp','quick_form');const link=document.createElement('a');link.href=whatsappUrl(text);link.target='_blank';link.rel='noopener noreferrer';document.body.append(link);link.click();link.remove();document.querySelector('#quick-status').textContent='Your project message is ready in WhatsApp. Review it and tap Send there. If WhatsApp didn’t open, use the email or copy options below.';});
document.querySelector('#quick-copy')?.addEventListener('click',async()=>{const area=document.querySelector('#quick-draft');try{await navigator.clipboard.writeText(area.value);document.querySelector('#quick-status').textContent='Copied. Paste your message into WhatsApp or email.';}catch{area.focus();area.select();document.querySelector('#quick-status').textContent='Message selected below. Copy it into WhatsApp or email.';}});
document.querySelector('#quick-email')?.addEventListener('click',()=>contactIntent('email','quick_form_fallback'));
