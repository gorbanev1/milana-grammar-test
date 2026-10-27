/* Dedicated contrast practice, 55 themed + 40 word order for each course; 100 exclusive all-tenses contrasts. */
(function(){
'use strict';
const B=window.MILANA_COURSE_BANK,V=window.MILANA_COURSE_VERBS;
const G=window.MILANA_COURSE_GRAMMAR;
function add(track,group,v,i,z){
 const opts=[z.answer,...z.wrong].filter((x,k,a)=>a.indexOf(x)===k);
 const rot=i%opts.length;const choices=opts.slice(rot).concat(opts.slice(0,rot));
 B[track].push({id:track+'-'+group+'-'+String(i).padStart(3,'0'),track,group,kind:'single',
 prefix:z.prefix,suffix:z.suffix,ru:z.prompt,ans:[z.answer],options:[{label:'Выбери форму по смыслу',choices}],translation:z.translation,explain:z.why,
 contrasts:[{en:z.prefix+z.answer+z.suffix,ru:z.translation},{en:z.contrast,ru:z.contrastRu}],wrongRule:'Смысл задания отличается от ситуаций, где правильна выбранная другая форма. Сравни законченный факт, процесс и более раннее событие.',form:'Определяем смысл, затем выбираем вспомогательные глаголы и форму основного глагола.'});
}
const pm=[
 v=>({prefix:'When Mum got home, I ',suffix:' '+v.obj+' already. It was done.',answer:'had '+v.v3,wrong:[v.v2,'was '+v.ing,'have '+v.v3],prompt:'К приходу мамы уже готов результат: не процесс и не событие после прихода.',translation:'К приходу мамы я уже '+v.done+'.',why:'Past Perfect относит действие к моменту ДО её возвращения.',contrast:'When Mum came home, I was '+v.ing+' '+v.obj+'.',contrastRu:'Когда мама пришла, я ещё '+v.proc+'.'}),
 v=>({prefix:'When Mum got home, I ',suffix:' '+v.obj+'. I was right in the middle.',answer:'was '+v.ing,wrong:['had '+v.v3,v.v2,'have '+v.v3],prompt:'Мама застала меня посреди действия, а не после него.',translation:'Когда мама вернулась, я '+v.proc+' прямо в тот момент.',why:'Past Continuous — процесс в момент прихода.',contrast:'When Mum came home, I had '+v.v3+' '+v.obj+'.',contrastRu:'К приходу мамы я уже '+v.done+'.'}),
 v=>({prefix:'Last Tuesday, I ',suffix:' '+v.obj+'.',answer:v.v2,wrong:['have '+v.v3,'had '+v.v3,'was '+v.ing],prompt:'Прошлый вторник — завершённый период, просто факт.',translation:'В прошлый вторник я '+v.done+'.',why:'Last Tuesday делает период закрытым: Past Simple.',contrast:'I have '+v.v3+' '+v.obj+' before.',contrastRu:'Я уже занималась этим раньше: опыт без даты.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' for an hour before she arrived.',answer:'had been '+v.ing,wrong:['had '+v.v3,'was '+v.ing,'have been '+v.ing],prompt:'До её прихода процесс длился час: длительность до прошлого.',translation:'До её прихода я '+v.proc+' целый час.',why:'For an hour before she arrived = накопленная длительность к прошлому ориентиру.',contrast:'I had '+v.v3+' '+v.obj+' before she arrived.',contrastRu:'Я уже '+v.done+' до её прихода: результат вместо длительности.'}),
 v=>({prefix:'Yesterday at ten, I ',suffix:' '+v.obj+'; I was still busy.',answer:'was '+v.ing,wrong:[v.v2,'had '+v.v3,'have '+v.v3],prompt:'Вчера в десять процесс ещё продолжался.',translation:'Вчера в десять я '+v.proc+'.',why:'Задан конкретный момент процесса, не итог.',contrast:'Yesterday I '+v.v2+' '+v.obj+'.',contrastRu:'Вчера я '+v.done+': факт о прошлом.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' yesterday, then went home.',answer:v.v2,wrong:['had been '+v.ing,'have '+v.v3,'was '+v.ing],prompt:'Два завершённых действия следуют друг за другом в прошлом.',translation:'Вчера я '+v.done+', затем пошла домой.',why:'And then указывает последовательность, без отдельной более поздней точки отсчёта.',contrast:'Before I went home, I had '+v.v3+' '+v.obj+'.',contrastRu:'Перед уходом я уже закончила: отмечено «раньше другого прошлого».'}),
 v=>({prefix:'I was tired because I ',suffix:' '+v.obj+' for hours beforehand.',answer:'had been '+v.ing,wrong:[v.v2,'had '+v.v3,'was '+v.ing],prompt:'Причина усталости — длинный процесс ДО того момента.',translation:'Я устала, потому что до этого часами '+v.proc+'.',why:'Past Perfect Continuous отражает длительность, завершившуюся или шедшую к прошлому моменту.',contrast:'I was '+v.ing+' '+v.obj+' when you called.',contrastRu:'Я '+v.proc+' во время звонка: процесс в конкретный момент.'}),
 v=>({prefix:'By the time the guests arrived, I ',suffix:' '+v.obj+'.',answer:'had '+v.v3,wrong:['was '+v.ing,v.v2,'have '+v.v3],prompt:'Гости пришли позже, вся работа была завершена до них.',translation:'К приходу гостей я уже '+v.done+'.',why:'By the time обозначает прошлый срок готового результата.',contrast:'When the guests arrived, I was '+v.ing+' '+v.obj+'.',contrastRu:'При гостях я ещё продолжала занятие.'}),
 v=>({prefix:'I did not ',suffix:' '+v.obj+' yesterday.',answer:v.v,wrong:[v.v2,v.v3,v.ing],prompt:'Смысл отрицания в прошлом уже выражен did not.',translation:'Вчера я не стала '+v.ru+'.',why:'После did not требуется V1.',contrast:'Yesterday I '+v.v2+' '+v.obj+'.',contrastRu:'Вчера я '+v.done+': утверждение, нужен V2.'}),
 v=>({prefix:'Had you ',suffix:' '+v.obj+' by the time she arrived?',answer:v.v3,wrong:[v.v,v.v2,v.ing],prompt:'Вопрос о результате до момента в прошлом; Had уже в начале.',translation:'Ты успела '+v.ru+' до её прихода?',why:'Had + you + V3; в Past Perfect не нужен did.',contrast:'Did you '+v.v+' '+v.obj+' yesterday?',contrastRu:'Ты делала это вчера? Просто факт, Past Simple.'}),
 v=>({prefix:'While I ',suffix:' '+v.obj+', someone knocked on the door.',answer:'was '+v.ing,wrong:[v.v2,'had '+v.v3,'have '+v.v3],prompt:'Раздаётся стук во время продолжающегося действия.',translation:'Когда я '+v.proc+', кто-то постучал в дверь.',why:'Фон в Past Continuous и короткое событие в Past Simple.',contrast:'I had '+v.v3+' '+v.obj+' before the knock.',contrastRu:'До стука я уже завершила дело — Past Perfect.'})
];
const prm=[
 v=>({prefix:'I usually ',suffix:' '+v.obj+' on Sundays.',answer:v.v,wrong:['am '+v.ing,'have '+v.v3,'have been '+v.ing],prompt:'Воскресная привычка, не процесс сейчас.',translation:'По воскресеньям я обычно '+v.now+'.',why:'Usually Sundays: повторение Present Simple.',contrast:'I am '+v.ing+' '+v.obj+' now.',contrastRu:'Сейчас я '+v.now+': Present Continuous.'}),
 v=>({prefix:'Look, I ',suffix:' '+v.obj+' right now!',answer:'am '+v.ing,wrong:[v.v,'have '+v.v3,'have been '+v.ing],prompt:'Сейчас виден конкретный процесс.',translation:'Смотри, прямо сейчас я '+v.now+'!',why:'Right now сигнализирует действие в данный момент.',contrast:'I usually '+v.v+' '+v.obj+'.',contrastRu:'Обычно я этим занимаюсь: Present Simple.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' already, so now I can rest.',answer:'have '+v.v3,wrong:[v.v2,'am '+v.ing,'have been '+v.ing],prompt:'Законченное дело и результат сейчас.',translation:'Я уже '+v.done+', так что сейчас могу отдохнуть.',why:'Present Perfect показывает готовый сейчас результат.',contrast:'I have been '+v.ing+' '+v.obj+' for two hours.',contrastRu:'Уже два часа занимаюсь этим; выделена длительность.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' since nine, and I am still busy.',answer:'have been '+v.ing,wrong:['have '+v.v3,'am '+v.ing,v.v2],prompt:'Начала в девять и до сих пор продолжаю. Важна длительность.',translation:'С девяти я '+v.now+' и до сих пор занята.',why:'Since nine и still указывают продолжительность до настоящего.',contrast:'I have '+v.v3+' '+v.obj+'.',contrastRu:'Я уже закончила: Present Perfect, готовый результат.'}),
 v=>({prefix:'She often ',suffix:' '+v.obj+' after breakfast.',answer:v.third,wrong:[v.v,'is '+v.ing,'has '+v.v3],prompt:'Привычка she — нужна форма 3-го лица.',translation:'Она часто '+v.thirdRu+' после завтрака.',why:'Present Simple, he/she/it + -s/-es.',contrast:'She is '+v.ing+' '+v.obj+' now.',contrastRu:'Она занимается этим сейчас: is + -ing.'}),
 v=>({prefix:'She ',suffix:' '+v.obj+' at the moment.',answer:'is '+v.ing,wrong:[v.third,'has '+v.v3,'have '+v.v3],prompt:'Она прямо сейчас в процессе, а не регулярно.',translation:'Прямо сейчас она '+v.thirdRu+'.',why:'At the moment, is + V-ing.',contrast:'She '+v.third+' '+v.obj+' every day.',contrastRu:'Она делает это каждый день — привычка.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' twice this week already.',answer:'have '+v.v3,wrong:[v.v2,'am '+v.ing,'had '+v.v3],prompt:'Эта неделя ещё не закончилась, но уже есть два результата.',translation:'На этой неделе я уже дважды '+v.done+'.',why:'Unfinished period this week → Present Perfect.',contrast:'I '+v.v2+' '+v.obj+' last week.',contrastRu:'На прошлой неделе был завершённый период.'}),
 v=>({prefix:'I ',suffix:' '+v.obj+' all morning and I am exhausted now.',answer:'have been '+v.ing,wrong:['have '+v.v3,'was '+v.ing,'had '+v.v3],prompt:'Почему устала сейчас? Длительный процесс до этого момента.',translation:'Я всё утро '+v.proc+' и сейчас очень устала.',why:'Длительность с последствиями в настоящем.',contrast:'I have '+v.v3+' '+v.obj+' already.',contrastRu:'Я уже закончила: акцент на результате.'}),
 v=>({prefix:'Have you ever ',suffix:' '+v.obj+' in your life?',answer:v.v3,wrong:[v.v,v.v2,v.ing],prompt:'Спрашиваем о жизненном опыте, не о конкретном вчера.',translation:'Ты когда-нибудь в жизни пробовала '+v.ru+'?',why:'Have + you + ever + V3 для опыта без даты.',contrast:'Did you '+v.v+' '+v.obj+' yesterday?',contrastRu:'Ты делала это вчера? Есть законченная дата.'}),
 v=>({prefix:'Does she ',suffix:' '+v.obj+' every Friday?',answer:v.v,wrong:[v.third,v.v2,v.ing],prompt:'Does уже обозначает третье лицо: какой будет смысловой глагол?',translation:'Она '+v.ru+' каждую пятницу?',why:'После Does смысловой глагол V1, без второго -s.',contrast:'She '+v.third+' '+v.obj+' every Friday.',contrastRu:'В утверждении без does добавляем -s/-es.'}),
 v=>({prefix:'I have not ',suffix:' '+v.obj+' yet.',answer:v.v3,wrong:[v.v,v.v2,v.ing],prompt:'Ещё не завершила: Perfect и слово yet.',translation:'Я ещё не '+v.done+'.',why:'Have not + V3; yet = ещё не.',contrast:'I am not '+v.ing+' '+v.obj+' now.',contrastRu:'Я сейчас не в процессе: Continuous.'})
];
for(const [track,templates] of [['past',pm],['present',prm]]){
 let i=0;for(const v of V.slice(0,5))for(const t of templates)add(track,'mixed',v,++i,t(v));
}
// Explicit word-order construction patterns: 10 clear schemes × 4 actions.
function order(track,sentence,ru,why,number){
 const words=sentence.match(/\S+/g);
 B[track].push({id:track+'-order-'+String(number).padStart(3,'0'),track,group:'order',kind:'order',words,correct:sentence,
 ru,translation:ru,explain:why,contrasts:[{en:sentence,ru},{en:track==='past'?'When I arrived, Anna was reading.':'I am reading now, but I usually read in the evening.',ru:track==='past'?'Когда я пришла, Анна читала.':'Сейчас я читаю, но обычно читаю по вечерам.'}]});
}
const orderPast=[
 v=>['Yesterday I '+v.v2+' '+v.obj+'.','Вчера я '+v.done+'.','Прошлое утверждение: подлежащее I + V2 + дополнение.'],
 v=>['Did you '+v.v+' '+v.obj+' yesterday?','Ты вчера '+v.ru+'?','Вопрос: Did стоит перед подлежащим you; после Did нужен V1.'],
 v=>['When Anna arrived, I had '+v.v3+' '+v.obj+'.','Когда пришла Анна, я уже '+v.done+'.','Сначала приход Анны — более поздняя точка; had + V3 раньше.'],
 v=>['At eight yesterday, I was '+v.ing+' '+v.obj+'.','Вчера в восемь я '+v.proc+'.','Подлежащее I → was → V-ing — процесс в прошлом.'],
 v=>['While I was '+v.ing+' '+v.obj+', the phone rang.','Пока я '+v.proc+', зазвонил телефон.','После while длительный фон was + -ing; rang — короткое событие.'],
 v=>['By noon yesterday, I had '+v.v3+' '+v.obj+'.','К полудню вчера я уже '+v.done+'.','By noon = к сроку в прошлом: had + V3.'],
 v=>['When the phone rang, I was '+v.ing+' '+v.obj+'.','Когда зазвонил телефон, я '+v.proc+'.','Сказуемое продолжалось во время звонка: was + V-ing.'],
 v=>['Before you arrived, I had been '+v.ing+' '+v.obj+' for hours.','До твоего прихода я уже часами '+v.proc+'.','Had been + -ing + for — длительность до прошлого.'],
 v=>['I did not '+v.v+' '+v.obj+' yesterday.','Вчера я не стала '+v.ru+'.','После did not только V1.'],
 v=>['Had you '+v.v3+' '+v.obj+' before I called?','Ты успела '+v.ru+' до моего звонка?','В вопросе Past Perfect Had стоит перед you, затем V3.']
];
const orderPresent=[
 v=>['I usually '+v.v+' '+v.obj+' on Sundays.','Обычно по воскресеньям я '+v.now+'.','I + V1 и usually — привычка.'],
 v=>['She '+v.third+' '+v.obj+' every Friday.','Каждую пятницу она '+v.thirdRu+'.','В Present Simple she требует V-s/-es.'],
 v=>['Look, I am '+v.ing+' '+v.obj+' now.','Смотри, я сейчас '+v.now+'.','Am + V-ing — действие прямо сейчас.'],
 v=>['Have you ever '+v.v3+' '+v.obj+'?','Ты когда-нибудь пробовала '+v.ru+'?','Have + you + ever + V3 — опыт.'],
 v=>['I have been '+v.ing+' '+v.obj+' since morning.','С утра я '+v.now+'.','Have been + V-ing + since выражает длительность.'],
 v=>['Does she '+v.v+' '+v.obj+' on Saturdays?','Она по субботам '+v.ru+'?','Does + she + V1 — вопрос про привычку.'],
 v=>['She is '+v.ing+' '+v.obj+' at the moment.','Прямо сейчас она '+v.thirdRu+'.','Is + V-ing — процесс сейчас.'],
 v=>['I have already '+v.v3+' '+v.obj+'.','Я уже '+v.done+'.','Present Perfect: подлежащее + have + V3. Already может стоять между have и V3 или в конце всего предложения: I have '+v.v3+' '+v.obj+' already. Оба порядка грамматически возможны; точку ставим в самый конец.'],
 v=>['I do not '+v.v+' '+v.obj+' every day.','Я не каждый день '+v.ru+'.','Do not + V1: отрицание привычки.'],
 v=>['Have you been '+v.ing+' '+v.obj+' all morning?','Ты всё утро '+v.ru+'?','Have + you + been + V-ing — вопрос про длительность.']
];
for(const [track,templates] of [['past',orderPast],['present',orderPresent]]){let n=0;for(const v of V.slice(0,4))for(const make of templates){const [en,ru,why]=make(v);order(track,en,ru,why,++n)}}

// These 20 contrast tasks are designed from meaning differences, not a random mix of old banks.
// Each is instantiated in five realistic lexical settings = 100 unique two-sentence comparisons.
const W=V.slice(0,5);
const frames=[
 ['Конкретная дата против результата сейчас',v=>['Yesterday I § '+v.obj+'.',v.v2,'Вчера я '+v.done+'.','I § '+v.obj+' already, so I can rest.','have '+v.v3,'Я уже '+v.done+' и теперь могу отдохнуть.'],'Вчера (Past Simple) — закрытое прошлое; already с результатом сейчас — Present Perfect.'],
 ['Процесс вчера в восемь против законченного дела вчера',v=>['At eight yesterday, I § '+v.obj+'; I was still busy.','was '+v.ing,'Вчера в восемь я '+v.proc+'.','Yesterday I § '+v.obj+' and then rested.',v.v2,'Вчера я '+v.done+' и потом отдохнула.'],'В конкретный момент прошлое действие шло; во второй фразе оно закончилось.'],
 ['Сделала до прихода против после прихода',v=>['Before Anna arrived yesterday, I § '+v.obj+'.','had '+v.v3,'До вчерашнего прихода Анны я уже '+v.done+'.','After Anna arrived, I § '+v.obj+'.',v.v2,'После прихода Анны я '+v.done+'.'],'Had + V3 — раньше другого прошлого. Past Simple — действие после него.'],
 ['Привычка против процесса в эту секунду',v=>['I usually § '+v.obj+' in the evenings.',v.v,'Обычно по вечерам я '+v.now+'.','Right now I § '+v.obj+'.','am '+v.ing,'Прямо сейчас я '+v.now+'.'],'Usually показывает привычку, right now — процесс.'],
 ['Временная деятельность на этой неделе против обычной привычки',v=>['This week I § '+v.obj+' every evening as a temporary project.','am '+v.ing,'На этой неделе я временно '+v.now+' каждый вечер.','Normally I § '+v.obj+' on weekends.',v.v,'Обычно в выходные я '+v.now+'.'],'Present Continuous может описывать временную ситуацию, а Present Simple — обычный уклад.'],
 ['Решение сейчас против намерения, принятого заранее',v=>['All right, I § '+v.obj+' tomorrow! I have just decided.','will '+v.v,'Ладно, завтра я буду '+v.ru+'! Только что решила.','I § '+v.obj+' tomorrow. I planned it last week.','am going to '+v.v,'Завтра я собираюсь '+v.ru+'. Я запланировала это на прошлой неделе.'],'Will помогает выразить решение в момент разговора, going to — заранее существующий план.'],
 ['В восемь процесс против готовности к восьми',v=>['At eight tomorrow, I § '+v.obj+'; I will be busy.','will be '+v.ing,'Завтра в восемь я буду '+v.ru+' (процесс).','By eight tomorrow, I § '+v.obj+' already.','will have '+v.v3,'К восьми завтра я уже закончу '+v.ru+'.'],'At eight — что происходит в момент; by eight — что уже будет готово к сроку.'],
 ['К пятнице результат против действия в пятницу',v=>['By Friday, I § '+v.obj+' already.','will have '+v.v3,'К пятнице я уже закончу '+v.ru+'.','On Friday, I § '+v.obj+'.','will '+v.v,'В пятницу я буду '+v.ru+'.'],'Будущий срок готовности by отличается от календарного дня on.'],
 ['Будущая длительность против будущего кадра',v=>['By eight tomorrow, I § '+v.obj+' for two hours.','will have been '+v.ing,'К завтрашним восьми я буду '+v.ru+' уже два часа.','At eight tomorrow, I § '+v.obj+'.','will be '+v.ing,'В восемь завтра я буду '+v.ru+'.'],'Will have been + -ing измеряет накопленное время; will be + -ing показывает процесс в момент.'],
 ['Длительность до звонка против действия во время звонка',v=>['When the phone rang, I § '+v.obj+' for an hour already.','had been '+v.ing,'Когда зазвонил телефон, я уже целый час '+v.proc+'.','When the phone rang, I § '+v.obj+' right then.','was '+v.ing,'Во время звонка я '+v.proc+'.'],'Past Perfect Continuous — как долго до звонка, Past Continuous — что происходило тогда.'],
 ['Результат до встречи вчера против результата сейчас',v=>['By the time we met yesterday, I § '+v.obj+'.','had '+v.v3,'К нашей вчерашней встрече я уже '+v.done+'.','I § '+v.obj+' recently; the result is here now.','have '+v.v3,'Недавно я '+v.done+' — результат есть сейчас.'],'Past Perfect смотрит назад из прошлого; Present Perfect связывает прошлое с настоящим.'],
 ['Уже два часа идущее действие против происходящего прямо сейчас',v=>['I § '+v.obj+' for two hours, and I am still busy.','have been '+v.ing,'Я '+v.now+' уже два часа и всё ещё занята.','Look, I § '+v.obj+' now.','am '+v.ing,'Смотри, сейчас я '+v.now+'.'],'Perfect Continuous измеряет длительность до сейчас; обычный Continuous показывает текущий процесс.'],
 ['Готовый результат против незаконченной длительной работы',v=>['I § '+v.obj+' already, and the task is complete.','have '+v.v3,'Я уже '+v.done+'; задача завершена.','I § '+v.obj+' for hours, and I am still working.','have been '+v.ing,'Я уже несколько часов '+v.now+' и продолжаю.'],'Perfect — завершённый результат; Perfect Continuous — длительность, процесс может продолжаться.'],
 ['Законченное вчера двухчасовое действие против процесса, вызвавшего усталость',v=>['Yesterday I § '+v.obj+' for two hours and then stopped.',v.v2,'Вчера я два часа '+v.proc+' и закончила.','I was exhausted because I § '+v.obj+' for hours beforehand.','had been '+v.ing,'Я была измучена, потому что до этого часами '+v.proc+'.'],'Past Simple сообщает о прошлом факте; Past Perfect Continuous объясняет состояние более ранним процессом.'],
 ['Расписание привычек против принятого решения на эту среду',v=>['According to my regular schedule, I § '+v.obj+' on Wednesdays.',v.v,'По постоянному расписанию я занимаюсь тем, чтобы '+v.ru+', по средам.','I § '+v.obj+' this Wednesday. I decided yesterday.','am going to '+v.v,'В эту среду я собираюсь '+v.ru+'. Решила вчера.'],'Повторение по расписанию отличается от конкретного намерения на эту среду.'],
 ['Бывшая привычка против нынешней',v=>['When I was younger, I often § '+v.obj+'.',v.v2,'Когда я была моложе, я часто '+v.proc+'.','These days, I usually § '+v.obj+'.',v.v,'В наши дни я обычно '+v.now+'.'],'Закончившийся прошлый период требует Past Simple, текущая привычка — Present Simple.'],
 ['Звонок прервал процесс против звонка после окончания',v=>['When Anna called, I § '+v.obj+'; I was still doing it.','was '+v.ing,'Когда позвонила Анна, я ещё '+v.proc+'.','When Anna called, I § '+v.obj+' already.','had '+v.v3,'Когда позвонила Анна, я уже '+v.done+'.'],'Действие в момент звонка — Past Continuous; готовность ДО звонка — Past Perfect.'],
 ['Будущее после when: в придаточном нет will',v=>['When I § '+v.obj+' tomorrow, I will tell you about it.',v.v,'Когда завтра я займусь тем, чтобы '+v.ru+', то расскажу тебе об этом.','I § '+v.obj+' tomorrow; that is my decision.','will '+v.v,'Завтра я буду '+v.ru+' — я так решила.'],'В придаточном времени after when используется Present Simple, даже если русское предложение о будущем.'],
 ['Реальное условие после if против самостоятельного обещания',v=>['If I § '+v.obj+' tomorrow, I will send you a photo.',v.v,'Если завтра я буду '+v.ru+', то пришлю фото.','I § '+v.obj+' tomorrow. I promise.','will '+v.v,'Завтра я буду '+v.ru+'. Обещаю.'],'В придаточном реального условия после if — Present Simple; в главной части с обещанием — will.'],
 ['Сегодня ещё продолжается против законченного вчера',v=>['So far today, I § '+v.obj+'.','have '+v.v3,'На сегодняшний момент я уже '+v.done+'.','Yesterday, I § '+v.obj+'.',v.v2,'Вчера я '+v.done+'.'],'So far today — незавершённый период с результатом сейчас; yesterday — завершённый прошлый период.']
];
function getOptions(correct,v){
 const list=[correct,v.v2,v.v,'am '+v.ing,'was '+v.ing,'had '+v.v3,'had been '+v.ing,'have '+v.v3,'have been '+v.ing,'will '+v.v,'will be '+v.ing,'will have '+v.v3,'will have been '+v.ing,'am going to '+v.v];
 return [...new Set([correct,...list])].slice(0,7);
}
let count=0;
for(const frame of frames)for(const v of W){
 const [s1,ans1,ru1,s2,ans2,ru2]=frame[1](v);
 if(s1.split('§').length!==2||s2.split('§').length!==2)throw Error('Bad frame '+frame[0]);
 const [p1,z1]=s1.split('§'),[p2,z2]=s2.split('§');
 const i=++count,opts1=getOptions(ans1,v),opts2=getOptions(ans2,v);
 const rot=i%opts1.length;
 B.all.push({id:'all-'+String(i).padStart(3,'0'),track:'all',group:'contrast',kind:'contrast',ru:frame[0]+'. Сопоставь ОБА предложения: в чём разница по смыслу?',
 pair:[{prefix:p1,suffix:z1},{prefix:p2,suffix:z2}],ans:[ans1,ans2],
 options:[{label:'Форма в первом предложении',choices:opts1.slice(rot).concat(opts1.slice(0,rot))},{label:'Форма во втором предложении',choices:opts2.slice(rot).concat(opts2.slice(0,rot))}],
 translations:[ru1,ru2],translation:ru1+' / '+ru2,
 explain:frame[2]+' Сначала найди временной ориентир и реши: факт, процесс, уже готовый результат или длительность. После этого строй вспомогательный и смысловой глаголы.',
 contrasts:[{en:p1+ans1+z1,ru:ru1},{en:p2+ans2+z2,ru:ru2}],
 wrongRule:frame[2],form:'Объяснение строится по двум реальным ситуациям, а не по названию времени.'});
}
for(const name of ['past','present']){if(B[name].length!==383)throw Error(name+' '+B[name].length);}
if(B.all.length!==100)throw Error('All count '+B.all.length);
window.MILANA_ALL_FRAMES=frames;
})();