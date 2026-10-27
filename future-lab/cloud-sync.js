/** Non-invasive browser-to-cloud sync; NEVER changes the original progress key. */
(()=>{
'use strict';
const ORIGINAL_KEY='milana_future_lab_330_v1';
const ACK_KEY='milana_future_cloud_ack_v1';
const WRITER_KEY='milana_future_cloud_writer_v1';
const API=String(window.MILANA_RESULTS_API||'').replace(/\/+$/,'');
const msg=document.getElementById('cloud-status');
const status=(t)=>{if(msg)msg.textContent=t};
let inFlight=false, nextTry=0, queued=false, retryTimer=null;
function safeJSON(v,fallback){try{return JSON.parse(v)}catch{return fallback}}
function getWriter(){let fromUrl=new URLSearchParams(location.hash.slice(1)).get('writer');
 if(fromUrl){try{localStorage.setItem(WRITER_KEY,fromUrl)}catch{}
  const u=new URL(location.href);u.hash='';
  try{history.replaceState(null,'',u.pathname+u.search+u.hash)}catch{}
  status('Личная синхронизация включена. Сохранённые проходы отправляются в облако.');
  return fromUrl;
 }
 try{return localStorage.getItem(WRITER_KEY)||''}catch{return ''}
}
const writer=getWriter();
async function runId(h){const s=`${h.started}|${h.finished}|${h.run}`;
const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function detailsFor(q,e){return (e.details||[]).filter(x=>!x.ok).map((d,i)=>{
const index=(e.details||[]).indexOf(d);
const feedback=q.feedback?.[String(index)]?.[d.chosen]||q.feedback?.[index]?.[d.chosen]||'';
return {chosen:String(d.chosen||''),expected:String(d.good||''),why:String(feedback||'Неверная форма глагола или порядок слов.')};
}).slice(0,10)}
async function convert(h){
 if(!h || !Array.isArray(h.ids)||h.ids.length!==60||!h.entries||!window.crypto?.subtle)return null;
 const qById=typeof byId!=='undefined'?byId:{};
 const rows=h.ids.map(id=>{
   const q=qById[id],e=h.entries[id];
   if(!q||!e?.checked)return null;
   const order=id.startsWith('order-');
   return {
     id,group:order?'order':q.group,
     prompt:String(q.ru||''),correct:!!e.correct,
     chosen:order?(e.order||[]).map(i=>q.words[i]).join(' '):(e.values||[]).join(' | '),
     expected:order ? String(q.correct) : (q.ans||[]).join(' | '),
     explanation:String(q.explain||''),
     wrongParts: order ? [] : detailsFor(q,e)
   }
 });
 if(rows.some(x=>!x)) return null;
 return {
  schema:1,id:await runId(h),runNumber:h.run,started:h.started,finished:h.finished,
  score:rows.filter(x=>x.correct).length,total:60,slots:h.slots,goodSlots:h.goodSlots,
  questions:rows
 };
}
async function sync(trigger='interval'){
 if(!API){status('Общие результаты пока не подключены к серверу. Локальные ответы сохранены.');return}
 if(!writer){status('Публичный просмотр доступен всем. Для автоматической отправки Милана один раз открывает личную ссылку.');return}
 if(inFlight){queued=true;return}
 if(Date.now()<nextTry && trigger!=='complete' && trigger!=='manual')return;
 const progress=safeJSON(localStorage.getItem(ORIGINAL_KEY),null);
 if(!Array.isArray(progress?.history)||!progress.history.length){status('Пока нет завершённых проходов. Прогресс продолжает сохраняться в браузере.');return}
 const acks=new Set(safeJSON(localStorage.getItem(ACK_KEY),'[]')||[]);
 inFlight=true;
 let done=0, skipped=0;
 try{
  for(const h of [...progress.history].reverse()){
   const r=await convert(h);if(!r){skipped++;continue;}if(acks.has(r.id))continue;
   status(`⏳ Проход №${h.run}: отправляю в общие результаты…`);
   const reply=await fetch(API+'/api/runs',{
     method:'POST',mode:'cors',cache:'no-store',headers:{'Content-Type':'application/json','X-Milana-Key':writer},
     body:JSON.stringify(r),signal:AbortSignal.timeout(25000)
   });
   const data=await reply.json().catch(()=>({}));
   if(!reply.ok || !data.ok)throw Error(data.error||`Сервер ${reply.status}`);
   acks.add(r.id);done++;
   localStorage.setItem(ACK_KEY,JSON.stringify([...acks]));
  }
  status(done?`✅ ${done===1?'Проход сохранён':'Проходы сохранены'} в общей истории: ${done}. Можно смотреть ответы и ошибки с другого устройства.`:skipped?`⚠️ ${skipped} завершённых проходов пока не удалось прочитать для переноса. Старые ответы не изменены.`:'✅ Все завершённые проходы доступны в общей истории.');
 }catch(err){
  console.warn('Future Lab cloud sync:',err);
  status('⚠️ Сервер пока недоступен ('+String(err.message).slice(0,90)+'). Локальные ответы не потеряны; повторю отправку.');
  nextTry=Date.now()+10000;
  if(retryTimer)clearTimeout(retryTimer);
  retryTimer=setTimeout(()=>{retryTimer=null;sync('retry')},10500);
 }finally{
  inFlight=false;
  if(queued){queued=false;queueMicrotask(()=>sync('queued'))}
 }
}
// Read existing localStorage on every page load and regularly thereafter; never mutate its state.
window.addEventListener('load',()=>{setTimeout(()=>sync('load'),700);setInterval(()=>sync('interval'),10000)});
window.addEventListener('milana:run-completed',()=>{
 nextTry=0;
 status('⏳ Проход проверен, отправляю в общую историю автоматически…');
 sync('complete');
});
window.addEventListener('online',()=>sync('online'));
window.addEventListener('pageshow',()=>sync('pageshow'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>sync('visible'),300)});
window.milanaSyncNow=()=>sync('manual');
})();
