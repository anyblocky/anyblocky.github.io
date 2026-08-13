<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<link rel="icon" href="img/logo.png">
<title>Эни Блок — 2D строительная сражалка</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  html{height:100%}
  body{height:100%;position:fixed;inset:0;overflow:hidden;font-family:system-ui,Segoe UI,Roboto,sans-serif;background:#0f1420;color:#e8ecf5}
  button{font:inherit;cursor:pointer;border:none;border-radius:12px;padding:12px 18px;background:#2b3650;color:#e8ecf5;transition:.15s}
  button:active{transform:scale(.95)}
  .primary{background:#ffd23e;color:#202124;font-weight:700}
  .g{background:#fff;color:#1a73e8;font-weight:600}
  input,textarea,select{font:inherit;background:#1a2236;color:#e8ecf5;border:1px solid #33406b;border-radius:10px;padding:10px}
  textarea{resize:vertical;width:100%;font-family:ui-monospace,Consolas,monospace;font-size:13px}
  .screen{position:fixed;inset:0;height:100%;height:100dvh;display:flex;flex-direction:column}
  .hidden{display:none!important}
  .logoImg{width:96px;height:96px;object-fit:contain;margin-bottom:2px}
  .logoSm{width:30px;height:30px;object-fit:contain;border-radius:6px}
  .banner{width:min(640px,95%);height:auto;align-self:center;border-radius:12px}
  #menu{align-items:center;justify-content:center;gap:12px;background:radial-gradient(1200px 600px at 50% -10%,#273252,#0f1420);overflow:auto;padding:calc(56px + env(safe-area-inset-top)) 10px calc(16px + env(safe-area-inset-bottom))}
  #menu h1{font-size:44px;letter-spacing:3px}
  #menu h1 b{color:#ffd23e}
  .charPrev{width:150px;height:170px;margin-bottom:2px;flex:none}
  .mBtns{display:flex;flex-direction:column;gap:9px;width:300px;max-width:92vw}
  #userChip{position:absolute;top:calc(12px + env(safe-area-inset-top));left:12px;display:flex;gap:8px;align-items:center;background:#1a2236;padding:8px 12px;border-radius:30px}
  #coinChip{position:absolute;top:calc(12px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);background:#1a2236;padding:8px 14px;border-radius:30px;font-weight:700;color:#ffd23e}
  #setBtn{position:absolute;top:calc(12px + env(safe-area-inset-top));right:12px}
  @media (max-height:700px){
    .logoImg{width:60px;height:60px}
    .charPrev{width:105px;height:120px}
    #menu h1{font-size:30px}
    .mBtns{gap:6px}
    .mBtns button{padding:9px 14px}
    #menu{gap:8px}
  }
  #game{background:#87ceeb}
  #cv{flex:1;width:100%;height:100%;display:block;touch-action:none}
  #gameBanner{position:absolute;top:calc(6px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);height:46px;pointer-events:none;opacity:.95;z-index:5}
  #topBar{position:absolute;top:calc(8px + env(safe-area-inset-top));left:8px;right:8px;display:flex;gap:8px;align-items:center;pointer-events:none}
  #topBar>*{pointer-events:auto}
  #chatIn{margin-left:auto}
  #hudCoins,#hudOnline{background:#202124aa;color:#ffd23e;font-weight:700;padding:8px 12px;border-radius:12px}
  #hudOnline{color:#7fd4ff}
  #chatBox{position:absolute;left:10px;top:calc(60px + env(safe-area-inset-top));display:flex;flex-direction:column;gap:2px;pointer-events:none;font-size:14px;text-shadow:0 1px 2px #000}
  #toolBar{position:absolute;bottom:calc(8px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);display:flex;gap:6px}
  #toolBar button{width:52px;height:52px;font-size:22px;padding:0;position:relative}
  #toolBar button.sel{outline:3px solid #ffd23e}
  #toolBar button small{position:absolute;top:2px;left:5px;font-size:10px}
  #touch{position:absolute;bottom:calc(70px + env(safe-area-inset-bottom));left:0;right:0;display:none;justify-content:space-between;padding:0 12px;pointer-events:none}
  #touch .grp{display:flex;gap:10px;pointer-events:auto}
  #touch button{width:62px;height:62px;border-radius:50%;font-size:24px;background:#20212488;border:2px solid #ffffff55}
  body.coarse #touch{display:flex}
  #guiOverlay{position:absolute;inset:0;pointer-events:none}
  #guiOverlay *{pointer-events:auto}
  #hint{position:absolute;bottom:calc(66px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);font-size:12px;opacity:.75;pointer-events:none;text-shadow:0 1px 2px #000}
  body.coarse #hint{display:none}
  #studio,#shop,#expo{padding:12px;padding-top:calc(12px + env(safe-area-inset-top));padding-bottom:calc(12px + env(safe-area-inset-bottom));gap:10px;overflow:auto}
  .tabs{display:flex;gap:6px;flex-wrap:wrap}
  .tabs button.sel{background:#ffd23e;color:#202124}
  .panel{flex:1;display:flex;flex-direction:column;gap:8px;min-height:0}
  #edWrap{flex:1;position:relative;min-height:220px}
  #edCv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;background:#87ceeb}
  #palette{display:flex;gap:6px;flex-wrap:wrap}
  #palette button{width:42px;height:42px;padding:0;border:3px solid transparent}
  #palette button.sel{border-color:#ffd23e}
  .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  #cssPrev{width:96px;height:96px;border:1px dashed #556;margin:6px 0}
  .cards{display:flex;gap:12px;flex-wrap:wrap}
  .card{width:210px;background:#1a2236;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;align-items:stretch}
  .card h3{color:#ffd23e;font-size:15px}
  .card.wide{width:340px}
  .card pre{background:#0f1420;border-radius:8px;padding:8px;font-size:12px;overflow:auto;max-height:140px}
  .thumb{width:100%;height:110px;border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#0f1420}
  .thumb img,.thumb canvas{max-width:100%;max-height:100%}
  .secTitle{margin-top:6px;font-size:18px}
  .modal{position:fixed;inset:0;background:#000a;display:flex;align-items:center;justify-content:center;z-index:50}
  .mCard{background:#fff;color:#202124;border-radius:16px;padding:26px;width:340px;max-width:92vw;display:flex;flex-direction:column;gap:14px;max-height:92dvh;overflow:auto}
  .gLogo{font-size:26px;font-weight:700}
  .gLogo span:nth-child(1){color:#4285F4}.gLogo span:nth-child(2){color:#EA4335}.gLogo span:nth-child(3){color:#FBBC05}.gLogo span:nth-child(4){color:#4285F4}.gLogo span:nth-child(5){color:#34A853}.gLogo span:nth-child(6){color:#EA4335}
  .mCard input{background:#f1f3f4;color:#202124;border:1px solid #dadce0}
  #toast{position:fixed;bottom:calc(16px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);background:#202124e6;padding:10px 18px;border-radius:30px;z-index:99;display:none;max-width:92vw}
</style>
</head>
<body>

<div id="menu" class="screen">
  <div id="userChip" class="hidden"><span id="uName"></span><button id="logout">Выйти</button></div>
  <div id="coinChip">🪙 0</div>
  <button id="setBtn">⚙ Настройки</button>
  <img class="logoImg" src="img/logo.png" alt="Эни Блок" onerror="this.style.display='none'">
  <canvas class="charPrev" id="prevCv" width="150" height="170"></canvas>
  <h1>ЭНИ <b>БЛОК</b></h1>
  <div class="mBtns">
    <button class="primary" id="btnPlay">⚔ Играть — строительная сражалка</button>
    <button id="btnSand">🧱 Песочница</button>
    <button id="btnOnline">🌐 Онлайн</button>
    <button id="btnShop">🛍 Каталог и кастомизация</button>
    <button id="btnStudio">🛠 Студия</button>
    <button id="btnExpo">🏆 Выставка игр</button>
  </div>
</div>

<div id="game" class="screen hidden">
  <canvas id="cv"></canvas>
  <img id="gameBanner" src="img/banner_game.png" alt="" onerror="this.style.display='none'">
  <div id="topBar">
    <button id="btnBack">← Меню</button>
    <button id="btnFS" title="Во весь экран">⛶</button>
    <span id="hudCoins">🪙 0</span>
    <span id="hudOnline" class="hidden">🌐 1</span>
    <input id="chatIn" class="hidden" placeholder="чат Enter…" style="width:150px">
  </div>
  <div id="chatBox"></div>
  <div id="hint">A/D — движение · Пробел — прыжок · S — слэм · 1-6 — инструменты · ЛКМ (держать) — использовать · ПКМ (держать) — ломать</div>
  <div id="toolBar"></div>
  <div id="touch">
    <div class="grp"><button data-action="left">◀</button><button data-action="right">▶</button></div>
    <div class="grp"><button data-action="place">🧱</button><button data-action="brk">⛏</button><button data-action="down">⤓</button><button data-action="jump">⤒</button></div>
  </div>
  <div id="guiOverlay"></div>
</div>

<div id="shop" class="screen hidden">
  <div class="row"><button id="shBack">← Меню</button><img class="logoSm" src="img/logo.png" onerror="this.style.display='none'"><b>🛍 КАТАЛОГ</b><span id="shCoins" style="color:#ffd23e;font-weight:700"></span></div>
  <div style="font-size:13px;opacity:.8">Эникойны 🪙 даются за убийства в сражалке. Футболки и шапки — ваши фото.</div>
  <div class="secTitle">👕 Футболки</div>
  <div class="cards" id="shopShirts"></div>
  <div class="secTitle">🎩 Шапки</div>
  <div class="cards" id="shopHats"></div>
</div>

<div id="studio" class="screen hidden">
  <img class="banner" src="img/banner_studio.png" alt="Any Studio" onerror="this.style.display='none'">
  <div class="row">
    <button id="stBack">← Меню</button><img class="logoSm" src="img/logo.png" onerror="this.style.display='none'"><b>СТУДИЯ</b>
    <input id="pName" value="Моя игра" style="width:140px">
    <button id="pTest">Тест</button><button id="pSave">Сохранить</button><button class="primary" id="pPub">Опубликовать</button>
  </div>
  <div class="tabs">
    <button data-tab="map" class="sel">🗺 Конструктор</button>
    <button data-tab="scr">📜 ЭниЯзык / JS</button>
    <button data-tab="les">🎓 Уроки</button>
    <button data-tab="css">🎨 Моделинг (CSS)</button>
    <button data-tab="gui">🖥 GUI (HTML)</button>
  </div>
  <div class="panel" id="tab-map">
    <div id="palette"></div>
    <div class="row"><button id="edNew">Новый мир</button><button id="edLoad">Загрузить текущий</button><span style="font-size:12px;opacity:.7">ЛКМ — блок, ПКМ — стереть</span></div>
    <div id="edWrap"><canvas id="edCv"></canvas></div>
  </div>
  <div class="panel hidden" id="tab-scr">
    <div class="row">
      <select id="langSel"><option value="any">ЭниЯзык (свой язык)</option><option value="js">JavaScript</option></select>
      <button id="scrCheck">Проверить</button>
    </div>
    <p id="langHelp" style="font-size:13px;opacity:.8">ЭниЯзык: события <code>клик:</code> и <code>тик:</code>, команды: взрыв R · частицы N цвет · поставь DX DY блок · ломай DX DY · ракета VX VY · гравитация V · чат "текст" · прыжок · если близко N: …</p>
    <textarea id="scrTxt" style="flex:1" spellcheck="false"></textarea>
  </div>
  <div class="panel hidden" id="tab-les">
    <div class="cards" id="lesCards"></div>
  </div>
  <div class="panel hidden" id="tab-css">
    <div class="row"><select id="cssBlock"></select><button id="cssApply">Применить к игре</button></div>
    <textarea id="cssTxt" style="height:140px" spellcheck="false">background:linear-gradient(#6fd35a,#8a5a2b);
border:3px solid #00000033;
border-radius:4px;</textarea>
    <div id="cssPrev"></div>
  </div>
  <div class="panel hidden" id="tab-gui">
    <p style="font-size:13px;opacity:.8">HTML вашего GUI. Кнопки с data-action: left, right, jump, down, tool1..tool6, place, brk.</p>
    <textarea id="guiTxt" style="flex:1" spellcheck="false"><div style="position:absolute;right:12px;top:40%">
  <button data-action="jump" style="width:80px;height:80px;border-radius:50%;background:#ffd23e;font-size:20px">ПРЫГ</button>
</div></textarea>
  </div>
</div>

<div id="expo" class="screen hidden">
  <div class="row"><button id="exBack">← Меню</button><img class="logoSm" src="img/logo.png" onerror="this.style.display='none'"><b>🏆 ВЫСТАВКА ИГР</b><span style="font-size:12px;opacity:.7">только после регистрации</span></div>
  <div class="cards" id="exCards"></div>
</div>

<div id="auth" class="modal hidden">
  <div class="mCard">
    <div class="gLogo"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>
    <div>Вход в Эни Блок</div>
    <input id="authName" placeholder="Ваше имя">
    <input id="authMail" placeholder="you@gmail.com">
    <button class="g" id="authGo">Войти через Google</button>
    <div style="font-size:12px;color:#5f6368">Демо-режим: аккаунт локально. Для настоящего OAuth вставьте Client ID в Настройках.</div>
    <button id="authCancel" style="background:#f1f3f4;color:#202124">Отмена</button>
  </div>
</div>

<div id="settings" class="modal hidden">
  <div class="mCard">
    <b>⚙ Настройки</b>
    <label style="font-size:13px">Комната онлайн:<input id="setRoom" placeholder="main"></label>
    <label style="font-size:13px">Google Client ID:<input id="setGid" placeholder="xxxx.apps.googleusercontent.com"></label>
    <label style="font-size:13px">Свой сервер (HTTP), необязательно:<input id="setUrl" placeholder="http://localhost:8080"></label>
    <button class="primary" id="setSave">Сохранить</button>
    <button id="setClose" style="background:#f1f3f4;color:#202124">Закрыть</button>
  </div>
</div>

<div id="toast"></div>

<script>
'use strict';
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let settings=store.get('bb_set',{gid:'',serverUrl:'',room:'main'});
let user=store.get('bb_user',null);
let coins=store.get('bb_coins',0);
let skin=store.get('bb_skin','red');
let hat=store.get('bb_hat','none');
let owned=store.get('bb_owned',['red']);
let ownedH=store.get('bb_ownedH',['none']);
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',2600);}
const COARSE=matchMedia('(pointer:coarse)').matches;
if(COARSE)document.body.classList.add('coarse');
function show(id){['menu','game','studio','expo','shop'].forEach(s=>$('#'+s).classList.toggle('hidden',s!==id));}
function updCoins(){$('#coinChip').textContent='🪙 '+coins;$('#hudCoins').textContent='🪙 '+coins;$('#shCoins').textContent='🪙 '+coins;}
function addCoins(n){coins+=n;store.set('bb_coins',coins);updCoins();toast('+'+n+' эникойнов 🪙');}

/* ============ ВО ВЕСЬ ЭКРАН ============ */
function goFS(){const el=document.documentElement;
  try{
    if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return;}
    const rq=el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen;
    if(rq)rq.call(el).catch(()=>{});
    else if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{});
  }catch(e){}}
$('#btnFS').onclick=goFS;

/* ============ ВАШИ ФОТО ============ */
const SHIRTS=[
 {id:'red',n:'Классическая красная',price:0,file:null,col:'#e21b1b'},
 {id:'pink',n:'Розовая',price:50,file:'shirt1.png',col:'#e01866'},
 {id:'white',n:'Белая',price:80,file:'shirt2.png',col:'#f7f7f7'},
 {id:'blue',n:'Синяя',price:100,file:'shirt3.png',col:'#2196f3'},
 {id:'burg',n:'Бордовая',price:120,file:'shirt4.png',col:'#8f0322'},
 {id:'green',n:'Зелёная',price:150,file:'shirt5.png',col:'#45d155'}
];
const HATS=[
 {id:'none',n:'Без шапки',price:0,file:null,src:null,w:0,dx:0,dy:0},
 {id:'hammer',n:'Шапка-молоток',price:200,file:'hat1.png',src:[160,265,225,250],w:36,dx:8,dy:-16},
 {id:'box',n:'Коробка со звездой',price:250,file:'hat2.png',src:[190,255,185,95],w:48,dx:0,dy:-12},
 {id:'cap',n:'Красная кепка',price:150,file:'hat3.png',src:[150,460,230,115],w:42,dx:3,dy:-10},
 {id:'topp',n:'Цилиндр (фиолет. лента)',price:300,file:'hat4.png',src:[125,300,275,175],w:42,dx:0,dy:-12},
 {id:'topb',n:'Цилиндр (бордовая лента)',price:300,file:'hat5.png',src:[125,300,275,175],w:42,dx:0,dy:-12}
];
const AS={tool:{},shirt:{},hat:{}};
function loadImg(src){return new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>res(null);i.src=src;});}
function chroma(img){const c=document.createElement('canvas');c.width=img.width;c.height=img.height;
  const x=c.getContext('2d');x.drawImage(img,0,0);
  try{const d=x.getImageData(0,0,c.width,c.height),p=d.data;
    for(let i=0;i<p.length;i+=4){const r=p[i],g=p[i+1],b=p[i+2];
      if(r>232&&g>232&&b>232&&Math.abs(r-g)<14&&Math.abs(g-b)<14)p[i+3]=0;}
    x.putImageData(d,0,0);}catch(e){}
  return c;}
(async function(){
  const t=await Promise.all([1,2,3,4,5].map(n=>loadImg('img/tool'+n+'.png')));
  t.forEach((im,i)=>{if(im)AS.tool[i+1]=chroma(im);});
  for(const s of SHIRTS){if(s.file){const im=await loadImg('img/'+s.file);if(im)AS.shirt[s.id]=im;}}
  for(const h of HATS){if(h.file){const im=await loadImg('img/'+h.file);if(im)AS.hat[h.id]=chroma(im);}}
  if(!AS.tool[1])toast('⚠ Фото не загрузились: положите файлы в папку img');
  drawPrev();buildShop();
})();

/* ============ БЛОКИ / МИР ============ */
const T=32,W=160,H=90;
const BLOCKS={
 1:{n:'Земля',css:'background:linear-gradient(#6fd35a,#8a5a2b);border:3px solid #00000033;border-radius:4px;'},
 2:{n:'Камень',css:'background:#9aa0a6;border:3px solid #5f6368;'},
 3:{n:'Дерево',css:'background:#b07a3f;border:3px solid #7a4f22;'},
 4:{n:'Кирпич',css:'background:#d24040;border:3px solid #8f1f1f;'},
 5:{n:'Стекло',css:'background:#9fd8ef;opacity:.6;border:2px solid #ffffff;'},
 6:{n:'Платформа',css:'background:#ffd23e;border:3px solid #b8930a;border-radius:6px;'},
 7:{n:'Ящик',css:'background:#c98a4b;border:4px solid #6b4a1f;border-radius:4px;'},
 8:{n:'Лава',css:'background:linear-gradient(#ffd23e,#ff5722);'},
 9:{n:'Бедрок',css:'background:#3c4043;border:2px solid #202124;'}
};
function parseCSS(css){const o={bg:'#888',grad:null,border:0,bc:'#000',rad:0,alpha:1};let m;
  m=css.match(/linear-gradient\(\s*([^,()]+),([^,()]+)\)/);if(m)o.grad=[m[1].trim(),m[2].trim()];
  m=css.match(/background:\s*([^;]+)/);if(m&&!o.grad)o.bg=m[1].trim();
  m=css.match(/border:\s*([\d.]+)px\s+solid\s+([^;]+)/);if(m){o.border=+m[1];o.bc=m[2].trim();}
  m=css.match(/border-radius:\s*([\d.]+)px/);if(m)o.rad=+m[1];
  m=css.match(/opacity:\s*([\d.]+)/);if(m)o.alpha=+m[1];return o;}
let modelCache={};
function modelOf(t,custom){const k=t+'|'+(custom||'');if(!modelCache[k])modelCache[k]=parseCSS(custom||BLOCKS[t].css);return modelCache[k];}
let world=new Uint8Array(W*H);
const inB=(x,y)=>x>=0&&y>=0&&x<W&&y<H;
const getT=(x,y)=>inB(x,y)?world[y*W+x]:9;
const tileAt=(px,py)=>{const tx=Math.floor(px/T),ty=Math.floor(py/T);return inB(tx,ty)?world[ty*W+tx]:9;};
const isSolid=t=>t>=1&&t!==8&&t!==0;
function surfaceY(tx){for(let y=0;y<H;y++)if(isSolid(getT(tx,y)))return y*T;return (H-2)*T;}
function genWorld(){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){const h=H-12+Math.round(Math.sin(x*.07)*2+Math.sin(x*.021)*3);
    for(let y=h;y<H-1;y++)world[y*W+x]=1;world[(H-1)*W+x]=9;
    if((x>10&&x<15)||(x>60&&x<64))world[h*W+x]=8;}
  for(let i=0;i<6;i++){const bx=20+i*22,by=H-16;
    for(let x=bx;x<bx+7;x++)for(let y=by;y<by+5;y++){if(x===bx||x===bx+6||y===by||y===by+4)world[y*W+x]=4;}
    world[(by+4)*W+bx+3]=0;}
  for(let i=0;i<8;i++){const px=12+i*18,py=H-24-(i%3)*3;for(let x=px;x<px+5;x++)world[py*W+x]=6;}
}
function genBattle(){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){for(let y=H-6;y<H-1;y++)world[y*W+x]=2;world[(H-1)*W+x]=9;
    if(x<2||x>=W-2)for(let y=H-26;y<H-6;y++)world[y*W+x]=4;}
  [[14,H-13,12],[44,H-17,14],[76,H-13,12],[28,H-24,12],[60,H-24,12],[42,H-32,16],[8,H-30,8],[104,H-30,8]]
    .forEach(([px,py,l])=>{for(let x=px;x<px+l;x++)if(inB(x,py))world[py*W+x]=6;});
  for(let i=0;i<12;i++){const cx=8+Math.floor(Math.random()*(W-16));world[(H-8)*W+cx]=7;}
  for(let x=70;x<74;x++)world[(H-7)*W+x]=8;
}
function encMap(w){const a=[];let c=w[0],n=1;for(let i=1;i<w.length;i++){if(w[i]===c&&n<9999)n++;else{a.push(c,n);c=w[i];n=1;}}a.push(c,n);return a;}
function decMap(a){const w=new Uint8Array(W*H);let i=0,k=0;while(k<a.length&&i<w.length){const c=a[k],n=a[k+1];for(let j=0;j<n&&i<w.length;j++)w[i++]=c;k+=2;}return w;}

/* ============ GOOGLE ============ */
let authCb=null;
function requireAuth(cb){if(user)return cb();authCb=cb;$('#auth').classList.remove('hidden');}
$('#authCancel').onclick=()=>{$('#auth').classList.add('hidden');authCb=null;};
$('#authGo').onclick=()=>{
  const mail=$('#authMail').value.trim()||('guest'+Math.floor(Math.random()*999)+'@gmail.com');
  const name=$('#authName').value.trim()||mail.split('@')[0];
  if(settings.gid&&window.google&&google.accounts){try{google.accounts.id.initialize({client_id:settings.gid,callback:onCred});google.accounts.id.prompt();return;}catch(e){}}
  login({name,email:mail});};
function onCred(r){try{const p=JSON.parse(atob(r.credential.split('.')[1]));login({name:p.name||p.email,email:p.email});}catch(e){}}
function login(u){user=u;store.set('bb_user',user);$('#auth').classList.add('hidden');updChip();toast('Добро пожаловать, '+user.name+'!');if(authCb){const c=authCb;authCb=null;c();}}
function updChip(){if(user){$('#userChip').classList.remove('hidden');$('#uName').textContent=user.name;}else $('#userChip').classList.add('hidden');}
$('#logout').onclick=()=>{user=null;localStorage.removeItem('bb_user');updChip();};
updChip();
if(settings.gid){const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';document.head.appendChild(s);}
$('#setBtn').onclick=()=>{$('#setGid').value=settings.gid||'';$('#setUrl').value=settings.serverUrl||'';$('#setRoom').value=settings.room||'main';$('#settings').classList.remove('hidden');};
$('#setClose').onclick=()=>$('#settings').classList.add('hidden');
$('#setSave').onclick=()=>{settings={gid:$('#setGid').value.trim(),serverUrl:$('#setUrl').value.trim(),room:$('#setRoom').value.trim()||'main'};store.set('bb_set',settings);$('#settings').classList.add('hidden');toast('Сохранено');};

/* ============ ИНСТРУМЕНТЫ ============ */
const TOOLS=[
 {id:1,ic:'🗡',n:'Меч (ближний бой)'},
 {id:2,ic:'✊',n:'Без инструмента'},
 {id:3,ic:'📋',n:'Копировать блок'},
 {id:4,ic:'🚀',n:'Ракетница (дальний бой)'},
 {id:5,ic:'🐸',n:'Падение и прыжок'}
];
function toolList(){const l=TOOLS.slice();if(G.script&&G.script.onUse)l.push({id:6,ic:'✨',n:'Скрипт (ЭниЯзык/JS)'});return l;}

/* ============ ДВИЖОК ============ */
const KILL_COINS=10;
const G={running:false,mode:'battle',gravity:1600,t:0,shake:0,inp:{left:0,right:0,down:0,jump:0},self:null,bots:[],remotes:{},rockets:[],parts:[],chat:[],script:null,models:{},copyType:4,cd:0,mouse:null,mouseHeld:false,mouseBtn:0,brkCd:0,net:false,spawnX:0,spawnY:0};
const cv=$('#cv'),ctx=cv.getContext('2d');
function makeApi(){return{
  place:(x,y,t)=>{if(inB(x,y)&&world[y*W+x]!==9)world[y*W+x]=t|0;},
  break:(x,y)=>{if(inB(x,y)&&world[y*W+x]!==9)world[y*W+x]=0;},
  explode:(x,y,r)=>explode(x,y,r,'скрипт'),
  rocket:(x,y,vx,vy)=>G.rockets.push({x,y,vx,vy,life:3,src:'скрипт'}),
  particles:(x,y,n,c)=>spawnParts(x,y,n,c),
  chat:m=>pushChat('скрипт',String(m)),
  setGravity:v=>{G.gravity=+v||1600;},
  jump:()=>{if(G.self){G.self.vy=-640;G.self.onGround=false;}},
  players:()=>[G.self,...G.bots].map(p=>({name:p.name,x:p.x,y:p.y})),
  others:()=>[...G.bots,...Object.values(G.remotes)].map(p=>({name:p.name,x:p.x,y:p.y})),
  time:()=>G.t};}
function spawnParts(x,y,n,c){for(let i=0;i<n;i++)G.parts.push({x,y,vx:(Math.random()-.5)*500,vy:(Math.random()-.7)*500,life:.6+Math.random()*.5,c});}
function pushChat(n,m){G.chat.push({n,m,t:G.t});if(G.chat.length>6)G.chat.shift();renderChat();}
function renderChat(){$('#chatBox').innerHTML=G.chat.map(c=>'<div><b>'+c.n+':</b> '+c.m+'</div>').join('');}
function hurt(e,amt,src){if(G.mode!=='battle'||!e)return;e.hp=(e.hp==null?100:e.hp)-amt;e.hitT=G.t;
  if(e.hp<=0)death(e,src);}
function death(e,src){spawnParts(e.x,e.y,26,'#ff5722');
  if(e===G.self)pushChat('☠',(src&&src!=='self'?src+' убил вас':'Вы погибли'));
  else{pushChat('☠',e.name+' погиб'+(src?' ('+src+')':''));if(src==='self')addCoins(KILL_COINS);}
  e.hp=100;e.x=G.spawnX+(e===G.self?0:(Math.random()*160-80));e.y=G.spawnY-120;e.vx=e.vy=0;}
function explode(x,y,r,src){
  const rt=Math.floor(r);
  for(let ty=Math.floor(y/T)-rt;ty<=Math.floor(y/T)+rt;ty++)for(let tx=Math.floor(x/T)-rt;tx<=Math.floor(x/T)+rt;tx++){
    if(!inB(tx,ty))continue;const dx=tx*T+16-x,dy=ty*T+16-y;
    if(dx*dx+dy*dy<(r*T)*(r*T)&&world[ty*W+tx]!==9)world[ty*W+tx]=0;}
  spawnParts(x,y,40,'#ff9040');spawnParts(x,y,20,'#ffd23e');G.shake=10;
  [G.self,...G.bots].forEach(p=>{if(!p)return;const dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy)||1;
    if(d<r*T+40){p.vx+=dx/d*600;p.vy-=500;hurt(p,src==='self'?55:25,src);}});}
function phys(e,dt,inp){
  const tgt=(inp.left?-1:0)+(inp.right?1:0);
  e.vx=tgt*240;if(tgt)e.face=tgt;
  e.vy+=G.gravity*dt;if(e.vy>1200)e.vy=1200;
  e.coyote=e.onGround?0.1:Math.max(0,(e.coyote||0)-dt);
  e.jbuf=Math.max(0,(e.jbuf||0)-dt);
  if(inp.jump)e.jbuf=0.12;
  if(e.jbuf>0&&(e.onGround||e.coyote>0)){e.vy=-640;e.onGround=false;e.coyote=0;e.jbuf=0;}
  else if(e.jbuf>0&&e.tool===5&&e.air<1){e.air++;e.vy=-600;e.jbuf=0;spawnParts(e.x,e.y+40,8,'#fff');}
  if(inp.down&&e.onGround){const ty=Math.floor((e.y+e.hh+2)/T),tx=Math.floor(e.x/T);if(getT(tx,ty)===6){e.dropT=.25;e.onGround=false;}}
  if(inp.down&&!e.onGround&&e.tool===5){e.vy=Math.max(e.vy,1200);e.slam=true;}
  e.x+=e.vx*dt;collide(e,'x');
  e.prevY=e.y;e.y+=e.vy*dt;e.onGround=false;collide(e,'y');
  if(e.onGround){e.air=0;e.slam=false;}
  e.dropT=Math.max(0,(e.dropT||0)-dt);
  if(tileAt(e.x,e.y+20)===8||e.y>H*T){hurt(e,999,'лава');if(G.mode!=='battle'){e.x=G.spawnX;e.y=G.spawnY;e.vx=e.vy=0;}}
}
function collide(e,axis){
  const x0=Math.floor((e.x-e.hw)/T),x1=Math.floor((e.x+e.hw)/T),y0=Math.floor((e.y-e.hh)/T),y1=Math.floor((e.y+e.hh)/T);
  if(axis==='x'){
    if(!e.vx)return;let best=e.vx>0?1e9:-1;
    for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){if(!isSolid(getT(tx,ty)))continue;
      if(e.vx>0)best=Math.min(best,tx);else best=Math.max(best,tx);}
    if(best!==1e9&&best!==-1){e.x=e.vx>0?best*T-e.hw-.01:best*T+T+e.hw+.01;e.vx=0;}
  }else{
    if(e.vy>0){let best=1e9;
      for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){const t=getT(tx,ty);if(!t)continue;
        const one=t===6&&(e.prevY+e.hh)<=ty*T+2&&e.dropT<=0;
        if(!(isSolid(t)||one))continue;best=Math.min(best,ty);}
      if(best!==1e9){e.y=best*T-e.hh-.01;e.onGround=true;e.vy=0;
        if(e.slam){spawnParts(e.x,e.y+40,16,'#fff');G.shake=6;
          G.bots.forEach(b=>{if(Math.abs(b.x-e.x)<90){b.vy-=500;hurt(b,20,e===G.self?'self':e.name);}});
          e.slam=false;}}
    }else if(e.vy<0){let best=-1;
      for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){if(!isSolid(getT(tx,ty)))continue;best=Math.max(best,ty);}
      if(best>=0){e.y=best*T+T+e.hh+.01;e.vy=0;}}
  }
}
function meleeSwing(att,srcKey,cx,cy){
  const tx=Math.floor(cx/T),ty=Math.floor(cy/T);
  for(let y=ty-1;y<=ty+1;y++)for(let x=tx-1;x<=tx+1;x++){
    if(inB(x,y)&&world[y*W+x]!==9&&world[y*W+x]!==8){const dx=x*T+16-cx,dy=y*T+16-cy;if(dx*dx+dy*dy<70*70)world[y*W+x]=0;}}
  [G.self,...G.bots].forEach(p=>{if(p&&p!==att&&Math.hypot(p.x-cx,p.y-cy)<80){p.vx+=att.face*500;p.vy-=300;hurt(p,att===G.self?50:10,srcKey);}});
  spawnParts(cx,cy,12,'#ffffff');
}
function useTool(wx,wy,btn){
  if(!G.self)return;
  const tx=Math.floor(wx/T),ty=Math.floor(wy/T),s=G.self;
  if(btn===2){if(inB(tx,ty)&&world[ty*W+tx]!==9)world[ty*W+tx]=0;spawnParts(wx,wy,3,'#9aa0a6');return;}
  if(G.cd>0)return;
  const tl=s.tool;
  if(tl===1){G.cd=.35;s.face=wx>=s.x?1:-1;
    let cx=wx,cy=wy;const d=Math.hypot(wx-s.x,wy-s.y);
    if(d>170){cx=s.x+(wx-s.x)/d*170;cy=s.y+(wy-s.y)/d*170;}
    meleeSwing(s,'self',cx,cy);}
  else if(tl===2){G.cd=.3;if(inB(tx,ty)&&world[ty*W+tx]===5)world[ty*W+tx]=0;
    G.bots.forEach(b=>{if(Math.hypot(b.x-wx,b.y-wy)<60){b.vx+=(b.x-wx)*8;b.vy-=300;hurt(b,10,'self');}});spawnParts(wx,wy,6,'#fff');}
  else if(tl===3){const t=getT(tx,ty);
    if(t&&t!==9){G.copyType=t;toast('Скопирован блок: '+BLOCKS[t].n);}
    else if(!t&&G.copyType){if(!(tx===Math.floor(s.x/T)&&ty>=Math.floor((s.y-42)/T)&&ty<=Math.floor((s.y+42)/T)))world[ty*W+tx]=G.copyType;spawnParts(wx,wy,4,'#ffd23e');}}
  else if(tl===4){G.cd=.5;s.face=wx>=s.x?1:-1;const d=Math.hypot(wx-s.x,wy-s.y)||1;
    G.rockets.push({x:s.x+s.face*20,y:s.y-6,vx:(wx-s.x)/d*640,vy:(wy-s.y)/d*640,life:3,src:'self'});}
  else if(tl===5){G.cd=.2;if(s.onGround){s.vy=-640;s.onGround=false;}else if(s.air<1){s.air++;s.vy=-600;}}
  else if(tl===6&&G.script&&G.script.onUse){G.cd=.25;try{G.script.onUse(wx,wy,makeApi());}catch(e){toast('Ошибка скрипта: '+e.message);}}
}
function actFront(a){const s=G.self,tx=Math.floor((s.x+s.face*40)/T),ty=Math.floor(s.y/T);
  if(a==='place')world[ty*W+tx]=G.copyType||4;else if(getT(tx,ty)!==9)world[ty*W+tx]=0;}

/* ============ СЕТЬ ============ */
const MQ={ws:null,ok:false,keep:null,
 urls:['wss://broker.emqx.io:8084/mqtt','wss://test.mosquitto.org:8081/mqtt'],
 connect(){this.ok=false;this.tryUrl(0);},
 tryUrl(i){if(i>=this.urls.length)return;
  try{const ws=new WebSocket(this.urls[i],['mqtt']);ws.binaryType='arraybuffer';
   ws.onopen=()=>{try{ws.send(this.encConnect());}catch(e){}};
   ws.onmessage=e=>{try{this.onMsg(new Uint8Array(e.data));}catch(err){}};
   ws.onclose=()=>{if(!this.ok)this.tryUrl(i+1);};
   ws.onerror=()=>{try{ws.close();}catch(e){}};
   this.ws=ws;}catch(e){this.tryUrl(i+1);}},
 str(s){const b=[...new TextEncoder().encode(s)];return[b.length>>8,b.length&255,...b];},
 rl(n){const o=[];do{let d=n%128;n=Math.floor(n/128);if(n>0)d|=128;o.push(d);}while(n>0);return o;},
 pkt(t,body){return new Uint8Array([t,...this.rl(body.length),...body]);},
 encConnect(){const id='eb_'+Net.id;
  return this.pkt(0x10,[0,4,77,81,84,84,4,2,0,60,...this.str(id)]);},
 subscribe(){const t=this.str('eniblock/'+(settings.room||'main'));this.ws.send(this.pkt(0x82,[0,1,...t,0]));},
 publish(o){if(this.ok&&this.ws&&this.ws.readyState===1){
  const t=this.str('eniblock/'+(settings.room||'main'));
  const p=[...new TextEncoder().encode(JSON.stringify(o))];
  try{this.ws.send(this.pkt(0x30,[...t,...p]));}catch(e){}}},
 onMsg(d){const t=d[0]>>4;let i=1,m=1,v=0;
  for(;;){const b=d[i++];v+=(b&127)*m;m*=128;if(!(b&128))break;}
  const body=d.slice(i);
  if(t===2){this.ok=true;this.subscribe();
    this.keep=setInterval(()=>{if(this.ws&&this.ws.readyState===1)this.ws.send(new Uint8Array([0xC0,0]));},30000);
    toast('🌐 Онлайн подключён (комната '+(settings.room||'main')+')');}
  else if(t===3){const tl=(body[0]<<8)|body[1];
    const payload=JSON.parse(new TextDecoder().decode(body.slice(2+tl))||'null');
    if(payload&&payload.id)Net.recv({...payload,src:payload.id});}},
 close(){clearInterval(this.keep);this.ok=false;if(this.ws)try{this.ws.close();}catch(e){}}};
const Net={id:Math.random().toString(36).slice(2,8),chan:null,timer:null,htimer:null,
 start(){if('BroadcastChannel'in window){this.chan=new BroadcastChannel('bb_online');this.chan.onmessage=e=>this.recv(e.data);}
   this.send({t:'hi'});this.timer=setInterval(()=>this.state(),120);
   if(settings.serverUrl)this.htimer=setInterval(()=>this.http(),600);
   MQ.connect();},
 stop(){this.send({t:'bye'});clearInterval(this.timer);clearInterval(this.htimer);if(this.chan)this.chan.close();this.chan=null;MQ.close();},
 send(o){if(this.chan)this.chan.postMessage({...o,src:this.id});},
 state(){const s=G.self;if(!s)return;
   const p={t:'s',id:this.id,name:user?user.name:'?',x:s.x,y:s.y,tool:s.tool,color:s.color,skin:skin,hat:hat};
   this.send(p);MQ.publish(p);},
 recv(p){if(p.src===this.id)return;
   if(p.t==='s')upsert(p.src,p);
   if(p.t==='c')pushChat(p.n,p.m);
   if(p.t==='hi')this.state();
   if(p.t==='bye')delete G.remotes[p.src];},
 http(){const s=G.self;if(!s)return;
   fetch(settings.serverUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:this.id,name:user?user.name:'?',x:s.x,y:s.y,tool:s.tool,color:s.color,skin:skin,hat:hat})})
   .then(r=>r.json()).then(list=>{(list||[]).forEach(p=>{if(p.id&&p.id!==this.id)upsert(p.id,p);});}).catch(()=>{});}};
function upsert(id,p){const r=G.remotes[id]||(G.remotes[id]={x:p.x,y:p.y,tx:p.x,ty:p.y});r.tx=p.x;r.ty=p.y;r.name=p.name;r.tool=p.tool||1;r.color=p.color||'#1b6ae2';r.skin=p.skin||'red';r.hat=p.hat||'none';r.last=performance.now();}
function chatSend(m){pushChat(user?user.name:'я',m);Net.send({t:'c',n:user?user.name:'я',m});MQ.publish({t:'c',id:Net.id,n:user?user.name:'я',m});}

/* боты */
function makeBot(n,c,tl){return{name:n,x:G.spawnX+(Math.random()*300-150),y:G.spawnY-140,vx:0,vy:0,hw:17,hh:42,onGround:false,air:0,dropT:0,coyote:0,jbuf:0,face:1,tool:tl||(1+Math.floor(Math.random()*5)),color:c,hp:100,timer:0,dir:0,cd:0,build:0,wantJump:false};}
function botStep(b,dt){
  b.cd-=dt;b.timer-=dt;const s=G.self,dx=s.x-b.x,adx=Math.abs(dx);
  if(b.timer<=0){b.timer=.8+Math.random()*1.4;
    b.dir=adx>80?Math.sign(dx):(Math.random()<.4?0:[-1,1][Math.floor(Math.random()*2)]);
    if(Math.random()<.3)b.wantJump=true;
    if(Math.random()<.3)b.build=[1,2,3,4,6,7][Math.floor(Math.random()*6)];}
  const inp={left:b.dir<0,right:b.dir>0,down:0,jump:0};
  if(b.wantJump){inp.jump=1;b.wantJump=false;}
  if(G.mode==='battle'&&s&&G.t>3){
    if(b.tool===1&&adx<70&&Math.abs(s.y-b.y)<60&&b.cd<=0){b.cd=1.8;meleeSwing(b,b.name,s.x,s.y);}
    if(b.tool===4&&b.cd<=0&&Math.random()<.012){b.cd=2.6;const d=Math.hypot(s.x-b.x,s.y-b.y)||1;G.rockets.push({x:b.x+b.face*20,y:b.y-6,vx:(s.x-b.x)/d*520,vy:(s.y-b.y)/d*520,life:3,src:b.name});}}
  if(b.build&&b.onGround){const tx=Math.floor((b.x+b.face*44)/T),ty=Math.floor(b.y/T);
    if(inB(tx,ty)&&!world[ty*W+tx])world[ty*W+tx]=b.build;b.build=0;}
  phys(b,dt,inp);
}

/* ============ ЭНИЯЗЫК ============ */
const COLS={'красный':'#ff2020','жёлтый':'#ffd23e','желтый':'#ffd23e','зелёный':'#45d155','зеленый':'#45d155','синий':'#2196f3','белый':'#ffffff','фиолетовый':'#7c4dff','оранжевый':'#ff9040'};
const BLN={};Object.entries(BLOCKS).forEach(([k,v])=>BLN[v.n.toLowerCase()]=+k);
function parseCmd(line){let m;
  if(m=line.match(/^если\s+близко\s+([\d.]+):\s*(.+)$/))return{t:'ifnear',n:+m[1],c:parseCmd(m[2])};
  if(m=line.match(/^взрыв\s+([\d.]+)$/))return{t:'boom',r:+m[1]};
  if(m=line.match(/^частицы\s+(\d+)\s*(\S+)?$/))return{t:'part',n:+m[1],c:COLS[m[2]]||m[2]||'#fff'};
  if(m=line.match(/^поставь\s+(-?\d+)\s+(-?\d+)\s+(\S+)$/))return{t:'place',dx:+m[1],dy:+m[2],b:BLN[(m[3]||'').toLowerCase()]||4};
  if(m=line.match(/^ломай\s+(-?\d+)\s+(-?\d+)$/))return{t:'brk',dx:+m[1],dy:+m[2]};
  if(m=line.match(/^ракета\s+(-?[\d.]+)\s+(-?[\d.]+)$/))return{t:'rock',vx:+m[1],vy:+m[2]};
  if(m=line.match(/^гравитация\s+([\d.]+)$/))return{t:'grav',v:+m[1]};
  if(m=line.match(/^чат\s+"([^"]*)"$/))return{t:'chat',m:m[1]};
  if(line==='прыжок')return{t:'jump'};
  return null;}
function execCmd(c,x,y,bx,by,api){if(!c)return;
  if(c.t==='ifnear'){if(api.others().some(p=>Math.hypot(p.x-x,p.y-y)<c.n*T))execCmd(c.c,x,y,bx,by,api);}
  else if(c.t==='boom')api.explode(x,y,c.r);
  else if(c.t==='part')api.particles(x,y,c.n,c.c);
  else if(c.t==='place')api.place(bx+c.dx,by+c.dy,c.b);
  else if(c.t==='brk')api.break(bx+c.dx,by+c.dy);
  else if(c.t==='rock')api.rocket(x,y,c.vx*10,c.vy*10);
  else if(c.t==='grav')api.setGravity(c.v);
  else if(c.t==='chat')api.chat(c.m);
  else if(c.t==='jump')api.jump();}
function compileAny(src){
  const P={click:[],tick:[],start:[]};
  for(let raw of src.split('\n')){let line=raw.trim();if(!line||line.startsWith('//'))continue;
    let ev='start';
    if(line.startsWith('клик:')){ev='click';line=line.slice(5).trim();}
    else if(line.startsWith('тик:')){ev='tick';line=line.slice(5).trim();}
    const c=parseCmd(line);if(c)P[ev].push(c);}
  let tickAcc=0,started=false;
  return{
   onUse:(x,y,api)=>{const tx=Math.floor(x/T),ty=Math.floor(y/T);P.click.forEach(c=>execCmd(c,x,y,tx,ty,api));},
   onUpdate:(dt,api)=>{
     if(!started){started=true;const p=api.players()[0]||{x:0,y:0};P.start.forEach(c=>execCmd(c,p.x,p.y,Math.floor(p.x/T),Math.floor(p.y/T),api));}
     tickAcc+=dt;if(tickAcc>=0.2){tickAcc=0;const p=api.players()[0]||{x:0,y:0};P.tick.forEach(c=>execCmd(c,p.x,p.y,Math.floor(p.x/T),Math.floor(p.y/T),api));}}};
}
const ANY_EX='// ЭниЯзык — твой скрипт-предмет ✨ (клавиша 6)\nклик: взрыв 2\nклик: частицы 25 жёлтый\nтик: если близко 3: чат "Опасно!"';
const JS_EX='// JavaScript\nfunction onUse(x,y,api){\n  api.explode(x,y,2);\n  api.particles(x,y,25,"#ffd23e");\n}\nfunction onUpdate(dt,api){}';
const LESSONS=[
 {n:'Урок 1 — Привет',t:'Команда чат "текст" пишет в чат. Событие клик: срабатывает при ударе инструментом ✨ (клавиша 6).',c:'клик: чат "Привет, Эни Блок!"'},
 {n:'Урок 2 — Взрыв и частицы',t:'взрыв R — взрыв радиусом R блоков в точке клика. частицы N цвет — салют (цвета: красный, жёлтый, зелёный, синий, белый, фиолетовый, оранжевый или #код).',c:'клик: взрыв 2\nклик: частицы 30 оранжевый'},
 {n:'Урок 3 — Стройка',t:'поставь DX DY блок — ставит блок со смещением от точки клика. Блоки: земля, камень, дерево, кирпич, стекло, платформа, ящик, лава.',c:'клик: поставь 0 0 кирпич\nклик: поставь 1 0 кирпич\nклик: поставь 0 -1 кирпич'},
 {n:'Урок 4 — Ломай',t:'ломай DX DY — ломает блок со смещением от клика.',c:'клик: ломай 0 0'},
 {n:'Урок 5 — Ракета',t:'ракета VX VY — запускает ракету со скоростью VX,VY (умножается на 10).',c:'клик: ракета 5 -3'},
 {n:'Урок 6 — Тик',t:'тик: — команда выполняется каждые 0.2 секунды постоянно.',c:'тик: частицы 2 жёлтый'},
 {n:'Урок 7 — Условие',t:'если близко N: команда — сработает, если игрок/бот ближе N блоков.',c:'тик: если близко 4: взрыв 1'},
 {n:'Урок 8 — Гравитация',t:'гравитация V — меняет силу притяжения (стандарт 1600). прыжок — подбрасывает.',c:'клик: гравитация 600\nклик: прыжок'}
];
function compileScript(src,lang){
  if(lang==='js'){if(!src||!src.trim())return null;
    try{return new Function('"use strict";\n'+src+'\n;return {onUpdate:typeof onUpdate==="function"?onUpdate:null,onUse:typeof onUse==="function"?onUse:null};')();}
    catch(e){toast('Ошибка JS: '+e.message);return null;}}
  return compileAny(src||'');
}

/* ============ ПЕРСОНАЖ ============ */
function drawHatImg(c,hx,hy,scale,e){
  const h=HATS.find(q=>q.id===(e.hat||'none'));if(!h||!h.file||!AS.hat[h.id])return;
  const img=AS.hat[h.id],w=h.w*scale,hh=w*h.src[3]/h.src[2];
  c.drawImage(img,h.src[0],h.src[1],h.src[2],h.src[3],hx+h.dx*scale-w/2,hy+h.dy*scale-hh,w,hh);}
function drawChar(c,x,y,e){
  const tl=Math.min(5,Math.max(1,e.tool||1));
  const spr=AS.tool[tl],shirt=AS.shirt[e.skin||'red'];
  if(spr){
    const sx=40,sy=250,sw=820,sh=830,k=88/sw,dw=88,dh=sh*k;
    c.save();c.translate(x,y);if((e.face||1)<0)c.scale(-1,1);
    const ox=-(402-40)*k,oy=46-dh;
    c.drawImage(spr,sx,sy,sw,sh,ox,oy,dw,dh);
    if(shirt)c.drawImage(shirt,235,565,335,515,ox+(235-sx)*k,oy+(565-sy)*k,335*k,515*k);
    drawHatImg(c,2,-23,1,e);
    c.restore();}
  if(e.name&&!e.self){c.fillStyle='#fff';c.font='12px sans-serif';c.textAlign='center';c.fillText(e.name,x,y-78);}
  if(G.mode==='battle'&&e.hp!=null){
    c.fillStyle='#0008';c.fillRect(x-25,y-72,50,6);
    c.fillStyle=e.hp>40?'#45d155':'#ff5722';c.fillRect(x-25,y-72,50*Math.max(0,e.hp)/100,6);}
  const ht=G.t-(e.hitT||-9);if(ht>0&&ht<.2){c.fillStyle='#ff000055';c.beginPath();c.arc(x,y-20,34,0,7);c.fill();}}
function drawPrev(){const c=$('#prevCv').getContext('2d');c.clearRect(0,0,150,170);
  if(AS.tool[1])drawChar(c,75,112,{tool:1,face:1,skin:skin,hat:hat,self:true});}

/* ============ ОТРИСОВКА ============ */
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function drawTile(c,t,px,py,custom){const m=modelOf(t,custom);c.save();c.globalAlpha=m.alpha;
  if(m.grad){const g=c.createLinearGradient(0,py,0,py+T);g.addColorStop(0,m.grad[0]);g.addColorStop(1,m.grad[1]);c.fillStyle=g;}
  else c.fillStyle=m.bg;
  if(m.rad>0){rr(c,px,py,T,T,Math.min(m.rad,T/2));c.fill();if(m.border){c.lineWidth=m.border;c.strokeStyle=m.bc;c.stroke();}}
  else{c.fillRect(px,py,T,T);if(m.border){c.lineWidth=m.border;c.strokeStyle=m.bc;c.strokeRect(px+m.border/2,py+m.border/2,T-m.border,T-m.border);}}
  c.restore();}
function camXY(){const s=G.self,vw=cv.clientWidth,vh=cv.clientHeight;
  return[Math.max(0,Math.min(W*T-vw,s.x-vw/2)),Math.max(0,Math.min(H*T-vh,s.y-vh/2))];}
function draw(){
  const vw=cv.width=cv.clientWidth,vh=cv.height=cv.clientHeight,s=G.self;if(!s)return;
  let[cx,cy]=camXY();
  if(G.shake>0){cx+=Math.random()*G.shake-G.shake/2;cy+=Math.random()*G.shake-G.shake/2;G.shake*=.85;if(G.shake<.5)G.shake=0;}
  const g=ctx.createLinearGradient(0,0,0,vh);g.addColorStop(0,'#87ceeb');g.addColorStop(1,'#cfeffb');ctx.fillStyle=g;ctx.fillRect(0,0,vw,vh);
  const x0=Math.floor(cx/T),x1=Math.ceil((cx+vw)/T),y0=Math.floor(cy/T),y1=Math.ceil((cy+vh)/T);
  for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){const t=getT(tx,ty);if(t)drawTile(ctx,t,tx*T-cx,ty*T-cy,G.models[t]);}
  if(G.mouse&&s.tool===3&&G.copyType){ctx.globalAlpha=.4;drawTile(ctx,G.copyType,(G.mouse.x-cx)&~31,(G.mouse.y-cy)&~31);ctx.globalAlpha=1;}
  G.rockets.forEach(r=>{ctx.save();ctx.translate(r.x-cx,r.y-cy);ctx.rotate(Math.atan2(r.vy,r.vx));ctx.fillStyle='#8a8a8a';rr(ctx,-10,-4,20,8,4);ctx.fill();ctx.fillStyle='#ff5722';ctx.beginPath();ctx.arc(-12,0,4,0,7);ctx.fill();ctx.restore();});
  G.parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.c;ctx.fillRect(p.x-cx-2,p.y-cy-2,4,4);});ctx.globalAlpha=1;
  Object.values(G.remotes).forEach(r=>{r.x+=(r.tx-r.x)*.3;r.y+=(r.ty-r.y)*.3;drawChar(ctx,r.x-cx,r.y-cy,r);});
  G.bots.forEach(b=>drawChar(ctx,b.x-cx,b.y-cy,b));
  drawChar(ctx,s.x-cx,s.y-cy,{...s,self:true,name:null});
}

