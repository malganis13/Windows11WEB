
/* ============================ v2.0: INSTALLER, STORE, THEMES, TERMINAL EXT ============================ */
const addCSS=s=>{const st=document.createElement('style');st.textContent=s;document.head.appendChild(st);};
const svgI=(inner,vb=48)=>`<svg viewBox="0 0 ${vb} ${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
let _gid=0;
const tile=(c1,c2,glyph,fg='#fff',fs=20,extra='')=>{const id='tg'+(_gid++);return ()=>svgI(`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="3" y="3" width="42" height="42" rx="10" fill="url(#${id})"/>${extra}<text x="24" y="${(24+fs*.36).toFixed(1)}" font-size="${fs}" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="700" fill="${fg}">${glyph}</text>`);};
Object.assign(AI,{
 edge:()=>svgI(`<defs><linearGradient id="edA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#35c1f1"/><stop offset=".6" stop-color="#1b8fdc"/><stop offset="1" stop-color="#0c59a4"/></linearGradient><linearGradient id="edB" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2dc06b"/><stop offset="1" stop-color="#86e04b"/></linearGradient></defs><circle cx="24" cy="24" r="20" fill="url(#edA)"/><path d="M8 30c3 9 15 14 25 9-7 1-14-3-14-10 0-5 4-8 9-8 6 0 9 4 8 9h10C46 17 37 6 24 6 14 6 7 14 8 30z" fill="url(#edB)" opacity=".95"/><path d="M19 29c0-5 4-8 9-8" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5"/>`),
 chrome:()=>svgI(`<circle cx="24" cy="24" r="20" fill="#db4437"/><path d="M24 24 L41.3 14 A20 20 0 0 1 24 44Z" fill="#ffcd40"/><path d="M24 24 L24 44 A20 20 0 0 1 6.7 14Z" fill="#0f9d58"/><path d="M24 24 L6.7 14 A20 20 0 0 1 41.3 14Z" fill="#db4437"/><circle cx="24" cy="24" r="9" fill="#fff"/><circle cx="24" cy="24" r="7" fill="#4285f4"/>`),
 firefox:()=>svgI(`<defs><radialGradient id="ffA" cx=".3" cy=".2" r=".9"><stop offset="0" stop-color="#fff44f"/><stop offset=".4" stop-color="#ff980e"/><stop offset=".8" stop-color="#ff3647"/><stop offset="1" stop-color="#e31587"/></radialGradient></defs><circle cx="24" cy="24" r="20" fill="#5b2fd0"/><circle cx="24" cy="26" r="11" fill="#2a1b6b"/><path d="M6 22C7 11 15 4 25 4c-3 2-4 5-3 7 6-3 15 1 18 8 4 10-3 25-17 25C12 44 4 34 6 22z" fill="url(#ffA)"/><circle cx="25" cy="26" r="9" fill="#5b2fd0" opacity=".85"/>`),
 ddg:()=>svgI(`<circle cx="24" cy="24" r="20" fill="#de5833"/><circle cx="24" cy="24" r="15" fill="#fff"/><ellipse cx="24" cy="30" rx="8" ry="9" fill="#de5833" opacity=".18"/><circle cx="20" cy="20" r="2.2" fill="#2d4f8e"/><circle cx="28" cy="20" r="2.2" fill="#2d4f8e"/><path d="M18 27q6 4 12 0l-1 3q-5 3-10 0z" fill="#fdd20a"/><path d="M22 31l2 9 2-9z" fill="#65bc46"/>`),
 tor:()=>svgI(`<circle cx="24" cy="24" r="20" fill="#59316b"/><circle cx="24" cy="26" r="13" fill="none" stroke="#fff" stroke-width="2"/><circle cx="24" cy="26" r="8.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="24" cy="26" r="4" fill="#fff"/><path d="M24 13c0-4 3-6 5-7" stroke="#7ed321" stroke-width="2.4" fill="none"/>`),
 brave:()=>svgI(`<defs><linearGradient id="brA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a2b"/><stop offset="1" stop-color="#fb3c00"/></linearGradient></defs><path d="M14 6h20l4 5 4 2-2 8-6 16-10 6-10-6L8 21l-2-8 4-2z" fill="url(#brA)"/><path d="M17 18l7 3 7-3-2 8-5 4-5-4z" fill="#fff"/><path d="M21 32h6l-3 3z" fill="#fff"/>`),
 store:()=>svgI(`<path d="M10 16h28l-2 26H12z" fill="#1a73d6"/><path d="M17 16v-4a7 7 0 0 1 14 0v4" fill="none" stroke="#1a73d6" stroke-width="3"/><rect x="17" y="22" width="6.5" height="6.5" fill="#f35325"/><rect x="24.5" y="22" width="6.5" height="6.5" fill="#81bc06"/><rect x="17" y="29.5" width="6.5" height="6.5" fill="#05a6f0"/><rect x="24.5" y="29.5" width="6.5" height="6.5" fill="#ffba08"/>`),
 vscode:()=>svgI(`<path d="M34 4l9 4.5v31L34 44 14 26l-8 6-3-2V18l3-2 8 6z" fill="#0065a9"/><path d="M34 4l9 4.5v31L34 44V4z" fill="#1f9cf0"/><path d="M34 14v20l-12-10z" fill="#0065a9"/>`),
 vs:()=>svgI(`<path d="M34 4l9 4.5v31L34 44 14 26l-8 6-3-2V18l3-2 8 6z" fill="#5c2d91"/><path d="M34 4l9 4.5v31L34 44z" fill="#a074c4"/><path d="M34 14v20l-12-10z" fill="#5c2d91"/>`),
 sublime:tile('#4b4b4b','#2b2b2b','S','#ff9800',24),
 npp:tile('#8bc34a','#2e7d32','N++','#fff',14),
 vim:tile('#1b5e20','#0b3010','vim','#a5d6a7',14),
 wordpad:tile('#2b7cd3','#185abd','W','#fff',22),
 paint3d:()=>svgI(`<defs><linearGradient id="p3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4fa3"/><stop offset=".5" stop-color="#7b5cff"/><stop offset="1" stop-color="#22c4ff"/></linearGradient></defs><path d="M24 4l18 10v20L24 44 6 34V14z" fill="url(#p3)"/><path d="M24 4l18 10-18 10L6 14z" fill="#fff" opacity=".3"/><path d="M24 24v20" stroke="#fff" stroke-opacity=".4"/>`),
 blender:()=>svgI(`<circle cx="27" cy="27" r="14" fill="#e87d0d"/><circle cx="27" cy="27" r="9" fill="#fff"/><circle cx="27" cy="27" r="5" fill="#265787"/><path d="M4 22l14-10h6L10 22z" fill="#e87d0d"/><path d="M8 30l8-6" stroke="#e87d0d" stroke-width="4" stroke-linecap="round"/>`),
 fl:()=>svgI(`<circle cx="24" cy="27" r="16" fill="#ff8f1f"/><circle cx="18" cy="22" r="5" fill="#ffb35c"/><path d="M24 11c-2-5 1-8 6-8-1 4-3 7-6 8z" fill="#5fb341"/><path d="M15 30q9 7 18 0" stroke="#c45f00" stroke-width="2" fill="none"/>`),
 photo:tile('#00b4db','#0083b0','Ps','#e3f6ff',18),
 spider:()=>svgI(`<rect x="8" y="5" width="26" height="36" rx="4" fill="#fff" stroke="#999"/><rect x="14" y="8" width="26" height="36" rx="4" fill="#fff" stroke="#888"/><path d="M27 15c-6 6-9 9-9 13a4 4 0 0 0 8 1l-2 6h6l-2-6a4 4 0 0 0 8-1c0-4-3-7-9-13z" fill="#222"/>`),
 nardy:()=>svgI(`<rect x="4" y="6" width="40" height="36" rx="4" fill="#8d5524"/><rect x="7" y="9" width="16" height="30" fill="#e8c591"/><rect x="25" y="9" width="16" height="30" fill="#e8c591"/>${[0,1,2].map(i=>`<path d="M${8+i*5} 9l2.5 11 2.5-11z" fill="${i%2?'#a33':'#333'}"/><path d="M${26+i*5} 39l2.5-11 2.5 11z" fill="${i%2?'#333':'#a33'}"/>`).join('')}<circle cx="15" cy="33" r="3" fill="#fff"/><circle cx="33" cy="15" r="3" fill="#222"/>`),
 farm:()=>svgI(`<rect x="3" y="3" width="42" height="42" rx="10" fill="#7cc242"/><rect x="3" y="3" width="42" height="16" rx="10" fill="#7fd3ff"/><ellipse cx="24" cy="30" rx="10" ry="9" fill="#fff"/><circle cx="30" cy="22" r="5" fill="#fff"/><path d="M29 16l2-3 2 3z" fill="#e53935"/><path d="M35 22l4 1-4 1z" fill="#ffb300"/><circle cx="31" cy="21" r="1" fill="#000"/>`),
 pony:()=>svgI(`<defs><linearGradient id="pkA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1530"/><stop offset="1" stop-color="#3b2a6b"/></linearGradient></defs><rect x="3" y="3" width="42" height="42" rx="10" fill="url(#pkA)"/><path d="M14 38c0-10 4-18 12-20l4-8 2 7c5 2 8 7 7 13l-5-1-2 9z" fill="#e9e4ff"/><path d="M26 18c-6-4-12 0-13 8 4-3 7-4 10-3z" fill="#ff5fa2"/><path d="M31 10l6-7-2 9z" fill="#ffd84a"/><circle cx="32" cy="22" r="1.6" fill="#1d1530"/>`),
 g2048:tile('#edc22e','#f59563','2048','#fff',13),
 snake:tile('#2e7d32','#1b5e20','~','#c5e1a5',30),
 tetris:()=>svgI(`<rect x="3" y="3" width="42" height="42" rx="10" fill="#1b1f3b"/><rect x="10" y="26" width="9" height="9" fill="#00e5ff"/><rect x="19" y="26" width="9" height="9" fill="#00e5ff"/><rect x="28" y="26" width="9" height="9" fill="#ffea00"/><rect x="19" y="17" width="9" height="9" fill="#d500f9"/><rect x="28" y="17" width="9" height="9" fill="#ffea00"/><rect x="28" y="8" width="9" height="9" fill="#ff3d00"/>`),
 clock:tile('#3a3a3a','#1f1f1f','⏱','#4cc2ff',22),
});

