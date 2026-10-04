
/* ============================ PONY KNIGHT ============================ */
addCSS(`.pk{flex:1;position:relative;background:#05050c;display:grid;place-items:center;min-height:0;overflow:hidden;outline:none}
.pk canvas{max-width:100%;max-height:100%;aspect-ratio:16/9;image-rendering:auto;background:#000}
.pk-ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(5,5,15,.82);color:#e8e6ff;text-align:center;font-family:Georgia,serif;z-index:2}
.pk-ov h1{font-size:54px;letter-spacing:.12em;color:#f3d8ff;text-shadow:0 0 24px #b06cff,0 0 4px #fff;margin:0}
.pk-ov h2{font-size:26px;margin:0;color:#ffd6f0}
.pk-ov button{min-width:240px;padding:10px 18px;border:1px solid #b9a4ff;background:rgba(120,90,200,.18);color:#fff;border-radius:4px;font:16px Georgia,serif}
.pk-ov button:hover{background:rgba(160,120,255,.4)}.pk-ov button:disabled{opacity:.4}
.pk-ov small{opacity:.75;line-height:1.7;font-family:var(--font)}
.pk-up{display:grid;grid-template-columns:1fr auto auto;gap:8px 14px;align-items:center;text-align:left;font-family:var(--font);font-size:14px}
.pk-up button{min-width:0;padding:4px 10px;font-size:13px}`);
storeApp('ponyknight',{cat:'game',dev:'Windows11WEB Studios',rating:5.0,size:'666 МБ',desc:'Метроидвания в духе Hollow Knight: отважная пони-рыцарь сражается со злыми пони в трёх областях. Боссы, скамейки, прокачка, душа, рывок и двойной прыжок.',feat:['3 области и 3 босса','Опыт, уровни, улучшения на скамейках','Удар вниз (pogo), магия души, лечение'],hero:true},{name:'Pony Knight',icon:AI.pony,keywords:'pony knight пони рыцарь hollow knight игра метроидвания',launch(){
 const root=el('<div class="pk" tabindex="0"><canvas width="960" height="540"></canvas></div>');
 const win=WM.create({app:'ponyknight',title:'Pony Knight',icon:AI.pony(),width:1000,height:620,content:root,minW:640,minH:400,onFocus:()=>root.focus()});
 const cv=$('canvas',root),c=cv.getContext('2d'),VW=960,VH=540,T=32,ROWS=17;
 const AREAS=[{name:'Забытый Луг',sky:['#0d1b2a','#1b4332'],ground:'#2d3a2e',top:'#52b788',fog:'#95d5b2',en:['crawl','hop'],boss:{name:'Королева Теней',hp:32,col:'#3a2d4f',mane:'#9d4edd'},reward:'dash'},
  {name:'Кристальные Пещеры',sky:['#03045e','#0077b6'],ground:'#1d2d44',top:'#48cae4',fog:'#90e0ef',en:['crawl','hop','fly'],boss:{name:'Кристальный Единорог',hp:48,col:'#caf0f8',mane:'#00b4d8'},reward:'dbl'},
  {name:'Тёмный Замок',sky:['#10002b','#5a189a'],ground:'#240046',top:'#c77dff',fog:'#e0aaff',en:['crawl','hop','fly','mage'],boss:{name:'Король Кошмаров',hp:75,col:'#1a1a1a',mane:'#ff006e'},reward:'win'}];
 const keys={},pressed={};let state='title',P,L,E,shots,parts,texts,cam=0,boss=null,save=LS.get('pk',null),raf,last=0,banner=0,shake=0;
 root.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(!keys[e.code])pressed[e.code]=true;keys[e.code]=true;if(e.code==='Escape'&&state==='play')menu('pause');});
 root.addEventListener('keyup',e=>{keys[e.code]=false;});root.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
 const K={left:()=>keys.ArrowLeft||keys.KeyA,right:()=>keys.ArrowRight||keys.KeyD,up:()=>keys.ArrowUp||keys.KeyW,down:()=>keys.ArrowDown||keys.KeyS,jump:()=>keys.Space||keys.KeyZ,jumpP:()=>pressed.Space||pressed.KeyZ,atkP:()=>pressed.KeyJ||pressed.KeyX,dashP:()=>pressed.KeyK||pressed.KeyC||pressed.ShiftLeft,boltP:()=>pressed.KeyL||pressed.KeyV,heal:()=>keys.KeyF,downP:()=>pressed.ArrowDown||pressed.KeyS};
 function rng(s){return()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff;};}
 function build(ai){const r=rng(777+ai*1000),Lw=160,map=Array.from({length:ROWS},()=>new Array(Lw).fill(0)),en=[];let gh=13,x=0;
  const col=(x,g,spike)=>{for(let y=0;y<ROWS;y++){map[y][x]=y>=g?1:0;}if(spike){for(let y=0;y<ROWS;y++)map[y][x]=0;map[16][x]=2;}};
  while(x<Lw){if(x<10||(x>=74&&x<84)||x>=Lw-30){col(x,13);x++;continue;}const k=r();
   if(k<.22){const w=2+(r()*2|0);for(let i=0;i<w&&x<Lw-30;i++)col(x++,gh,true);}
   else{const len=5+(r()*6|0);if(k<.55)gh=Math.max(10,Math.min(14,gh+(r()<.5?-1:1)));for(let i=0;i<len&&x<Lw-30&&!(x>=74&&x<84);i++)col(x++,gh);
    if(r()<.45){const px=x-len+1,py=gh-4-(r()*2|0);for(let i=0;i<3+(r()*2|0);i++)if(map[py][px+i]!==undefined)map[py][px+i]=1;}
    const t=AREAS[ai].en[r()*AREAS[ai].en.length|0];en.push({t,x:(x-2)*T,y:(gh-2)*T});}}
  for(let y=0;y<ROWS;y++){map[y][0]=1;map[y][Lw-1]=1;}for(let i=Lw-30;i<Lw;i++)map[1][i]=1;
  return {map,Lw,en,benches:[3*T,78*T],arena:(Lw-30)*T};}
 const solid=(tx,ty)=>{if(tx<0||tx>=L.Lw)return true;if(ty<0)return false;if(ty>=ROWS)return false;const v=L.map[ty][tx];return v===1||v===4;};
 function newGame(){save={area:0,bench:0,lvl:1,xp:0,sp:0,maxHp:5,dmg:1,soulMul:1,bits:0,abil:{}};LS.set('pk',save);start();}
 function start(){L=build(save.area);P={x:L.benches[save.bench]+10,y:11*T,w:22,h:30,vx:0,vy:0,face:1,onG:false,jumps:0,dashT:0,dashCD:0,atkT:0,atkCD:0,atkDir:0,inv:0,hp:save.maxHp,soul:0,healT:0,safe:null,coyote:0};
  spawn();shots=[];parts=[];texts=[];boss=null;cam=Math.max(0,P.x-VW/2);banner=3;state='play';closeOv();root.focus();}
 function spawn(){const A=save.area;E=L.en.map(e=>({...e,vx:0,vy:0,w:28,h:26,hp:{crawl:3,hop:4,fly:3,mage:4}[e.t]+A*2,face:-1,cd:1+Math.random()*2,hit:0,dead:false,base:e.y}));}
 function hurt(n,from){if(P.inv>0||state!=='play')return;P.hp-=n;P.inv=1.2;P.vx=(P.x<from?-1:1)*320;P.vy=-380;shake=.3;Sound.error();burst(P.x+11,P.y+15,'#fff',14);if(P.hp<=0)die();}
 function die(){state='dead';save.bits=Math.floor(save.bits/2);LS.set('pk',save);setTimeout(()=>menu('dead'),900);}
 function burst(x,y,col,n=8){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*360,vy:(Math.random()-.8)*360,t:.6,col});}
 function ftext(x,y,s,col='#fff'){texts.push({x,y,s,col,t:1.2});}
 function gainXp(n){save.xp+=n;while(save.xp>=save.lvl*30){save.xp-=save.lvl*30;save.lvl++;save.sp++;P.hp=save.maxHp;ftext(P.x,P.y-30,'УРОВЕНЬ '+save.lvl+'!','#ffd166');Sound.win();}}
 function moveBody(o,dt,grav=true){if(grav)o.vy=Math.min(900,o.vy+1800*dt);o.onG=false;o.hitWall=0;
  o.x+=o.vx*dt;let x0=Math.floor(o.x/T),x1=Math.floor((o.x+o.w-1)/T),y0=Math.floor(o.y/T),y1=Math.floor((o.y+o.h-1)/T);
  for(let ty=y0;ty<=y1;ty++){if(o.vx>0&&solid(x1,ty)){o.x=x1*T-o.w;o.hitWall=1;break;}if(o.vx<0&&solid(x0,ty)){o.x=(x0+1)*T;o.hitWall=-1;break;}}
  o.y+=o.vy*dt;x0=Math.floor(o.x/T);x1=Math.floor((o.x+o.w-1)/T);y0=Math.floor(o.y/T);y1=Math.floor((o.y+o.h-1)/T);
  for(let tx=x0;tx<=x1;tx++){if(o.vy>0&&solid(tx,y1)){o.y=y1*T-o.h;o.vy=0;o.onG=true;break;}if(o.vy<0&&solid(tx,y0)){o.y=(y0+1)*T;o.vy=0;break;}}}
 const hitSpike=o=>{const x0=Math.floor(o.x/T),x1=Math.floor((o.x+o.w-1)/T),y1=Math.floor((o.y+o.h)/T);for(let tx=x0;tx<=x1;tx++)if(L.map[Math.min(16,y1)]?.[tx]===2)return true;return o.y>ROWS*T;};
 const ov=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
 function update(dt){const A=save.area;
  // player
  if(P.dashCD>0)P.dashCD-=dt;if(P.atkCD>0)P.atkCD-=dt;if(P.inv>0)P.inv-=dt;
  if(P.dashT>0){P.dashT-=dt;P.vy=0;P.vx=P.face*560;if(Math.random()<.6)parts.push({x:P.x+11,y:P.y+15,vx:0,vy:0,t:.3,col:'#d8b4fe'});moveBody(P,dt,false);}
  else{const mv=(K.right()?1:0)-(K.left()?1:0);if(P.healT<=0){P.vx+=((mv*230)-P.vx)*Math.min(1,dt*(P.onG?18:9));if(mv)P.face=mv;}else P.vx*=.8;
   if(P.onG){P.jumps=0;P.coyote=.1;if(!hitSpike({x:P.x,y:P.y,w:P.w,h:P.h+2}))P.safe={x:P.x,y:P.y};}else P.coyote-=dt;
   if(K.jumpP()){if(P.coyote>0){P.vy=-640;P.coyote=0;P.jumps=1;Sound.click();}else if(save.abil.dbl&&P.jumps<2){P.vy=-580;P.jumps=2;burst(P.x+11,P.y+30,'#caf0f8',6);}}
   if(!K.jump()&&P.vy<-200)P.vy=-200;
   if(K.dashP()&&save.abil.dash&&P.dashCD<=0){P.dashT=.18;P.dashCD=.6;P.inv=Math.max(P.inv,.18);}
   moveBody(P,dt);}
  if(K.atkP()&&P.atkCD<=0){P.atkT=.14;P.atkCD=.32;P.atkDir=K.up()?-1:(K.down()&&!P.onG?1:0);P.hitSet=new Set();Sound.click();}
  if(P.atkT>0){P.atkT-=dt;const hb=P.atkDir===-1?{x:P.x-12,y:P.y-44,w:46,h:46}:P.atkDir===1?{x:P.x-12,y:P.y+P.h,w:46,h:44}:{x:P.face>0?P.x+P.w:P.x-50,y:P.y-6,w:50,h:40};
   const targets=[...E.filter(e=>!e.dead),...(boss&&!boss.dead?[boss]:[])];for(const e of targets){if(P.hitSet.has(e)||!ov(hb,e))continue;P.hitSet.add(e);damage(e,save.dmg*2,P.atkDir===0?P.face*260:0);P.soul=Math.min(99,P.soul+11*save.soulMul);if(P.atkDir===1){P.vy=-520;P.jumps=1;}else if(P.atkDir===0)P.vx=-P.face*160;}
   if(P.atkDir===1&&!P.hitSet.size&&hitSpike({x:hb.x,y:hb.y,w:hb.w,h:hb.h})){P.vy=-520;P.hitSet.add(1);Sound.pop();}}
  if(K.boltP()&&P.soul>=33){P.soul-=33;shots.push({x:P.x+11,y:P.y+12,vx:P.face*640,vy:0,r:12,mine:true,t:1.2,dmg:save.dmg*3+2,hit:new Set()});Sound.pop();}
  if(K.heal()&&P.onG&&P.soul>=33&&P.hp<save.maxHp){P.healT+=dt;if(Math.random()<.5)parts.push({x:P.x+Math.random()*22,y:P.y+30,vx:0,vy:-80,t:.5,col:'#fff'});if(P.healT>.9){P.healT=0;P.soul-=33;P.hp++;ftext(P.x,P.y-20,'+1 ♥','#ff8fab');Sound.pop();}}else P.healT=0;
  if(hitSpike(P)){P.hp--;Sound.error();shake=.3;if(P.hp<=0)return die();P.inv=1;if(P.safe){P.x=P.safe.x;P.y=P.safe.y;}P.vx=P.vy=0;}
  // bench
  const nb=L.benches.findIndex(b=>Math.abs(P.x+11-(b+16))<30&&P.onG);if(nb>=0&&K.downP()){save.bench=nb;P.hp=save.maxHp;spawn();LS.set('pk',save);Sound.win();menu('bench');return;}
  // enemies
  for(const e of E){if(e.dead)continue;if(e.hit>0)e.hit-=dt;const dx=P.x-e.x,ad=Math.abs(dx),near=ad<420&&Math.abs(P.y-e.y)<260;e.cd-=dt;
   if(e.t==='crawl'){if(!e.vx)e.vx=-60-A*15;if(e.hitWall||!solid(Math.floor((e.x+(e.vx>0?e.w+2:-2))/T),Math.floor((e.y+e.h+4)/T)))e.vx*=-1;e.face=Math.sign(e.vx);moveBody(e,dt);}
   else if(e.t==='hop'){if(e.onG){e.vx*=.85;if(near&&e.cd<=0){e.vy=-560;e.vx=Math.sign(dx)*(180+A*30);e.cd=1.4;e.face=Math.sign(dx);}}moveBody(e,dt);}
   else if(e.t==='fly'){e.flt=(e.flt||0)+dt;if(near){e.vx+=(Math.sign(dx)*150-e.vx)*dt*2;e.vy+=(Math.sign(P.y-e.y)*110-e.vy)*dt*2;}else{e.vx*=.95;e.vy=Math.sin(e.flt*2)*40;}e.face=Math.sign(e.vx)||-1;moveBody(e,dt,false);}
   else if(e.t==='mage'){e.face=Math.sign(dx)||-1;if(near&&e.cd<=0){e.cd=2.2-A*.2;const d=Math.hypot(dx,P.y-e.y)||1;shots.push({x:e.x+14,y:e.y+8,vx:dx/d*300,vy:(P.y-e.y)/d*300,r:9,t:3,col:'#ff4d6d'});}moveBody(e,dt);}
   if(e.knock){e.x+=e.knock*dt;e.knock*=.85;if(Math.abs(e.knock)<5)e.knock=0;}
   if(e.y>ROWS*T)e.dead=true;if(ov(P,e))hurt(1,e.x);}
  if(boss)updBoss(dt);
  if(!boss&&P.x>L.arena+3*T&&!save.beaten?.[A]){startBoss();}
  if(boss&&boss.dead&&P.x>(L.Lw-2)*T-30){save.area++;save.bench=0;if(save.area>=AREAS.length){save.area=0;menu('win');return;}LS.set('pk',save);start();return;}
  // shots
  for(const s of shots){s.t-=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.grav)s.vy+=900*dt;if(solid(Math.floor(s.x/T),Math.floor(s.y/T))&&!s.ghost)s.t=0;
   if(s.mine){for(const e of [...E.filter(e=>!e.dead),...(boss&&!boss.dead?[boss]:[])])if(!s.hit.has(e)&&ov({x:s.x-s.r,y:s.y-s.r,w:s.r*2,h:s.r*2},e)){s.hit.add(e);damage(e,s.dmg,Math.sign(s.vx)*200);}}
   else if(ov({x:s.x-s.r+3,y:s.y-s.r+3,w:s.r*2-6,h:s.r*2-6},P)){hurt(1,s.x);s.t=0;}}
  shots=shots.filter(s=>s.t>0);
  for(const p of parts){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=600*dt;}parts=parts.filter(p=>p.t>0);for(const t of texts){t.t-=dt;t.y-=30*dt;}texts=texts.filter(t=>t.t>0);
  if(banner>0)banner-=dt;if(shake>0)shake-=dt;
  const tgt=Math.max(0,Math.min(L.Lw*T-VW,P.x-VW/2+P.face*60));cam+=(tgt-cam)*Math.min(1,dt*5);if(boss&&!boss.dead)cam+=((L.arena)-cam)*Math.min(1,dt*3);
  for(const k in pressed)delete pressed[k];}
 function damage(e,n,kb){e.hp-=n;e.hit=.15;e.knock=kb;burst(e.x+e.w/2,e.y+e.h/2,e.boss?'#ff8fab':'#ffb3c6',6);ftext(e.x+e.w/2,e.y-6,'-'+n,'#ffd6e0');Sound.pop();
  if(e.hp<=0){e.dead=true;burst(e.x+e.w/2,e.y+e.h/2,'#fff',18);if(e.boss)return bossDown();const b=2+Math.random()*4|0;save.bits+=b;ftext(e.x,e.y-20,'+'+b+' ◆','#ffd166');gainXp(5+save.area*3);}}
 function startBoss(){const B=AREAS[save.area].boss;boss={boss:true,name:B.name,x:L.arena+20*T,y:10*T,w:54,h:48,vx:0,vy:0,hp:B.hp*(1+(save.ng||0)*.5),max:B.hp*(1+(save.ng||0)*.5),face:-1,st:'idle',t:1.5,hit:0,col:B.col,mane:B.mane};
  for(let y=0;y<13;y++)L.map[y][L.arena/T]=4;Sound.error();banner=0;}
 function updBoss(dt){const b=boss;if(b.dead)return;const A=save.area;if(b.hit>0)b.hit-=dt;b.t-=dt;const dx=P.x-b.x;
  if(b.st==='idle'){b.vx*=.9;b.face=Math.sign(dx)||-1;if(b.t<=0){const opts=A===0?['charge','leap']:A===1?['tele','spread','rain']:['charge','leap','spread','summon','rain'];b.st=opts[Math.random()*opts.length|0];b.t=b.st==='charge'?1.2:b.st==='leap'?1.4:1;b.fired=0;
    if(b.st==='leap'){b.vy=-820;b.vx=dx*1.1;}if(b.st==='tele'){burst(b.x+27,b.y+24,'#caf0f8',20);b.x=Math.max(L.arena+2*T,Math.min((L.Lw-4)*T,P.x+(Math.random()<.5?-180:180)));b.y=8*T;burst(b.x+27,b.y+24,'#caf0f8',20);b.st='spread';b.t=.8;}
    if(b.st==='summon'){for(let i=0;i<2;i++)E.push({t:i?'fly':'hop',x:b.x+(i?-80:80),y:9*T,vx:0,vy:0,w:28,h:26,hp:5,face:-1,cd:1,hit:0,dead:false});b.t=.8;}}}
  else if(b.st==='charge'){b.vx=b.face*(380+A*60);if(b.hitWall||b.t<=0){b.st='idle';b.t=.9;shake=.2;}}
  else if(b.st==='leap'){if(b.onG&&b.vy===0&&b.t<1.3){shake=.35;for(const d of [-1,1])shots.push({x:b.x+27,y:b.y+b.h-10,vx:d*360,vy:0,r:12,t:2,col:b.mane,ghost:true});b.st='idle';b.t=1;}}
  else if(b.st==='spread'){b.vx*=.9;if(!b.fired&&b.t<.5){b.fired=1;const n=5+A;for(let i=0;i<n;i++){const a=Math.atan2(P.y-b.y,dx)+(i-(n-1)/2)*.22;shots.push({x:b.x+27,y:b.y+20,vx:Math.cos(a)*300,vy:Math.sin(a)*300,r:9,t:3,col:b.mane});}}if(b.t<=0){b.st='idle';b.t=1.1;}}
  else if(b.st==='rain'){if(b.t<=0){for(let i=0;i<7;i++)shots.push({x:L.arena+(2+Math.random()*26)*T,y:2*T+Math.random()*40,vx:0,vy:60,r:9,t:3,col:b.mane,grav:true});b.st='idle';b.t=1.4;}}
  else{b.st='idle';}
  moveBody(b,dt,!(b.st==='spread'&&A>=1));if(b.knock){b.knock=0;}if(ov(P,b))hurt(1,b.x+27);}
 function bossDown(){const B=AREAS[save.area];boss.dead=true;shake=.6;Sound.win();save.beaten=save.beaten||{};save.beaten[save.area]=true;gainXp(60+save.area*40);save.bits+=100;
  for(let y=0;y<13;y++)L.map[y][L.arena/T]=0;for(let y=10;y<13;y++)L.map[y][L.Lw-1]=0;
  if(B.reward==='dash'){save.abil.dash=true;ftext(P.x-60,P.y-60,'Новая способность: РЫВОК (K / C / Shift)','#d8b4fe');}
  if(B.reward==='dbl'){save.abil.dbl=true;ftext(P.x-60,P.y-60,'Новая способность: ДВОЙНОЙ ПРЫЖОК','#caf0f8');}
  texts[texts.length-1]&&(texts[texts.length-1].t=4);ftext(L.arena+12*T,7*T,'→ Проход открыт →','#fff');LS.set('pk',save);}
 /* ---------- drawing ---------- */
 function pony(x,y,f,o){c.save();c.translate(x,y);c.scale(f,1);const s=o.s||1;c.scale(s,s);
  c.fillStyle=o.body;c.beginPath();c.ellipse(0,0,15,10,0,0,7);c.fill();const leg=Math.sin(o.anim||0)*4;c.fillRect(-12,6,5,11+leg*.3);c.fillRect(7,6,5,11-leg*.3);c.fillRect(-5,6,4,10-leg*.3);c.fillRect(2,6,4,10+leg*.3);
  c.beginPath();c.ellipse(13,-11,8,7,-.3,0,7);c.fill();c.fillRect(7,-10,8,10);
  c.fillStyle=o.mane;c.beginPath();c.ellipse(7,-15,6,9,.5,0,7);c.fill();c.beginPath();c.moveTo(-14,-3);c.quadraticCurveTo(-26,2,-22,14);c.quadraticCurveTo(-18,4,-13,2);c.fill();
  c.fillStyle=o.eye||'#222';c.beginPath();c.arc(16,-12,2.2,0,7);c.fill();
  if(o.horn){c.fillStyle=o.horn;c.beginPath();c.moveTo(14,-17);c.lineTo(22,-30);c.lineTo(17,-16);c.fill();}
  if(o.wings){c.fillStyle=o.mane;c.globalAlpha=.85;c.beginPath();c.moveTo(-2,-6);c.quadraticCurveTo(-10,-28+Math.sin(o.anim*3)*8,-22,-20);c.quadraticCurveTo(-12,-12,-2,-4);c.fill();c.globalAlpha=1;}
  if(o.helm){c.fillStyle='#cfd8e3';c.beginPath();c.arc(13,-14,8.5,Math.PI*1.05,Math.PI*2.1);c.fill();c.fillStyle='#ff5d8f';c.fillRect(8,-25,3,6);}
  if(o.crown){c.fillStyle='#ffd166';c.beginPath();c.moveTo(6,-18);c.lineTo(8,-27);c.lineTo(11,-21);c.lineTo(14,-28);c.lineTo(17,-21);c.lineTo(20,-26);c.lineTo(20,-17);c.fill();}
  c.restore();}
 function draw(){const A=AREAS[save.area];const sx=shake>0?(Math.random()-.5)*10:0,sy=shake>0?(Math.random()-.5)*10:0;
  const g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,A.sky[0]);g.addColorStop(1,A.sky[1]);c.fillStyle=g;c.fillRect(0,0,VW,VH);
  c.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<14;i++){const px=((i*260-cam*.2)%(VW+300)+VW+300)%(VW+300)-150;c.beginPath();c.moveTo(px,VH);c.lineTo(px+120,160+(i*53)%120);c.lineTo(px+240,VH);c.fill();}
  c.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<10;i++){const px=((i*340-cam*.5)%(VW+400)+VW+400)%(VW+400)-200;c.fillRect(px,220+(i*37)%90,30,VH);c.beginPath();c.arc(px+15,220+(i*37)%90,40,0,7);c.fill();}
  c.save();c.translate(-Math.round(cam)+sx,sy+(VH-ROWS*T));
  const x0=Math.max(0,Math.floor(cam/T)),x1=Math.min(L.Lw-1,x0+VW/T+2);
  for(let y=0;y<ROWS;y++)for(let x=x0;x<=x1;x++){const v=L.map[y][x];if(v===1||v===4){c.fillStyle=v===4?'#5c4d7d':A.ground;c.fillRect(x*T,y*T,T,T);if(v===1&&(y===0||L.map[y-1][x]!==1)){c.fillStyle=A.top;c.fillRect(x*T,y*T,T,5);}}
   else if(v===2){c.fillStyle='#ddd';for(let k=0;k<4;k++){c.beginPath();c.moveTo(x*T+k*8,y*T+T);c.lineTo(x*T+k*8+4,y*T+8);c.lineTo(x*T+k*8+8,y*T+T);c.fill();}}}
  for(const b of L.benches){c.fillStyle='#8d6e63';c.fillRect(b,12*T+14,36,6);c.fillRect(b+3,12*T+20,4,12);c.fillRect(b+29,12*T+20,4,12);c.fillRect(b,12*T+2,4,14);c.fillRect(b+32,12*T+2,4,14);
   if(Math.abs(P.x+11-(b+16))<30){c.fillStyle='#fff';c.font='13px sans-serif';c.textAlign='center';c.fillText('↓ Отдохнуть',b+18,12*T-14);}}
  for(const e of E){if(e.dead)continue;const col=e.hit>0?'#fff':{crawl:'#6a4c93',hop:'#8338ec',fly:'#3a0ca3',mage:'#560bad'}[e.t];pony(e.x+14,e.y+10,e.face||-1,{body:col,mane:'#ff006e',eye:'#ff0',horn:e.t==='mage'?'#ff4d6d':0,wings:e.t==='fly',anim:performance.now()/90});}
  if(boss&&!boss.dead){const b=boss;pony(b.x+27,b.y+22,b.face,{body:b.hit>0?'#fff':b.col,mane:b.mane,eye:'#ff0054',s:2.1,horn:save.area>=1?'#90e0ef':0,crown:save.area===2,anim:performance.now()/70});}
  if(!(P.inv>0&&Math.floor(P.inv*20)%2)){pony(P.x+11,P.y+12,P.face,{body:'#fdf0ff',mane:'#b5179e',eye:'#3a0ca3',helm:true,horn:'#ffd166',anim:Math.abs(P.vx)>20?performance.now()/70:0});}
  if(P.atkT>0){c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=4;c.beginPath();const cx=P.x+11,cy=P.y+12;if(P.atkDir===-1)c.arc(cx,cy-18,30,Math.PI*1.1,Math.PI*1.9);else if(P.atkDir===1)c.arc(cx,cy+26,30,Math.PI*.1,Math.PI*.9);else c.arc(cx+P.face*20,cy,30,P.face>0?-1:Math.PI-1.1,P.face>0?1.1:Math.PI+1);c.stroke();}
  for(const s of shots){c.fillStyle=s.mine?'#e0aaff':s.col;c.shadowColor=c.fillStyle;c.shadowBlur=14;c.beginPath();c.arc(s.x,s.y,s.r,0,7);c.fill();c.shadowBlur=0;}
  for(const p of parts){c.globalAlpha=Math.max(0,p.t*1.6);c.fillStyle=p.col;c.fillRect(p.x,p.y,3,3);}c.globalAlpha=1;
  c.font='bold 14px sans-serif';c.textAlign='center';for(const t of texts){c.globalAlpha=Math.min(1,t.t);c.fillStyle=t.col;c.fillText(t.s,t.x,t.y);}c.globalAlpha=1;c.restore();
  // HUD
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.arc(48,48,30,0,7);c.fill();c.save();c.beginPath();c.arc(48,48,27,0,7);c.clip();c.fillStyle='#e0e0ff';c.fillRect(20,75-54*P.soul/99,56,60);c.restore();c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(48,48,28,0,7);c.stroke();
  for(let i=0;i<save.maxHp;i++){c.fillStyle=i<P.hp?'#fff':'rgba(255,255,255,.2)';c.beginPath();const hx=92+i*26,hy=34;c.moveTo(hx,hy+8);c.bezierCurveTo(hx-12,hy-2,hx-4,hy-12,hx,hy-4);c.bezierCurveTo(hx+4,hy-12,hx+12,hy-2,hx,hy+8);c.fill();}
  c.fillStyle='#ffd166';c.font='15px sans-serif';c.textAlign='left';c.fillText('◆ '+save.bits,86,66);c.fillStyle='#ccc';c.fillText(`Ур. ${save.lvl}`,150,66);c.fillStyle='#444';c.fillRect(200,58,100,6);c.fillStyle='#b5179e';c.fillRect(200,58,100*save.xp/(save.lvl*30),6);
  if(save.sp){c.fillStyle='#ffd166';c.fillText('★ Очки: '+save.sp+' (скамейка)',310,66);}
  if(boss&&!boss.dead){c.fillStyle='rgba(0,0,0,.5)';c.fillRect(180,VH-40,600,14);c.fillStyle='#ff006e';c.fillRect(180,VH-40,600*Math.max(0,boss.hp)/boss.max,14);c.fillStyle='#fff';c.textAlign='center';c.font='16px Georgia';c.fillText(boss.name,480,VH-48);}
  if(banner>0){c.globalAlpha=Math.min(1,banner);c.fillStyle='#fff';c.textAlign='center';c.font='34px Georgia';c.fillText(A.name,480,170);c.font='15px Georgia';c.fillText('— Область '+(save.area+1)+' —',480,200);c.globalAlpha=1;}}
 /* ---------- menus ---------- */
 let ovEl=null;const closeOv=()=>{ovEl&&ovEl.remove();ovEl=null;};
 function menu(kind){closeOv();if(kind!=='title')state='menu';const upg=[['maxHp','♥ +1 Маска',9],['dmg','⚔ +1 Урон гвоздя',8],['soulMul','✧ +25% Души',3]];
  let h='';if(kind==='title')h=`<h1>PONY KNIGHT</h1><p style="opacity:.8;margin-bottom:10px">Рыцарь в блестящих доспехах против царства злых пони</p><button data-m="cont" ${save?'':'disabled'}>Продолжить${save?` (ур. ${save.lvl}, ${AREAS[save.area].name})`:''}</button><button data-m="new">Новая игра</button><small>← → / A D — бег · Пробел / Z — прыжок · J / X — удар (↑/↓ — вверх/вниз, pogo по шипам)<br>L / V — заряд души · зажать F — лечение · K / C — рывок · ↓ на скамейке — отдых и прокачка · Esc — пауза</small>`;
  else if(kind==='bench')h=`<h2>🪑 Скамейка — игра сохранена</h2><p>Уровень ${save.lvl} · ★ очков: ${save.sp} · ◆ ${save.bits}</p><div class="pk-up">${upg.map(([k,n,mx])=>{const lv=k==='soulMul'?Math.round((save.soulMul-1)/.25):k==='maxHp'?save.maxHp-5:save.dmg-1;const cost=150*(lv+1);return `<span>${n} <small>(${lv}/${mx})</small></span><button data-u="${k}" data-c="sp" ${save.sp&&lv<mx?'':'disabled'}>★ 1</button><button data-u="${k}" data-c="bits" data-cost="${cost}" ${save.bits>=cost&&lv<mx?'':'disabled'}>◆ ${cost}</button>`}).join('')}</div><p style="font-size:13px;opacity:.8">Способности: заряд души ✔ · рывок ${save.abil.dash?'✔':'🔒'} · двойной прыжок ${save.abil.dbl?'✔':'🔒'}</p><button data-m="resume">В путь</button>`;
  else if(kind==='pause')h=`<h2>Пауза</h2><button data-m="resume">Продолжить</button><button data-m="title">Главное меню</button>`;
  else if(kind==='dead')h=`<h2 style="color:#ff8fab">Вы пали</h2><p>Половина ◆ потеряна. Возрождение на последней скамейке.</p><button data-m="cont">Возродиться</button>`;
  else if(kind==='win'){save.ng=(save.ng||0)+1;save.beaten={};LS.set('pk',save);Sound.win();h=`<h1>ПОБЕДА</h1><h2>Король Кошмаров повержен. Эквестрия спасена! 🦄</h2><p>Уровень ${save.lvl}. Открыта «Новая игра+» (${save.ng}) — боссы сильнее.</p><button data-m="cont">Новая игра+</button>`;}
  ovEl=el(`<div class="pk-ov">${h}</div>`);root.appendChild(ovEl);
  ovEl.onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;Sound.click();const m=b.dataset.m,u=b.dataset.u;
   if(u){if(b.dataset.c==='sp')save.sp--;else save.bits-=+b.dataset.cost;if(u==='maxHp'){save.maxHp++;P.hp=save.maxHp;}else if(u==='dmg')save.dmg++;else save.soulMul+=.25;LS.set('pk',save);menu('bench');return;}
   if(m==='new'){if(save&&!confirm('Начать заново? Прогресс будет потерян.'))return;newGame();}else if(m==='cont'){start();}else if(m==='resume'){state='play';closeOv();root.focus();}else if(m==='title'){LS.set('pk',save);menu('title');state='title';}};}
 function frame(t){if(!win.el.isConnected)return;const dt=Math.min(.033,(t-last)/1000||0);last=t;if(state==='play'&&!win.minimized)update(dt);if(L)draw();else{c.fillStyle='#05050c';c.fillRect(0,0,VW,VH);}raf=requestAnimationFrame(frame);}
 win.onClose=()=>cancelAnimationFrame(raf);menu('title');raf=requestAnimationFrame(frame);setTimeout(()=>root.focus(),50);return win;}});
alias('ponyknight','ponyknight','pony knight','пони','pony');