/* ============ ЦИКЛ ============ */
let last=0;
function loop(ts){if(!G.running)return;const dt=Math.min(.033,(ts-last)/1000||.016);last=ts;G.t+=dt;G.cd=Math.max(0,G.cd-dt);G.brkCd=Math.max(0,G.brkCd-dt);
  const inp={...G.inp};G.inp.jump=0;
  phys(G.self,dt,inp);
  if(G.mode==='battle'){[G.self,...G.bots].forEach(p=>{if(p&&G.t-(p.hitT||-9)>3)p.hp=Math.min(100,(p.hp==null?100:p.hp)+12*dt);});}
  if(G.mouseHeld&&G.mouse){
    if(G.mouseBtn===2){if(G.brkCd<=0){G.brkCd=.18;useTool(G.mouse.x,G.mouse.y,2);}}
    else if([1,2,4,6].includes(G.self.tool))useTool(G.mouse.x,G.mouse.y,0);}
  G.bots.forEach(b=>botStep(b,dt));
  for(let i=G.rockets.length-1;i>=0;i--){const r=G.rockets[i];r.vy+=G.gravity*.25*dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.life-=dt;
    const t=tileAt(r.x,r.y);if(isSolid(t)||t===6||r.life<=0){explode(r.x,r.y,2.4,r.src);G.rockets.splice(i,1);}}
  for(let i=G.parts.length-1;i>=0;i--){const p=G.parts[i];p.vy+=900*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;if(p.life<=0)G.parts.splice(i,1);}
  if(G.script&&G.script.onUpdate){try{G.script.onUpdate(dt,makeApi());}catch(e){}}
  Object.keys(G.remotes).forEach(k=>{if(performance.now()-G.remotes[k].last>4000)delete G.remotes[k];});
  if(G.net)$('#hudOnline').textContent='🌐 '+(1+Object.keys(G.remotes).length);
  draw();requestAnimationFrame(loop);}

