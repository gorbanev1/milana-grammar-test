/* Independent track engine: Past, Present, and 100 exclusive all-tenses contrasts.
   Existing milana_future_lab_330_v1 progress NEVER accessed or modified here. */
(function(){
'use strict';
const track=new URLSearchParams(location.search).get('track')||'past';
if(!['past','present','all'].includes(track)){location.replace('courses.html?track=past');return;}
const bank=window.MILANA_COURSE_BANK[track],byId=Object.fromEntries(bank.map(q=>[q.id,q]));
const names={past:'Past · времена прошлого',present:'Present · времена настоящего',all:'Все времена · смысловые контрасты'};
const TOTAL=track==='all'?30:60,KEY='milana_'+(track==='all'?'all_tenses':track)+'_course_v1',ACK='milana_cloud_course_ack_'+track+'_v1';
const WRITER='milana_future_cloud_writer_v1',API=String(window.MILANA_RESULTS_API||'').replace(/\/+$/,'');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const rand=a=>{const s=a.slice();for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]];}return s;};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}};
const state=read(KEY,{schema:1,history:[],active:null});
if(!Array.isArray(state.history))state.history=[];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){console.error('Не удалось сохранить результат',e)}};
function pick(){
 if(track==='all'){
  // Every 30-question pass covers all twenty meaning contrasts: ten twice, ten once.
  const ids=[];for(let group=0;group<20;group++){
   const pool=rand(bank.slice(group*5,(group+1)*5));
   ids.push(...pool.slice(0,group<10?2:1).map(q=>q.id));
  }
  return rand(ids);
 }
 const counts={order:6,simple:11,continuous:11,perfect:11,perfect_cont:11,mixed:10};
 return Object.entries(counts).flatMap(([g,n])=>rand(bank.filter(q=>q.group===g)).slice(0,n).map(q=>q.id));
}
function pass(){
 const run=state.history.reduce((m,h)=>Math.max(m,h.run||0),state.active?.run||0)+1;
 return {run,started:new Date().toISOString(),ids:pick(),entries:{},complete:false,archived:false};
}
if(!state.active){state.active=pass();save();}
const cur=()=>state.active;
function entry(id){return cur().entries[id]||(cur().entries[id]={checked:false,values:[],order:[]})}
function numDone(){return cur().ids.filter(id=>entry(id).checked).length;}
function score(){return cur().ids.filter(id=>entry(id).correct).length;}
function full(q,vals=q.ans){
 if(q.kind==='single')return (q.prefix+String(vals[0]||'')+q.suffix).replace(/\s{2,}/g,' ');
 if(q.kind==='contrast')return q.pair.map((p,i)=>(p.prefix+String(vals[i]||'')+p.suffix).replace(/\s{2,}/g,' ')).join('\n');
 return q.correct;
}
function grammarChoice(chosen,correct){
 if(/(?:did|does|do)\s*$/i.test(chosen))return 'После do/does/did смысловой глагол употребляется в V1: вспомогательный глагол уже содержит нужную грамматическую информацию.';
 if(/\b(?:had been|have been|has been|will have been)\b/.test(chosen))return 'Конструкция Perfect Continuous подчёркивает длительность процесса до некоторой точки отсчёта. Для неё нужна вся цепочка вспомогательных глаголов и V-ing.';
 if(/\b(?:had|will have|have|has)\b/.test(chosen))return 'Perfect обычно показывает результат или предыдущий опыт относительно некоторой точки отсчёта. После have/had требуется V3. Ищи ориентир в полном предложении.';
 if(/\b(?:was|were|am|is|are|will be)\b/.test(chosen))return 'Continuous показывает разворачивающийся процесс или временное событие, не просто любое русское «делала» или «делаю». Нужна форма be + V-ing.';
 if(/\bwill\b/.test(chosen))return 'Will сам по себе переносит действие в будущее, но может не подходить, если задан прошлый ориентир или придаточное времени/условия после when/if.';
 return 'Сначала проверь временную точку отсчёта и смысловую роль предложения. Затем проверь форму основного глагола: V1, V2, V3 или -ing.';
}
function notes(q,e){
 const ok=!!e.correct,correct=full(q),chosen=q.kind==='order'?(e.order||[]).map(i=>q.words[i]).join(' '):full(q,e.values||[]);
 let out='<div class="feedback"><b>'+(ok?'✅ Правильно — почему?':'🔎 Разбор: что нужно изменить')+'</b>';
 out+='<p><b>Правильное предложение целиком:</b><span class="en">'+esc(correct).replace(/\n/g,'<br>')+'</span></p>';
 if(q.kind==='contrast'){out+='<p><b>Полный перевод обеих частей:</b></p>'+q.translations.map((x,i)=>'<p>'+(i+1)+'. '+esc(x)+'</p>').join('')}
 else out+='<p class="translation"><b>Перевод:</b> '+esc(q.translation||q.ru)+'</p>';
 if(!ok){
  out+='<div class="error"><b>Твой выбранный вариант целиком:</b><span class="en">'+esc(chosen).replace(/\n/g,'<br>')+'</span></div>';
  if(q.kind!=='order')q.ans.forEach((correct,i)=>{
   const selected=e.values?.[i];if(selected===correct)return;
   out+='<p><b>Пропуск '+(i+1)+':</b> выбрано «'+esc(selected)+'», здесь нужно «'+esc(correct)+'».</p>';
   out+='<p>'+esc(grammarChoice(selected,correct))+'</p>';
  });
  if(q.kind==='order')out+='<p><b>Порядок слов:</b> '+esc(q.explain)+'</p>';
  else out+='<p><b>Почему выбранное время меняет смысл:</b> '+esc(q.wrongRule||q.explain)+'</p>';
 }
 out+='<p><b>Почему правильная конструкция:</b> '+esc(q.explain)+'</p>';
 if(q.form)out+='<p><b>Как строится:</b> '+esc(q.form)+'</p>';
 out+='<div class="pairs">';
 for(const sample of (q.contrasts||[]).slice(0,3))if(sample?.en)out+='<div class="pair"><span class="en">'+esc(sample.en)+'</span><span class="ru">'+esc(sample.ru)+'</span></div>';
 out+='</div></div>';
 return out;
}
function option(q,i,e){return '<select aria-label="'+esc(q.options[i].label)+'" '+(e.checked?'disabled':'')+' onchange="choose(\''+q.id+'\','+i+',this.value)">'+
 '<option value="">Выбери форму…</option>'+q.options[i].choices.map(v=>'<option value="'+esc(v)+'" '+(e.values[i]===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select>';}
function renderQuestion(q,n){
 const e=entry(q.id);if(!Array.isArray(e.values))e.values=[];
 let body='';
 if(q.kind==='single')body='<div class="sentence">'+esc(q.prefix)+option(q,0,e)+esc(q.suffix)+'</div>';
 else if(q.kind==='contrast')body=q.pair.map((p,i)=>'<div class="answerline"><b>Ситуация '+(i+1)+':</b><div class="sentence">'+esc(p.prefix)+option(q,i,e)+esc(p.suffix)+'</div></div>').join('');
 else{
  if(!Array.isArray(e.order))e.order=[];
  const used=new Set(e.order),unused=q.words.map((_,i)=>i).filter(i=>!used.has(i));
  const chip=(idx,side)=>'<button type="button" class="token" '+(e.checked?'disabled':'')+' onclick="moveWord(\''+q.id+'\','+idx+',\''+side+'\')">'+esc(q.words[idx])+'</button>';
  body='<p class="muted">Нажимай на слова по порядку. Нажатие на выбранное слово возвращает его назад.</p><div class="tokens">'+e.order.map(i=>chip(i,'out')).join('')+'</div><div class="tokens">'+unused.map(i=>chip(i,'in')).join('')+'</div>';
 }
 return '<article class="q '+(e.checked?'done ':'')+(e.checked&&!e.correct?'bad':'')+'" id="q-'+q.id+'"><div class="qid">Задание '+n+' из '+TOTAL+' · '+(q.group==='order'?'порядок слов':q.group==='contrast'?'сопоставление двух ситуаций':q.group)+'</div>'+
 '<div class="prompt">'+esc(q.ru)+'</div>'+body+
 '<button class="btn primary" '+(e.checked?'disabled':'')+' onclick="check(\''+q.id+'\')">'+(e.checked?'Проверено ✓':'Проверить')+'</button>'+
 (e.checked?notes(q,e):'')+'</article>';
}
function showTheory(){
 const theory=window.MILANA_COURSE_THEORY[track];
 const rows=theory.map((t,i)=>'<section class="card theory"><h2>'+(i+1)+'. '+esc(t.title)+'</h2><div class="highlight"><b>Главная мысль:</b> '+esc(t.idea)+'</div><h3>Как образуется</h3><p>'+esc(t.rules)+'</p>'+
 (t.signal?'<h3>Когда выбирать</h3><p>'+esc(t.signal)+'</p>':'')+
 '<h3>Полные примеры, переводы и смысловые контрасты</h3><div class="pairs">'+t.examples.map(([en,ru])=>'<div class="pair"><span class="en">'+esc(en)+'</span><span class="ru">'+esc(ru)+'</span></div>').join('')+'</div></section>').join('');
 return '<div class="card"><h2>'+esc(names[track])+'</h2><p>'+(track==='all'?'100 самостоятельных заданий на сравнение реальных смысловых ситуаций. В одном проходе — 30 заданий, 20 разных смысловых контрастов.':'383 задания в банке: 4 времени, смешанные ситуации и порядок слов. Один проход — 60 заданий, как в Future.')+'</p><button class="btn primary" onclick="openPane(\'practice\')">К заданиям →</button></div>'+rows;
}
function showPractice(){
 let ids=cur().ids;
 if(track!=='all'){
 const groups=['order','simple','continuous','perfect','perfect_cont','mixed'];
 let s='<div class="card"><h2>Проход №'+cur().run+'</h2><p class="bankmeta">Проверено '+numDone()+'/'+TOTAL+' · верно с первого раза '+score()+'/'+TOTAL+'.</p>'+
 '<p>Выбор сохраняется сразу, первый проверенный ответ не переписывается. Ни одной кнопки сброса незавершённого прохода.</p>';
 if(cur().complete)s+='<p class="ok"><b>✅ Проход завершён и сохранён.</b></p><button class="btn primary" onclick="newPass()">Начать следующий проход</button>';
 s+='</div>';
 for(const g of groups){
  const arr=ids.filter(id=>byId[id]?.group===g),titles={order:'0. Порядок слов',simple:'1. Past/Present Simple',continuous:'2. Continuous',perfect:'3. Perfect',perfect_cont:'4. Perfect Continuous',mixed:'5. Смешанные времена и ситуации'};
  s+='<section class="card"><h2>'+titles[g]+'</h2><p class="muted">Заданий '+arr.length+', проверено '+arr.filter(id=>entry(id).checked).length+'.</p></section>';
  arr.forEach((id,i)=>s+=renderQuestion(byId[id],ids.indexOf(id)+1));
 }
 return s;
 }
 let s='<div class="card"><h2>Все времена · проход №'+cur().run+'</h2><p class="bankmeta">Проверено '+numDone()+'/30 · верно '+score()+'/30.</p><p>Это отдельные задания на сравнение двух фраз. Для правильного ответа нужно точно выбрать обе формы и понять, как меняется смысл.</p>';
 if(cur().complete)s+='<p class="ok">✅ Все 30 заданий завершены.</p><button class="btn primary" onclick="newPass()">Новый случайный проход (30 других сочетаний)</button>';
 s+='</div>';
 ids.forEach((id,i)=>s+=renderQuestion(byId[id],i+1));
 return s;
}
function checkedAnswer(id){
 const q=byId[id],e=entry(id);if(!q||e.checked)return;
 if(q.kind==='order'){if(e.order.length!==q.words.length){alert('Сначала расставь все слова.');return;}e.correct=e.order.every((x,i)=>x===i)}
 else {if(!e.values||e.values.length!==q.ans.length||e.values.some(v=>!v)){alert('Выбери вариант для каждого пропуска.');return;}e.correct=e.values.every((v,i)=>v===q.ans[i]);}
 e.checked=true;e.checkedAt=new Date().toISOString();
 if(numDone()===TOTAL&&!cur().archived){
  const active=cur();active.complete=true;active.archived=true;
  const h={run:active.run,started:active.started,finished:new Date().toISOString(),ids:[...active.ids],entries:JSON.parse(JSON.stringify(active.entries)),score:score(),total:TOTAL};
  state.history.unshift(h);
 }
 save();if(selectedPane==='practice'){render();document.getElementById('q-'+id)?.scrollIntoView({block:'center',behavior:'smooth'})}
 if(cur().complete)syncCloud();
}
function newPass(){if(!cur().complete)return;state.active=pass();save();selectedPane='practice';render();window.scrollTo(0,0)}
function choose(id,i,v){const e=entry(id);if(e.checked)return;e.values[i]=v;save();}
function moveWord(id,idx,side){const e=entry(id);if(e.checked)return;if(side==='in'){if(!e.order.includes(idx))e.order.push(idx)}else e.order=e.order.filter(i=>i!==idx);save();render();document.getElementById('q-'+id)?.scrollIntoView({block:'center',behavior:'instant'})}
function showHistory(){
 if(!state.history.length)return '<div class="card"><h2>Мои проходы · '+esc(names[track])+'</h2><p>Пока нет завершённых проходов. Начатые ответы сохраняются в этом браузере.</p></div>';
 return '<div class="card"><h2>Мои проходы · '+esc(names[track])+'</h2><p>История этого раздела хранится отдельно от остальных. Проверенные ответы и оценки первых попыток не пересчитываются.</p></div>'+
 state.history.map(h=>'<details class="card"><summary>Проход №'+h.run+' · '+esc(new Date(h.finished).toLocaleString('ru-RU'))+' · '+h.score+'/'+h.total+'</summary>'+
 '<p class="statgrid"><span class="stat"><b>'+h.score+'/'+h.total+'</b>правильно</span><span class="stat"><b>'+(h.total-h.score)+'</b>ошибок</span></p>'+
 h.ids.filter(id=>!h.entries[id]?.correct).map(id=>{
  const q=byId[id],e=h.entries[id];return q?'<details class="historyrow"><summary>'+esc(q.ru)+'</summary>'+notes(q,e)+'</details>':'';
 }).join('')+'<details class="historyrow"><summary>Показать все вопросы этого прохода</summary>'+
 h.ids.map(id=>byId[id]?'<div class="historyrow"><p><b>'+esc(byId[id].ru)+'</b></p>'+notes(byId[id],h.entries[id])+'</div>':'').join('')+'</details></details>').join('');
}
let selectedPane='theory',syncBusy=false,lastSync=0;
function render(){
 document.querySelectorAll('.tabbtn').forEach((b,i)=>b.classList.toggle('active',['theory','practice','history','public'][i]===selectedPane));
 const target=document.getElementById('content');
 if(selectedPane==='theory')target.innerHTML=showTheory();
 else if(selectedPane==='practice')target.innerHTML=showPractice();
 else if(selectedPane==='history')target.innerHTML=showHistory();
 else{target.innerHTML='<div class="card"><h2>Общие проходы · '+esc(names[track])+'</h2><p id="cloud-status">Загружаю общую историю…</p><div id="cloud-runs"></div></div>';renderCloud()}
}
function openPane(which){selectedPane=which;render();window.scrollTo({top:0,behavior:'smooth'});}
async function digest(h){const x=new TextEncoder().encode([h.started,h.finished,h.run].join('|'));const v=new Uint8Array(await crypto.subtle.digest('SHA-256',x));return Array.from(v,b=>b.toString(16).padStart(2,'0')).join('');}
function storedWriter(){
 let writer='';
 try{const p=new URLSearchParams(location.hash.slice(1));writer=p.get('writer')||'';
 if(writer){localStorage.setItem(WRITER,writer);history.replaceState(null,'',location.pathname+location.search)}
 else writer=localStorage.getItem(WRITER)||'';}catch{}
 return writer;
}
function payload(q,e){
 const chosen=q.kind==='order'?(e.order||[]).map(i=>q.words[i]).join(' '):full(q,e.values);
 const expected=full(q);
 const wrongParts=(q.kind==='order'?[]:q.ans.map((ans,i)=>({chosen:e.values[i],expected:ans,why:q.wrongRule||q.explain})).filter((p,i)=>e.values[i]!==q.ans[i]));
 return {id:q.id,group:q.group,prompt:q.ru,correct:!!e.correct,chosen,expected,explanation:q.explain+'\nПОЛНОЕ ПРАВИЛЬНОЕ ПРЕДЛОЖЕНИЕ: '+expected+'\nПЕРЕВОД: '+(q.translation||'')+'\nСРАВНЕНИЕ: '+(q.contrasts||[]).map(x=>x.en+' — '+x.ru).join(' / '),wrongParts,
  fullSentence:expected,translation:q.translation||'',examples:q.contrasts||[]};
}
async function syncCloud(){
 if(syncBusy||!API||!storedWriter()||!state.history.length)return;
 if(Date.now()-lastSync<7000)return;lastSync=Date.now();syncBusy=true;
 try{
  const acks=new Set(read(ACK,[]));
  for(const h of [...state.history].reverse()){
   const id=await digest(h);if(acks.has(id))continue;
   const questions=h.ids.map(qid=>payload(byId[qid],h.entries[qid]));
   const body={schema:1,track,id,runNumber:h.run,started:h.started,finished:h.finished,score:h.score,total:TOTAL,
    slots:questions.reduce((n,q)=>n+(byId[q.id]?.ans.length||1),0),
    goodSlots:questions.reduce((n,q)=>n+(q.correct?(byId[q.id]?.ans.length||1):0),0),questions};
   const r=await fetch(API+'/api/runs',{method:'POST',headers:{'Content-Type':'application/json','X-Milana-Key':storedWriter()},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
   const data=await r.json().catch(()=>({}));if(!r.ok||!data.ok)throw Error(data.error||'Ошибка синхронизации '+r.status);
   acks.add(id);try{localStorage.setItem(ACK,JSON.stringify([...acks]))}catch{}
  }
 }catch(e){console.warn('Синхронизация '+track+':',e.message)}finally{syncBusy=false;}
}
async function renderCloud(){
 const status=document.getElementById('cloud-status'),box=document.getElementById('cloud-runs');if(!status||!box)return;
 if(!API){status.textContent='Общий сервер результатов не настроен.';return;}
 try{
  const r=await fetch(API+'/api/runs',{cache:'no-store'});if(!r.ok)throw Error('Сервер '+r.status);
  const data=await r.json(),list=(data.runs||[]).filter(x=>(x.track||'future')===track);
  status.textContent=list.length?'Сохранено завершённых проходов: '+list.length:'Для этого раздела ещё нет завершённых общих проходов. Старые проходы Future находятся отдельно.';
  box.innerHTML=list.map((h,i)=>'<details class="historyrow"><summary>Проход №'+esc(h.run)+' · '+esc(new Date(h.finished).toLocaleString('ru-RU'))+' · '+h.score+'/'+h.total+'</summary>'+
  '<button class="btn" onclick="loadPublic(\''+h.id+'\')">Показать предложения, ответы и ошибки</button><div id="run-'+h.id+'"></div></details>').join('');
 }catch(e){status.textContent='Не удалось загрузить: '+e.message;}
}
async function loadPublic(id){
 const box=document.getElementById('run-'+id);if(!box)return;box.textContent='Загружаю подробности…';
 try{
  const r=await fetch(API+'/api/runs/'+id,{cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);
  const h=await r.json();
  box.innerHTML='<h3>Сначала ошибки</h3>'+h.questions.filter(q=>!q.correct).map(p=>publicItem(p)).join('')+
   '<details class="historyrow"><summary>Показать все '+h.questions.length+' заданий</summary>'+h.questions.map(publicItem).join('')+'</details>';
 }catch(e){box.textContent='Не удалось получить подробности: '+e.message;}
}
function publicItem(p){
 const q=byId[p.id];
 if(q){
  const e={checked:true,correct:p.correct,values:q.kind==='contrast'?p.chosen.split('\n').map((_,i)=>q.ans[i]):[],order:[]};
  return '<div class="historyrow"><h4>'+esc(p.prompt)+'</h4><p><b>Верно:</b> '+(p.correct?'да':'нет')+'</p><p><b>Выбрано:</b> '+esc(p.chosen).replace(/\n/g,'<br>')+'</p><p><b>Полностью правильно:</b> '+esc(p.expected).replace(/\n/g,'<br>')+'</p><p><b>Перевод:</b> '+esc(p.translation||q.translation)+'</p><p>'+esc(p.explanation)+'</p><div class="pairs">'+(p.examples||q.contrasts||[]).slice(0,3).map(ex=>'<div class="pair"><span class="en">'+esc(ex.en)+'</span><span class="ru">'+esc(ex.ru)+'</span></div>').join('')+'</div></div>';
 }
 return '<div class="historyrow"><b>'+esc(p.prompt)+'</b><p>Выбрано: '+esc(p.chosen)+'</p><p>Верно: '+esc(p.expected)+'</p><p>'+esc(p.explanation)+'</p></div>';
}
document.querySelectorAll('[data-track]').forEach(a=>a.classList.toggle('current',a.dataset.track===track));
document.getElementById('tagline').textContent=names[track]+' · '+bank.length+' заданий в банке · '+TOTAL+' в одном проходе · отдельная история';
window.openPane=openPane;window.choose=choose;window.check=checkedAnswer;window.moveWord=moveWord;window.newPass=newPass;window.loadPublic=loadPublic;
window.addEventListener('online',()=>syncCloud());window.addEventListener('pageshow',()=>syncCloud());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncCloud()});
setInterval(()=>syncCloud(),15000);
render();setTimeout(()=>syncCloud(),1200);
})();