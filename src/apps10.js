
/* ============================ DESKTOP GRID (drag icons anywhere) ============================ */
addCSS(`#icons.dgrid{background-image:radial-gradient(circle,rgba(255,255,255,.35) 1.5px,transparent 2px);background-size:var(--gw) var(--gh);background-position:calc(6px + var(--gw)/2) calc(6px + var(--gh)/2)}
.dicon.dragging{opacity:.75;z-index:5;transition:none!important;pointer-events:none}.dicon{transition:left .15s,top .15s}`);
Shell.renderDesktop=function(){const c=$('#icons');if(!c)return;const sz=Settings.get('iconSize');c.className=sz==='medium'?'':sz;const items=this.deskItems();this._desk=items;
 const cw=sz==='small'?78:sz==='large'?112:90,ch=sz==='small'?84:sz==='large'?118:100;const rows=Math.max(1,Math.floor((c.clientHeight-12)/ch)),cols=Math.max(1,Math.floor((c.clientWidth-12)/cw));this._grid={cw,ch,rows,cols};
 const P=LS.get('deskPos',{}),used=new Set(),pos=[];
 items.forEach((it,i)=>{const p=P[it.id];if(p&&p[0]<cols&&p[1]<rows&&!used.has(p[0]+','+p[1])){used.add(p[0]+','+p[1]);pos[i]=p;}});
 let k=0;items.forEach((it,i)=>{if(pos[i])return;while(used.has((k/rows|0)+','+(k%rows)))k++;pos[i]=[k/rows|0,k%rows];used.add(pos[i][0]+','+pos[i][1]);});this._pos=pos;
 c.innerHTML=items.map((it,i)=>`<div class="dicon" data-i="${i}" style="left:${6+pos[i][0]*cw}px;top:${6+pos[i][1]*ch}px"><span class="ic">${it.icon}</span><span>${esc(it.name)}</span></div>`).join('');};
Shell.saveDeskPos=function(){const P={};this._desk.forEach((it,i)=>P[it.id]=this._pos[i]);LS.set('deskPos',P);};
(function(){const c=$('#icons');if(!c)return;
 c.addEventListener('pointerdown',e=>{if(e.button!==0)return;const ic=e.target.closest('.dicon');if(!ic)return;const sx=e.clientX,sy=e.clientY;let drag=false,els=[];const G=Shell._grid;
  const mv=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(!drag&&Math.hypot(dx,dy)<6)return;
   if(!drag){drag=true;els=$$('.dicon.sel',c);if(!els.includes(ic))els=[ic];els.forEach(x=>x.classList.add('dragging'));c.classList.add('dgrid');c.style.setProperty('--gw',G.cw+'px');c.style.setProperty('--gh',G.ch+'px');}
   els.forEach(x=>x.style.transform=`translate(${dx}px,${dy}px)`);};
  const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);if(!drag)return;c.classList.remove('dgrid');
   const dc=Math.round((ev.clientX-sx)/G.cw),dr=Math.round((ev.clientY-sy)/G.ch);const S=Shell,moving=new Set(els.map(x=>+x.dataset.i));
   const occ=new Map();S._pos.forEach((p,i)=>{if(!moving.has(i))occ.set(p[0]+','+p[1],i);});
   const order=[+ic.dataset.i,...[...moving].filter(i=>i!==+ic.dataset.i)];
   order.forEach(i=>{const old=S._pos[i];let nc=Math.max(0,Math.min(G.cols-1,old[0]+dc)),nr=Math.max(0,Math.min(G.rows-1,old[1]+dr));
    const key=nc+','+nr;if(occ.has(key)){const j=occ.get(key);if(moving.size===1&&!occ.has(old[0]+','+old[1])){S._pos[j]=old;occ.delete(key);occ.set(old[0]+','+old[1],j);}else{let n=0;while(occ.has((n/G.rows|0)+','+(n%G.rows)))n++;nc=n/G.rows|0;nr=n%G.rows;}}
    S._pos[i]=[nc,nr];occ.set(nc+','+nr,i);});
   S.saveDeskPos();const sel=[...moving];S.renderDesktop();sel.forEach(i=>{const x=$(`.dicon[data-i="${i}"]`,c);x&&x.classList.add('sel');});Sound.click();};
  addEventListener('pointermove',mv);addEventListener('pointerup',up);});
 setTimeout(()=>Shell.renderDesktop(),0);})();

