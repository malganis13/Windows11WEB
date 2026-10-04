
/* ============================ ВЕСЁЛАЯ ФЕРМА 2 ============================ */
addCSS(`.fm{flex:1;display:flex;flex-direction:column;min-height:0;background:#8fd16a;user-select:none}
.fm-bar{display:flex;align-items:center;gap:6px;padding:6px 10px;background:linear-gradient(#ffcf6b,#f0a830);color:#5a3200;font-weight:600;font-size:13px;flex-wrap:wrap}
.fm-bar button{background:#fff6dc;color:#5a3200;border:2px solid #b5700f;border-radius:10px;padding:3px 8px;font-weight:700;font-size:12px}
.fm-bar button:hover{background:#fff}.fm-bar button:disabled{opacity:.45}.fm-bar .sp{flex:1}
.fm-cv{flex:1;min-height:0;position:relative}.fm-cv canvas{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.fm-goal{position:absolute;right:10px;top:10px;background:rgba(255,248,220,.94);border:2px solid #b5700f;border-radius:12px;padding:8px 12px;color:#5a3200;font-size:12px;line-height:1.6;min-width:180px;pointer-events:none}
.fm-over{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.35);z-index:2}
.fm-over>div{background:#fff6dc;border:3px solid #b5700f;border-radius:16px;padding:22px 30px;text-align:center;color:#5a3200;max-width:440px}
.fm-over h2{font-size:24px;margin-bottom:8px}`);
// Животные: цена, продукт, время производства, скорость, аппетит
const FARM_AN={hen:{n:'Курица',e:'🐔',cost:100,prod:'egg',t:9,sp:1,eat:1.4,lv:0},pig:{n:'Свинья',e:'🐖',cost:300,prod:'meat',t:13,sp:.7,eat:1.8,lv:1},sheep:{n:'Овца',e:'🐑',cost:450,prod:'wool',t:15,sp:.8,eat:1.6,lv:2},cow:{n:'Корова',e:'🐄',cost:700,prod:'milk',t:17,sp:.55,eat:2.2,lv:3}};
const FARM_PR={egg:{e:'🥚',n:'Яйца',p:10},meat:{e:'🥓',n:'Мясо',p:35},wool:{e:'🧶',n:'Шерсть',p:55},milk:{e:'🥛',n:'Молоко',p:80},cake:{e:'🧁',n:'Выпечка',p:60},cheese:{e:'🧀',n:'Сыр',p:220},bear:{e:'🐻',n:'Медведи',p:120}};
const FARM_LV=[
 {g:{egg:6},t:180,bears:0,txt:'Накорми кур и собери яйца'},
 {g:{egg:10,coins:400},t:200,bears:1,txt:'Заработай на рынке. Осторожно, медведи!'},
 {g:{meat:4,cake:2},t:230,bears:2,txt:'Теперь можно купить свиней 🐖'},
 {g:{wool:4,meat:4,coins:900},t:250,bears:3,txt:'Овцы дают шерсть 🧶'},
 {g:{milk:4,cheese:1,coins:1200},t:270,bears:4,txt:'Коровы и сыроварня 🧀'},
 {g:{egg:20,milk:6,cheese:2,coins:2500},t:320,bears:6,txt:'Финал: стань лучшим фермером!'}];