/* ============ СТАРТ ============ */
function startGame(opts={}){
  G.running=true;G.t=0;G.rockets=[];G.parts=[];G.chat=[];G.remotes={};G.bots=[];G.script=null;G.models={};G.net=!!opts.net;
  G.mode=opts.mode||'sandbox';modelCache={};
  if(opts.project){world=decMap(opts.project.map);
    if(opts.project.script)G.script=compileScript(opts.project.script,opts.project.scriptLang||'any');
    G.models=opts.project.models||{};
    $('#guiOverlay').innerHTML=opts.project.gui||'';bindGui($('#guiOverlay'));}
  else{if(G.mode==='battle')genBattle();else genWorld();$('#guiOverlay').innerHTML='';}
  G.spawnX=(W/2)*T;G.spawnY=surfaceY(W/2)-60;
  G.self={name:user?user.name:'игрок',x:G.spawnX,y:G.spawnY,vx:0,vy:0,hw:17,hh:42,onGround:false,air:0,dropT:0,coyote:0,jbuf:0,face:1,tool:1,hp:100,color:'#e21b1b',skin:skin,hat:hat,self:true};
  if(G.mode==='battle'&&!G.net)G.bots=[makeBot('Бот Макс','#1b6ae2',1),makeBot('Бот Лея','#1bbf4b',4),makeBot('Бот Рекс','#ff9800',1)];
  buildToolBar();updCoins();
  $('#chatIn').classList.toggle('hidden',!G.net);
  $('#hudOnline').classList.toggle('hidden',!G.net);
  if(G.net){Net.start();toast('🌐 Онлайн: вкладки + устройства в комнате «'+(settings.room||'main')+'»');}
  if(COARSE)goFS(); // на телефоне — сразу во весь экран
  show('game');last=performance.now();requestAnimationFrame(loop);}
