/* Read-only expanded grammar explanations. No writes to any saved results. */
(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function full(q,parts){
 if((Array.isArray(q.words)&&q.words.length>0))return q.id==='order-018'?'If it rains, we will stay at home.':q.correct;
 const ans=parts||q.ans||[];
 if(q.kind==='single')return String(q.prefix||'')+String(ans[0]||'')+String(q.suffix||'');
 if(Array.isArray(q.display))return q.display.map((seg,i)=>seg+(i<ans.length?String(ans[i]||''):'')).join('');
 return '';
}
function translate(q){
 const text=String(q.explain||'');
 const m=text.match(/(?:^|\n)ПЕРЕВОД(?: ВСЕГО ПРЕДЛОЖЕНИЯ)?:\s*([^\n]+)/i);
 const n=text.match(/Перевод правильного предложения:\s*«([^»]+)»/i);
 if(m)return m[1].trim().replace(/^«|»\.?$/g,'').replace(/[.]+$/,'')+'.';
 if(n)return n[1].trim().replace(/[.]+$/,'')+'.';
 return q.ru||'';
}
function sample(en,ru){return [en,ru]}
function contrasts(q){
 const prefix=q.prefix||'',s=full(q);
 if(q.id==='order-018')return [sample('If it rains, we will stay at home.','Если пойдёт дождь, мы останемся дома.'),sample('It is raining now.','Сейчас идёт дождь: это процесс, поэтому is raining.')];
 if(/Официальное расписание/.test(q.ru||''))return [sample(s,translate(q)),sample('I am meeting Anna at ten tomorrow.','Завтра в десять я встречаюсь с Анной: личная договорённость, а не расписание учреждения.')];
 if(/when she/i.test(prefix))return [sample(s,translate(q)),sample('She is meeting Anna now.','Сейчас она встречается с Анной: отдельное сообщение о происходящем процессе.')];
 if(/if he/i.test(prefix))return [sample(s,translate(q)),sample('He is trying to open the door now.','Сейчас он пытается открыть дверь: действие происходит прямо сейчас, а не условие о будущем.')];
 if(/going to/i.test((q.ans||[])[0]||''))return [sample(s,translate(q)),sample('My sister is watching a film now.','Моя сестра сейчас смотрит фильм: процесс, а не заранее принятое намерение.')];
 if(/Личная договорённость/.test(q.ru||''))return [sample(s,translate(q)),sample('Tom studies English every day.','Том занимается английским каждый день: регулярная привычка, Present Simple.')];
 if(q.group==='perfect_cont')return [sample('By six, I will have been working for two hours.','К шести я буду работать уже два часа.'),sample('By six, I will have finished my work.','К шести я уже закончу работу.')];
 if(q.group==='perfect')return [sample('By eight, I will have finished the letter.','К восьми я уже закончу письмо.'),sample('At eight, I will be writing the letter.','В восемь я буду писать письмо.')];
 if(q.group==='continuous')return [sample('At eight tomorrow, I will be reading.','Завтра в восемь я буду читать (процесс).'),sample('By eight, I will have read the book.','К восьми я уже прочитаю книгу (результат).')];
 if((Array.isArray(q.words)&&q.words.length>0))return [sample(s,translate(q)),sample('Will you help me tomorrow?','Ты поможешь мне завтра? В вопросе will стоит перед подлежащим.')];
 if(q.group==='mixed')return [sample(s,translate(q)),sample('If it rains tomorrow, we will stay at home.','Если завтра пойдёт дождь, мы останемся дома: после if — Present Simple.')];
 return [sample('I will read the book tomorrow.','Завтра я прочитаю книгу: будущее действие.'),sample('At eight tomorrow, I will be reading.','Завтра в восемь я буду читать: процесс.')];
}
function reason(q){
 if(q.id==='order-006')return 'Твоя фраза «She will be sleeping tomorrow at ten» грамматически допустима: обстоятельства времени могут располагаться в разном порядке. В эталоне используется «at ten tomorrow», чтобы выделить точное время в будущем. Балл первого ответа не изменяется, но это не ошибка английской грамматики.';
 if(q.id==='order-018')return 'Сначала придаточное условия: If it rains. В английском о погоде обязательно формальное подлежащее it, а rains — Present Simple после if. Затем главная часть: we will stay at home. В ней will + V1 stay, и каждый глагол связан со своим подлежащим. После начального придаточного обычно ставится запятая.';
 if(/Официальное расписание/.test(q.ru||''))return 'Здесь зафиксированное расписание учреждения или транспорта, поэтому Present Simple естественнее. В третьем лице единственного числа прибавляется -s/-es. Форма is + -ing может выражать личную договорённость или процесс в другом контексте, но не это общее правило расписания.';
 if(/when she/i.test(q.prefix||''))return 'Предложение состоит из двух частей: I will call you (будущий звонок) и when she ... (когда наступит другое событие). В придаточном времени после when обычно Present Simple, даже если событие в будущем. She требует -s/-es. Форма is + -ing здесь изменила бы акцент на процесс.';
 if(/if he/i.test(q.prefix||''))return 'Это реальное будущее условие: в главной части I will help you, после if — Present Simple. He требует окончания -s/-es. Не следует автоматически переносить русское будущее в обе части.';
 if(/going to/i.test((q.ans||[])[0]||''))return 'План был принят заранее. «My sister» — третье лицо единственного числа: is going to + V1 see. Will have здесь начал бы другую конструкцию (Future Perfect): will have + V3, результат к будущему сроку.';
 if(/Личная договорённость/.test(q.ru||''))return 'Это заранее организованное действие. Present Continuous здесь обозначает договорённость о будущем: is + studying. Форма is study невозможна в Continuous, потому что после is требуется V-ing.';
 if(q.group==='order')return 'Порядок слов выражает грамматические роли: найди подлежащее и сказуемое; в вопросе вспомогательный глагол часто стоит перед подлежащим, в обычном утверждении — после него.';
 return 'Сначала определяем смысл (будущий факт, процесс, готовый результат, длительность либо договорённость). Затем выбираем вспомогательные глаголы и форму смыслового глагола, а не просто подставляем английскую форму к русскому будущему.';
}
function normalizeChosen(q,chosen){
 if((Array.isArray(q.words)&&q.words.length>0))return typeof chosen==='string'?chosen:'';
 if(Array.isArray(chosen))return chosen;
 if(typeof chosen==='string')return chosen.split(' | ');
 return [];
}
function explanationHTML(q){
 return String(q.explain||'').split(/\n/).map((line,i)=>{
  let t=line.trim().replace(/\s*Перевод правильного предложения:\s*«[^»]+»\.?/ig,'').trim();
  if(!t||/^ПЕРЕВОД(?: ВСЕГО ПРЕДЛОЖЕНИЯ)?:/i.test(t))return '';
  const m=t.match(/^([А-ЯЁ\s—-]{5,}):\s*(.+)$/);
  return '<p>'+(m?'<b>'+esc(m[1])+':</b> '+esc(m[2]):(i===0?'<b>Почему именно так:</b> ':'')+esc(t))+'</p>';
 }).join('');
}
function render(q,chosen,showMistake=true){
 if(!q)return '';
 const selected=normalizeChosen(q,chosen),isOrder=(Array.isArray(q.words)&&q.words.length>0);
 const chosenText=isOrder?selected:full(q,selected);
 const expected=full(q);
 const same=chosenText.trim()===expected.trim();
 let out='<div class="milana-rich"><p><b>Верное предложение:</b><span class="milana-rich-en">'+esc(expected)+'</span></p>';
 out+='<p><b>ПЕРЕВОД:</b> '+esc(translate(q))+'</p>';
 if(showMistake&&!same&&chosenText)out+='<p><b>Твой вариант целиком:</b><span class="milana-rich-en">'+esc(chosenText)+'</span></p><p><b>Почему исправляем:</b> '+esc(reason(q))+'</p>';
 out+='<div class="milana-rich-rules">'+explanationHTML(q)+'</div>';
 if(!showMistake&&!isOrder){selected.forEach((v,i)=>{const f=q.feedback?.[String(i)]?.[v]||'';if(f)out+='<p><b>Почему этот вариант правильный:</b> '+esc(f)+'</p>';});}
 if(showMistake&&!isOrder){selected.forEach((v,i)=>{
   if(v===(q.ans||[])[i]||!v)return;
   const f=q.feedback?.[String(i)]?.[v]||'';
   const lines=f.split(/\n/).filter(x=>x.trim()&&!/ПРАВИЛЬНО В ЭТОМ ПРОПУСКЕ/i.test(x));
   if(lines.length)out+='<p><b>Именно вариант «'+esc(v)+'»:</b> '+esc(lines.join(' '))+'</p>';
 });}
 out+='<div class="milana-rich-examples"><b>Сравни правильные предложения с переводом:</b>';
 const samples=contrasts(q);for(const [en,ru] of samples)out+='<p><span class="milana-rich-en">'+esc(en)+'</span><span>'+esc(ru)+'</span></p>';
 return out+'</div></div>';
}
window.MilanaFeedback={full,translate,render};
})();