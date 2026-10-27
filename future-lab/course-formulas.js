/* Explicit Russian-language FORMULAS for each tense. Additive: existing answers, runs and IDs untouched. */
(function(){
'use strict';
const f=(title,meaning,affirmative,negative,question,explained,notes=[])=>({title,meaning,affirmative,negative,question,explained,notes});
window.MILANA_TENSE_FORMULAS={
'past.simple':f('Past Simple','Завершённое событие, прошлый факт или привычка в закончившемся периоде.',
 ['Подлежащее + V2 (или глагол с -ed) + остальные слова.','I worked yesterday.','Вчера я работала.'],
 ['Подлежащее + did not (didn’t) + V1 + остальные слова.','She did not work yesterday.','Вчера она не работала.'],
 ['Did + подлежащее + V1 + остальные слова?','Did she work yesterday?','Она вчера работала?'],
 'В УТВЕРЖДЕНИИ сам глагол показывает прошедшее время: work → worked, go → went. В ОТРИЦАНИИ и ВОПРОСЕ прошедшее уже выражено словом did, поэтому после него ставится НАЧАЛЬНАЯ форма глагола: work, go — не worked и не went.',[
 ['Исключение: to be','I was tired. — Я была уставшей. / They were tired. — Они были уставшими. / She was not tired. — Она не была уставшей. / Were you tired? — Ты была уставшей? В прошедшем времени у be формы was / were; с ними did не нужен.'],
 ['Неправильные глаголы','go → went, see → saw, write → wrote, eat → ate. В утвердительном Past Simple нужна вторая форма, а не обязательное -ed.'],
 ['Не путай','❌ Did she went? → ✅ Did she go? — Она ходила? Did уже обозначает прошлое.']
 ]),
'past.continuous':f('Past Continuous','Действие продолжалось в конкретный момент прошлого.',
 ['Подлежащее + was / were + V-ing + остальные слова.','I was reading at eight yesterday.','Вчера в восемь я читала.'],
 ['Подлежащее + was / were + not + V-ing + остальные слова.','She was not sleeping when I called.','Когда я позвонила, она не спала.'],
 ['Was / Were + подлежащее + V-ing + остальные слова?','Were you reading when I called?','Ты читала, когда я позвонила?'],
 'I / he / she / it → was. You / we / they → were. Далее ОБЯЗАТЕЛЬНО глагол с -ing. Для вопроса переносим was или were ПЕРЕД подлежащим; для отрицания ставим not ПОСЛЕ was или were.',[
 ['Как образовать -ing','read → reading; write → writing (убираем немую e); run → running (удваиваем n).'],
 ['Сравни смысл','I read yesterday. — Я читала вчера (факт). / I was reading when she called. — Я читала в момент её звонка (процесс).']
 ]),
'past.perfect':f('Past Perfect','Результат был готов ДО другого события или момента в прошлом.',
 ['Подлежащее + had + V3 + остальные слова.','I had finished the task before she arrived.','Я закончила задание ещё до её прихода.'],
 ['Подлежащее + had not (hadn’t) + V3 + остальные слова.','I had not finished the task when she arrived.','Когда она пришла, я ещё не закончила задание.'],
 ['Had + подлежащее + V3 + остальные слова?','Had you finished the task before she arrived?','Ты закончила задание до её прихода?'],
 'Had не меняется по лицам: I had, she had, they had. После had всегда третья форма смыслового глагола (V3): written, gone, finished. В вопросе Had ставим в начало, в отрицании добавляем not после had.',[
 ['Два момента в прошлом','I had eaten before he called. — Я поела ДО его звонка. / I was eating when he called. — Я ела В МОМЕНТ звонка.'],
 ['Что такое V3','У правильного глагола V2 = V3: work → worked → worked. У неправильного: write → wrote → written; go → went → gone.']
 ]),
'past.perfect_cont':f('Past Perfect Continuous','Действие длилось какое-то время ДО определённого момента в прошлом.',
 ['Подлежащее + had + been + V-ing + остальные слова.','I had been studying for two hours when Mum came home.','Когда мама пришла, я занималась уже два часа.'],
 ['Подлежащее + had not + been + V-ing + остальные слова.','I had not been waiting for long when he arrived.','Когда он пришёл, я ждала ещё недолго.'],
 ['Had + подлежащее + been + V-ing + остальные слова?','Had you been studying long before Mum came home?','Ты уже долго занималась до маминого прихода?'],
 'Запомни ВСЮ цепочку: had → been → глагол с -ing. Нельзя пропускать been. Had ставится перед подлежащим только в вопросе. For two hours = «в течение двух часов»; since morning = «с утра».',[
 ['Важен не результат, а время','I had finished by six. — Я закончила к шести. / I had been studying for two hours by six. — К шести я занималась уже два часа.']
 ]),
'present.simple':f('Present Simple','Регулярные действия, факты, постоянные состояния и привычки.',
 ['I / you / we / they + V1; he / she / it + V-s / V-es.','I work every day. She works every day.','Я работаю каждый день. Она работает каждый день.'],
 ['I / you / we / they + do not (don’t) + V1; he / she / it + does not (doesn’t) + V1.','She does not work on Sundays.','По воскресеньям она не работает.'],
 ['Do + I / you / we / they + V1? Does + he / she / it + V1?','Does she work on Sundays?','Она работает по воскресеньям?'],
 'В утверждении he/she/it нужен суффикс -s/-es: work → works, watch → watches, study → studies. В отрицании и вопросе для he/she/it служит DOES, а после него обычный V1 БЕЗ -s! Для I/you/we/they используем do.',[
 ['Глагол to be — отдельно','I am happy. — Я счастлива. / She is happy. — Она счастлива. / They are happy. — Они счастливы. / Is she happy? — Она счастлива? / She is not happy. — Она не счастлива. С am/is/are НЕ нужен do/does.'],
 ['Не путай','❌ Does she works? → ✅ Does she work? — Она работает? / ✅ She works. — Она работает.']
 ]),
'present.continuous':f('Present Continuous','Действие происходит сейчас, временно либо как уже согласованная личная договорённость.',
 ['Подлежащее + am / is / are + V-ing + остальные слова.','I am reading now.','Я сейчас читаю.'],
 ['Подлежащее + am / is / are + not + V-ing + остальные слова.','She is not working at the moment.','В данный момент она не работает.'],
 ['Am / Is / Are + подлежащее + V-ing + остальные слова?','Are you reading now?','Ты сейчас читаешь?'],
 'I → am; he/she/it → is; you/we/they → are. Затем ОБЯЗАТЕЛЬНО смысловой глагол с -ing. Нельзя сказать «I reading» — отсутствует am. В вопросе am/is/are переносится ПЕРЕД подлежащим.',[
 ['Сравни','I read every night. — Я читаю каждый вечер (привычка). / I am reading right now. — Я читаю именно сейчас (процесс).'],
 ['Будущий план','I am meeting Anna tomorrow. — Я встречаюсь с Анной завтра (договорённость уже есть).']
 ]),
'present.perfect':f('Present Perfect','Опыт или прошлое действие, результат которого имеет значение сейчас.',
 ['Подлежащее + have / has + V3 + остальные слова.','I have finished my homework.','Я уже закончила домашнее задание.'],
 ['Подлежащее + have / has + not + V3 + остальные слова.','She has not finished her homework yet.','Она ещё не закончила домашнее задание.'],
 ['Have / Has + подлежащее + V3 + остальные слова?','Have you finished your homework?','Ты закончила домашнее задание?'],
 'I/you/we/they → have; he/she/it → has. После них ставим V3 (finished, written, gone), НЕ вторую форму. В вопросе have/has переносится ПЕРЕД подлежащим, а в отрицании not идёт после have/has.',[
 ['Конкретная дата меняет выбор','I finished it yesterday. — Я закончила это вчера (законченный период: Past Simple). / I have finished it. — Я уже закончила (важно сейчас: Present Perfect).'],
 ['Управление','I have been to Paris. — Я бывала в Париже (опыт). / I have known her for years. — Я знаю её много лет (глагол состояния).']
 ]),
'present.perfect_cont':f('Present Perfect Continuous','Длительность действия от прошлого до настоящего или следы недавнего процесса.',
 ['Подлежащее + have / has + been + V-ing + остальные слова.','I have been studying for two hours.','Я занимаюсь уже два часа.'],
 ['Подлежащее + have / has + not + been + V-ing + остальные слова.','She has not been sleeping well lately.','В последнее время она плохо спит.'],
 ['Have / Has + подлежащее + been + V-ing + остальные слова?','Have you been studying all morning?','Ты занимаешься всё утро?'],
 'I/you/we/they → have been; he/she/it → has been. Только после BEEN ставим глагол с -ing. Полная цепочка: HAVE/HAS + BEEN + V-ING. For = «как долго»; since = «с какого момента».',[
 ['Сравни','I have written three pages. — Я написала три страницы (сколько готово). / I have been writing for two hours. — Я пишу уже два часа (сколько длится).'],
 ['Глаголы состояния','I have known Anna for five years. — Я знаю Анну пять лет. Обычно не говорим «have been knowing»; know чаще употребляется в Simple/Perfect.']
 ]),
'future.simple':f('Future Simple','Будущий факт, обещание, решение в момент речи или прогноз.',
 ['Подлежащее + will + V1 + остальные слова.','I will call you tomorrow.','Я позвоню тебе завтра.'],
 ['Подлежащее + will not (won’t) + V1 + остальные слова.','She will not call tomorrow.','Она завтра не позвонит.'],
 ['Will + подлежащее + V1 + остальные слова?','Will you call me tomorrow?','Ты позвонишь мне завтра?'],
 'Will одинаков для всех лиц, даже he/she/it. После WILL используем только V1: go, write, finish. Не добавляем -s, -ed и не ставим to. В вопросе WILL — перед подлежащим. «Завтра» само по себе не требует именно will.',[
 ['Не путай планы','I will help! — Я помогу! (решение сейчас). / I am going to help tomorrow. — Я собираюсь помочь завтра (план уже был).']
 ]),
'future.continuous':f('Future Continuous','Процесс в определённый момент будущего.',
 ['Подлежащее + will + be + V-ing + остальные слова.','I will be reading at eight tomorrow.','Завтра в восемь я буду читать.'],
 ['Подлежащее + will not + be + V-ing + остальные слова.','I will not be working at eight tomorrow.','Завтра в восемь я не буду работать.'],
 ['Will + подлежащее + be + V-ing + остальные слова?','Will you be working at eight tomorrow?','Ты завтра в восемь будешь работать?'],
 'Полная цепочка: WILL + BE + глагол с -ING. После will нужна начальная форма be, НЕ am/is/are. В вопросе WILL переносится перед подлежащим, а BE и -ING остаются после него.',[
 ['Момент против срока','At eight, I will be writing. — В восемь я буду писать. / By eight, I will have written it. — К восьми я уже напишу это.']
 ]),
'future.perfect':f('Future Perfect','К конкретному будущему сроку действие уже будет завершено.',
 ['Подлежащее + will + have + V3 + остальные слова.','I will have finished by Friday.','К пятнице я уже закончу.'],
 ['Подлежащее + will not + have + V3 + остальные слова.','I will not have finished by Friday.','К пятнице я ещё не закончу.'],
 ['Will + подлежащее + have + V3 + остальные слова?','Will you have finished by Friday?','Ты закончишь к пятнице?'],
 'Полная цепочка: WILL + HAVE + V3. Для she/he/it после will пишем HAVE, не has. V3 — третья форма (written, finished, gone). By Friday значит «К пятнице», не «в пятницу».',[
 ['День против срока','On Friday I will finish it. — Я закончу это в пятницу. / By Friday I will have finished it. — К пятнице я уже закончу.']
 ]),
'future.perfect_cont':f('Future Perfect Continuous','Сколько времени процесс будет длиться К определённой будущей точке.',
 ['Подлежащее + will + have + been + V-ing + остальные слова.','By six, I will have been studying for two hours.','К шести я буду заниматься уже два часа.'],
 ['Подлежащее + will not + have + been + V-ing + остальные слова.','By six, I will not have been working for two hours yet.','К шести я ещё не проработаю двух часов.'],
 ['Will + подлежащее + have + been + V-ing + остальные слова?','Will you have been studying for two hours by six?','К шести ты будешь заниматься уже два часа?'],
 'Цепочка состоит из ЧЕТЫРЁХ частей: WILL + HAVE + BEEN + глагол с -ING. Никакое звено не пропускаем. By six — будущая точка; for two hours — продолжительность до неё.',[
 ['Различие','I will be reading at six. — В шесть я буду читать (кадр). / By six, I will have been reading for two hours. — К шести я буду читать уже два часа (длительность).']
 ]),
'future.going':f('Be going to · заранее принятое намерение','Это конструкция о будущем, а не отдельное из 12 основных времён.',
 ['Подлежащее + am / is / are + going to + V1.','I am going to visit Anna tomorrow.','Я собираюсь навестить Анну завтра.'],
 ['Подлежащее + am / is / are + not + going to + V1.','She is not going to buy it.','Она не собирается это покупать.'],
 ['Am / Is / Are + подлежащее + going to + V1?','Are you going to visit Anna?','Ты собираешься навестить Анну?'],
 'I am / she is / they are + going to + начальная форма глагола. После TO используется V1, не V2. В вопросе переносим am/is/are перед подлежащим.',[
 ['Сравни','I will call her now. — Я сейчас ей позвоню (решила сейчас). / I am going to call her tonight. — Я собираюсь позвонить ей вечером (намерение уже есть).']
 ]),
'future.arrangement':f('Present Continuous о будущем · личная договорённость','Та же грамматическая конструкция Present Continuous, но с будущим значением.',
 ['Подлежащее + am / is / are + V-ing + будущий ориентир.','I am meeting Anna at six tomorrow.','Я встречаюсь с Анной завтра в шесть.'],
 ['Подлежащее + am / is / are + not + V-ing + будущий ориентир.','I am not meeting Anna tomorrow.','Я завтра не встречаюсь с Анной.'],
 ['Am / Is / Are + подлежащее + V-ing + будущий ориентир?','Are you meeting Anna tomorrow?','Ты завтра встречаешься с Анной?'],
 'Форма такая же, как у настоящего процесса, но будущее время и договорённость понятны из контекста. Для I — am, для she — is, для they — are.',[
 ['Сравни','I am meeting Anna tomorrow. — Встреча уже согласована. / I am going to meet Anna tomorrow. — Я намерена встретиться, договорённость может ещё не быть подтверждена.']
 ]),
'future.timetable':f('Present Simple о будущем · расписание','План по официальному расписанию: уроки, поезда, фильмы.',
 ['Подлежащее + V1 (для he/she/it + -s/-es) + будущий ориентир.','The train leaves at seven tomorrow.','Поезд отправляется завтра в семь.'],
 ['Подлежащее + do / does not + V1 + будущий ориентир.','The train does not leave at eight tomorrow.','Поезд завтра не отправляется в восемь.'],
 ['Do / Does + подлежащее + V1 + будущий ориентир?','Does the train leave at seven tomorrow?','Поезд завтра отправляется в семь?'],
 'Поезд = it: в утверждении leave + -s → leaves. В вопросе Does уже несёт окончание третьего лица, поэтому leave без -s. Будущее событие по расписанию часто выражают Present Simple.',[
 ['Сравни','The train leaves at seven tomorrow. — Поезд по расписанию в семь. / We are leaving at seven tomorrow. — Мы уезжаем в семь по собственной договорённости.']
 ]),
'future.ifwhen':f('If / when · реальное условие и время в будущем','Условие или время о будущем обычно оформляют Present Simple в придаточной части.',
 ['If / When + подлежащее + Present Simple, подлежащее + will + V1.','If it rains, we will stay at home.','Если пойдёт дождь, мы останемся дома.'],
 ['If / When + подлежащее + do / does not + V1, подлежащее + will + V1.','If she does not call, I will write to her.','Если она не позвонит, я ей напишу.'],
 ['Will + подлежащее + V1 + if / when + подлежащее + Present Simple?','Will you call me when you arrive?','Ты позвонишь мне, когда приедешь?'],
 'Две части предложения: после IF / WHEN в реальном условии и придаточном времени — Present Simple, хотя перевод на русский будущий. В главной части возможно WILL + V1. В косвенном вопросе «I don’t know when she will arrive» конструкция другая — там will допустим.',[
 ['Ошибка','❌ If she will come, I will tell her. → ✅ If she comes, I will tell her. — Если она придёт, я ей скажу.']
 ])
};
window.MILANA_FORMULA_LEGEND=[
 ['Подлежащее','Кто выполняет действие: I — я, she — она, you — ты/вы, they — они, the train — поезд. В формуле это ПЕРВЫЙ участник обычного утверждения.'],
 ['V1','Начальная форма смыслового глагола БЕЗ to: work — работать, go — идти, write — писать. После do/does/did/will обычно именно V1.'],
 ['V2','Вторая форма (Past Simple): worked — работал(а), went — пошёл/пошла, wrote — написал(а).'],
 ['V3','Третья форма (причастие прошедшего времени): work → worked, go → gone, write → written. Она нужна после have/has/had в конструкциях Perfect. Не путай с V2 неправильных глаголов: wrote (V2), written (V3).'],
 ['V-ing','Глагол с окончанием -ing: working, going, writing — действие в процессе; используется с be/been.'],
 ['Вспомогательный глагол','do/does/did, am/is/are/was/were, have/has/had, will — служебные части конструкции; некоторые из них изменяются по лицам.'],
 ['Остальные слова','Дополнение, обстоятельства места/времени: my homework, at eight, yesterday, for two hours. Это не часть обязательной формулы образования времени.']
];
window.MILANA_FORMULA_MAP={
 past:[['past.simple'],['past.continuous'],['past.perfect'],['past.perfect_cont'],['past.simple','past.continuous','past.perfect','past.perfect_cont']],
 present:[['present.simple'],['present.continuous'],['present.perfect'],['present.perfect_cont'],['present.simple','present.continuous','present.perfect','present.perfect_cont']],
 all:[
 ['past.simple','past.continuous','past.perfect','past.perfect_cont','present.simple','present.continuous','present.perfect','present.perfect_cont','future.simple','future.continuous','future.perfect','future.perfect_cont'],
 ['past.continuous','past.perfect','future.continuous','future.perfect'],
 ['past.simple','past.continuous','past.perfect','past.perfect_cont'],
 ['present.simple','present.continuous','present.perfect','present.perfect_cont'],
 ['future.simple','future.going','future.arrangement','future.timetable'],
 ['future.ifwhen','present.simple','future.simple'],
 ['past.perfect_cont','present.perfect_cont','future.perfect_cont'],
 ['past.simple','present.simple','future.simple','future.continuous','future.perfect']
 ]
};
})();