storeApp('farm',{cat:'game',dev:'Alawar (по мотивам)',rating:4.9,size:'14 МБ',desc:'Та самая «Весёлая ферма»: сажай траву, корми кур, свиней, овец и коров, собирай продукты, лови медведей и отправляй товар на рынок.',feat:['6 уровней','Куры, свиньи, овцы, коровы, кот-помощник','Пекарня, сыроварня, склад, грузовик']},{name:'Весёлая ферма',icon:AI.farm,keywords:'farm ферма веселая куры коровы игра',launch(){
 const root=el(`<div class="fm"><div class="fm-bar"><span class="co"></span><span class="wa"></span><span class="st"></span><span class="tm"></span><span class="sp"></span><button data-a="well">🪣 Вода</button>${Object.entries(FARM_AN).map(([k,a])=>`<button data-buy="${k}">${a.e} ${a.cost}</button>`).join('')}<button data-a="cat">🐈 Кот 500</button><button data-a="bake"></button><button data-a="dairy"></button><button data-a="wh">🏚 +Склад 300</button><button data-a="truck">🚚 На рынок</button></div><div class="fm-cv"><canvas></canvas><div class="fm-goal"></div></div></div>`);
 const win=WM.create({app:'farm',title:'Весёлая ферма',icon:AI.farm(),width:1080,height:700,content:root,minW:760,minH:500});
 const cv=$('canvas',root),x=cv.getContext('2d'),goalEl=$('.fm-goal',root);let W=900,H=560,raf,last=0,fx=[];
 const GW=14,GH=8;let S;
 function fresh(lv){const L=FARM_LV[lv];return {lv,coins:150+lv*120,water:6,wellT:0,store:{},cap:12,grass:new Array(GW*GH).fill(0),an:[],items:[],bears:[],cat:null,bakery:0,dairy:0,q:[],truck:0,cargo:null,got:{},t:L.t,bearT:25,done:false,L};}
 function start(lv){S=fresh(lv);for(let i=0;i<2;i++)addAn('hen');if(lv>=3)addAn('pig');buttons();}
 function addAn(k){const f=field();S.an.push({k,x:f.fx+40+Math.random()*(f.fw-80),y:f.fy+40+Math.random()*(f.fh-80),food:30,prod:FARM_AN[k].t*(.6+Math.random()*.4),tgt:null,dir:1,bob:Math.random()*6});}
 function field(){const fx=50,fy=80,fw=W-290,fh=H-130;return {fx,fy,cw:fw/GW,ch:fh/GH,fw,fh};}
 function resize(){const r=cv.parentNode.getBoundingClientRect();W=r.width||900;H=r.height||560;cv.width=W*devicePixelRatio;cv.height=H*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
 new ResizeObserver(resize).observe(cv.parentNode);resize();
 const stored=()=>Object.entries(S.store).reduce((s,[k,v])=>s+v*(k==='bear'?4:1),0);
 const sc=k=>S.store[k]||0;
 function msg(t){fx.push({txt:t,x:W/2-140,y:H-90,a:2.5,big:1});}
 function pop(txt,px,py,c='#fff'){fx.push({txt,x:px,y:py,a:1.2,c});}
 function buttons(){$$('[data-buy]',root).forEach(b=>{const a=FARM_AN[b.dataset.buy];b.disabled=S.lv<a.lv;b.title=a.n+(S.lv<a.lv?' (откроется позже)':'');});
  $('[data-a=bake]',root).textContent=S.bakery?'🧁 Испечь (2🥚)':'🧁 Пекарня 250';$('[data-a=dairy]',root).textContent=S.dairy?'🧀 Сыр (2🥛)':'🧀 Сыроварня 600';$('[data-a=dairy]',root).disabled=S.lv<4;$('[data-a=cat]',root).disabled=!!S.cat;}
 function take(it){const pr=it.k;if(stored()+1>S.cap){msg('📦 Склад переполнен! Отправь грузовик');Sound.error();return false;}
  S.store[pr]=sc(pr)+1;S.got[pr]=(S.got[pr]||0)+1;S.items.splice(S.items.indexOf(it),1);pop('+1 '+FARM_PR[pr].e,it.x,it.y-20);Sound.pop();return true;}
 cv.addEventListener('pointerdown',e=>{if(S.done)return;const r=cv.getBoundingClientRect(),mx=(e.clientX-r.left)*(W/r.width),my=(e.clientY-r.top)*(H/r.height);
  // 1) продукты — берём БЛИЖАЙШИЙ в радиусе (исправление бага с яйцами)
  let best=null,bd=28;for(const it of S.items){const d=Math.hypot(it.x-mx,it.y-my);if(d<bd){bd=d;best=it;}}if(best){take(best);return;}
  // 2) медведи
  for(const b of S.bears){if(Math.hypot(b.x-mx,b.y-my)<36){if(!b.caged){b.hits++;b.shake=.2;Sound.click();if(b.hits>=5+Math.floor(S.lv/2)){b.caged=true;Sound.pop();}}else{if(stored()+4>S.cap){msg('Нужно 4 места на складе');return;}S.store.bear=sc('bear')+1;S.got.bear=(S.got.bear||0)+1;S.bears.splice(S.bears.indexOf(b),1);Sound.pop();}return;}}
  // 3) трава
  const f=field();const gx=Math.floor((mx-f.fx)/f.cw),gy=Math.floor((my-f.fy)/f.ch);if(gx<0||gy<0||gx>=GW||gy>=GH)return;
  if(S.water<=0){Sound.error();return msg('💧 Нет воды — набери в колодце');}S.water--;Sound.click();
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=gx+dx,Y=gy+dy;if(X>=0&&Y>=0&&X<GW&&Y<GH)S.grass[Y*GW+X]=Math.max(S.grass[Y*GW+X],dx||dy?2:3);}});
 root.addEventListener('click',e=>{const t=e.target.closest('[data-a],[data-buy]');if(!t||S.done||t.disabled)return;const a=t.dataset.a,buy=t.dataset.buy;
  if(buy){const A=FARM_AN[buy];if(S.coins<A.cost){Sound.error();return msg('Не хватает монет');}S.coins-=A.cost;addAn(buy);Sound.pop();return;}
  if(a==='well'){if(S.wellT>0)return;S.wellT=3;Sound.click();}
  if(a==='cat'){if(S.coins<500){Sound.error();return msg('Кот стоит 500');}S.coins-=500;S.cat={x:W-260,y:H-120,tgt:null};Sound.pop();buttons();msg('🐈 Кот будет сам собирать продукты!');}
  if(a==='wh'){if(S.coins<300){Sound.error();return msg('Нужно 300');}S.coins-=300;S.cap+=8;Sound.pop();}
  if(a==='bake'){if(S.bakery){if(sc('egg')<2)return msg('Нужно 2 яйца на складе');S.store.egg-=2;S.q.push({k:'cake',t:6});Sound.click();return;}if(S.coins<250){Sound.error();return msg('Пекарня стоит 250');}S.coins-=250;S.bakery=1;buttons();Sound.pop();}
  if(a==='dairy'){if(S.dairy){if(sc('milk')<2)return msg('Нужно 2 молока');S.store.milk-=2;S.q.push({k:'cheese',t:9});Sound.click();return;}if(S.coins<600){Sound.error();return msg('Сыроварня стоит 600');}S.coins-=600;S.dairy=1;buttons();Sound.pop();}
  if(a==='truck'){if(S.truck>0)return;if(!stored())return msg('Склад пуст');S.cargo={...S.store};S.store={};S.truck=8;Sound.click();}});
 function tick(dt){if(S.done)return;S.t-=dt;if(S.t<=0){S.t=0;end(false);return;}
  if(S.wellT>0){S.wellT-=dt;if(S.wellT<=0){S.water=Math.min(12,S.water+6);Sound.pop();}}
  if(S.truck>0){S.truck-=dt;if(S.truck<=0){let m=0;for(const k in S.cargo)m+=S.cargo[k]*FARM_PR[k].p;S.coins+=m;msg(`🚚 Грузовик вернулся: +${m} 💰`);Sound.win();S.cargo=null;}}
  S.q.forEach(q=>q.t-=dt);for(const q of S.q.filter(q=>q.t<=0)){S.store[q.k]=sc(q.k)+1;S.got[q.k]=(S.got[q.k]||0)+1;Sound.pop();}S.q=S.q.filter(q=>q.t>0);
  const f=field();
  for(const h of S.an){const A=FARM_AN[h.k];h.food-=dt*A.eat;h.bob+=dt*8;
   if(h.food>0){h.prod-=dt;if(h.prod<=0){h.prod=A.t*(.9+Math.random()*.3);
     // продукт кладётся РЯДОМ с животным (сзади), а не под ним
     const ox=-h.dir*22,px=Math.max(f.fx+10,Math.min(f.fx+f.fw-10,h.x+ox)),py=Math.max(f.fy+10,Math.min(f.fy+f.fh-6,h.y+12));S.items.push({k:A.prod,x:px,y:py,age:0,drop:.25});Sound.click();}}
   if(h.food<20&&!h.tgt){let best=null,bd=1e9;S.grass.forEach((v,i)=>{if(!v)return;const gx=f.fx+(i%GW+.5)*f.cw,gy=f.fy+((i/GW|0)+.5)*f.ch,d=Math.hypot(gx-h.x,gy-h.y);if(d<bd){bd=d;best=[gx,gy,i];}});h.tgt=best;}
   if(h.tgt&&!S.grass[h.tgt[2]])h.tgt=null;
   let tx,ty;if(h.tgt){[tx,ty]=h.tgt;}else{if(!h.w||Math.random()<.008)h.w=[f.fx+20+Math.random()*(f.fw-40),f.fy+20+Math.random()*(f.fh-40)];[tx,ty]=h.w;}
   const d=Math.hypot(tx-h.x,ty-h.y),sp=(h.tgt?70:30)*A.sp*(h.food<=0?.4:1);if(d>4){h.x+=(tx-h.x)/d*sp*dt;h.y+=(ty-h.y)/d*sp*dt;if(Math.abs(tx-h.x)>2)h.dir=tx<h.x?-1:1;}
   else if(h.tgt){const i=h.tgt[2];h.eat=(h.eat||0)+dt;if(h.eat>.8){h.eat=0;S.grass[i]--;h.food=Math.min(30,h.food+12);if(!S.grass[i]||h.food>=30)h.tgt=null;}}}
  for(const it of S.items){it.age+=dt;if(it.drop>0)it.drop-=dt;}S.items=S.items.filter(g=>g.age<28);
  if(S.cat){const c=S.cat;if(!c.tgt||!S.items.includes(c.tgt)){c.tgt=S.items.slice().sort((a,b)=>Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y))[0]||null;}
   if(c.tgt){const d=Math.hypot(c.tgt.x-c.x,c.tgt.y-c.y);if(d<10){if(!take(c.tgt))c.tgt=null;}else{c.x+=(c.tgt.x-c.x)/d*90*dt;c.y+=(c.tgt.y-c.y)/d*90*dt;c.dir=c.tgt.x<c.x?-1:1;}}}
  if(S.L.bears){S.bearT-=dt;if(S.bearT<=0){S.bearT=Math.max(14,38-S.lv*4);S.bears.push({x:f.fx+40+Math.random()*(f.fw-80),y:-40,ty:f.fy+40+Math.random()*(f.fh-80),hits:0,caged:false,dir:1,cage:0,shake:0});Sound.error();msg('🐻 Медведь! Кликай по нему!');}}
  for(const b of [...S.bears]){if(b.shake>0)b.shake-=dt;if(b.y<b.ty){b.y+=260*dt;continue;}if(b.caged){b.cage+=dt;if(b.cage>15)S.bears.splice(S.bears.indexOf(b),1);continue;}
   b.x+=b.dir*40*dt;if(b.x<f.fx+20||b.x>f.fx+f.fw-20)b.dir*=-1;for(const h of S.an)if(Math.hypot(h.x-b.x,h.y-b.y)<26){S.an.splice(S.an.indexOf(h),1);msg(`🐻 Медведь утащил: ${FARM_AN[h.k].n}!`);Sound.error();break;}}
  fx.forEach(p=>{p.a-=dt;p.y-=dt*(p.big?6:30);});fx=fx.filter(p=>p.a>0);
  if(goals().every(g=>g[1]))end(true);}
 function goals(){const L=S.L.g;return Object.entries(L).map(([k,v])=>k==='coins'?[`💰 Монет: ${Math.min(S.coins,v)}/${v}`,S.coins>=v]:[`${FARM_PR[k].e} ${FARM_PR[k].n}: ${Math.min(S.got[k]||0,v)}/${v}`,(S.got[k]||0)>=v]);}
 function end(ok){S.done=true;Sound[ok?'win':'error']();const nl=S.lv+1,fin=nl>=FARM_LV.length;if(ok&&!fin)LS.set('farmLv',Math.max(LS.get('farmLv',0),nl));
  const stars=ok?(S.t>S.L.t*.5?3:S.t>S.L.t*.25?2:1):0;
  const o=el(`<div class="fm-over"><div><h2>${ok?'🎉 Уровень пройден!':'⏰ Время вышло'}</h2><div style="font-size:30px">${ok?'⭐'.repeat(stars)+'☆'.repeat(3-stars):''}</div><p>${ok?(fin?'Вы прошли всю игру! 🏆':'Следующий: '+FARM_LV[nl].txt):'Попробуйте ещё раз'}</p><br><button class="btn primary">${ok&&!fin?'Следующий уровень':'Заново'}</button></div></div>`);
  cv.parentNode.appendChild(o);$('button',o).onclick=()=>{o.remove();start(ok&&!fin?nl:(fin?0:S.lv));};}
 function drawHen(h){const bob=Math.sin(h.bob)*1.5;x.save();x.translate(h.x,h.y+bob);x.scale(h.dir,1);x.fillStyle='#fff';x.beginPath();x.ellipse(0,0,14,11,0,0,7);x.fill();x.beginPath();x.arc(10,-9,7,0,7);x.fill();x.fillStyle='#e53935';x.beginPath();x.arc(10,-16,4,0,7);x.fill();x.fillStyle='#ffa000';x.beginPath();x.moveTo(16,-9);x.lineTo(22,-7);x.lineTo(16,-5);x.fill();x.fillStyle='#000';x.fillRect(11,-11,2,2);x.strokeStyle='#ffa000';x.lineWidth=2;x.beginPath();x.moveTo(-3,10);x.lineTo(-3,16);x.moveTo(3,10);x.lineTo(3,16);x.stroke();x.restore();}
 function draw(){const f=field();const sky=x.createLinearGradient(0,0,0,70);sky.addColorStop(0,'#7ec8ff');sky.addColorStop(1,'#c6ecff');x.fillStyle=sky;x.fillRect(0,0,W,70);
  x.font='26px serif';x.textAlign='center';x.fillText('☁️',120+Math.sin(performance.now()/4000)*30,35);x.fillText('☁️',W*.6,28);
  x.fillStyle='#8fd16a';x.fillRect(0,70,W,H);x.fillStyle='#7ac255';for(let i=0;i<70;i++){x.fillRect((i*137)%W,70+(i*71)%(H-70),3,6);}
  x.strokeStyle='#a0672a';x.lineWidth=4;x.strokeRect(f.fx-8,f.fy-8,f.fw+16,f.fh+16);x.fillStyle='#c98b46';for(let px=f.fx-8;px<=f.fx+f.fw+8;px+=30){x.fillRect(px-3,f.fy-16,6,14);x.fillRect(px-3,f.fy+f.fh+4,6,14);}
  S.grass.forEach((v,i)=>{if(!v)return;const gx=f.fx+(i%GW)*f.cw,gy=f.fy+(i/GW|0)*f.ch;x.fillStyle=['','#5fae3a','#3f9a2a','#2a8a1c'][v];x.beginPath();for(let k=0;k<5;k++){const bx=gx+f.cw*(.15+k*.17),h=f.ch*(.25+v*.15);x.moveTo(bx-3,gy+f.ch*.8);x.lineTo(bx,gy+f.ch*.8-h);x.lineTo(bx+3,gy+f.ch*.8);}x.fill();});
  const rx=W-215;x.fillStyle='#6d4c41';x.fillRect(rx,80,195,120);x.fillStyle='#8d6e63';x.beginPath();x.moveTo(rx-10,85);x.lineTo(rx+97,42);x.lineTo(rx+205,85);x.fill();x.fillStyle='#fff';x.font='bold 13px sans-serif';x.fillText('СКЛАД '+stored()+'/'+S.cap,rx+97,104);x.font='13px sans-serif';
  const ks=Object.keys(S.store).filter(k=>S.store[k]>0);ks.forEach((k,i)=>x.fillText(`${FARM_PR[k].e}${S.store[k]}`,rx+28+(i%4)*46,130+(i/4|0)*24));if(!ks.length)x.fillText('пусто',rx+97,140);
  x.fillStyle='#9e9e9e';x.beginPath();x.ellipse(rx+40,262,32,14,0,0,7);x.fill();x.fillStyle='#4fc3f7';x.beginPath();x.ellipse(rx+40,260,24,9,0,0,7);x.fill();x.fillStyle='#795548';x.fillRect(rx+12,214,6,46);x.fillRect(rx+62,214,6,46);x.fillRect(rx+8,210,64,8);
  if(S.wellT>0){x.fillStyle='#000a';x.fillRect(rx+5,285,70,8);x.fillStyle='#29b6f6';x.fillRect(rx+5,285,70*(1-S.wellT/3),8);}x.fillStyle='#5a3200';x.font='12px sans-serif';x.fillText('Колодец',rx+40,306);
  const bld=(on,bx,by,c1,c2,name,k)=>{if(!on)return;x.fillStyle=c1;x.fillRect(bx,by,80,56);x.fillStyle=c2;x.fillRect(bx-5,by-8,90,12);x.fillStyle='#5a3200';x.fillText(name,bx+40,by+30);const n=S.q.filter(q=>q.k===k).length;if(n)x.fillText('🔥 '+n,bx+40,by+48);};
  bld(S.bakery,rx+105,222,'#ffccbc','#d84315','Пекарня','cake');bld(S.dairy,rx+105,300,'#fff9c4','#f9a825','Сыроварня','cheese');
  x.fillStyle='#bcaaa4';x.fillRect(rx-10,H-60,215,40);const tx=S.truck>0?rx+Math.sin(Math.min(1,(8-S.truck)/8)*Math.PI)*-(rx+120)+10:rx+10;x.font='38px serif';x.textAlign='left';x.fillText('🚚',tx,H-26);x.textAlign='center';
  // животные сортируем по Y, а продукты рисуем ПОВЕРХ — их всегда видно и легко взять
  for(const h of [...S.an].sort((a,b)=>a.y-b.y)){if(h.k==='hen')drawHen(h);else{x.save();x.translate(h.x,h.y+Math.sin(h.bob)*1.2);x.scale(-h.dir,1);x.font=(h.k==='cow'?40:34)+'px serif';x.fillText(FARM_AN[h.k].e,0,12);x.restore();}
   x.fillStyle='#0004';x.fillRect(h.x-14,h.y-30,28,4);x.fillStyle=h.food>10?'#66bb6a':'#e53935';x.fillRect(h.x-14,h.y-30,28*Math.max(0,h.food)/30,4);}
  if(S.cat){x.save();x.translate(S.cat.x,S.cat.y);x.scale(-(S.cat.dir||1),1);x.font='30px serif';x.fillText('🐈',0,10);x.restore();}
  for(const g of S.items){const bl=g.age>23?.5+.5*Math.sin(g.age*12):1;x.globalAlpha=bl;const jump=g.drop>0?-Math.sin(g.drop/.25*Math.PI)*10:0;
   x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(g.x,g.y+9,9,3,0,0,7);x.fill();
   if(g.k==='egg'){x.fillStyle='#fff8e1';x.beginPath();x.ellipse(g.x,g.y+jump,7,9,0,0,7);x.fill();x.strokeStyle='#bfa98f';x.lineWidth=1.2;x.stroke();}else{x.font='20px serif';x.fillText(FARM_PR[g.k].e,g.x,g.y+7+jump);}x.globalAlpha=1;}
  for(const b of S.bears){const sh=b.shake>0?Math.sin(b.shake*80)*3:0;x.font='40px serif';x.fillText('🐻',b.x+sh,b.y+14);if(b.caged){x.strokeStyle='#555';x.lineWidth=3;for(let k=-24;k<=24;k+=8){x.beginPath();x.moveTo(b.x+k,b.y-24);x.lineTo(b.x+k,b.y+22);x.stroke();}x.strokeRect(b.x-26,b.y-26,52,50);}else if(b.hits){const need=5+Math.floor(S.lv/2);x.fillStyle='#0006';x.fillRect(b.x-20,b.y-32,40,5);x.fillStyle='#ffca28';x.fillRect(b.x-20,b.y-32,40*b.hits/need,5);}}
  for(const p of fx){x.globalAlpha=Math.min(1,p.a);if(p.big){x.font='bold 15px sans-serif';const w=x.measureText(p.txt).width+24;x.fillStyle='rgba(255,248,220,.95)';x.fillRect(W/2-w/2-60,p.y-18,w,26);x.fillStyle='#5a3200';x.fillText(p.txt,W/2-60,p.y);}else{x.font='bold 14px sans-serif';x.strokeStyle='#5a3200';x.lineWidth=3;x.strokeText(p.txt,p.x,p.y);x.fillStyle=p.c;x.fillText(p.txt,p.x,p.y);}x.globalAlpha=1;}
  $('.co',root).textContent='💰 '+S.coins;$('.wa',root).textContent='💧 '+S.water+'/12';$('.st',root).textContent=`📦 ${stored()}/${S.cap}`;$('.tm',root).textContent=`⏱ ${Math.floor(S.t/60)}:${String(Math.floor(S.t%60)).padStart(2,'0')}`;
  goalEl.innerHTML=`<b>Уровень ${S.lv+1}/${FARM_LV.length}</b><br><i>${S.L.txt}</i><br>`+goals().map(g=>`${g[1]?'✅':'⬜'} ${g[0]}`).join('<br>')+'<br><small style="opacity:.8">Клик по полю — трава · клик по продукту — собрать<br>Медведя — кликать, потом клетку на склад</small>';}
 function frame(t){if(!win.el.isConnected)return;const dt=Math.min(.05,(t-last)/1000||0);last=t;if(!win.minimized)tick(dt);draw();raf=requestAnimationFrame(frame);}
 start(Math.min(LS.get('farmLv',0),FARM_LV.length-1));raf=requestAnimationFrame(frame);win.onClose=()=>cancelAnimationFrame(raf);return win;}});
alias('farm','farm','ферма','веселая ферма');
