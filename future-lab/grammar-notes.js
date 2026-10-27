/* Milana Future Lab — короткие, контекстные сноски о грамматике ПОМИМО времени.
   Только объяснения. Ничего не записывает в localStorage и не изменяет ответы. */
(function(){
'use strict';
const rules=[
{
 id:'weather-it', title:'Почему it will rain, а не will rain?',
 test:s=>/\bit\b[^.!?;]{0,45}\b(?:rain|raining|rains|snow|snowing|snows|cold|hot)\b|\b(?:rain|snow)\b[^.!?;]{0,35}\bit\b/i.test(s),
 text:'В английском обычному предложению нужно подлежащее — кто или что выполняет действие. В русском можно сказать просто «Завтра будет дождь»; по-английски перед will rain обязательно ставим формальное it. Оно здесь не переводится как «оно», а просто заполняет место подлежащего. Поэтому не «Will rain tomorrow», а «It will rain tomorrow».',
 examples:[['It will rain tomorrow.','Завтра пойдёт дождь.'],['It is cold outside.','На улице холодно.']]
},
{
 id:'think-clause',title:'После I think / I am sure начинается ещё одно предложение',
 test:s=>/\bI (?:think|am sure|hope|promise)\b/i.test(s),
 text:'«Я думаю, что...» — это две грамматические части. В английском вторая часть тоже должна иметь своё подлежащее. Можно опустить союз that («что»), но нельзя опустить he, she, it или другое подлежащее. Поэтому «I think it will rain» правильно: I — подлежащее первой части, it — подлежащее второй.',
 examples:[['I think she is right.','Я думаю, что она права.'],['I am sure he will come.','Я уверена, что он придёт.']]
},
{
 id:'question-order',title:'В вопросе меняется порядок слов',
 test:s=>/^(?:\s*(?:Will|What|Where|When|Why|How|Which|Who)\s)/i.test(s),
 text:'В обычном утверждении подлежащее стоит перед will, а в общем вопросе will перед подлежащим. Если есть вопросительное слово (What, When, How), оно встаёт ещё раньше. Нельзя строить вопрос с тем же порядком слов, что русское утверждение. В вопросах с who в роли подлежащего есть особенности, но в этих примерах спрашиваем не о них.',
 examples:[['She will call. → Will she call?','Она позвонит. → Она позвонит?'],['What will you read?','Что ты будешь читать?']]
},
{
 id:'when-if-clauses',title:'В каждой части сложного предложения свой исполнитель',
 test:s=>/\b(?:when|if|as soon as|before|by the time)\b/i.test(s),
 text:'Предложение с when / if обычно состоит из двух частей, у каждой есть своё подлежащее и сказуемое. Например, «я позвоню» и «она придёт»: I и she обязательны, даже если в русском переводе можно что-то опустить. Если условие или время стоит первым, после него обычно нужна запятая.',
 examples:[['I will call when she arrives.','Я позвоню, когда она приедет.'],['If it rains, we will stay home.','Если пойдёт дождь, мы останемся дома.']]
},
{
 id:'have-been-to',title:'Been to или been in? У предлога тоже есть смысл',
 test:s=>/\b(?:have|has|had) been (?:to|in)\b/i.test(s),
 text:'Been to + место обычно рассказывает об опыте посещения (человек ездил туда). Been in + место с for указывает, как долго человек там находится. Не путай и с was in + законченная дата: так называют конкретное пребывание в прошлом.',
 examples:[['I have been to France.','Я бывала во Франции.'],['I have been in France for two weeks.','Я нахожусь во Франции уже две недели.']]
},
{
 id:'dates',title:'Предлоги времени: at / on / in — разные',
 test:s=>/\b(?:on (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|in (?:20\d\d|19\d\d|june|august|september|december))\b/i.test(s),
 text:'Для точного часа обычно at (at seven), для дня недели on (on Monday), для месяца и года in (in June, in 2015). Русское «в» не переводится всегда одним английским предлогом.',
 examples:[['We meet on Friday.','Мы встречаемся в пятницу.'],['She was in France in 2015.','Она была во Франции в 2015 году.']]
},
{
 id:'by-at',title:'At seven и by seven: два разных предлога',
 test:s=>/\b(?:by|at) (?:five|six|seven|eight|nine|ten|noon|the end|friday|the time)\b/i.test(s),
 text:'At seven значит «в семь»: ты говоришь, что происходит в эту минуту. By seven значит «к семи, не позже»: к этому моменту что-то уже готово или накопилась длительность. По-русски оба часто переводят невнимательно, но для смысла предложения разница принципиальна.',
 examples:[['At seven, I will be reading.','В семь я буду читать (процесс).'],['By seven, I will have finished.','К семи я уже закончу (результат).']]
},
{
 id:'for-since',title:'For + длительность, since + начало',
 test:s=>/\bfor (?:a|an|half|one|two|three|four|five|six|forty|\d+)\s+(?:hours?|minutes?|days?|weeks?|months?|years?)\b|\bsince\b/i.test(s),
 text:'For two hours — «в течение двух часов / уже два часа»: отвечает «как долго?». Since Monday — «с понедельника»: отвечает «с какого момента?». После числа больше одного hour/day/week получает множественное -s. Это отдельные правила о предлоге и числе, а не просто выбор времени.',
 examples:[['I have worked for two hours.','Я работаю уже два часа.'],['I have worked since Monday.','Я работаю с понедельника.']]
},
{
 id:'at-time',title:'At + время: почему нужен предлог?',
 test:s=>/\bat (?:five|six|seven|eight|nine|ten|noon|this time|exactly)\b/i.test(s),
 text:'В английском перед точным временем суток обычно ставят at: at five, at eight, at noon. В русском мы говорим «в восемь», но перевод «in eight» для времени на часах неверен. Перед днями недели и месяцами будут другие предлоги.',
 examples:[['She comes at eight.','Она приходит в восемь.'],['The lesson starts at noon.','Урок начинается в полдень.']]
},
{
 id:'possessive',title:'My / your / her: перед существительным артикль уже не нужен',
 test:s=>/\b(?:my|your|his|her|our|their)\s+(?:[a-z]+)\b/i.test(s),
 text:'My означает «мой / моя / моё», her — «её», our — «наш». Эти слова определяют существительное, поэтому нельзя поставить перед ним ещё и артикль: «my homework», а не «the my homework». Не путай my («мой») и me («меня / мне»).',
 examples:[['I will read my book.','Я прочитаю свою книгу.'],['She will clean her room.','Она уберёт свою комнату.']]
},
{
 id:'article-a-an',title:'Почему a book, но не book?',
 test:s=>/\b(?:a|an)\s+[a-z]/i.test(s),
 text:'Перед исчисляемым существительным в единственном числе обычно требуется определитель: a / an, the, my и т. п. A book — одна книга, впервые упомянутая или не конкретизированная. The book — та самая, понятная из ситуации. A ставится перед согласным звуком, an — перед гласным звуком.',
 examples:[['I bought a book.','Я купила (какую-то) книгу.'],['The book is on the table.','Эта книга лежит на столе.']]
},
{
 id:'article-the',title:'Почему the book / the train?',
 test:s=>/\bthe\s+(?:[a-z]+)\b/i.test(s),
 text:'The обычно означает, что собеседникам понятно, о каком именно предмете речь: указанная книга, конкретный поезд, эта дверь. В русском артикля нет, поэтому его легко забыть. Артикль относится к существительному, а не к глаголу.',
 examples:[['Close the door, please.','Закрой дверь, пожалуйста (ту, о которой мы говорим).'],['The train leaves at eight.','Этот поезд отправляется в восемь.']]
},
{
 id:'home',title:'Come home / get home — без to',
 test:s=>/\b(?:come|comes|came|get|gets|got|go|goes|went|arrive|arrives|arrived|stay|stayed)\s+(?:back\s+)?(?:at\s+)?home\b/i.test(s),
 text:'Home в выражениях come home, go home и get home употребляется без to. По-русски мы говорим «приду домой», а по-английски «come home», не «come to home». Но «быть дома» — at home.',
 examples:[['I will come home at six.','Я приду домой в шесть.'],['We stayed at home yesterday.','Вчера мы остались дома.']]
},
{
 id:'homework',title:'Homework нельзя посчитать как books',
 test:s=>/\bhomework\b/i.test(s),
 text:'Homework («домашняя работа») в обычном значении неисчисляемое слово. Не говорим «a homework» и «homeworks». Можно сказать my homework или some homework, а одно упражнение будет an exercise / a task.',
 examples:[['I have homework today.','У меня сегодня домашнее задание.'],['She has finished her homework.','Она закончила домашнее задание.']]
},
{
 id:'meals',title:'Breakfast и dinner обычно без a / the',
 test:s=>/\b(?:breakfast|dinner|lunch)\b/i.test(s),
 text:'Когда говорим о завтраке, обеде и ужине как о приёме пищи, артикль обычно не ставим: make breakfast, cook dinner, have lunch. Артикль возможен, когда описывается особый, конкретный ужин, но в обычной фразе он не нужен.',
 examples:[['Mum is making breakfast.','Мама готовит завтрак.'],['We will cook dinner.','Мы приготовим ужин.']]
},
{
 id:'another',title:'Another + единственное число',
 test:s=>/\banother\b/i.test(s),
 text:'Another означает «ещё один / другой» и обычно ставится перед исчисляемым существительным в единственном числе: another letter. Для обычного множественного числа используется other letters. Не ставь a перед another — оно уже содержит идею «один».',
 examples:[['I will write another letter.','Я напишу ещё одно письмо.'],['These are other books.','Это другие книги.']]
},
{
 id:'this-these',title:'This или these?',
 test:s=>/\b(?:this|these|those)\s+(?:[a-z]+)\b/i.test(s),
 text:'This указывает на один предмет («этот»), these — на несколько («эти»). С these существительное обычно во множественном числе: these words, а не these word. The не добавляют перед these.',
 examples:[['This word is easy.','Это слово лёгкое.'],['These words are easy.','Эти слова лёгкие.']]
},
{
 id:'call-verb',title:'Call somebody — без to',
 test:s=>/\bcall(?:ing|ed|s)?\s+(?:you|me|her|him|them|us|my|your|the)\b/i.test(s),
 text:'Call someone — «позвонить кому-то»: после call сразу указываем человека. Не нужно «call to you». Если используешь существительное «звонок» (a call), конструкция может быть иной, но здесь call — глагол.',
 examples:[['I will call you tomorrow.','Я позвоню тебе завтра.'],['She called her sister.','Она позвонила сестре.']]
},
{
 id:'help-verb',title:'Help somebody — прямое дополнение',
 test:s=>/\bhelp(?:ing|ed|s)?\s+(?:you|me|her|him|them|us|my|your|the)\b/i.test(s),
 text:'После глагола help сразу стоит тот, кому помогают: help me, help her, help the children. Не говорим «help to me». Русское «помогу тебе» не означает, что здесь нужен английский предлог to.',
 examples:[['I will help you.','Я помогу тебе.'],['She helped her brother.','Она помогла брату.']]
},
{
 id:'wait-for',title:'Wait FOR: у глагола своё управление',
 test:s=>/\bwait(?:ing|ed|s)?\s+for\b/i.test(s),
 text:'По-английски «ждать кого-то/чего-то» — wait for somebody/something. Само wait без for не принимает такое прямое дополнение. Русское «ждать автобус» не подсказывает предлог, поэтому конструкцию нужно запомнить целиком.',
 examples:[['We are waiting for the bus.','Мы ждём автобус.'],['I waited for my friend.','Я ждала друга.']]
},
{
 id:'going-to',title:'Going to + действие: не забывай am / is / are',
 test:s=>/\b(?:am|is|are|was|were)\s+going\s+to\s+\w+/i.test(s),
 text:'В выражении be going to основная «опора» — to be. Для I это am, для he/she/it — is, для you/we/they — are. После to ставим начальную форму смыслового глагола: going to read, не going to reading. Это форма намерения, а не дословное «идти».',
 examples:[['I am going to read tonight.','Я собираюсь почитать сегодня вечером.'],['She is going to visit Mum.','Она собирается навестить маму.']]
},
{
 id:'am-is-are',title:'Am / is / are — формы одного глагола be',
 test:s=>/\b(?:am|is|are|was|were)\s+(?:\w+ing|not\b)/i.test(s),
 text:'To be — один глагол, но его форма зависит от подлежащего. В настоящем: I am, he/she/it is, we/you/they are. В прошедшем: I/he/she/it was, we/you/they were. В Continuous это вспомогательный глагол, поэтому не говорим «She reading» без is.',
 examples:[['She is reading now.','Она сейчас читает.'],['They are reading now.','Они сейчас читают.']]
},
{
 id:'ing-spelling',title:'Почему writing, а не writeing?',
 test:s=>/\b(?:writing|making|taking|driving|having|using|arriving|leaving|preparing)\b/i.test(s),
 text:'Перед -ing немое e на конце многих глаголов пропадает: write → writing, make → making, take → taking. Сама форма -ing обозначает процесс лишь вместе с нужным вспомогательным глаголом. Не добавляй окончания механически.',
 examples:[['She is writing a letter.','Она пишет письмо.'],['He will be making dinner.','Он будет готовить ужин.']]
},
{
 id:'irregular-v3',title:'V1, V2 и V3 — не одно и то же',
 test:s=>/\b(?:written|done|made|built|drawn|eaten|seen|gone|been|left)\b/i.test(s),
 text:'У неправильных глаголов третью форму нельзя всегда получить добавлением -ed. Например write — wrote — written, do — did — done. После have / has / had в Perfect ставится V3, а после will без have — V1. Не путай wrote и written.',
 examples:[['She wrote a letter yesterday.','Вчера она написала письмо.'],['She has written a letter.','Она уже написала письмо.']]
},
{
 id:'singular-plural',title:'После числа меняется существительное',
 test:s=>/\b(?:two|three|four|five|six|forty|seven|eight|\d+)\s+(?:hours?|minutes?|days?|weeks?|months?|years?|letters?|chapters?|exercises?)\b/i.test(s),
 text:'После чисел от двух обычно требуется множественное число: two hours, three days, four chapters. Слово hour после числа two нельзя оставить в единственном числе. В русском окончания тоже меняются, но правила не совпадают.',
 examples:[['I waited for two hours.','Я ждала два часа.'],['She has read three chapters.','Она прочитала три главы.']]
},
{
 id:'third-person-s',title:'He / she / it и окончание -s',
 test:s=>/\b(?:he|she|it|dad|mum|anna|tom|the bus|the train)\s+(?:gets|comes|leaves|starts|ends|opens|finishes|tries|reads|calls|has|arrives|wakes|writes|returns)\b/i.test(s),
 text:'В Present Simple в утверждении с he/she/it смысловой глагол получает -s или -es: she comes. Но если есть does/doesn’t, основной глагол возвращается к V1: Does she come? После will тоже V1: she will come. Не добавляй -s дважды.',
 examples:[['She comes home every day.','Она приходит домой каждый день.'],['Does she come home on Sunday?','Она приходит домой по воскресеньям?']]
},
{
 id:'no-subject-missing',title:'Английское предложение обычно требует подлежащее',
 test:s=>/^\s*(?:I|We|They|You|He|She|It|Dad|Mum|Anna|Tom|My|The)\b/i.test(s),
 text:'В русском достаточно «Буду читать» или «Закончу завтра»: по форме глагола ясно, кто действует. В английском обычном утверждении нужно назвать подлежащее: I, she, they и т. д. Даже если говорим от первого лица, I опускать нельзя. Исключения есть, например повеление «Come here!».',
 examples:[['I will read tomorrow.','Я завтра буду читать.'],['She is studying now.','Она сейчас учится.']]
},
{
 id:'fallback',title:'Подлежащее и сказуемое — основа английской фразы',
 test:_=>true,
 text:'Определи «кто/что?» (подлежащее), затем «что делает?» (сказуемое). В обычном английском утверждении подлежащее необходимо; смысловой глагол и вспомогательный ставятся в определённом порядке. Русский порядок слов свободнее, поэтому не копируй его буквально.',
 examples:[['The girl reads a book.','Девочка читает книгу.'],['The boys play outside.','Мальчики играют на улице.']]
}
];
function htmlEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function pick(sentence,limit){
 const str=String(sentence||'');
 const matches=rules.filter(r=>r.id!=='fallback'&&r.test(str));
 // «It will rain» должно выигрывать у любых менее важных нюансов.
 if(!matches.length)return [rules[rules.length-1]];
 return matches.slice(0,Math.max(1,Math.min(limit||2,3)));
}
function render(sentence,limit){
 return '<div class="grammar-asides" aria-label="Дополнительные грамматические правила">'+pick(sentence,limit).map(n=>
 '<aside class="grammar-aside"><strong class="grammar-aside-title">📎 Помимо времени: '+htmlEscape(n.title)+'</strong><p>'+htmlEscape(n.text)+'</p><div class="grammar-aside-examples">'+n.examples.map(pair=>
 '<div class="grammar-pair"><b>'+htmlEscape(pair[0])+'</b><span>'+htmlEscape(pair[1])+'</span></div>').join('')+'</div></aside>'
 ).join('')+'</div>';
}
window.milanaGrammarNotes={render,inspect:sentence=>pick(sentence,2).map(x=>x.id)};
})();