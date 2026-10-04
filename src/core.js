'use strict';
/* =====================================================================
   WINDOWS 11 WEB EDITION — single-file vanilla JS OS
   Architecture: SoundEngine, FileSystem, WindowManager, AppManager, Shell
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild;}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let _uid=0;const uid=()=>'g'+(++_uid);
const pad=n=>String(n).padStart(2,'0');
const fmtSize=b=>b<1024?b+' Б':b<1048576?(b/1024).toFixed(1)+' КБ':(b/1048576).toFixed(1)+' МБ';
const LS={get(k,d){try{const v=localStorage.getItem('w11.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
 set(k,v){try{localStorage.setItem('w11.'+k,JSON.stringify(v));return true}catch(e){return false}},
 clear(){Object.keys(localStorage).filter(k=>k.startsWith('w11.')).forEach(k=>localStorage.removeItem(k))}};
const MONTHS=['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const MONTHS_G=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const DAYS=['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];

/* ============================ ICONS (inline SVG) ============================ */
const sk=(d,vb=16,w=1.2)=>`<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I={
 min:sk('<path d="M2 8h12"/>'),max:sk('<rect x="2.5" y="2.5" width="11" height="11" rx="1.8"/>'),
 restore:sk('<rect x="2.5" y="5" width="8.5" height="8.5" rx="1.5"/><path d="M5 2.5h6.5A2 2 0 0 1 13.5 4.5V11"/>'),close:sk('<path d="M3 3l10 10M13 3L3 13"/>'),
 back:sk('<path d="M13 8H3M7 4L3 8l4 4"/>'),fwd:sk('<path d="M3 8h10M9 4l4 4-4 4"/>'),up:sk('<path d="M8 13V3M4 7l4-4 4 4"/>'),
 refresh:sk('<path d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3"/>'),plus:sk('<path d="M8 3v10M3 8h10"/>'),
 trash:sk('<path d="M2.5 4.5h11M6.3 4.5V3h3.4v1.5M4 4.5l.7 9h6.6l.7-9"/>'),rename:sk('<path d="M10.5 2.5l3 3L6 13H3v-3z"/>'),
 search:sk('<circle cx="7" cy="7" r="4.5"/><path d="M10.4 10.4L14 14"/>'),
 power:sk('<path d="M8 2v5.5"/><path d="M4.5 4.3a5.2 5.2 0 1 0 7 0"/>'),
 wifi:sk('<path d="M1.5 6a9.3 9.3 0 0 1 13 0M3.7 8.4a6.2 6.2 0 0 1 8.6 0M5.9 10.8a3 3 0 0 1 4.2 0"/><circle cx="8" cy="13.2" r=".7" fill="currentColor"/>'),
 wifiOff:sk('<path d="M2 2l12 12M1.5 6a9.3 9.3 0 0 1 4-2.3M14.5 6a9.3 9.3 0 0 0-5.3-2.4M5.9 10.8a3 3 0 0 1 4.2 0"/>'),
 vol:sk('<path d="M2 6h2.4L8 3v10L4.4 10H2z"/><path d="M10.5 5.5a3.4 3.4 0 0 1 0 5M12.4 3.7a6 6 0 0 1 0 8.6"/>'),
 mute:sk('<path d="M2 6h2.4L8 3v10L4.4 10H2z"/><path d="M10.5 6l3.5 4M14 6l-3.5 4"/>'),
 battery:'<svg viewBox="0 0 16 16"><rect x="1" y="4.5" width="12.5" height="7" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="14" y="6.5" width="1.3" height="3" rx=".5" fill="currentColor"/><rect x="2.6" y="6" width="8" height="4" rx=".7" fill="currentColor"/></svg>',
 bell:sk('<path d="M4 11V7a4 4 0 0 1 8 0v4l1.2 1.5H2.8zM6.5 14a1.6 1.6 0 0 0 3 0"/>'),
 bt:sk('<path d="M5 5l6 6-3 2.5V2.5L11 5l-6 6"/>'),plane:sk('<path d="M8 1.8c.8 0 1.2 1 1.2 2V6l5 3v1.4l-5-1.5v3l1.6 1.3V14L8 13.2 5.2 14v-.8l1.6-1.3v-3l-5 1.5V9l5-3V3.8c0-1 .4-2 1.2-2z"/>'),
 moon:sk('<path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"/>'),
 sun:sk('<circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1"/>'),
 theme:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.8" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 2.2a5.8 5.8 0 0 1 0 11.6z" fill="currentColor"/></svg>',
 access:sk('<circle cx="8" cy="3" r="1.3"/><path d="M3 5.5l5 1 5-1M8 6.5v3l-2.5 4.5M8 9.5l2.5 4.5"/>'),
 chevUp:sk('<path d="M4 10l4-4 4 4"/>'),chevDown:sk('<path d="M4 6l4 4 4-4"/>'),chevR:sk('<path d="M6 4l4 4-4 4"/>'),chevL:sk('<path d="M10 4L6 8l4 4"/>'),
 lock:sk('<rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.2 7V5a2.8 2.8 0 0 1 5.6 0v2"/>'),
 restart:sk('<path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.8h2.8"/>'),
 bug:sk('<rect x="4.5" y="5" width="7" height="8.5" rx="3.5"/><path d="M6 5a2 2 0 0 1 4 0M2 8h2.5M11.5 8H14M2.5 12l2-1M13.5 12l-2-1M2.5 4l2 1.5M13.5 4l-2 1.5"/>'),
 gear:sk('<circle cx="8" cy="8" r="2.2"/><path d="M8 1.5l1.2 1.7 2-.6.4 2 2 .6-.6 2L14.5 8l-1.5 1.2.6 2-2 .5-.5 2-2-.6L8 14.5l-1.2-1.4-2 .6-.4-2-2-.5.6-2L1.5 8 3 6.8l-.6-2 2-.6.4-2 2 .6z"/>'),
 view:sk('<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>'),
 sort:sk('<path d="M4 3v10M2 11l2 2 2-2M9 4h5M9 8h3.5M9 12h2"/>'),
 newi:sk('<path d="M9 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V6zM9 2v4h4M8 8v4M6 10h4"/>'),
 folder:sk('<path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h3l1.5 1.5h4.5A1.5 1.5 0 0 1 14 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5z"/>'),
 file:sk('<path d="M9 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V6zM9 2v4h4"/>'),
 image:sk('<rect x="2" y="3" width="12" height="10" rx="1.5"/><circle cx="5.5" cy="6.2" r="1.1"/><path d="M2.5 12l4-4 3 3 1.5-1.5 2.5 2.5"/>'),
 term:sk('<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M4.5 6.5l2 1.5-2 1.5M8 10.5h3.5"/>'),
 menu:sk('<path d="M2.5 4h11M2.5 8h11M2.5 12h11"/>'),history:sk('<path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5V5h2.5M8 5v3.3l2 1.4"/>'),
 send:sk('<path d="M2 8l12-5.5L10 14l-2.5-4.5zM7.5 9.5L14 2.5"/>'),copy:sk('<rect x="5" y="5" width="8.5" height="8.5" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/>'),
 undo:sk('<path d="M4 6.5h6a3.5 3.5 0 0 1 0 7H7M6.5 3.5l-3 3 3 3"/>'),redo:sk('<path d="M12 6.5H6a3.5 3.5 0 0 0 0 7h3M9.5 3.5l3 3-3 3"/>'),
 download:sk('<path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10"/>'),save:sk('<path d="M3 2.5h8l2.5 2.5v8.5H3zM5 2.5v3.5h5V2.5M5 13.5V9h6v4.5"/>'),open:sk('<path d="M2 12V4.5A1.5 1.5 0 0 1 3.5 3h3l1.5 1.5h4.5A1.5 1.5 0 0 1 14 6v1M2 12l2-5h11l-2 5z"/>'),
 pencil:sk('<path d="M11 2.5l2.5 2.5L5 13.5H2.5V11zM9.5 4l2.5 2.5"/>'),
 brush:sk('<path d="M13.5 2.5l-6 6.5M7.5 9a2 2 0 0 0-2.8 0c-.8.8-.3 2-1.2 3.5 1.6.3 3.2 0 4-1 .7-.8.8-1.8 0-2.5z"/>'),
 eraser:sk('<path d="M6 13.5l-3.5-3.5L9 3.5l4.5 4.5-5.5 5.5zM5.5 6.5l4.5 4.5M6 13.5h7.5"/>'),
 bucket:sk('<path d="M7 2.5l5.5 5.5L8 12.5 2.5 7zM2.5 7h10M13.5 10.5s1 1.3 1 2a1 1 0 0 1-2 0c0-.7 1-2 1-2z"/>'),
 line:sk('<path d="M3 13L13 3"/>'),rect:sk('<rect x="2.5" y="3.5" width="11" height="9" rx=".5"/>'),ellipse:sk('<ellipse cx="8" cy="8" rx="5.5" ry="4.5"/>'),
 flag:'<svg viewBox="0 0 16 16"><path d="M4 14V2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M4.6 2.4h8l-2 3 2 3h-8z" fill="#ff4d4d"/></svg>',
 clock:sk('<circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.5 1.5"/>'),
 cpu:sk('<rect x="4" y="4" width="8" height="8" rx="1"/><path d="M6 2v2M10 2v2M6 12v2M10 12v2M2 6h2M2 10h2M12 6h2M12 10h2"/>'),
 procs:sk('<rect x="2" y="2.5" width="12" height="11" rx="1.5"/><path d="M2 6h12M5 9h6M5 11h4"/>'),
 perf:sk('<path d="M1.5 13.5h13M2.5 11l3-4 2.5 2.5 3-5 2.5 3"/>'),
 sys:sk('<rect x="1.5" y="2.5" width="13" height="9" rx="1.2"/><path d="M5.5 14h5M8 11.5V14"/>'),
 brush2:sk('<path d="M8 1.8a6.2 6.2 0 1 0 0 12.4c1 0 1.2-.8.8-1.6-.5-1 .2-2 1.3-2h1.6a2.5 2.5 0 0 0 2.5-2.5C14.2 4.6 11.4 1.8 8 1.8z"/><circle cx="5" cy="7" r=".8"/><circle cx="8" cy="5" r=".8"/><circle cx="11" cy="6.5" r=".8"/>'),
 apps:sk('<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><path d="M11.5 9v5M9 11.5h5"/>'),
 info:sk('<circle cx="8" cy="8" r="6"/><path d="M8 7.3v4M8 4.8v.2"/>'),
 check:sk('<path d="M3 8.5l3 3 7-7"/>'),dot:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="currentColor"/></svg>',
 run:sk('<path d="M5 3l8 5-8 5z"/>'),win:sk('<rect x="2" y="2" width="5.5" height="5.5"/><rect x="8.5" y="2" width="5.5" height="5.5"/><rect x="2" y="8.5" width="5.5" height="5.5"/><rect x="8.5" y="8.5" width="5.5" height="5.5"/>'),
};
function gearD(cx,cy,ro,ri,n){const p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,s=Math.PI/n;[[ri,a-s*.95],[ro,a-s*.5],[ro,a+s*.5],[ri,a+s*.95]].forEach(([r,t])=>p.push((cx+r*Math.cos(t)).toFixed(2)+' '+(cy+r*Math.sin(t)).toFixed(2)));}return 'M'+p.join('L')+'Z';}
const GEAR=gearD(24,24,20,16,8);
/* colored app icons — functions generate unique gradient IDs */
const AI={
 start(){const a=uid();return `<svg viewBox="0 0 24 24"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#52c7ff"/><stop offset="1" stop-color="#0067d6"/></linearGradient></defs><rect x="1.5" y="1.5" width="10" height="10" rx="1.4" fill="url(#${a})"/><rect x="12.5" y="1.5" width="10" height="10" rx="1.4" fill="url(#${a})"/><rect x="1.5" y="12.5" width="10" height="10" rx="1.4" fill="url(#${a})"/><rect x="12.5" y="12.5" width="10" height="10" rx="1.4" fill="url(#${a})"/></svg>`},
 folder(band){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd96a"/><stop offset="1" stop-color="#f6b700"/></linearGradient></defs><path d="M4 11a3 3 0 0 1 3-3h11l4 4h19a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="#e09b00"/><path d="M4 17a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="url(#${a})"/>${band?`<rect x="4" y="31" width="40" height="4.5" fill="${band}"/>`:''}</svg>`},
 explorer(){return AI.folder('#1e88e5')},
 terminal(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a4a"/><stop offset="1" stop-color="#1e1e1e"/></linearGradient></defs><rect x="4" y="7" width="40" height="34" rx="5" fill="url(#${a})"/><rect x="4.5" y="7.5" width="39" height="33" rx="4.5" fill="none" stroke="#7a7a7a" stroke-opacity=".5"/><path d="M12 19l7 5.5-7 5.5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 31h12" stroke="#4cc2ff" stroke-width="3" stroke-linecap="round"/></svg>`},
 notepad(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5ab8ff"/><stop offset="1" stop-color="#1565d8"/></linearGradient></defs><rect x="8" y="6" width="32" height="38" rx="4" fill="url(#${a})"/><rect x="12" y="12" width="24" height="28" rx="2" fill="#fff"/><path d="M16 19h16M16 25h16M16 31h10" stroke="#1e6fd9" stroke-width="2.2" stroke-linecap="round"/><path d="M16 4v6M24 4v6M32 4v6" stroke="#0b3f8f" stroke-width="2.6" stroke-linecap="round"/></svg>`},
 paint(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dcdcdc"/></linearGradient></defs><path d="M24 5C12.5 5 5 13 5 23c0 9 6.5 16 14 16 3 0 3.5-2.2 3-4-.6-2.4.6-4.5 3.5-4.5H32c6.5 0 11-4 11-10.5C43 12 34.5 5 24 5z" fill="url(#${a})" stroke="#bdbdbd"/><circle cx="14" cy="21" r="3.4" fill="#e53935"/><circle cx="20" cy="13" r="3.4" fill="#fdd835"/><circle cx="30" cy="12.5" r="3.4" fill="#43a047"/><circle cx="36" cy="20" r="3.4" fill="#1e88e5"/><path d="M44 30L30 44" stroke="#8d6e63" stroke-width="3.5" stroke-linecap="round"/><path d="M30 44l-4 1 1-4z" fill="#5d4037"/></svg>`},
 minesweeper(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cc0ff"/><stop offset="1" stop-color="#2f6fd6"/></linearGradient></defs><rect x="4" y="4" width="40" height="40" rx="8" fill="url(#${a})"/><g stroke="#1b1b1b" stroke-width="3" stroke-linecap="round"><path d="M24 10v28M10 24h28M14 14l20 20M34 14L14 34"/></g><circle cx="24" cy="24" r="9.5" fill="#1b1b1b"/><circle cx="20.5" cy="20.5" r="2.6" fill="#fff"/></svg>`},
 solitaire(){return `<svg viewBox="0 0 48 48"><g transform="rotate(-14 20 26)"><rect x="7" y="9" width="22" height="31" rx="3" fill="#fff" stroke="#c7c7c7"/><path d="M18 18c-2.5 2.6-6 5-6 8a3 3 0 0 0 5 2l-1 4h4l-1-4a3 3 0 0 0 5-2c0-3-3.5-5.4-6-8z" fill="#222"/></g><g transform="rotate(10 30 26)"><rect x="19" y="9" width="22" height="31" rx="3" fill="#fff" stroke="#c7c7c7"/><path d="M30 33c-5-4-8-6.5-8-9.5a3.8 3.8 0 0 1 8-1.6 3.8 3.8 0 0 1 8 1.6c0 3-3 5.5-8 9.5z" fill="#e53935"/></g></svg>`},
 taskmgr(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3dd68c"/><stop offset="1" stop-color="#0e8a5a"/></linearGradient></defs><rect x="5" y="7" width="38" height="34" rx="5" fill="url(#${a})"/><rect x="9" y="13" width="30" height="24" rx="2" fill="#0b3d2a" opacity=".55"/><path d="M10 29l6-6 5 5 7-10 5 7 5-3" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`},
 calc(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b5b5b"/><stop offset="1" stop-color="#2c2c2c"/></linearGradient></defs><rect x="8" y="4" width="32" height="40" rx="5" fill="url(#${a})"/><rect x="12" y="8" width="24" height="9" rx="2" fill="#cfe8ff"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${12+c*8.5}" y="${21+r*7.3}" width="6.5" height="5.3" rx="1.2" fill="${c==2&&r==2?'#4cc2ff':'#9e9e9e'}"/>`).join('')).join('')}</svg>`},
 settings(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b4bcc8"/><stop offset="1" stop-color="#5f6875"/></linearGradient></defs><path d="${GEAR}" fill="url(#${a})"/><circle cx="24" cy="24" r="9" fill="#3d4550"/><circle cx="24" cy="24" r="5.5" fill="#4cc2ff"/></svg>`},
 copilot(){const a=uid(),b=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1fb6ff"/><stop offset="1" stop-color="#28d17c"/></linearGradient><linearGradient id="${b}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6ad5"/><stop offset="1" stop-color="#ffb547"/></linearGradient></defs><rect x="7" y="6" width="17" height="32" rx="8.5" transform="rotate(-25 15 22)" fill="url(#${a})"/><rect x="24" y="10" width="17" height="32" rx="8.5" transform="rotate(-25 32 26)" fill="url(#${b})" opacity=".93"/></svg>`},
 weather(){return `<svg viewBox="0 0 48 48"><circle cx="20" cy="18" r="9" fill="#ffc83d"/><g stroke="#ffc83d" stroke-width="2.5" stroke-linecap="round"><path d="M20 3v3M20 30v3M5 18h3M32 18h3M9.4 7.4l2.1 2.1M28.5 26.5l2.1 2.1M9.4 28.6l2.1-2.1M28.5 9.5l2.1-2.1"/></g><path d="M16 40a7 7 0 0 1 .8-14 9 9 0 0 1 17-1 7.5 7.5 0 0 1 .7 15z" fill="#fff" stroke="#d6e4f5"/></svg>`},
 cloud(){return `<svg viewBox="0 0 48 48"><path d="M13 37a8 8 0 0 1 .9-16 11 11 0 0 1 21-1.5A9 9 0 0 1 35 37z" fill="#e7eef8" stroke="#b9c9dd"/></svg>`},
 rain(){return `<svg viewBox="0 0 48 48"><path d="M13 30a8 8 0 0 1 .9-16 11 11 0 0 1 21-1.5A9 9 0 0 1 35 30z" fill="#cfd8e3" stroke="#9fb0c4"/><path d="M16 35l-2 5M24 35l-2 5M32 35l-2 5" stroke="#4ea4ff" stroke-width="2.5" stroke-linecap="round"/></svg>`},
 sunny(){return `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#ffc83d"/><g stroke="#ffc83d" stroke-width="3" stroke-linecap="round"><path d="M24 4v5M24 39v5M4 24h5M39 24h5M9.9 9.9l3.5 3.5M34.6 34.6l3.5 3.5M9.9 38.1l3.5-3.5M34.6 13.4l3.5-3.5"/></g></svg>`},
 pc(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fd0ff"/><stop offset="1" stop-color="#0a62d6"/></linearGradient></defs><rect x="4" y="7" width="40" height="27" rx="3" fill="#3a3a3a"/><rect x="6.5" y="9.5" width="35" height="22" rx="1.5" fill="url(#${a})"/><path d="M19 34h10l2 6H17z" fill="#8a8a8a"/><rect x="13" y="39.5" width="22" height="3" rx="1.5" fill="#b0b0b0"/></svg>`},
 drive(){return `<svg viewBox="0 0 48 48"><rect x="4" y="16" width="40" height="18" rx="4" fill="#9aa3ad"/><rect x="4" y="14" width="40" height="16" rx="4" fill="#d5dbe1"/><rect x="9" y="20" width="9" height="4" rx="1" fill="#33c26b"/><g fill="#0067c0"><rect x="30" y="18" width="4" height="4"/><rect x="35" y="18" width="4" height="4"/><rect x="30" y="23" width="4" height="4"/><rect x="35" y="23" width="4" height="4"/></g></svg>`},
 docs(){return `<svg viewBox="0 0 48 48">${AI._page('#4a90e2')}<path d="M15 22h18M15 27h18M15 32h12" stroke="#4a90e2" stroke-width="2" stroke-linecap="round"/></svg>`},
 _page(c){return `<path d="M10 5h20l9 9v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="#fff" stroke="${c||'#c8c8c8'}" stroke-width="1.4"/><path d="M30 5v7a2 2 0 0 0 2 2h7" fill="#e8eef5" stroke="${c||'#c8c8c8'}" stroke-width="1.4"/>`},
 txt(){return `<svg viewBox="0 0 48 48">${AI._page()}<path d="M15 20h18M15 25h18M15 30h18M15 35h10" stroke="#9a9a9a" stroke-width="1.8" stroke-linecap="round"/></svg>`},
 img(){return `<svg viewBox="0 0 48 48">${AI._page()}<rect x="13" y="19" width="22" height="17" rx="2" fill="#4ea4ff"/><path d="M13 33l7-7 5 5 3-3 7 7v.5a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2z" fill="#2e7d32"/><circle cx="30" cy="24" r="2.4" fill="#ffeb3b"/></svg>`},
 unknown(){return `<svg viewBox="0 0 48 48">${AI._page()}<rect x="14" y="22" width="20" height="12" rx="2" fill="#b0b7c3"/></svg>`},
 downloads(){return AI.folder('#2ea043')},pictures(){return AI.folder('#e05297')},music(){return AI.folder('#f57c00')},desktopF(){return AI.folder('#00a2ed')},docsF(){return AI.folder('#7b61ff')},
 recycle(full){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9eaf7" stop-opacity=".9"/><stop offset="1" stop-color="#9fc3e6" stop-opacity=".9"/></linearGradient></defs>${full?'<path d="M14 12l6-6 6 4 8-3 2 7z" fill="#fff" stroke="#bbb"/>':''}<path d="M10 12h28l-3 30a3 3 0 0 1-3 2.6H16a3 3 0 0 1-3-2.6z" fill="url(#${a})" stroke="#7fa8d1"/><rect x="8" y="10" width="32" height="4" rx="2" fill="#cfe1f2" stroke="#7fa8d1"/><path d="M19 20l1 18M24 20v18M29 20l-1 18" stroke="#7fa8d1" stroke-width="1.6" stroke-linecap="round"/></svg>`},
 user(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fa4bd"/><stop offset="1" stop-color="#5a6b80"/></linearGradient></defs><rect width="48" height="48" fill="url(#${a})"/><circle cx="24" cy="19" r="8.5" fill="#e6edf5"/><path d="M8 46c1.5-9 8-13.5 16-13.5S38.5 37 40 46z" fill="#e6edf5"/></svg>`},
 viewer(){const a=uid();return `<svg viewBox="0 0 48 48"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8bb0"/><stop offset="1" stop-color="#8e5cff"/></linearGradient></defs><rect x="5" y="8" width="38" height="32" rx="6" fill="url(#${a})"/><circle cx="17" cy="18" r="4" fill="#fff"/><path d="M8 36l11-11 7 7 5-5 9 9z" fill="#fff" opacity=".9"/></svg>`},
 run(){return `<svg viewBox="0 0 48 48"><rect x="5" y="8" width="38" height="32" rx="5" fill="#3b3b3b"/><rect x="5" y="8" width="38" height="8" rx="4" fill="#0078d4"/><path d="M14 26h20M28 21l6 5-6 5" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`},
 winver(){return AI.start()},
};

/* ============================ SETTINGS STORE ============================ */
const DEFAULTS={theme:'dark',wallpaper:'bloom-dark',accent:'#0078d4',volume:60,brightness:100,nightLight:false,wifi:true,bt:true,airplane:false,iconSize:'medium',sort:'name',sounds:true,transparency:true,notifications:true,user:'User',lastLogin:null};
const Settings={data:Object.assign({},DEFAULTS,LS.get('settings',{})),
 get(k){return this.data[k]},set(k,v){this.data[k]=v;LS.set('settings',this.data);Bus.emit('setting',k,v);},
};
const Bus={h:{},on(e,f){(this.h[e]=this.h[e]||[]).push(f)},emit(e,...a){(this.h[e]||[]).forEach(f=>{try{f(...a)}catch(err){console.error(err)}})}};

/* ============================ SOUND ENGINE ============================ */
class SoundEngine{
 constructor(){this.ctx=null;}
 ensure(){if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;this.ctx=new C();this.master=this.ctx.createGain();this.master.connect(this.ctx.destination);
  // simple feedback-delay reverb
  this.delay=this.ctx.createDelay();this.delay.delayTime.value=.18;this.fb=this.ctx.createGain();this.fb.gain.value=.32;this.wet=this.ctx.createGain();this.wet.gain.value=.35;
  const lp=this.ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;this.delay.connect(lp);lp.connect(this.fb);this.fb.connect(this.delay);lp.connect(this.wet);this.wet.connect(this.master);}
  if(this.ctx.state==='suspended')this.ctx.resume();this.master.gain.value=Settings.get('volume')/100;return this.ctx;}
 tone(freq,start,dur,{type='sine',gain=.2,attack=.01,rev=true,slide=0}={}){const c=this.ensure();if(!c||!Settings.get('sounds')||Settings.get('volume')==0)return;
  const t=c.currentTime+start,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(this.master);if(rev)g.connect(this.delay);o.start(t);o.stop(t+dur+.05);}
 startup(){[[523.25,0],[659.25,.13],[783.99,.26],[987.77,.4],[1318.5,.58]].forEach(([f,s],i)=>{this.tone(f,s,2.2-i*.15,{gain:.13,attack:.03});this.tone(f/2,s,1.6,{type:'triangle',gain:.05,attack:.05});});this.tone(1975.5,.78,1.4,{gain:.05,attack:.05});}
 click(){this.tone(1500,0,.04,{gain:.04,rev:false,attack:.002});}
 pop(){this.tone(700,0,.09,{gain:.07,rev:false,slide:1100});}
 error(){this.tone(440,0,.25,{type:'triangle',gain:.18});this.tone(330,.14,.4,{type:'triangle',gain:.18});}
 notify(){this.tone(880,0,.5,{gain:.12});this.tone(1318.5,.12,.7,{gain:.1});}
 shutdown(){[[1318.5,0],[987.77,.15],[783.99,.3],[523.25,.48]].forEach(([f,s])=>this.tone(f,s,1.4,{gain:.12,attack:.03}));}
 mine(){this.tone(160,0,.6,{type:'sawtooth',gain:.12,slide:40});}
 win(){[523,659,784,1046,1318].forEach((f,i)=>this.tone(f,i*.09,.5,{gain:.1}));}
}
const Sound=new SoundEngine();

/* ============================ VIRTUAL FILE SYSTEM ============================ */
class FileSystem{
 constructor(){this.root=LS.get('fs',null);if(!this.root||!this.root.children){this.root=this.defaultTree();this.save();}}
 defaultTree(){const now=Date.now();const F=(content)=>({type:'file',content,mtime:now});const D=(children={})=>({type:'dir',children,mtime:now});
  return D({'Users':D({'User':D({'Desktop':D({'Привет.txt':F('Привет! Это файл на рабочем столе.\nДважды щёлкните, чтобы открыть его в Блокноте.')}),
   'Documents':D({'readme.txt':F('Windows 11 — Web Edition\n===========================\n\nГорячие клавиши:\n  Win / Ctrl+Esc        — меню «Пуск»\n  Alt+Tab / Alt+`       — переключение окон\n  Win+D / Alt+Shift+D   — показать рабочий стол\n  Win+E / Alt+Shift+E   — Проводник\n  Win+R / Alt+Shift+R   — «Выполнить»\n  Win+Ctrl+Shift+B / Alt+Shift+B — BSOD\n\nВсе файлы сохраняются в localStorage браузера.\n'),
     'Список дел.txt':F('☐ Купить молоко\n☐ Доиграть в Сапёра на Эксперте\n☑ Установить Windows 11\n'),'Проекты':D({})}),
   'Downloads':D({'setup_log.txt':F('[OK] Установка компонентов завершена\n[OK] Драйверы обновлены\n')}),
   'Pictures':D({}),'Music':D({})})}),
  'Windows':D({'System32':D({'drivers':D({}),'config.sys':F('DEVICE=HIMEM.SYS\nFILES=40'),'kernel32.dll':F('MZ\u0090\u0000 — двоичный файл')}),'win.ini':F('[fonts]\n[extensions]\n[mci extensions]\n')}),
  'Program Files':D({'Paint':D({}),'Minesweeper':D({}),'Solitaire':D({})}),'$Recycle.Bin':D({})});}
 save(){if(!LS.set('fs',this.root)){Shell&&Shell.notify({title:'Недостаточно места',body:'Хранилище браузера переполнено. Удалите лишние файлы.',icon:AI.drive()});return false}Bus.emit('fs');return true;}
 parts(p){const a=String(p).replace(/\//g,'\\').split('\\').filter(Boolean);if(a[0]&&/^[a-z]:$/i.test(a[0]))a.shift();return a;}
 fmt(parts){return 'C:\\'+parts.join('\\');}
 norm(p){return this.fmt(this.parts(p).map((x,i,a)=>x));}
 child(dir,name){if(!dir||dir.type!=='dir')return null;const k=Object.keys(dir.children).find(n=>n.toLowerCase()===String(name).toLowerCase());return k?{key:k,node:dir.children[k]}:null;}
 node(p){let n=this.root;for(const part of this.parts(p)){const c=this.child(n,part);if(!c)return null;n=c.node;}return n;}
 real(p){let n=this.root;const out=[];for(const part of this.parts(p)){const c=this.child(n,part);if(!c)return null;out.push(c.key);n=c.node;}return this.fmt(out);}
 resolve(cwd,p){if(!p)return cwd;p=String(p).trim().replace(/^"|"$/g,'');if(p==='~')return this.home();if(p.startsWith('~'))p=this.home()+p.slice(1);
  let base=/^[a-z]:/i.test(p)||p.startsWith('\\')||p.startsWith('/')?[]:this.parts(cwd);
  for(const x of this.parts(p)){if(x==='..')base.pop();else if(x!=='.')base.push(x);}return this.fmt(base);}
 home(){return 'C:\\Users\\User';}
 dirname(p){const a=this.parts(p);a.pop();return this.fmt(a);}
 basename(p){const a=this.parts(p);return a[a.length-1]||'C:';}
 ext(p){const m=/\.([^.\\]+)$/.exec(p);return m?m[1].toLowerCase():'';}
 isDir(p){const n=this.node(p);return !!n&&n.type==='dir';}
 exists(p){return !!this.node(p);}
 list(p){const n=this.node(p);if(!n||n.type!=='dir')return null;const base=this.real(p);
  return Object.entries(n.children).map(([name,c])=>({name,type:c.type,path:base.replace(/\\$/,'')+'\\'+name,size:c.type==='file'?new Blob([c.content||'']).size:0,mtime:c.mtime}))
   .sort((a,b)=>(a.type===b.type?a.name.localeCompare(b.name,'ru'):a.type==='dir'?-1:1));}
 read(p){const n=this.node(p);return n&&n.type==='file'?n.content:null;}
 mkdir(p){let n=this.root;for(const part of this.parts(p)){let c=this.child(n,part);if(!c){if(n.type!=='dir')return false;n.children[part]={type:'dir',children:{},mtime:Date.now()};c={node:n.children[part]};}n=c.node;}this.save();return true;}
 write(p,content){const dir=this.node(this.dirname(p));if(!dir||dir.type!=='dir')return false;const name=this.basename(p);const c=this.child(dir,name);
  if(c&&c.node.type==='dir')return false;const key=c?c.key:name;dir.children[key]={type:'file',content:String(content),mtime:Date.now()};return this.save();}
 remove(p){const dir=this.node(this.dirname(p));const c=this.child(dir,this.basename(p));if(!c||this.parts(p).length<1)return false;delete dir.children[c.key];this.save();return true;}
 rename(p,newName){if(!newName||/[\\/:*?"<>|]/.test(newName))return false;const dir=this.node(this.dirname(p));const c=this.child(dir,this.basename(p));if(!c)return false;
  const ex=this.child(dir,newName);if(ex&&ex.key!==c.key)return false;delete dir.children[c.key];dir.children[newName]=c.node;c.node.mtime=Date.now();this.save();return true;}
 move(p,toDir){const src=this.node(p),dst=this.node(toDir);if(!src||!dst||dst.type!=='dir')return false;let name=this.basename(p);
  while(this.child(dst,name)){const m=/^(.*?)( \((\d+)\))?(\.[^.]+)?$/.exec(name);name=`${m[1]} (${(+m[3]||1)+1})${m[4]||''}`;}
  const dir=this.node(this.dirname(p));delete dir.children[this.child(dir,this.basename(p)).key];dst.children[name]=src;this.save();return true;}
 uniqueName(dirPath,base,ext){let n=`${base}${ext}`,i=2;while(this.exists(dirPath+'\\'+n))n=`${base} (${i++})${ext}`;return n;}
 walk(p=this.home(),out=[]){const l=this.list(p)||[];for(const e of l){if(e.type==='dir')this.walk(e.path,out);else out.push(e);}return out;}
 reset(){this.root=this.defaultTree();this.save();}
 iconFor(e){if(e.type==='dir'){const n=e.name.toLowerCase();return n==='desktop'?AI.desktopF():n==='documents'?AI.docsF():n==='downloads'?AI.downloads():n==='pictures'?AI.pictures():n==='music'?AI.music():AI.folder();}
  const x=this.ext(e.name);return ['png','jpg','jpeg','gif','bmp','webp'].includes(x)?AI.img():['txt','log','md','ini','sys','js','json','html','css','bat','ps1'].includes(x)?AI.txt():AI.unknown();}
}
const VFS=new FileSystem();

/* ============================ WINDOW MANAGER ============================ */
class WindowManager{
 constructor(layer){this.layer=layer;this.wins=new Map();this.z=20;this.active=null;this.seq=0;this.order=[];}
 get W(){return this.layer.clientWidth} get H(){return this.layer.clientHeight}
 create(o){
  const id='w'+(++this.seq);const resizable=o.resizable!==false;const maxable=o.maximizable!==false&&resizable;
  const w=el(`<div class="win" data-id="${id}"><div class="wclip"><div class="titlebar"><span class="ticon">${o.icon||''}</span><span class="ttitle"></span>
   <div class="wctrls">${o.minimizable===false?'':`<button class="wc min" title="Свернуть">${I.min}</button>`}${maxable?`<button class="wc max" title="Развернуть">${I.max}</button>`:''}<button class="wc close" title="Закрыть">${I.close}</button></div></div><div class="wbody"></div></div>
   ${resizable?['n','s','e','w','ne','nw','se','sw'].map(d=>`<div class="rz rz-${d}" data-d="${d}"></div>`).join(''):''}</div>`);
  const win={id,el:w,app:o.app,icon:o.icon,title:o.title,body:$('.wbody',w),minW:o.minW||320,minH:o.minH||200,maximized:false,minimized:false,snapped:null,restoreRect:null,onClose:o.onClose,onResize:o.onResize,onFocus:o.onFocus,modal:o.modal,
   setTitle:(t)=>{win.title=t;$('.ttitle',w).textContent=t;Shell.renderTaskbar();},close:()=>this.close(win),focus:()=>this.focus(win),minimize:()=>this.minimize(win),toggleMax:()=>this.toggleMax(win)};
  $('.ttitle',w).textContent=o.title;
  const ww=Math.min(o.width||720,this.W-20),hh=Math.min(o.height||480,this.H-20);
  const off=(this.seq%8)*28;let x=o.x??Math.round((this.W-ww)/2-110+off),y=o.y??Math.round((this.H-hh)/2-90+off);
  if(o.center){x=(this.W-ww)/2;y=(this.H-hh)/2;}
  this.setRect(win,{x:clamp(x,0,Math.max(0,this.W-ww)),y:clamp(y,0,Math.max(0,this.H-hh)),w:ww,h:hh});
  if(o.content){typeof o.content==='string'?win.body.innerHTML=o.content:win.body.appendChild(o.content);}
  this.layer.appendChild(w);this.wins.set(id,win);this.order.push(win);
  // events
  w.addEventListener('pointerdown',()=>this.focus(win),true);
  const tb=$('.titlebar',w);
  tb.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('.wctrls,.tbar-x'))return;this.startDrag(win,e);});
  tb.addEventListener('dblclick',e=>{if(!e.target.closest('.wctrls')&&maxable)this.toggleMax(win);});
  tb.addEventListener('contextmenu',e=>{e.preventDefault();Shell.menu(e.clientX,e.clientY,[
   {label:'Восстановить',icon:I.restore,disabled:!win.maximized,action:()=>this.toggleMax(win)},{label:'Свернуть',icon:I.min,action:()=>this.minimize(win)},
   {label:'Развернуть',icon:I.max,disabled:win.maximized||!maxable,action:()=>this.toggleMax(win)},{sep:1},{label:'Закрыть',icon:I.close,key:'Alt+F4',action:()=>this.close(win)}]);});
  $('.wc.close',w).onclick=()=>this.close(win);
  const mn=$('.wc.min',w);if(mn)mn.onclick=()=>this.minimize(win);
  const mx=$('.wc.max',w);
  if(mx){mx.onclick=()=>{this.hideSnap();this.toggleMax(win)};let t;mx.addEventListener('mouseenter',()=>{t=setTimeout(()=>this.showSnap(win,mx),450)});mx.addEventListener('mouseleave',()=>clearTimeout(t));}
  $$('.rz',w).forEach(r=>r.addEventListener('pointerdown',e=>this.startResize(win,e,r.dataset.d)));
  if(o.maximized)this.toggleMax(win,true);
  this.focus(win);Shell.renderTaskbar();Bus.emit('windows');
  return win;}
 setRect(win,r){const s=win.el.style;['x','y','w','h'].forEach(k=>{if(r[k]==null)return;const v=typeof r[k]==='number'?Math.round(r[k])+'px':r[k];s[{x:'left',y:'top',w:'width',h:'height'}[k]]=v;});}
 rect(win){return{x:win.el.offsetLeft,y:win.el.offsetTop,w:win.el.offsetWidth,h:win.el.offsetHeight};}
 anim(win){win.el.classList.add('anim');clearTimeout(win._at);win._at=setTimeout(()=>{win.el.classList.remove('anim');win.onResize&&win.onResize();},240);}
 focus(win){if(!win||!this.wins.has(win.id))return;if(win.minimized)this.restore(win);win.el.style.zIndex=++this.z;this.active=win;
  this.order=this.order.filter(x=>x!==win);this.order.push(win);
  this.wins.forEach(x=>x.el.classList.toggle('inactive',x!==win));win.onFocus&&win.onFocus();Shell.renderTaskbar();}
 blurAll(){this.active=null;this.wins.forEach(x=>x.el.classList.add('inactive'));Shell.renderTaskbar();}
 close(win){if(!this.wins.has(win.id))return;if(win.onClose&&win.onClose()===false)return;win.el.classList.add('closing');this.wins.delete(win.id);this.order=this.order.filter(x=>x!==win);
  setTimeout(()=>win.el.remove(),180);if(this.active===win){this.active=null;const n=[...this.order].reverse().find(x=>!x.minimized);n?this.focus(n):Shell.renderTaskbar();}else Shell.renderTaskbar();Bus.emit('windows');}
 minimize(win){if(win.minimized)return;const b=$(`.tbb[data-app="${win.app}"]`);const r=win.el.getBoundingClientRect();
  if(b){const br=b.getBoundingClientRect();win.el.style.transform=`translate(${br.left+br.width/2-(r.left+r.width/2)}px,${br.top-(r.top+r.height/2)}px) scale(.2)`;}
  win.minimized=true;win.el.classList.add('minimized');if(this.active===win){this.active=null;const n=[...this.order].reverse().find(x=>!x.minimized);if(n)this.focus(n);}Shell.renderTaskbar();}
 restore(win){if(!win.minimized)return;win.minimized=false;win.el.classList.remove('minimized');win.el.style.transform='';}
 toggleMax(win,force){if(win.maximized&&!force){win.maximized=false;win.el.classList.remove('max');this.anim(win);this.setRect(win,win.restoreRect||{x:60,y:40,w:800,h:520});}
  else{if(!win.snapped)win.restoreRect=this.rect(win);win.maximized=true;win.snapped=null;win.el.classList.add('max');this.anim(win);this.setRect(win,{x:0,y:0,w:'100%',h:'100%'});}
  const mx=$('.wc.max',win.el);if(mx){mx.innerHTML=win.maximized?I.restore:I.max;mx.title=win.maximized?'Восстановить':'Развернуть';}}
 snap(win,type){if(type==='full')return this.toggleMax(win,true);if(win.maximized){win.maximized=false;win.el.classList.remove('max');const mx=$('.wc.max',win.el);if(mx)mx.innerHTML=I.max;}
  else if(!win.snapped)win.restoreRect=this.rect(win);
  const W=this.W,H=this.H,hw=W/2,hh=H/2;const R={left:{x:0,y:0,w:hw,h:H},right:{x:hw,y:0,w:W-hw,h:H},tl:{x:0,y:0,w:hw,h:hh},tr:{x:hw,y:0,w:W-hw,h:hh},bl:{x:0,y:hh,w:hw,h:H-hh},br:{x:hw,y:hh,w:W-hw,h:H-hh},l3:{x:0,y:0,w:W*2/3,h:H},r3:{x:W*2/3,y:0,w:W/3,h:H}}[type];
  if(!R)return;win.snapped=type;this.anim(win);this.setRect(win,R);}
 showSnap(win,btn){this.hideSnap();const r=btn.getBoundingClientRect();
  const m=el(`<div class="snapmenu acrylic"><div class="snapgrp" style="grid-template-columns:1fr 1fr"><div data-s="left" title="Левая половина"></div><div data-s="right" title="Правая половина"></div></div>
  <div class="snapgrp" style="grid-template-columns:2fr 1fr"><div data-s="l3"></div><div data-s="r3"></div></div>
  <div class="snapgrp" style="grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr"><div data-s="tl"></div><div data-s="tr"></div><div data-s="bl"></div><div data-s="br"></div></div>
  <div class="snapgrp" style="grid-template-columns:1fr"><div data-s="full" title="На весь экран"></div></div></div>`);
  document.body.appendChild(m);const mw=m.offsetWidth;m.style.left=clamp(r.left+r.width/2-mw/2,8,innerWidth-mw-8)+'px';m.style.top=(r.bottom+4)+'px';
  m.addEventListener('click',e=>{const s=e.target.dataset.s;if(s){this.snap(win,s);this.hideSnap();Sound.click();}});
  let t;const leave=()=>{t=setTimeout(()=>this.hideSnap(),350)};m.addEventListener('mouseleave',leave);m.addEventListener('mouseenter',()=>clearTimeout(t));btn.addEventListener('mouseleave',leave,{once:true});this._snap=m;}
 hideSnap(){if(this._snap){this._snap.remove();this._snap=null;}}
 startDrag(win,e){const sx=e.clientX,sy=e.clientY;let r=this.rect(win);let moved=false;const prev=$('#snapPreview');let zone=null;
  const tb=e.currentTarget;tb.setPointerCapture(e.pointerId);
  const move=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(!moved&&Math.hypot(dx,dy)<4)return;
   if(!moved){moved=true;if(win.maximized||win.snapped){const rr=win.restoreRect||{w:r.w*0.6,h:r.h*0.7};const ratio=(sx-r.x)/r.w;win.maximized=false;win.snapped=null;win.el.classList.remove('max');const mx=$('.wc.max',win.el);if(mx)mx.innerHTML=I.max;r={x:sx-rr.w*ratio,y:0,w:rr.w,h:rr.h};this.setRect(win,r);}}
   const nx=r.x+dx,ny=Math.max(0,r.y+dy);this.setRect(win,{x:nx,y:ny});
   const W=this.W,H=this.H;zone=ev.clientY<=4?'full':ev.clientX<=4?(ev.clientY<H*.25?'tl':ev.clientY>H*.75?'bl':'left'):ev.clientX>=innerWidth-5?(ev.clientY<H*.25?'tr':ev.clientY>H*.75?'br':'right'):null;
   if(zone){const R={full:[0,0,W,H],left:[0,0,W/2,H],right:[W/2,0,W/2,H],tl:[0,0,W/2,H/2],bl:[0,H/2,W/2,H/2],tr:[W/2,0,W/2,H/2],br:[W/2,H/2,W/2,H/2]}[zone];Object.assign(prev.style,{display:'block',left:R[0]+8+'px',top:R[1]+8+'px',width:R[2]-16+'px',height:R[3]-16+'px'});}else prev.style.display='none';};
  const up=()=>{tb.removeEventListener('pointermove',move);tb.removeEventListener('pointerup',up);tb.removeEventListener('pointercancel',up);prev.style.display='none';
   if(moved&&zone)this.snap(win,zone);else if(moved){win.restoreRect=this.rect(win);}if(moved&&win.onResize)win.onResize();};
  tb.addEventListener('pointermove',move);tb.addEventListener('pointerup',up);tb.addEventListener('pointercancel',up);}
 startResize(win,e,d){e.preventDefault();e.stopPropagation();const h=e.currentTarget;h.setPointerCapture(e.pointerId);const sx=e.clientX,sy=e.clientY,r=this.rect(win);win.snapped=null;
  const move=ev=>{let {x,y,w,h:hh}=r;const dx=ev.clientX-sx,dy=ev.clientY-sy;
   if(d.includes('e'))w=Math.max(win.minW,r.w+dx);if(d.includes('s'))hh=Math.max(win.minH,r.h+dy);
   if(d.includes('w')){w=Math.max(win.minW,r.w-dx);x=r.x+r.w-w;}if(d.includes('n')){hh=Math.max(win.minH,r.h-dy);y=r.y+r.h-hh;if(y<0){hh+=y;y=0;}}
   this.setRect(win,{x,y,w,h:hh});win.onResize&&win.onResize();};
  const up=()=>{h.removeEventListener('pointermove',move);h.removeEventListener('pointerup',up);win.restoreRect=this.rect(win);};
  h.addEventListener('pointermove',move);h.addEventListener('pointerup',up);}
 byApp(app){return [...this.wins.values()].filter(w=>w.app===app);}
 all(){return [...this.wins.values()];}
 showDesktop(){const vis=this.all().filter(w=>!w.minimized);if(vis.length){this._shown=vis;vis.forEach(w=>this.minimize(w));}else if(this._shown){this._shown.forEach(w=>{if(this.wins.has(w.id))this.focus(w)});this._shown=null;}}
}

/* ============================ APP MANAGER ============================ */
class AppManager{
 constructor(){this.reg={};this.pinned=['explorer','terminal','notepad','paint','minesweeper','solitaire','calc','taskmgr','settings'];}
 register(id,def){this.reg[id]=Object.assign({id},def);}
 get(id){return this.reg[id];}
 list(){return Object.values(this.reg).filter(a=>!a.hidden);}
 launch(id,opts={}){const a=this.reg[id];if(!a){Sound.error();Shell.notify({title:'Ошибка',body:`Не удается найти «${id}».`});return null;}
  if(a.single){const ex=WM.byApp(id)[0];if(ex){WM.focus(ex);a.onReopen&&a.onReopen(ex,opts);return ex;}}
  Shell.closePanels();const b=$(`.tbb[data-app="${id}"]`);if(b){b.classList.remove('launch');void b.offsetWidth;b.classList.add('launch');}
  try{return a.launch(opts);}catch(err){console.error(err);Sound.error();Shell.notify({title:a.name,body:'Приложение завершило работу с ошибкой: '+err.message});}}
 openFile(path){const x=VFS.ext(path);Shell.addRecent(path);if(VFS.isDir(path))return this.launch('explorer',{path});
  if(['png','jpg','jpeg','gif','bmp','webp'].includes(x))return this.launch('viewer',{path});return this.launch('notepad',{path});}
}
const WM=new WindowManager($('#wlayer'));
const Apps=new AppManager();

/* ============================ SYSTEM MONITOR (simulated) ============================ */
const Monitor={cpu:8,ram:41,disk:2,net:0.4,hist:{cpu:[],ram:[],disk:[],net:[]},N:60,
 tick(){const n=WM.wins.size;this.cpu=clamp(this.cpu*.6+(4+n*2.8+Math.random()*14+(Math.random()<.08?30:0))*.4,1,100);
  this.ram=clamp(this.ram*.85+(38+n*2.6+Math.random()*3)*.15,10,96);this.disk=clamp(Math.random()<.2?Math.random()*35:this.disk*.5,0,100);this.net=clamp(this.net*.6+Math.random()*(Settings.get('wifi')&&!Settings.get('airplane')?4:0)*.4,0,100);
  for(const k in this.hist){this.hist[k].push(this[k]);if(this.hist[k].length>this.N)this.hist[k].shift();}Bus.emit('monitor');},
 init(){for(let i=0;i<this.N;i++)this.tick();setInterval(()=>this.tick(),1000);}};