function stopGame(){G.running=false;Net.stop();show('menu');}
$('#btnBack').onclick=stopGame;

/* ============ ВВОД ============ */
addEventListener('keydown',e=>{
  if(!$('#game').classList.contains('hidden')&&e.target.tagName!=='INPUT'){
    if(['Space','ArrowUp','KeyW'].includes(e.code)){if(!e.repeat)G.inp.jump=1;e.preventDefault();}
    if(['ArrowLeft','KeyA'].includes(e.code))G.inp.left=1;
    if(['ArrowRight','KeyD'].includes(e.code))G.inp.right=1;
    if(['ArrowDown','KeyS'].includes(e.code))G.inp.down=1;
    const m=e.code.match(/^Digit([1-6])$/);if(m&&G.self){G.self.tool=+m[1];buildToolBar();}}
  else if(e.code==='Enter'&&!$('#chatIn').classList.contains('hidden')&&document.activeElement!==$('#chatIn'))$('#chatIn').focus();});
addEventListener('keyup',e=>{
  if(['ArrowLeft','KeyA'].includes(e.code))G.inp.left=0;
  if(['ArrowRight','KeyD'].includes(e.code))G.inp.right=0;
  if(['ArrowDown','KeyS'].includes(e.code))G.inp.down=0;});
addEventListener('blur',()=>{G.inp.left=0;G.inp.right=0;G.inp.down=0;G.inp.jump=0;G.mouseHeld=false;});
$('#chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim()){chatSend(e.target.value.trim());e.target.value='';e.target.blur();}e.stopPropagation();});
cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointerdown',e=>{e.preventDefault();const[cx,cy]=camXY();const r=cv.getBoundingClientRect();
  G.mouse={x:e.clientX-r.left+cx,y:e.clientY-r.top+cy};G.mouseHeld=true;G.mouseBtn=e.button;
  useTool(G.mouse.x,G.mouse.y,e.button);});
