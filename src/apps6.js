
/* ============================ SPIDER SOLITAIRE ============================ */
addCSS(`
.sp{flex:1;display:flex;flex-direction:column;min-height:0;background:radial-gradient(ellipse at 50% 30%,#1f7a3d,#0d4a22);color:#fff;user-select:none}
.sp-bar{display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(0,0,0,.25);font-size:13px}
.sp-bar .sp-st{margin-left:auto;display:flex;gap:18px;opacity:.9}
.sp-bar select,.sp-bar button{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:5px;padding:3px 10px}
.sp-bar option{color:#000}
.sp-area{flex:1;position:relative;overflow:hidden}
.sp-card{position:absolute;border-radius:6px;background:#fff;color:#111;box-shadow:0 1px 3px rgba(0,0,0,.45);font-family:Georgia,'Times New Roman',serif;transition:left .18s,top .18s;overflow:hidden}
.sp-card.red{color:#c8102e}
.sp-card .c1{position:absolute;left:4px;top:2px;font-size:var(--fs);font-weight:700;line-height:1.05;text-align:center}
.sp-card .c2{position:absolute;inset:0;display:grid;place-items:center;font-size:calc(var(--fs)*2.2)}
.sp-card.back{background:repeating-linear-gradient(45deg,#1d4ed8 0 4px,#2563eb 4px 8px);border:3px solid #fff}
.sp-card.drag{transition:none;z-index:999!important;box-shadow:0 8px 20px rgba(0,0,0,.5)}
.sp-card.hint{box-shadow:0 0 0 3px #ffd54a}
.sp-slot{position:absolute;border:2px dashed rgba(255,255,255,.25);border-radius:6px}
.sp-stock{position:absolute;cursor:pointer}
.sp-win{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.45);font-size:28px;font-weight:600;text-align:center;z-index:1000}
`);
Apps.register('spider',{name:'Паук',icon:AI.spider,keywords:'spider solitaire паук пасьянс карты игра',launch(){
 const root=el(`<div class="sp"><div class="sp-bar"><button data-a="new">Новая игра</button><select><option value="1">1 масть</option><option value="2">2 масти</option><option value="4">4 масти</option></select><button data-a="undo">↶ Отменить</button><button data-a="hint">💡 Подсказка</button><div class="sp-st"><span class="sc"></span><span class="mv"></span><span class="tm"></span></div></div><div class="sp-area"></div></div>`);
 const win=WM.create({app:'spider',title:'Паук',icon:AI.spider(),width:980,height:660,content:root,minW:620,minH:420});
 const area=$('.sp-area',root),sel=$('select',root);sel.value=LS.get('spSuits',1);
 const SU=['♠','♥','♦','♣'],RK=['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
 let piles,stock,done,moves,score,hist,t0,timer,drag=null;
 function deal(){const n=+sel.value;LS.set('spSuits',n);const suits=n===1?[0]:n===2?[0,1]:[0,1,2,3];let deck=[];for(let k=0;k<8;k++){const s=suits[k%suits.length];for(let r=1;r<=13;r++)deck.push({s,r,up:false,id:k*13+r});}
  for(let i=deck.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[deck[i],deck[j]]=[deck[j],deck[i]];}
  piles=Array.from({length:10},()=>[]);for(let i=0;i<54;i++)piles[i%10].push(deck.pop());piles.forEach(p=>p[p.length-1].up=true);stock=deck;done=0;moves=0;score=500;hist=[];t0=Date.now();clearInterval(timer);timer=setInterval(stat,1000);render();}
 const snap=()=>JSON.stringify({piles,stock,done,score});
 const runOk=(p,i)=>{if(!p[i]||!p[i].up)return false;for(let k=i;k<p.length-1;k++){if(p[k+1].s!==p[k].s||p[k+1].r!==p[k].r-1)return false;}return true;};
 const canDrop=(run,to)=>{const p=piles[to];return !p.length||p[p.length-1].r===run[0].r+1;};
 function move(from,i,to){hist.push(snap());const run=piles[from].splice(i);piles[to].push(...run);const p=piles[from];if(p.length&&!p[p.length-1].up)p[p.length-1].up=true;moves++;score--;Sound.click();checkDone(to);render();}
 function checkDone(k){const p=piles[k];if(p.length<13)return;const i=p.length-13;if(p[i].r===13&&runOk(p,i)){p.splice(i);done++;score+=100;Sound.win();if(p.length&&!p[p.length-1].up)p[p.length-1].up=true;if(done===8){clearInterval(timer);setTimeout(()=>{const w=el(`<div class="sp-win"><div>🎉 Победа!<br><small style="font-size:16px">Счёт ${score}, ходов ${moves}</small><br><button class="btn primary" style="margin-top:14px">Ещё раз</button></div></div>`);area.appendChild(w);$('button',w).onclick=deal;},300);}}}
 function dealRow(){if(!stock.length)return;if(piles.some(p=>!p.length)){Sound.error();Shell.notify({title:'Паук',body:'Нельзя раздать карты, пока есть пустые стопки.',icon:AI.spider(),silent:true});return;}hist.push(snap());for(let k=0;k<10;k++){const c=stock.pop();c.up=true;piles[k].push(c);}moves++;Sound.pop();piles.forEach((_,k)=>checkDone(k));render();}
 function stat(){const s=(Date.now()-t0)/1000|0;$('.sc',root).textContent='Счёт: '+score;$('.mv',root).textContent='Ходы: '+moves;$('.tm',root).textContent='⏱ '+String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
 let G={};
 function render(){area.innerHTML='';const W=area.clientWidth||900,H=area.clientHeight||560;const gap=W*.012,cw=(W-gap*11)/10,ch=cw*1.4;G={cw,ch,gap};area.style.setProperty('--fs',Math.max(10,cw*.2)+'px');
  piles.forEach((p,k)=>{const x=gap+k*(cw+gap);area.appendChild(Object.assign(el('<div class="sp-slot"></div>'),{style:`left:${x}px;top:${gap}px;width:${cw}px;height:${ch}px`}));
   const avail=H-ch-gap*2-ch*.3;let dn=ch*.12,du=ch*.26;const nd=p.filter(c=>!c.up).length,nu=p.length-nd;const need=nd*dn+Math.max(0,nu-1)*du;if(need>avail&&need>0){const f=avail/need;dn*=f;du*=f;}
   let y=gap;p.forEach((c,i)=>{const d=el(c.up?`<div class="sp-card${c.s===1||c.s===2?' red':''}"><div class="c1">${RK[c.r]}<br>${SU[c.s]}</div><div class="c2">${SU[c.s]}</div></div>`:'<div class="sp-card back"></div>');
    d.style.cssText=`left:${x}px;top:${y}px;width:${cw}px;height:${ch}px;z-index:${i+1}`;d.dataset.k=k;d.dataset.i=i;area.appendChild(d);y+=c.up?du:dn;});});
  const sx=W-gap-cw,sy=H-ch-gap;for(let i=0;i<Math.ceil(stock.length/10);i++){const d=el('<div class="sp-card back sp-stock"></div>');d.style.cssText=`left:${sx-i*cw*.18}px;top:${sy}px;width:${cw}px;height:${ch}px`;d.onclick=dealRow;area.appendChild(d);}
  for(let i=0;i<done;i++){const d=el(`<div class="sp-card"><div class="c1">K<br>♠</div><div class="c2">♠</div></div>`);d.style.cssText=`left:${gap+i*cw*.25}px;top:${sy}px;width:${cw}px;height:${ch}px`;area.appendChild(d);}
  stat();}
 function bestTarget(from,i){const run=piles[from].slice(i);let best=-1,bs=-1;piles.forEach((p,k)=>{if(k===from||!canDrop(run,k))return;const sc=!p.length?1:p[p.length-1].s===run[0].s?3:2;if(sc>bs){bs=sc;best=k;}});return best;}
 area.addEventListener('pointerdown',e=>{const c=e.target.closest('.sp-card');if(!c||c.dataset.k==null)return;const k=+c.dataset.k,i=+c.dataset.i;if(!runOk(piles[k],i))return;
  const els=[...area.querySelectorAll(`.sp-card[data-k="${k}"]`)].filter(x=>+x.dataset.i>=i);const r=area.getBoundingClientRect();
  drag={k,i,els,sx:e.clientX,sy:e.clientY,moved:false,base:els.map(x=>[parseFloat(x.style.left),parseFloat(x.style.top)])};area.setPointerCapture(e.pointerId);});
 area.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;if(Math.abs(dx)+Math.abs(dy)>4)drag.moved=true;if(!drag.moved)return;drag.els.forEach((x,j)=>{x.classList.add('drag');x.style.left=drag.base[j][0]+dx+'px';x.style.top=drag.base[j][1]+dy+'px';});});
 area.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;if(!d.moved){const t=bestTarget(d.k,d.i);if(t>=0)move(d.k,d.i,t);else{Sound.error();}return;}
  const r=area.getBoundingClientRect();const x=parseFloat(d.els[0].style.left)+G.cw/2;const to=Math.max(0,Math.min(9,Math.floor((x-G.gap/2)/(G.cw+G.gap))));
  if(to!==d.k&&canDrop(piles[d.k].slice(d.i),to))move(d.k,d.i,to);else render();});
 $('.sp-bar',root).addEventListener('click',e=>{const a=e.target.dataset.a;if(a==='new')deal();if(a==='undo'&&hist.length){const s=JSON.parse(hist.pop());piles=s.piles;stock=s.stock;done=s.done;score=s.score-1;render();}
  if(a==='hint'){for(let k=0;k<10;k++){const p=piles[k];for(let i=0;i<p.length;i++){if(!runOk(p,i))continue;const t=bestTarget(k,i);if(t>=0&&!(i>0&&p[i-1].up&&p[i-1].r===p[i].r+1&&piles[t].length&&piles[t][piles[t].length-1].r===p[i].r+1&&p[i-1].s!==p[i].s&&false)){if(i>0&&p[i-1].up&&p[i-1].r===p[i].r+1&&p[i-1].s===p[i].s)continue;const c=area.querySelector(`.sp-card[data-k="${k}"][data-i="${i}"]`);c&&c.classList.add('hint');setTimeout(()=>c&&c.classList.remove('hint'),900);return;}break;}}Shell.notify({title:'Паук',body:stock.length?'Ходов нет — раздайте карты из колоды.':'Ходов больше нет.',icon:AI.spider(),silent:true});}});
 sel.onchange=deal;new ResizeObserver(()=>piles&&render()).observe(area);win.onClose=()=>clearInterval(timer);
 deal();return win;}});
