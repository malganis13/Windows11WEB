
/* ============================ BROWSERS ============================ */
addCSS(`
.br{display:flex;flex-direction:column;flex:1;min-height:0;background:var(--mica-solid);--bacc:#0f6cbd}
.br-tabs{display:flex;align-items:flex-end;gap:2px;padding:6px 8px 0;height:40px;background:var(--surface)}
.br-tab{display:flex;align-items:center;gap:8px;height:34px;padding:0 10px;min-width:60px;max-width:220px;flex:1 1 180px;border-radius:8px 8px 0 0;font-size:12px;color:var(--text-2);overflow:hidden}
.br-tab:hover{background:var(--hover)}.br-tab.on{background:var(--surface-solid);color:var(--text)}
.br-tab span.t{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.br-tab .ic{width:14px;height:14px}
.br-tab b{width:20px;height:20px;border-radius:4px;display:grid;place-items:center;font-weight:400}.br-tab b:hover{background:var(--hover)}
.br-new{width:30px;height:30px;border-radius:6px;font-size:18px;margin-bottom:2px}.br-new:hover{background:var(--hover)}
.br-bar{display:flex;align-items:center;gap:4px;padding:6px 8px;background:var(--surface-solid);border-bottom:1px solid var(--border)}
.br-bar>button{width:32px;height:32px;border-radius:6px;display:grid;place-items:center}.br-bar>button:hover{background:var(--hover)}.br-bar .ico{width:16px;height:16px}
.br-url{flex:1;height:32px;border-radius:16px;padding:0 14px;background:var(--input);border:1px solid var(--input-b);outline:none;color:var(--text)}
.br-url:focus{border-color:var(--bacc);box-shadow:0 0 0 1px var(--bacc)}
.br-badge{display:flex;align-items:center;gap:6px;padding:0 10px;height:28px;border-radius:14px;font-size:12px;background:var(--surface-2)}
.br-view{flex:1;position:relative;background:#fff;min-height:0}
.br-view iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}
.br-info{display:flex;align-items:center;gap:10px;padding:6px 12px;font-size:12px;background:var(--surface-2);border-bottom:1px solid var(--border)}
.br-info a{color:var(--bacc);cursor:pointer;text-decoration:underline}
.br-ntp{position:absolute;inset:0;overflow:auto;display:flex;flex-direction:column;align-items:center;padding-top:9vh;color:#fff;background:var(--ntp,linear-gradient(160deg,#0b2a4a,#0f6cbd 60%,#4cc2ff))}
.br-ntp .logo{width:84px;height:84px;margin-bottom:18px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.35))}
.br-ntp h1{font-weight:600;font-size:26px;margin-bottom:18px;text-shadow:0 2px 10px rgba(0,0,0,.3)}
.br-ntp form{width:min(620px,86%);display:flex;background:#fff;border-radius:24px;box-shadow:0 8px 30px rgba(0,0,0,.25);overflow:hidden}
.br-ntp form input{flex:1;border:0;outline:none;padding:14px 20px;font-size:15px;color:#111;background:transparent}
.br-ntp form button{padding:0 20px;color:#fff;background:var(--bacc)}
.br-tiles{display:grid;grid-template-columns:repeat(auto-fill,96px);gap:14px;justify-content:center;width:min(640px,90%);margin-top:30px}
.br-tiles button{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 4px;border-radius:10px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);color:#fff;font-size:12px}
.br-tiles button:hover{background:rgba(255,255,255,.26)}
.br-tiles i{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-style:normal;font-weight:700;font-size:18px;background:#fff;color:#333}
.br-tor{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#2b1640;color:#fff;z-index:3}
.br-tor .ic{width:90px;height:90px}.br-tor .p{width:300px;height:6px;border-radius:3px;background:rgba(255,255,255,.2);overflow:hidden}.br-tor .p i{display:block;height:100%;width:0;background:#7ed321;transition:width .3s}
`);
const BRW={
 edge:{name:'Microsoft Edge',icon:'edge',acc:'#0f6cbd',ntp:'linear-gradient(160deg,#08203d,#0f6cbd 55%,#35c1f1)',hello:'Добрый день',real:q=>'https://www.bing.com/search?q='+q,eng:'Bing'},
 chrome:{name:'Google Chrome',icon:'chrome',acc:'#1a73e8',ntp:'linear-gradient(#fff,#f1f3f4)',dark:true,hello:'Google',real:q=>'https://www.google.com/search?q='+q,eng:'Google'},
 firefox:{name:'Firefox',icon:'firefox',acc:'#ff7139',ntp:'linear-gradient(160deg,#20123a,#592acb 55%,#ff7139)',hello:'Firefox',real:q=>'https://www.google.com/search?q='+q,eng:'Google'},
 ddg:{name:'DuckDuckGo',icon:'ddg',acc:'#de5833',ntp:'linear-gradient(160deg,#3a1d12,#de5833)',hello:'Поиск без слежки',real:q=>'https://duckduckgo.com/?q='+q,eng:'DuckDuckGo'},
 tor:{name:'Tor Browser',icon:'tor',acc:'#7d4698',ntp:'linear-gradient(160deg,#1c0c2b,#59316b 60%,#7d4698)',hello:'Исследуйте. Анонимно.',real:q=>'https://duckduckgo.com/?q='+q,eng:'DuckDuckGo'},
 brave:{name:'Brave',icon:'brave',acc:'#fb542b',ntp:'linear-gradient(160deg,#1a1033,#3b1f6b 50%,#fb542b)',hello:'Brave',real:q=>'https://search.brave.com/search?q='+q,eng:'Brave Search'},
};
const TILES=[['G','Google','https://www.google.com/webhp?igu=1','#4285f4'],['W','Википедия','https://ru.m.wikipedia.org/','#333'],['⌖','Карты','https://www.openstreetmap.org/export/embed.html?bbox=37.52,55.70,37.72,55.80&layer=mapnik','#2e7d32'],['▶','YouTube','https://www.youtube.com/embed/dQw4w9WgXcQ','#ff0000'],['b','Bing','https://www.bing.com/','#0f6cbd'],['☁','Погода','https://wttr.in/Moscow?lang=ru','#00a2ed']];
function toFrameUrl(u){let m=/youtube\.com\/watch\?v=([\w-]+)/.exec(u)||/youtu\.be\/([\w-]+)/.exec(u);if(m)return 'https://www.youtube.com/embed/'+m[1];if(/^https?:\/\/(www\.)?google\.[a-z.]+\/?$/.test(u))return 'https://www.google.com/webhp?igu=1';return u;}
function browserLaunch(kind){const B=BRW[kind];return function(o={}){
 const root=el(`<div class="br"><div class="br-tabs"><button class="br-new" title="Новая вкладка">+</button></div><div class="br-bar"><button data-a="back" title="Назад"><span class="ico">${I.back}</span></button><button data-a="fwd" title="Вперёд"><span class="ico" style="transform:scaleX(-1)">${I.back}</span></button><button data-a="reload" title="Обновить"><span class="ico">${I.refresh}</span></button><button data-a="home" title="Домой">⌂</button><input class="br-url" spellcheck="false" placeholder="Поиск или адрес сайта"><span class="br-badge" hidden></span><button data-a="ext" title="Открыть в настоящем браузере">↗</button></div><div class="br-info" hidden></div><div class="br-view"></div></div>`);
 root.style.setProperty('--bacc',B.acc);
 const win=WM.create({app:kind,title:B.name,icon:AI[B.icon](),width:1080,height:700,content:root,minW:480,minH:320});
 const tabsEl=$('.br-tabs',root),view=$('.br-view',root),url=$('.br-url',root),info=$('.br-info',root),badge=$('.br-badge',root);
 let tabs=[],cur=null,shields=0;
 const isUrl=s=>/^(https?:\/\/|www\.)/i.test(s)||/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(s);
 const resolve=s=>{s=s.trim();if(!s)return '';if(isUrl(s))return /^https?:/i.test(s)?s:'https://'+s;return 'search:'+s;};
 const frameSrc=u=>u.startsWith('search:')?'https://www.google.com/search?igu=1&q='+encodeURIComponent(u.slice(7)):toFrameUrl(u);
 const realUrl=u=>u.startsWith('search:')?B.real(encodeURIComponent(u.slice(7))):u;
 const titleOf=u=>!u?'Новая вкладка':u.startsWith('search:')?u.slice(7)+' — Поиск':u.replace(/^https?:\/\/(www\.)?/,'').split('/')[0];
 function newTab(u=''){const t={id:Math.random(),url:'',hist:[],hi:-1};tabs.push(t);cur=t;if(u)go(u);else render();}
 function go(u,push=true){const t=cur;if(push){t.hist=t.hist.slice(0,t.hi+1);t.hist.push(u);t.hi=t.hist.length-1;}t.url=u;if(kind==='brave'&&u){shields+=3+Math.random()*12|0;}render();}
 function ntp(){const d=el(`<div class="br-ntp" style="--ntp:${B.ntp}"><span class="logo">${AI[B.icon]()}</span><h1 style="${B.dark?'color:#202124;text-shadow:none':''}">${esc(B.hello)}</h1><form><input placeholder="Поиск в интернете" autofocus><button>Поиск</button></form><div class="br-tiles">${TILES.map(([g,n,u,c])=>`<button data-u="${u}" style="${B.dark?'background:#fff;color:#202124;box-shadow:0 1px 4px rgba(0,0,0,.15)':''}"><i style="color:${c}">${g}</i>${n}</button>`).join('')}</div>${kind==='tor'?'<p style="margin-top:26px;opacity:.7;font-size:12px">🧅 Сеть Tor симулируется. Настоящей анонимности веб-страница не даёт.</p>':''}${kind==='brave'?`<p style="margin-top:26px;font-size:13px">🦁 Заблокировано трекеров и рекламы: <b>${shields}</b></p>`:''}</div>`);
  $('form',d).onsubmit=e=>{e.preventDefault();const v=$('input',d).value;if(v.trim())go(resolve(v));};$$('[data-u]',d).forEach(b=>b.onclick=()=>go(b.dataset.u));return d;}
 function render(){tabsEl.querySelectorAll('.br-tab').forEach(x=>x.remove());const nb=$('.br-new',tabsEl);
  tabs.forEach(t=>{const e=el(`<div class="br-tab${t===cur?' on':''}"><span class="ic">${AI[B.icon]()}</span><span class="t">${esc(titleOf(t.url))}</span><b>✕</b></div>`);e.onclick=ev=>{if(ev.target.tagName==='B'){closeTab(t);return;}cur=t;render();};tabsEl.insertBefore(e,nb);});
  const t=cur;url.value=t.url?(t.url.startsWith('search:')?t.url.slice(7):t.url):'';view.innerHTML='';
  if(!t.url){view.appendChild(ntp());info.hidden=true;setTimeout(()=>{const i=$('.br-ntp input',view);i&&i.focus();},30);}
  else{const f=document.createElement('iframe');f.src=frameSrc(t.url);f.setAttribute('referrerpolicy','no-referrer');f.setAttribute('allow','autoplay; fullscreen; encrypted-media');view.appendChild(f);
   info.hidden=false;info.innerHTML=`<span>🛡️ ${kind==='tor'?'Цепочка: Вы → 🇩🇪 → 🇳🇱 → 🇸🇪 → сайт. ':''}Если страница пустая — сайт запрещает открываться внутри других страниц.</span><a>Открыть в настоящем браузере ↗</a>`;$('a',info).onclick=()=>window.open(realUrl(t.url),'_blank','noopener');}
  WM.setTitle?WM.setTitle(win,titleOf(t.url)+' — '+B.name):0;
  if(kind==='brave'){badge.hidden=false;badge.textContent='🦁 '+shields;}if(kind==='tor'){badge.hidden=false;badge.textContent='🧅 Tor';}}
 function closeTab(t){const i=tabs.indexOf(t);tabs.splice(i,1);if(!tabs.length)return WM.close(win);if(cur===t)cur=tabs[Math.max(0,i-1)];render();}
 $('.br-new',root).onclick=()=>newTab();
 url.addEventListener('keydown',e=>{if(e.key==='Enter'){const r=resolve(url.value);r?go(r):go('');url.blur();}});url.addEventListener('focus',()=>url.select());
 $('.br-bar',root).addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const t=cur,a=b.dataset.a;
  if(a==='back'&&t.hi>0){t.hi--;go(t.hist[t.hi],false);}else if(a==='back'&&t.hi===0){t.hi=-1;go('',false);}
  else if(a==='fwd'&&t.hi<t.hist.length-1){t.hi++;go(t.hist[t.hi],false);}else if(a==='reload')render();else if(a==='home')go('');
  else if(a==='ext')window.open(t.url?realUrl(t.url):B.real(''),'_blank','noopener');});
 root.addEventListener('keydown',e=>{if(e.ctrlKey&&e.key.toLowerCase()==='t'){e.preventDefault();newTab();}if(e.ctrlKey&&e.key.toLowerCase()==='w'){e.preventDefault();closeTab(cur);}if(e.ctrlKey&&e.key.toLowerCase()==='l'){e.preventDefault();url.focus();}});
 newTab(o.url?resolve(o.url):'');
 if(kind==='tor'){const ov=el(`<div class="br-tor"><span class="ic">${AI.tor()}</span><b style="font-size:20px">Подключение к сети Tor</b><div class="p"><i></i></div><small class="st">Установка защищённого соединения…</small></div>`);view.parentNode.appendChild(ov);ov.style.top='0';const steps=['Загрузка списка реле…','Подключение к входному узлу…','Построение цепочки…','Готово!'];let p=0;const tm=setInterval(()=>{p+=12;$('i',ov).style.width=Math.min(100,p)+'%';$('.st',ov).textContent=steps[Math.min(3,p/30|0)];if(p>=110){clearInterval(tm);ov.remove();}},200);}
 return win;};}
