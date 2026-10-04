
/* ============================ PONY KNIGHT 2 — Сердце Гармонии ============================ */
addCSS(`.pk{flex:1;position:relative;background:#05050c;display:grid;place-items:center;min-height:0;overflow:hidden;outline:none}
.pk canvas{max-width:100%;max-height:100%;aspect-ratio:16/9;background:#000}
.pk-ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(5,5,15,.86);color:#e8e6ff;text-align:center;font-family:Georgia,serif;z-index:2;overflow:auto;padding:16px}
.pk-ov[hidden],.pk-dlg[hidden]{display:none}
.pk-ov h1{font-size:50px;letter-spacing:.1em;color:#f3d8ff;text-shadow:0 0 24px #b06cff,0 0 4px #fff;margin:0}
.pk-ov h2{font-size:26px;margin:0;color:#ffd6f0}.pk-ov p{max-width:640px;line-height:1.6;margin:0}
.pk-ov button{min-width:220px;padding:9px 16px;border:1px solid #b9a4ff;background:rgba(120,90,200,.18);color:#fff;border-radius:4px;font:16px Georgia,serif;cursor:pointer}
.pk-ov button:hover{background:rgba(160,120,255,.4)}.pk-ov button:disabled{opacity:.35;cursor:default}
.pk-ov small{opacity:.75;line-height:1.7;font-family:var(--font)}
.pk-ov .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.pk-tree{display:grid;grid-template-columns:repeat(3,minmax(170px,250px));gap:12px;text-align:left;font-family:var(--font)}
.pk-br{border:1px solid #fff3;border-radius:8px;padding:10px;background:#ffffff08}.pk-br h3{margin:0 0 6px;font:600 17px Georgia,serif}
.pk-ov .pk-sk{display:block;width:100%;min-width:0;text-align:left;margin:6px 0;padding:6px 9px;font:13px/1.35 var(--font)}
.pk-sk b{display:block}.pk-sk small{opacity:.75}.pk-ov .pk-sk.max{border-color:#ffd54f;background:rgba(255,213,79,.12)}
.pk-ch{display:grid;grid-template-columns:repeat(2,minmax(220px,320px));gap:8px;font-family:var(--font);text-align:left}
.pk-ov .pk-ch button{min-width:0;text-align:left;font:13px/1.35 var(--font);padding:8px 10px}.pk-ov .pk-ch button.on{border-color:#ffd54f;background:rgba(255,213,79,.15)}
.pk-map{display:grid;grid-template-columns:repeat(3,210px);gap:10px;font-family:var(--font)}
.pk-ar{border:1px solid #fff3;border-radius:8px;padding:8px 10px;background:#ffffff08;text-align:left;font-size:13px;line-height:1.5}
.pk-ar.lock{opacity:.35}.pk-ar.cur{border-color:#ffd54f;box-shadow:0 0 12px #ffd54f55}
.pk-ar .rm{display:flex;gap:4px;margin:6px 0}.pk-ar .rm i{flex:1;height:10px;border-radius:3px;background:#fff2}.pk-ar .rm i.v{background:#7b5cff}.pk-ar .rm i.c{background:#ffd54f}
.pk-ov .pk-ar button{min-width:0;width:100%;padding:4px;font-size:13px}
.pk-dlg{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);width:min(760px,90%);background:rgba(10,8,25,.93);border:1px solid #b9a4ff;border-radius:8px;padding:14px 18px 20px;color:#eee;font:16px/1.55 Georgia,serif;z-index:3;cursor:pointer;box-shadow:0 0 30px #7b5cff44}
.pk-dlg b{color:#ffd6f0;display:block;margin-bottom:4px}.pk-dlg small{position:absolute;right:12px;bottom:5px;opacity:.6;font-size:11px;font-family:var(--font)}`);
(()=>{
const VW=960,VH=540,GR=2000;
const AREAS=[
 {n:'Забытый Луг',sub:'где начинается путь',sky:['#1e2a4a','#4c6a9a'],far:'#26355a',near:'#1a2742',gr:'#2b3b2a',top:'#6fbf4f',th:'hills',ec:'#4a3b5c',mote:'#d8f0ff',hz:'spikes',en:['crawl','crawl','hopper','fly'],
  boss:{n:'Королева Тени',hp:60,s:2,body:'#2d2440',mane:'#ff4fd8',o:{wings:1,horn:1,crown:1},mv:['charge','leap','shoot3']},ab:'dash',
  npc:['Ху-ху! Юный рыцарь проснулся! Я — Мудрая Сова, хранительница скамеек.','Сядь на скамейку (E) — отдохнёшь, сохранишься, купишь амулеты у торговки Мяты и распределишь очки навыков.','Королева Тени стережёт выход с Луга. Говорят, её плащ позволяет мчаться быстрее ветра…'],
  lore:'«Здесь орден Пони-Рыцарей принёс клятву: пока горит хоть одна искра — Гармония жива».',win:'Королева Тени рассеялась. Её плащ теперь твой: РЫВОК (Shift / K).'},
 {n:'Кристальные Пещеры',sub:'поющие глубины',sky:['#120f2a','#3a2d6b'],far:'#2a2150',near:'#1c1638',gr:'#2a2346',top:'#a78bfa',th:'crystal',ec:'#3b2f63',mote:'#c4b5fd',hz:'spikes',en:['crawl','fly','spitter','hopper'],
  boss:{n:'Кристальный Единорог',hp:90,s:2,body:'#9fa8ff',mane:'#e1bee7',o:{horn:1},mv:['teleport','shoot3','rain']},ab:'dj',
  npc:['Пещеры пели когда-то… теперь кристаллы шепчут голосом Кошмара.','Кристальный Единорог был лучшим магом королевства. Он телепортируется — следи за вспышками!'],
  lore:'В кристаллах видно, как Король Кошмаров разбил первый Камень — Камень Честности.',win:'Единорог очнулся от кошмара и подарил тебе Крылья Пегаса: ДВОЙНОЙ ПРЫЖОК.'},
 {n:'Грибные Топи',sub:'туман и яд',sky:['#0f1f1a','#2f4f3a'],far:'#1d3a2c',near:'#14281f',gr:'#2c2a20',top:'#8bc34a',th:'mush',ec:'#3f4a2a',mote:'#b2ff59',hz:'water',en:['hopper','spitter','charger','crawl'],
  boss:{n:'Болотная Гидра',hp:120,s:2.2,body:'#3e6b3a',mane:'#c6ff00',o:{heads:1},mv:['summon','shoot3','leap','rain']},ab:'glide',
  npc:['Осторожно: в Топях даже грибы кусаются!','Болотная Гидра стережёт третий Камень. Она зовёт на помощь своих детёнышей.'],
  lore:'Пони Топей жили в домиках-грибах и варили лучший чай в королевстве. Теперь здесь только туман.',win:'Гидра повержена. Ты получаешь Зонтик Ветра: удерживай ПРЫЖОК в воздухе, чтобы ПАРИТЬ.'},
 {n:'Облачный Город',sub:'где поют ветра',sky:['#4f86c6','#dcecff'],far:'#ffffff',near:'#eaf2ff',gr:'#c9d6ea',top:'#ffffff',th:'clouds',ec:'#5a6b8a',mote:'#ffffff',hz:'wind',en:['fly','fly','hopper','spitter'],
  boss:{n:'Буревестник',hp:150,s:2,body:'#5c6bc0',mane:'#fff176',o:{wings:1},mv:['dive','rain','charge','shoot3']},ab:'storm',
  npc:['Ветры здесь сильные — они будут сносить тебя. Пари на зонтике!','Буревестник был капитаном небесной стражи. Он пикирует с неба — отпрыгивай!'],
  lore:'Облачный Город держится на песне ветра. Пока Буревестник в плену Порчи, город медленно падает.',win:'Буревестник свободен! Он научил тебя «Песне Бури»: Звёздная стрела теперь летит ТРОЙНЫМ залпом.'},
 {n:'Огненные Кузни',sub:'сердце горы',sky:['#2a0a05','#7a2a10'],far:'#4a1a0c',near:'#2e0f07',gr:'#3a2420',top:'#ff7043',th:'forge',ec:'#4a2a20',mote:'#ffab40',hz:'lava',en:['charger','spitter','crawl','hopper'],
  boss:{n:'Лавовый Голем',hp:190,s:2.6,body:'#5d4037',mane:'#ff6d00',o:{},mv:['slam','leap','rain','charge']},ab:'cloak',
  npc:['Здесь ковали клинки рыцарей. Не падай в лаву!','Лавовый Голем не чувствует боли. Бей его, пока он отдыхает после ударов.'],
  lore:'Последний кузнец выковал Теневой Плащ и спрятал его в сердце Голема, чтобы Король его не нашёл.',win:'Из обломков Голема ты достаёшь Теневой Плащ: во время рывка ты НЕУЯЗВИМ.'},
 {n:'Тёмный Замок',sub:'трон Кошмара',sky:['#05030a','#2a0f2f'],far:'#1a0b22',near:'#0f0716',gr:'#1e1a24',top:'#7e57c2',th:'castle',ec:'#2a1f33',mote:'#ce93d8',hz:'spikes',en:['charger','fly','spitter','hopper','crawl'],
  boss:{n:'Король Кошмаров',hp:260,s:2.4,body:'#1a1028',mane:'#7c4dff',o:{wings:1,horn:1,crown:1},mv:['teleport','charge','slam','dive','shoot3','rain','summon']},ab:null,
  npc:['Вот и всё, юный рыцарь. Дальше — только ОН.','Что бы ни случилось… я горжусь тобой. Ху-ху.'],
  lore:'Король Кошмаров когда-то был просто пони, который боялся темноты. Страх стал его короной.',win:''}];
const INTRO=['Давным-давно королевство Гармония жило в мире под светом шести Камней Гармонии.','Но из глубин Тёмного Замка поднялся Король Кошмаров. Он расколол Камни, и Порча расползлась по земле, превращая добрых пони в безумных теней.','Ты — Искра, последний ученик ордена Пони-Рыцарей. В твоих копытах — старый клинок наставника, а в сердце — свет, который Порча не смогла погасить.','Пройди через шесть земель, освободи стражей от Порчи и верни Гармонию домой.'];
const OUTRO=['Король Кошмаров пал. Из его короны вылетели шесть искр — осколки Камней Гармонии.','Камни соединились, и над королевством впервые за сто лет взошло солнце.','Порча отступила. Пони просыпаются, будто от долгого сна. А сам Король… стал маленьким испуганным жеребёнком.','Мудрая Сова: «Ху-ху… Я знала, что у тебя получится, рыцарь».'];
const SKT=[
 {b:'⚔ Клинок',c:'#ff8a65',s:[['dmg','Острый клинок','+1 к урону меча',3],['crit','Точный удар','+10% шанс крита (×2 урона)',3],['reach','Длинный клинок','+25% к дальности удара',2],['speed','Шквал ударов','Удары на 15% быстрее',2]]},
 {b:'✨ Магия',c:'#b388ff',s:[['soul','Жажда души','+50% души за удар',2],['bolt','Мощь заклинаний','+4 к урону Звёздной стрелы',3],['heal','Быстрое лечение','Лечение на 30% быстрее',2],['vamp','Вампиризм','8% шанс вылечиться при убийстве',3]]},
 {b:'🛡 Стойкость',c:'#69f0ae',s:[['hp','Крепкое сердце','+1 маска здоровья',3],['iframe','Стальная воля','+0.3 с неуязвимости после урона',2],['dashd','Теневой таран','Рывок наносит урон врагам',1],['thorn','Колючий доспех','Получая урон, ранишь всех врагов рядом',1]]}];
const CH={magnet:['🧲 Магнит','Биты сами летят к вам',150],swift:['💨 Быстрые копыта','+20% к скорости бега',220],heart:['💖 Сердце Гармонии','+2 маски здоровья',350],fury:['🔥 Ярость павших','+3 к урону, когда осталась 1 маска',260],soulc:['🔮 Ловец душ','+40% души за удар',240],lucky:['🍀 Подкова удачи','+15% шанс крита',300],long:['🗡 Клинок Селестии','+20% дальности удара',280],greed:['💰 Жадность','+50% битов с врагов',200]};
const ET={crawl:{hp:5,s:.8,xp:5,bits:3},hopper:{hp:6,s:.75,xp:7,bits:4},fly:{hp:4,s:.7,xp:6,bits:3},spitter:{hp:7,s:1,xp:8,bits:5},charger:{hp:12,s:1.15,xp:12,bits:7}};
const ABN={dash:'Рывок',dj:'Двойной прыжок',glide:'Парение',storm:'Песнь Бури',cloak:'Теневой плащ'};
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function gen(a,r){const A=AREAS[a],R=rng(7919*a+131*r+17),L={a,r,solids:[],haz:[],en:[],bits:[],items:[],wind:[],w:0};
 const seg=(x,y,w)=>L.solids.push({x,y,w,h:VH+200-y}),plat=(x,y,w)=>L.solids.push({x,y,w,h:14,ow:1});
 if(r===3){seg(-200,470,1500);L.solids.push({x:-60,y:-600,w:60,h:1200},{x:1100,y:-600,w:60,h:1200});plat(170,345,150);plat(780,345,150);L.w=1100;L.arena=true;L.floorY=470;return L;}
 let x=600,gy=440;const len=2600+a*250+r*350;seg(-200,gy,800);
 if(r===0)L.items.push({k:'bench',x:200,y:gy},{k:'npc',x:330,y:gy},{k:'tablet',x:480,y:gy});
 let shard=r!==1;
 while(x<len){
  if(R()<.55){const g=75+R()*(55+a*8);if(A.hz==='wind'&&R()<.7)L.wind.push({x:x-160,w:g+320,f:(R()<.5?-1:1)*(120+a*8)});x+=g;}
  gy=Math.max(320,Math.min(470,gy+Math.round((R()*2-1)*55)));const w=260+R()*360;seg(x,gy,w);
  if(A.hz==='spikes'&&w>380&&R()<.5){L.haz.push({x:x+w/2-35,y:gy-16,w:70,h:16});plat(x+w/2-80,gy-105,160);}
  if(R()<.65){const pw=110+R()*70,px=x+R()*(w-pw),py=gy-105-R()*25;plat(px,py,pw);for(let i=0;i<3;i++)L.bits.push({x:px+pw/2-30+i*30,y:py-24});
   if(!shard&&x>len*.35){plat(px+30,py-105,120);L.items.push({k:'shard',x:px+90,y:py-105});shard=true;}
   else if(R()<.3){plat(px+40,py-105,110);L.bits.push({x:px+95,y:py-130});}}
  const n=1+(R()<.35+a*.08?1:0)+(r===2&&R()<.4?1:0);
  for(let i=0;i<n;i++){const t=A.en[Math.floor(R()*A.en.length)];L.en.push({t,x:x+40+R()*(w-80),y:t==='fly'?gy-150-R()*60:gy});}
  x+=w;}
 if(!shard){plat(x-260,gy-105,120);plat(x-130,gy-210,120);L.items.push({k:'shard',x:x-70,y:gy-210});}
 x+=90;gy=440;seg(x,gy,600);L.items.push({k:'exit',x:x+420,y:gy});L.w=x+600;return L;}
function pony(x,cx,by,f,c,t,o={}){const s=o.s||1;x.save();x.translate(cx,by);x.scale(f*s,s);const run=o.run?Math.sin(t*14):0;
 x.fillStyle=c.mane;x.beginPath();x.moveTo(-15,-22);x.quadraticCurveTo(-31,-18+run*3,-26,-3);x.quadraticCurveTo(-20,-13,-13,-17);x.fill();
 x.fillStyle=c.leg||c.body;[-11,-5,6,12].forEach((lx,i)=>{const sw=(i%2?run:-run)*4;x.fillRect(lx+sw-2,-12,5,12);});
 x.fillStyle=c.body;x.beginPath();x.ellipse(0,-18,17,10,0,0,7);x.fill();
 x.beginPath();x.moveTo(7,-22);x.lineTo(15,-36);x.lineTo(22,-31);x.lineTo(14,-15);x.fill();
 const head=(hx,hy)=>{x.fillStyle=c.body;x.beginPath();x.ellipse(hx,hy,9,7,.3,0,7);x.fill();x.beginPath();x.ellipse(hx+7,hy+3,5,4,.2,0,7);x.fill();x.beginPath();x.moveTo(hx-5,hy-6);x.lineTo(hx-3,hy-14);x.lineTo(hx+1,hy-6);x.fill();
  x.fillStyle=c.eye||'#222';x.beginPath();x.arc(hx+2,hy-1,o.big?2.4:1.8,0,7);x.fill();};
 if(o.heads){x.save();x.translate(-6,-4);head(14,-38);x.restore();x.save();x.translate(-14,6);head(14,-38);x.restore();}
 if(o.wings){x.fillStyle=c.wing||c.mane;const fl=Math.sin(t*(o.fly?18:3))*8;x.globalAlpha=.9;x.beginPath();x.moveTo(-4,-26);x.lineTo(-22,-46-fl);x.lineTo(-8,-40-fl);x.lineTo(6,-28);x.fill();x.globalAlpha=1;}
 head(20,-36);
 if(o.horn){x.fillStyle=o.hornC||'#ffe9a8';x.beginPath();x.moveTo(20,-43);x.lineTo(27,-58);x.lineTo(24,-42);x.fill();}
 x.fillStyle=c.mane;x.beginPath();x.moveTo(13,-44);x.quadraticCurveTo(3,-40,5,-23);x.quadraticCurveTo(10,-32,17,-37);x.fill();
 if(o.crown){x.fillStyle='#ffd54f';x.beginPath();x.moveTo(12,-44);x.lineTo(13,-52);x.lineTo(16,-47);x.lineTo(19,-53);x.lineTo(21,-46);x.lineTo(24,-51);x.lineTo(24,-43);x.fill();}
 if(o.helm){x.fillStyle='#cfd5e6';x.beginPath();x.arc(19,-39,8.5,Math.PI,0);x.fill();x.fillRect(10,-40,18,3);x.fillStyle='#ff4d6d';x.beginPath();x.moveTo(18,-47);x.quadraticCurveTo(10,-58,4,-52);x.quadraticCurveTo(12,-52,16,-46);x.fill();}
 if(o.armor){x.fillStyle='#6b6b80';x.fillRect(-15,-28,30,8);x.fillStyle='#9a9ab0';x.beginPath();x.moveTo(14,-46);x.lineTo(18,-56);x.lineTo(20,-45);x.fill();}
 x.restore();}
function bg(x,A,cam,t){const g=x.createLinearGradient(0,0,0,VH);g.addColorStop(0,A.sky[0]);g.addColorStop(1,A.sky[1]);x.fillStyle=g;x.fillRect(0,0,VW,VH);
 if(A.th==='hills'||A.th==='castle'){x.fillStyle=A.th==='castle'?'#d8c6ff22':'#fff6';x.beginPath();x.arc(780,90,40,0,7);x.fill();}
 for(let L2=0;L2<2;L2++){const p=L2?.45:.18;x.fillStyle=L2?A.near:A.far;x.globalAlpha=A.th==='clouds'?(L2?.85:.5):1;const base=Math.floor(cam*p/320),off=-((cam*p)%320);
  for(let i=-1;i<5;i++){const k=(((base+i)*2654435761)>>>0)%997/997,bx=off+i*320,hh=(L2?120:200)*(.6+k*.6),by=VH-(L2?40:90);x.beginPath();
   switch(A.th){case 'hills':x.ellipse(bx+160,by,220,hh,0,Math.PI,0);break;
    case 'crystal':x.moveTo(bx+40,by+60);x.lineTo(bx+110,by-hh);x.lineTo(bx+180,by+60);x.moveTo(bx+170,0);x.lineTo(bx+210,hh*.6);x.lineTo(bx+250,0);break;
    case 'mush':x.rect(bx+140,by-hh,22,hh+60);x.ellipse(bx+151,by-hh,70*(.6+k),30,0,Math.PI,0);break;
    case 'clouds':x.ellipse(bx+100,by-hh*.6,110,40,0,0,7);x.ellipse(bx+190,by-hh*.6-20,80,36,0,0,7);break;
    case 'forge':x.rect(bx+60,by-hh,90,hh+60);x.rect(bx+90,by-hh-50,22,50);break;
    case 'castle':x.rect(bx+80,by-hh,60,hh+60);x.moveTo(bx+70,by-hh);x.lineTo(bx+110,by-hh-60);x.lineTo(bx+150,by-hh);x.rect(bx+170,by-hh*.7,40,hh);break;}
   x.fill();
   if(A.th==='forge'){x.fillStyle='#ff6d0066';x.fillRect(bx+93,by-hh-58+Math.sin(t*3+i)*3,16,10);x.fillStyle=L2?A.near:A.far;}
   if(A.th==='castle'&&L2){x.fillStyle='#ffd54f88';x.fillRect(bx+102,by-hh+30,8,12);x.fillStyle=A.near;}}
  if(A.th!=='clouds')x.fillRect(0,VH-(L2?40:90),VW,90);x.globalAlpha=1;}}
addCSS(`.pk-ov .pk-sk.max:disabled{opacity:1}`);
const newSave=()=>({v:2,lv:1,xp:0,sp:0,sk:{},bits:0,owned:[],eq:[],ab:{},area:0,room:0,maxA:0,bosses:[],shards:[],tablets:[],vis:{},shade:null,ng:0,kills:0,deaths:0,time:0,shopShard:false,started:false});
storeApp('ponyknight',{cat:'game',dev:'Windows11WEB Studios',rating:5.0,size:'666 МБ',desc:'Pony Knight II: Сердце Гармонии — метроидвания в духе Hollow Knight. 6 земель, 24 локации, 6 боссов, сюжет с NPC, дерево навыков, амулеты, способности и Новая игра+.',feat:['6 земель · 24 локации · 6 боссов с двумя фазами','Дерево навыков (12 навыков), 8 амулетов, лавка','Рывок, двойной прыжок, парение, магия, тень после смерти, NG+'],hero:true},{name:'Pony Knight',icon:AI.pony,keywords:'pony knight пони рыцарь hollow игра метроидвания',launch(){
 const root=el(`<div class="pk" tabindex="0"><canvas width="${VW}" height="${VH}"></canvas><div class="pk-ov" hidden></div><div class="pk-dlg" hidden></div></div>`);
 const win=WM.create({app:'ponyknight',title:'Pony Knight II — Сердце Гармонии',icon:AI.pony(),width:1000,height:640,content:root,minW:640,minH:420});
 const cv=$('canvas',root),x=cv.getContext('2d'),ov=$('.pk-ov',root),dlg=$('.pk-dlg',root);
 let S=Object.assign(newSave(),LS.get('pk2',{}));
 let L=null,P=null,E=[],shots=[],bolts=[],parts=[],nums=[],drops=[],cam=0,shake=0,state='ui',banner=null,combo={n:0,t:0},raf,last=0,T=0,uiBack=null,dq=null,flash=0,ovAct={};
 const keys={},pressed=new Set();
 const K={left:['ArrowLeft','KeyA'],right:['ArrowRight','KeyD'],up:['ArrowUp','KeyW'],down:['ArrowDown','KeyS'],jump:['Space','KeyZ'],atk:['KeyJ','KeyX'],dash:['ShiftLeft','ShiftRight','KeyK','KeyC'],spell:['KeyL','KeyV'],focus:['KeyF','KeyH'],act:['KeyE','Enter']};
 const on=a=>K[a].some(c=>keys[c]),pr=a=>K[a].some(c=>pressed.has(c));
 const save=()=>LS.set('pk2',S),sk=k=>S.sk[k]||0,eq=k=>S.eq.includes(k);
 const maxHp=()=>5+sk('hp')+Math.floor(S.shards.length/3)+(eq('heart')?2:0),ngm=()=>1+S.ng*.5,need=()=>25+S.lv*20;
 const ovl=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
 const solidAt=(px,py)=>L.solids.some(s=>px>=s.x&&px<=s.x+s.w&&py>=s.y&&py<=s.y+s.h);
 const groundY=px=>{let m=VH;for(const s of L.solids)if(!s.ow&&px>=s.x&&px<=s.x+s.w&&s.y<m&&s.y>0)m=s.y;return m;};
 const burst=(bx,by,c,n)=>{for(let i=0;i<n;i++){const a=Math.random()*7,v=60+Math.random()*220;parts.push({x:bx,y:by,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.4+Math.random()*.4,c,s:3});}};
 root.addEventListener('keydown',e=>{if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'].includes(e.code))e.preventDefault();
  if(state==='dlg'){if(['KeyE','Enter','Space','KeyZ','KeyJ','KeyX'].includes(e.code)&&!e.repeat)nextDlg();keys[e.code]=true;return;}
  if(e.code==='Escape'||e.code==='KeyP'){if(state==='play')pauseMenu();else if(state==='ui'&&uiBack)uiBack();return;}
  if(e.code==='KeyM'&&state==='play'){mapMenu(false,resume);return;}
  if(e.code==='Tab'&&state==='play'){skillMenu(resume);return;}
  if(!keys[e.code])pressed.add(e.code);keys[e.code]=true;});
 root.addEventListener('keyup',e=>{keys[e.code]=false;});
 root.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
 root.addEventListener('pointerdown',()=>root.focus());
 ov.addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b||b.disabled)return;Sound.click();const f=ovAct[b.dataset.k];f&&f(b.dataset.v);});
 dlg.addEventListener('click',()=>nextDlg());
 function showOv(html,acts,back){ov.innerHTML=html;ov.hidden=false;ovAct=acts||{};uiBack=back||null;state='ui';root.focus();}
 function resume(){ov.hidden=true;state='play';uiBack=null;root.focus();}
 function dialog(lines,who,cb){dq={lines:[...lines],who,cb,i:0};dlg.hidden=false;state='dlg';showLine();root.focus();}
 function showLine(){dlg.innerHTML=`<b>${esc(dq.who)}</b>${esc(dq.lines[dq.i])}<small>E / Enter / клик — далее (${dq.i+1}/${dq.lines.length})</small>`;}
 function nextDlg(){if(!dq)return;dq.i++;if(dq.i>=dq.lines.length){dlg.hidden=true;const cb=dq.cb;dq=null;state='play';cb&&cb();}else showLine();}
 function mainMenu(){const has=S.started;L=null;
  showOv(`<h1>PONY KNIGHT</h1><h2>II · Сердце Гармонии</h2><p style="opacity:.8">6 земель · 24 локации · 6 боссов · дерево навыков · амулеты · Новая игра+</p><br>${has?`<button data-k="cont">Продолжить · ${esc(AREAS[S.area].n)} · ур. ${S.lv}${S.ng?' · НИ+'+S.ng:''}</button>`:''}<button data-k="new">Новая игра</button><button data-k="help">Управление</button>`,
  {cont:()=>{P=null;enter(S.area,S.room,{bench:S.room===0,full:true});},new:()=>has?showOv(`<h2>Начать заново?</h2><p>Весь прогресс будет потерян.</p><div class="row"><button data-k="y">Да</button><button data-k="n">Нет</button></div>`,{y:startNew,n:mainMenu},mainMenu):startNew(),help:()=>helpMenu(mainMenu)});}
 function startNew(){S=newSave();S.started=true;P=null;save();enter(0,0,{bench:true,full:true});dialog(INTRO,'Рассказчик',()=>dialog(['A/D — бег, Пробел — прыжок, J — удар мечом, L — звёздная стрела, F — лечение. Удары по врагам копят ДУШУ (шар слева).','Поговори с Совой и прочитай табличку (E). Все клавиши — в меню паузы (Esc).'],'Подсказка'));}
 function helpMenu(back){showOv(`<h2>Управление</h2><small>A/D или ←/→ — бег · Пробел/Z — прыжок (держать — выше, в воздухе — парение)<br>J/X — удар · W/↑ + удар — вверх · S/↓ + удар в воздухе — вниз (отскок от врагов и шипов)<br>L/V — Звёздная стрела (33 души) · F/H удерживать — лечение (33 души)<br>Shift/K — рывок · E/Enter — скамейка, Сова, таблички<br>Tab — навыки · M — карта · Esc — пауза<br><br>После смерти остаётся тень с вашими битами — вернитесь и коснитесь её.<br>Каждый босс даёт новую способность. 3 осколка маски = +1 здоровье.</small><br><button data-k="back">Назад</button>`,{back},back);}
 function pauseMenu(){showOv(`<h2>Пауза</h2><small>${esc(AREAS[L.a].n)} — ${L.r===3?'Логово босса':'локация '+(L.r+1)+'/3'} · в игре ${Math.floor(S.time/60)} мин</small><br><button data-k="res">Продолжить</button><button data-k="sk">Навыки${S.sp?` (${S.sp} очк.)`:''}</button><button data-k="ch">Амулеты</button><button data-k="map">Карта</button><button data-k="help">Управление</button><button data-k="quit">В главное меню</button>`,
  {res:resume,sk:()=>skillMenu(pauseMenu),ch:()=>charmMenu(false,pauseMenu),map:()=>mapMenu(false,pauseMenu),help:()=>helpMenu(pauseMenu),quit:()=>{save();mainMenu();}},resume);}
 function skillMenu(back){const bt=b=>b.s.reduce((s,q)=>s+sk(q[0]),0);
  showOv(`<h2>Дерево навыков</h2><small>Уровень ${S.lv} · свободных очков: <b>${S.sp}</b> · каждые 2 очка в ветке открывают следующий навык</small><div class="pk-tree">${SKT.map(b=>`<div class="pk-br"><h3 style="color:${b.c}">${b.b}</h3>${b.s.map((q,i)=>{const r=sk(q[0]),lock=bt(b)<i*2,mx=r>=q[3];return `<button class="pk-sk ${mx?'max':''}" data-k="buy" data-v="${q[0]}" ${lock||mx||!S.sp?'disabled':''}><b>${lock?'🔒 ':''}${q[1]} ${r}/${q[3]}</b><small>${q[2]}${lock?` · нужно ${i*2} очк. в ветке`:''}</small></button>`;}).join('')}</div>`).join('')}</div><button data-k="back">Назад</button>`,
  {buy:v=>{if(S.sp<=0)return;S.sp--;S.sk[v]=sk(v)+1;if(v==='hp'&&P)P.hp++;save();Sound.pop();skillMenu(back);},back},back);}
 function charmMenu(bench,back){const slots=3+Math.min(2,Math.floor(S.bosses.length/2));
  showOv(`<h2>Амулеты</h2><small>Ячейки: ${S.eq.length}/${slots}${bench?'':' · менять амулеты можно только на скамейке'}</small><div class="pk-ch">${S.owned.length?S.owned.map(k=>`<button data-k="tog" data-v="${k}" class="${eq(k)?'on':''}" ${bench?'':'disabled'}><b>${CH[k][0]}</b> ${eq(k)?'✔':''}<br><small>${CH[k][1]}</small></button>`).join(''):'<small>У вас пока нет амулетов. Загляните в лавку Мяты у скамейки.</small>'}</div><button data-k="back">Назад</button>`,
  {tog:k=>{if(eq(k))S.eq=S.eq.filter(q=>q!==k);else if(S.eq.length<slots)S.eq.push(k);else{Sound.error();return;}if(P)P.hp=Math.min(Math.max(P.hp,1),maxHp());save();charmMenu(bench,back);},back},back);}
 function shopMenu(back){const items=Object.keys(CH).filter(k=>!S.owned.includes(k));
  showOv(`<h2>🛒 Лавка Мяты</h2><small>«Заходи, рыцарь! Всё блестящее — за честные биты.» · у вас ◆ ${S.bits}</small><div class="pk-ch">${items.map(k=>`<button data-k="buy" data-v="${k}" ${S.bits<CH[k][2]?'disabled':''}><b>${CH[k][0]}</b> — ◆${CH[k][2]}<br><small>${CH[k][1]}</small></button>`).join('')}${S.shopShard?'':`<button data-k="shard" ${S.bits<500?'disabled':''}><b>💠 Осколок маски</b> — ◆500<br><small>3 осколка = +1 маска</small></button>`}${!items.length&&S.shopShard?'<small>Всё распродано!</small>':''}</div><button data-k="back">Назад</button>`,
  {buy:k=>{const c=CH[k][2];if(S.bits<c)return;S.bits-=c;S.owned.push(k);save();Sound.win();shopMenu(back);},shard:()=>{if(S.bits<500)return;S.bits-=500;S.shopShard=true;S.shards.push('shop');save();Sound.win();shopMenu(back);},back},back);}
 function benchMenu(){P.hp=maxHp();S.area=L.a;S.room=0;save();
  showOv(`<h2>🪑 Скамейка</h2><small>Здоровье восстановлено · игра сохранена</small><br><button data-k="sk">Навыки${S.sp?` <b style="color:#ffd54f">(+${S.sp})</b>`:''}</button><button data-k="ch">Амулеты</button><button data-k="shop">Лавка Мяты</button><button data-k="map">Карта / Перелёт</button><button data-k="res">Встать</button>`,
  {sk:()=>skillMenu(benchMenu),ch:()=>charmMenu(true,benchMenu),shop:()=>shopMenu(benchMenu),map:()=>mapMenu(true,benchMenu),res:resume},resume);}
 function mapMenu(travel,back){showOv(`<h2>Карта Гармонии</h2><small>Осколки маски: ${S.shards.length} · Способности: ${Object.keys(S.ab).map(k=>ABN[k]).join(', ')||'нет'}${travel?'':' · перелёт — со скамейки'}</small><div class="pk-map">${AREAS.map((A,i)=>{const lock=i>S.maxA;return `<div class="pk-ar ${lock?'lock':''} ${L&&L.a===i?'cur':''}"><b>${lock?'???':A.n}</b><div class="rm">${[0,1,2,3].map(r=>`<i class="${S.vis[i+'-'+r]?(r===3&&S.bosses.includes(i)?'c':'v'):''}"></i>`).join('')}</div>${lock?'':`${S.bosses.includes(i)?'✔ ':'☠ '}${A.boss.n}<br>${S.shards.includes(i)?'💠 осколок найден':'💠 ?'}${S.tablets.includes(i)?' · 📜':''}`}${travel&&!lock?`<button data-k="go" data-v="${i}">Перелететь</button>`:''}</div>`;}).join('')}</div><button data-k="back">Назад</button>`,{go:v=>enter(+v,0,{bench:true}),back},back);}
 function mkE(t,ex,gy){const D=ET[t],s=D.s,hp=Math.round(D.hp*(1+L.a*.35)*ngm()),w=30*s+6,h=40*s;return{t,x:ex-w/2,y:t==='fly'?gy:gy-h,w,h,vx:0,vy:0,hp,max:hp,dir:Math.random()<.5?-1:1,tm:Math.random()*2,st:0,flash:0,kb:0,s,hx:ex,hy:gy};}
 function mkBoss(a){const B=AREAS[a].boss,hp=Math.round(B.hp*ngm()),w=34*B.s,h=40*B.s;return{boss:1,t:'boss',x:800,y:470-h,w,h,vx:0,vy:0,hp,max:hp,face:-1,st:'idle',tm:1.6,mt:0,k:0,ph:1,flash:0,B};}
 function enter(a,r,o={}){L=gen(a,r);S.area=a;S.room=r;S.vis[a+'-'+r]=1;S.maxA=Math.max(S.maxA,a);
  E=L.en.map(q=>mkE(q.t,q.x,q.y));drops=L.bits.map(b=>({x:b.x,y:b.y,v:1,fl:1,vx:0,vy:0}));shots=[];bolts=[];parts=[];nums=[];
  L.items=L.items.filter(it=>!(it.k==='shard'&&S.shards.includes(a)));
  if(S.shade&&S.shade.a===a&&S.shade.r===r)L.items.push({k:'shade',x:S.shade.x,y:groundY(S.shade.x)});
  const sx=o.bench?200:60,hp=P&&!o.full?Math.min(P.hp,maxHp()):maxHp(),soul=P?P.soul:0;
  P={x:sx,y:0,w:30,h:38,vx:0,vy:0,face:1,hp,soul,inv:1,atkT:0,atkCD:0,dashT:0,dashCD:0,kb:0,air:1,coyote:0,focus:0,ground:false,hits:new Set(),hitD:new Set(),atkDir:'side'};
  P.y=groundY(sx+15)-P.h;P.safe={x:P.x,y:P.y};cam=Math.max(0,Math.min(L.w-VW,P.x-VW/2));
  if(r===3&&!S.bosses.includes(a)){E.push(mkBoss(a));banner={t:3.5,a:AREAS[a].boss.n,b:'Страж земли «'+AREAS[a].n+'»'};}
  else if(r===3)L.items.push({k:'exit',x:1000,y:470});
  else if(r===0)banner={t:3.5,a:AREAS[a].n,b:AREAS[a].sub};
  state='play';ov.hidden=true;uiBack=null;save();root.focus();}
 function collide(o,dt){o.wall=0;o.x+=o.vx*dt;for(const s of L.solids){if(s.ow||!ovl(o,s))continue;if(o.vx>0){o.x=s.x-o.w;o.wall=1;}else if(o.vx<0){o.x=s.x+s.w;o.wall=-1;}}
  const pb=o.y+o.h;o.y+=o.vy*dt;o.ground=false;o.on=null;
  for(const s of L.solids){if(!ovl(o,s))continue;if(s.ow){if(o.vy>=0&&pb<=s.y+2){o.y=s.y-o.h;o.vy=0;o.ground=true;o.on=s;}continue;}
   if(o.vy>=0){o.y=s.y-o.h;o.vy=0;o.ground=true;o.on=s;}else{o.y=s.y+s.h;o.vy=0;}}}
 function atkBox(){const r=(1+.25*sk('reach'))*(eq('long')?1.2:1);if(P.atkDir==='up')return{x:P.x-12,y:P.y-62*r,w:P.w+24,h:62*r};if(P.atkDir==='down')return{x:P.x-10,y:P.y+P.h-4,w:P.w+20,h:60*r};const w=66*r;return{x:P.face>0?P.x+P.w-6:P.x-w+6,y:P.y-10,w,h:P.h+18};}
 function hit(e,d,melee){const crit=Math.random()<.1*sk('crit')+(eq('lucky')?.15:0);if(crit)d*=2;e.hp-=d;e.flash=.12;nums.push({x:e.x+e.w/2,y:e.y,t:crit?d+'!':d,l:.8,c:crit?'#ffd54f':'#fff'});
  if(melee){P.soul=Math.min(99,P.soul+11*(1+.5*sk('soul'))*(eq('soulc')?1.4:1));if(!e.boss){e.vx=P.face*220;e.kb=.15;}shake=Math.max(shake,.08);}
  combo.n++;combo.t=2;burst(e.x+e.w/2,e.y+e.h/2,crit?'#ffd54f':'#fff',crit?10:5);Sound.click();if(e.hp<=0&&!e.dead)kill(e);}
 function gainXp(v){S.xp+=v;nums.push({x:P.x+P.w/2,y:P.y-24,t:'+'+v+' XP',l:1,c:'#b388ff'});while(S.xp>=need()){S.xp-=need();S.lv++;S.sp++;banner={t:3,a:'Новый уровень: '+S.lv,b:'+1 очко навыка · Tab — дерево навыков'};Sound.win();}}
 function kill(e){e.dead=true;S.kills++;burst(e.x+e.w/2,e.y+e.h/2,AREAS[L.a].mote,24);Sound.pop();if(e.boss){bossDown(e);return;}
  const D=ET[e.t],nb=Math.round(D.bits*(eq('greed')?1.5:1)*(1+L.a*.3));for(let i=0;i<nb;i++)drops.push({x:e.x+e.w/2,y:e.y+e.h/2,vx:(Math.random()*2-1)*160,vy:-200-Math.random()*200,v:1});
  gainXp(Math.round(D.xp*(1+L.a*.5)*ngm()));if(Math.random()<.08*sk('vamp')&&P.hp<maxHp()){P.hp++;nums.push({x:P.x,y:P.y-10,t:'+♥',l:1,c:'#ff8a80'});}}
 function bossDown(b){const a=L.a,A=AREAS[a];shake=.8;E.forEach(e=>e.dead=true);shots=[];if(!S.bosses.includes(a))S.bosses.push(a);if(A.ab)S.ab[A.ab]=1;
  for(let i=0;i<30+a*10;i++)drops.push({x:b.x+b.w/2,y:b.y+b.h/2,vx:(Math.random()*2-1)*300,vy:-300-Math.random()*400,v:2});gainXp(Math.round((100+a*70)*ngm()));S.maxA=Math.max(S.maxA,Math.min(5,a+1));save();Sound.win();
  setTimeout(()=>{if(!win.el.isConnected||!L||L.a!==a)return;if(a===5)dialog(OUTRO,'Эпилог',ending);else dialog([A.win,'Путь в «'+AREAS[a+1].n+'» открыт. Иди к выходу справа →'],A.boss.n+' повержен(а)!',()=>L.items.push({k:'exit',x:1000,y:470}));},1500);}
 function ending(){S.vis={};S.bosses=[];S.ng++;S.area=0;S.room=0;S.maxA=0;S.shade=null;save();
  showOv(`<h1>КОНЕЦ</h1><h2>Гармония спасена!</h2><p>Уровень ${S.lv} · врагов повержено: ${S.kills} · падений: ${S.deaths} · время: ${Math.floor(S.time/60)} мин</p><p style="opacity:.8">Открыта <b>Новая игра+ ${S.ng}</b>: враги сильнее на ${S.ng*50}%, но навыки, амулеты и способности остаются.</p><br><button data-k="ng">Начать Новую игру+</button><button data-k="menu">Главное меню</button>`,{ng:()=>enter(0,0,{bench:true,full:true}),menu:mainMenu});}
 function hurt(d,src,force){if(!force&&(P.inv>0||(P.dashT>0&&S.ab.cloak)))return false;P.hp-=d;P.inv=1+.3*sk('iframe');P.kb=.2;P.vx=(P.x+P.w/2<src?-1:1)*330;P.vy=-380;shake=.3;flash=.25;combo.n=0;Sound.error();
  if(sk('thorn'))for(const e of E)if(!e.dead&&Math.hypot(e.x+e.w/2-P.x-P.w/2,e.y+e.h/2-P.y-P.h/2)<120)hit(e,4,false);
  if(P.hp<=0)die();return true;}
 function die(){S.deaths++;state='ui';if(S.bits>0)S.shade={a:L.a,r:L.r<3?L.r:0,x:L.r<3?P.safe.x:560,bits:S.bits};S.bits=0;save();
  showOv(`<h1 style="color:#ff6b9a">ВЫ ПАЛИ</h1><p>${S.shade?'Твоя тень осталась в «'+esc(AREAS[S.shade.a].n)+'» — найди её, чтобы вернуть ◆'+S.shade.bits:'Тьма на миг поглотила тебя…'}</p><br><button data-k="go">Очнуться на скамейке</button><button data-k="menu">Главное меню</button>`,{go:()=>enter(L.a,0,{bench:true,full:true}),menu:mainMenu});}
 function respawnSafe(){P.x=P.safe.x;P.y=P.safe.y;P.vx=P.vy=0;P.kb=0;P.dashT=0;flash=.4;}
 function collect(it){L.items.splice(L.items.indexOf(it),1);
  if(it.k==='shard'){S.shards.push(L.a);if(S.shards.length%3===0)P.hp++;banner={t:3,a:'💠 Осколок маски',b:S.shards.length%3===0?'Маска собрана! +1 к здоровью':`Собрано ${S.shards.length%3}/3`};Sound.win();save();}
  else if(it.k==='shade'){S.bits+=S.shade.bits;nums.push({x:P.x,y:P.y-20,t:'+◆'+S.shade.bits,l:1.5,c:'#ffd54f'});S.shade=null;burst(it.x,P.y,'#222',30);Sound.win();save();}
  else if(it.k==='exit'){if(L.r<3)enter(L.a,L.r+1);else if(L.a<5)enter(L.a+1,0,{bench:true});return true;}return false;}
 function interact(it){if(it.k==='bench'){Sound.pop();benchMenu();}else if(it.k==='npc')dialog(AREAS[L.a].npc,'🦉 Мудрая Сова');else if(it.k==='tablet'){if(!S.tablets.includes(L.a)){S.tablets.push(L.a);gainXp(20);save();}dialog([AREAS[L.a].lore],'📜 Древняя табличка');}}
 function upP(dt){const sp=280*(eq('swift')?1.2:1);let mv=(on('right')?1:0)-(on('left')?1:0);P.atkCD-=dt;P.dashCD-=dt;P.inv-=dt;P.atkT-=dt;
  const ft=1.1*(1-.3*sk('heal'));
  if(on('focus')&&P.soul>=33&&P.ground&&P.hp<maxHp()&&P.dashT<=0){P.focus+=dt;mv=0;if(Math.random()<.5)parts.push({x:P.x+Math.random()*P.w,y:P.y+P.h,vx:0,vy:-60-Math.random()*60,l:.6,c:'#fff',s:2});if(P.focus>=ft){P.focus=0;P.soul-=33;P.hp++;Sound.pop();burst(P.x+P.w/2,P.y+P.h/2,'#fff',14);}}else P.focus=0;
  if(P.dashT>0){P.dashT-=dt;P.vx=P.face*740;P.vy=0;parts.push({x:P.x+P.w/2,y:P.y+P.h/2+(Math.random()*20-10),vx:-P.face*40,vy:0,l:.25,c:S.ab.cloak?'#111':'#cfc6ff',s:4});}
  else{if(P.kb>0)P.kb-=dt;else{P.vx=mv*sp;if(mv)P.face=mv;}let g=GR;if(!on('jump')&&P.vy<0)g*=2.2;P.vy+=g*dt;P.glide=!!(S.ab.glide&&on('jump')&&P.vy>0&&!P.ground);P.vy=Math.min(P.vy,P.glide?95:950);}
  for(const w of L.wind)if(P.x+P.w>w.x&&P.x<w.x+w.w)P.x+=w.f*dt*(P.glide?1.6:1);
  if(pr('jump')){if(P.ground||P.coyote>0){P.vy=-760;P.coyote=0;P.ground=false;}else if(S.ab.dj&&P.air>0){P.air--;P.vy=-700;burst(P.x+P.w/2,P.y+P.h,'#fff',8);}}
  if(pr('dash')&&S.ab.dash&&P.dashCD<=0){P.dashT=.17;P.dashCD=.55;P.hitD=new Set();Sound.click();}
  collide(P,dt);
  if(P.ground){P.coyote=.1;P.air=1;const s=P.on;if(s&&!s.ow&&P.x>s.x+20&&P.x+P.w<s.x+s.w-20&&!L.haz.some(h=>ovl(h,{x:P.x-50,y:P.y,w:P.w+100,h:P.h+4})))P.safe={x:P.x,y:P.y};}else P.coyote-=dt;
  P.x=Math.max(0,Math.min(L.w-P.w,P.x));
  if(pr('atk')&&P.atkCD<=0&&P.focus===0){P.atkDir=on('up')?'up':(on('down')&&!P.ground?'down':'side');P.atkT=.14;P.atkCD=.36*(1-.15*sk('speed'));P.hits=new Set();Sound.click();}
  if(P.atkT>0){const hb=atkBox();for(const e of E){if(P.hits.has(e)||e.dead||e.hide)continue;if(ovl(hb,e)){P.hits.add(e);hit(e,2+sk('dmg')+(eq('fury')&&P.hp===1?3:0),true);if(P.atkDir==='down'){P.vy=-600;P.air=1;}}}
   if(P.atkDir==='down')for(const h of L.haz)if(ovl(hb,h)&&!P.hits.has(h)){P.hits.add(h);P.vy=-600;P.air=1;}}
  if(pr('spell')&&P.soul>=33){P.soul-=33;const d=6+4*sk('bolt');for(const an of (S.ab.storm?[-.18,0,.18]:[0]))bolts.push({x:P.x+P.w/2,y:P.y+P.h/2-4,vx:P.face*720*Math.cos(an),vy:720*Math.sin(an),l:.9,d,hits:new Set()});Sound.pop();}
  if(P.dashT>0&&sk('dashd'))for(const e of E)if(!P.hitD.has(e)&&!e.dead&&!e.hide&&ovl(P,e)){P.hitD.add(e);hit(e,3+sk('dmg'),false);}
  for(const h of L.haz)if(ovl(P,h)){hurt(1,P.x,true);if(P.hp>0)respawnSafe();return;}
  if(P.y>VH+60){hurt(1,0,true);if(P.hp>0)respawnSafe();return;}
  let near=null;const pcx=P.x+P.w/2;
  for(const it of [...L.items]){if(it.k==='shard'||it.k==='shade'||it.k==='exit'){const iy=it.k==='exit'?it.y-60:it.k==='shade'?it.y-25:it.y-20;if(Math.abs(pcx-it.x)<30&&Math.abs(P.y+P.h/2-iy)<50&&collect(it))return;}
   else if(Math.abs(pcx-it.x)<40&&Math.abs(P.y+P.h-it.y)<20)near=it;}
  P.near=near;if(near&&pr('act'))interact(near);}
 function upE(e,dt){if(e.dead)return;e.flash-=dt;if(e.boss)return upBoss(e,dt);const px=P.x+P.w/2,py=P.y+P.h/2,ex=e.x+e.w/2,ey=e.y+e.h/2,dx=px-ex,dist=Math.hypot(dx,py-ey);e.tm-=dt;if(e.kb>0)e.kb-=dt;
  switch(e.t){
   case 'crawl':if(e.kb<=0)e.vx=e.dir*(55+L.a*6);break;
   case 'hopper':if(e.ground){if(e.kb<=0)e.vx=0;if(e.tm<=0&&dist<420){e.tm=1.2+Math.random();e.vy=-620;e.vx=Math.sign(dx)*190;e.dir=Math.sign(dx)||1;}}break;
   case 'charger':if(e.st===0){if(e.kb<=0)e.vx=e.dir*45;if(Math.abs(dx)<320&&Math.abs(py-ey)<70&&e.tm<=0){e.st=1;e.tm=.45;e.dir=Math.sign(dx)||1;e.vx=0;}}else if(e.st===1){e.vx=0;if(e.tm<=0){e.st=2;e.tm=1;}}else{e.vx=e.dir*430;if(e.tm<=0||e.wall){e.st=0;e.tm=1.2;}}break;
   case 'spitter':e.vx=0;e.dir=Math.sign(dx)||1;if(e.tm<=0&&dist<520){e.tm=2.2;const an=Math.atan2(py-(e.y+10),dx);shots.push({x:ex,y:e.y+10,vx:Math.cos(an)*260,vy:Math.sin(an)*260,r:7,l:3,c:AREAS[L.a].mote});}break;
   case 'fly':{const ch=dist<450,tx=ch?px:e.hx,ty=(ch?py-20:e.hy)+Math.sin(T*3+e.hx)*30,ddx=tx-ex,ddy=ty-ey,dd=Math.hypot(ddx,ddy)||1,v=ch?110+L.a*8:50;e.x+=ddx/dd*v*dt+(e.kb>0?e.vx*dt:0);e.y+=ddy/dd*v*dt;e.dir=Math.sign(ddx)||e.dir;break;}}
  if(e.t!=='fly'){e.vy=Math.min(e.vy+GR*dt,900);collide(e,dt);
   if((e.t==='crawl'||(e.t==='charger'&&e.st===0))&&e.ground&&e.kb<=0){const fx=e.dir>0?e.x+e.w+4:e.x-4;if(e.wall||!solidAt(fx,e.y+e.h+6))e.dir*=-1;}
   if(e.t==='charger'&&e.st===2&&e.ground){const fx=e.dir>0?e.x+e.w+4:e.x-4;if(!solidAt(fx,e.y+e.h+6)){e.st=0;e.tm=1;e.vx=0;}}
   if(e.y>VH+100)e.dead=true;}
  if(ovl(P,e))hurt(L.a>=4||(e.t==='charger'&&L.a>=2)?2:1,ex);}
 function upBoss(b,dt){const px=P.x+P.w/2,bx=b.x+b.w/2,spd=b.ph===2?1.35:1,FL=L.floorY;b.mt+=dt*spd;b.tm-=dt*spd;
  if(b.ph===1&&b.hp<b.max/2){b.ph=2;banner={t:2.5,a:b.B.n+' в ярости!',b:'Вторая фаза'};shake=.5;Sound.error();}
  const go=st=>{b.st=st;b.mt=0;b.k=0;};
  const fan=(n,v,spr)=>{const an=Math.atan2(P.y+P.h/2-(b.y+b.h*.35),px-bx);for(let i=0;i<n;i++){const a2=an+(i-(n-1)/2)*spr;shots.push({x:bx,y:b.y+b.h*.35,vx:Math.cos(a2)*v,vy:Math.sin(a2)*v,r:9,l:3.5,c:b.B.mane});}};
  const waves=()=>{for(const d of [-1,1])shots.push({x:bx,y:FL-14,vx:d*400,vy:0,r:13,l:2.6,c:b.B.mane,wave:1});shake=.35;};
  b.float=false;
  switch(b.st){
   case 'idle':b.vx*=.8;b.face=px<bx?-1:1;if(b.tm<=0){const m=b.B.mv;go(m[Math.floor(Math.random()*m.length)]);}break;
   case 'charge':if(b.k===0){b.vx=0;if(b.mt>.55){b.k=1;b.vx=b.face*640;}}else if(b.wall||b.mt>1.7){if(b.wall)shake=.3;b.vx=0;go('idle');b.tm=.9;}break;
   case 'leap':if(b.k===0){b.vy=-950;b.vx=(px-bx)/1.0;b.k=1;}else if(b.mt>.2&&b.ground){b.vx=0;waves();go('idle');b.tm=.9;}break;
   case 'shoot3':b.vx=0;if(b.mt>.4&&b.k===0){fan(b.ph===2?5:3,330,.22);b.k=1;}if(b.ph===2&&b.mt>.85&&b.k===1){fan(5,380,.18);b.k=2;}if(b.mt>1.2){go('idle');b.tm=.7;}break;
   case 'rain':b.vx=0;if(b.k===0){b.marks=[];for(let i=0;i<(b.ph===2?12:8);i++)b.marks.push(40+Math.random()*1020);b.k=1;}if(b.k===1&&b.mt>.8){for(const m of b.marks)shots.push({x:m,y:-20,vx:0,vy:480,r:9,l:2,c:b.B.mane});b.marks=null;b.k=2;}if(b.mt>1.6){go('idle');b.tm=.8;}break;
   case 'summon':b.vx=0;if(b.k===0&&b.mt>.5){b.k=1;if(E.filter(e=>!e.dead&&!e.boss).length<3)for(const o of [-120,120]){const e=mkE('fly',bx+o,200);E.push(e);burst(e.x,e.y,b.B.mane,12);}}if(b.mt>1.3){go('idle');b.tm=.9;}break;
   case 'teleport':b.vx=0;if(b.k===0){b.hide=true;b.k=1;burst(bx,b.y+b.h/2,b.B.mane,20);}if(b.k===1&&b.mt>.5){b.hide=false;b.k=2;b.x=Math.max(20,Math.min(1080-b.w,px+(Math.random()<.5?-1:1)*220-b.w/2));b.y=FL-b.h;burst(b.x+b.w/2,b.y+b.h/2,b.B.mane,20);}
    if(b.k===2&&b.mt>.85){b.k=3;const n=b.ph===2?12:8;for(let i=0;i<n;i++){const a2=i/n*Math.PI*2;shots.push({x:b.x+b.w/2,y:b.y+b.h/2,vx:Math.cos(a2)*260,vy:Math.sin(a2)*260,r:8,l:3,c:b.B.mane});}}if(b.mt>1.3){go('idle');b.tm=.8;}break;
   case 'slam':if(b.k===0){b.vy=-1250;b.vx=0;b.k=1;}else if(b.k===1){if(b.vy>=0||b.y<60){b.k=2;b.mt=0;}}else if(b.k===2){b.float=true;b.vy=0;b.x+=((px-b.w/2)-b.x)*Math.min(1,dt*5);if(b.mt>.6){b.k=3;b.vy=1300;}}else if(b.ground){waves();go('idle');b.tm=1;}break;
   case 'dive':b.float=true;if(b.k===0){b.vx=0;b.vy=0;b.y+=(70-b.y)*Math.min(1,dt*4);b.x+=(550-b.w/2-b.x)*Math.min(1,dt*2);if(b.mt>.8){b.k=1;const an=Math.atan2(P.y-b.y,px-bx);b.dvx=Math.cos(an)*720;b.dvy=Math.max(200,Math.sin(an)*720);}}
    else{b.x+=b.dvx*dt;b.y+=b.dvy*dt;if(b.y+b.h>=FL){b.y=FL-b.h;waves();go('idle');b.tm=.9;}else if(b.x<0||b.x+b.w>1100){go('idle');b.tm=.6;}}break;}
  if(!b.float){b.vy=Math.min(b.vy+GR*dt,1400);collide(b,dt);}
  b.x=Math.max(0,Math.min(1100-b.w,b.x));if(b.y+b.h>FL)b.y=FL-b.h;
  if(!b.hide&&ovl(P,b))hurt(L.a>=3?2:1,bx);}
 function update(dt){T+=dt;S.time+=dt;upP(dt);if(state!=='play')return;for(const e of E)upE(e,dt);if(state!=='play')return;E=E.filter(e=>!e.dead);
  const pcx=P.x+P.w/2,pcy=P.y+P.h/2;
  for(const s of shots){s.x+=s.vx*dt;s.y+=s.vy*dt;s.l-=dt;if(!s.wave&&solidAt(s.x,s.y))s.l=0;if(s.l>0&&Math.hypot(s.x-pcx,s.y-pcy)<s.r+16&&hurt(L.a>=3?2:1,s.x))s.l=0;if(state!=='play')return;}shots=shots.filter(s=>s.l>0);
  for(const b of bolts){b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;parts.push({x:b.x,y:b.y,vx:0,vy:0,l:.25,c:'#b388ff',s:3});if(solidAt(b.x,b.y))b.l=0;for(const e of E)if(!e.dead&&!e.hide&&!b.hits.has(e)&&b.x>e.x-8&&b.x<e.x+e.w+8&&b.y>e.y-10&&b.y<e.y+e.h+10){b.hits.add(e);hit(e,b.d,false);}}bolts=bolts.filter(b=>b.l>0);E=E.filter(e=>!e.dead);
  for(const d of drops){const dd=Math.hypot(d.x-pcx,d.y-pcy);if(d.mag||(eq('magnet')&&dd<220)){d.mag=1;d.x+=(pcx-d.x)*Math.min(1,dt*8);d.y+=(pcy-d.y)*Math.min(1,dt*8);}
   else if(!d.fl){d.vy+=GR*dt;d.x+=d.vx*dt;const ny=d.y+d.vy*dt;if(d.vy>0&&solidAt(d.x,ny+5)){d.vy=-d.vy*.3;if(Math.abs(d.vy)<60)d.vy=0;d.vx*=.6;}else d.y=ny;if(d.y>VH+50)d.got=1;}
   if(dd<26&&!d.got){d.got=1;S.bits+=d.v;}}drops=drops.filter(d=>!d.got);
  for(const p of parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;}parts=parts.filter(p=>p.l>0);if(parts.length>400)parts.splice(0,parts.length-400);
  for(const n of nums){n.y-=40*dt;n.l-=dt;}nums=nums.filter(n=>n.l>0);
  if(combo.t>0){combo.t-=dt;if(combo.t<=0)combo.n=0;}if(shake>0)shake-=dt;if(flash>0)flash-=dt;if(banner){banner.t-=dt;if(banner.t<=0)banner=null;}
  if(Math.random()<.3)parts.push({x:cam+Math.random()*VW,y:Math.random()*VH,vx:(Math.random()-.5)*20,vy:(L.a===4?-30:-8)+(Math.random()-.5)*10,l:3,c:AREAS[L.a].mote,s:1.5,amb:1});
  const tc=Math.max(0,Math.min(L.w-VW,pcx-VW/2+P.face*60));cam+=(tc-cam)*Math.min(1,dt*6);}
 function drawItem(it){const y=it.y,A=AREAS[L.a];switch(it.k){
  case 'bench':x.fillStyle='#8d6e63';x.fillRect(it.x-34,y-22,68,6);x.fillRect(it.x-30,y-16,5,16);x.fillRect(it.x+25,y-16,5,16);x.fillRect(it.x-34,y-38,68,5);x.fillRect(it.x-30,y-38,4,18);x.fillRect(it.x+26,y-38,4,18);
   pony(x,it.x-70,y,1,{body:'#a5d6a7',mane:'#2e7d32',eye:'#1b5e20'},T,{s:.75});x.fillStyle='#fff';x.font='12px Georgia';x.textAlign='center';x.fillText('Мята 🛒',it.x-70,y-56);break;
  case 'npc':{const b=Math.sin(T*2)*2;x.fillStyle='#a1887f';x.beginPath();x.ellipse(it.x,y-22+b,16,22,0,0,7);x.fill();x.fillStyle='#d7ccc8';x.beginPath();x.ellipse(it.x,y-16+b,10,14,0,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(it.x-6,y-34+b,6,0,7);x.arc(it.x+6,y-34+b,6,0,7);x.fill();x.fillStyle='#000';x.beginPath();x.arc(it.x-6,y-34+b,3,0,7);x.arc(it.x+6,y-34+b,3,0,7);x.fill();x.fillStyle='#ffb300';x.beginPath();x.moveTo(it.x-3,y-28+b);x.lineTo(it.x+3,y-28+b);x.lineTo(it.x,y-23+b);x.fill();break;}
  case 'tablet':x.fillStyle='#9e9e9e';x.fillRect(it.x-16,y-46,32,46);x.fillStyle='#616161';for(let i=0;i<4;i++)x.fillRect(it.x-10,y-38+i*9,20,3);if(!S.tablets.includes(L.a)){x.fillStyle='#ffd54f';x.font='bold 14px Georgia';x.textAlign='center';x.fillText('!',it.x,y-52);}break;
  case 'shard':x.fillStyle='#80deea33';x.beginPath();x.arc(it.x,y-22,20,0,7);x.fill();x.save();x.translate(it.x,y-22+Math.sin(T*3)*4);x.rotate(T);x.fillStyle='#80deea';x.beginPath();x.moveTo(0,-10);x.lineTo(8,0);x.lineTo(0,10);x.lineTo(-8,0);x.fill();x.restore();break;
  case 'shade':x.globalAlpha=.55+Math.sin(T*4)*.2;pony(x,it.x,y,-1,{body:'#111',mane:'#000',eye:'#fff',leg:'#000'},T,{s:.85,helm:1});x.globalAlpha=1;break;
  case 'exit':x.strokeStyle=A.mote;x.lineWidth=4;x.beginPath();x.moveTo(it.x-30,y);x.lineTo(it.x-30,y-70);x.arc(it.x,y-70,30,Math.PI,0);x.lineTo(it.x+30,y);x.stroke();x.globalAlpha=.25+Math.sin(T*3)*.1;x.fillStyle=A.mote;x.fill();x.globalAlpha=1;x.fillStyle='#fff';x.font='13px Georgia';x.textAlign='center';x.fillText(L.r===3?'→ '+(AREAS[L.a+1]?AREAS[L.a+1].n:''):'→',it.x,y-110);break;}}
 function drawE(e){const A=AREAS[L.a];if(e.hide)return;const cx=e.x+e.w/2,by=e.y+e.h,fl=e.flash>0;
  if(e.boss){const B=e.B;x.save();if((e.st==='charge'&&e.k===0)||(e.st==='shoot3'&&e.mt<.4)||e.ph===2){x.shadowColor=e.ph===2?'#ff1744':B.mane;x.shadowBlur=20;}
   pony(x,cx,by,e.face,{body:fl?'#fff':B.body,mane:B.mane,eye:'#ff1744',wing:B.mane},T,Object.assign({s:B.s,run:Math.abs(e.vx)>10,big:1},B.o||{},{fly:e.float}));x.restore();return;}
  if(e.t==='spitter'){x.fillStyle=fl?'#fff':A.ec;x.beginPath();x.ellipse(cx,by-16,18,16,0,0,7);x.fill();x.fillStyle=A.mote;x.beginPath();x.ellipse(cx,by-30,22,10,0,Math.PI,0);x.fill();x.fillStyle='#ff1744';x.beginPath();x.arc(cx+e.dir*7,by-18,3,0,7);x.fill();x.fillStyle='#000';x.beginPath();x.arc(cx+e.dir*10,by-10,4,0,7);x.fill();}
  else pony(x,cx,by,e.dir,{body:fl?'#fff':A.ec,mane:'#8e24aa',eye:'#ff1744',wing:'#4a148c'},T+e.hx,{s:e.s,run:e.t!=='fly'&&Math.abs(e.vx)>5,wings:e.t==='fly',fly:e.t==='fly',armor:e.t==='charger'});
  if(e.t==='charger'&&e.st===1){x.fillStyle='#ff1744';x.font='bold 22px Georgia';x.textAlign='center';x.fillText('!',cx,e.y-14);}
  if(e.hp<e.max){x.fillStyle='#0008';x.fillRect(cx-16,e.y-10,32,4);x.fillStyle='#ff5252';x.fillRect(cx-16,e.y-10,32*Math.max(0,e.hp)/e.max,4);}}
 function drawP(){const cx=P.x+P.w/2,by=P.y+P.h,blink=P.inv>0&&Math.floor(T*20)%2;
  if(!blink){if(P.dashT>0&&S.ab.cloak)x.globalAlpha=.5;pony(x,cx,by,P.face,{body:'#efe6ff',mane:'#7b5cff',eye:'#2a1b5c',wing:'#fff'},T,{s:.85,run:P.ground&&Math.abs(P.vx)>10,helm:1});x.globalAlpha=1;
   if(P.glide){x.fillStyle='#ff80ab';x.beginPath();x.arc(cx,P.y-24,26,Math.PI,0);x.fill();x.strokeStyle='#fff';x.lineWidth=1;x.beginPath();x.moveTo(cx,P.y-24);x.lineTo(cx,P.y);x.stroke();}
   if(P.focus>0){x.strokeStyle='#fff';x.lineWidth=2;x.globalAlpha=.7;x.beginPath();x.arc(cx,P.y+P.h/2,Math.max(4,34-P.focus*24),0,7);x.stroke();x.globalAlpha=1;}}
  if(P.atkT>0){const hb=atkBox(),cy=P.y+P.h/2;x.strokeStyle='#fff';x.lineWidth=5;x.globalAlpha=Math.max(0,P.atkT/.14);x.beginPath();
   if(P.atkDir==='side'){const r=hb.w*.85;if(P.face>0)x.arc(cx,cy,r,-1.1,1.1);else x.arc(cx,cy,r,Math.PI-1.1,Math.PI+1.1);}
   else if(P.atkDir==='up')x.arc(cx,cy,hb.h,-Math.PI/2-1.1,-Math.PI/2+1.1);else x.arc(cx,cy,hb.h,Math.PI/2-1.1,Math.PI/2+1.1);x.stroke();x.globalAlpha=1;}}
 function hud(){const mh=maxHp();for(let i=0;i<mh;i++){const hx=24+i*26,hy=24;x.fillStyle=i<P.hp?'#f5f5ff':'#ffffff22';x.beginPath();x.moveTo(hx,hy-10);x.quadraticCurveTo(hx+11,hy-10,hx+10,hy+2);x.quadraticCurveTo(hx+8,hy+10,hx,hy+13);x.quadraticCurveTo(hx-8,hy+10,hx-10,hy+2);x.quadraticCurveTo(hx-11,hy-10,hx,hy-10);x.fill();}
  const ox=40,oy=70;x.fillStyle='#0008';x.beginPath();x.arc(ox,oy,20,0,7);x.fill();x.save();x.beginPath();x.arc(ox,oy,18,0,7);x.clip();x.fillStyle='#e1d0ff';x.fillRect(ox-18,oy+18-36*P.soul/99,36,36);x.restore();x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.arc(ox,oy,20,0,7);x.stroke();
  x.textAlign='left';x.font='bold 16px Georgia';x.fillStyle='#ffd54f';x.fillText('◆ '+S.bits,70,76);x.fillStyle='#fff';x.font='13px Georgia';x.fillText(`Ур. ${S.lv}${S.sp?'  (+'+S.sp+' очк. — Tab)':''}`,70,96);x.fillStyle='#0008';x.fillRect(70,102,120,5);x.fillStyle='#b388ff';x.fillRect(70,102,120*Math.min(1,S.xp/need()),5);
  x.textAlign='right';x.fillStyle='#fffc';x.font='14px Georgia';x.fillText(AREAS[L.a].n+(L.r<3?' · '+(L.r+1)+'/3':' · Логово'),VW-16,24);if(S.ng)x.fillText('Новая игра+ '+S.ng,VW-16,42);
  if(combo.n>=3){x.fillStyle='#ffd54f';x.font='bold 22px Georgia';x.fillText(combo.n+' комбо!',VW-16,70);}
  x.textAlign='center';if(P.near){x.fillStyle='#fff';x.font='15px Georgia';x.fillText({bench:'E — отдохнуть на скамейке',npc:'E — поговорить с Совой',tablet:'E — прочитать табличку'}[P.near.k]||'',VW/2,VH-60);}
  const b=E.find(e=>e.boss);if(b){x.fillStyle='#0009';x.fillRect(VW/2-250,VH-34,500,14);x.fillStyle=b.ph===2?'#ff1744':'#e040fb';x.fillRect(VW/2-250,VH-34,500*Math.max(0,b.hp)/b.max,14);x.fillStyle='#fff';x.font='14px Georgia';x.fillText(b.B.n,VW/2,VH-40);}
  if(banner){x.globalAlpha=Math.max(0,Math.min(1,banner.t));x.fillStyle='#fff';x.font='38px Georgia';x.fillText(banner.a,VW/2,VH*.32);x.font='italic 18px Georgia';x.fillStyle='#ddd';x.fillText(banner.b||'',VW/2,VH*.32+30);x.globalAlpha=1;}}
 function render(){const A=AREAS[L.a];x.save();if(shake>0)x.translate((Math.random()-.5)*40*shake,(Math.random()-.5)*40*shake);
  bg(x,A,cam,T);x.save();x.translate(-Math.round(cam),0);
  if(A.hz==='lava'||A.hz==='water'){x.fillStyle=A.hz==='lava'?'#ff5722':'#2e7d6b';x.globalAlpha=.85;x.fillRect(cam,VH-34+Math.sin(T*2)*3,VW,40);x.globalAlpha=1;if(A.hz==='lava'){x.fillStyle='#ffca28';for(let i=0;i<8;i++)x.fillRect(cam+((i*137+T*20)%VW),VH-30+Math.sin(T*3+i)*3,14,3);}}
  for(const w of L.wind){x.strokeStyle='#ffffff55';x.lineWidth=2;for(let i=0;i<6;i++){const yy=60+i*70,xx=w.x+(((T*w.f*1.5+i*90)%w.w)+w.w)%w.w;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx+(w.f>0?40:-40),yy);x.stroke();}}
  for(const s of L.solids){if(s.x+s.w<cam-20||s.x>cam+VW+20)continue;x.fillStyle=A.gr;if(s.ow){x.fillRect(s.x,s.y,s.w,s.h);x.fillStyle=A.top;x.fillRect(s.x,s.y,s.w,4);}else{const top=Math.max(s.y,-20);x.fillRect(s.x,top,s.w,Math.min(s.y+s.h,VH+20)-top);x.fillStyle=A.top;if(s.y>0)x.fillRect(s.x,s.y,s.w,6);x.fillStyle='#0002';if(s.y>0)for(let k=s.x+20;k<s.x+s.w-10;k+=46)x.fillRect(k,s.y+22+((k*7)%30),14,6);}}
  x.fillStyle='#ddd';for(const h of L.haz)for(let k=0;k<h.w;k+=10){x.beginPath();x.moveTo(h.x+k,h.y+h.h);x.lineTo(h.x+k+5,h.y);x.lineTo(h.x+k+10,h.y+h.h);x.fill();}
  for(const it of L.items)drawItem(it);
  x.fillStyle='#ffd54f';for(const d of drops){x.save();x.translate(d.x,d.y+(d.fl?Math.sin(T*3+d.x)*3:0));x.rotate(Math.PI/4);x.fillRect(-4,-4,8,8);x.restore();}
  for(const e of E)if(e.boss&&e.marks){x.fillStyle='#ff000033';for(const m of e.marks)x.fillRect(m-10,0,20,VH);}
  for(const e of E)drawE(e);drawP();
  for(const s of shots){x.fillStyle=s.c;x.globalAlpha=.9;x.beginPath();if(s.wave)x.ellipse(s.x,s.y,s.r+4,s.r,0,0,7);else x.arc(s.x,s.y,s.r,0,7);x.fill();x.globalAlpha=1;}
  for(const b of bolts){x.fillStyle='#e1d0ff';x.beginPath();x.arc(b.x,b.y,8,0,7);x.fill();}
  for(const p of parts){x.globalAlpha=Math.min(1,p.l*2)*(p.amb?.6:1);x.fillStyle=p.c;x.fillRect(p.x,p.y,p.s||3,p.s||3);}x.globalAlpha=1;
  x.font='bold 16px Georgia';x.textAlign='center';for(const n of nums){x.globalAlpha=Math.min(1,n.l*2);x.fillStyle='#000';x.fillText(n.t,n.x+1,n.y+1);x.fillStyle=n.c;x.fillText(n.t,n.x,n.y);}x.globalAlpha=1;
  x.restore();hud();if(flash>0){x.fillStyle=`rgba(255,255,255,${Math.min(.6,flash)})`;x.fillRect(0,0,VW,VH);}x.restore();}
 function title(){const g=x.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#0b0820');g.addColorStop(1,'#2a1b5c');x.fillStyle=g;x.fillRect(0,0,VW,VH);T+=.016;for(let i=0;i<60;i++){x.fillStyle='#fff';x.globalAlpha=.3+.3*Math.sin(T*2+i);x.fillRect((i*137)%VW,(i*71)%VH,2,2);}x.globalAlpha=1;pony(x,VW/2,VH-40,1,{body:'#efe6ff',mane:'#7b5cff',eye:'#2a1b5c'},T,{s:1.6,helm:1});}
 function frame(t){if(!win.el.isConnected)return;const dt=Math.min(.033,(t-last)/1000||0);last=t;
  try{if(!win.minimized&&state==='play'&&L)update(dt);if(L&&P)render();else title();}catch(err){console.error(err);}
  pressed.clear();raf=requestAnimationFrame(frame);}
 win.onClose=()=>{cancelAnimationFrame(raf);if(S.started)save();};
 mainMenu();raf=requestAnimationFrame(frame);root.focus();
 return win;}});
})();
alias('ponyknight','ponyknight','pony knight','пони','pony');