alias('spider','spider','паук','spider.exe');

/* ============================ НАРДЫ (длинные) ============================ */
addCSS(`
.nd{flex:1;display:flex;flex-direction:column;min-height:0;background:#3e2415;color:#fff;user-select:none}
.nd-bar{display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(0,0,0,.3);font-size:13px}
.nd-bar .msg{flex:1}
.nd-board{flex:1;margin:10px;border-radius:10px;background:#7a4a24;border:10px solid #4a2b14;display:flex;flex-direction:column;position:relative;min-height:0;box-shadow:inset 0 0 30px rgba(0,0,0,.5)}
.nd-row{flex:1;display:flex}
.nd-half{flex:1;display:flex;background:#e9c48f}
.nd-bar2{width:24px;background:#4a2b14}
.nd-pt{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;padding:4px 0;gap:0}
.nd-pt::before{content:'';position:absolute;inset:0 6% 0 6%;clip-path:polygon(0 0,100% 0,50% 88%);background:var(--pc)}
.nd-row.bot .nd-pt{flex-direction:column-reverse}.nd-row.bot .nd-pt::before{clip-path:polygon(50% 12%,100% 100%,0 100%)}
.nd-pt.tg::after{content:'';position:absolute;inset:0;background:rgba(80,255,120,.3);border-radius:4px}
.nd-pt.src::after{content:'';position:absolute;inset:0;background:rgba(255,220,80,.3);border-radius:4px}
.nd-ch{position:relative;width:min(80%,40px);aspect-ratio:1;border-radius:50%;margin:-2px 0;box-shadow:0 2px 3px rgba(0,0,0,.5);display:grid;place-items:center;font-size:12px;font-weight:700}
.nd-ch.w{background:radial-gradient(circle at 35% 30%,#fff,#d9d4c7);color:#333}.nd-ch.b{background:radial-gradient(circle at 35% 30%,#555,#111);color:#eee}
.nd-mid{height:44px;display:flex;align-items:center;justify-content:center;gap:12px;background:#5c3519}
.nd-die{width:34px;height:34px;border-radius:7px;background:#fff;color:#111;display:grid;place-items:center;font-size:20px;font-weight:700;box-shadow:0 2px 4px rgba(0,0,0,.5)}.nd-die.used{opacity:.3}
.nd-off{position:absolute;right:-6px;top:50%;transform:translate(100%,-50%);}
`);
storeApp('nardy',{cat:'game',dev:'Windows11WEB Games',rating:4.6,size:'4 МБ',desc:'Длинные нарды против компьютера: бросок костей, дубли, правило головы, выброс фишек.',feat:['Правила длинных нард','Компьютерный соперник','Счёт побед']},{name:'Нарды',icon:AI.nardy,keywords:'нарды backgammon кости игра',launch(){
 const root=el(`<div class="nd"><div class="nd-bar"><span class="msg"></span><span class="sc"></span><button class="btn" data-a="new">Новая партия</button></div><div class="nd-board"><div class="nd-row top"></div><div class="nd-mid"></div><div class="nd-row bot"></div></div></div>`);
 const win=WM.create({app:'nardy',title:'Нарды',icon:AI.nardy(),width:900,height:640,content:root,minW:600,minH:460});
 const top=$('.top',root),bot=$('.bot',root),mid=$('.nd-mid',root),msg=$('.msg',root);
 let B,off,dice,turn,headUsed,first,sel=null,busy=false;const wins=LS.get('ndWins',{w:0,b:0});
 const idx=(c,p)=>c==='w'?p:(p+12)%24, pos=(c,i)=>c==='w'?i:(i+12)%24;
 function reset(){B=Array.from({length:24},()=>null);B[0]={c:'w',n:15};B[12]={c:'b',n:15};off={w:0,b:0};first={w:true,b:true};turn='w';newTurn();}
 function roll(){const a=1+Math.random()*6|0,b=1+Math.random()*6|0;dice=a===b?[a,a,a,a]:[a,b];headUsed=0;Sound.click();}
 const allHome=c=>{for(let i=0;i<24;i++){const q=B[i];if(q&&q.c===c&&pos(c,i)<18)return false;}return true;};
 const headLimit=c=>first[c]&&dice.length===4&&[6,4,3].includes(dice[0])?2:1;
 function targets(c,i){const p=pos(c,i);const res=[];if(p===0&&headUsed>=headLimit(c))return res;const seen=new Set();
  for(const d of dice){if(seen.has(d))continue;seen.add(d);const np=p+d;if(np<24){const q=B[idx(c,np)];if(!q||q.c===c)res.push({to:idx(c,np),d});}
   else if(allHome(c)){let ok=np===24;if(!ok){ok=true;for(let pp=18;pp<p;pp++){const q=B[idx(c,pp)];if(q&&q.c===c){ok=false;break;}}}if(ok)res.push({to:'off',d});}}return res;}
 function anyMove(c){for(let i=0;i<24;i++){const q=B[i];if(q&&q.c===c&&targets(c,i).length)return true;}return false;}
 function doMove(c,from,t){const q=B[from];q.n--;if(!q.n)B[from]=null;if(pos(c,from)===0)headUsed++;if(t.to==='off')off[c]++;else{B[t.to]?B[t.to].n++:B[t.to]={c,n:1};}dice.splice(dice.indexOf(t.d),1);Sound.pop();
  if(off[c]===15){wins[c]++;LS.set('ndWins',wins);render();busy=true;msg.textContent=c==='w'?'🎉 Вы победили!':'😔 Победил компьютер';c==='w'?Sound.win():Sound.error();return true;}return false;}
 function newTurn(){roll();render();if(!anyMove(turn)){msg.textContent=(turn==='w'?'У вас':'У компьютера')+' нет ходов — пропуск';setTimeout(endTurn,1200);return;}if(turn==='b')setTimeout(ai,700);}
 function endTurn(){first[turn]=false;turn=turn==='w'?'b':'w';sel=null;newTurn();}
 function afterMove(){if(!dice.length||!anyMove(turn)){setTimeout(endTurn,turn==='w'?400:600);render();}else{render();if(turn==='b')setTimeout(ai,550);}}
 function ai(){if(!win.el.isConnected||turn!=='b'||busy)return;let best=null,bs=-1e9;for(let i=0;i<24;i++){const q=B[i];if(!q||q.c!=='b')continue;for(const t of targets('b',i)){let s=t.to==='off'?100:t.d*2+(pos('b',i)===0?6:0)+(B[t.to]?1:3)-(q.n===1?2:0)+Math.random()*2;if(s>bs){bs=s;best=[i,t];}}}
  if(!best)return afterMove();if(doMove('b',best[0],best[1]))return;afterMove();}
 function render(){const pts=i=>{const q=B[i];const cls=(i%2?'#8b2d1d':'#2b2b2b');let ch='';if(q){const show=Math.min(q.n,5);for(let k=0;k<show;k++)ch+=`<div class="nd-ch ${q.c}">${k===show-1&&q.n>5?q.n:''}</div>`;}return `<div class="nd-pt${sel===i?' src':''}" data-i="${i}" style="--pc:${cls}">${ch}</div>`;};
  const tg=sel!=null?targets(turn,sel):[];
  top.innerHTML=`<div class="nd-half">${[12,13,14,15,16,17].map(pts).join('')}</div><div class="nd-bar2"></div><div class="nd-half">${[18,19,20,21,22,23].map(pts).join('')}</div>`;
  bot.innerHTML=`<div class="nd-half">${[11,10,9,8,7,6].map(pts).join('')}</div><div class="nd-bar2"></div><div class="nd-half">${[5,4,3,2,1,0].map(pts).join('')}</div>`;
  tg.forEach(t=>{if(t.to!=='off')root.querySelector(`.nd-pt[data-i="${t.to}"]`)?.classList.add('tg');});
  const pips=['','⚀','⚁','⚂','⚃','⚄','⚅'];mid.innerHTML=dice.map(d=>`<div class="nd-die">${d}</div>`).join('')+`<span style="margin-left:20px;font-size:12px;opacity:.85">Выброшено: ⚪ ${off.w}/15 · ⚫ ${off.b}/15</span>`+(tg.some(t=>t.to==='off')?'<button class="btn primary" data-off style="margin-left:10px">Выбросить</button>':'');
  if(!busy)msg.textContent=turn==='w'?'Ваш ход (белые): выберите фишку, затем пункт':'Ходит компьютер…';$('.sc',root).textContent=`Победы: вы ${wins.w} — ${wins.b} ПК`;}
 root.addEventListener('click',e=>{if(e.target.closest('[data-a=new]')){busy=false;return reset();}if(turn!=='w'||busy)return;
  if(e.target.closest('[data-off]')){const t=targets('w',sel).filter(t=>t.to==='off').sort((a,b)=>a.d-b.d)[0];if(t){if(doMove('w',sel,t))return;sel=null;afterMove();}return;}
  const p=e.target.closest('.nd-pt');if(!p)return;const i=+p.dataset.i;
  if(sel!=null){const t=targets('w',sel).filter(t=>t.to===i).sort((a,b)=>a.d-b.d)[0];if(t){const from=sel;sel=null;if(doMove('w',from,t))return;afterMove();return;}}
  const q=B[i];if(q&&q.c==='w'&&targets('w',i).length){sel=i;Sound.click();}else sel=null;render();});
 reset();return win;}});