Apps.register('edge',{name:'Microsoft Edge',icon:AI.edge,keywords:'edge браузер browser интернет internet сайт',launch:browserLaunch('edge')});
alias('edge','edge','msedge','эдж','браузер','browser');
[['chrome','Google LLC',4.6,'98 МБ','Самый популярный браузер в мире. Быстрый, с вкладками и поиском Google.',['chrome','хром','google chrome']],
 ['firefox','Mozilla',4.5,'62 МБ','Независимый браузер с открытым кодом от Mozilla.',['firefox','фаерфокс','лиса']],
 ['ddg','DuckDuckGo',4.4,'40 МБ','Браузер, который не следит за вами. Кнопка «настоящего» поиска открывает DuckDuckGo.',['ddg','duckduckgo','утка']],
 ['tor','The Tor Project',4.3,'85 МБ','Луковая маршрутизация, фиолетовая тема и имитация подключения к сети Tor.',['tor','тор','torbrowser']],
 ['brave','Brave Software',4.6,'110 МБ','Браузер со встроенной блокировкой рекламы и счётчиком Shields.',['brave','брейв']]].forEach(([id,dev,r,size,desc,names])=>{storeApp(id,{cat:'browser',dev,rating:r,size,desc,feat:['Вкладки (Ctrl+T / Ctrl+W)','Настоящий поиск в интернете','Кнопка ↗ — открыть страницу в реальном браузере']},{name:BRW[id].name,icon:AI[BRW[id].icon],keywords:'browser браузер '+names.join(' '),launch:browserLaunch(id)});alias(id,...names);});

