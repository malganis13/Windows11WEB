
/* ============================ ВЕСЁЛАЯ ФЕРМА ============================ */
addCSS(`.fm{flex:1;display:flex;flex-direction:column;min-height:0;background:#8fd16a;user-select:none}
.fm-bar{display:flex;align-items:center;gap:8px;padding:6px 10px;background:linear-gradient(#ffcf6b,#f0a830);color:#5a3200;font-weight:600;font-size:13px}
.fm-bar button{background:#fff6dc;color:#5a3200;border:2px solid #b5700f;border-radius:10px;padding:4px 10px;font-weight:700}
.fm-bar button:hover{background:#fff}.fm-bar .sp{flex:1}
.fm-cv{flex:1;min-height:0;position:relative}.fm-cv canvas{position:absolute;inset:0;width:100%;height:100%}
.fm-goal{position:absolute;right:10px;top:10px;background:rgba(255,248,220,.94);border:2px solid #b5700f;border-radius:12px;padding:8px 12px;color:#5a3200;font-size:12px;line-height:1.6;min-width:170px}
.fm-over{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.35);z-index:2}
.fm-over>div{background:#fff6dc;border:3px solid #b5700f;border-radius:16px;padding:22px 30px;text-align:center;color:#5a3200}
.fm-over h2{font-size:24px;margin-bottom:8px}`);
const FARM_LV=[{eggs:6,coins:0,t:180,bears:0},{eggs:10,coins:400,t:200,bears:1},{eggs:15,coins:600,t:220,bears:2,cake:2},{eggs:20,coins:900,t:240,bears:3,cake:4},{eggs:30,coins:1500,t:260,bears:5,cake:6}];
storeApp('farm',{cat:'game',dev:'Alawar (по мотивам)',rating:4.9,size:'12 МБ',desc:'Та самая «Весёлая ферма»: сажай траву водой из колодца, корми кур, собирай яйца, лови медведей и отправляй товар на рынок.',feat:['5 уровней с заданиями','Куры, яйца, пекарня, медведи','Грузовик и склад']},{name:'Весёлая ферма',icon:AI.farm,keywords:'farm ферма веселая куры игра',launch(){
 const root=el(`<div class="fm"><div class="fm-bar"><span class="co">💰 0</span><span class="wa">💧 0</span><span class="st">📦 0/12</span><span class="tm">⏱</span><span class="sp"></span><button data-a="well">🪣 Колодец</button><button data-a="hen">🐔 Курица 100</button><button data-a="bake">🧁 Пекарня 250</button><button data-a="truck">🚚 На рынок</button></div><div class="fm-cv"><canvas></canvas><div class="fm-goal"></div></div></div>`);
 const win=WM.create({app:'farm',title:'Весёлая ферма',icon:AI.farm(),width:980,height:660,content:root,minW:700,minH:480});
 const cv=$('canvas',root),x=cv.getContext('2d'),goalEl=$('.fm-goal',root);let W=900,H=560,raf,last=0;
 const GW=14,GH=8;let S;
 function fresh(lv){const L=FARM_LV[lv];return {lv,coins:lv?150+lv*50:200,water:5,wellT:0,store:{egg:0,cake:0,bear:0},cap:12,grass:new Array(GW*GH).fill(0),hens:[],eggs:[],bears:[],bakery:0,bakeQ:[],truck:0,cargo:null,got:{eggs:0},t:L.t,bearT:20,done:false,tGoal:L};}
 S=fresh(LS.get('farmLv',0));for(let i=0;i<2;i++)addHen();
 function addHen(){S.hens.push({x:200+Math.random()*400,y:200+Math.random()*200,vx:0,vy:0,food:30,lay:8+Math.random()*4,tgt:null,dir:1});}
 function field(){const fx=60,fy=90,fw=W-280,fh=H-150;return {fx,fy,cw:fw/GW,ch:fh/GH,fw,fh};}
 function resize(){const r=cv.parentNode.getBoundingClientRect();W=r.width||900;H=r.height||560;cv.width=W*devicePixelRatio;cv.height=H*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
 new ResizeObserver(resize).observe(cv.parentNode);resize();
 const stored=()=>S.store.egg+S.store.cake+S.store.bear*4;
 function msg(t){Shell.notify({title:'Весёлая ферма',body:t,icon:AI.farm(),silent:true});}
 cv.addEventListener('pointerdown',e=>{if(S.done)return;const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;
  for(const b of S.bears){if(!b.caged&&Math.hypot(b.x-mx,b.y-my)<34){b.hits++;Sound.click();if(b.hits>=5){b.caged=true;Sound.pop();}return;}if(b.caged&&Math.hypot(b.x-mx,b.y-my)<34){if(stored()+4>S.cap)return msg('Склад переполнен!');S.store.bear++;S.bears.splice(S.bears.indexOf(b),1);Sound.pop();return;}}
  for(const g of S.eggs){if(Math.hypot(g.x-mx,g.y-my)<18){if(stored()+1>S.cap)return msg('Склад переполнен! Отправь грузовик.');S.store.egg++;S.got.eggs++;S.eggs.splice(S.eggs.indexOf(g),1);Sound.pop();return;}}
  const f=field();const gx=Math.floor((mx-f.fx)/f.cw),gy=Math.floor((my-f.fy)/f.ch);if(gx<0||gy<0||gx>=GW||gy>=GH)return;
  if(S.water<=0){Sound.error();return msg('Нет воды — наберите в колодце 🪣');}S.water--;Sound.click();
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=gx+dx,Y=gy+dy;if(X>=0&&Y>=0&&X<GW&&Y<GH)S.grass[Y*GW+X]=Math.max(S.grass[Y*GW+X],dx||dy?2:3);}});
 root.addEventListener('click',e=>{const a=e.target.closest('[data-a]')?.dataset.a;if(!a||S.done)return;
  if(a==='well'){if(S.wellT>0)return;S.wellT=3;Sound.click();}
  if(a==='hen'){if(S.coins<100){Sound.error();return msg('Не хватает монет');}S.coins-=100;addHen();Sound.install?Sound.pop():0;}
  if(a==='bake'){if(S.bakery){if(S.store.egg<2)return msg('Нужно 2 яйца на складе');S.store.egg-=2;S.bakeQ.push(6);Sound.click();return;}if(S.coins<250){Sound.error();return msg('Пекарня стоит 250');}S.coins-=250;S.bakery=1;$('[data-a=bake]',root).textContent='🧁 Испечь (2 яйца)';Sound.pop();}
  if(a==='truck'){if(S.truck>0)return;const c={egg:S.store.egg,cake:S.store.cake,bear:S.store.bear};if(!c.egg&&!c.cake&&!c.bear)return msg('Склад пуст');S.cargo=c;S.store={egg:0,cake:0,bear:0};S.truck=8;Sound.click();}});
 function tick(dt){if(S.done)return;S.t-=dt;if(S.t<=0){S.t=0;end(false);return;}
  if(S.wellT>0){S.wellT-=dt;if(S.wellT<=0){S.water=Math.min(10,S.water+5);Sound.pop();}}
  if(S.truck>0){S.truck-=dt;if(S.truck<=0){const c=S.cargo;const m=c.egg*10+c.cake*60+c.bear*120;S.coins+=m;msg(`Грузовик вернулся: +${m} 💰`);Sound.win();S.cargo=null;}}
  S.bakeQ=S.bakeQ.map(t=>t-dt);while(S.bakeQ.length&&S.bakeQ[0]<=0){S.bakeQ.shift();S.store.cake++;S.got.cake=(S.got.cake||0)+1;Sound.pop();}
  const f=field();
  for(const h of S.hens){h.food-=dt*1.4;if(h.food>0){h.lay-=dt;if(h.lay<=0){h.lay=9+Math.random()*3;S.eggs.push({x:h.x,y:h.y+8,age:0});Sound.click();}}
   if(h.food<20&&!h.tgt){let best=null,bd=1e9;S.grass.forEach((v,i)=>{if(!v)return;const gx=f.fx+(i%GW+.5)*f.cw,gy=f.fy+((i/GW|0)+.5)*f.ch,d=Math.hypot(gx-h.x,gy-h.y);if(d<bd){bd=d;best=[gx,gy,i];}});h.tgt=best;}
   if(h.tgt&&!S.grass[h.tgt[2]])h.tgt=null;
   let tx,ty;if(h.tgt){[tx,ty]=h.tgt;}else{if(!h.w||Math.random()<.01)h.w=[f.fx+Math.random()*f.fw,f.fy+Math.random()*f.fh];[tx,ty]=h.w;}
   const d=Math.hypot(tx-h.x,ty-h.y),sp=(h.tgt?70:30)*(h.food<=0?.4:1);if(d>4){h.x+=(tx-h.x)/d*sp*dt;h.y+=(ty-h.y)/d*sp*dt;h.dir=tx<h.x?-1:1;}
   else if(h.tgt){const i=h.tgt[2];h.eat=(h.eat||0)+dt;if(h.eat>.8){h.eat=0;S.grass[i]--;h.food=Math.min(30,h.food+12);if(!S.grass[i]||h.food>=30)h.tgt=null;}}}
  for(const g of S.eggs)g.age+=dt;S.eggs=S.eggs.filter(g=>g.age<25);
  if(S.tGoal.bears){S.bearT-=dt;if(S.bearT<=0){S.bearT=Math.max(12,35-S.lv*4);S.bears.push({x:f.fx+Math.random()*f.fw,y:-40,ty:f.fy+40+Math.random()*(f.fh-80),hits:0,caged:false,dir:1,cage:0});Sound.error();}}
  for(const b of S.bears){if(b.y<b.ty){b.y+=260*dt;continue;}if(b.caged){b.cage+=dt;if(b.cage>14){S.bears.splice(S.bears.indexOf(b),1);break;}continue;}
   b.x+=b.dir*40*dt;if(b.x<f.fx||b.x>f.fx+f.fw)b.dir*=-1;for(const h of S.hens)if(Math.hypot(h.x-b.x,h.y-b.y)<26){S.hens.splice(S.hens.indexOf(h),1);msg('🐻 Медведь утащил курицу!');Sound.error();break;}}
  checkGoal();}
 function goals(){const L=S.tGoal;const r=[[`🥚 Яиц: ${S.got.eggs}/${L.eggs}`,S.got.eggs>=L.eggs]];if(L.cake)r.push([`🧁 Выпечка: ${S.got.cake||0}/${L.cake}`,(S.got.cake||0)>=L.cake]);if(L.coins)r.push([`💰 Монет: ${S.coins}/${L.coins}`,S.coins>=L.coins]);return r;}
 function checkGoal(){if(goals().every(g=>g[1]))end(true);}
 function end(ok){S.done=true;Sound[ok?'win':'error']();const nl=S.lv+1;if(ok&&nl<FARM_LV.length)LS.set('farmLv',nl);
  const o=el(`<div class="fm-over"><div><h2>${ok?'🎉 Уровень пройден!':'⏰ Время вышло'}</h2><p>${ok?(nl<FARM_LV.length?'Ферма растёт!':'Вы прошли всю игру! 🏆'):'Попробуйте ещё раз'}</p><br><button class="btn primary">${ok&&nl<FARM_LV.length?'Следующий уровень':'Заново'}</button></div></div>`);
  cv.parentNode.appendChild(o);$('button',o).onclick=()=>{o.remove();S=fresh(ok&&nl<FARM_LV.length?nl:S.lv);for(let i=0;i<2;i++)addHen();$('[data-a=bake]',root).textContent='🧁 Пекарня 250';};}
 function draw(){const f=field();const sky=x.createLinearGradient(0,0,0,80);sky.addColorStop(0,'#7ec8ff');sky.addColorStop(1,'#c6ecff');x.fillStyle=sky;x.fillRect(0,0,W,80);
  x.fillStyle='#8fd16a';x.fillRect(0,80,W,H);x.fillStyle='#7ac255';for(let i=0;i<60;i++){x.fillRect((i*137)%W,80+(i*71)%(H-80),3,6);}
  // fence
  x.strokeStyle='#a0672a';x.lineWidth=4;x.strokeRect(f.fx-8,f.fy-8,f.fw+16,f.fh+16);x.fillStyle='#c98b46';for(let px=f.fx-8;px<=f.fx+f.fw+8;px+=30){x.fillRect(px-3,f.fy-16,6,14);x.fillRect(px-3,f.fy+f.fh+4,6,14);}
  // grass
  S.grass.forEach((v,i)=>{if(!v)return;const gx=f.fx+(i%GW)*f.cw,gy=f.fy+(i/GW|0)*f.ch;x.fillStyle=['','#5fae3a','#3f9a2a','#2a8a1c'][v];x.beginPath();for(let k=0;k<5;k++){const bx=gx+f.cw*(.15+k*.17),h=f.ch*(.25+v*.15);x.moveTo(bx-3,gy+f.ch*.8);x.lineTo(bx,gy+f.ch*.8-h);x.lineTo(bx+3,gy+f.ch*.8);}x.fill();});
  // well, warehouse, bakery, truck road
  const rx=W-200;x.fillStyle='#6d4c41';x.fillRect(rx,90,180,110);x.fillStyle='#8d6e63';x.beginPath();x.moveTo(rx-10,95);x.lineTo(rx+90,50);x.lineTo(rx+190,95);x.fill();x.fillStyle='#fff';x.font='bold 13px sans-serif';x.textAlign='center';x.fillText('СКЛАД',rx+90,120);x.font='13px sans-serif';x.fillText(`🥚${S.store.egg}  🧁${S.store.cake}  🐻${S.store.bear}`,rx+90,150);x.fillText(`${stored()}/${S.cap}`,rx+90,175);
  x.fillStyle='#9e9e9e';x.beginPath();x.ellipse(rx+40,260,32,14,0,0,7);x.fill();x.fillStyle='#4fc3f7';x.beginPath();x.ellipse(rx+40,258,24,9,0,0,7);x.fill();x.fillStyle='#795548';x.fillRect(rx+12,212,6,46);x.fillRect(rx+62,212,6,46);x.fillRect(rx+8,208,64,8);
  if(S.wellT>0){x.fillStyle='#000a';x.fillRect(rx+5,285,70,8);x.fillStyle='#29b6f6';x.fillRect(rx+5,285,70*(1-S.wellT/3),8);}
  x.fillStyle='#5a3200';x.font='12px sans-serif';x.fillText('Колодец',rx+40,306);
  if(S.bakery){x.fillStyle='#ffccbc';x.fillRect(rx+100,220,80,60);x.fillStyle='#d84315';x.fillRect(rx+95,212,90,12);x.fillStyle='#5a3200';x.fillText('Пекарня',rx+140,256);if(S.bakeQ.length){x.fillText('🔥 '+S.bakeQ.length,rx+140,272);}}
  x.fillStyle='#bcaaa4';x.fillRect(rx-10,H-60,200,40);const tx=S.truck>0?rx+Math.sin(Math.min(1,(8-S.truck)/8)*Math.PI)*-(rx+120)+10:rx+10;
  x.font='38px serif';x.textAlign='left';x.fillText('🚚',tx,H-26);x.textAlign='center';
  // eggs
  for(const g of S.eggs){x.globalAlpha=g.age>20?.5+.5*Math.sin(g.age*10):1;x.fillStyle='#fff8e1';x.beginPath();x.ellipse(g.x,g.y,7,9,0,0,7);x.fill();x.strokeStyle='#d7ccc8';x.lineWidth=1;x.stroke();x.globalAlpha=1;}
  // hens
  for(const h of S.hens){x.save();x.translate(h.x,h.y);x.scale(h.dir,1);x.fillStyle='#fff';x.beginPath();x.ellipse(0,0,14,11,0,0,7);x.fill();x.beginPath();x.arc(10,-9,7,0,7);x.fill();x.fillStyle='#e53935';x.beginPath();x.arc(10,-16,4,0,7);x.fill();x.fillStyle='#ffa000';x.beginPath();x.moveTo(16,-9);x.lineTo(22,-7);x.lineTo(16,-5);x.fill();x.fillStyle='#000';x.fillRect(11,-11,2,2);x.strokeStyle='#ffa000';x.lineWidth=2;x.beginPath();x.moveTo(-3,10);x.lineTo(-3,16);x.moveTo(3,10);x.lineTo(3,16);x.stroke();x.restore();
   x.fillStyle='#0004';x.fillRect(h.x-14,h.y-28,28,4);x.fillStyle=h.food>10?'#66bb6a':'#e53935';x.fillRect(h.x-14,h.y-28,28*Math.max(0,h.food)/30,4);}
  // bears
  for(const b of S.bears){x.font='40px serif';x.fillText('🐻',b.x,b.y+14);if(b.caged){x.strokeStyle='#555';x.lineWidth=3;for(let k=-24;k<=24;k+=8){x.beginPath();x.moveTo(b.x+k,b.y-24);x.lineTo(b.x+k,b.y+22);x.stroke();}x.strokeRect(b.x-26,b.y-26,52,50);}else if(b.hits){x.fillStyle='#0006';x.fillRect(b.x-20,b.y-32,40,5);x.fillStyle='#ffca28';x.fillRect(b.x-20,b.y-32,8*b.hits,5);}}
  // HUD
  $('.co',root).textContent='💰 '+S.coins;$('.wa',root).textContent='💧 '+S.water+'/10';$('.st',root).textContent=`📦 ${stored()}/${S.cap}`;$('.tm',root).textContent=`⏱ ${Math.floor(S.t/60)}:${String(Math.floor(S.t%60)).padStart(2,'0')}`;
  goalEl.innerHTML=`<b>Уровень ${S.lv+1}</b><br>`+goals().map(g=>`${g[1]?'✅':'⬜'} ${g[0]}`).join('<br>')+'<br><small style="opacity:.8">Клик по полю — посадить траву<br>Медведя — 5 кликов и в клетку</small>';}
 function frame(t){if(!win.el.isConnected)return;const dt=Math.min(.05,(t-last)/1000||0);last=t;if(!win.minimized)tick(dt);draw();raf=requestAnimationFrame(frame);}
 raf=requestAnimationFrame(frame);win.onClose=()=>cancelAnimationFrame(raf);return win;}});
alias('farm','farm','ферма','веселая ферма');