/* ---------- install system ---------- */
const Installed={set:new Set(LS.get('installed',[])),has(id){return this.set.has(id)},
 add(id){this.set.add(id);LS.set('installed',[...this.set]);Bus.emit('installed',id);},
 remove(id){this.set.delete(id);LS.set('installed',[...this.set]);WM.byApp(id).forEach(w=>{w.onClose=null;WM.close(w)});Bus.emit('installed',id);}};
Apps.list=function(){return Object.values(this.reg).filter(a=>!a.hidden&&(!a.store||Installed.has(a.id)));};
const _appsLaunch=Apps.launch.bind(Apps);
Apps.launch=function(id,opts={}){const a=this.reg[id];if(a&&a.store&&!Installed.has(id)){Sound.error();Shell.notify({title:a.name,body:'Приложение не установлено. Открываю Microsoft Store…',icon:a.icon()});return _appsLaunch('store',{focus:id});}return _appsLaunch(id,opts);};
Apps.pinned=['explorer','edge','store','terminal','notepad','paint','calc','taskmgr','settings'];
Bus.on('installed',()=>{Shell.renderTaskbar();});

// catalog: id -> store meta
const CATALOG=[];
const storeApp=(id,meta,def)=>{CATALOG.push(Object.assign({id},meta));Apps.register(id,Object.assign({store:true},def));};
const CAT_NAMES={browser:'Браузеры',dev:'Разработка',creative:'Творчество',game:'Игры',util:'Утилиты'};
window.APP_ALIAS={};window.CP_APPS=[];
const alias=(id,...names)=>{names.forEach(n=>APP_ALIAS[n]=id);CP_APPS.push([names,id]);};