/* ============================ CODE EDITORS / IDE ============================ */
addCSS(`
.ide{display:flex;flex-direction:column;flex:1;min-height:0;background:var(--e-bg);color:var(--e-fg);font-size:13px}
.ide-menu{display:flex;align-items:center;gap:2px;height:30px;padding:0 6px;background:var(--e-menu);font-size:12px;border-bottom:1px solid var(--e-line)}
.ide-menu button{padding:3px 8px;border-radius:4px}.ide-menu button:hover{background:rgba(127,127,127,.2)}
.ide-menu .run{margin-left:auto;display:flex;align-items:center;gap:6px;padding:3px 12px;background:var(--e-acc);color:#fff;border-radius:4px}
.ide-body{flex:1;display:flex;min-height:0}
.ide-act{width:44px;background:var(--e-act);display:flex;flex-direction:column;align-items:center;padding-top:6px;gap:4px}
.ide-act button{width:36px;height:36px;border-radius:4px;font-size:17px;opacity:.6}.ide-act button.on,.ide-act button:hover{opacity:1}.ide-act button.on{box-shadow:inset 2px 0 var(--e-acc)}
.ide-side{width:220px;background:var(--e-side);border-right:1px solid var(--e-line);overflow:auto;display:flex;flex-direction:column}
.ide-side h4{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;padding:10px 12px 6px;opacity:.75;display:flex;justify-content:space-between}
.ide-side h4 button{opacity:.8;padding:0 4px}
.ide-f{padding:3px 12px 3px 18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:default}.ide-f:hover{background:rgba(127,127,127,.15)}.ide-f.on{background:var(--e-sel)}
.ide-ext{display:flex;gap:10px;padding:8px 12px;border-bottom:1px solid var(--e-line)}.ide-ext i{width:34px;height:34px;flex:none;border-radius:6px;display:grid;place-items:center;font-style:normal;font-weight:700;color:#fff;font-size:13px}
.ide-ext b{display:block;font-size:12px}.ide-ext small{opacity:.7;font-size:11px;display:block;margin:2px 0 5px}.ide-ext button{font-size:11px;padding:2px 8px;border-radius:3px;background:var(--e-acc);color:#fff}.ide-ext button.off{background:rgba(127,127,127,.35)}
.ide-main{flex:1;display:flex;flex-direction:column;min-width:0}
.ide-tabs{display:flex;height:34px;background:var(--e-side);overflow-x:auto;flex:none}
.ide-tab{display:flex;align-items:center;gap:6px;padding:0 12px;border-right:1px solid var(--e-line);white-space:nowrap;opacity:.7;font-size:12px}.ide-tab.on{background:var(--e-bg);opacity:1;box-shadow:inset 0 1px var(--e-acc)}.ide-tab b{font-weight:400;padding:0 3px;border-radius:3px}.ide-tab b:hover{background:rgba(127,127,127,.3)}
.ide-ed{flex:1;position:relative;display:flex;min-height:0;font-family:var(--mono);font-size:13.5px;line-height:20px}
.ide-gut{width:48px;flex:none;text-align:right;padding:8px 10px 8px 0;color:var(--e-gut);overflow:hidden;white-space:pre;user-select:none}
.ide-code{flex:1;position:relative;overflow:hidden}
.ide-code pre,.ide-code textarea{position:absolute;inset:0;margin:0;padding:8px 12px;font:inherit;line-height:inherit;white-space:pre;tab-size:4;overflow:auto;border:0;outline:none;letter-spacing:0}
.ide-code pre{pointer-events:none;color:var(--e-fg)}
.ide-code textarea{background:transparent;color:transparent;caret-color:var(--e-caret);resize:none}
.ide-code textarea::selection{background:var(--e-sel);color:transparent}
.ide-empty{flex:1;display:grid;place-items:center;opacity:.5;font-size:15px;text-align:center}
.ide-panel{height:170px;flex:none;border-top:1px solid var(--e-line);display:flex;flex-direction:column;background:var(--e-bg)}
.ide-panel .ph{display:flex;gap:16px;padding:6px 12px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;opacity:.8}.ide-panel .ph span.on{border-bottom:1px solid var(--e-acc)}
.ide-panel pre{flex:1;overflow:auto;padding:4px 12px;font-family:var(--mono);font-size:12.5px;white-space:pre-wrap;margin:0}
.ide-panel iframe{flex:1;border:0;background:#fff}
.ide-status{height:22px;display:flex;align-items:center;gap:16px;padding:0 10px;font-size:11.5px;background:var(--e-status);color:var(--e-status-fg)}
.ide-status span:first-child{margin-right:auto}
.tk-k{color:var(--e-kw)}.tk-s{color:var(--e-str)}.tk-c{color:var(--e-com);font-style:italic}.tk-n{color:var(--e-num)}.tk-f{color:var(--e-fn)}.tk-t{color:var(--e-type)}
.tk-b0{color:#ffd700}.tk-b1{color:#da70d6}.tk-b2{color:#179fff}
`);
const IDE_SKIN={
 vscode:{name:'Visual Studio Code',icon:'vscode',vars:'--e-bg:#1e1e1e;--e-fg:#d4d4d4;--e-menu:#323233;--e-act:#333333;--e-side:#252526;--e-line:#2b2b2b;--e-sel:#264f78;--e-gut:#858585;--e-caret:#aeafad;--e-acc:#0078d4;--e-status:#007acc;--e-status-fg:#fff;--e-kw:#569cd6;--e-str:#ce9178;--e-com:#6a9955;--e-num:#b5cea8;--e-fn:#dcdcaa;--e-type:#4ec9b0',extTitle:'Расширения',builtin:['js','html','css','json','md','txt']},
 vs:{name:'Visual Studio Community 2022',icon:'vs',vars:'--e-bg:#1e1e1e;--e-fg:#dcdcdc;--e-menu:#2d2d30;--e-act:#2d2d30;--e-side:#252526;--e-line:#3f3f46;--e-sel:#264f78;--e-gut:#2b91af;--e-caret:#fff;--e-acc:#68217a;--e-status:#68217a;--e-status-fg:#fff;--e-kw:#569cd6;--e-str:#d69d85;--e-com:#57a64a;--e-num:#b5cea8;--e-fn:#dcdcaa;--e-type:#4ec9b0',extTitle:'Рабочие нагрузки',builtin:['cs','cpp','c','h','js','html','css','txt']},
 sublime:{name:'Sublime Text',icon:'sublime',vars:'--e-bg:#272822;--e-fg:#f8f8f2;--e-menu:#1e1f1c;--e-act:#1e1f1c;--e-side:#1e1f1c;--e-line:#3e3d32;--e-sel:#49483e;--e-gut:#90908a;--e-caret:#f8f8f0;--e-acc:#ff9800;--e-status:#1e1f1c;--e-status-fg:#c0c0b0;--e-kw:#f92672;--e-str:#e6db74;--e-com:#75715e;--e-num:#ae81ff;--e-fn:#a6e22e;--e-type:#66d9ef',extTitle:'Package Control',builtin:['js','py','html','css','json','md','txt']},
 npp:{name:'Notepad++',icon:'npp',vars:'--e-bg:#ffffff;--e-fg:#000;--e-menu:#f0f0f0;--e-act:#e8e8e8;--e-side:#f5f5f5;--e-line:#d0d0d0;--e-sel:#c0e0ff;--e-gut:#808080;--e-caret:#000;--e-acc:#2e7d32;--e-status:#f0f0f0;--e-status-fg:#333;--e-kw:#0000ff;--e-str:#808080;--e-com:#008000;--e-num:#ff8000;--e-fn:#8000ff;--e-type:#8000ff',extTitle:'Плагины',builtin:['txt','md','json','html','css','js']},
};
const EXTS=[
 {id:'python',n:'Python',d:'Запуск .py (встроенный мини-интерпретатор)',c:'#3776ab',g:'Py',lang:['py']},
 {id:'cpp',n:'C/C++',d:'Компиляция и запуск .cpp / .c',c:'#00599c',g:'C++',lang:['cpp','c','h']},
 {id:'csharp',n:'C# Dev Kit',d:'Запуск консольных приложений .cs',c:'#68217a',g:'C#',lang:['cs']},
 {id:'java',n:'Extension Pack for Java',d:'Запуск .java',c:'#e76f00',g:'J',lang:['java']},
 {id:'live',n:'Live Server',d:'Живой предпросмотр HTML при наборе',c:'#41b883',g:'((o))'},
 {id:'prettier',n:'Prettier',d:'Shift+Alt+F — красиво расставить отступы',c:'#1a2b34',g:'P'},
 {id:'rainbow',n:'Rainbow Brackets',d:'Разноцветные скобки — красиво же',c:'#e040fb',g:'{ }'},
 {id:'copilot',n:'GitHub Copilot',d:'Ctrl+Space — ИИ допишет код (почти)',c:'#24292e',g:'✦'},
 {id:'pony',n:'Pony Pink Theme',d:'Розовая тема редактора 🦄',c:'#ff5fa2',g:'🦄'},
 {id:'discord',n:'Discord Presence',d:'Друзья увидят, что ты кодишь в 3 ночи',c:'#5865f2',g:'D'},
 {id:'coffee',n:'Кофемашина.js',d:'Варит кофе после каждой сборки ☕',c:'#6d4c41',g:'☕'},
];
const LANGN={js:'JavaScript',html:'HTML',css:'CSS',json:'JSON',md:'Markdown',txt:'Обычный текст',py:'Python',cpp:'C++',c:'C',h:'C/C++ Header',cs:'C#',java:'Java',ts:'TypeScript'};
const KW={js:'break case catch class const continue default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while yield async await of true false null undefined',
 py:'and as assert break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield print range len',
 c:'auto bool break case char class const continue default delete do double else enum extern false float for if include int long namespace new private protected public return short signed sizeof static struct switch template this true try typedef unsigned using virtual void while std cout cin endl string vector',
 cs:'abstract as base bool break case catch char class const continue decimal default do double else enum false finally float for foreach if in int interface internal is long namespace new null object out override private protected public readonly return static string struct switch this throw true try using var void while Console WriteLine',
 java:'abstract boolean break case catch char class continue default do double else extends false final float for if implements import int interface long new null package private protected public return static String super switch this throw true try void while System out println'};