addEventListener('pointerup',()=>{G.mouseHeld=false;});
cv.addEventListener('pointermove',e=>{const[cx,cy]=camXY();const r=cv.getBoundingClientRect();G.mouse={x:e.clientX-r.left+cx,y:e.clientY-r.top+cy};});
function bindGui(root){
  root.querySelectorAll('[data-action]').forEach(el=>{
    const a=el.dataset.action,hold=['left','right','down'];
    if(hold.includes(a)){el.addEventListener('pointerdown',e=>{e.preventDefault();G.inp[a]=1;});['pointerup','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>G.inp[a]=0));}
    else el.addEventListener('pointerdown',e=>{e.preventDefault();
      if(a==='jump')G.inp.jump=1;
      else if(a==='place'||a==='brk')actFront(a);
      else if(a.startsWith('tool')&&G.self){G.self.tool=+a.slice(4);buildToolBar();}});});}
bindGui($('#touch'));
function buildToolBar(){const tb=$('#toolBar');tb.innerHTML='';
  toolList().forEach(t=>{const b=document.createElement('button');b.innerHTML='<small>'+t.id+'</small>'+t.ic;b.title=t.n;
    if(G.self&&G.self.tool===t.id)b.classList.add('sel');
    b.onclick=()=>{if(G.self)G.self.tool=t.id;buildToolBar();};tb.appendChild(b);});}

/* ============ МЕНЮ / КАТАЛОГ ============ */
$('#btnPlay').onclick=()=>startGame({mode:'battle'});
$('#btnSand').onclick=()=>startGame({mode:'sandbox'});
$('#btnOnline').onclick=()=>requireAuth(()=>startGame({net:true,mode:'battle'}));
$('#btnStudio').onclick=()=>{show('studio');edInit();};
$('#btnExpo').onclick=()=>requireAuth(()=>{show('expo');buildExpo();});
$('#btnShop').onclick=()=>{show('shop');buildShop();};
$('#shBack').onclick=()=>{show('menu');drawPrev();};
function buyItem(price,ownedArr,id,isHat){
  if(coins>=price){coins-=price;store.set('bb_coins',coins);
    ownedArr.push(id);store.set(isHat?'bb_ownedH':'bb_owned',ownedArr);
    if(isHat){hat=id;store.set('bb_hat',hat);}else{skin=id;store.set('bb_skin',skin);}
    toast('Куплено и надето!');buildShop();drawPrev();}
  else toast('Не хватает эникойнов! Убивайте в сражалке ⚔');}
function buildShop(){
  updCoins();
  const mk=(list,wrap,isHat,ownedArr,curId)=>{wrap.innerHTML='';
    list.forEach(s=>{
      const d=document.createElement('div');d.className='card';
      const th=document.createElement('div');th.className='thumb';
      if(!isHat&&AS.shirt[s.id]){const cn=document.createElement('canvas');cn.width=200;cn.height=200;const x=cn.getContext('2d');
        x.drawImage(AS.shirt[s.id],205,540,395,540,10,10,180,180);th.appendChild(cn);}
      else if(isHat&&AS.hat[s.id]){const cn=document.createElement('canvas');cn.width=200;cn.height=160;const x=cn.getContext('2d');
        const w=180,h=w*s.src[3]/s.src[2];x.drawImage(AS.hat[s.id],s.src[0],s.src[1],s.src[2],s.src[3],10,150-h,w,h);th.appendChild(cn);}
      else{th.style.background=isHat?'#22304a':(s.col||'#22304a');}
      d.appendChild(th);
      d.insertAdjacentHTML('beforeend','<h3>'+s.n+'</h3><div style="font-size:13px;opacity:.7">'+(s.price?('цена: '+s.price+' 🪙'):'стартовая')+'</div>');
      const b=document.createElement('button');
      if(curId===s.id){b.textContent='✅ Надето';b.disabled=true;}
      else if(ownedArr.includes(s.id)){b.className='primary';b.textContent='Надеть';b.onclick=()=>{
        if(isHat){hat=s.id;store.set('bb_hat',hat);}else{skin=s.id;store.set('bb_skin',skin);}
        toast('Надето!');buildShop();drawPrev();};}
      else{b.textContent='Купить за '+s.price+' 🪙';b.onclick=()=>buyItem(s.price,ownedArr,s.id,isHat);}
      d.appendChild(b);wrap.appendChild(d);});};
  mk(SHIRTS,$('#shopShirts'),false,owned,skin);
  mk(HATS,$('#shopHats'),true,ownedH,hat);}

/* ============ СТУДИЯ ============ */
const ED={world:null,paint:4,models:{},id:store.get('bb_pid',null),lang:'any',scrAny:ANY_EX,scrJs:JS_EX};
const edCv=$('#edCv'),edCtx=edCv.getContext('2d');let edCam={x:0,y:0},edDrag=0;
function edInit(){
  if(!ED.world){ED.world=new Uint8Array(W*H);
    for(let x=0;x<W;x++){for(let y=H-8;y<H-1;y++)ED.world[y*W+x]=1;ED.world[(H-1)*W+x]=9;}}
  buildPalette();buildCssSel();buildLessons();edDraw();
  $('#langSel').value=ED.lang;$('#scrTxt').value=ED.lang==='any'?ED.scrAny:ED.scrJs;}
function buildPalette(){const p=$('#palette');p.innerHTML='';
  [{id:0,n:'Ластик'},...Object.entries(BLOCKS).map(([k,v])=>({id:+k,n:v.n}))].forEach(b=>{
    const el=document.createElement('button');el.title=b.n;
    el.style.background=b.id?parseCSS(BLOCKS[b.id].css).bg:'#222';
    if(b.id===ED.paint)el.classList.add('sel');
    el.onclick=()=>{ED.paint=b.id;buildPalette();};p.appendChild(el);});}
function buildLessons(){const w=$('#lesCards');w.innerHTML='';
  LESSONS.forEach(L=>{const d=document.createElement('div');d.className='card wide';
    d.innerHTML='<h3>'+L.n+'</h3><div style="font-size:13px;opacity:.85">'+L.t+'</div>';
    const pre=document.createElement('pre');pre.textContent=L.c;d.appendChild(pre);
    const row=document.createElement('div');row.className='row';
    const b1=document.createElement('button');b1.textContent='📋 Вставить в редактор';
    b1.onclick=()=>{ED.lang='any';ED.scrAny=L.c;$('#langSel').value='any';$('#scrTxt').value=L.c;toast('Вставлено! Откройте вкладку «ЭниЯзык / JS»');};
    const b2=document.createElement('button');b2.className='primary';b2.textContent='▶ Тест';
    b2.onclick=()=>{ED.lang='any';ED.scrAny=L.c;$('#pTest').click();};
    row.appendChild(b1);row.appendChild(b2);d.appendChild(row);w.appendChild(d);});}
$('#langSel').onchange=()=>{
  ED[ED.lang==='any'?'scrAny':'scrJs']=$('#scrTxt').value;
  ED.lang=$('#langSel').value;
  $('#scrTxt').value=ED.lang==='any'?ED.scrAny:ED.scrJs;
  $('#langHelp').style.display=ED.lang==='any'?'':'none';};
$('#scrTxt').addEventListener('input',()=>{ED[ED.lang==='any'?'scrAny':'scrJs']=$('#scrTxt').value;});
function buildCssSel(){const s=$('#cssBlock');s.innerHTML='';Object.entries(BLOCKS).forEach(([k,v])=>{const o=document.createElement('option');o.value=k;o.textContent=k+' — '+v.n;s.appendChild(o);});
  s.onchange=()=>{$('#cssTxt').value=ED.models[s.value]||BLOCKS[s.value].css;cssPrev();};
  $('#cssTxt').value=ED.models[s.value]||BLOCKS[s.value].css;cssPrev();}
function cssPrev(){$('#cssPrev').style.cssText=$('#cssTxt').value;}
$('#cssTxt').addEventListener('input',cssPrev);
$('#cssApply').onclick=()=>{ED.models[$('#cssBlock').value]=$('#cssTxt').value;modelCache={};toast('Модель применена');edDraw();};
edCv.addEventListener('contextmenu',e=>e.preventDefault());
edCv.addEventListener('pointerdown',e=>{edDrag=e.button===2?255:ED.paint;edPaint(e);});
edCv.addEventListener('pointermove',e=>{if(e.buttons)edPaint(e);});
function edPaint(e){const r=edCv.getBoundingClientRect();
  const tx=Math.floor((e.clientX-r.left+edCam.x)/T),ty=Math.floor((e.clientY-r.top+edCam.y)/T);
  if(inB(tx,ty)&&(ED.world[ty*W+tx]!==9||edDrag===255))ED.world[ty*W+tx]=edDrag===255?0:edDrag;
  edDraw();}
function edDraw(){const vw=edCv.width=edCv.clientWidth,vh=edCv.height=edCv.clientHeight;
  edCam.x=Math.max(0,Math.min(W*T-vw,(W*T-vw)/2));edCam.y=Math.max(0,H*T-vh);
  edCtx.fillStyle='#87ceeb';edCtx.fillRect(0,0,vw,vh);
  const x0=Math.floor(edCam.x/T),y0=Math.floor(edCam.y/T),x1=x0+Math.ceil(vw/T)+1,y1=y0+Math.ceil(vh/T)+1;
  for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){const t=inB(tx,ty)?ED.world[ty*W+tx]:0;if(t)drawTile(edCtx,t,tx*T-edCam.x,ty*T-edCam.y,ED.models[t]);}}
$('#edNew').onclick=()=>{ED.world=new Uint8Array(W*H);for(let x=0;x<W;x++)ED.world[(H-1)*W+x]=9;edDraw();};
$('#edLoad').onclick=()=>{ED.world=new Uint8Array(world);edDraw();toast('Мир загружен');};
$('#stBack').onclick=()=>show('menu');
$('#scrCheck').onclick=()=>{const m=ED.lang==='any'?compileAny($('#scrTxt').value):compileScript($('#scrTxt').value,'js');
  toast(m?'Скрипт ОК ✔':'Скрипт с ошибками');};
document.querySelectorAll('#studio .tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#studio .tabs button').forEach(x=>x.classList.toggle('sel',x===b));
  ['map','scr','les','css','gui'].forEach(t=>$('#tab-'+t).classList.toggle('hidden',t!==b.dataset.tab));});
