
/* ============================ MATH PARSER (no eval) ============================ */
function evalExpr(src,deg){let s=String(src).replace(/\s+/g,'').replace(/[×∙·]/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/π/g,'pi').replace(/,/g,'.');let i=0;
 const peek=()=>s[i],eat=c=>{if(s[i]===c){i++;return true}return false};
 const toR=x=>deg?x*Math.PI/180:x,fromR=x=>deg?x*180/Math.PI:x;
 const F={sin:x=>Math.sin(toR(x)),cos:x=>Math.cos(toR(x)),tan:x=>Math.tan(toR(x)),asin:x=>fromR(Math.asin(x)),acos:x=>fromR(Math.acos(x)),atan:x=>fromR(Math.atan(x)),ln:Math.log,log:Math.log10,sqrt:Math.sqrt,abs:Math.abs,exp:Math.exp,cbrt:Math.cbrt,round:Math.round,floor:Math.floor};
 const fact=n=>{if(n<0||n%1)throw Error('Недопустимый ввод');if(n>170)return Infinity;let r=1;for(let k=2;k<=n;k++)r*=k;return r};
 function expr(){let v=term();for(;;){if(eat('+'))v+=term();else if(eat('-'))v-=term();else return v;}}
 function term(){let v=unary();for(;;){if(eat('*'))v*=unary();else if(eat('/')){const d=unary();if(d===0)throw Error('Деление на ноль невозможно');v/=d;}else if(s.startsWith('mod',i)){i+=3;v%=unary();}else if(eat('%'))v%=unary();else if(/[a-z(0-9.]/i.test(peek()||'')&&!/[0-9.]/.test(peek()))v*=unary();else return v;}}
 function unary(){if(eat('-'))return -unary();if(eat('+'))return unary();return power();}
 function power(){let b=post();if(eat('^'))return Math.pow(b,unary());return b;}
 function post(){let v=atom();for(;;){if(eat('!'))v=fact(v);else return v;}}
 function atom(){if(eat('(')){const v=expr();eat(')');return v;}
  const m=/^\d*\.?\d+(e[+-]?\d+)?/i.exec(s.slice(i));if(m){i+=m[0].length;return parseFloat(m[0]);}
  const w=/^[a-z]+/i.exec(s.slice(i));if(w){const n=w[0].toLowerCase();i+=n.length;if(n==='pi')return Math.PI;if(n==='e')return Math.E;if(F[n]){const a=atom();return F[n](a);}throw Error('Неизвестная функция: '+n);}
  throw Error('Ошибка синтаксиса');}
 const r=expr();if(i<s.length)throw Error('Ошибка синтаксиса');if(!isFinite(r)&&!isNaN(r))return r;if(isNaN(r))throw Error('Недопустимый ввод');return r;}
const fmtNum=n=>{if(!isFinite(n))return n>0?'∞':'-∞';const a=Math.abs(n);if(a!==0&&(a>=1e16||a<1e-10))return n.toExponential(10).replace(/\.?0+e/,'e');return String(parseFloat(n.toPrecision(15)));};

/* ============================ EXPLORER ============================ */
const IMG_EXT=['png','jpg','jpeg','gif','bmp','webp'];
const PLACES=[['quick','Быстрый доступ',()=>sk('<path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="#4cc2ff" stroke="#4cc2ff"/>')],['sep'],
 ['C:\\Users\\User\\Desktop','Рабочий стол',AI.desktopF],['C:\\Users\\User\\Downloads','Загрузки',AI.downloads],['C:\\Users\\User\\Documents','Документы',AI.docsF],['C:\\Users\\User\\Pictures','Изображения',AI.pictures],['C:\\Users\\User\\Music','Музыка',AI.music],['sep'],
 ['pc','Этот компьютер',AI.pc],['C:\\','Локальный диск (C:)',AI.drive],['C:\\$Recycle.Bin','Корзина',()=>AI.recycle()]];
const NICE={'C:\\Users\\User\\Desktop':'Рабочий стол','C:\\Users\\User\\Downloads':'Загрузки','C:\\Users\\User\\Documents':'Документы','C:\\Users\\User\\Pictures':'Изображения','C:\\Users\\User\\Music':'Музыка','C:\\$Recycle.Bin':'Корзина','pc':'Этот компьютер','quick':'Быстрый доступ','C:\\':'Локальный диск (C:)'};
function usedBytes(){try{let n=0;for(const k in localStorage)if(k.startsWith('w11.'))n+=(localStorage.getItem(k)||'').length*2;return n}catch(e){return 0}}
Apps.register('explorer',{name:'Проводник',icon:AI.explorer,keywords:'files explorer файлы',launch(o){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="toolbar"><button class="tbtn" data-a="back" title="Назад"><span class="ico">${I.back}</span></button><button class="tbtn" data-a="fwd" title="Вперёд"><span class="ico">${I.fwd}</span></button><button class="tbtn" data-a="up" title="Вверх"><span class="ico">${I.up}</span></button><button class="tbtn" data-a="refresh" title="Обновить"><span class="ico">${I.refresh}</span></button>
  <div class="addr"><div class="crumbs"></div><input style="display:none"></div><div class="addr" style="flex:0 0 200px"><span class="ico" style="width:14px;height:14px;opacity:.6">${I.search}</span><input placeholder="Поиск" class="exs"></div></div>
  <div class="toolbar"><button class="tbtn" data-a="newdir"><span class="ico">${I.folder}</span>Новая папка</button><button class="tbtn" data-a="newtxt"><span class="ico">${I.newi}</span>Текстовый документ</button><span class="vsep"></span><button class="tbtn" data-a="rename" title="Переименовать"><span class="ico">${I.rename}</span></button><button class="tbtn" data-a="del" title="Удалить"><span class="ico">${I.trash}</span></button><span class="vsep"></span><button class="tbtn" data-a="term"><span class="ico">${I.term}</span>Терминал</button><span style="flex:1"></span><button class="tbtn" data-a="empty" style="display:none"><span class="ico">${I.trash}</span>Очистить корзину</button></div>
  <div class="ex"><div class="ex-side"></div><div class="ex-main" tabindex="0"></div></div><div class="statusbar"><span class="cnt"></span><span class="sl"></span></div></div>`);
 const st={path:o.path||'quick',hist:[],idx:-1,q:''};
 const win=WM.create({app:'explorer',title:'Проводник',icon:AI.explorer(),width:900,height:560,content:root,minW:480,minH:300});
 const side=$('.ex-side',root),main=$('.ex-main',root),crumbs=$('.crumbs',root),ainp=$('.addr input',root);
 side.innerHTML=PLACES.map(p=>p[0]==='sep'?'<hr>':`<div class="si" data-p="${esc(p[0])}"><span class="ic">${p[2]()}</span>${esc(p[1])}</div>`).join('');
 side.onclick=e=>{const s=e.target.closest('.si');if(s)go(s.dataset.p);};
 const isVirt=p=>p==='pc'||p==='quick';
 function go(p,noHist){if(!isVirt(p)){const r=VFS.real(p);if(!r||!VFS.isDir(r)){Shell.alert('Проводник',`Не удается найти «${p}». Проверьте правильность имени.`);return;}p=r;}
  if(!noHist){st.hist=st.hist.slice(0,st.idx+1);st.hist.push(p);st.idx=st.hist.length-1;}st.path=p;st.q='';$('.exs',root).value='';render();}
 function items(){if(st.path==='quick'){return['C:\\Users\\User\\Desktop','C:\\Users\\User\\Downloads','C:\\Users\\User\\Documents','C:\\Users\\User\\Pictures','C:\\Users\\User\\Music'].map(p=>({name:NICE[p],type:'dir',path:p,size:0}))
   .concat(Shell.recent.filter(p=>VFS.exists(p)&&!VFS.isDir(p)).slice(0,8).map(p=>({name:VFS.basename(p),type:'file',path:p,size:0,recent:1})));}
  if(st.path==='pc')return null;let l=VFS.list(st.path)||[];if(st.q){l=VFS.walk(st.path).concat((function rec(p,o=[]){(VFS.list(p)||[]).forEach(e=>{if(e.type==='dir'){o.push(e);rec(e.path,o)}});return o})(st.path)).filter(e=>e.name.toLowerCase().includes(st.q));}return l;}
 function render(){const p=st.path;win.setTitle(NICE[p]||VFS.basename(p));$('.ticon',win.el).innerHTML=p==='pc'?AI.pc():AI.explorer();
  $$('.si',side).forEach(s=>s.classList.toggle('on',s.dataset.p===p));
  const segs=isVirt(p)?[[NICE[p],p]]:[['Этот компьютер','pc'],...VFS.parts(p).reduce((a,x,i,arr)=>{a.push([i===0&&false?x:x,'C:\\'+arr.slice(0,i+1).join('\\')]);return a},[['Локальный диск (C:)','C:\\']])];
  crumbs.innerHTML=segs.map(([n,pp])=>`<span data-p="${esc(pp)}">${esc(n)}</span>`).join('<i>›</i>');
  $('[data-a=back]',root).disabled=st.idx<=0;$('[data-a=fwd]',root).disabled=st.idx>=st.hist.length-1;$('[data-a=up]',root).disabled=isVirt(p)||VFS.parts(p).length===0&&false;
  const ro=isVirt(p);['newdir','newtxt'].forEach(a=>$(`[data-a=${a}]`,root).disabled=ro);$('[data-a=empty]',root).style.display=p.toLowerCase()==='c:\\$recycle.bin'?'':'none';
  if(p==='pc'){const used=usedBytes();main.innerHTML=`<div style="width:100%;font-weight:600;padding:4px 6px">Папки</div>${['Desktop','Documents','Downloads','Pictures','Music'].map(n=>{const pp='C:\\Users\\User\\'+n;return `<div class="fi" data-p="${pp}" data-t="dir"><span class="ic">${VFS.iconFor({name:n,type:'dir'})}</span>${NICE[pp]}</div>`}).join('')}
   <div style="width:100%;font-weight:600;padding:12px 6px 4px">Устройства и диски</div><div class="fi drive" data-p="C:\\" data-t="dir"><span class="ic">${AI.drive()}</span><div style="flex:1"><div>Локальный диск (C:)</div><div class="bar"><b style="width:${Math.max(2,used/5242880*100).toFixed(1)}%"></b></div><small class="muted">${fmtSize(5242880-used)} свободно из 5 МБ</small></div></div>`;
   $('.cnt',root).textContent='Элементов: 6';bind();return;}
  const l=items();main.innerHTML=l.length?l.map(e=>`<div class="fi" data-p="${esc(e.path)}" data-t="${e.type}" title="${esc(e.name)}${e.type==='file'?'\nРазмер: '+fmtSize(e.size):''}"><span class="ic">${e.recent?VFS.iconFor(e):VFS.iconFor({name:e.type==='dir'&&st.path==='quick'?VFS.basename(e.path):e.name,type:e.type})}</span>${esc(e.name)}</div>`).join(''):`<div class="ex-empty">${st.q?'Ничего не найдено':'Эта папка пуста.'}</div>`;
  $('.cnt',root).textContent='Элементов: '+l.length;$('.sl',root).textContent='';bind();}
 function bind(){$$('.fi',main).forEach(f=>{f.onclick=e=>{if(!e.ctrlKey)$$('.fi.sel',main).forEach(x=>x.classList.remove('sel'));f.classList.toggle('sel',e.ctrlKey?!f.classList.contains('sel'):true);const n=$$('.fi.sel',main).length;$('.sl',root).textContent=n?'Выбрано: '+n:'';};
  f.ondblclick=()=>open(f.dataset.p,f.dataset.t);
  f.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();if(!f.classList.contains('sel')){$$('.fi.sel',main).forEach(x=>x.classList.remove('sel'));f.classList.add('sel');}const p=f.dataset.p,sys=isVirt(st.path)||p==='C:\\';
   const inBin=st.path.toLowerCase()==='c:\\$recycle.bin';
   Shell.menu(e.clientX,e.clientY,[{label:'Открыть',icon:I.open,action:()=>open(p,f.dataset.t)},...(f.dataset.t==='file'&&!IMG_EXT.includes(VFS.ext(p))?[{label:'Изменить в Блокноте',icon:I.pencil,action:()=>Apps.launch('notepad',{path:p})}]:[]),
    ...(f.dataset.t==='dir'?[{label:'Открыть в Терминале',icon:I.term,action:()=>Apps.launch('terminal',{cwd:p})}]:[]),{sep:1},
    ...(inBin?[{label:'Восстановить на рабочий стол',icon:I.undo,action:()=>sel().forEach(x=>VFS.move(x,'C:\\Users\\User\\Desktop'))}]:[]),
    {label:'Переименовать',icon:I.rename,key:'F2',disabled:sys,action:()=>Shell.renameItem(p)},{label:inBin?'Удалить навсегда':'Удалить',icon:I.trash,key:'Del',disabled:sys,action:del},{sep:1},{label:'Свойства',icon:I.info,action:()=>props(p)}]);};});}
 function sel(){return $$('.fi.sel',main).map(f=>f.dataset.p);}
 function open(p,t){if(t==='dir')go(p);else Apps.openFile(p);}
 function props(p){const n=VFS.node(p);if(!n)return;const isD=n.type==='dir';const cnt=isD?VFS.walk(p).length:0;
  Shell.dialog({title:'Свойства: '+VFS.basename(p),icon:VFS.iconFor({name:p,type:n.type}),html:`<div style="display:grid;grid-template-columns:120px 1fr;gap:8px 12px" class="sel-text"><span class="muted">Имя:</span><b>${esc(VFS.basename(p))}</b><span class="muted">Тип:</span><span>${isD?'Папка с файлами':'Файл «'+(VFS.ext(p)||'—').toUpperCase()+'»'}</span><span class="muted">Расположение:</span><span>${esc(VFS.dirname(p))}</span><span class="muted">Размер:</span><span>${isD?'Файлов: '+cnt:fmtSize(new Blob([n.content]).size)}</span><span class="muted">Изменён:</span><span>${new Date(n.mtime).toLocaleString('ru-RU')}</span></div>`,buttons:[{label:'OK',primary:true}]});}
 async function del(){const s=sel().filter(p=>p!=='C:\\'&&!isVirt(st.path));if(!s.length)return;const inBin=st.path.toLowerCase()==='c:\\$recycle.bin';
  if(inBin){if(!await Shell.confirm('Удаление',`Удалить безвозвратно (${s.length})?`))return;s.forEach(p=>VFS.remove(p));}else s.forEach(p=>VFS.move(p,'C:\\$Recycle.Bin'));Sound.pop();}
 root.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='back'&&st.idx>0){st.idx--;go(st.hist[st.idx],true);}if(a==='fwd'&&st.idx<st.hist.length-1){st.idx++;go(st.hist[st.idx],true);}
  if(a==='up'&&!isVirt(st.path)){const ps=VFS.parts(st.path);ps.length?go(VFS.dirname(st.path)):go('pc');}if(a==='refresh')render();
  if(a==='newdir'){const n=await Shell.prompt('Новая папка','Имя папки:',VFS.uniqueName(st.path,'Новая папка',''));if(n){if(/[\\/:*?"<>|]/.test(n))return Shell.alert('Ошибка','Имя не должно содержать символы \\ / : * ? " < > |');VFS.mkdir(st.path.replace(/\\$/,'')+'\\'+n);}}
  if(a==='newtxt'){let n=await Shell.prompt('Новый файл','Имя файла:',VFS.uniqueName(st.path,'Новый текстовый документ','.txt'));if(n){if(!/\./.test(n))n+='.txt';VFS.write(st.path.replace(/\\$/,'')+'\\'+n,'');}}
  if(a==='del')del();if(a==='rename'){const s=sel()[0];s&&!isVirt(st.path)&&Shell.renameItem(s);}if(a==='term')Apps.launch('terminal',{cwd:isVirt(st.path)?VFS.home():st.path});if(a==='empty')Shell.emptyBin();});
 crumbs.onclick=e=>{const s=e.target.closest('span');if(s){e.stopPropagation();go(s.dataset.p);}else{crumbs.style.display='none';ainp.style.display='';ainp.value=isVirt(st.path)?NICE[st.path]:st.path;ainp.focus();ainp.select();}};
 $('.addr',root).onclick=e=>{if(e.target===e.currentTarget)crumbs.onclick(e);};
 ainp.onkeydown=e=>{if(e.key==='Enter'){const v=ainp.value.trim();const virt=Object.entries(NICE).find(([k,n])=>n.toLowerCase()===v.toLowerCase());ainp.blur();go(virt?virt[0]:v);}if(e.key==='Escape')ainp.blur();};
 ainp.onblur=()=>{ainp.style.display='none';crumbs.style.display='';};
 $('.exs',root).oninput=e=>{st.q=e.target.value.trim().toLowerCase();if(!isVirt(st.path))render();};
 main.addEventListener('pointerdown',e=>{if(!e.target.closest('.fi'))$$('.fi.sel',main).forEach(x=>x.classList.remove('sel'));});
 main.addEventListener('contextmenu',e=>{if(e.target.closest('.fi'))return;e.preventDefault();e.stopPropagation();const ro=isVirt(st.path);
  Shell.menu(e.clientX,e.clientY,[{label:'Обновить',icon:I.refresh,action:render},{sep:1},{label:'Создать папку',icon:I.folder,disabled:ro,action:()=>$('[data-a=newdir]',root).click()},{label:'Создать текстовый документ',icon:I.file,disabled:ro,action:()=>$('[data-a=newtxt]',root).click()},{sep:1},{label:'Открыть в Терминале',icon:I.term,action:()=>$('[data-a=term]',root).click()}]);});
 main.addEventListener('keydown',e=>{if(e.key==='Delete')del();if(e.key==='F2'){const s=sel()[0];s&&Shell.renameItem(s);}if(e.key==='Enter'){const f=$('.fi.sel',main);f&&open(f.dataset.p,f.dataset.t);}if(e.key==='Backspace')$('[data-a=up]',root).click();if(e.key==='a'&&e.ctrlKey){e.preventDefault();$$('.fi',main).forEach(f=>f.classList.add('sel'));}});
 Bus.on('fs',()=>{if(win.el.isConnected){if(!isVirt(st.path)&&!VFS.exists(st.path))st.path='pc';render();}});
 go(st.path);return win;}});

/* ============================ IMAGE VIEWER ============================ */
Apps.register('viewer',{name:'Фотографии',icon:AI.viewer,keywords:'photos image viewer фото',launch(o){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="toolbar"><button class="tbtn" data-a="open"><span class="ico">${I.open}</span>Открыть</button><span class="vsep"></span><button class="tbtn" data-a="prev" title="Предыдущее"><span class="ico">${I.chevL}</span></button><button class="tbtn" data-a="next" title="Следующее"><span class="ico">${I.chevR}</span></button><span class="vsep"></span><button class="tbtn" data-a="zo">−</button><span class="zl" style="min-width:48px;text-align:center;font-size:12px">100%</span><button class="tbtn" data-a="zi">+</button><button class="tbtn" data-a="rot" title="Повернуть"><span class="ico">${I.restart}</span></button><span style="flex:1"></span><button class="tbtn" data-a="edit"><span class="ico">${I.brush}</span>Изменить в Paint</button></div><div class="iv"><canvas></canvas></div><div class="statusbar"><span class="inf"></span></div></div>`);
 const win=WM.create({app:'viewer',title:'Фотографии',icon:AI.viewer(),width:820,height:580,content:root});
 const cv=$('canvas',root),cx=cv.getContext('2d');let img=null,zoom=1,rot=0,path=o.path;
 const draw=()=>{if(!img)return;const sw=rot%2?img.height:img.width,sh=rot%2?img.width:img.height;cv.width=sw;cv.height=sh;cx.save();cx.translate(sw/2,sh/2);cx.rotate(rot*Math.PI/2);cx.drawImage(img,-img.width/2,-img.height/2);cx.restore();
  cv.style.width=sw*zoom+'px';cv.style.height=sh*zoom+'px';cv.style.maxWidth=zoom===1?'100%':'none';cv.style.maxHeight=zoom===1?'100%':'none';$('.zl',root).textContent=Math.round(zoom*100)+'%';};
 const load=p=>{path=p;const d=VFS.read(p);win.setTitle(VFS.basename(p)+' — Фотографии');if(!d||!d.startsWith('data:image')){img=null;cx.clearRect(0,0,cv.width,cv.height);$('.inf',root).textContent='Не удаётся открыть файл: формат не поддерживается';return;}
  const im=new Image();im.onload=()=>{img=im;zoom=1;rot=0;draw();$('.inf',root).textContent=`${im.width} × ${im.height} пикс. · ${fmtSize(Math.round(d.length*.75))} · ${p}`;};im.src=d;};
 const siblings=()=>(VFS.list(VFS.dirname(path))||[]).filter(e=>IMG_EXT.includes(VFS.ext(e.name))).map(e=>e.path);
 root.addEventListener('click',async e=>{const a=e.target.closest('[data-a]')?.dataset.a;if(!a)return;
  if(a==='open'){const p=await Shell.pickFile('Открыть изображение',IMG_EXT);p&&load(p);}
  if((a==='prev'||a==='next')&&path){const s=siblings();const i=s.indexOf(VFS.real(path));if(s.length)load(s[(i+(a==='next'?1:-1)+s.length)%s.length]);}
  if(a==='zi'){zoom=Math.min(8,zoom*1.25);draw();}if(a==='zo'){zoom=Math.max(.1,zoom/1.25);draw();}if(a==='rot'){rot=(rot+1)%4;draw();}if(a==='edit'&&path)Apps.launch('paint',{path});});
 $('.iv',root).addEventListener('wheel',e=>{if(!img)return;e.preventDefault();zoom=clamp(zoom*(e.deltaY<0?1.1:1/1.1),.1,8);draw();},{passive:false});
 if(path)load(path);else $('.inf',root).textContent='Откройте изображение';return win;}});