alias('nardy','nardy','нарды','backgammon');

/* ============================ 2048 ============================ */
addCSS(`.g48{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:#faf8ef;color:#776e65;font-family:Arial,sans-serif}
.g48 .hd{display:flex;gap:10px;align-items:center}.g48 .bx{background:#bbada0;color:#fff;border-radius:6px;padding:4px 14px;text-align:center;font-size:12px}.g48 .bx b{display:block;font-size:18px}
.g48 .gr{display:grid;grid-template-columns:repeat(4,72px);grid-auto-rows:72px;gap:10px;padding:10px;background:#bbada0;border-radius:8px}
.g48 .t{border-radius:5px;display:grid;place-items:center;font-weight:700;font-size:26px;background:rgba(238,228,218,.35);transition:transform .1s}.g48 .t.pop{animation:p48 .15s}
@keyframes p48{50%{transform:scale(1.12)}}`);
const C48={2:['#eee4da','#776e65'],4:['#ede0c8','#776e65'],8:['#f2b179','#fff'],16:['#f59563','#fff'],32:['#f67c5f','#fff'],64:['#f65e3b','#fff'],128:['#edcf72','#fff'],256:['#edcc61','#fff'],512:['#edc850','#fff'],1024:['#edc53f','#fff'],2048:['#edc22e','#fff']};
storeApp('g2048',{cat:'game',dev:'Gabriele Cirulli',rating:4.7,size:'1 МБ',desc:'Складывай плитки стрелками и доберись до 2048.'},{name:'2048',icon:AI.g2048,keywords:'2048 головоломка игра',launch(){
 const root=el(`<div class="g48" tabindex="0"><div class="hd"><span style="font-size:40px;font-weight:700">2048</span><div class="bx">СЧЁТ<b class="s">0</b></div><div class="bx">ЛУЧШИЙ<b class="b">0</b></div><button class="btn">Заново</button></div><div class="gr"></div><small>Стрелки или WASD</small></div>`);
 const win=WM.create({app:'g2048',title:'2048',icon:AI.g2048(),width:440,height:520,content:root,onFocus:()=>root.focus()});let g,score,best=LS.get('best2048',0);
 const add=()=>{const e=[];g.forEach((v,i)=>!v&&e.push(i));if(e.length)g[e[Math.random()*e.length|0]]=Math.random()<.9?2:4;};
 function reset(){g=Array(16).fill(0);score=0;add();add();draw();}
 function draw(np=-1){$('.gr',root).innerHTML=g.map((v,i)=>{const c=C48[v]||['#3c3a32','#fff'];return `<div class="t${i===np?' pop':''}" style="${v?`background:${c[0]};color:${c[1]};font-size:${v>=1024?20:v>=128?24:28}px`:''}">${v||''}</div>`}).join('');$('.s',root).textContent=score;if(score>best){best=score;LS.set('best2048',best);}$('.b',root).textContent=best;}
 function slide(dir){let moved=false;for(let a=0;a<4;a++){const ids=[0,1,2,3].map(b=>dir==='l'?a*4+b:dir==='r'?a*4+3-b:dir==='u'?b*4+a:(3-b)*4+a);let line=ids.map(i=>g[i]).filter(Boolean);for(let i=0;i<line.length-1;i++)if(line[i]===line[i+1]){line[i]*=2;score+=line[i];line.splice(i+1,1);if(line[i]===2048)Shell.notify({title:'2048',body:'🎉 Вы собрали 2048!',icon:AI.g2048()});}
   while(line.length<4)line.push(0);ids.forEach((i,k)=>{if(g[i]!==line[k])moved=true;g[i]=line[k];});}
  if(moved){add();Sound.click();draw();if(!g.includes(0)&&![0,1,2,3].some(r=>[0,1,2].some(c=>g[r*4+c]===g[r*4+c+1]||g[c*4+r]===g[(c+1)*4+r])))setTimeout(()=>Shell.notify({title:'2048',body:'Игра окончена. Счёт: '+score,icon:AI.g2048()}),200);}}
 root.addEventListener('keydown',e=>{const m={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d',KeyA:'l',KeyD:'r',KeyW:'u',KeyS:'d'}[e.code];if(m){e.preventDefault();slide(m);}});
 let ts=null;root.addEventListener('pointerdown',e=>ts=[e.clientX,e.clientY]);root.addEventListener('pointerup',e=>{if(!ts)return;const dx=e.clientX-ts[0],dy=e.clientY-ts[1];ts=null;if(Math.max(Math.abs(dx),Math.abs(dy))<30)return;slide(Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u'));});
 $('.btn',root).onclick=reset;reset();setTimeout(()=>root.focus(),50);return win;}});
alias('g2048','2048');

/* ============================ ЗМЕЙКА ============================ */
storeApp('snake',{cat:'game',dev:'Windows11WEB Games',rating:4.4,size:'1 МБ',desc:'Классическая змейка: ешь яблоки, расти и не врежься в себя.'},{name:'Змейка',icon:AI.snake,keywords:'snake змейка игра',launch(){
 const root=el('<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0e1a12;color:#c5e1a5;gap:8px" tabindex="0"><div class="inf" style="font:600 14px var(--mono)"></div><canvas width="400" height="400" style="background:#132a1a;border-radius:8px"></canvas><small>Стрелки — управление, Пробел — пауза/старт</small></div>');
 const win=WM.create({app:'snake',title:'Змейка',icon:AI.snake(),width:460,height:520,content:root,onFocus:()=>root.focus()});
 const cv=$('canvas',root),x=cv.getContext('2d'),N=20,S=20;let sn,dir,nd,food,tm,run=false,score,best=LS.get('bestSnake',0);
 function reset(){sn=[[10,10],[9,10],[8,10]];dir=[1,0];nd=[1,0];score=0;place();draw();info('Нажмите Пробел');}
 const place=()=>{do food=[Math.random()*N|0,Math.random()*N|0];while(sn.some(s=>s[0]===food[0]&&s[1]===food[1]));};
 const info=t=>$('.inf',root).textContent=`Счёт ${score} · Рекорд ${best}${t?' · '+t:''}`;
 function step(){dir=nd;const h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||sn.some(s=>s[0]===h[0]&&s[1]===h[1])){run=false;clearTimeout(tm);Sound.error();if(score>best){best=score;LS.set('bestSnake',best);}info('Конец игры — Пробел');sn.dead=1;draw();return;}
  sn.unshift(h);if(h[0]===food[0]&&h[1]===food[1]){score++;Sound.pop();place();}else sn.pop();draw();info();tm=setTimeout(step,Math.max(55,130-score*3));}
 function draw(){x.clearRect(0,0,400,400);x.fillStyle='#e53935';x.beginPath();x.arc(food[0]*S+10,food[1]*S+10,8,0,7);x.fill();sn.forEach((s,i)=>{x.fillStyle=sn.dead?'#777':i?'#66bb6a':'#a5d6a7';x.beginPath();x.roundRect(s[0]*S+1,s[1]*S+1,S-2,S-2,5);x.fill();});}
 root.addEventListener('keydown',e=>{const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],KeyW:[0,-1],KeyS:[0,1],KeyA:[-1,0],KeyD:[1,0]}[e.code];if(m){e.preventDefault();if(m[0]!==-dir[0]||m[1]!==-dir[1])nd=m;}
  if(e.code==='Space'){e.preventDefault();if(sn.dead)reset();if(run){run=false;clearTimeout(tm);info('Пауза');}else{run=true;step();}}});
 win.onClose=()=>clearTimeout(tm);reset();setTimeout(()=>root.focus(),50);return win;}});
alias('snake','snake','змейка');

/* ============================ ТЕТРИС ============================ */
storeApp('tetris',{cat:'game',dev:'Windows11WEB Games',rating:4.8,size:'2 МБ',desc:'Легендарная головоломка: уровни, следующая фигура, жёсткий сброс.'},{name:'Тетрис',icon:AI.tetris,keywords:'tetris тетрис игра',launch(){
 const root=el('<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:18px;background:#10132a;color:#cfd8ff" tabindex="0"><canvas width="260" height="520" style="background:#0a0c1e;border-radius:6px;box-shadow:0 0 0 2px #2a3070"></canvas><div style="display:flex;flex-direction:column;gap:12px;font:600 14px var(--mono)"><div>СЛЕДУЮЩАЯ</div><canvas class="nx" width="100" height="80"></canvas><div class="inf"></div><small style="font-weight:400;line-height:1.7;opacity:.8">← → двигать<br>↑ поворот<br>↓ быстрее<br>Пробел — сброс<br>P — пауза</small></div></div>');
 const win=WM.create({app:'tetris',title:'Тетрис',icon:AI.tetris(),width:470,height:600,content:root,onFocus:()=>root.focus()});
 const cv=$('canvas',root),x=cv.getContext('2d'),nx=$('.nx',root).getContext('2d');const W=10,H=20,S=26;
 const P=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[1,1,0],[0,1,1]],[[0,1,1],[1,1,0]]],COL=['#00e5ff','#ffea00','#d500f9','#2979ff','#ff9100','#ff1744','#00e676'];
 let g,cur,next,px,py,score,lines,lvl,tm,over,paused;const best=()=>LS.get('bestTetris',0);
 const rot=m=>m[0].map((_,i)=>m.map(r=>r[i]).reverse());
 const newP=()=>{const k=Math.random()*7|0;return {m:P[k],c:k+1};};
 const fits=(m,ox,oy)=>m.every((r,y)=>r.every((v,xx)=>!v||(ox+xx>=0&&ox+xx<W&&oy+y<H&&(oy+y<0||!g[oy+y][ox+xx]))));
 function spawn(){cur=next||newP();next=newP();px=(W-cur.m[0].length)/2|0;py=-1;if(!fits(cur.m,px,py+1)){over=true;Sound.error();if(score>best())LS.set('bestTetris',score);}}
 function reset(){g=Array.from({length:H},()=>Array(W).fill(0));score=0;lines=0;lvl=1;over=false;paused=false;next=null;spawn();loop();}
 function lock(){cur.m.forEach((r,y)=>r.forEach((v,xx)=>{if(v&&py+y>=0)g[py+y][px+xx]=cur.c;}));let c=0;g=g.filter(r=>r.some(v=>!v));while(g.length<H){g.unshift(Array(W).fill(0));c++;}
  if(c){lines+=c;score+=[0,100,300,500,800][c]*lvl;lvl=1+(lines/10|0);Sound.win();}else Sound.click();spawn();}
 function drop(){if(fits(cur.m,px,py+1))py++;else lock();}
 function loop(){clearTimeout(tm);if(over||paused){draw();return;}drop();draw();tm=setTimeout(loop,Math.max(80,600-lvl*50));}
 function cell(c,X,Y,col,s=S){c.fillStyle=col;c.fillRect(X*s+1,Y*s+1,s-2,s-2);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(X*s+1,Y*s+1,s-2,4);}
 function draw(){x.clearRect(0,0,260,520);g.forEach((r,y)=>r.forEach((v,xx)=>v&&cell(x,xx,y,COL[v-1])));
  let gy=py;while(fits(cur.m,px,gy+1))gy++;cur.m.forEach((r,y)=>r.forEach((v,xx)=>{if(v&&gy+y>=0){x.strokeStyle='rgba(255,255,255,.25)';x.strokeRect((px+xx)*S+2,(gy+y)*S+2,S-4,S-4);}}));
  cur.m.forEach((r,y)=>r.forEach((v,xx)=>v&&py+y>=0&&cell(x,px+xx,py+y,COL[cur.c-1])));nx.clearRect(0,0,100,80);next.m.forEach((r,y)=>r.forEach((v,xx)=>v&&cell(nx,xx+.5,y+.5,COL[next.c-1],20)));
  $('.inf',root).innerHTML=`Счёт: ${score}<br>Линии: ${lines}<br>Уровень: ${lvl}<br>Рекорд: ${best()}`;if(over||paused){x.fillStyle='rgba(0,0,0,.6)';x.fillRect(0,200,260,100);x.fillStyle='#fff';x.font='bold 22px sans-serif';x.textAlign='center';x.fillText(over?'ИГРА ОКОНЧЕНА':'ПАУЗА',130,245);x.font='14px sans-serif';x.fillText(over?'Enter — заново':'P — продолжить',130,275);}}
 root.addEventListener('keydown',e=>{if(over){if(e.key==='Enter')reset();return;}const k=e.code;if(k==='KeyP'){paused=!paused;loop();return;}if(paused)return;
  if(k==='ArrowLeft'&&fits(cur.m,px-1,py))px--;else if(k==='ArrowRight'&&fits(cur.m,px+1,py))px++;else if(k==='ArrowDown'){drop();score++;}
  else if(k==='ArrowUp'){const r=rot(cur.m);for(const o of [0,-1,1,-2,2])if(fits(r,px+o,py)){cur.m=r;px+=o;break;}}else if(k==='Space'){while(fits(cur.m,px,py+1)){py++;score+=2;}lock();}else return;e.preventDefault();draw();});
 win.onClose=()=>clearTimeout(tm);reset();setTimeout(()=>root.focus(),50);return win;}});
alias('tetris','tetris','тетрис');