function curProject(){return{id:ED.id||('p'+Date.now()),name:$('#pName').value||'Без названия',map:encMap(ED.world),
  script:ED.lang==='any'?ED.scrAny:ED.scrJs,scriptLang:ED.lang,models:ED.models,gui:$('#guiTxt').value,author:user?user.name:'аноним'};}
$('#pTest').onclick=()=>startGame({project:curProject(),mode:'sandbox'});
$('#pSave').onclick=()=>{const p=curProject();ED.id=p.id;store.set('bb_pid',ED.id);
  const list=store.get('bb_projects',[]);const i=list.findIndex(x=>x.id===p.id);if(i>=0)list[i]=p;else list.push(p);store.set('bb_projects',list);toast('Проект сохранён');};
$('#pPub').onclick=()=>requireAuth(()=>{const p=curProject();const list=store.get('bb_published',[]);const i=list.findIndex(x=>x.id===p.id);if(i>=0)list[i]=p;else list.push(p);store.set('bb_published',list);$('#pSave').click();toast('Опубликовано на выставке! 🏆');});

/* ============ ВЫСТАВКА ============ */
function demoArena(){const w=new Uint8Array(W*H);
  for(let x=0;x<W;x++){for(let y=H-6;y<H-1;y++)w[y*W+x]=2;w[(H-1)*W+x]=9;
    if(x<3||x>=W-4)for(let y=H-20;y<H-6;y++)w[y*W+x]=4;}
  for(let x=40;x<48;x++)w[(H-14)*W+x]=6;for(let x=70;x<78;x++)w[(H-18)*W+x]=6;return w;}
