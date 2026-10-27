/* Records independent optional-topic attempts and syncs completed passes only. */
(function(){
'use strict';
const ROOT='milana_extra_grammar_v1',LOG='milana_extra_pass_history_v1',WRITER='milana_future_cloud_writer_v1';
const API=String(window.MILANA_RESULTS_API||'').replace(/\/+$/,'');
const meta=()=>{try{return JSON.parse(localStorage.getItem(LOG)||'{}')}catch{return {}}};
let rec=meta();
for(const t of ['articles','prepositions'])if(!rec[t]||!Array.isArray(rec[t].history))rec[t]={run:1,started:new Date().toISOString(),archived:false,history:[]};
const save=()=>{try{localStorage.setItem(LOG,JSON.stringify(rec))}catch(e){console.warn('Local extra-pass save failed',e)}};
const progress=()=>{try{return JSON.parse(localStorage.getItem(ROOT)||'{}')}catch{return {}}};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sentence=(q,v)=>(q[2]+(v==='∅'?'':v)+q[3]).replace(/\s{2,}/g,' ').replace(/\s+([.,!?])/g,'$1').trim();
function snapshot(t){
 const data=window.MILANA_EXTRA_TOPICS?.[t]?.data||[],p=progress(),entries=p[t]||{},m=rec[t];
 if(!m||m.archived||!data.length||!data.every(q=>entries[q[0]]?.checked))return false;
 const questions=data.map((q,i)=>{
  const selected=entries[q[0]].selected,correct=selected===q[4],expected=sentence(q,q[4]),chosen=sentence(q,selected);
  return {id:t+'-'+String(i+1).padStart(3,'0'),group:t==='articles'?'article':'preposition',prompt:q[1],chosen,expected,
   correct,explanation:q[6]+'\nПОЛНОЕ ПРЕДЛОЖЕНИЕ: '+expected+'\nПЕРЕВОД: '+q[5]+'\nСРАВНИ: '+q[7]+' — '+q[8],
   fullSentence:expected,translation:q[5],examples:[{en:expected,ru:q[5]},{en:q[7],ru:q[8]}],
   wrongParts:correct?[]:[{chosen:selected,expected:q[4],why:q[6]}]};
 });
 const h={run:m.run,started:m.started,finished:new Date().toISOString(),score:questions.filter(q=>q.correct).length,total:questions.length,questions};
 m.history.unshift(h);m.archived=true;save();
 return true;
}
function panel(){
 const id='extra-attempts';
 let el=document.getElementById(id);
 if(!el){el=document.createElement('section');el.id=id;el.className='card';document.getElementById('topic').before(el)}
 const t=location.hash.replace('#','')==='prepositions'?'prepositions':'articles',m=rec[t],data=window.MILANA_EXTRA_TOPICS[t].data,entries=progress()[t]||{};
 const done=data.filter(q=>entries[q[0]]?.checked).length;
 let html='<h2>Мои проходы · '+(t==='articles'?'Артикли':'Предлоги')+'</h2><p>Проверено '+done+'/'+data.length+' в текущем прохождении. Завершённые проходы сохраняются отдельно.</p>';
 if(m.archived)html+='<p style="color:green"><b>✅ Проход №'+m.run+' сохранён</b></p><button class="btn" onclick="newExtraPass(\''+t+'\')">Начать новый проход</button>';
 html+='<p><a class="navlink" href="public-results.html?track='+t+'">🌍 Общие проходы: '+(t==='articles'?'артикли':'предлоги')+'</a></p>';
 if(!m.history.length)html+='<p>Завершённых проходов пока нет.</p>';
 html+=m.history.map(h=>'<details><summary>Проход №'+h.run+' · '+h.score+'/'+h.total+' · '+esc(new Date(h.finished).toLocaleString('ru-RU'))+'</summary>'+
 '<p>Разбор ошибок и все ответы первого прохождения:</p>'+h.questions.filter(q=>!q.correct).map(q=>'<p><b>'+esc(q.prompt)+'</b><br>Твой вариант: '+esc(q.chosen)+'<br>Правильно: '+esc(q.expected)+'<br>'+esc(q.translation)+'<br>'+esc(q.explanation)+'</p>').join('')+
 '<details><summary>Все '+h.questions.length+' заданий</summary>'+h.questions.map(q=>'<p>'+esc(q.expected)+' — '+esc(q.translation)+'</p>').join('')+'</details></details>').join('');
 el.innerHTML=html;
}
function newExtraPass(t){
 const m=rec[t];if(!m?.archived)return;
 const p=progress();p[t]={};
 try{localStorage.setItem(ROOT,JSON.stringify(p))}catch(e){alert('Нет места для сохранения новой попытки');return;}
 m.run++;m.started=new Date().toISOString();m.archived=false;save();location.reload();
}
function writer(){try{return localStorage.getItem(WRITER)||''}catch{return ''}}
async function sha(h){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode([h.started,h.finished,h.run].join('|')));return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('')}
let busy=false;
async function send(){
 if(busy||!API||!writer())return;busy=true;
 try{
  for(const t of ['articles','prepositions']){
   let acks=[];try{acks=JSON.parse(localStorage.getItem('milana_extra_ack_'+t+'_v1')||'[]')}catch{}
   const known=new Set(acks);
   for(const h of [...rec[t].history].reverse()){
    const id=await sha(h);if(known.has(id))continue;
    const payload={schema:1,id,track:t,runNumber:h.run,started:h.started,finished:h.finished,score:h.score,total:h.total,questions:h.questions,slots:h.total,goodSlots:h.score};
    const r=await fetch(API+'/api/runs',{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','X-Milana-Key':writer()},body:JSON.stringify(payload),signal:AbortSignal.timeout(25000)});
    const data=await r.json().catch(()=>({}));if(!r.ok||!data.ok)throw Error(data.error||'Sync '+r.status);
    known.add(id);localStorage.setItem('milana_extra_ack_'+t+'_v1',JSON.stringify([...known]));
   }
  }
 }catch(e){console.warn('Дополнительные проходы будут отправлены при следующем входе:',e.message)}finally{busy=false}
}
window.newExtraPass=newExtraPass;
window.addEventListener('milana:extra-checked',e=>{snapshot(e.detail.track);panel();send();});
window.addEventListener('hashchange',()=>panel());
window.addEventListener('online',()=>send());document.addEventListener('visibilitychange',()=>{if(!document.hidden)send()});
for(const t of ['articles','prepositions'])snapshot(t);
panel();send();setInterval(send,15000);
})();