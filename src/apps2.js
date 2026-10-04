
/* ============================ MINESWEEPER ============================ */
const FACES={smile:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd43b" stroke="#c79100"/><circle cx="11" cy="13" r="2" fill="#222"/><circle cx="21" cy="13" r="2" fill="#222"/><path d="M10 19c3 4 9 4 12 0" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
 wow:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd43b" stroke="#c79100"/><circle cx="11" cy="12" r="2.2" fill="#222"/><circle cx="21" cy="12" r="2.2" fill="#222"/><ellipse cx="16" cy="21" rx="3.2" ry="4" fill="#222"/></svg>',
 dead:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd43b" stroke="#c79100"/><path d="M8.5 10.5l5 5M13.5 10.5l-5 5M18.5 10.5l5 5M23.5 10.5l-5 5" stroke="#222" stroke-width="2" stroke-linecap="round"/><path d="M10 23c3-4 9-4 12 0" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
 cool:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd43b" stroke="#c79100"/><path d="M5 12h22l-1 3c-.5 2-2 3-4 3h-1.5c-2 0-3-1-3.5-3l-.5-1h-1l-.5 1c-.5 2-1.5 3-3.5 3H10c-2 0-3.5-1-4-3z" fill="#222"/><path d="M10 21c3 3.5 9 3.5 12 0" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'};
const MINE_SVG='<svg viewBox="0 0 16 16"><g stroke="#111" stroke-width="1.4" stroke-linecap="round"><path d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2"/></g><circle cx="8" cy="8" r="4.6" fill="#111"/><circle cx="6.5" cy="6.5" r="1.3" fill="#fff"/></svg>';
Apps.register('minesweeper',{name:'Сапёр',icon:AI.minesweeper,keywords:'minesweeper winmine сапер игра',launch(){
 const LV={beg:{n:'Новичок',w:9,h:9,m:10},int:{n:'Любитель',w:16,h:16,m:40},exp:{n:'Эксперт',w:30,h:16,m:99}};
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="toolbar">${Object.entries(LV).map(([k,v])=>`<button class="tbtn" data-l="${k}">${v.n}</button>`).join('')}<span style="flex:1"></span><button class="tbtn" data-a="rec"><span class="ico">${I.history}</span>Рекорды</button></div>
  <div class="ms"><div class="ms-bar"><div class="ms-cnt"><span class="ico">${I.flag}</span><span class="mc">010</span></div><button class="ms-face" title="Новая игра">${FACES.smile}</button><div class="ms-cnt"><span class="ico">${I.clock}</span><span class="tc">000</span></div></div><div class="ms-grid"></div><div class="ms-msg muted">ЛКМ — открыть · ПКМ — флажок · двойной щелчок по цифре — открыть соседей</div></div></div>`);
 const win=WM.create({app:'minesweeper',title:'Сапёр',icon:AI.minesweeper(),width:420,height:520,content:root,minW:300,onClose:()=>clearInterval(timer)});
 const grid=$('.ms-grid',root),face=$('.ms-face',root);let lv=LS.get('msLevel','beg'),B,W,H,M,started,over,flags,opened,t0,timer,elapsed=0;
 function fit(){const L=LV[lv];const w=Math.min(WM.W-20,L.w*28+60),h=Math.min(WM.H-20,L.h*28+230);if(!win.maximized){WM.setRect(win,{w:Math.max(w,340),h});const r=WM.rect(win);WM.setRect(win,{x:clamp(r.x,0,WM.W-r.w),y:clamp(r.y,0,WM.H-r.h)});}}
 function reset(){const L=LV[lv];W=L.w;H=L.h;M=L.m;B=Array.from({length:W*H},()=>({m:false,o:false,f:false,n:0}));started=over=false;flags=0;opened=0;clearInterval(timer);elapsed=0;
  grid.style.gridTemplateColumns=`repeat(${W},26px)`;grid.innerHTML=B.map((c,i)=>`<div class="ms-c" data-i="${i}"></div>`).join('');face.innerHTML=FACES.smile;upd();$('.tc',root).textContent='000';
  $$('[data-l]',root).forEach(b=>b.classList.toggle('on',b.dataset.l===lv));$('.ms-msg',root).textContent='ЛКМ — открыть · ПКМ — флажок · двойной щелчок по цифре — аккорд';}
 const nb=i=>{const x=i%W,y=(i/W)|0,r=[];for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<W&&ny<H)r.push(ny*W+nx);}return r;};
 function place(safe){const ban=new Set([safe,...nb(safe)]);let k=0;while(k<M){const i=Math.random()*W*H|0;if(B[i].m||ban.has(i))continue;B[i].m=true;k++;}B.forEach((c,i)=>c.n=nb(i).filter(j=>B[j].m).length);
  started=true;t0=Date.now();timer=setInterval(()=>{elapsed=Math.floor((Date.now()-t0)/1000);$('.tc',root).textContent=String(Math.min(999,elapsed)).padStart(3,'0');},250);}
 function upd(){$('.mc',root).textContent=String(M-flags).padStart(3,'0');}
 function cellEl(i){return grid.children[i];}
 function draw(i){const c=B[i],e=cellEl(i);e.className='ms-c'+(c.o?' op'+(c.n&&!c.m?' n'+c.n:''):'');e.innerHTML=c.o?(c.m?MINE_SVG:(c.n||'')):(c.f?I.flag:'');}
 function open(i){if(over)return;if(!started)place(i);const c=B[i];if(c.o||c.f)return;
  if(c.m){c.o=true;draw(i);cellEl(i).classList.add('boom');return lose();}
  const st=[i];while(st.length){const j=st.pop();const d=B[j];if(d.o||d.f)continue;d.o=true;opened++;draw(j);if(d.n===0)nb(j).forEach(k=>{if(!B[k].o&&!B[k].m)st.push(k);});}
  Sound.click();if(opened===W*H-M)winGame();}
 function chord(i){const c=B[i];if(!c.o||!c.n)return;const n=nb(i);if(n.filter(j=>B[j].f).length===c.n)n.forEach(j=>{if(!B[j].f&&!B[j].o)open(j);});}
 function lose(){over=true;clearInterval(timer);face.innerHTML=FACES.dead;Sound.mine();B.forEach((c,i)=>{if(c.m&&!c.f){c.o=true;draw(i);}else if(c.f&&!c.m){cellEl(i).innerHTML='<span style="color:#e53935;font-size:16px">✕</span>';}});$('.ms-msg',root).textContent='Бум! Вы подорвались. Нажмите на смайлик, чтобы сыграть снова.';}
 function winGame(){over=true;clearInterval(timer);face.innerHTML=FACES.cool;Sound.win();B.forEach((c,i)=>{if(c.m&&!c.f){c.f=true;draw(i);}});flags=M;upd();const t=Math.max(1,Math.round((Date.now()-t0)/100)/10);
  const recs=LS.get('records',{});const l=(recs[lv]||[]);l.push({t,d:new Date().toLocaleDateString('ru-RU')});l.sort((a,b)=>a.t-b.t);recs[lv]=l.slice(0,5);LS.set('records',recs);const best=recs[lv][0].t===t;
  $('.ms-msg',root).textContent=`Победа! Время: ${t} с${best?' — новый рекорд! 🏆':''}`;Shell.notify({title:'Сапёр: победа!',body:`${LV[lv].n} — ${t} с`,app:'Сапёр',icon:AI.minesweeper(),silent:true});}
 grid.addEventListener('pointerdown',e=>{if(!over&&e.button===0&&e.target.closest('.ms-c'))face.innerHTML=FACES.wow;});
 addEventListener('pointerup',()=>{if(!over&&face.isConnected)face.innerHTML=FACES.smile;});
 grid.addEventListener('click',e=>{const c=e.target.closest('.ms-c');if(!c)return;const i=+c.dataset.i;if(B[i].o)chord(i);else open(i);});
 grid.addEventListener('dblclick',e=>{const c=e.target.closest('.ms-c');if(c)chord(+c.dataset.i);});
 grid.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();const c=e.target.closest('.ms-c');if(!c||over)return;const i=+c.dataset.i,d=B[i];if(d.o)return chord(i);d.f=!d.f;flags+=d.f?1:-1;upd();draw(i);Sound.click();});
 face.onclick=reset;
 root.addEventListener('click',e=>{const l=e.target.closest('[data-l]');if(l){lv=l.dataset.l;LS.set('msLevel',lv);reset();fit();}if(e.target.closest('[data-a=rec]')){const r=LS.get('records',{});
  Shell.dialog({title:'Рекорды Сапёра',icon:AI.minesweeper(),width:460,html:`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${Object.entries(LV).map(([k,v])=>`<div><b>${v.n}</b><div class="muted" style="font-size:12px;margin-bottom:6px">${v.w}×${v.h}, ${v.m} мин</div>${(r[k]||[]).map((x,i)=>`<div style="display:flex;justify-content:space-between;font-size:13px;padding:2px 0"><span>${i+1}. ${x.t} с</span><span class="muted">${x.d}</span></div>`).join('')||'<span class="muted" style="font-size:12px">— нет —</span>'}</div>`).join('')}</div>`,
   buttons:[{label:'Сбросить',value:'r'},{label:'OK',primary:true}]}).then(v=>{if(v==='r'){LS.set('records',{});}});}});
 reset();fit();return win;}});

/* ============================ SOLITAIRE (Klondike) ============================ */
Apps.register('solitaire',{name:'Косынка',icon:AI.solitaire,keywords:'solitaire klondike пасьянс карты игра',launch(){
 const SU=['♠','♥','♦','♣'],RK=['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="sol-bar"><button class="tbtn" data-a="new" style="color:#fff"><span class="ico">${I.plus}</span>Новая игра</button><button class="tbtn" data-a="undo" style="color:#fff"><span class="ico">${I.undo}</span>Отменить</button><button class="tbtn" data-a="draw" style="color:#fff"></button><button class="tbtn" data-a="auto" style="color:#fff" title="Автосбор в дома"><span class="ico">${I.up}</span>Авто</button><span style="flex:1"></span><span>Ходы: <b class="mv">0</b></span><span style="margin-left:14px">Время: <b class="tm">0:00</b></span></div><div class="sol"></div></div>`);
 const win=WM.create({app:'solitaire',title:'Косынка',icon:AI.solitaire(),width:760,height:640,content:root,minW:600,minH:480,onResize:()=>layout(),onClose:()=>{clearInterval(timer);cancelAnimationFrame(winRaf);}});
 const area=$('.sol',root);let draw3=LS.get('solDraw3',false),cards=[],P,moves=0,t0=0,timer,hist=[],winRaf=0,won=false;
 const CW=80,CH=112;let G=14,X0=14;
 function mkCard(s,r){const red=s===1||s===2;const e=el(`<div class="card${red?' red':''}"><div class="cr">${RK[r]}<small>${SU[s]}</small></div><div class="cm">${r>10?['J','Q','K'][r-11]+'<span style="font-size:22px">'+SU[s]+'</span>':SU[s]}</div><div class="cb">${RK[r]}<small>${SU[s]}</small></div></div>`);const c={s,r,red,up:false,el:e};e._c=c;return c;}
 function newGame(){clearInterval(timer);cancelAnimationFrame(winRaf);won=false;area.innerHTML='';cards=[];for(let s=0;s<4;s++)for(let r=1;r<=13;r++)cards.push(mkCard(s,r));for(let i=cards.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[cards[i],cards[j]]=[cards[j],cards[i]];}
  P={stock:[],waste:[],f:[[],[],[],[]],t:[[],[],[],[],[],[],[]]};let k=0;for(let c=0;c<7;c++)for(let r=0;r<=c;r++){const cd=cards[k++];cd.up=r===c;P.t[c].push(cd);}while(k<52){const cd=cards[k++];cd.up=false;P.stock.push(cd);}
  ['stock','waste','f0','f1','f2','f3','t0','t1','t2','t3','t4','t5','t6'].forEach(id=>{const s=el(`<div class="slot" data-slot="${id}">${id==='stock'?'↻':id[0]==='f'?'A':''}</div>`);area.appendChild(s);});
  cards.forEach(c=>area.appendChild(c.el));moves=0;hist=[];t0=0;$('.mv',root).textContent=0;$('.tm',root).textContent='0:00';$('[data-a=draw]',root).textContent=draw3?'Раздача: по 3':'Раздача: по 1';layout();}
 function startTimer(){if(t0)return;t0=Date.now();timer=setInterval(()=>{const s=Math.floor((Date.now()-t0)/1000);$('.tm',root).textContent=Math.floor(s/60)+':'+pad(s%60);},500);}
 function geom(){const w=area.clientWidth;G=Math.max(6,Math.min(24,(w-7*CW)/8));X0=(w-(7*CW+6*G))/2;return{col:i=>X0+i*(CW+G),top:12,ty:12+CH+20};}
 function layout(){if(!P)return;const g=geom(),H=area.clientHeight;let z=1;const pos=(c,x,y,zz)=>{c.el.style.left=x+'px';c.el.style.top=y+'px';c.el.style.zIndex=zz;c.el.classList.toggle('back',!c.up);};
  const slot=(id,x,y)=>{const s=$(`[data-slot="${id}"]`,area);s.style.left=x+'px';s.style.top=y+'px';};
  slot('stock',g.col(0),g.top);slot('waste',g.col(1),g.top);for(let i=0;i<4;i++)slot('f'+i,g.col(3+i),g.top);for(let i=0;i<7;i++)slot('t'+i,g.col(i),g.ty);
  P.stock.forEach((c,i)=>pos(c,g.col(0)-Math.min(i,8)*.0,g.top,z++));
  const wv=P.waste.length;P.waste.forEach((c,i)=>{const fan=draw3?Math.max(0,i-(wv-3)):0;pos(c,g.col(1)+fan*18,g.top,z++);});
  P.f.forEach((p,i)=>p.forEach(c=>pos(c,g.col(3+i),g.top,z++)));
  P.t.forEach((p,i)=>{const down=p.filter(c=>!c.up).length,up=p.length-down;let du=24,dd=8;const avail=H-g.ty-CH-10;if(up>1&&down*dd+(up-1)*du>avail)du=Math.max(10,(avail-down*dd)/(up-1));let y=g.ty;p.forEach(c=>{pos(c,g.col(i),y,z++);y+=c.up?du:dd;});});}
 const snap=()=>JSON.stringify({st:P.stock.map(id),w:P.waste.map(id),f:P.f.map(p=>p.map(id)),t:P.t.map(p=>p.map(id)),m:moves});
 function id(c){return c.s*13+c.r-1+(c.up?100:0);}
 function restore(js){const d=JSON.parse(js);const byId=n=>{const c=cards.find(c=>c.s*13+c.r-1===n%100);c.up=n>=100;return c;};P={stock:d.st.map(byId),waste:d.w.map(byId),f:d.f.map(p=>p.map(byId)),t:d.t.map(p=>p.map(byId))};moves=d.m;$('.mv',root).textContent=moves;layout();}
 function commit(before){hist.push(before);if(hist.length>200)hist.shift();moves++;$('.mv',root).textContent=moves;startTimer();
  P.t.forEach(p=>{const l=p[p.length-1];if(l&&!l.up)l.up=true;});layout();if(P.f.every(p=>p.length===13))victory();}
 function locate(c){if(P.stock.includes(c))return{pile:P.stock,k:'stock'};if(P.waste.includes(c))return{pile:P.waste,k:'waste'};for(let i=0;i<4;i++)if(P.f[i].includes(c))return{pile:P.f[i],k:'f',i};for(let i=0;i<7;i++)if(P.t[i].includes(c))return{pile:P.t[i],k:'t',i};}
 const canF=(c,p)=>p.length?(p[p.length-1].s===c.s&&p[p.length-1].r===c.r-1):c.r===1;
 const canT=(c,p)=>p.length?(p[p.length-1].up&&p[p.length-1].red!==c.red&&p[p.length-1].r===c.r+1):c.r===13;
 function moveTo(seq,from,to){const before=snap();from.splice(from.length-seq.length,seq.length);to.push(...seq);commit(before);Sound.click();}
 function drawStock(){const before=snap();if(!P.stock.length){if(!P.waste.length)return;P.stock=P.waste.reverse().map(c=>(c.up=false,c));P.waste=[];}else{const n=draw3?3:1;for(let i=0;i<n&&P.stock.length;i++){const c=P.stock.pop();c.up=true;P.waste.push(c);}}commit(before);}
 function autoMove(c){const L=locate(c);if(!L||L.k==='stock')return false;const idx=L.pile.indexOf(c);const seq=L.pile.slice(idx);
  if(seq.length===1&&L.k!=='f'){for(let i=0;i<4;i++)if(canF(c,P.f[i])){moveTo(seq,L.pile,P.f[i]);return true;}}
  for(let i=0;i<7;i++){if(L.k==='t'&&L.i===i)continue;if(canT(c,P.t[i])&&!(c.r===13&&L.k==='t'&&idx===0)){moveTo(seq,L.pile,P.t[i]);return true;}}
  c.el.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(0)'}],{duration:220});return false;}
 function autoAll(){let moved=true;const step=()=>{moved=false;const cands=[P.waste[P.waste.length-1],...P.t.map(p=>p[p.length-1])].filter(Boolean);for(const c of cands){for(let i=0;i<4;i++)if(canF(c,P.f[i])){const L=locate(c);moveTo([c],L.pile,P.f[i]);moved=true;break;}if(moved)break;}if(moved&&!won)setTimeout(step,90);};step();}
 area.addEventListener('pointerdown',e=>{if(won||e.button!==0)return;const ce=e.target.closest('.card');const sl=e.target.closest('[data-slot=stock]');
  if(sl||(ce&&P.stock.includes(ce._c))){drawStock();return;}if(!ce)return;const c=ce._c;if(!c.up)return;const L=locate(c);if(!L)return;
  if(L.k==='waste'&&c!==P.waste[P.waste.length-1])return;if(L.k==='f'&&c!==L.pile[L.pile.length-1])return;
  const seq=L.pile.slice(L.pile.indexOf(c));const sx=e.clientX,sy=e.clientY;const orig=seq.map(s=>({x:s.el.offsetLeft,y:s.el.offsetTop}));let moved=false;area.setPointerCapture(e.pointerId);
  const mv=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(!moved&&Math.hypot(dx,dy)<5)return;moved=true;seq.forEach((s,i)=>{s.el.classList.add('drag');s.el.style.left=orig[i].x+dx+'px';s.el.style.top=orig[i].y+dy+'px';s.el.style.zIndex=9000+i;});};
  const up=ev=>{area.removeEventListener('pointermove',mv);area.removeEventListener('pointerup',up);seq.forEach(s=>s.el.classList.remove('drag'));
   if(!moved){autoMove(c);return;}
   const cx=c.el.offsetLeft+CW/2,cy=c.el.offsetTop+CH/2;const g=geom();let target=null,best=1e9;
   const consider=(pile,x,y,ok)=>{const d=Math.hypot(cx-(x+CW/2),cy-(y+CH/2));if(ok&&d<best&&Math.abs(cx-(x+CW/2))<CW*.9)best=d,target=pile;};
   if(seq.length===1)P.f.forEach((p,i)=>consider(p,g.col(3+i),g.top,canF(c,p)&&p!==L.pile));
   P.t.forEach((p,i)=>{const last=p[p.length-1];consider(p,g.col(i),last?last.el.offsetTop:g.ty,canT(c,p)&&p!==L.pile);});
   if(target&&best<CH*1.3)moveTo(seq,L.pile,target);else layout();};
  area.addEventListener('pointermove',mv);area.addEventListener('pointerup',up);});
 area.addEventListener('dblclick',e=>{const ce=e.target.closest('.card');if(ce&&ce._c.up){const c=ce._c,L=locate(c);if(L&&L.pile[L.pile.length-1]===c)for(let i=0;i<4;i++)if(canF(c,P.f[i])){moveTo([c],L.pile,P.f[i]);break;}}});
 function victory(){if(won)return;won=true;clearInterval(timer);Sound.win();const s=Math.floor((Date.now()-t0)/1000);
  const cv=document.createElement('canvas');cv.width=area.clientWidth;cv.height=area.clientHeight;area.appendChild(cv);const x=cv.getContext('2d');
  const drawCard=(c,px,py)=>{x.fillStyle='#fff';x.strokeStyle='#999';x.beginPath();x.roundRect?x.roundRect(px,py,CW,CH,7):x.rect(px,py,CW,CH);x.fill();x.stroke();x.fillStyle=c.red?'#d32f2f':'#1a1a1a';x.font='bold 16px Georgia';x.fillText(RK[c.r],px+6,py+19);x.font='34px Georgia';x.textAlign='center';x.fillText(SU[c.s],px+CW/2,py+CH/2+12);x.textAlign='left';};
  const g=geom();let fi=3,active=null,order=[];for(let r=13;r>=1;r--)for(let i=0;i<4;i++)order.push({c:P.f[i][r-1],x:g.col(3+i),y:g.top});cards.forEach(c=>c.el.style.visibility='hidden');
  const loop=()=>{if(!active||active.x<-CW||active.x>cv.width){const n=order.shift();if(!n){showWin();return;}active={...n,vx:(Math.random()*6+2)*(Math.random()<.5?-1:1),vy:-Math.random()*8};}
   for(let k=0;k<2;k++){active.vy+=.6;active.x+=active.vx;active.y+=active.vy;if(active.y+CH>cv.height){active.y=cv.height-CH;active.vy*=-.78;}drawCard(active.c,active.x,active.y);}winRaf=requestAnimationFrame(loop);};loop();
  const showWin=()=>{const w=el(`<div class="sol-win acrylic"><div style="font-size:26px;font-weight:600;margin-bottom:6px">🎉 Победа!</div><div class="muted">Ходов: ${moves} · Время: ${Math.floor(s/60)}:${pad(s%60)}</div><button class="btn primary" style="margin-top:14px">Новая игра</button></div>`);area.appendChild(w);$('button',w).onclick=newGame;};
  area.addEventListener('click',function sk(){if(won&&order.length){order.length=0;cancelAnimationFrame(winRaf);showWin();}area.removeEventListener('click',sk);});}
 root.addEventListener('click',e=>{const a=e.target.closest('[data-a]')?.dataset.a;if(!a)return;if(a==='new')newGame();if(a==='undo'&&hist.length&&!won){restore(hist.pop());}if(a==='draw'){draw3=!draw3;LS.set('solDraw3',draw3);newGame();}if(a==='auto')autoAll();});
 requestAnimationFrame(newGame);return win;}});