/* ============================ REAL WEATHER (Open-Meteo, free, no key) ============================ */
if(!AI.snow)AI.snow=()=>svgI(`<path d="M14 26a9 9 0 0 1 2-17.8A11 11 0 0 1 37 12a8 8 0 0 1-1 16H14z" fill="#cfd8e3"/><g fill="#fff" stroke="#9fb6d1"><circle cx="16" cy="36" r="3"/><circle cx="26" cy="40" r="3"/><circle cx="34" cy="34" r="3"/></g>`);
if(!AI.storm)AI.storm=()=>svgI(`<path d="M14 26a9 9 0 0 1 2-17.8A11 11 0 0 1 37 12a8 8 0 0 1-1 16H14z" fill="#8a9bb0"/><path d="M26 26l-6 10h6l-4 9 10-13h-6l4-6z" fill="#ffc83d"/>`);
const WMO=c=>c===0?['Ясно',AI.sunny]:c<=1?['Преимущественно ясно',AI.sunny]:c===2?['Переменная облачность',AI.weather]:c===3?['Пасмурно',AI.cloud]:c<=48?['Туман',AI.cloud]:c<=57?['Морось',AI.rain]:c<=67?['Дождь',AI.rain]:c<=77?['Снег',AI.snow]:c<=82?['Ливень',AI.rain]:c<=86?['Снегопад',AI.snow]:['Гроза',AI.storm];
const WDAYS=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
async function geoByIp(){const tries=[async()=>{const j=await (await fetch('https://ipapi.co/json/')).json();return j.latitude?{lat:j.latitude,lon:j.longitude,city:j.city}:null;},
  async()=>{const j=await (await fetch('https://get.geojs.io/v1/ip/geo.json')).json();return j.latitude?{lat:+j.latitude,lon:+j.longitude,city:j.city}:null;}];
 for(const t of tries){try{const r=await t();if(r)return r;}catch(e){}}return null;}
async function geoByName(name){const j=await (await fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=ru&name='+encodeURIComponent(name))).json();const r=j.results&&j.results[0];return r?{lat:r.latitude,lon:r.longitude,city:r.name}:null;}
async function fetchWeather(loc){const u=`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto&forecast_days=6`;
 const j=await (await fetch(u)).json();const cur=j.current;const [c,icon]=WMO(cur.weather_code);
 return {t:Math.round(cur.temperature_2m),c,d:c,icon,city:loc.city||'Ваш город',feels:Math.round(cur.apparent_temperature),hum:cur.relative_humidity_2m,wind:Math.round(cur.wind_speed_10m*10)/10,real:true,
  f:j.daily.time.slice(1,6).map((t,i)=>({d:WDAYS[new Date(t+'T12:00').getDay()],hi:Math.round(j.daily.temperature_2m_max[i+1]),lo:Math.round(j.daily.temperature_2m_min[i+1]),icon:WMO(j.daily.weather_code[i+1])[1]}))};}
Shell.applyWeather=function(W){this.weather=W;const t=$('#wbTemp'),c=$('#wbCond'),i=$('#wbIcon');if(t)t.textContent=W.t+'°C';if(c)c.textContent=W.c;if(i)i.innerHTML=W.icon();if(this.openPanel==='widgets'&&this.renderWidgets)this.renderWidgets();};
Shell.refreshWeather=async function(cityName){try{let loc=null;if(cityName){loc=await geoByName(cityName);if(!loc)throw new Error('Город не найден');LS.set('wloc',loc);}
  else loc=LS.get('wloc',null)||await geoByIp()||{lat:55.7558,lon:37.6173,city:'Москва'};
  const W=await fetchWeather(loc);this.applyWeather(W);return W;}catch(e){console.warn('weather',e);if(cityName)throw e;return null;}};
Shell.refreshWeather();setInterval(()=>Shell.refreshWeather(),15*60*1000);
addEventListener('online',()=>Shell.refreshWeather());
TERM_EXT.weather=function(t){const city=t.args.join(' ');if(city==='auto'){LS.set('wloc',null);}t.print('Запрашиваю погоду с open-meteo.com…','#888');
 Shell.refreshWeather(city&&city!=='auto'?city:null).then(W=>{if(!W)return t.print('Нет связи с сервером погоды (вы офлайн?)','#f66');
  t.print(`${W.city}: ${W.t}°C, ${W.c.toLowerCase()} · ощущается как ${W.feels}° · влажность ${W.hum}% · ветер ${W.wind} м/с`,'#61d6d6');t.print(W.f.map(f=>`${f.d} ${f.hi}°/${f.lo}°`).join('   '));}).catch(e=>t.print('Ошибка: '+e.message,'#f66'));};
TERM_EXT['погода']=TERM_EXT.weather;
TERM_EXT.deskreset=function(t){LS.set('deskPos',{});Shell.renderDesktop();t.print('Значки рабочего стола упорядочены.');};
if(window.TERM_HELP!=null)TERM_HELP+=`\n  weather [город|auto]  настоящая погода (open-meteo.com)\n  deskreset             упорядочить значки рабочего стола`;
