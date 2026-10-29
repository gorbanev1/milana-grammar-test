/* Unified non-invasive navigation for Future, optional lessons, and shared results. */
(function(){
'use strict';
if(document.querySelector('#milana-site-nav'))return;
const css=document.createElement('style');
css.textContent='#milana-site-nav{position:relative;z-index:5;background:#eff5fb;border-bottom:1px solid #cbd9e7;padding:10px 12px}#milana-site-nav .navinner{display:flex;gap:7px;flex-wrap:wrap;align-items:center;max-width:1080px;margin:auto}#milana-site-nav a{font:750 14px/1.35 system-ui,-apple-system,sans-serif;display:inline-block;border:1px solid #c6d5e1;border-radius:12px;padding:10px 12px;color:#244c6e;background:white;text-decoration:none}#milana-site-nav a.current{background:#1c507d;color:white}#milana-site-nav b{font:800 17px system-ui;min-width:100px;color:#173b56}@media(max-width:550px){#milana-site-nav a{flex:1;text-align:center;min-width:115px}#milana-site-nav b{width:100%;text-align:center}}';
document.head.appendChild(css);
const items=[
 ['future','🔵 Future','./'],['past','🟠 Past','courses.html?track=past'],['present','🟢 Present','courses.html?track=present'],
 ['all','🟣 Все времена','courses.html?track=all'],['express','⚡ Экспресс-тесты','courses.html?track=express'],['articles','🟪 Артикли','extra-topics.html#articles'],['prepositions','🟩 Предлоги','extra-topics.html#prepositions']];
const el=document.createElement('nav');el.id='milana-site-nav';el.setAttribute('aria-label','Разделы Milana Grammar Lab');
el.innerHTML='<div class="navinner"><b>Grammar Lab</b>'+items.map(([k,title,url])=>'<a data-key="'+k+'" href="'+url+'">'+title+'</a>').join('')+'</div>';
document.body.insertBefore(el,document.body.firstChild);
function active(){
 const p=location.pathname;
 const t=p.endsWith('extra-topics.html')?(location.hash==='#prepositions'?'prepositions':'articles'):p.endsWith('courses.html')?(new URLSearchParams(location.search).get('track')||'past'):p.endsWith('public-results.html')?(new URLSearchParams(location.search).get('track')||'future'):'future';
 el.querySelectorAll('a').forEach(a=>a.classList.toggle('current',a.dataset.key===t));
}
window.addEventListener('hashchange',active);active();
})();