function demoParkour(){const w=new Uint8Array(W*H);
  for(let x=0;x<W;x++){w[(H-1)*W+x]=9;w[(H-2)*W+x]=8;w[(H-3)*W+x]=8;}
  for(let i=0;i<10;i++){const px=8+i*14,py=H-8-i*4;for(let x=px;x<px+4;x++)if(inB(x,py))w[py*W+x]=6;}
  for(let x=0;x<6;x++)for(let y=H-8;y<H-2;y++)w[y*W+x]=1;return w;}
const DEMOS=[
 {id:'d1',name:'Ракетная арена (ЭниЯзык)',author:'Эни Блок',map:encMap(demoArena()),models:{},gui:'',scriptLang:'any',script:'клик: взрыв 2\nклик: частицы 20 жёлтый\nтик: если близко 3: чат "кто-то рядом!"'},
 {id:'d2',name:'Паркур над лавой',author:'Эни Блок',map:encMap(demoParkour()),models:{6:'background:linear-gradient(#ff8a80,#d24040);border:2px solid #8f1f1f;border-radius:6px;'},gui:'<div style="position:absolute;left:12px;top:40%"><button data-action="jump" style="width:70px;height:70px;border-radius:50%;background:#ff5722;font-size:16px">ПРЫГ!</button></div>',scriptLang:'any',script:''}];
function buildExpo(){const c=$('#exCards');c.innerHTML='';
  [...DEMOS,...store.get('bb_published',[])].forEach(p=>{
    const d=document.createElement('div');d.className='card';
    d.innerHTML='<h3>'+p.name+'</h3><div style="font-size:13px;opacity:.7">автор: '+p.author+'</div><button class="primary">▶ Играть</button>';
    d.querySelector('button').onclick=()=>startGame({project:p,mode:'sandbox'});
    c.appendChild(d);});}

/* ресайз визуального вьюпорта (панели браузера на телефоне) */
if(window.visualViewport)visualViewport.addEventListener('resize',()=>{document.body.style.height=visualViewport.height+'px';});
updCoins();drawPrev();
</script>
</body>
</html>
