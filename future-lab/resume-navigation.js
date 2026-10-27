/* Future Lab mobile navigation and progress recovery, October 2026.
 * Works with original storage key. No existing responses/ids are reset or replaced. */
(function(){
'use strict';
if(typeof state==='undefined'||typeof GROUPS==='undefined'||typeof renderStudy!=='function')return;
var RULE='milana-future-resume-20261027';
if(document.getElementById(RULE))return;
var style=document.createElement('style');style.id=RULE;
style.textContent=[
'.next-control{position:fixed;z-index:45;bottom:calc(10px + env(safe-area-inset-bottom,0px));left:max(10px,calc((100vw - 1000px)/2));right:max(10px,calc((100vw - 1000px)/2));background:#ecfff7;box-shadow:0 7px 22px #152c3b44;border:1px solid #9ed0b5;border-radius:15px;padding:8px 10px;display:flex;align-items:center;gap:10px}',
'.next-control[hidden]{display:none!important}.next-control span{color:#27624a;font-size:13px;font-weight:750;min-width:105px}',
'.next-control button{min-height:44px;flex:1;background:#166646;border:0;border-radius:11px;padding:8px 12px;font-weight:800;color:white;font-size:15px}',
'.next-card{margin:12px 0 0;background:#eaf8f1;border:1px solid #a4d9bb;border-radius:12px;padding:11px 13px;display:flex;flex-wrap:wrap;align-items:center;gap:10px}',
'.next-card strong{color:#265744;font-size:14px}.next-card button{border:0;border-radius:11px;background:#166646;color:white;font-weight:750;padding:10px 13px;min-height:44px;flex:1}',
'.inline-alert{margin:10px 0;padding:13px;border:2px solid #c43b42;border-radius:12px;background:#fff2f2;color:#87252c;font-size:15px;line-height:1.5;font-weight:650}',
'.question select.missing-choice{outline:3px solid #c43b42;outline-offset:2px;background:#fffafa}',
'.next-highlight{outline:3px solid #62b491;outline-offset:5px}',
'@media(max-width:500px){.next-control{padding:7px;gap:6px}.next-control span{min-width:85px;font-size:12px}.next-control button{font-size:14px;padding:10px 8px}}'
].join('\n');
document.head.appendChild(style);
function a(){return state.active}
function ids(){return Array.isArray(a()?.ids)?a().ids:[]}
function completedCount(){return ids().filter(function(id){return !!a().entries?.[id]?.checked}).length}
function next(){
 const all=ids();for(var i=0;i<all.length;i++){if(!a().entries?.[all[i]]?.checked)return {id:all[i],index:i+1}}
 return null;
}
function extendLegacyPass(){
 const run=a();if(!run||run.complete||!Array.isArray(run.ids)||run.ids.length>=60)return 0;
 // Add ONLY missing questions. Preserve each old id, old answer, order and history.
 const existing=new Set(run.ids),prev=new Set((state.history||[]).flatMap(function(h){return h.ids||[]}));
 var added=0;
 for(const g of GROUPS){
   const pool=(g.id==='order'?BANK.order:BANK.questions.filter(function(q){return q.group===g.id})).map(function(q){return q.id});
   const have=run.ids.filter(function(id){return pool.includes(id)}).length;
   const wanted=Math.max(0,g.count-have);
   if(!wanted)continue;
   const candidates=pool.filter(function(id){return !existing.has(id)});
   const selection=candidates.filter(function(id){return !prev.has(id)}).concat(candidates.filter(function(id){return prev.has(id)})).slice(0,wanted);
   for(const id of selection){run.ids.push(id);existing.add(id);added++}
 }
 if(added)save();
 return added;
}
function displayContinue(){
 let el=document.getElementById('milana-next-float');
 if(!el){el=document.createElement('aside');el.id='milana-next-float';el.className='next-control';el.setAttribute('aria-label','Продолжение теста');document.body.appendChild(el)}
 const n=state.tab==='study'?next():null;
 if(!n){el.hidden=true;el.innerHTML='';return}
 el.hidden=false;
 el.innerHTML='<span>Проверено '+completedCount()+' из 60</span><button type="button" onclick="goNextUnchecked()">▶ Вопрос №'+n.index+' из 60 →</button>';
 const study=document.getElementById('study');
 if(!study)return;
 let card=study.querySelector('.card');if(!card)return;
 let inline=card.querySelector('.next-card');
 if(!inline){inline=document.createElement('div');inline.className='next-card';card.appendChild(inline)}
 inline.innerHTML='<strong>Осталось '+(60-completedCount())+' заданий</strong><button type="button" onclick="goNextUnchecked()">▶ Продолжить с №'+n.index+'</button>';
}
function selectNext(){
 let p=next();
 if(!p){
  if(a()?.complete){showTab('history');return}
  banner('Все вопросы выбраны. Проверь, что все ответы отмечены проверенными.');return;
 }
 const q=byId[p.id];
 if(!q){banner('Не удалось показать вопрос №'+p.index+'. Твои ответы сохранены.');return}
 const g=p.id.startsWith('order-')?'order':q.group;
 const section=GROUPS.findIndex(function(x){return x.id===g});
 if(section<0){banner('Неизвестный раздел; ответы сохранены.');return}
 state.section=section;state.tab='study';save();render();
 requestAnimationFrame(function(){
  const item=document.getElementById('item-'+p.id);
  if(item){item.classList.add('next-highlight');item.scrollIntoView({block:'start',behavior:'smooth'});setTimeout(function(){item.classList.remove('next-highlight')},1800)}
  else window.scrollTo({top:0,behavior:'smooth'});
 });
}
window.goNextUnchecked=selectNext;
function warning(id,text,selector){
 const el=document.getElementById('item-'+id);if(!el)return;
 let w=el.querySelector('.inline-alert');
 if(!w){w=document.createElement('div');w.className='inline-alert';w.setAttribute('role','alert');el.querySelector('.qactions')?.insertAdjacentElement('beforebegin',w)}
 w.textContent=text;
 let target=selector||w;
 try{target.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){w.scrollIntoView()}
}
const originalCheckItem=checkItem;
checkItem=function(id){
 const q=byId[id],e=entry(id);if(!q||e.checked)return;
 const empty=q.ans.findIndex(function(_,i){return !e.values?.[i]});
 if(empty>=0){
  const article=document.getElementById('item-'+id);
  const selects=article?[...article.querySelectorAll('select')]:[];
  selects.forEach(function(s,i){s.classList.toggle('missing-choice',!e.values?.[i])});
  warning(id,'⚠️ Пропуск №'+(empty+1)+' не заполнен. Здесь нужно выбрать вариант во ВСЕХ пропусках. Остальные ответы уже сохранены.',selects[empty]);
  return;
 }
 originalCheckItem(id);
};
const originalSetValue=setValue;
setValue=function(id,i,v){
 originalSetValue(id,i,v);
 const el=document.getElementById('item-'+id);
 if(!el)return;
 const e=entry(id),q=byId[id];
 el.querySelectorAll('select').forEach(function(s,j){s.classList.toggle('missing-choice',!e.values?.[j])});
 if(q&&q.ans.every(function(_,j){return !!e.values?.[j]}))el.querySelector('.inline-alert')?.remove();
};
const originalCheckOrder=checkOrder;
checkOrder=function(id){
 const q=byId[id],e=entry(id);
 if(q&&!e.checked&&(e.order||[]).length!==q.words.length){
  warning(id,'⚠️ Осталось '+(q.words.length-(e.order||[]).length)+' слов. Добавь все слова в предложение, затем нажми «Проверить». Уже собранные слова сохранены.');
  return;
 }
 originalCheckOrder(id);
};
const originalRenderStudy=renderStudy;
renderStudy=function(){
 if(!Number.isInteger(state.section)||state.section<0||state.section>=GROUPS.length)state.section=0;
 originalRenderStudy();
 displayContinue();
};
const originalRender=render;
render=function(){originalRender();displayContinue()};
const originalGoSection=goSection;
goSection=function(n){originalGoSection(Math.max(0,Math.min(GROUPS.length-1,Number(n)||0)));displayContinue()};
const restored=extendLegacyPass();
if(restored){banner('Восстановлено недостающих заданий: '+restored+'. Старые ответы и история сохранены.')}
if(state.tab==='study'&&a())renderStudy();else displayContinue();
})();