KW.cpp=KW.c;KW.h=KW.c;KW.ts=KW.js+' interface type number string boolean any';
const KWS={};for(const k in KW)KWS[k]=new Set(KW[k].split(' '));
function hl(code,lang,rainbow){const esc2=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 if(lang==='html'||lang==='xml')return esc2(code).replace(/(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([\w-]+)|(\s[\w-]+)(=)("[^"]*")/g,(m,c,lt,tag,attr,eq,val)=>c?`<span class="tk-c">${c}</span>`:tag?`${lt}<span class="tk-k">${tag}</span>`:`<span class="tk-f">${attr}</span>${eq}<span class="tk-s">${val}</span>`);
 const kw=KWS[lang];if(!kw)return esc2(code);let depth=0;
 const re=lang==='py'?/(#.*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\s*\()|([A-Za-z_]\w*)|([()[\]{}])/g:/(\/\/.*|\/\*[\s\S]*?\*\/|^\s*#.*)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\s*\()|([A-Za-z_$]\w*)|([()[\]{}])/gm;
 let out='',last=0;code.replace(re,(m,c,s,n,f,w,b,i)=>{out+=esc2(code.slice(last,i));last=i+m.length;
  if(c)out+=`<span class="tk-c">${esc2(c)}</span>`;else if(s)out+=`<span class="tk-s">${esc2(s)}</span>`;else if(n)out+=`<span class="tk-n">${n}</span>`;
  else if(f)out+=kw.has(f)?`<span class="tk-k">${f}</span>`:`<span class="tk-f">${f}</span>`;else if(w)out+=kw.has(w)?`<span class="tk-k">${w}</span>`:/^[A-Z]/.test(w)?`<span class="tk-t">${w}</span>`:w;
  else if(b){if(rainbow){if('([{'.includes(b)){out+=`<span class="tk-b${depth%3}">${b}</span>`;depth++;}else{depth=Math.max(0,depth-1);out+=`<span class="tk-b${depth%3}">${b}</span>`;}}else out+=b;}return m;});
 return out+esc2(code.slice(last));}
/* ---- toy compilers ---- */
function pyToJs(src){const L=src.replace(/\t/g,'    ').split('\n');const out=[];const st=[0];
 const ex=s=>s.replace(/\bTrue\b/g,'true').replace(/\bFalse\b/g,'false').replace(/\bNone\b/g,'null').replace(/\band\b/g,'&&').replace(/\bor\b/g,'||').replace(/\bnot\s+/g,'!').replace(/\blen\(/g,'__len(').replace(/\bstr\(/g,'String(').replace(/\bint\(/g,'__int(').replace(/\bfloat\(/g,'parseFloat(').replace(/\binput\(/g,'__input(').replace(/\bprint\(/g,'__print(').replace(/\babs\(/g,'Math.abs(').replace(/\bmax\(/g,'__max(').replace(/\bmin\(/g,'__min(').replace(/\bsum\(/g,'__sum(').replace(/\.append\(/g,'.push(').replace(/\/\//g,'__FD__')
  .replace(/f"((?:[^"\\]|\\.)*)"|f'((?:[^'\\]|\\.)*)'/g,(m,a,b)=>'`'+(a??b).replace(/\{([^}]*)\}/g,'${$1}')+'`');
 for(let raw of L){const code=raw.replace(/(^|[^"'])#.*$/,'$1');if(!code.trim())continue;const ind=code.match(/^ */)[0].length;let s=code.trim();
  while(ind<st[st.length-1]){st.pop();out.push('}');}
  let m;const block=s.endsWith(':');if(block)s=s.slice(0,-1);
  if(/^(import|from)\s/.test(s))continue;
  if(m=/^def\s+(\w+)\s*\((.*)\)$/.exec(s))s=`function ${m[1]}(${m[2]}){`;
  else if(m=/^elif\s+(.*)$/.exec(s))s=`else if(${ex(m[1])}){`;else if(/^else$/.test(s))s='else{';
  else if(m=/^if\s+(.*)$/.exec(s))s=`if(${ex(m[1])}){`;else if(m=/^while\s+(.*)$/.exec(s))s=`while(${ex(m[1])}){`;
  else if(m=/^for\s+(\w+)\s+in\s+range\((.*)\)$/.exec(s))s=`for(let ${m[1]} of __range(${ex(m[2])})){`;
  else if(m=/^for\s+(\w+)\s+in\s+(.*)$/.exec(s))s=`for(let ${m[1]} of __iter(${ex(m[2])})){`;
  else if(/^class\s/.test(s))throw new Error('Классы мини-интерпретатор пока не умеет 😅');
  else if(s==='pass')s=';';else if(m=/^([A-Za-z_]\w*)\s*=(?!=)\s*(.*)$/.exec(s))s=`var ${m[1]}=${ex(m[2])};`;
  else s=ex(s)+';';
  out.push(s);if(block){st.push(Infinity);}
  if(block){const next=L.slice(L.indexOf(raw)+1).find(x=>x.replace(/#.*/,'').trim());st[st.length-1]=next?next.match(/^ */)[0].length:ind+4;}}
 while(st.length>1){st.pop();out.push('}');}
 return out.join('\n').replace(/__FD__/g,'/');}
function cToJs(src){let s=src.replace(/^\s*#.*$/gm,'').replace(/^\s*using\s+[^;]*;/gm,'').replace(/^\s*(package|import)\s+[^;]*;/gm,'').replace(/\bnamespace\s+[\w.]+\s*\{/g,'{');
 s=s.replace(/(?:public\s+|private\s+|internal\s+)?(?:static\s+)?(?:final\s+)?class\s+\w+\s*\{/g,'{');
 s=s.replace(/(?:(?:public|private|protected|static|inline|const)\s+)*(?:void|int|double|float|string|String|bool|boolean|long|char|auto|var)\s*(?:\[\])?\s+(\w+)\s*\(([^)]*)\)\s*\{/g,(m,n,p)=>`var ${n}=function(${p.split(',').map(x=>x.trim().split(/[\s*&\]]+/).pop()).filter(Boolean).join(',')}){`);
 s=s.replace(/(?:std::)?cout\s*<<([^;]*);/g,(m,a)=>`__out(${a.split('<<').map(x=>x.trim()).join(',')});`).replace(/(?:std::)?endl/g,'"\\n"');
 s=s.replace(/(?:std::)?cin\s*>>\s*(\w+)\s*;/g,'$1=__input();').replace(/Console\.WriteLine\(/g,'__println(').replace(/Console\.Write\(/g,'__out(').replace(/System\.out\.println\(/g,'__println(').replace(/System\.out\.print\(/g,'__out(').replace(/\bprintf\(/g,'__printf(').replace(/\bputs\(/g,'__println(').replace(/Console\.ReadLine\(\)/g,'__input()');
 s=s.replace(/\b(?:const\s+)?(?:unsigned\s+)?(?:int|long|float|double|char|bool|boolean|string|String|var|auto|short)\s*(?:\[\])?\s+(?=[A-Za-z_])/g,'let ').replace(/std::/g,'').replace(/\$"((?:[^"\\]|\\.)*)"/g,(m,a)=>'`'+a.replace(/\{([^}]*)\}/g,'${$1}')+'`').replace(/(\d)f\b/g,'$1');
 return s+'\n;if(typeof main==="function")main();else if(typeof Main==="function")Main([]);';}
function runCode(lang,code,out){const buf=[];const w=s=>{buf.push(s);};const fmt=v=>typeof v==='object'&&v!==null?JSON.stringify(v):String(v);
 const env={__print:(...a)=>w(a.map(fmt).join(' ')+'\n'),__out:(...a)=>w(a.map(fmt).join('')),__println:(...a)=>w(a.map(fmt).join('')+'\n'),__printf:(f,...a)=>{let i=0;w(String(f).replace(/%[-\d.]*[dfsci]/g,m=>{const v=a[i++];return /f/.test(m)?Number(v).toFixed(/\.(\d)/.exec(m)?.[1]??6):String(v)}).replace(/\\n/g,'\n'));},
  __range:(a,b,c)=>{if(b===undefined){b=a;a=0}c=c||1;const r=[];for(let i=a;c>0?i<b:i>b;i+=c)r.push(i);return r},__iter:x=>typeof x==='string'?[...x]:Array.isArray(x)?x:Object.keys(x),__len:x=>x.length??Object.keys(x).length,__int:x=>parseInt(x),__input:(p)=>prompt(p||'Ввод:')||'',__max:(...a)=>Math.max(...(a.length===1?a[0]:a)),__min:(...a)=>Math.min(...(a.length===1?a[0]:a)),__sum:a=>a.reduce((x,y)=>x+y,0),
  console:{log:(...a)=>w(a.map(fmt).join(' ')+'\n'),error:(...a)=>w('❌ '+a.map(fmt).join(' ')+'\n'),warn:(...a)=>w('⚠ '+a.map(fmt).join(' ')+'\n'),info:(...a)=>w(a.map(fmt).join(' ')+'\n')}};
 let js=code;if(lang==='py')js=pyToJs(code);else if(['c','cpp','cs','java'].includes(lang))js=cToJs(code);
 const t0=performance.now();let steps=0;js=js.replace(/\b(while\s*\([^)]*\)\s*\{|for\s*\([^)]*\)\s*\{)/g,'$1if(++__steps>2e6)throw new Error("Слишком долго — возможно, бесконечный цикл");');
 try{new Function(...Object.keys(env),'__steps',js)(...Object.values(env),0);}catch(e){buf.push('\n❌ '+(e.name||'Error')+': '+e.message+'\n');return {ok:false,text:buf.join(''),ms:performance.now()-t0};}
 return {ok:true,text:buf.join(''),ms:performance.now()-t0};}
const SAMPLES={'hello.js':`// JavaScript запускается по-настоящему! Нажми F5\nfunction fib(n){ return n < 2 ? n : fib(n-1) + fib(n-2); }\nfor (let i = 1; i <= 10; i++) {\n  console.log(\`fib(\${i}) = \${fib(i)}\`);\n}\nconsole.log('Привет из Windows11WEB!', [1,2,3].map(x => x * x));\n`,
 'index.html':`<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; background: linear-gradient(135deg,#667eea,#764ba2); color: white; display: grid; place-items: center; height: 90vh; }\n    button { padding: 10px 20px; border: 0; border-radius: 8px; font-size: 16px; }\n  </style>\n</head>\n<body>\n  <div>\n    <h1>Мой сайт 🚀</h1>\n    <button onclick="this.textContent = 'Нажато ' + (++n)">Нажми</button>\n  </div>\n  <script>let n = 0;<\/script>\n</body>\n</html>\n`,
 'main.py':`# Python (нужно расширение Python)\ndef square(x):\n    return x * x\n\nnames = ["Пони", "Рыцарь", "Хакер"]\nfor name in names:\n    print(f"Привет, {name}!")\n\ntotal = 0\nfor i in range(1, 6):\n    total += square(i)\nprint("Сумма квадратов:", total)\nif total > 50:\n    print("Больше 50")\nelse:\n    print("Не больше 50")\n`,
 'main.cpp':`#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    return n <= 1 ? 1 : n * factorial(n - 1);\n}\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    for (int i = 1; i <= 5; i++) {\n        cout << i << "! = " << factorial(i) << endl;\n    }\n    return 0;\n}\n`,
 'Program.cs':`using System;\n\nnamespace HelloApp\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine("Привет из C#!");\n            int sum = 0;\n            for (int i = 0; i < 10; i++) sum += i;\n            Console.WriteLine($"Сумма 0..9 = {sum}");\n        }\n    }\n}\n`,
 'Main.java':`public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n        for (int i = 3; i > 0; i--) System.out.println("Обратный отсчёт: " + i);\n    }\n}\n`};
const PROJ='C:\\Users\\User\\Documents\\Проекты';
function ensureSamples(){if(!VFS.isDir(PROJ))VFS.mkdir(PROJ);if(!LS.get('samples2',false)){for(const [n,c] of Object.entries(SAMPLES))if(!VFS.exists(PROJ+'\\'+n))VFS.write(PROJ+'\\'+n,c);LS.set('samples2',true);}}
function ideLaunch(kind){const K=IDE_SKIN[kind];return function(o={}){ensureSamples();
 const exts=new Set(LS.get('ext.'+kind,[]));const has=x=>exts.has(x);
 const root=el(`<div class="ide" style="${K.vars}"><div class="ide-menu">${['Файл','Правка','Вид',kind==='vs'?'Проект':'Переход',kind==='vs'?'Сборка':'Выполнить','Справка'].map(x=>`<button>${x}</button>`).join('')}<button class="run" title="F5">▶ ${kind==='vs'?'Отладка':'Запуск'}</button></div><div class="ide-body">${kind==='vscode'||kind==='vs'?'<div class="ide-act"><button data-v="files" class="on" title="Проводник">🗂</button><button data-v="ext" title="'+K.extTitle+'">🧩</button></div>':''}<div class="ide-side"></div><div class="ide-main"><div class="ide-tabs"></div><div class="ide-ed"></div><div class="ide-panel"><div class="ph"><span class="on">${kind==='vs'?'Вывод':'Терминал'}</span><span>Проблемы</span></div><pre></pre></div></div></div><div class="ide-status"><span class="s1"></span><span class="s2"></span><span class="s3"></span><span>UTF-8</span></div></div>`);
 const win=WM.create({app:kind,title:K.name,icon:AI[K.icon](),width:1100,height:700,content:root,minW:560,minH:360});
 const side=$('.ide-side',root),tabsEl=$('.ide-tabs',root),ed=$('.ide-ed',root),panel=$('.ide-panel',root),outEl=$('.ide-panel pre',root);
 let view='files',open=[],cur=null;
 const applyPony=()=>{if(has('pony'))root.style.cssText=K.vars+';--e-bg:#2a1630;--e-side:#351b3d;--e-menu:#3d1f47;--e-act:#3d1f47;--e-acc:#ff5fa2;--e-status:#ff5fa2;--e-kw:#ff8fc7;--e-str:#ffe28a;--e-fn:#9ff3ff;--e-sel:#6b2a5e';else root.style.cssText=K.vars;};applyPony();
 const canRun=l=>K.builtin.includes(l)&&l!=='txt'&&l!=='md'&&l!=='json'&&l!=='css'||EXTS.some(e=>e.lang&&e.lang.includes(l)&&has(e.id));
 const extFor=l=>EXTS.find(e=>e.lang&&e.lang.includes(l));
 function renderSide(){if(view==='ext'||(view==='files'&&false)){}
  if(view==='ext'){side.innerHTML=`<h4>${K.extTitle}</h4>`+EXTS.map(e=>`<div class="ide-ext"><i style="background:${e.c}">${e.g}</i><div><b>${e.n}</b><small>${e.d}</small><button data-x="${e.id}" class="${has(e.id)?'off':''}">${has(e.id)?'Удалить':'Установить'}</button></div></div>`).join('');return;}
  const L=(VFS.list(PROJ)||[]).filter(f=>f.type==='file');side.innerHTML=`<h4>${kind==='vs'?'Обозреватель решений':'ПРОЕКТЫ'}<span><button data-new title="Новый файл">＋</button></span></h4>`+L.map(f=>`<div class="ide-f${cur&&cur.path===f.path?' on':''}" data-p="${esc(f.path)}">${fileGlyph(f.name)} ${esc(f.name)}</div>`).join('')+((kind==='sublime'||kind==='npp')?`<h4 style="margin-top:10px">${K.extTitle}<span><button data-pk>…</button></span></h4>`:'');}
 const fileGlyph=n=>({js:'🟨',html:'🟧',css:'🟦',py:'🐍',cpp:'➕',c:'©',cs:'#️⃣',java:'☕',json:'{}',md:'📝'})[VFS.ext(n)]||'📄';
 function openFile(p){let t=open.find(x=>x.path===p);if(!t){const c=VFS.read(p);if(c==null)return;t={path:p,text:c,dirty:false};open.push(t);}cur=t;render();}
 function render(){renderSide();tabsEl.innerHTML=open.map((t,i)=>`<div class="ide-tab${t===cur?' on':''}" data-i="${i}">${fileGlyph(t.path)} ${esc(VFS.basename(t.path))}${t.dirty?' ●':''}<b data-c="${i}">✕</b></div>`).join('');
  ed.innerHTML='';if(!cur){ed.innerHTML=`<div class="ide-empty"><div><div style="font-size:46px;margin-bottom:10px">${kind==='sublime'?'S':'&lt;/&gt;'}</div>${K.name}<br><small>Откройте файл слева · Ctrl+S — сохранить · F5 — запуск</small></div></div>`;status();return;}
  const lang=VFS.ext(cur.path);const gut=el('<div class="ide-gut"></div>'),wrap=el('<div class="ide-code"><pre></pre><textarea spellcheck="false" autocomplete="off" wrap="off"></textarea></div>');ed.append(gut,wrap);
  const pre=$('pre',wrap),ta=$('textarea',wrap);ta.value=cur.text;
  const paint=()=>{pre.innerHTML=hl(ta.value,lang,has('rainbow'))+'\n';const n=ta.value.split('\n').length;gut.textContent=Array.from({length:n},(_,i)=>i+1).join('\n');pre.scrollTop=ta.scrollTop;pre.scrollLeft=ta.scrollLeft;gut.scrollTop=ta.scrollTop;};paint();
  ta.addEventListener('scroll',()=>{pre.scrollTop=ta.scrollTop;pre.scrollLeft=ta.scrollLeft;gut.scrollTop=ta.scrollTop;});
  ta.addEventListener('input',()=>{cur.text=ta.value;if(!cur.dirty){cur.dirty=true;tabsEl.querySelector('.ide-tab.on')&&(tabsEl.querySelector('.ide-tab.on').firstChild.textContent+='');renderTabsOnly();}paint();status(ta);if(lang==='html'&&has('live'))run(true);});
  ta.addEventListener('keyup',()=>status(ta));ta.addEventListener('click',()=>status(ta));
  ta.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const s=ta.selectionStart;ta.setRangeText('    ',s,ta.selectionEnd,'end');ta.dispatchEvent(new Event('input'));}
   if(e.key==='Enter'){const s=ta.selectionStart;const line=ta.value.slice(0,s).split('\n').pop();let ind=line.match(/^\s*/)[0];if(/[{:(\[]\s*$/.test(line))ind+='    ';e.preventDefault();ta.setRangeText('\n'+ind,s,ta.selectionEnd,'end');ta.dispatchEvent(new Event('input'));}
   const pairs={'(':')','[':']','{':'}','"':'"',"'":"'"};if(pairs[e.key]&&ta.selectionStart===ta.selectionEnd&&!e.ctrlKey){e.preventDefault();const s=ta.selectionStart;ta.setRangeText(e.key+pairs[e.key],s,s,'start');ta.selectionStart=ta.selectionEnd=s+1;ta.dispatchEvent(new Event('input'));}
   if(e.ctrlKey&&e.code==='Space'){e.preventDefault();if(!has('copilot'))return log('Установите расширение GitHub Copilot.\n');const sug=['// TODO: сделать красиво','// Этот код работает, не трогай','// Здесь был пони 🦄','console.log("привет, мир");'];const pick=lang==='py'?'print("Дописано ИИ 🤖")':sug[Math.random()*sug.length|0];ta.setRangeText(pick,ta.selectionStart,ta.selectionEnd,'end');ta.dispatchEvent(new Event('input'));}
   if(e.shiftKey&&e.altKey&&e.code==='KeyF'){e.preventDefault();if(!has('prettier'))return log('Установите Prettier.\n');ta.value=format(ta.value);ta.dispatchEvent(new Event('input'));log('✨ Prettier: файл отформатирован\n');}});
  setTimeout(()=>ta.focus(),20);status(ta);}
 function renderTabsOnly(){const on=open.indexOf(cur);const tb=tabsEl.children[on];if(tb&&!/●/.test(tb.textContent))tb.insertBefore(document.createTextNode(' ●'),tb.lastChild);}
 function status(ta){$('.s1',root).textContent=kind==='vs'?'Готово':(cur?VFS.basename(cur.path):K.name);if(ta){const b=ta.value.slice(0,ta.selectionStart).split('\n');$('.s2',root).textContent=`Стр ${b.length}, стлб ${b[b.length-1].length+1}`;}else $('.s2',root).textContent='';$('.s3',root).textContent=cur?(LANGN[VFS.ext(cur.path)]||'Текст'):'';}
 const format=src=>{let d=0;return src.split('\n').map(l=>{const t=l.trim();if(/^[}\])]/.test(t))d=Math.max(0,d-1);const r=(t?'    '.repeat(d):'')+t;const o=(t.match(/[{[(]/g)||[]).length-(t.match(/[}\])]/g)||[]).length+(/^[}\])]/.test(t)?1:0);d=Math.max(0,d+o);return r;}).join('\n');};
 const log=s=>{panel.querySelector('iframe')?.remove();outEl.hidden=false;outEl.textContent+=s;outEl.scrollTop=outEl.scrollHeight;};
 function save(){if(!cur)return;VFS.write(cur.path,cur.text);cur.dirty=false;render();log(`Сохранено: ${cur.path}\n`);}
 function run(live){if(!cur)return;const lang=VFS.ext(cur.path);if(!live){outEl.textContent='';}
  if(!canRun(lang)){const e=extFor(lang);return log(e?`⚠ Для запуска ${LANGN[lang]} установите «${e.n}» в разделе «${K.extTitle}»${kind==='vscode'||kind==='vs'?' (🧩 слева)':' (кнопка … в боковой панели)'}.\n`:`Файлы «${LANGN[lang]||lang}» не запускаются.\n`);}
  if(lang==='html'){outEl.hidden=true;let f=panel.querySelector('iframe');if(!f){f=document.createElement('iframe');f.setAttribute('sandbox','allow-scripts allow-modals');panel.appendChild(f);}f.srcdoc=cur.text;panel.style.height='45%';return;}
  panel.style.height='';
  const pre={js:'node',py:'python',cpp:'g++',c:'gcc',cs:'dotnet run',java:'javac && java'}[lang];if(kind==='vs'&&lang!=='js')log(`Сборка началась…\n1>------ Сборка: проект: ${VFS.basename(cur.path)}, Конфигурация: Debug x64 ------\n`);else log(`PS ${PROJ}> ${pre} ${VFS.basename(cur.path)}\n`);
  const r=runCode(lang,cur.text);log(r.text||(r.ok?'(нет вывода)\n':''));log(kind==='vs'?`========== Сборка: ${r.ok?'успешно: 1':'с ошибками: 1'} ==========\n`:`\n[Завершено за ${r.ms.toFixed(1)} мс, код ${r.ok?0:1}]\n`);
  if(has('coffee'))Shell.notify({title:'Кофемашина.js',body:'☕ Ваш кофе готов! Сборка — тоже.',icon:AI[K.icon]()});}
 root.addEventListener('click',e=>{const t=e.target;const f=t.closest('[data-p]'),tb=t.closest('[data-i]'),c=t.closest('[data-c]'),x=t.closest('[data-x]'),v=t.closest('[data-v]');
  if(c){e.stopPropagation();const i=+c.dataset.c;const was=open[i];open.splice(i,1);if(cur===was)cur=open[Math.max(0,i-1)]||null;return render();}
  if(f)return openFile(f.dataset.p);if(tb){cur=open[+tb.dataset.i];return render();}
  if(v){view=v.dataset.v;$$('.ide-act button',root).forEach(b=>b.classList.toggle('on',b===v));return renderSide();}
  if(t.closest('[data-pk]')){view='ext';return renderSide();}
  if(x){const id=x.dataset.x;if(has(id))exts.delete(id);else{exts.add(id);log(`Установлено расширение: ${EXTS.find(e=>e.id===id).n}\n`);if(id==='discord')Shell.notify({title:'Discord',body:'Теперь все друзья видят: «Кодит в '+K.name+'» 👀'});}LS.set('ext.'+kind,[...exts]);applyPony();if(cur)render();else renderSide();Sound.click();return;}
  if(t.closest('[data-new]')){Shell.prompt?Shell.prompt('Новый файл','Имя файла:','script.js').then(n=>{if(n){const p=PROJ+'\\'+n;if(!VFS.exists(p))VFS.write(p,'');openFile(p);}}):(()=>{const n=prompt('Имя файла:','script.js');if(n){const p=PROJ+'\\'+n;if(!VFS.exists(p))VFS.write(p,'');openFile(p);}})();return;}
  if(t.closest('.run'))run();
  if(t.closest('.ide-menu button')&&!t.closest('.run')){const lbl=t.textContent;if(/Файл/.test(lbl))save();else if(/Выполнить|Сборка/.test(lbl))run();else if(/Справка/.test(lbl))log(`${K.name} — Windows11WEB Edition\nF5 запуск · Ctrl+S сохранить · Shift+Alt+F формат · Ctrl+Space Copilot\nJS и HTML выполняются по-настоящему; Python/C++/C#/Java — упрощённым транслятором (простые программы).\n`);}});
 root.addEventListener('keydown',e=>{if(e.key==='F5'){e.preventDefault();run();}if(e.ctrlKey&&e.key.toLowerCase()==='s'){e.preventDefault();save();}if(e.ctrlKey&&e.key==='b'&&kind==='sublime'){e.preventDefault();run();}});
 Bus.on('fs',()=>{if(win.el.isConnected&&view==='files')renderSide();});
 if(o.path&&VFS.exists(o.path))openFile(o.path);else{const first=kind==='vs'?'Program.cs':kind==='sublime'?'main.py':kind==='npp'?'index.html':'hello.js';if(VFS.exists(PROJ+'\\'+first))openFile(PROJ+'\\'+first);else render();}
 log(kind==='vs'?'Visual Studio Community 2022 — готов к работе.\n':`${K.name}: проект ${PROJ}\n`);
 return win;};}
[['vscode','Microsoft',4.8,'95 МБ','Легкий и мощный редактор кода: подсветка, вкладки, расширения, запуск JS/HTML и (с расширениями) Python, C++, C#, Java.',['code','vscode','vs code','вс код']],
 ['vs','Microsoft',4.7,'3,2 ГБ','Полноценная IDE: Сборка/Отладка, обозреватель решений, рабочие нагрузки. C# и C++ из коробки.',['devenv','visual studio','vs community','вижуал студио']],
 ['sublime','Sublime HQ',4.6,'18 МБ','Скоростной редактор с темой Monokai. Ctrl+B — Build.',['sublime','subl','саблайм']],
 ['npp','Don Ho',4.5,'6 МБ','Классический редактор с подсветкой и плагинами.',['notepad++','npp','нотпад++']]].forEach(([id,dev,r,size,desc,names])=>{storeApp(id,{cat:'dev',dev,rating:r,size,desc,feat:['Подсветка синтаксиса и номера строк','F5 — запуск кода, Ctrl+S — сохранение','Расширения: Python, C/C++, C#, Java, Prettier, Copilot, Live Server…']},{name:IDE_SKIN[id].name,icon:AI[IDE_SKIN[id].icon],keywords:'code ide редактор программирование '+names.join(' '),launch:ideLaunch(id)});alias(id,...names);});