/* ============================ TERMINAL ============================ */
const CON_COLORS=['#0c0c0c','#0037da','#13a10e','#3a96dd','#c50f1f','#881798','#c19c00','#cccccc','#767676','#3b78ff','#16c60c','#61d6d6','#e74856','#b4009e','#f9f1a5','#f2f2f2'];
Apps.register('terminal',{name:'Терминал',icon:AI.terminal,keywords:'powershell cmd terminal командная',launch(o){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0;background:#0c0c0c"><div class="term-tabs"><div class="term-tab"><span class="ic">${AI.terminal()}</span>Windows PowerShell</div></div><div class="term"><pre class="out"></pre><div class="line"><span class="pr"></span><input spellcheck="false" autocomplete="off"></div></div></div>`);
 const win=WM.create({app:'terminal',title:'Windows PowerShell',icon:AI.terminal(),width:760,height:460,content:root,onFocus:()=>setTimeout(()=>inp.focus({preventScroll:true}),0)});
 const term=$('.term',root),out=$('.out',root),inp=$('input',root),pr=$('.pr',root);let cwd=o.cwd&&VFS.isDir(o.cwd)?VFS.real(o.cwd):VFS.home();const hist=LS.get('termHist',[]);let hi=hist.length;let matrix=null;
 const prompt=()=>`PS ${cwd}> `;const upd=()=>{pr.textContent=prompt();};
 const print=(t,c)=>{const s=document.createElement('span');if(c)s.style.color=c;s.textContent=t+'\n';out.appendChild(s);term.scrollTop=term.scrollHeight;};
 const html=h=>{const s=document.createElement('span');s.innerHTML=h+'\n';out.appendChild(s);term.scrollTop=term.scrollHeight;};
 print('Windows PowerShell\n(C) Корпорация Майкрософт (Microsoft Corporation). Все права защищены.\n\nУстановите последнюю версию PowerShell для новых функций. Введите help для списка команд.\n');upd();
 term.addEventListener('mouseup',()=>{if(!getSelection().toString())inp.focus();});
 const args=s=>{const r=[];s.replace(/"([^"]*)"|(\S+)/g,(m,a,b)=>r.push(a??b));return r;};
 const appMap={notepad:'notepad',calc:'calc',mspaint:'paint',paint:'paint',explorer:'explorer',taskmgr:'taskmgr',winmine:'minesweeper',minesweeper:'minesweeper',sol:'solitaire',solitaire:'solitaire',settings:'settings','ms-settings:':'settings',control:'settings',powershell:'terminal',cmd:'terminal',wt:'terminal',winver:'winver'};
 const C={
  help(){print(`Доступные команды:
  help               справка
  dir, ls [путь]     содержимое папки
  cd [путь]          сменить папку (cd .., cd ~)
  pwd                текущая папка
  cat, type <файл>   вывести содержимое файла
  echo <текст>      вывести текст (echo текст > файл.txt, >> — дописать)
  mkdir <имя>       создать папку
  touch <файл>      создать пустой файл
  rm, del <путь>    удалить файл или папку
  tree               дерево папок
  clear, cls         очистить экран
  matrix             зелёный цифровой дождь (любая клавиша — выход)
  neofetch, winfetch информация о системе
  calc [выражение]  вычислить (calc 2+2*sqrt(16)) или открыть Калькулятор
  color [XY]         цвет консоли: X — фон, Y — текст (0-F), напр. color 0A
  date, time         текущая дата и время
  whoami, hostname, ver, history, tasklist
  start <приложение|файл>  запуск (notepad, mspaint, winmine, sol, taskmgr...)
  bsod               вызвать синий экран
  shutdown [/r]      выключить / перезагрузить
  exit               закрыть окно`);},
  ls(a){const p=VFS.resolve(cwd,a[0]);const l=VFS.list(p);if(!l)return print(`Get-ChildItem: Не удается найти путь "${p}", так как он не существует.`,'#e74856');
   print(`\n    Каталог: ${VFS.real(p)}\n\nMode                 LastWriteTime         Length Name\n----                 -------------         ------ ----`);
   l.forEach(e=>{const d=new Date(e.mtime);const dt=`${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}     ${pad(d.getHours())}:${pad(d.getMinutes())}`;html(`${e.type==='dir'?'d-----':'-a----'}        ${dt}  ${String(e.type==='dir'?'':e.size).padStart(13)} <span style="color:${e.type==='dir'?'#3b78ff':'inherit'}">${esc(e.name)}</span>`);});print('');},
  cd(a){if(!a[0])return print(cwd);const p=VFS.resolve(cwd,a.join(' '));if(!VFS.isDir(p))return print(`Set-Location: Не удается найти путь "${p}", так как он не существует.`,'#e74856');cwd=VFS.real(p);},
  pwd(){print(`\nPath\n----\n${cwd}\n`);},
  cat(a){if(!a[0])return print('Укажите файл: cat <имя>','#e74856');const p=VFS.resolve(cwd,a.join(' '));const c=VFS.read(p);if(c==null)return print(`Get-Content: Не удается найти файл "${p}".`,'#e74856');print(c.startsWith('data:image')?'[двоичные данные изображения, '+fmtSize(c.length)+']':c);},
  echo(a,raw){const m=/^(.*?)\s*(>>?)\s*(\S.*)$/.exec(raw);if(m){const p=VFS.resolve(cwd,m[3].replace(/^"|"$/g,''));const txt=m[1].replace(/^["']|["']$/g,'');const prev=m[2]==='>>'?(VFS.read(p)||''):'';if(!VFS.write(p,prev+txt+'\n'))print('Не удается записать файл','#e74856');return;}print(raw.replace(/^["']|["']$/g,''));},
  mkdir(a){if(!a[0])return print('Укажите имя: mkdir <имя>','#e74856');a.forEach(n=>{const p=VFS.resolve(cwd,n);if(VFS.exists(p))return print(`mkdir: Элемент с указанным именем ${p} уже существует.`,'#e74856');VFS.mkdir(p);print(`\n    Каталог: ${cwd}\n\nd-----  ${VFS.basename(p)}\n`);});},
  touch(a){a.forEach(n=>{const p=VFS.resolve(cwd,n);if(!VFS.exists(p))VFS.write(p,'');});},
  rm(a){if(!a[0])return print('Укажите путь','#e74856');a.filter(x=>!x.startsWith('-')).forEach(n=>{const p=VFS.resolve(cwd,n);if(VFS.parts(p).length<2)return print('Отказано в доступе: '+p,'#e74856');if(!VFS.remove(p))print(`Remove-Item: Не удается найти путь "${p}".`,'#e74856');});},
  tree(a){const p=VFS.resolve(cwd,a[0]);if(!VFS.isDir(p))return print('Недопустимый путь','#e74856');print(VFS.real(p));const rec=(pp,pre)=>{const l=VFS.list(pp)||[];l.forEach((e,i)=>{const last=i===l.length-1;print(pre+(last?'└── ':'├── ')+e.name,e.type==='dir'?'#3b78ff':null);if(e.type==='dir')rec(e.path,pre+(last?'    ':'│   '));});};rec(p,'');},
  clear(){out.innerHTML='';},
  matrix(){startMatrix();},
  neofetch(){const d=new Date(),up=Math.round((Date.now()-BOOT_TIME)/60000);const L=[
   '<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','',
   '<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>','<span style="color:#3b78ff">  ################  ################</span>'];
   const K=(k,v)=>`<span style="color:#61d6d6"><b>${k}</b></span>: ${esc(v)}`;const nav=navigator;
   const R=[`<span style="color:#61d6d6"><b>${esc(Settings.get('user'))}</b></span>@<span style="color:#61d6d6"><b>WIN11-WEB</b></span>`,'-------------------',K('OS','Windows 11 Web Edition x64'),K('Host','Browser Virtual Machine'),K('Kernel','10.0.22631 (web11krnl)'),K('Uptime',up+' мин'),K('Packages',Object.keys(Apps.reg).length+' (apps)'),K('Shell','PowerShell 5.1'),K('Resolution',`${screen.width}x${screen.height}`),K('Theme',Settings.get('theme')!=='light'?'Тёмная':'Светлая'),K('CPU',`Virtual CPU (${nav.hardwareConcurrency||4}) @ ${Math.round(Monitor.cpu)}%`),K('Memory',`${(Monitor.ram/100*16).toFixed(1)} GiB / 16.0 GiB`),K('Disk (C:)',`${fmtSize(usedBytes())} / 5 МБ`),'',CON_COLORS.slice(0,8).map(c=>`<span style="background:${c}">   </span>`).join('')+'',CON_COLORS.slice(8).map(c=>`<span style="background:${c}">   </span>`).join('')];
   const n=Math.max(L.length,R.length);let s='';for(let i=0;i<n;i++)s+=(L[i]!==undefined?L[i]:'').padEnd(L[i]?L[i].length+0:0)+(L[i]?'':' '.repeat(36))+'   '+(R[i]||'')+'\n';html(s);},
  calc(a,raw){if(!raw.trim()){Apps.launch('calc');return print('Запуск Калькулятора...');}try{print(fmtNum(evalExpr(raw)));}catch(e){print('Ошибка: '+e.message,'#e74856');}},
  bsod(){print('Инициация критической ошибки...','#e74856');setTimeout(()=>Shell.bsod('MANUALLY_INITIATED_CRASH1'),600);},
  color(a){if(!a[0]){term.style.background='';term.style.color='';root.style.background='';return;}const c=a[0].toUpperCase();if(!/^[0-9A-F]{1,2}$/.test(c))return print('Использование: color XY (X — фон, Y — текст). 0=Чёрный 1=Синий 2=Зелёный 3=Голубой 4=Красный 5=Лиловый 6=Жёлтый 7=Белый 8=Серый 9-F=Светлые варианты','#e74856');
   const bg=c.length===2?parseInt(c[0],16):0,fg=parseInt(c[c.length-1],16);if(bg===fg)return print('Цвет фона и текста не может совпадать','#e74856');term.style.background=CON_COLORS[bg];root.style.background=CON_COLORS[bg];term.style.color=CON_COLORS[fg];},
  date(){const d=new Date();print(`\n${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_G[d.getMonth()]} ${d.getFullYear()} г. ${d.toLocaleTimeString('ru-RU')}\n`);},
  whoami(){print('win11-web\\'+Settings.get('user').toLowerCase());},hostname(){print('WIN11-WEB');},ver(){print('\nMicrosoft Windows [Version 10.0.22631.4317] — Web Edition\n');},
  history(){hist.forEach((h,i)=>print(String(i+1).padStart(4)+'  '+h));},
  tasklist(){print('\nИмя образа                     PID  Память\n========================= ======== ============');TM_PROCS().forEach(p=>print(`${p.exe.padEnd(25)} ${String(p.pid).padStart(8)} ${(p.mem.toFixed(1)+' МБ').padStart(12)}`));print('');},
  start(a){const n=(a[0]||'').toLowerCase();if(!n)return Apps.launch('terminal');if(appMap[n.replace(/\.exe$/,'')])return Apps.launch(appMap[n.replace(/\.exe$/,'')]);if(window.APP_ALIAS&&APP_ALIAS[n])return Apps.launch(APP_ALIAS[n]);const p=VFS.resolve(cwd,a.join(' '));if(VFS.exists(p))return Apps.openFile(VFS.real(p));print(`Start-Process: Не удается найти «${a[0]}».`,'#e74856');},
  shutdown(a){if(a.includes('/r'))Shell.restart();else if(a.includes('/s')||!a.length)Shell.shutdown();},
  exit(){WM.close(win);},
 };
 Object.assign(C,{dir:C.ls,'get-childitem':C.ls,gci:C.ls,type:C.cat,'get-content':C.cat,cls:C.clear,winfetch:C.neofetch,del:C.rm,rmdir:C.rm,md:C.mkdir,'set-location':C.cd,'chdir':C.cd,time:C.date,'get-date':C.date,'write-host':C.echo,ni:C.touch});
 function run(line){print(prompt()+line);const raw=line.trim();if(!raw)return;hist.push(raw);if(hist.length>100)hist.shift();LS.set('termHist',hist);hi=hist.length;
  const m=/^(\S+)\s*(.*)$/.exec(raw);const cmd=m[1].toLowerCase(),rest=m[2];
  if(C[cmd]){C[cmd](args(rest),rest);if(cmd==='help'&&window.TERM_HELP)print(TERM_HELP,'#61d6d6');}else if(window.TERM_EXT&&TERM_EXT[cmd]){try{const r=TERM_EXT[cmd]({print,html,args:args(rest),rest,get cwd(){return cwd},setCwd:v=>{cwd=v;upd()},win,clear:()=>{out.textContent=''}});if(r&&r.catch)r.catch(e=>print(String(e.message||e),'#e74856'));}catch(e){print(String(e.message||e),'#e74856')}}else if(appMap[cmd.replace(/\.exe$/,'')]){Apps.launch(appMap[cmd.replace(/\.exe$/,'')]);}
  else if(/^[\d(.\-]/.test(raw)){try{print(fmtNum(evalExpr(raw)))}catch(e){print(e.message,'#e74856')}}
  else print(`${m[1]} : Имя "${m[1]}" не распознано как имя командлета, функции, файла сценария или выполняемой программы.\nВведите help для списка команд.`,'#e74856');}
 inp.addEventListener('keydown',e=>{if(matrix){e.preventDefault();return stopMatrix();}
  if(e.key==='Enter'){const v=inp.value;inp.value='';run(v);upd();term.scrollTop=term.scrollHeight;}
  else if(e.key==='ArrowUp'){e.preventDefault();if(hi>0){hi--;inp.value=hist[hi];}}else if(e.key==='ArrowDown'){e.preventDefault();if(hi<hist.length-1){hi++;inp.value=hist[hi];}else{hi=hist.length;inp.value='';}}
  else if(e.key==='Tab'){e.preventDefault();const m=/^(.*?)(\S*)$/.exec(inp.value);const part=m[2].replace(/^"/,'');const dir=part.includes('\\')?VFS.resolve(cwd,part.slice(0,part.lastIndexOf('\\')+1)):cwd;const pre=part.includes('\\')?part.slice(0,part.lastIndexOf('\\')+1):'';const nm=part.slice(pre.length).toLowerCase();
   const hit=(VFS.list(dir)||[]).filter(x=>x.name.toLowerCase().startsWith(nm));if(hit.length===1)inp.value=m[1]+(/\s/.test(pre+hit[0].name)?'"'+pre+hit[0].name+'"':pre+hit[0].name);else if(hit.length>1){print(prompt()+inp.value);print(hit.map(h=>h.name).join('   '));}}
  else if(e.key==='l'&&e.ctrlKey){e.preventDefault();out.innerHTML='';}else if(e.key==='c'&&e.ctrlKey&&!getSelection().toString()){print(prompt()+inp.value+'^C');inp.value='';}});
 function startMatrix(){const c=document.createElement('canvas');term.appendChild(c);const r=term.getBoundingClientRect();c.width=r.width;c.height=r.height;c.style.top=term.scrollTop+'px';term.style.overflow='hidden';const x=c.getContext('2d');const fs=15,cols=Math.ceil(c.width/fs);const drops=Array(cols).fill(0).map(()=>Math.random()*-40);const ch='アイウエオカキクケコサシスセソ01234567890ABCDEFタチツテトナニヌネノ';x.fillStyle='#000';x.fillRect(0,0,c.width,c.height);
  const loop=()=>{x.fillStyle='rgba(0,0,0,.07)';x.fillRect(0,0,c.width,c.height);x.font=fs+'px monospace';for(let i=0;i<cols;i++){const y=drops[i]*fs;x.fillStyle=Math.random()<.04?'#d6ffd6':'#16c60c';x.fillText(ch[Math.random()*ch.length|0],i*fs,y);if(y>c.height&&Math.random()>.975)drops[i]=0;drops[i]+=.6+Math.random()*.4;}
   x.fillStyle='rgba(0,0,0,.6)';x.fillRect(c.width-210,c.height-28,210,28);x.fillStyle='#16c60c';x.font='12px monospace';x.fillText('Нажмите любую клавишу...',c.width-200,c.height-10);if(matrix)matrix.raf=requestAnimationFrame(loop);};matrix={c,raf:0};loop();c.onclick=stopMatrix;inp.focus();}
 function stopMatrix(){if(!matrix)return;cancelAnimationFrame(matrix.raf);matrix.c.remove();matrix=null;term.style.overflow='';inp.focus();}
 win.onClose=()=>{stopMatrix();};setTimeout(()=>inp.focus(),50);return win;}});
const BOOT_TIME=Date.now();

/* ============================ NOTEPAD ============================ */
Apps.register('notepad',{name:'Блокнот',icon:AI.notepad,keywords:'notepad text текст редактор',single:true,
 onReopen(win,o){if(o.path)win._np.openPath(o.path);},
 launch(o){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="np-tabs"></div><div class="np-menu"><button class="tbtn" data-a="new" title="Ctrl+N">Новая вкладка</button><button class="tbtn" data-a="open" title="Ctrl+O"><span class="ico">${I.open}</span>Открыть</button><button class="tbtn" data-a="save" title="Ctrl+S"><span class="ico">${I.save}</span>Сохранить</button><button class="tbtn" data-a="saveas">Сохранить как…</button><span class="vsep"></span><button class="tbtn" data-a="time" title="F5">Дата/время</button><button class="tbtn" data-a="wrap">Перенос по словам</button><span class="vsep"></span><button class="tbtn" data-a="zo">A−</button><button class="tbtn" data-a="zi">A+</button></div>
  <div class="np-edit"><div class="np-gutter"></div><textarea spellcheck="false"></textarea></div><div class="statusbar"><span class="pos"></span><span class="cnt"></span><span style="flex:1"></span><span class="zm">100%</span><span>Windows (CRLF)</span><span>UTF-8</span></div></div>`);
 const win=WM.create({app:'notepad',title:'Блокнот',icon:AI.notepad(),width:780,height:520,content:root,minW:420});
 const ta=$('textarea',root),gut=$('.np-gutter',root),tabsEl=$('.np-tabs',root);let tabs=[],cur=null,wrap=false,fsz=14;
 const mk=(path)=>{const t={id:uid(),path:path||null,text:path?(VFS.read(path)||''):'',saved:true,sel:0,scroll:0};t.orig=t.text;return t;};
 function nameOf(t){return t.path?VFS.basename(t.path):'Без имени';}
 function renderTabs(){tabsEl.innerHTML=tabs.map(t=>`<div class="np-tab${t===cur?' on':''}${t.saved?'':' dirty'}" data-id="${t.id}" title="${esc(t.path||'')}"><span>${esc(nameOf(t))}</span><i class="dot"></i><button title="Закрыть вкладку">${I.close}</button></div>`).join('')+`<button class="tbtn" data-a="new" title="Новая вкладка" style="height:28px;margin-bottom:2px"><span class="ico">${I.plus}</span></button>`;
  win.setTitle(nameOf(cur)+(cur.saved?'':'*')+' — Блокнот');}
 function select(t){if(cur){cur.text=ta.value;cur.sel=ta.selectionStart;cur.scroll=ta.scrollTop;}cur=t;ta.value=t.text;ta.setSelectionRange(t.sel,t.sel);ta.scrollTop=t.scroll;renderTabs();stats();ta.focus();}
 function stats(){const v=ta.value;const lines=v.split('\n');const n=lines.length;let g='';for(let i=1;i<=n;i++)g+=i+'\n';gut.textContent=g;gut.scrollTop=ta.scrollTop;
  const before=v.slice(0,ta.selectionStart).split('\n');$('.pos',root).textContent=`Стр ${before.length}, стлб ${before[before.length-1].length+1}`;
  const words=(v.match(/[^\s]+/g)||[]).length;$('.cnt',root).textContent=`Символов: ${v.length} · Слов: ${words} · Строк: ${n}`;}
 function openPath(p){const r=VFS.real(p)||p;const ex=tabs.find(t=>t.path&&t.path.toLowerCase()===r.toLowerCase());if(ex)return select(ex);const t=mk(r);if(tabs.length===1&&!tabs[0].path&&!tabs[0].text&&tabs[0]!==t){tabs=[t];cur=null;}else tabs.push(t);select(t);Shell.addRecent(r);}
 async function save(t,as){t=t||cur;if(t===cur)t.text=ta.value;let p=t.path;
  if(!p||as){const n=await Shell.prompt('Сохранить как','Путь к файлу (папка по умолчанию — Документы):',p||'C:\\Users\\User\\Documents\\'+(t.text.split('\n')[0].replace(/[\\/:*?"<>|]/g,'').slice(0,30).trim()||'Без имени')+'.txt');if(!n)return false;
   p=/^[a-z]:|^\\/i.test(n)?VFS.resolve('C:\\',n):VFS.resolve('C:\\Users\\User\\Documents',n);if(!/\.[^\\.]+$/.test(p))p+='.txt';if(!VFS.isDir(VFS.dirname(p))){Shell.alert('Блокнот','Папка не существует: '+VFS.dirname(p));return false;}}
  if(!VFS.write(p,t.text)){Shell.alert('Блокнот','Не удалось сохранить файл.');return false;}t.path=VFS.real(p);t.saved=true;Shell.addRecent(t.path);renderTabs();return true;}
 async function closeTab(t){if(t===cur)t.text=ta.value;if(!t.saved){const r=await Shell.dialog({title:'Блокнот',icon:AI.notepad(),html:`<p>Сохранить изменения в файле «${esc(nameOf(t))}»?</p>`,buttons:[{label:'Сохранить',primary:true,value:'s'},{label:'Не сохранять',value:'n'},{label:'Отмена',value:null}]});
   if(!r)return false;if(r==='s'&&!await save(t))return false;}
  const i=tabs.indexOf(t);tabs.splice(i,1);if(!tabs.length){win.onClose=null;WM.close(win);return true;}if(cur===t){cur=null;select(tabs[Math.max(0,i-1)]);}else renderTabs();return true;}
 ta.addEventListener('input',()=>{cur.text=ta.value;const was=cur.saved;cur.saved=false;if(was)renderTabs();stats();});
 ['click','keyup','select'].forEach(ev=>ta.addEventListener(ev,stats));ta.addEventListener('scroll',()=>{gut.scrollTop=ta.scrollTop;});
 ta.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();ta.setRangeText('\t',ta.selectionStart,ta.selectionEnd,'end');ta.dispatchEvent(new Event('input'));}
  if(e.ctrlKey&&!e.altKey){const k=e.key.toLowerCase();if(k==='s'||k==='ы'){e.preventDefault();save(null,e.shiftKey);}if(k==='n'||k==='т'){e.preventDefault();tabs.push(mk());select(tabs[tabs.length-1]);}if(k==='o'||k==='щ'){e.preventDefault();act('open');}if(k==='w'||k==='ц'){e.preventDefault();closeTab(cur);}}if(e.key==='F5'){e.preventDefault();act('time');}});
 async function act(a){if(a==='new'){tabs.push(mk());select(tabs[tabs.length-1]);}if(a==='open'){const p=await Shell.pickFile('Открыть',null);if(p){if(IMG_EXT.includes(VFS.ext(p)))return Apps.openFile(p);openPath(p);}}
  if(a==='save')save();if(a==='saveas')save(null,true);if(a==='time'){const d=new Date();ta.setRangeText(`${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}`,ta.selectionStart,ta.selectionEnd,'end');ta.dispatchEvent(new Event('input'));ta.focus();}
  if(a==='wrap'){wrap=!wrap;ta.style.whiteSpace=wrap?'pre-wrap':'pre';gut.style.visibility=wrap?'hidden':'';$('[data-a=wrap]',root).classList.toggle('on',wrap);}
  if(a==='zi'||a==='zo'){fsz=clamp(fsz+(a==='zi'?2:-2),8,40);ta.style.fontSize=gut.style.fontSize=fsz+'px';ta.style.lineHeight=gut.style.lineHeight=Math.round(fsz*1.5)+'px';$('.zm',root).textContent=Math.round(fsz/14*100)+'%';}}
 root.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)return act(b.dataset.a);const tab=e.target.closest('.np-tab');if(!tab)return;const t=tabs.find(x=>x.id===tab.dataset.id);if(e.target.closest('button'))closeTab(t);else if(t!==cur)select(t);});
 tabsEl.addEventListener('auxclick',e=>{const tab=e.target.closest('.np-tab');if(tab&&e.button===1)closeTab(tabs.find(x=>x.id===tab.dataset.id));});
 win.onClose=()=>{if(cur)cur.text=ta.value;const dirty=tabs.filter(t=>!t.saved);if(!dirty.length)return true;(async()=>{for(const t of [...dirty]){select(t);if(!await closeTab(t))return;}if(tabs.length){win.onClose=null;WM.close(win);}})();return false;};
 win._np={openPath};tabs=[mk()];select(tabs[0]);if(o.path)openPath(o.path);if(o.text){cur.text=ta.value=o.text;cur.saved=false;renderTabs();stats();}return win;}});

/* ============================ PAINT ============================ */
Apps.register('paint',{name:'Paint',icon:AI.paint,keywords:'paint mspaint рисование',launch(o){
 const PAL=['#000000','#7f7f7f','#880015','#ed1c24','#ff7f27','#fff200','#22b14c','#00a2e8','#3f48cc','#a349a4','#ffffff','#c3c3c3','#b97a57','#ffaec9','#ffc90e','#efe4b0','#b5e61d','#99d9ea','#7092be','#c8bfe7'];
 const tools=[['pencil','Карандаш',I.pencil],['brush','Кисть',I.brush],['eraser','Ластик',I.eraser],['fill','Заливка',I.bucket],['picker','Пипетка',sk('<path d="M10.5 2.5l3 3-2 2-3-3zM8.5 4.5L3 10v3h3l5.5-5.5"/>')],['line','Линия',I.line],['rect','Прямоугольник',I.rect],['ellipse','Эллипс',I.ellipse]];
 const root=el(`<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div class="pt-ribbon">
  <div class="pt-grp"><button class="tbtn" data-a="new" title="Создать"><span class="ico">${I.newi}</span></button><button class="tbtn" data-a="open" title="Открыть из VFS"><span class="ico">${I.open}</span></button><button class="tbtn" data-a="save" title="Сохранить в «Изображения»"><span class="ico">${I.save}</span></button><button class="tbtn" data-a="dl" title="Скачать PNG"><span class="ico">${I.download}</span>PNG</button></div>
  <div class="pt-grp"><button class="tbtn" data-a="undo" title="Отменить (Ctrl+Z)"><span class="ico">${I.undo}</span></button><button class="tbtn" data-a="redo" title="Повторить (Ctrl+Y)"><span class="ico">${I.redo}</span></button><button class="tbtn" data-a="clear" title="Очистить"><span class="ico">${I.trash}</span>Очистить</button></div>
  <div class="pt-grp">${tools.map(t=>`<button class="tbtn" data-t="${t[0]}" title="${t[1]}"><span class="ico">${t[2]}</span></button>`).join('')}<button class="tbtn" data-a="fillsh" title="Заливать фигуры">■</button></div>
  <div class="pt-grp" style="gap:8px"><span class="muted" style="font-size:12px">Толщина</span><input type="range" min="1" max="60" value="6" style="width:90px" class="sz"><span class="szv" style="width:22px;font-size:12px">6</span></div>
  <div class="pt-grp" style="border:0;gap:10px"><label class="pt-cur" title="Свой цвет" style="cursor:pointer;position:relative;overflow:hidden"><input type="color" style="opacity:0;position:absolute;inset:0;width:100%;height:100%;cursor:pointer"></label><div class="pt-colors">${PAL.map(c=>`<i data-c="${c}" style="background:${c}"></i>`).join('')}</div></div></div>
  <div class="pt-area"><div class="pt-stage"><canvas class="base"></canvas><canvas class="ov"></canvas></div></div><div class="statusbar"><span class="cp"></span><span class="dim"></span><span style="flex:1"></span><span class="fn"></span></div></div>`);
 const win=WM.create({app:'paint',title:'Безымянный — Paint',icon:AI.paint(),width:980,height:660,content:root,minW:600});
 const base=$('.base',root),ov=$('.ov',root),bx=base.getContext('2d',{willReadFrequently:true}),ox=ov.getContext('2d');let W=800,H=500,tool='brush',color='#000000',size=6,fillSh=false,path=o.path||null,undo=[],redo=[],dirty=false;
 function setSize(w,h){W=w;H=h;[base,ov].forEach(c=>{c.width=w;c.height=h;});$('.pt-stage',root).style.width=w+'px';$('.pt-stage',root).style.height=h+'px';$('.dim',root).textContent=`${w} × ${h} пикс.`;}
 function blank(){bx.fillStyle='#fff';bx.fillRect(0,0,W,H);}
 function push(){undo.push(bx.getImageData(0,0,W,H));if(undo.length>40)undo.shift();redo=[];dirty=true;upd();}
 function upd(){$('[data-a=undo]',root).disabled=!undo.length;$('[data-a=redo]',root).disabled=!redo.length;$$('[data-t]',root).forEach(b=>b.classList.toggle('on',b.dataset.t===tool));$('[data-a=fillsh]',root).classList.toggle('on',fillSh);
  $$('.pt-colors i',root).forEach(i=>i.classList.toggle('on',i.dataset.c===color));$('.pt-cur',root).style.background=color;$('.fn',root).textContent=path?path:'';win.setTitle((path?VFS.basename(path):'Безымянный')+(dirty?'*':'')+' — Paint');
  ov.style.cursor=tool==='fill'?'cell':tool==='picker'?'copy':'crosshair';}
 setSize(W,H);blank();upd();
 const pos=e=>{const r=ov.getBoundingClientRect();return{x:Math.round((e.clientX-r.left)*W/r.width),y:Math.round((e.clientY-r.top)*H/r.height)};};
 function flood(x,y,hex){const img=bx.getImageData(0,0,W,H),d=img.data;const i0=(y*W+x)*4;const t=[d[i0],d[i0+1],d[i0+2],d[i0+3]];const n=parseInt(hex.slice(1),16),f=[n>>16,n>>8&255,n&255,255];
  if(t.every((v,i)=>Math.abs(v-f[i])<2))return;const match=i=>Math.abs(d[i]-t[0])<32&&Math.abs(d[i+1]-t[1])<32&&Math.abs(d[i+2]-t[2])<32&&Math.abs(d[i+3]-t[3])<32;
  const st=[[x,y]];while(st.length){let[cx,cy]=st.pop();let i=(cy*W+cx)*4;while(cy>=0&&match(i)){cy--;i-=W*4;}cy++;i+=W*4;let l=false,r=false;
   while(cy<H&&match(i)){d[i]=f[0];d[i+1]=f[1];d[i+2]=f[2];d[i+3]=255;if(cx>0){if(match(i-4)){if(!l){st.push([cx-1,cy]);l=true;}}else l=false;}if(cx<W-1){if(match(i+4)){if(!r){st.push([cx+1,cy]);r=true;}}else r=false;}cy++;i+=W*4;}}
  bx.putImageData(img,0,0);}
 function shape(c,a,b){c.strokeStyle=color;c.fillStyle=color;c.lineWidth=size;c.lineCap='round';c.lineJoin='round';c.beginPath();
  if(tool==='line'){c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}
  if(tool==='rect'){c.rect(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.abs(b.x-a.x),Math.abs(b.y-a.y));fillSh?c.fill():c.stroke();}
  if(tool==='ellipse'){c.ellipse((a.x+b.x)/2,(a.y+b.y)/2,Math.abs(b.x-a.x)/2,Math.abs(b.y-a.y)/2,0,0,Math.PI*2);fillSh?c.fill():c.stroke();}}
 let drawing=null;
 ov.addEventListener('pointerdown',e=>{if(e.button>1)return;const p=pos(e);ov.setPointerCapture(e.pointerId);
  if(tool==='picker'){const d=bx.getImageData(p.x,p.y,1,1).data;color='#'+[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('');tool='brush';upd();return;}
  push();if(tool==='fill'){flood(clamp(p.x,0,W-1),clamp(p.y,0,H-1),color);return;}
  drawing={a:p,last:p};if(['pencil','brush','eraser'].includes(tool)){bx.beginPath();const s=tool==='pencil'?Math.max(1,Math.round(size/4)):size;bx.fillStyle=tool==='eraser'?'#fff':color;if(tool==='pencil')bx.fillRect(p.x-(s>>1),p.y-(s>>1),s,s);else{bx.arc(p.x,p.y,s/2,0,7);bx.fill();}}});
 ov.addEventListener('pointermove',e=>{const p=pos(e);$('.cp',root).textContent=`${clamp(p.x,0,W)}, ${clamp(p.y,0,H)} пикс.`;if(!drawing)return;
  if(['pencil','brush','eraser'].includes(tool)){bx.strokeStyle=tool==='eraser'?'#fff':color;bx.lineWidth=tool==='pencil'?Math.max(1,Math.round(size/4)):size;bx.lineCap=tool==='pencil'?'square':'round';bx.lineJoin='round';bx.imageSmoothingEnabled=tool!=='pencil';bx.beginPath();bx.moveTo(drawing.last.x,drawing.last.y);bx.lineTo(p.x,p.y);bx.stroke();drawing.last=p;}
  else{ox.clearRect(0,0,W,H);let b=p;if(e.shiftKey&&tool!=='line'){const d=Math.max(Math.abs(p.x-drawing.a.x),Math.abs(p.y-drawing.a.y));b={x:drawing.a.x+Math.sign(p.x-drawing.a.x)*d,y:drawing.a.y+Math.sign(p.y-drawing.a.y)*d};}drawing.b=b;shape(ox,drawing.a,b);}});
 const end=()=>{if(!drawing)return;if(drawing.b&&['line','rect','ellipse'].includes(tool)){ox.clearRect(0,0,W,H);shape(bx,drawing.a,drawing.b);}drawing=null;upd();};
 ov.addEventListener('pointerup',end);ov.addEventListener('pointercancel',end);ov.addEventListener('pointerleave',()=>$('.cp',root).textContent='');
 const loadImg=p=>{const d=VFS.read(p);if(!d||!d.startsWith('data:image'))return Shell.alert('Paint','Не удаётся открыть этот файл.');const im=new Image();im.onload=()=>{setSize(Math.min(im.width,2000),Math.min(im.height,2000));blank();bx.drawImage(im,0,0);path=VFS.real(p);undo=[];redo=[];dirty=false;upd();};im.src=d;};
 async function saveImg(){let p=path;if(!p){const n=await Shell.prompt('Сохранить рисунок','Имя файла (сохраняется в «Изображения»):',VFS.uniqueName('C:\\Users\\User\\Pictures','Рисунок','.png'));if(!n)return false;p='C:\\Users\\User\\Pictures\\'+(n.toLowerCase().endsWith('.png')?n:n+'.png');}
  if(!VFS.write(p,base.toDataURL('image/png')))return false;path=VFS.real(p);dirty=false;upd();Shell.notify({title:'Рисунок сохранён',body:path,app:'Paint',icon:AI.paint(),silent:true});return true;}
 root.addEventListener('click',async e=>{const t=e.target.closest('[data-t]');if(t){tool=t.dataset.t;upd();return;}const c=e.target.closest('.pt-colors i');if(c){color=c.dataset.c;upd();return;}
  const a=e.target.closest('[data-a]')?.dataset.a;if(!a)return;
  if(a==='undo'&&undo.length){redo.push(bx.getImageData(0,0,W,H));const im=undo.pop();if(im.width!==W||im.height!==H)setSize(im.width,im.height);bx.putImageData(im,0,0);upd();}
  if(a==='redo'&&redo.length){undo.push(bx.getImageData(0,0,W,H));bx.putImageData(redo.pop(),0,0);upd();}
  if(a==='clear'){push();blank();}if(a==='fillsh'){fillSh=!fillSh;upd();}
  if(a==='new'){if(dirty&&!await Shell.confirm('Paint','Отказаться от несохранённых изменений?'))return;setSize(800,500);blank();path=null;undo=[];redo=[];dirty=false;upd();}
  if(a==='open'){const p=await Shell.pickFile('Открыть рисунок',IMG_EXT);p&&loadImg(p);}
  if(a==='save')saveImg();if(a==='dl'){const l=document.createElement('a');l.download=(path?VFS.basename(path).replace(/\.[^.]+$/,''):'Рисунок')+'.png';l.href=base.toDataURL('image/png');document.body.appendChild(l);l.click();l.remove();}});
 $('.sz',root).oninput=e=>{size=+e.target.value;$('.szv',root).textContent=size;};$('.pt-cur input',root).oninput=e=>{color=e.target.value;upd();};
 root.tabIndex=0;root.addEventListener('keydown',e=>{if(!e.ctrlKey)return;const k=e.key.toLowerCase();if(k==='z'||k==='я'){e.preventDefault();$('[data-a=undo]',root).click();}if(k==='y'||k==='н'){e.preventDefault();$('[data-a=redo]',root).click();}if(k==='s'||k==='ы'){e.preventDefault();saveImg();}});
 win.onClose=()=>{if(!dirty)return true;Shell.dialog({title:'Paint',icon:AI.paint(),html:'<p>Сохранить изменения?</p>',buttons:[{label:'Сохранить',primary:true,value:'s'},{label:'Не сохранять',value:'n'},{label:'Отмена',value:null}]}).then(async r=>{if(!r)return;if(r==='s'&&!await saveImg())return;win.onClose=null;WM.close(win);});return false;};
 if(path)loadImg(path);return win;}});

/* ============================ RUN DIALOG & WINVER ============================ */
Apps.register('run',{name:'Выполнить',icon:AI.run,hidden:true,single:true,launch(){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1"><div class="dlg"><div style="display:flex;gap:14px;align-items:flex-start"><span class="ic" style="width:36px;height:36px;flex:none">${AI.run()}</span><p>Введите имя программы, папки или документа, которые нужно открыть.</p></div><div style="display:flex;align-items:center;gap:10px"><span>Открыть:</span><input class="inp" style="flex:1" list="runl" value="${esc(LS.get('lastRun','cmd'))}"><datalist id="runl">${['notepad','calc','mspaint','cmd','powershell','explorer','taskmgr','winmine','sol','ms-settings:','winver','C:\\Users\\User\\Documents'].map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div></div><div class="dlg-foot"><button class="btn primary" data-a="ok">OK</button><button class="btn" data-a="cancel">Отмена</button><button class="btn" data-a="browse">Обзор…</button></div></div>`);
 const win=WM.create({app:'run',title:'Выполнить',icon:AI.run(),width:420,height:220,content:root,resizable:false,minimizable:false,x:14,y:WM.H-234});const inp=$('input',root);setTimeout(()=>{inp.focus();inp.select();},50);
 const map={notepad:'notepad',calc:'calc',mspaint:'paint',paint:'paint',cmd:'terminal',powershell:'terminal',wt:'terminal',terminal:'terminal',explorer:'explorer',taskmgr:'taskmgr',winmine:'minesweeper',sol:'solitaire',control:'settings','ms-settings:':'settings',settings:'settings',winver:'winver'};
 const go=()=>{const v=inp.value.trim();if(!v)return;LS.set('lastRun',v);const k=v.toLowerCase().replace(/\.exe$/,'');
  if(map[k]){WM.close(win);return Apps.launch(map[k]);}if(k==='bsod'){WM.close(win);return Shell.bsod();}const p=VFS.resolve('C:\\',v);if(VFS.exists(p)){WM.close(win);return Apps.openFile(VFS.real(p));}
  if(/^https?:\/\//.test(v)){WM.close(win);return window.open(v,'_blank');}Shell.alert(v,`Не удается найти "${v}". Проверьте, правильно ли указано имя, и повторите попытку.`);};
 root.addEventListener('click',async e=>{const a=e.target.closest('[data-a]')?.dataset.a;if(a==='ok')go();if(a==='cancel')WM.close(win);if(a==='browse'){const p=await Shell.pickFile('Обзор',null);if(p){inp.value=p;inp.focus();}}});
 inp.addEventListener('keydown',e=>{if(e.key==='Enter')go();if(e.key==='Escape')WM.close(win);});return win;}});
Apps.register('winver',{name:'О программе Windows',icon:AI.winver,hidden:true,single:true,launch(){
 const root=el(`<div style="display:flex;flex-direction:column;flex:1"><div class="dlg"><div style="display:flex;align-items:center;gap:14px"><span class="ic" style="width:54px;height:54px">${AI.start()}</span><span style="font-size:34px;font-weight:300">Windows 11</span></div><hr style="border:0;border-top:1px solid var(--border)"><p>Майкрософт Windows<br>Версия 23H2 (сборка ОС 22631.4317) — Web Edition<br>© Web11 Project. Все права защищены.</p><p class="muted">Виртуальная ОС работает полностью в браузере. Лицензия выдана пользователю: ${esc(Settings.get('user'))}</p></div><div class="dlg-foot"><button class="btn primary">OK</button></div></div>`);
 const win=WM.create({app:'winver',title:'О программе Windows',icon:AI.start(),width:440,height:330,content:root,resizable:false,center:true});$('.btn',root).onclick=()=>WM.close(win);return win;}});