/* ---------- MICROSOFT STORE ---------- */
addCSS(`
.mst{display:flex;flex:1;min-height:0;background:var(--mica)}
.mst-nav{width:72px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 0;border-right:1px solid var(--border)}
.mst-nav button{width:60px;padding:8px 0;border-radius:6px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:var(--text-2)}
.mst-nav button:hover{background:var(--hover)}.mst-nav button.on{background:var(--surface-2);color:var(--text)}
.mst-nav button .ic{width:20px;height:20px}
.mst-main{flex:1;overflow:auto;padding:0 28px 30px}
.mst-top{position:sticky;top:0;z-index:2;display:flex;justify-content:center;padding:12px 0;background:linear-gradient(var(--mica-solid) 70%,transparent)}
.mst-top input{width:min(480px,90%);border-radius:18px}
.mst-hero{height:200px;border-radius:12px;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;margin-bottom:22px;background:linear-gradient(120deg,#3a0ca3,#7209b7 40%,#f72585);position:relative;overflow:hidden}
.mst-hero h1{font-size:30px;font-weight:600}.mst-hero p{opacity:.85;margin:4px 0 12px}
.mst-hero .ic{position:absolute;right:40px;top:30px;width:140px;height:140px;filter:drop-shadow(0 10px 30px rgba(0,0,0,.4))}
.mst h2{font-size:18px;font-weight:600;margin:18px 0 10px}
.mst-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.mst-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:8px;transition:.15s}
.mst-card:hover{background:var(--hover);transform:translateY(-2px)}
.mst-card .ic{width:56px;height:56px}.mst-card b{font-weight:600}.mst-card small{color:var(--text-2);font-size:12px}
.mst-card .row{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.mst-stars{color:#ffb900;font-size:12px}
.mst-det{display:flex;gap:26px;padding:20px 0}.mst-det>.ic{width:120px;height:120px;flex:none}
.mst-det h1{font-size:28px;font-weight:600}.mst-det .acts{display:flex;gap:8px;margin:14px 0}
.mst-prog{height:4px;border-radius:2px;background:var(--surface-2);overflow:hidden;width:220px;margin-top:10px}.mst-prog i{display:block;height:100%;width:0;background:var(--accent-use);transition:width .2s}
.mst-feat{margin:6px 0 0 18px;color:var(--text-2);line-height:1.8}
`);
Apps.register('store',{name:'Microsoft Store',icon:AI.store,single:true,keywords:'store магазин приложений установить winget',
 onReopen(win,o){o&&o.focus&&win._show&&win._show(o.focus);},
 launch(o){
 const root=el(`<div class="mst"><div class="mst-nav"></div><div class="mst-main"></div></div>`);
 const win=WM.create({app:'store',title:'Microsoft Store',icon:AI.store(),width:1060,height:680,content:root,minW:640,minH:420});
 const nav=$('.mst-nav',root),main=$('.mst-main',root);let page='home',q='';const busy={};
 const NAV=[['home','Главная',I.apps],['browser','Браузеры',I.search],['dev','Разработка',I.term],['creative','Творчество',I.brush],['game','Игры',I.flag],['lib','Библиотека',I.download]];
 nav.innerHTML=NAV.map(([k,l,ic])=>`<button data-k="${k}"><span class="ic">${ic}</span>${l}</button>`).join('');
 nav.onclick=e=>{const b=e.target.closest('button');if(!b)return;Sound.click();page=b.dataset.k;q='';render();};
 const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
 const btn=m=>busy[m.id]!=null?`<button class="btn" disabled>${busy[m.id]}%</button>`:Installed.has(m.id)?`<button class="btn" data-open="${m.id}">Открыть</button>`:`<button class="btn primary" data-inst="${m.id}">${m.price||'Получить'}</button>`;
 const card=m=>{const a=Apps.get(m.id);return `<div class="mst-card" data-det="${m.id}"><span class="ic">${a.icon()}</span><b>${esc(a.name)}</b><small>${CAT_NAMES[m.cat]} · ${esc(m.dev)}</small><span class="mst-stars">${stars(m.rating)} <span class="muted">${m.rating.toFixed(1)}</span></span><div class="row"><small>${m.size}</small>${btn(m)}</div></div>`;};
 function render(){$$('button',nav).forEach(b=>b.classList.toggle('on',b.dataset.k===page));
  const top=`<div class="mst-top"><input class="inp mst-q" placeholder="Поиск приложений, игр и не только" value="${esc(q)}"></div>`;let h='';
  if(q){const L=CATALOG.filter(m=>(Apps.get(m.id).name+' '+m.desc+' '+m.dev+' '+m.id).toLowerCase().includes(q.toLowerCase()));h=`<h2>Результаты: «${esc(q)}»</h2>`+(L.length?`<div class="mst-grid">${L.map(card).join('')}</div>`:'<p class="muted">Ничего не найдено.</p>');}
  else if(page==='home'){const hero=CATALOG.find(m=>m.id==='ponyknight');h=`<div class="mst-hero" data-det="ponyknight"><span class="ic">${AI.pony()}</span><small>ЭКСКЛЮЗИВ</small><h1>Pony Knight</h1><p>Метроидвания о храброй пони-рыцаре. Боссы, прокачка, секреты.</p><div>${btn(hero)}</div></div>`+Object.keys(CAT_NAMES).map(c=>{const L=CATALOG.filter(m=>m.cat===c);return L.length?`<h2>${CAT_NAMES[c]}</h2><div class="mst-grid">${L.map(card).join('')}</div>`:''}).join('');}
  else if(page==='lib'){const L=CATALOG.filter(m=>Installed.has(m.id));h=`<h2>Библиотека</h2>`+(L.length?`<div class="mst-grid">${L.map(card).join('')}</div>`:'<p class="muted">Вы ещё ничего не установили.</p>');}
  else if(page.startsWith('det:')){const m=CATALOG.find(x=>x.id===page.slice(4)),a=Apps.get(m.id);h=`<button class="btn" data-back style="margin-top:6px"><span class="ico">${I.back}</span>Назад</button><div class="mst-det"><span class="ic">${a.icon()}</span><div><h1>${esc(a.name)}</h1><div class="muted">${esc(m.dev)} · ${CAT_NAMES[m.cat]}</div><div class="mst-stars" style="margin-top:6px">${stars(m.rating)} ${m.rating.toFixed(1)} · <span class="muted">${m.size}</span></div><div class="acts">${btn(m)}${Installed.has(m.id)?`<button class="btn" data-rm="${m.id}">Удалить</button>`:''}</div>${busy[m.id]!=null?`<div class="mst-prog"><i style="width:${busy[m.id]}%"></i></div>`:''}<p style="max-width:640px;line-height:1.6;margin-top:6px">${esc(m.desc)}</p>${m.feat?`<ul class="mst-feat">${m.feat.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`:''}</div></div>`;}
  else{const L=CATALOG.filter(m=>m.cat===page);h=`<h2>${CAT_NAMES[page]}</h2><div class="mst-grid">${L.map(card).join('')}</div>`;}
  const st=main.scrollTop;main.innerHTML=top+h;main.scrollTop=st;const inp=$('.mst-q',main);inp.oninput=()=>{q=inp.value;const pos=inp.selectionStart;render();const i2=$('.mst-q',main);i2.focus();i2.setSelectionRange(pos,pos);};}
 function install(id){if(busy[id]!=null)return;busy[id]=0;render();const t=setInterval(()=>{busy[id]=Math.min(100,busy[id]+8+Math.random()*14|0);if(!win.el.isConnected){clearInterval(t);busy[id]=100;}
   if(busy[id]>=100){clearInterval(t);delete busy[id];STORE_INSTALL(id);}if(win.el.isConnected)render();},180);}
 main.addEventListener('click',e=>{const i=e.target.closest('[data-inst]'),op=e.target.closest('[data-open]'),rm=e.target.closest('[data-rm]'),d=e.target.closest('[data-det]');
  if(i){e.stopPropagation();Sound.click();return install(i.dataset.inst);}if(op){e.stopPropagation();return Apps.launch(op.dataset.open);}
  if(rm){Shell.confirm('Удаление',`Удалить «${Apps.get(rm.dataset.rm).name}»?`).then(ok=>{if(ok){Installed.remove(rm.dataset.rm);render();}});return;}
  if(e.target.closest('[data-back]')){page='home';return render();}if(d){Sound.click();page='det:'+d.dataset.det;main.scrollTop=0;render();}});
 Bus.on('installed',()=>{if(win.el.isConnected)render();});
 win._show=id=>{page='det:'+id;render();};
 if(o&&o.focus&&CATALOG.find(m=>m.id===o.focus))page='det:'+o.focus;render();return win;}});
function STORE_INSTALL(id){const a=Apps.get(id);if(!a)return false;Installed.add(id);Sound.install();Shell.notify({title:'Microsoft Store',body:`«${a.name}» установлено. Найдите его в меню «Пуск».`,icon:a.icon()});return true;}
alias('store','store','магазин','ms-windows-store:');

/* ---------- THEMES (skins) ---------- */
addCSS(`
html[data-skin=cyberpunk]{--accent:#ff2bd6!important;--accent-2:#00f0ff!important;--accent-use:#00f0ff;--on-accent:#05000f;--text:#f6eaff;--text-2:rgba(246,234,255,.78);--text-3:rgba(246,234,255,.5);--mica:rgba(18,4,40,.9);--mica-solid:#12042a;--surface:rgba(255,43,214,.05);--surface-2:rgba(0,240,255,.09);--surface-solid:#1a0838;--card:rgba(255,43,214,.07);--hover:rgba(0,240,255,.13);--press:rgba(255,43,214,.1);--border:rgba(255,43,214,.3);--border-2:rgba(0,240,255,.45);--acrylic:rgba(22,4,48,.8);--taskbar:rgba(14,2,34,.84);--input:rgba(0,240,255,.06);--input-b:rgba(255,43,214,.5);--shadow:0 0 24px rgba(255,43,214,.35),0 8px 32px rgba(0,0,0,.6);--wshadow:0 0 0 1px rgba(0,240,255,.6),0 0 30px rgba(255,43,214,.45),0 18px 50px rgba(0,0,0,.6);--scroll:rgba(255,43,214,.55);--sel:rgba(0,240,255,.18)}
html[data-skin=cyberpunk] h1,html[data-skin=cyberpunk] h2{text-shadow:0 0 8px #ff2bd6,0 0 18px rgba(255,43,214,.6)}
html[data-skin=cyberpunk] .btn.primary{box-shadow:0 0 12px #00f0ff;text-shadow:none}
html[data-skin=cyberpunk] .win.active{box-shadow:0 0 0 1px #00f0ff,0 0 26px #ff2bd6,0 0 60px rgba(0,240,255,.25)}
html[data-skin=cyberpunk] .ic svg,html[data-skin=cyberpunk] .ico svg{filter:drop-shadow(0 0 3px rgba(0,240,255,.7))}
html[data-skin=hacker]{--font:Consolas,"Cascadia Mono","Courier New",monospace;--accent:#00ff66!important;--accent-2:#00ff66!important;--accent-use:#00ff66;--on-accent:#000;--text:#39ff7a;--text-2:rgba(57,255,122,.78);--text-3:rgba(57,255,122,.5);--mica:rgba(0,8,2,.95);--mica-solid:#000a03;--surface:rgba(0,255,102,.03);--surface-2:rgba(0,255,102,.08);--surface-solid:#001405;--card:rgba(0,255,102,.04);--hover:rgba(0,255,102,.12);--press:rgba(0,255,102,.06);--border:rgba(0,255,102,.25);--border-2:rgba(0,255,102,.45);--acrylic:rgba(0,10,3,.9);--taskbar:rgba(0,8,2,.92);--input:rgba(0,255,102,.04);--input-b:rgba(0,255,102,.4);--shadow:0 0 18px rgba(0,255,102,.2);--wshadow:0 0 0 1px rgba(0,255,102,.5),0 0 24px rgba(0,255,102,.22);--scroll:rgba(0,255,102,.5);--sel:rgba(0,255,102,.16)}
html[data-skin=hacker] body,html[data-skin=hacker] body *{font-family:var(--font)!important}
html[data-skin=hacker] #wlayer *,html[data-skin=hacker] .panel *,html[data-skin=hacker] #taskbar *,html[data-skin=hacker] #desktop *{color:var(--text)!important;border-color:rgba(0,255,102,.28)!important;text-shadow:0 0 4px rgba(0,255,102,.45)}
html[data-skin=hacker] svg,html[data-skin=hacker] img,html[data-skin=hacker] canvas,html[data-skin=hacker] iframe,html[data-skin=hacker] .card,html[data-skin=hacker] .sp-card{filter:grayscale(1) sepia(1) hue-rotate(68deg) saturate(5) brightness(.95)}
html[data-skin=hacker] .btn.primary{color:#000!important;text-shadow:none}
html[data-skin=hacker] #wlayer textarea,html[data-skin=hacker] #wlayer input{background:#000!important;caret-color:#00ff66}
#mrain{position:absolute;inset:0;width:100%;height:100%;opacity:.55;pointer-events:none}
`);
(function matrixWall(){let cv=null,raf=0,drops=[];const chars='アイウエオカキクケコサシスセソ01ABCDEF<>{}[]=+*#$';
 function start(){if(cv)return;cv=document.createElement('canvas');cv.id='mrain';$('#wall').appendChild(cv);const x=cv.getContext('2d');let last=0;
  const fit=()=>{cv.width=innerWidth;cv.height=innerHeight;drops=Array(Math.ceil(cv.width/16)).fill(0).map(()=>Math.random()*-50);};fit();addEventListener('resize',fit);
  const loop=t=>{raf=requestAnimationFrame(loop);if(t-last<55)return;last=t;x.fillStyle='rgba(0,0,0,.08)';x.fillRect(0,0,cv.width,cv.height);x.font='15px monospace';
   drops.forEach((d,i)=>{x.fillStyle=Math.random()<.04?'#d0ffd8':'#00ff66';x.fillText(chars[Math.random()*chars.length|0],i*16,d*16);drops[i]=d*16>cv.height&&Math.random()>.975?0:d+1;});};raf=requestAnimationFrame(loop);}
 function stop(){if(!cv)return;cancelAnimationFrame(raf);cv.remove();cv=null;}
 Bus.on('skin',t=>t==='hacker'?start():stop());})();

/* ---------- TERMINAL EXTENSIONS ---------- */
const RFS={root:null,path:[]};
window.TERM_HELP=`
Новое в 2.0:
  winget search|install|uninstall|list   магазин приложений из консоли
  theme <dark|light|cyberpunk|hacker>    сменить тему
  sysinfo, battery, netinfo, ip, geo     реальные данные твоего ПК
  mount                                  подключить настоящую папку ПК как R:
  rls, rcd, rcat, rimport, rexport       файлы настоящей папки
  upload, download <файл>               загрузить / скачать файл
  open <url>, search <запрос>           настоящий браузер
  clip <текст>, paste, notify <текст>, say <текст>, fullscreen`;
const rDir=async()=>{let d=RFS.root;for(const p of RFS.path)d=await d.getDirectoryHandle(p);return d;};
const rPath=()=>'R:\\'+RFS.path.join('\\');
const needMount=t=>{if(!RFS.root){t.print('Диск R: не подключён. Выполните mount.','#f9f1a5');return true;}return false;};
const pickFile=accept=>new Promise(res=>{const i=document.createElement('input');i.type='file';if(accept)i.accept=accept;i.onchange=()=>res(i.files[0]||null);i.click();});
const readAsData=(f,text)=>new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);text?fr.readAsText(f):fr.readAsDataURL(f);});
const IMGX=['png','jpg','jpeg','gif','bmp','webp'];
window.TERM_EXT={
 winget(t){const [sub,...rest]=t.args;const q=rest.join(' ').toLowerCase();const find=s=>CATALOG.find(m=>m.id===s||Apps.get(m.id).name.toLowerCase()===s||(Object.entries(APP_ALIAS).find(([k,v])=>k===s&&v===m.id)));
  const row=m=>`${Apps.get(m.id).name.padEnd(28).slice(0,28)} ${m.id.padEnd(14)} ${(Installed.has(m.id)?'установлено':m.size).padEnd(14)} ${CAT_NAMES[m.cat]}`;const head='Имя                         Id             Размер         Категория\n'+'-'.repeat(72);
  if(!sub||sub==='-?'||sub==='help')return t.print('Использование: winget search <слово> | install <id> | uninstall <id> | list');
  if(sub==='search'||sub==='find'){const L=CATALOG.filter(m=>!q||(m.id+' '+Apps.get(m.id).name+' '+m.desc).toLowerCase().includes(q));return t.print(L.length?head+'\n'+L.map(row).join('\n'):'Не найдено ни одного пакета, соответствующего критериям ввода.');}
  if(sub==='list'){const L=CATALOG.filter(m=>Installed.has(m.id));return t.print(L.length?head+'\n'+L.map(row).join('\n'):'Установленных пакетов из Store нет.');}
  const m=find(q);if(!m)return t.print(`Пакет «${q}» не найден. Попробуйте winget search.`,'#e74856');
  if(sub==='install'||sub==='add'){if(Installed.has(m.id))return t.print('Пакет уже установлен.');t.print(`Найдено ${Apps.get(m.id).name} [${m.id}]\nСкачивание ${m.size}`);const s=document.createElement('span');t.html('');const line=t.print('');
   return new Promise(res=>{let p=0;const bar=document.createElement('div');bar.style.color='#61d6d6';t.html('<span class="wg"></span>');const sp=[...document.querySelectorAll('.wg')].pop();const tm=setInterval(()=>{p=Math.min(100,p+7+Math.random()*12|0);sp.textContent='█'.repeat(p/4|0)+'░'.repeat(25-(p/4|0))+'  '+p+'%';if(p>=100){clearInterval(tm);STORE_INSTALL(m.id);t.print('Успешно установлено','#16c60c');res();}},120);});}
  if(sub==='uninstall'||sub==='remove'){if(!Installed.has(m.id))return t.print('Пакет не установлен.');Installed.remove(m.id);return t.print('Успешно удалено','#16c60c');}
  t.print('Неизвестная команда winget: '+sub,'#e74856');},
 theme(t){const v=(t.args[0]||'').toLowerCase();const M={dark:'dark','тёмная':'dark',light:'light','светлая':'light',cyberpunk:'cyberpunk',neon:'cyberpunk',hacker:'hacker',matrix:'hacker',programmer:'hacker'};if(!M[v])return t.print('theme dark | light | cyberpunk | hacker   (сейчас: '+Settings.get('theme')+')');Shell.setTheme(M[v]);t.print('Тема: '+M[v],'#16c60c');},
 async sysinfo(t){const n=navigator,ua=n.userAgent;const os=/Windows NT 10/.test(ua)?'Windows 10/11':/Mac OS X/.test(ua)?'macOS':/Android/.test(ua)?'Android':/iPhone|iPad/.test(ua)?'iOS':/Linux/.test(ua)?'Linux':'неизвестно';
  const br=/Edg\//.test(ua)?'Microsoft Edge':/OPR\//.test(ua)?'Opera':/YaBrowser/.test(ua)?'Яндекс Браузер':/Chrome\//.test(ua)?'Google Chrome':/Firefox\//.test(ua)?'Firefox':/Safari\//.test(ua)?'Safari':'?';
  let gpu='?';try{const g=document.createElement('canvas').getContext('webgl');const d=g.getExtension('WEBGL_debug_renderer_info');gpu=d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER);}catch(e){}
  t.print(`── РЕАЛЬНЫЙ КОМПЬЮТЕР ──
ОС:            ${os} (${n.platform||'?'})
Браузер:       ${br}
Процессор:     ${n.hardwareConcurrency||'?'} потоков
Память:        ${n.deviceMemory?'≈ '+n.deviceMemory+' ГБ (браузер округляет)':'скрыто браузером'}
Видеокарта:    ${gpu}
Экран:          ${screen.width}×${screen.height} @ ${devicePixelRatio}x, ${screen.colorDepth} бит
Язык:          ${n.language}
Часовой пояс:   ${Intl.DateTimeFormat().resolvedOptions().timeZone}
Сенсорный:     ${n.maxTouchPoints>0?'да':'нет'}
В сети:         ${n.onLine?'да':'нет'}`);},
 async battery(t){if(!navigator.getBattery)return t.print('Браузер не даёт доступ к батарее (работает в Chrome/Edge).','#f9f1a5');const b=await navigator.getBattery();t.print(`Батарея: ${Math.round(b.level*100)}% ${b.charging?'⚡ заряжается':'от батареи'}${!b.charging&&isFinite(b.dischargingTime)?', осталось ≈ '+Math.round(b.dischargingTime/60)+' мин':''}`);},
 netinfo(t){const c=navigator.connection;t.print(`Сеть: ${navigator.onLine?'подключено':'нет подключения'}${c?`\nТип: ${c.effectiveType}\nСкорость ≈ ${c.downlink} Мбит/с\nЗадержка ≈ ${c.rtt} мс`:''}`);},
 async ip(t){t.print('Запрос внешнего IP…');try{const r=await fetch('https://api.ipify.org?format=json');const j=await r.json();t.print('Ваш внешний IP: '+j.ip,'#16c60c');}catch(e){t.print('Не удалось (нет интернета или запрос заблокирован).','#e74856');}},
 geo(t){if(!navigator.geolocation)return t.print('Геолокация недоступна.');t.print('Запрашиваю разрешение…');return new Promise(r=>navigator.geolocation.getCurrentPosition(p=>{t.print(`Широта ${p.coords.latitude.toFixed(5)}, долгота ${p.coords.longitude.toFixed(5)} (±${Math.round(p.coords.accuracy)} м)`,'#16c60c');r();},e=>{t.print('Отказано: '+e.message,'#e74856');r();}));},
 async mount(t){if(!window.showDirectoryPicker)return t.print('Ваш браузер не поддерживает доступ к папкам. Откройте файл в Chrome или Edge.','#e74856');
  try{RFS.root=await showDirectoryPicker({mode:'readwrite'});RFS.path=[];t.print(`Папка «${RFS.root.name}» подключена как R:\\  — используйте rls, rcd, rcat, rimport, rexport`,'#16c60c');}catch(e){t.print('Отменено.','#f9f1a5');}},
 umount(t){RFS.root=null;RFS.path=[];t.print('R: отключён.');},
 async rls(t){if(needMount(t))return;const d=await rDir();const L=[];for await(const [n,h] of d.entries())L.push([n,h]);L.sort((a,b)=>(a[1].kind===b[1].kind?a[0].localeCompare(b[0]):a[1].kind==='directory'?-1:1));
  let out=`\n    Каталог: ${rPath()}\n\n`;for(const [n,h] of L){if(h.kind==='directory')out+=`d----        <DIR>          ${n}\n`;else{const f=await h.getFile();out+=`-a---  ${new Date(f.lastModified).toLocaleDateString('ru')}  ${fmtSize(f.size).padStart(10)}  ${n}\n`;}}t.print(out);},
 async rcd(t){if(needMount(t))return;const p=t.rest.trim();if(!p||p==='\\'||p==='/'){RFS.path=[];return t.print(rPath());}for(const x of p.split(/[\\/]/).filter(Boolean)){if(x==='..')RFS.path.pop();else{try{const d=await rDir();await d.getDirectoryHandle(x);RFS.path.push(x);}catch(e){return t.print('Папка не найдена: '+x,'#e74856');}}}t.print(rPath());},
 async rcat(t){if(needMount(t))return;try{const d=await rDir();const f=await (await d.getFileHandle(t.rest.trim())).getFile();if(f.size>200000)return t.print('Файл слишком большой для вывода ('+fmtSize(f.size)+').');t.print(await f.text());}catch(e){t.print('Файл не найден.','#e74856');}},
 async rimport(t){if(needMount(t))return;try{const name=t.rest.trim();const d=await rDir();const f=await (await d.getFileHandle(name)).getFile();if(f.size>3e6)return t.print('Слишком большой файл (лимит 3 МБ).','#e74856');const data=await readAsData(f,!IMGX.includes(VFS.ext(name)));const dst=t.cwd+'\\'+name;VFS.write(dst,data)?t.print('Скопировано в '+dst,'#16c60c'):t.print('Ошибка записи.','#e74856');}catch(e){t.print('Файл не найден.','#e74856');}},
 async rexport(t){if(needMount(t))return;const p=VFS.resolve(t.cwd,t.rest.trim());const c=VFS.read(p);if(c==null)return t.print('Файл не найден в ОС.','#e74856');
  const d=await rDir();const fh=await d.getFileHandle(VFS.basename(p),{create:true});const w=await fh.createWritable();if(/^data:/.test(c)){await w.write(await (await fetch(c)).blob());}else await w.write(c);await w.close();t.print(`Сохранено в ${rPath()}\\${VFS.basename(p)}`,'#16c60c');},
 'r:'(t){if(needMount(t))return;return TERM_EXT.rls(t);},
 async upload(t){const f=await pickFile();if(!f)return t.print('Отменено.');if(f.size>3e6)return t.print('Лимит 3 МБ.','#e74856');const data=await readAsData(f,!IMGX.includes(VFS.ext(f.name)));const dst=t.cwd+'\\'+f.name;VFS.write(dst,data)?t.print('Загружено: '+dst,'#16c60c'):t.print('Ошибка.','#e74856');},
 download(t){const p=VFS.resolve(t.cwd,t.rest.trim());const c=VFS.read(p);if(c==null)return t.print('Файл не найден.','#e74856');const a=document.createElement('a');a.href=/^data:/.test(c)?c:URL.createObjectURL(new Blob([c],{type:'text/plain'}));a.download=VFS.basename(p);a.click();t.print('Файл отправлен в «Загрузки» настоящего ПК.','#16c60c');},
 open(t){let u=t.rest.trim();if(!u)return t.print('open <адрес>');if(!/^https?:/i.test(u))u='https://'+u;window.open(u,'_blank','noopener');t.print('Открыто: '+u);},
 search(t){const q=t.rest.trim();if(!q)return t.print('search <запрос>');window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');t.print('Ищу «'+q+'»…');},
 async clip(t){try{await navigator.clipboard.writeText(t.rest);t.print('Скопировано в буфер обмена.','#16c60c');}catch(e){t.print('Нет доступа к буферу.','#e74856');}},
 async paste(t){try{t.print(await navigator.clipboard.readText()||'(буфер пуст)');}catch(e){t.print('Нет доступа к буферу.','#e74856');}},
 async notify(t){const txt=t.rest||'Привет из Windows11WEB!';if(!('Notification' in window))return t.print('Уведомления не поддерживаются.');const p=await Notification.requestPermission();if(p==='granted'){new Notification('Windows11WEB',{body:txt});t.print('Уведомление отправлено.','#16c60c');}else t.print('Разрешение не выдано.','#f9f1a5');},
 say(t){if(!window.speechSynthesis)return t.print('Синтез речи недоступен.');const u=new SpeechSynthesisUtterance(t.rest||'Привет');u.lang='ru-RU';speechSynthesis.speak(u);},
 fullscreen(t){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>t.print('Не удалось.','#e74856'));},
};
