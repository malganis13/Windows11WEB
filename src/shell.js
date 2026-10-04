
/* ============================ WALLPAPERS (pure SVG / CSS) ============================ */
function bloomSVG(dark){
 const bgA=dark?'#0b1e45':'#b9d3f3',bgB=dark?'#020814':'#eef5fd';let defs='',petals='';
 const cols=dark?[['#0b3fa8','#4fa3ff'],['#0a2f86','#2f7bf0'],['#123f9e','#7cc4ff'],['#082a73','#3d8cff']]:[['#1857d6','#9fd0ff'],['#0e4ac2','#6bb4ff'],['#2a6ae6','#cfe8ff'],['#0b3fb0','#82c2ff']];
 const N=14;for(let i=0;i<N;i++){const id='bp'+i,c=cols[i%4];defs+=`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c[0]}"/><stop offset=".75" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[1]}" stop-opacity=".2"/></linearGradient>`;
  const ang=-200+i*(250/N),len=430+((i*53)%5)*45,wid=70+((i*31)%4)*18;
  petals+=`<path d="M0 0C${len*.25} ${-wid},${len*.75} ${-wid*.95},${len} 0C${len*.75} ${wid*.95},${len*.25} ${wid},0 0Z" fill="url(#${id})" opacity="${(.55+((i*7)%4)*.12).toFixed(2)}" transform="rotate(${ang.toFixed(1)})"/>`;}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="bg" cx=".55" cy=".55" r=".8"><stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/></radialGradient>${defs}<filter id="bl"><feGaussianBlur stdDeviation="6"/></filter><filter id="glow"><feGaussianBlur stdDeviation="60"/></filter></defs><rect width="1920" height="1080" fill="url(#bg)"/><circle cx="1060" cy="600" r="260" fill="${dark?'#1f6fff':'#5aa8ff'}" opacity=".45" filter="url(#glow)"/><g transform="translate(1060 640)" filter="url(#bl)" opacity=".55">${petals}</g><g transform="translate(1060 640)" style="mix-blend-mode:screen">${petals}</g></svg>`;}
const svgUrl=s=>`url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}")`;
const WALLS={
 'bloom-dark':{name:'Bloom Dark',css:()=>svgUrl(bloomSVG(true))},
 'bloom-light':{name:'Bloom Light',css:()=>svgUrl(bloomSVG(false))},
 'cyberpunk':{name:'Cyberpunk',css:()=>svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12002b"/><stop offset=".55" stop-color="#6a0b7a"/><stop offset="1" stop-color="#ff2e88"/></linearGradient><linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe259"/><stop offset="1" stop-color="#ff2e88"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#s)"/><circle cx="960" cy="560" r="230" fill="url(#sun)"/>${[0,1,2,3,4,5].map(i=>`<rect x="700" y="${600+i*28}" width="520" height="${6+i*2}" fill="#6a0b7a"/>`).join('')}<rect y="700" width="1920" height="380" fill="#0d0221"/>${Array.from({length:25},(_,i)=>`<line x1="960" y1="700" x2="${-1500+i*205}" y2="1080" stroke="#ff2e88" stroke-width="2" opacity=".7"/>`).join('')}${[0,1,2,3,4,5,6,7].map(i=>`<line x1="0" x2="1920" y1="${700+Math.pow(i,1.9)*7.5}" y2="${700+Math.pow(i,1.9)*7.5}" stroke="#00f0ff" stroke-width="2" opacity=".6"/>`).join('')}<path d="M0 700L120 610 210 650 330 560 420 640 560 590 640 700z M1280 700l90-70 110 40 120-110 90 80 130-40 100 100z" fill="#2b0547"/></svg>`)},
 'abstract':{name:'Абстракция',css:()=>'radial-gradient(circle at 20% 25%,#ff9a8b 0,transparent 38%),radial-gradient(circle at 80% 30%,#7f7fd5 0,transparent 40%),radial-gradient(circle at 60% 85%,#43e97b 0,transparent 38%),radial-gradient(circle at 30% 80%,#fbc2eb 0,transparent 35%),linear-gradient(135deg,#1e3c72,#2a5298)'},
 'custom':{name:'Ваше фото',css:()=>{const d=LS.get('customWall',null);return d?`url("${d}")`:svgUrl(bloomSVG(true));}},
};

/* ============================ SHELL ============================ */
const Shell={
 recent:LS.get('recent',[]),notifs:[],
 init(){
  this.applyTheme();this.applyWallpaper();this.applyDisplay();
  Bus.on('setting',k=>{if(['theme','accent','transparency'].includes(k))this.applyTheme();if(k==='wallpaper')this.applyWallpaper();if(['brightness','nightLight'].includes(k))this.applyDisplay();if(['wifi','volume','airplane'].includes(k))this.renderTray();});
  Bus.on('fs',()=>this.renderDesktop());
  this.buildTaskbar();this.renderDesktop();this.initDesktop();this.buildStart();this.buildQuick();this.buildNotif();this.buildWidgets();
  this.tick();setInterval(()=>this.tick(),1000);this.initGlobal();
 },
 /* ---------- theme ---------- */
 applyTheme(){const d=document.documentElement;d.dataset.theme=Settings.get('theme');const a=Settings.get('accent');d.style.setProperty('--accent',a);d.style.setProperty('--accent-2',this.lighten(a,.45));
  document.body.classList.toggle('no-transparency',!Settings.get('transparency'));},
 lighten(hex,t){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*t);g=Math.round(g+(255-g)*t);b=Math.round(b+(255-b)*t);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);},
 wallCss(k){return (WALLS[k]||WALLS['bloom-dark']).css();},
 applyWallpaper(){const c=this.wallCss(Settings.get('wallpaper'));$('#wall').style.backgroundImage=c;$('#lock').style.backgroundImage=c;},
 applyDisplay(){$('#dim').style.opacity=(1-Settings.get('brightness')/100)*.85;$('#night').style.opacity=Settings.get('nightLight')?.28:0;},
 setTheme(t){Settings.set('theme',t);if(t==='light'&&Settings.get('wallpaper')==='bloom-dark')Settings.set('wallpaper','bloom-light');if(t==='dark'&&Settings.get('wallpaper')==='bloom-light')Settings.set('wallpaper','bloom-dark');this.buildQuick();},
 /* ---------- clock ---------- */
 tick(){const d=new Date();$('#tbTime').textContent=pad(d.getHours())+':'+pad(d.getMinutes());$('#tbDate').textContent=pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear();
  const lt=$('#lock .ltime');if(lt)lt.innerHTML=`<b>${pad(d.getHours())}:${pad(d.getMinutes())}</b><span>${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_G[d.getMonth()]}</span>`;Bus.emit('tick',d);},
 /* ---------- taskbar ---------- */
 buildTaskbar(){$('#wbIcon').innerHTML=AI.weather();$('#cpIcon').innerHTML=AI.copilot();this.renderTray();
  $('#widgetBtn').onclick=()=>this.togglePanel('widgets');$('#copilotBtn').onclick=()=>this.togglePanel('copilot');$('#quickBtn').onclick=()=>this.togglePanel('quick');$('#clockBtn').onclick=()=>this.togglePanel('notif');
  $('#showDesk').onclick=()=>WM.showDesktop();
  $('#taskbar').addEventListener('contextmenu',e=>{if(e.target.closest('.tbb'))return;e.preventDefault();this.menu(e.clientX,e.clientY,[{label:'Диспетчер задач',icon:I.perf,action:()=>Apps.launch('taskmgr')},{sep:1},{label:'Параметры панели задач',icon:I.gear,action:()=>Apps.launch('settings',{page:'personal'})}]);});
  this.renderTaskbar();},
 renderTray(){const off=!Settings.get('wifi')||Settings.get('airplane');$('#qWifi').innerHTML=off?I.wifiOff:I.wifi;$('#qVol').innerHTML=Settings.get('volume')==0?I.mute:I.vol;$('#qBat').innerHTML=I.battery;},
 renderTaskbar(){const c=$('#tbCenter');if(!c)return;const running=new Set(WM.all().map(w=>w.app));const ids=[...Apps.pinned,...[...running].filter(a=>!Apps.pinned.includes(a))];
  const act=WM.active&&!WM.active.minimized?WM.active.app:null;
  c.innerHTML=`<button class="tbb" id="startBtn" title="Пуск"><span class="ic">${AI.start()}</span></button><button class="tbb" id="searchBtn" title="Поиск"><span class="ic" style="width:20px;height:20px">${I.search}</span></button>`+
   ids.map(id=>{const a=Apps.get(id);if(!a)return'';return `<button class="tbb${running.has(id)?' running':''}${act===id?' active':''}" data-app="${id}" title="${esc(a.name)}"><span class="ic">${a.icon()}</span></button>`}).join('');
  $('#startBtn').onclick=()=>this.togglePanel('start');$('#searchBtn').onclick=()=>{this.togglePanel('start',true);setTimeout(()=>$('#startSearch input')?.focus(),50)};
  $$('.tbb[data-app]',c).forEach(b=>{b.onclick=()=>this.tbClick(b.dataset.app,b);b.oncontextmenu=e=>{e.preventDefault();const id=b.dataset.app,a=Apps.get(id),ws=WM.byApp(id);
   this.menu(e.clientX,e.clientY,[{label:a.name,icon:a.icon(),action:()=>Apps.launch(id)},{sep:1},{label:ws.length>1?'Закрыть все окна':'Закрыть окно',icon:I.close,disabled:!ws.length,action:()=>ws.forEach(w=>WM.close(w))}],{above:true});};});},
 tbClick(id,btn){Sound.click();const ws=WM.byApp(id);if(!ws.length)return Apps.launch(id);
  if(ws.length===1){const w=ws[0];if(WM.active===w&&!w.minimized)WM.minimize(w);else WM.focus(w);return;}
  const r=btn.getBoundingClientRect();this.closePopups();const p=el(`<div class="tbpopup acrylic">${ws.map(w=>`<div class="item" data-id="${w.id}"><span class="ico">${w.icon}</span><span>${esc(w.title)}</span></div>`).join('')}</div>`);
  document.body.appendChild(p);p.style.left=clamp(r.left+r.width/2-p.offsetWidth/2,8,innerWidth-p.offsetWidth-8)+'px';p.style.bottom=(innerHeight-r.top+8)+'px';
  p.onclick=e=>{const it=e.target.closest('.item');if(it){WM.focus(WM.wins.get(it.dataset.id));p.remove();}};this._popup=p;},
 closePopups(){if(this._popup){this._popup.remove();this._popup=null;}if(this._ctx){this._ctx.forEach(m=>m.remove());this._ctx=null;}},
 /* ---------- panels ---------- */
 openPanel:null,
 togglePanel(name,forceOpen){const was=this.openPanel;this.closePanels();if(was===name&&!forceOpen)return;const p=$('#'+name);
  if(name==='start')this.renderStart();if(name==='notif')this.renderNotif();if(name==='widgets')this.renderWidgets();if(name==='quick')this.buildQuick();if(name==='copilot')Copilot.render();
  p.classList.add('open');this.openPanel=name;const btn={start:'#startBtn',widgets:'#widgetBtn',copilot:'#copilotBtn',quick:'#quickBtn',notif:'#clockBtn'}[name];$(btn)?.classList.add('on');
  if(name==='start')setTimeout(()=>$('#startSearch input')?.focus({preventScroll:true}),60);if(name==='copilot')setTimeout(()=>$('#cpIn')?.focus(),60);},
 closePanels(){$$('.panel.open').forEach(p=>p.classList.remove('open'));$$('.tray.on,#widgetBtn.on,#startBtn.on').forEach(b=>b.classList.remove('on'));this.openPanel=null;},
 /* ---------- start menu ---------- */
 buildStart(){},
 renderStart(q=''){const s=$('#start');
  s.innerHTML=`<div id="startSearch"><span class="ico">${I.search}</span><input placeholder="Введите здесь для поиска" value="${esc(q)}"></div><div class="sm-scroll" id="smBody"></div>
  <div class="sm-foot"><div class="user" id="smUser"><span class="avatar">${AI.user()}</span><span>${esc(Settings.get('user'))}</span></div><button class="powerbtn" id="smPower" title="Питание"><span class="ico" style="width:18px;height:18px">${I.power}</span></button></div>`;
  const inp=$('input',s);inp.oninput=()=>this.renderStartBody(inp.value);inp.onkeydown=e=>{if(e.key==='Enter'){const f=$('#smBody [data-open]');f&&f.click();}if(e.key==='Escape')this.closePanels();};
  this.renderStartBody(q);
  $('#smUser').onclick=e=>this.menu(e.clientX,e.clientY,[{label:'Изменить параметры учётной записи',icon:I.gear,action:()=>Apps.launch('settings',{page:'about'})},{label:'Заблокировать',icon:I.lock,action:()=>this.lock()}],{above:true});
  $('#smPower').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();this.menu(r.left-150,r.top,[{label:'Заблокировать',icon:I.lock,action:()=>this.lock()},{label:'Завершение работы',icon:I.power,action:()=>this.shutdown()},{label:'Перезагрузка',icon:I.restart,action:()=>this.restart()},{sep:1},{label:'Вызвать BSOD',icon:I.bug,action:()=>this.bsod('MANUALLY_INITIATED_CRASH')}],{above:true});};},
 renderStartBody(q){const b=$('#smBody');q=q.trim().toLowerCase();
  if(q){const apps=Apps.list().filter(a=>a.name.toLowerCase().includes(q)||(a.keywords||'').includes(q)||a.id.includes(q));const files=VFS.walk().filter(f=>f.name.toLowerCase().includes(q)).slice(0,8);
   b.innerHTML=`<div class="sm-head">Лучшее соответствие</div><div class="recs sm-results">${apps.map(a=>`<div class="rec" data-open data-app="${a.id}"><span class="ic">${a.icon()}</span><div><b>${esc(a.name)}</b><small>Приложение</small></div></div>`).join('')}
   ${files.map(f=>`<div class="rec" data-open data-path="${esc(f.path)}"><span class="ic">${VFS.iconFor(f)}</span><div><b>${esc(f.name)}</b><small>${esc(f.path)}</small></div></div>`).join('')}
   ${!apps.length&&!files.length?`<div class="muted" style="padding:20px">Ничего не найдено по запросу «${esc(q)}»</div>`:''}</div>`;}
  else{const rec=this.recent.filter(p=>VFS.exists(p)).slice(0,6);
   b.innerHTML=`<div class="sm-head">Закрепленные<button id="smAll">Все приложения ›</button></div><div class="pinned">${Apps.list().map(a=>`<div class="papp" data-app="${a.id}"><span class="ic">${a.icon()}</span><span>${esc(a.name)}</span></div>`).join('')}</div>
   <div class="sm-head">Рекомендуем</div><div class="recs">${(rec.length?rec:['C:\\Users\\User\\Documents\\readme.txt','C:\\Users\\User\\Documents\\Список дел.txt'].filter(p=>VFS.exists(p))).map(p=>{const n=VFS.node(p);const t=new Date(n.mtime);
    return `<div class="rec" data-path="${esc(p)}"><span class="ic">${VFS.iconFor({name:p,type:n.type})}</span><div><b>${esc(VFS.basename(p))}</b><small>${t.toDateString()===new Date().toDateString()?'Сегодня, '+pad(t.getHours())+':'+pad(t.getMinutes()):t.getDate()+' '+MONTHS_G[t.getMonth()]}</small></div></div>`}).join('')||'<div class="muted">Откройте файлы — они появятся здесь</div>'}</div>`;
   $('#smAll').onclick=()=>{const p=$('.pinned',b);p.style.gridTemplateColumns='1fr';p.querySelectorAll('.papp').forEach(x=>{x.style.flexDirection='row';x.style.justifyContent='flex-start';x.style.padding='8px 12px'});};}
  $$('[data-app]',b).forEach(x=>x.onclick=()=>{Sound.click();this.closePanels();Apps.launch(x.dataset.app)});
  $$('[data-path]',b).forEach(x=>x.onclick=()=>{this.closePanels();Apps.openFile(x.dataset.path)});},
 addRecent(p){this.recent=[p,...this.recent.filter(x=>x!==p)].slice(0,12);LS.set('recent',this.recent);},
 /* ---------- quick settings ---------- */
 buildQuick(){const q=$('#quick');const S=k=>Settings.get(k);
  const tiles=[['wifi','Wi-Fi',I.wifi],['bt','Bluetooth',I.bt],['airplane','Режим «в самолёте»',I.plane],['nightLight','Ночной свет',I.moon],['dark','Тёмная тема',I.theme],['sounds','Звуки',I.vol]];
  q.innerHTML=`<div class="qgrid">${tiles.map(([k,l,ic])=>`<div class="qt${(k==='dark'?S('theme')==='dark':S(k))?' on':''}" data-k="${k}"><button><span class="ico">${ic}</span></button><span>${l}</span></div>`).join('')}</div>
  <div class="qslider"><span class="ico">${I.sun}</span><input type="range" min="20" max="100" id="qBright" value="${S('brightness')}"><span id="qBrightV">${S('brightness')}</span></div>
  <div class="qslider"><span class="ico" id="qVolI">${S('volume')==0?I.mute:I.vol}</span><input type="range" min="0" max="100" id="qVolR" value="${S('volume')}"><span id="qVolV">${S('volume')}</span></div>
  <div class="qfoot"><span style="display:flex;gap:8px;align-items:center"><span class="ico">${I.battery}</span> ${Shell.battery}%</span><button class="tbtn" id="qSet" title="Все параметры"><span class="ico">${I.gear}</span></button></div>`;
  $$('.qt',q).forEach(t=>t.querySelector('button').onclick=()=>{Sound.click();const k=t.dataset.k;if(k==='dark'){this.setTheme(S('theme')==='dark'?'light':'dark');return;}Settings.set(k,!S(k));t.classList.toggle('on',S(k));
   if(k==='wifi'||k==='airplane')this.notify({title:k==='wifi'?'Wi-Fi':'Режим «в самолёте»',body:S(k)?'Включено':'Выключено',icon:AI.pc(),silent:true});});
  $('#qBright').oninput=e=>{Settings.set('brightness',+e.target.value);$('#qBrightV').textContent=e.target.value;};
  $('#qVolR').oninput=e=>{Settings.set('volume',+e.target.value);$('#qVolV').textContent=e.target.value;$('#qVolI').innerHTML=+e.target.value?I.vol:I.mute;};$('#qVolR').onchange=()=>Sound.click();
  $('#qSet').onclick=()=>Apps.launch('settings');},
 battery:87,
 /* ---------- notifications & calendar ---------- */
 buildNotif(){this.calMonth=new Date();this.calMonth.setDate(1);},
 renderNotif(){const n=$('#notif');const d=new Date();
  n.innerHTML=`<div class="nc acrylic"><div class="nc-head"><b>Уведомления</b>${this.notifs.length?'<button class="tbtn" id="ncClear">Очистить все</button>':''}</div><div class="nc-list">${this.notifs.length?this.notifs.map((x,i)=>`<div class="ncard" data-i="${i}"><div class="h"><span class="ic">${x.icon||AI.start()}</span>${esc(x.app||'Windows')} · ${pad(x.time.getHours())}:${pad(x.time.getMinutes())}</div><b>${esc(x.title)}</b><p>${esc(x.body)}</p><button class="x">${I.close}</button></div>`).join(''):'<div class="muted" style="text-align:center;padding:30px 0">Нет новых уведомлений</div>'}</div></div>
  <div class="cal acrylic"><div class="cal-top"><span>${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_G[d.getMonth()]}</span></div><div class="cal-top"><span id="calTitle"></span><div><button id="calUp">${I.chevUp}</button><button id="calDn">${I.chevDown}</button></div></div><div class="cal-grid" id="calGrid"></div></div>`;
  $$('.ncard .x',n).forEach(b=>b.onclick=e=>{e.stopPropagation();this.notifs.splice(+b.parentNode.dataset.i,1);this.renderNotif();this.renderBadge();});
  $('#ncClear')&&($('#ncClear').onclick=()=>{this.notifs=[];this.renderNotif();this.renderBadge();});
  $('#calUp').onclick=()=>{this.calMonth.setMonth(this.calMonth.getMonth()-1);this.renderCal();};$('#calDn').onclick=()=>{this.calMonth.setMonth(this.calMonth.getMonth()+1);this.renderCal();};
  this.calMonth=new Date(d.getFullYear(),d.getMonth(),1);this.renderCal();this.unread=0;this.renderBadge();},
 renderCal(){const m=this.calMonth,t=new Date();$('#calTitle').textContent=MONTHS[m.getMonth()][0].toUpperCase()+MONTHS[m.getMonth()].slice(1)+' '+m.getFullYear();
  const first=(m.getDay()+6)%7,days=new Date(m.getFullYear(),m.getMonth()+1,0).getDate(),prev=new Date(m.getFullYear(),m.getMonth(),0).getDate();let h=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>`<span class="dn">${x}</span>`).join('');
  for(let i=0;i<42;i++){const dn=i-first+1;if(dn<1)h+=`<span class="o">${prev+dn}</span>`;else if(dn>days)h+=`<span class="o">${dn-days}</span>`;else{const today=dn===t.getDate()&&m.getMonth()===t.getMonth()&&m.getFullYear()===t.getFullYear();h+=`<span class="d${today?' t':''}">${dn}</span>`;}}$('#calGrid').innerHTML=h;},
 unread:0,
 renderBadge(){$('#bellBadge').innerHTML=`<span class="ico" style="width:16px;height:16px">${I.bell}</span>${this.unread?`<b>${this.unread}</b>`:''}`;},
 notify({title,body='',icon,app,silent}){const n={title,body,icon,app,time:new Date()};this.notifs.unshift(n);this.notifs=this.notifs.slice(0,30);if(this.openPanel!=='notif'){this.unread++;}this.renderBadge();
  if(!Settings.get('notifications'))return;if(!silent)Sound.notify();
  const t=el(`<div class="toast acrylic"><div class="ncard" style="background:none;border:0;padding:0"><div class="h"><span class="ic">${icon||AI.start()}</span>${esc(app||'Windows')}</div><b>${esc(title)}</b><p>${esc(body)}</p></div></div>`);
  $('#toasts').appendChild(t);const kill=()=>{t.classList.add('out');setTimeout(()=>t.remove(),300)};t.onclick=kill;setTimeout(kill,5000);},
 /* ---------- widgets ---------- */
 buildWidgets(){this.weather=this.simWeather();$('#wbTemp').textContent=this.weather.t+'°C';$('#wbCond').textContent=this.weather.c;$('#wbIcon').innerHTML=this.weather.icon();
  Bus.on('tick',d=>{if(this.openPanel==='widgets'){const e=$('#wgTime');if(e)e.textContent=pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());this.drawWClock();}});
  Bus.on('monitor',()=>{if(this.openPanel==='widgets')this.updateMeters();});},
 simWeather(){const d=new Date(),seed=d.getDate()*7+d.getMonth()*31;const conds=[['Солнечно',AI.sunny],['Переменная облачность',AI.weather],['Облачно',AI.cloud],['Дождь',AI.rain]];const c=conds[seed%4];
  const base=[ -6,-4,2,10,17,21,24,22,15,8,1,-4][d.getMonth()];const t=base+(seed%5)-2+Math.round(Math.sin(d.getHours()/24*Math.PI*2-Math.PI/2)*3);
  return{t,c:c[0],icon:c[1],f:Array.from({length:5},(_,i)=>{const cc=conds[(seed+i*3+1)%4];return{d:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][(d.getDay()+i+1)%7],hi:base+((seed+i*5)%6),lo:base-3-((seed+i)%4),icon:cc[1]}})};},
 renderWidgets(){const w=$('#widgets'),W=this.weather,d=new Date();
  w.innerHTML=`<div class="wg-top"><div><div class="wg-time" id="wgTime"></div><div class="muted">${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_G[d.getMonth()]}</div></div><button class="btn" id="wgClose">${I.close.replace('<svg','<svg width="10"')} Закрыть</button></div>
  <div class="wgrid"><div class="wcard weather"><h4>Москва · Погода</h4><div style="display:flex;align-items:center;gap:14px"><span class="ic" style="width:58px;height:58px">${W.icon()}</span><div><div class="big">${W.t}°</div><div>${W.c}</div></div></div>
   <div class="wforecast">${W.f.map(f=>`<div>${f.d}<span class="ic">${f.icon()}</span>${f.hi}° <span style="opacity:.7">${f.lo}°</span></div>`).join('')}</div></div>
   <div class="wcard wclock"><canvas id="wgClock" width="300" height="300" style="width:150px;height:150px"></canvas></div>
   <div class="wcard"><h4><span class="ico">${I.pencil}</span>Быстрые заметки</h4><textarea id="wgNotes" placeholder="Запишите что-нибудь…">${esc(LS.get('notes',''))}</textarea></div>
   <div class="wcard"><h4><span class="ico">${I.cpu}</span>Монитор ресурсов</h4>${['cpu:ЦП','ram:Память','disk:Диск','net:Сеть'].map(x=>{const[k,l]=x.split(':');return `<div class="meter"><div><span>${l}</span><span id="wm_${k}"></span></div><i><b id="wb_${k}"></b></i></div>`}).join('')}</div>
   <div class="news">${[['linear-gradient(135deg,#667eea,#764ba2)','Windows 11: 10 скрытых функций, о которых вы не знали'],['linear-gradient(135deg,#f093fb,#f5576c)','Рекорд в Сапёре на уровне «Эксперт» — 31 секунда'],['linear-gradient(135deg,#43e97b,#38f9d7)','Как настроить Snap Layouts за 30 секунд']].map(([g,t])=>`<div class="wcard"><div class="thumb" style="background:${g}"></div><p>${t}</p></div>`).join('')}</div></div>`;
  $('#wgClose').onclick=()=>this.closePanels();$('#wgNotes').oninput=e=>LS.set('notes',e.target.value);
  const n=new Date();$('#wgTime').textContent=pad(n.getHours())+':'+pad(n.getMinutes())+':'+pad(n.getSeconds());this.drawWClock();this.updateMeters();},
 updateMeters(){['cpu','ram','disk','net'].forEach(k=>{const v=Monitor[k];const m=$('#wm_'+k);if(!m)return;m.textContent=k==='net'?(v*0.12).toFixed(1)+' Мбит/с':Math.round(v)+'%';$('#wb_'+k).style.width=(k==='net'?v*3:v)+'%';});},
 drawWClock(){const c=$('#wgClock');if(!c)return;const x=c.getContext('2d'),d=new Date(),R=140;x.clearRect(0,0,300,300);x.save();x.translate(150,150);
  const dark=Settings.get('theme')==='dark';x.fillStyle=dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.04)';x.beginPath();x.arc(0,0,R,0,7);x.fill();x.strokeStyle=dark?'#fff':'#222';
  for(let i=0;i<60;i++){x.save();x.rotate(i*Math.PI/30);x.lineWidth=i%5?2:5;x.globalAlpha=i%5?.35:.9;x.beginPath();x.moveTo(0,-R+10);x.lineTo(0,-R+(i%5?18:28));x.stroke();x.restore();}
  const hand=(a,l,w,c)=>{x.save();x.rotate(a);x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(0,16);x.lineTo(0,-l);x.stroke();x.restore();};
  const s=d.getSeconds()+d.getMilliseconds()/1000,m=d.getMinutes()+s/60,h=d.getHours()%12+m/60;hand(h*Math.PI/6,70,9,dark?'#fff':'#222');hand(m*Math.PI/30,105,6,dark?'#fff':'#222');hand(d.getSeconds()*Math.PI/30,115,3,getComputedStyle(document.documentElement).getPropertyValue('--accent-use').trim()||'#4cc2ff');
  x.fillStyle=dark?'#fff':'#222';x.beginPath();x.arc(0,0,8,0,7);x.fill();x.restore();},
 /* ---------- context menu ---------- */
 menu(x,y,items,opts={}){this.closePopups();this._ctx=[];const build=(items,x,y,level)=>{
  const m=el(`<div class="ctx acrylic"></div>`);items.forEach(it=>{if(it.sep){m.appendChild(el('<hr>'));return;}
   const mi=el(`<div class="mi${it.disabled?' dis':''}"><span class="ico">${it.checked!=null?(it.checked?I.check:''):(it.icon||'')}</span><span>${esc(it.label)}</span>${it.key?`<span class="k">${it.key}</span>`:''}${it.sub?`<span class="arr">${I.chevR}</span>`:''}</div>`);
   if(it.sub){let open=null;mi.addEventListener('mouseenter',()=>{this._ctx.slice(level+1).forEach(s=>s.remove());this._ctx=this._ctx.slice(0,level+1);const r=mi.getBoundingClientRect();open=build(it.sub,r.right+2,r.top-4,level+1);if(open.getBoundingClientRect().right>innerWidth)open.style.left=(r.left-open.offsetWidth-2)+'px';});}
   else{mi.addEventListener('mouseenter',()=>{this._ctx.slice(level+1).forEach(s=>s.remove());this._ctx=this._ctx.slice(0,level+1);});mi.onclick=()=>{this.closePopups();Sound.click();it.action&&it.action();};}
   m.appendChild(mi);});
  document.body.appendChild(m);this._ctx.push(m);const w=m.offsetWidth,h=m.offsetHeight;let yy=opts.above&&level===0?y-h-6:y;
  m.style.left=clamp(x,4,innerWidth-w-4)+'px';m.style.top=clamp(yy,4,innerHeight-h-4)+'px';return m;};build(items,x,y,0);},
 /* ---------- dialogs ---------- */
 dialog({title,html,buttons,width=420,icon}){return new Promise(res=>{const body=el(`<div style="display:flex;flex-direction:column;flex:1"><div class="dlg">${html}</div><div class="dlg-foot">${buttons.map((b,i)=>`<button class="btn${b.primary?' primary':''}" data-i="${i}">${esc(b.label)}</button>`).join('')}</div></div>`);
  let done=false;const w=WM.create({app:'dialog',title,icon:icon||AI.start(),width,height:10,content:body,resizable:false,minimizable:false,center:true,onClose:()=>{if(!done){done=true;res(null);}}});
  requestAnimationFrame(()=>{w.el.style.height='auto';w.el.style.top=Math.max(10,(WM.H-w.el.offsetHeight)/2)+'px';const inp=$('input',body);inp?(inp.focus(),inp.select()):$('.btn.primary',body)?.focus();});
  const finish=i=>{if(done)return;done=true;const b=buttons[i];res(b.value!==undefined?(typeof b.value==='function'?b.value(body):b.value):i);WM.close(w);};
  $$('.dlg-foot .btn',body).forEach(b=>b.onclick=()=>finish(+b.dataset.i));body.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();finish(buttons.findIndex(b=>b.primary));}if(e.key==='Escape')WM.close(w);});});},
 prompt(title,label,def=''){return this.dialog({title,html:`<p>${esc(label)}</p><input class="inp" value="${esc(def)}" style="width:100%">`,buttons:[{label:'OK',primary:true,value:b=>$('input',b).value},{label:'Отмена',value:null}]});},
 confirm(title,msg){return this.dialog({title,html:`<p>${esc(msg)}</p>`,buttons:[{label:'Да',primary:true,value:true},{label:'Отмена',value:false}]});},
 alert(title,msg){Sound.error();return this.dialog({title,html:`<p>${esc(msg)}</p>`,buttons:[{label:'OK',primary:true,value:true}]});},
 pickFile(title,exts){const files=VFS.walk('C:\\').filter(f=>!exts||exts.includes(VFS.ext(f.name)));
  return this.dialog({title,width:520,icon:AI.explorer(),html:`<div style="max-height:300px;overflow:auto;display:flex;flex-direction:column;gap:2px" class="pick">${files.map(f=>`<div class="rec" data-p="${esc(f.path)}" style="border-radius:5px"><span class="ic" style="width:24px;height:24px">${VFS.iconFor(f)}</span><div><b>${esc(f.name)}</b><small>${esc(VFS.dirname(f.path))}</small></div></div>`).join('')||'<p class="muted">Файлов нет</p>'}</div>`,
   buttons:[{label:'Открыть',primary:true,value:b=>$('.rec.sel',b)?.dataset.p||null},{label:'Отмена',value:null}]}).then(r=>r);},
 /* ---------- desktop ---------- */
 deskItems(){const sys=[{id:'pc',name:'Этот компьютер',icon:AI.pc(),open:()=>Apps.launch('explorer',{path:'pc'})},{id:'bin',name:'Корзина',icon:AI.recycle((VFS.list('C:\\$Recycle.Bin')||[]).length>0),open:()=>Apps.launch('explorer',{path:'C:\\$Recycle.Bin'})},
  ...['explorer','terminal','paint','minesweeper','solitaire'].map(a=>({id:'app:'+a,name:Apps.get(a).name,icon:Apps.get(a).icon(),open:()=>Apps.launch(a)}))];
  let files=(VFS.list('C:\\Users\\User\\Desktop')||[]).map(f=>({id:'f:'+f.path,name:f.name,icon:VFS.iconFor(f),path:f.path,file:f,open:()=>Apps.openFile(f.path)}));
  const s=Settings.get('sort');files.sort((a,b)=>s==='type'?(VFS.ext(a.name)+a.name).localeCompare(VFS.ext(b.name)+b.name):s==='date'?b.file.mtime-a.file.mtime:a.name.localeCompare(b.name,'ru'));return [...sys,...files];},
 renderDesktop(){const c=$('#icons');if(!c)return;const sz=Settings.get('iconSize');c.className=sz==='medium'?'':sz;const items=this.deskItems();this._desk=items;
  const cw=sz==='small'?78:sz==='large'?112:90,ch=sz==='small'?84:sz==='large'?118:100;const rows=Math.max(1,Math.floor((c.clientHeight-12)/ch));
  c.innerHTML=items.map((it,i)=>`<div class="dicon" data-i="${i}" style="left:${6+Math.floor(i/rows)*cw}px;top:${6+(i%rows)*ch}px"><span class="ic">${it.icon}</span><span>${esc(it.name)}</span></div>`).join('');},
 initDesktop(){const d=$('#desktop'),c=$('#icons'),box=$('#selbox');addEventListener('resize',()=>this.renderDesktop());
  d.addEventListener('pointerdown',e=>{if(e.button!==0)return;const ic=e.target.closest('.dicon');WM.blurAll();
   if(ic){if(!e.ctrlKey&&!ic.classList.contains('sel'))$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));if(e.ctrlKey)ic.classList.toggle('sel');else ic.classList.add('sel');return;}
   $$('.dicon.sel').forEach(x=>x.classList.remove('sel'));const sx=e.clientX,sy=e.clientY;d.setPointerCapture(e.pointerId);
   const mv=ev=>{const x=Math.min(sx,ev.clientX),y=Math.min(sy,ev.clientY),w=Math.abs(ev.clientX-sx),h=Math.abs(ev.clientY-sy);Object.assign(box.style,{display:'block',left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
    $$('.dicon',c).forEach(ic=>{const r=ic.getBoundingClientRect();ic.classList.toggle('sel',r.right>x&&r.left<x+w&&r.bottom>y&&r.top<y+h);});};
   const up=()=>{box.style.display='none';d.removeEventListener('pointermove',mv);d.removeEventListener('pointerup',up);};d.addEventListener('pointermove',mv);d.addEventListener('pointerup',up);});
  d.addEventListener('dblclick',e=>{const ic=e.target.closest('.dicon');if(ic){Sound.click();this._desk[+ic.dataset.i].open();}});
  d.addEventListener('contextmenu',e=>{e.preventDefault();const ic=e.target.closest('.dicon');
   if(ic){if(!ic.classList.contains('sel')){$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));ic.classList.add('sel');}const it=this._desk[+ic.dataset.i];
    return this.menu(e.clientX,e.clientY,[{label:'Открыть',icon:I.open,action:it.open},...(it.path?[{label:'Переименовать',icon:I.rename,key:'F2',action:()=>this.renameItem(it.path)},{label:'Удалить',icon:I.trash,key:'Del',action:()=>this.deleteSelected()}]:[]),
     ...(it.id==='bin'?[{label:'Очистить корзину',icon:I.trash,action:()=>this.emptyBin()}]:[])]);}
   const S=Settings.get('iconSize'),so=Settings.get('sort');
   this.menu(e.clientX,e.clientY,[{label:'Вид',icon:I.view,sub:[['large','Крупные значки'],['medium','Обычные значки'],['small','Мелкие значки']].map(([k,l])=>({label:l,checked:S===k,action:()=>{Settings.set('iconSize',k);this.renderDesktop();}}))},
    {label:'Сортировка',icon:I.sort,sub:[['name','Имя'],['type','Тип элемента'],['date','Дата изменения']].map(([k,l])=>({label:l,checked:so===k,action:()=>{Settings.set('sort',k);this.renderDesktop();}}))},
    {label:'Обновить',icon:I.refresh,action:()=>{c.classList.remove('refresh');void c.offsetWidth;c.style.opacity=0;setTimeout(()=>{c.style.opacity='';this.renderDesktop();c.classList.add('refresh');},120);}},{sep:1},
    {label:'Создать',icon:I.plus,sub:[{label:'Папку',icon:I.folder,action:()=>{const p='C:\\Users\\User\\Desktop';VFS.mkdir(p+'\\'+VFS.uniqueName(p,'Новая папка',''));}},{label:'Текстовый документ',icon:I.file,action:()=>{const p='C:\\Users\\User\\Desktop';VFS.write(p+'\\'+VFS.uniqueName(p,'Новый текстовый документ','.txt'),'');}}]},{sep:1},
    {label:'Изменить обои',icon:I.image,sub:Object.entries(WALLS).filter(([k])=>k!=='custom'||LS.get('customWall',null)).map(([k,v])=>({label:v.name,checked:Settings.get('wallpaper')===k,action:()=>Settings.set('wallpaper',k)})).concat([{sep:1},{label:'Персонализация…',icon:I.brush2,action:()=>Apps.launch('settings',{page:'personal'})}])},
    {label:'Параметры экрана',icon:I.sys,action:()=>Apps.launch('settings',{page:'system'})},{label:'Открыть в Терминале',icon:I.term,action:()=>Apps.launch('terminal',{cwd:'C:\\Users\\User\\Desktop'})}]);});
  document.addEventListener('keydown',e=>{if(e.target.closest&&e.target.closest('input,textarea')||WM.active)return;const sel=$$('.dicon.sel');if(!sel.length)return;
   if(e.key==='Delete')this.deleteSelected();if(e.key==='Enter')sel.forEach(s=>this._desk[+s.dataset.i].open());if(e.key==='F2'){const it=this._desk[+sel[0].dataset.i];it.path&&this.renameItem(it.path);}});},
 deleteSelected(){$$('.dicon.sel').map(s=>this._desk[+s.dataset.i]).filter(it=>it.path).forEach(it=>VFS.move(it.path,'C:\\$Recycle.Bin'));Sound.pop();},
 async renameItem(p){const n=await this.prompt('Переименование','Новое имя:',VFS.basename(p));if(n&&!VFS.rename(p,n))this.alert('Ошибка','Недопустимое имя или файл с таким именем уже существует.');},
 async emptyBin(){if(await this.confirm('Очистить корзину','Удалить все объекты без возможности восстановления?')){VFS.node('C:\\$Recycle.Bin').children={};VFS.save();Sound.pop();}},
 /* ---------- global input / hotkeys ---------- */
 initGlobal(){
  document.addEventListener('pointerdown',e=>{const t=e.target;
   if(this._ctx&&!t.closest('.ctx'))this.closePopups();if(this._popup&&!t.closest('.tbpopup,.tbb'))this.closePopups();
   if(this.openPanel){const p=$('#'+this.openPanel);const tg={start:'#startBtn,#searchBtn',widgets:'#widgetBtn',copilot:'#copilotBtn',quick:'#quickBtn',notif:'#clockBtn'}[this.openPanel];if(!p.contains(t)&&!t.closest(tg)&&!t.closest('.ctx'))this.closePanels();}},true);
  document.addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea'))e.preventDefault();});
  let meta=false,metaUsed=false;
  addEventListener('keydown',e=>{if(!this.ready)return;
   if(e.key==='Meta'||e.key==='OS'){meta=true;metaUsed=false;return;}
   const k=e.key.toLowerCase();const combo=(meta||e.metaKey);
   if(combo){metaUsed=true;}
   if((combo&&e.ctrlKey&&e.shiftKey&&k==='b')||(e.altKey&&e.shiftKey&&k==='b')){e.preventDefault();return this.bsod('MANUALLY_INITIATED_CRASH');}
   if((combo&&k==='d')||(e.altKey&&e.shiftKey&&k==='d')){e.preventDefault();return WM.showDesktop();}
   if((combo&&k==='e')||(e.altKey&&e.shiftKey&&k==='e')){e.preventDefault();return Apps.launch('explorer');}
   if((combo&&k==='r')||(e.altKey&&e.shiftKey&&k==='r')){e.preventDefault();return Apps.launch('run');}
   if(e.ctrlKey&&k==='escape'){e.preventDefault();return this.togglePanel('start');}
   if(e.altKey&&(k==='tab'||e.code==='Backquote')){e.preventDefault();return this.altTab(e.shiftKey?-1:1);}
   if(e.altKey&&k==='f4'&&WM.active){e.preventDefault();return WM.close(WM.active);}
   if(k==='escape'){if(this._ctx||this._popup)return this.closePopups();if(this.openPanel)return this.closePanels();}});
  addEventListener('keyup',e=>{if(e.key==='Meta'||e.key==='OS'){if(meta&&!metaUsed&&this.ready)this.togglePanel('start');meta=false;}if(e.key==='Alt'&&this._at)this.altTabCommit();});
  addEventListener('blur',()=>{meta=false;if(this._at)this.altTabCommit();});
  document.addEventListener('click',e=>{if(e.target.closest('button,.papp,.rec,.mi'))Sound.click();},true);
  $('#notif').addEventListener('click',e=>{});
  document.addEventListener('click',e=>{const r=e.target.closest('.pick .rec');if(r){$$('.pick .rec').forEach(x=>x.style.background='');$$('.pick .rec').forEach(x=>x.classList.remove('sel'));r.classList.add('sel');r.style.background='var(--sel)';}});
  document.addEventListener('dblclick',e=>{const r=e.target.closest('.pick .rec');if(r){const f=r.closest('.win');$('.btn.primary',f)?.click();}});
 },
 altTab(dir){const ws=[...WM.order].reverse();if(!ws.length)return;const box=$('#alttab .box');
  if(!this._at){this._at={list:ws,i:ws.length>1?(dir>0?1:ws.length-1):0};$('#alttab').style.display='flex';}else{this._at.i=(this._at.i+dir+this._at.list.length)%this._at.list.length;}
  box.innerHTML=this._at.list.map((w,i)=>`<div class="atw${i===this._at.i?' sel':''}" data-i="${i}"><div class="t"><span class="ic">${w.icon}</span>${esc(w.title)}</div><div class="p"><span class="ic">${w.icon}</span></div></div>`).join('');
  $$('.atw',box).forEach(a=>a.onclick=()=>{this._at.i=+a.dataset.i;this.altTabCommit();});},
 altTabCommit(){if(!this._at)return;const w=this._at.list[this._at.i];this._at=null;$('#alttab').style.display='none';if(w)WM.focus(w);},
 /* ---------- power / boot / lock / BSOD ---------- */
 ready:false,
 async boot(){this.ready=false;const b=$('#boot');b.innerHTML=`<div class="logo">${AI.start()}</div><div class="spinner"><i></i><i></i><i></i><i></i><i></i></div>`;b.style.display='flex';$('#off').style.display='none';
  await sleep(2600);b.style.display='none';this.lock(true);},
 lock(first){this.closePanels();const l=$('#lock');l.className='';l.innerHTML=`<div class="lbg"></div><div class="ltime"></div><div class="lhint">Нажмите любую клавишу или щёлкните, чтобы войти</div>
  <div class="lform"><div class="avatar">${AI.user()}</div><h2>${esc(Settings.get('user'))}</h2><button class="btn primary" id="loginBtn" style="min-width:200px">Войти</button></div>`;
  l.style.display='block';this.ready=false;this.tick();const show=()=>{if(l.classList.contains('login'))return;l.classList.add('login');setTimeout(()=>$('#loginBtn').focus(),300);};
  l.onclick=e=>{if(!e.target.closest('#loginBtn'))show();};const kd=e=>{if(l.style.display==='none')return document.removeEventListener('keydown',kd);if(!l.classList.contains('login')){e.preventDefault();show();}};document.addEventListener('keydown',kd);
  $('#loginBtn').onclick=()=>{document.removeEventListener('keydown',kd);l.style.transition='opacity .4s';l.style.opacity=0;setTimeout(()=>{l.style.display='none';l.style.opacity='';l.style.transition='';},400);this.ready=true;
   if(first!==false&&!this._welcomed){this._welcomed=true;Sound.startup();setTimeout(()=>this.welcome(),1400);}};},
 welcome(){this.notify({title:'Добро пожаловать в Windows 11',body:'Нажмите «Пуск» или клавишу Win, чтобы начать.',app:'Советы'});
  setTimeout(()=>this.notify({title:'Защита от вирусов и угроз',body:'Угроз не обнаружено. Последняя проверка: сегодня.',app:'Безопасность Windows',icon:AI.settings(),silent:true}),2500);
  setTimeout(()=>this.notify({title:'Copilot готов помочь',body:'Попробуйте: «включи светлую тему» или «открой сапёр».',app:'Copilot',icon:AI.copilot(),silent:true}),5000);},
 async shutdown(restart){this.closePanels();this.ready=false;Sound.shutdown();const o=$('#off');o.innerHTML=`<div class="spinner"><i></i><i></i><i></i><i></i><i></i></div><div>${restart?'Перезагрузка':'Завершение работы'}</div>`;o.style.display='flex';o.style.cursor='';
  await sleep(2200);WM.all().forEach(w=>{w.onClose=null;WM.close(w)});this._welcomed=false;
  if(restart)return this.boot();o.innerHTML=`<div style="opacity:.5;font-size:14px">Компьютер выключен. Нажмите кнопку питания, чтобы включить.</div><button class="btn" id="pwrOn" style="width:64px;height:64px;border-radius:50%"><span class="ico" style="width:26px;height:26px">${I.power}</span></button>`;$('#pwrOn').onclick=()=>this.boot();},
 restart(){this.shutdown(true);},
 bsod(code='CRITICAL_PROCESS_DIED'){if(this._bsod)return;this._bsod=true;this.ready=false;this.closePanels();Sound.error();const b=$('#bsod');
  b.innerHTML=`<div class="face">:(</div><h1>На вашем ПК возникла проблема, и его необходимо перезагрузить. Мы лишь собираем некоторые сведения об ошибке, а затем будет автоматически выполнена перезагрузка.</h1><div class="pct"><span id="bsPct">0</span>% выполнено</div>
  <div class="row"><div class="qr">${this.qr()}</div><div>Дополнительные сведения об этой проблеме и возможных способах ее решения см. на странице https://www.windows.com/stopcode<br><br>При обращении в службу поддержки предоставьте им эту информацию:<br>Код остановки: ${esc(code)}<br>Что вызвало проблему: web11krnl.sys</div></div>`;
  b.style.display='block';let p=0;const step=()=>{p=Math.min(100,p+Math.ceil(Math.random()*9));$('#bsPct').textContent=p;if(p<100)setTimeout(step,250+Math.random()*450);else setTimeout(()=>{b.style.display='none';this._bsod=false;WM.all().forEach(w=>{w.onClose=null;WM.close(w)});this._welcomed=false;this.boot();},1200);};setTimeout(step,900);},
 qr(){const N=25;let s=7,cells='';const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;};const finder=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3"/>`;
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const inF=(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);if(!inF&&rnd()>.52)cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;}
  return `<svg viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges" fill="#0078d7" style="width:100%;height:100%">${cells}${finder(0,0)}${finder(N-7,0)}${finder(0,N-7)}</svg>`;},
};
