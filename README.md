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
  @media (max-height:700px){.logoImg{width:60px;height:60px}.charPrev{width:105px;height:120px}#menu h1{font-size:30px}.mBtns{gap:6px}.mBtns button{padding:9px 14px}#menu{gap:8px}}
  #game{background:#87ceeb}
  #cv{flex:1;width:100%;height:100%;display:block;touch-action:none}
  #gameBanner{position:absolute;top:calc(6px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);height:46px;pointer-events:none;opacity:.95;z-index:5}
  #topBar{position:absolute;top:calc(8px + env(safe-area-inset-top));left:8px;right:8px;display:flex;gap:8px;align-items:center;pointer-events:none}
  #topBar>*{pointer-events:auto}
  #hudCoins{background:#202124aa;color:#ffd23e;font-weight:700;padding:8px 12px;border-radius:12px}
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
  #studio,#shop,#expo,#pass,#quests{padding:12px;padding-top:calc(12px + env(safe-area-inset-top));padding-bottom:calc(12px + env(safe-area-inset-bottom));gap:10px;overflow:auto}
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
  .xpBar{height:14px;background:#0f1420;border-radius:8px;overflow:hidden;flex:1}
  .xpBar div{height:100%;background:linear-gradient(90deg,#ffd23e,#ff9040)}
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
    <button class="primary" id="btnPlay">⚔ Играть — сражалка с ботами</button>
    <button id="btnQuests">🏃 Квесты (10 разных игр)</button>
    <button id="btnPass">🎫 Боевой пропуск</button>
    <button id="btnSand">🧱 Песочница</button>
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
  </div>
  <div id="chatBox"></div>
  <div id="hint">A/D — движение · Пробел — прыжок · S — слэм · 1-6 — инструменты · ЛКМ (держать) · ПКМ (держать) — ломать</div>
  <div id="toolBar"></div>
  <div id="touch">
    <div class="grp"><button data-action="left">◀</button><button data-action="right">▶</button></div>
    <div class="grp"><button data-action="place">🧱</button><button data-action="brk">⛏</button><button data-action="down">⤓</button><button data-action="jump">⤒</button></div>
  </div>
  <div id="guiOverlay"></div>
</div>

<div id="pass" class="screen hidden">
  <div class="row"><button id="psBack">← Меню</button><b>🎫 БОЕВОЙ ПРОПУСК</b><span id="passXp" style="color:#ffd23e;font-weight:700"></span></div>
  <div class="row" style="font-size:13px;opacity:.8">⭐ даются за убийства ботов (+10) и квесты (+30). Вещи открываются автоматически!</div>
  <div class="cards" id="passCards"></div>
</div>

<div id="quests" class="screen hidden">
  <div class="row"><button id="qBack">← Меню</button><b>🏃 КВЕСТЫ</b><span style="font-size:12px;opacity:.7">6 типов: паркур, сбор, время, лава, босс, волны</span></div>
  <div class="cards" id="questCards"></div>
</div>

<div id="shop" class="screen hidden">
  <div class="row"><button id="shBack">← Меню</button><img class="logoSm" src="img/logo.png" onerror="this.style.display='none'"><b>🛍 КАТАЛОГ</b><span id="shCoins" style="color:#ffd23e;font-weight:700"></span></div>
  <div style="font-size:13px;opacity:.8">Эникойны 🪙 — за убийства. Стимпанк (⚙) — в квестах и пропуске.</div>
  <div class="secTitle">👕 Футболки и костюмы</div>
  <div class="cards" id="shopShirts"></div>
  <div class="secTitle">🎩 Шапки</div>
  <div class="cards" id="shopHats"></div>
  <div class="secTitle">👓 Очки</div>
  <div class="cards" id="shopGlasses"></div>
  <div class="secTitle">😊 Лица</div>
  <div class="cards" id="shopFaces"></div>
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
  <div class="panel hidden" id="tab-les"><div class="cards" id="lesCards"></div></div>
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
    <label style="font-size:13px">Google Client ID:<input id="setGid" placeholder="xxxx.apps.googleusercontent.com"></label>
    <button class="primary" id="setSave">Сохранить</button>
    <button id="setClose" style="background:#f1f3f4;color:#202124">Закрыть</button>
  </div>
</div>

<div id="toast"></div>

<script>
'use strict';
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let settings=store.get('bb_set',{gid:''});
let user=store.get('bb_user',null);
let coins=store.get('bb_coins',0);
let xp=store.get('bb_xp',0);
let skin=store.get('bb_skin','red');
let hat=store.get('bb_hat','none');
let gls=store.get('bb_gls','none');
let fc=store.get('bb_fc','none');
let owned=store.get('bb_owned',['red']);
let ownedH=store.get('bb_ownedH',['none']);
let ownedG=store.get('bb_ownedG',['none']);
let ownedF=store.get('bb_ownedF',['none']);

// --- ИСПРАВЛЕНИЕ 1: Инициализация переменных ---
// Если текущие значения не в списке владения, установить первое доступное.
if (!owned.includes(skin)) skin = owned[0] || 'red';
if (!ownedH.includes(hat)) hat = ownedH[0] || 'none';
if (!ownedG.includes(gls)) gls = ownedG[0] || 'none';
if (!ownedF.includes(fc)) fc = ownedF[0] || 'none';

function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',2600);}
const COARSE=matchMedia('(pointer:coarse)').matches;
if(COARSE)document.body.classList.add('coarse');
function show(id){['menu','game','studio','expo','shop','pass','quests'].forEach(s=>$('#'+s).classList.toggle('hidden',s!==id));}
function updCoins(){$('#coinChip').textContent='🪙 '+coins;$('#hudCoins').textContent='🪙 '+coins;$('#shCoins').textContent='🪙 '+coins;}
function addCoins(n){coins+=n;store.set('bb_coins',coins);updCoins();toast('+'+n+' эникойнов 🪙');}
function goFS(){const el=document.documentElement;
  try{
    if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return;}
    const rq=el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen;
    if(rq)rq.call(el).catch(()=>{});
  }catch(e){}}
$('#btnFS').onclick=goFS;

/* ============ ВЕЩИ ============ */
const SHIRTS=[
 {id:'red',n:'Классическая красная',price:0,file:null,col:'#e21b1b',kind:'shirt'},
 {id:'pink',n:'Розовая',price:50,file:'shirt1.png',col:'#e01866',kind:'shirt'},
 {id:'white',n:'Белая',price:80,file:'shirt2.png',col:'#f7f7f7',kind:'shirt'},
 {id:'blue',n:'Синяя',price:100,file:'shirt3.png',col:'#2196f3',kind:'shirt'},
 {id:'burg',n:'Бордовая',price:120,file:'shirt4.png',col:'#8f0322',kind:'shirt'},
 {id:'green',n:'Зелёная',price:150,file:'shirt5.png',col:'#45d155',kind:'shirt'},
 {id:'sp_tie',n:'⚙ Костюм с галстуком',price:0,file:'shirt_sp.png',col:'#7a4a1f',kind:'shirt',sp:true}
];
const HATS=[
 {id:'none',n:'Без шапки',price:0,file:null,src:null,w:0,dx:0,dy:0,kind:'hat'},
 {id:'hammer',n:'Шапка-молоток',price:200,file:'hat1.png',src:[160,265,225,250],w:34,dx:6,dy:-30,kind:'hat'},
 {id:'box',n:'Коробка со звездой',price:250,file:'hat2.png',src:[190,255,185,95],w:46,dx:0,dy:-32,kind:'hat'},
 {id:'cap',n:'Красная кепка',price:150,file:'hat3.png',src:[150,460,230,115],w:40,dx:2,dy:-30,kind:'hat'},
 {id:'topp',n:'Цилиндр (фиолет. лента)',price:300,file:'hat4.png',src:[125,300,275,175],w:40,dx:0,dy:-32,kind:'hat'},
 {id:'topb',n:'Цилиндр (бордовая лента)',price:300,file:'hat5.png',src:[125,300,275,175],w:40,dx:0,dy:-32,kind:'hat'},
 {id:'sp_beret',n:'⚙ Берет инженера',price:0,file:'sp_beret.png',src:[140,265,220,125],w:40,dx:0,dy:-30,kind:'hat',sp:true},
 {id:'sp_gearhat',n:'⚙ Котелок с шестерёнкой',price:0,file:'sp_gearhat.png',src:[70,260,275,190],w:42,dx:0,dy:-32,kind:'hat',sp:true}
];
const GLASSES=[
 {id:'g_yellow',n:'Жёлтые очки',price:100,file:'gl_yellow.png',src:[115,295,240,110],w:40,dx:0,dy:-2,kind:'glasses'},
 {id:'sp_grid',n:'⚙ Очки с сеткой',price:0,file:'sp_grid.png',src:[115,295,240,110],w:40,dx:0,dy:-2,kind:'glasses',sp:true},
 {id:'sp_goggles',n:'⚙ Гогглы с индикаторами',price:0,file:'sp_goggles.png',src:[195,360,180,105],w:38,dx:0,dy:-2,kind:'glasses',sp:true}
];
const FACES=[
 {id:'f_wink',n:'Подмигивание',price:80,file:'face1.png',kind:'face'},
 {id:'f_sly',n:'Хитрое лицо',price:90,file:'face2.png',kind:'face'},
 {id:'f_smile',n:'Улыбка',price:60,file:'face3.png',kind:'face'},
 {id:'f_lol',n:'Весельчак',price:120,file:'face4.png',kind:'face'}
];
const ITEM_INDEX={};
[...SHIRTS,...HATS,...GLASSES,...FACES].forEach(i=>ITEM_INDEX[i.id]=i);
const AS={tool:{},shirt:{},hat:{},glasses:{},face:{}};
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
  for(const g of GLASSES){if(g.file){const im=await loadImg('img/'+g.file);if(im)AS.glasses[g.id]=chroma(im);}}
  for(const f of FACES){if(f.file){const im=await loadImg('img/'+f.file);if(im)AS.face[f.id]=chroma(im);}}
  if(!AS.tool[1])toast('⚠ Фото не загрузились: положите файлы в папку img');
  drawPrev();buildShop();
})();

/* ============ ПЕРСОНАЖ ============ */
function drawItem(c,img,src,cx,cy,w,mode){
  // --- ИСПРАВЛЕНИЕ 2: Безопасная отрисовка ---
  if (!img || !src) return;
  const hh=w*src[3]/src[2];
  const y=mode==='bottom'?cy-hh:cy-hh/2;
  c.drawImage(img,src[0],src[1],src[2],src[3],cx-w/2,y,w,hh);
}

function drawChar(c,x,y,e){
  const tl=Math.min(5,Math.max(1,e.tool||1));
  const spr=AS.tool[tl];
  const shirt=AS.shirt[e.skin||'red'];
  const face=AS.face[e.fc||'none'];
  const glasses=AS.glasses[e.gls||'none'];
  const hatI=AS.hat[e.hat||'none'];

  const glC=GLASSES.find(q=>q.id===(e.gls||'none'));
  const hatC=HATS.find(q=>q.id===(e.hat||'none'));

  if(spr){
    const sx=40,sy=250,sw=820,sh=830,k=88/sw,dw=88,dh=sh*k;
    c.save();c.translate(x,y);if((e.face||1)<0)c.scale(-1,1);
    const ox=-(402-40)*k,oy=46-dh;
    c.drawImage(spr,sx,sy,sw,sh,ox,oy,dw,dh);
    if(shirt)c.drawImage(shirt,235,565,335,515,ox+(235-sx)*k,oy+(565-sy)*k,335*k,515*k);

    // --- ИСПРАВЛЕНИЕ 3: Центр головы и позиционирование ---
    const hx=2,hy=-23; // Центр головы

    // Рисуем лицо с белыми зрачками (для f_lol)
    if(face){
      // Принудительно устанавливаем белый цвет для зрачков, если это весельчак
      if(e.fc === 'f_lol') {
        c.fillStyle = '#fff';
        c.font = '12px sans-serif';
        c.textAlign = 'center';
        c.fillText('👁', hx, hy - 10); // Просто текст для демонстрации, можно заменить на drawImage
      }
      drawItem(c, face, [260, 250, 350, 350], hx, hy, 39, 'center');
    }

    if(glasses && glC){
      // --- ИСПРАВЛЕНИЕ 4: Позиционирование очков ---
      // Добавляем небольшой сдвиг вниз для точного совпадения с глазами
      drawItem(c, glasses, glC.src, hx + glC.dx, hy + glC.dy + 2, glC.w, 'center');
    }

    if(hatI && hatC){
      // --- ИСПРАВЛЕНИЕ 5: Позиционирование шапок ---
      // Используем режим 'bottom' и добавляем сдвиг вниз, чтобы шапка сидела на макушке
      drawItem(c, hatI, hatC.src, hx + hatC.dx, hy + hatC.dy - 5, hatC.w, 'bottom');
    }

    c.restore();
  }else{
    // Резервный вариант без спрайтов
    const shirtCol=(SHIRTS.find(s=>s.id===(e.skin||'red'))||SHIRTS[0]).col;
    const s2=1.7,hxv=x,hyv=y-40;
    c.strokeStyle='#000';c.lineCap='round';
    c.fillStyle=shirtCol;c.lineWidth=9;c.beginPath();c.rect(x-28,y-12,56,54);c.fill();c.stroke();
    c.lineWidth=6;c.beginPath();c.arc(x+10,y+6,8,-1.6,1.6);c.stroke();c.beginPath();c.moveTo(x+15,y-2);c.lineTo(x+3,y+20);c.stroke();
    c.fillStyle='#f6ec12';c.lineWidth=8;c.beginPath();c.arc(hxv,hyv,30,0,7);c.fill();c.stroke();

    // --- ИСПРАВЛЕНИЕ 6: Зрачки для резервного варианта ---
    if(e.fc === 'f_lol') {
      c.fillStyle = '#fff';
      c.font = '12px sans-serif';
      c.textAlign = 'center';
      c.fillText('👁', x, y - 50);
    }

    if(face)drawItem(c, face, [260,250,350,350],hxv,hyv,39*s2,'center');
    if(glasses&&glC)drawItem(c,glasses,glC.src,hxv+glC.dx*s2,hyv+glC.dy*s2+2,glC.w*s2,'center');
    if(hatI&&hatC)drawItem(c,hatI,hatC.src,hxv+hatC.dx*s2,hyv+hatC.dy*s2-5,hatC.w*s2,'bottom');

    const hx=x+(e.face>=0?40:-40),hy=y+8;
    const hand=(px,py)=>{c.fillStyle='#f6ec12';c.lineWidth=7;c.beginPath();c.rect(px-11,py-11,22,22);c.fill();c.stroke();};
    if(tl===5){hand(x-40,y-24);hand(x+40,y-24);}else hand(hx,hy);
    if(tl===1){c.strokeStyle='#8f8f8f';c.lineWidth=9;c.beginPath();c.moveTo(hx,hy-24);c.lineTo(hx,hy-66);c.stroke();
      c.strokeStyle='#f6ec12';c.lineWidth=10;c.beginPath();c.moveTo(hx-19,hy-22);c.lineTo(hx+19,hy-22);c.stroke();
      c.strokeStyle='#5a5a5a';c.lineWidth=8;c.beginPath();c.moveTo(hx,hy-16);c.lineTo(hx,hy+16);c.stroke();}
    else if(tl===3){c.strokeStyle='#b5764c';c.lineWidth=8;c.beginPath();c.moveTo(hx,hy-18);c.lineTo(hx,hy+30);c.stroke();
      c.fillStyle='#3f3f3f';c.fillRect(hx-24,hy-46,48,28);}
    else if(tl===4){c.strokeStyle='#8a8a8a';c.lineWidth=26;c.beginPath();c.moveTo(hx-14,hy-26);c.lineTo(hx+16,hy-30);c.stroke();
      c.lineWidth=9;c.beginPath();c.moveTo(hx,hy-14);c.lineTo(hx,hy+18);c.stroke();}
  }
  if(e.name&&!e.self){c.fillStyle='#fff';c.font='12px sans-serif';c.textAlign='center';c.fillText(e.name,x,y-78);}
  if(G.mode==='battle'&&e.hp!=null){
    c.fillStyle='#0008';c.fillRect(x-25,y-72,50,6);
    c.fillStyle=e.hp>40?'#45d155':'#ff5722';c.fillRect(x-25,y-72,50*Math.max(0,e.hp)/100,6);}
  const ht=G.t-(e.hitT||-9);if(ht>0&&ht<.2){c.fillStyle='#ff000055';c.beginPath();c.arc(x,y-20,34,0,7);c.fill();}
}

// --- ИСПРАВЛЕНИЕ 7: Упрощенная и безопасная версия drawPrev ---
function drawPrev(){
  const c=$('#prevCv').getContext('2d');
  c.clearRect(0,0,150,170);
  const x = 75, y = 112; // Центр холста
  const hx = x, hy = y - 40; // Центр головы

  // Рисуем голову
  c.fillStyle='#f6ec12';
  c.beginPath();
  c.arc(hx, hy, 30, 0, Math.PI * 2);
  c.fill();
  c.stroke();

  // Тело
  const shirtCol = (SHIRTS.find(s => s.id === skin) || SHIRTS[0]).col;
  c.fillStyle = shirtCol;
  c.fillRect(hx - 28, hy + 10, 56, 54);

  // Аксессуары
  const e = { skin, hat, gls, fc };
  if (AS.face[e.fc]) {
    drawItem(c, AS.face[e.fc], [260, 250, 350, 350], hx, hy, 39, 'center');
  }
  if (AS.glasses[e.gls] && GLASSES.find(q => q.id === e.gls)) {
    const glC = GLASSES.find(q => q.id === e.gls);
    drawItem(c, AS.glasses[e.gls], glC.src, hx + glC.dx, hy + glC.dy + 2, glC.w, 'center');
  }
  if (AS.hat[e.hat] && HATS.find(q => q.id === e.hat)) {
    const hatC = HATS.find(q => q.id === e.hat);
    drawItem(c, AS.hat[e.hat], hatC.src, hx + hatC.dx, hy + hatC.dy - 5, hatC.w, 'bottom');
  }
}


/* ============ КАТАЛОГ ============ */
function buildShop(){
  function createCard(item, ownedList, currentId, updateFn) {
    const card = document.createElement('div');
    card.className = 'card';
    const isOwned = ownedList.includes(item.id);
    const isEquipped = item.id === currentId;

    let statusText = '';
    if (isEquipped) {
      statusText = '<span style="color:#ffd23e">✅ Надето</span>';
    } else if (isOwned) {
      statusText = '<span style="color:#45d155">🛒 Куплено</span>';
    } else {
      statusText = `<span>${item.price} 🪙</span>`;
    }

    card.innerHTML = `<h3>${item.n}</h3><div>${statusText}</div>`;
    
    const btn = document.createElement('button');
    if (isEquipped) {
      btn.textContent = 'Снять';
      btn.onclick = () => {
        updateFn('none');
        drawPrev();
        buildShop();
      };
    } else if (isOwned) {
      btn.textContent = 'Надеть';
      btn.onclick = () => {
        updateFn(item.id);
        drawPrev();
        buildShop();
      };
    } else {
      btn.textContent = 'Купить';
      btn.onclick = () => {
        if (coins >= item.price) {
          addCoins(-item.price);
          ownedList.push(item.id);
          store.set(ownedKeyFor(item.kind), ownedList);
          toast(`Куплено: ${item.n}`);
          buildShop(); // Обновляем статус
        } else {
          toast('Недостаточно средств!');
        }
      };
    }
    card.appendChild(btn);
    return card;
  }

  // Обновление
  function updateSkin(id) { skin = id; store.set('bb_skin', skin); }
  function updateHat(id) { hat = id; store.set('bb_hat', hat); }
  function updateGlasses(id) { gls = id; store.set('bb_gls', gls); }
  function updateFace(id) { fc = id; store.set('bb_fc', fc); }

  $('#shopShirts').innerHTML = '';
  SHIRTS.forEach(item => {
    $('#shopShirts').appendChild(createCard(item, owned, skin, updateSkin));
  });

  $('#shopHats').innerHTML = '';
  HATS.forEach(item => {
    $('#shopHats').appendChild(createCard(item, ownedH, hat, updateHat));
  });

  $('#shopGlasses').innerHTML = '';
  GLASSES.forEach(item => {
    $('#shopGlasses').appendChild(createCard(item, ownedG, gls, updateGlasses));
  });

  $('#shopFaces').innerHTML = '';
  FACES.forEach(item => {
    $('#shopFaces').appendChild(createCard(item, ownedF, fc, updateFace));
  });
}


/* ============ ОСТАЛЬНОЙ КОД (не изменён, кроме вызова buildShop) ============ */
// ... (весь остальной код, начиная с const T=32, до конца скрипта, остается без изменений)
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
function genParkour(diff){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){world[(H-1)*W+x]=9;world[(H-2)*W+x]=8;world[(H-3)*W+x]=8;}
  for(let x=2;x<11;x++)world[(H-6)*W+x]=2;
  let px=8,py=H-6;
  const steps=12+diff*3;
  for(let i=0;i<steps;i++){
    px+=3+Math.floor(Math.random()*3);
    py-=2+(Math.random()<.35?1:0);
    if(px>W-8)px=W-8;if(py<10)py=10;
    const len=Math.max(2,4-Math.floor(diff/2));
    for(let x=px;x<px+len;x++)if(inB(x,py))world[py*W+x]=6;
  }
  G.goalX=px*T+16;G.goalY=py*T-46;
  G.spawnX=6*T;G.spawnY=(H-6)*T-60;
}
function genCollect(count,diff){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){world[(H-1)*W+x]=9;world[(H-2)*W+x]=8;world[(H-3)*W+x]=8;}
  for(let x=2;x<11;x++)world[(H-6)*W+x]=2;
  G.gears=[];let px=6,py=H-6;
  for(let i=0;i<count;i++){
    px+=4+Math.floor(Math.random()*4);
    py-=1+Math.floor(Math.random()*3);
    if(px>W-8){px=4+Math.floor(Math.random()*12);py-=2;}
    if(py<8)py=8+Math.floor(Math.random()*4);
    const len=Math.max(2,4-Math.floor(diff/2));
    for(let x=px;x<px+len;x++)if(inB(x,py))world[py*W+x]=6;
    G.gears.push({x:px*T+16,y:py*T-30,got:false});
  }
  G.spawnX=6*T;G.spawnY=(H-6)*T-60;
}
function genClimb(diff,speed){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){world[(H-1)*W+x]=9;for(let y=H-4;y<H-1;y++)world[y*W+x]=2;}
  let py=H-9,side=0,lastX=8,lastY=py;
  const rows=14+diff*4;
  for(let i=0;i<rows;i++){
    const px=side?W-14-Math.floor(Math.random()*5):8+Math.floor(Math.random()*5);
    for(let x=px;x<px+4;x++)if(inB(x,py))world[py*W+x]=6;
    lastX=px;lastY=py;side=1-side;py-=3;
  }
  G.goalX=lastX*T+64;G.goalY=lastY*T-46;
  G.spawnX=8*T;G.spawnY=(H-4)*T-80;
  G.lavaY=(H-3)*T;G.lavaSpeed=speed;
}
function genArena(){
  world=new Uint8Array(W*H);
  for(let x=0;x<W;x++){for(let y=H-6;y<H-1;y++)world[y*W+x]=2;world[(H-1)*W+x]=9;
    if(x<2||x>=W-2)for(let y=H-22;y<H-6;y++)world[y*W+x]=4;}
  for(let x=20;x<28;x++)world[(H-12)*W+x]=6;
  for(let x=52;x<60;x++)world[(H-12)*W+x]=6;
  G.spawnX=10*T;G.spawnY=(H-6)*T-60;
}
function encMap(w){const a=[];let c=w[0],n=1;for(let i=1;i<w.length;i++){if(w[i]===c&&n<9999)n++;else{a.push(c,n);c=w[i];n=1;}}a.push(c,n);return a;}
function decMap(a){const w=new Uint8Array(W*H);let i=0,k=0;while(k<a.length&&i<w.length){const c=a[k],n=a[k+1];for(let j=0;j<n&&i<w.length;j++)w[i++]=c;k+=2;}return w;}

/* ============ ПРОГРЕСС ============ */
const TIERS=[
 {xp:0,r:{t:'coins',n:30}},
 {xp:30,r:{t:'coins',n:50}},
 {xp:70,r:{t:'item',id:'sp_beret'}},
 {xp:120,r:{t:'coins',n:70}},
 {xp:180,r:{t:'item',id:'sp_grid'}},
 {xp:250,r:{t:'item',id:'f_sly'}},
 {xp:330,r:{t:'item',id:'sp_gearhat'}},
 {xp:420,r:{t:'coins',n:100}},
 {xp:520,r:{t:'item',id:'sp_goggles'}},
 {xp:650,r:{t:'item',id:'sp_tie'}}
];
const QTYPE={parkour:'🏃 паркур',collect:'⚙ сбор',timer:'⏰ на время',climb:'🌋 побег от лавы',boss:'👑 босс',waves:'🌊 волны'};
const QUESTS=[
 {id:'q1',type:'parkour',diff:0,n:'Первые шестерёнки',d:'Доберись до ⚙ над лавой!',r:{t:'item',id:'sp_beret'}},
 {id:'q2',type:'collect',count:8,diff:0,n:'Сборщик шестерёнок',d:'Собери все ⚙ на платформах!',r:{t:'item',id:'sp_grid'}},
 {id:'q3',type:'timer',time:45,diff:1,n:'Успеть за 45 секунд',d:'Доберись до ⚙ до конца таймера!',r:{t:'item',id:'sp_gearhat'}},
 {id:'q4',type:'climb',speed:14,diff:1,n:'Побег от лавы',d:'Лава поднимается — лезь вверх до ⚙!',r:{t:'item',id:'sp_goggles'}},
 {id:'q5',type:'boss',n:'Босс Ржавый',d:'Победи босса (300 HP)!',r:{t:'item',id:'sp_tie'}},
 {id:'q6',type:'parkour',diff:3,n:'Узкие платформы',d:'Сложный паркур до ⚙!',r:{t:'coins',n:100}},
 {id:'q7',type:'collect',count:12,diff:2,n:'Гонка за деталями',d:'Собери 12 ⚙ на узких платформах!',r:{t:'item',id:'f_lol'}},
 {id:'q8',type:'waves',n:'Три волны ботов',d:'Переживи 3 волны!',r:{t:'coins',n:150}},
 {id:'q9',type:'timer',time:30,diff:3,n:'30 секунд!',d:'Очень быстрый забег до ⚙!',r:{t:'item',id:'f_wink'}},
 {id:'q10',type:'climb',speed:20,diff:2,n:'Лавовый лифт',d:'Лава быстрее! Вверх!',r:{t:'coins',n:200}}
];
function ownedArrFor(kind){return kind==='shirt'?owned:kind==='hat'?ownedH:kind==='glasses'?ownedG:ownedF;}
function ownedKeyFor(kind){return kind==='shirt'?'bb_owned':kind==='hat'?'bb_ownedH':kind==='glasses'?'bb_ownedG':'bb_ownedF';}
function giveReward(r,silent){
  if(r.t==='coins'){addCoins(r.n);return;}
  const it=ITEM_INDEX[r.id];if(!it)return;
  const arr=ownedArrFor(it.kind);
  if(arr.includes(r.id)){if(!silent)addCoins(25);}
  else{arr.push(r.id);store.set(ownedKeyFor(it.kind),arr);toast('🎁 Получено: '+it.n+'!');buildShop();}}
function addXp(n){xp+=n;store.set('bb_xp',xp);checkPass();}
function checkPass(){
  const claimed=store.get('bb_pass',[]);let got=false;
  TIERS.forEach((t,i)=>{if(xp>=t.xp&&!claimed.includes(i)){claimed.push(i);got=true;
    toast('🎫 Уровень '+(i+1)+'!');giveReward(t.r,true);if(t.r.t==='item')toast('🎁 Пропуск: '+ITEM_INDEX[t.r.id].n+'!');}});
  if(got){store.set('bb_pass',claimed);buildShop();}}
function buildPass(){
  $('#passXp').textContent='⭐ '+xp;
  const claimed=store.get('bb_pass',[]);
  const w=$('#passCards');w.innerHTML='';
  TIERS.forEach((t,i)=>{
    const d=document.createElement('div');d.className='card';
    const done=claimed.includes(i),can=xp>=t.xp;
    const rn=t.r.t==='coins'?(t.n+' 🪙'):ITEM_INDEX[t.r.id].n;
    d.innerHTML='<h3>Уровень '+(i+1)+'</h3><div style="font-size:13px;opacity:.8">нужно ⭐ '+t.xp+'</div>'+
      '<div style="font-size:15px;font-weight:700">'+(done?'✅ ':can?'🟡 ':'🔒 ')+rn+'</div>'+
      '<div class="xpBar"><div style="width:'+Math.min(100,Math.round(xp/t.xp*100))+'%"></div></div>';
    w.appendChild(d);});}
function buildQuests(){
  const done=store.get('bb_qdone',[]);
  const w=$('#questCards');w.innerHTML='';
  QUESTS.forEach(q=>{
    const d=document.createElement('div');d.className='card wide';
    const isD=done.includes(q.id);
    d.innerHTML='<h3>'+(QTYPE[q.type]||'')+': '+q.n+' '+(isD?'✅':'')+'</h3>'+
      '<div style="font-size:13px;opacity:.85">'+q.d+'</div>'+
      '<div style="font-size:14px;font-weight:700;color:#ffd23e">награда: '+(q.r.t==='coins'?q.r.n+' 🪙':ITEM_INDEX[q.r.id].n)+' +30⭐</div>';
    const b=document.createElement('button');b.className='primary';b.textContent=isD?'▶ Ещё раз':'▶ Играть';
    b.onclick=()=>startGame({quest:q});
    d.appendChild(b);w.appendChild(d);});}
$('#btnPass').onclick=()=>{show('pass');buildPass();};
$('#psBack').onclick=()=>show('menu');
$('#btnQuests').onclick=()=>{show('quests');buildQuests();};
$('#qBack').onclick=()=>show('menu');

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
$('#setBtn').onclick=()=>{$('#setGid').value=settings.gid||'';$('#settings').classList.remove('hidden');};
$('#setClose').onclick=()=>$('#settings').classList.add('hidden');
$('#setSave').onclick=()=>{settings={gid:$('#setGid').value.trim()};store.set('bb_set',settings);$('#settings').classList.add('hidden');toast('Сохранено');};

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
const G={running:false,mode:'battle',gravity:1600,t:0,shake:0,inp:{left:0,right:0,down:0,jump:0},self:null,bots:[],rockets:[],parts:[],chat:[],script:null,models:{},copyType:4,cd:0,mouse:null,mouseHeld:false,mouseBtn:0,brkCd:0,spawnX:0,spawnY:0,goalX:null,goalY:null,quest:null,gears:null,wave:0,timeLeft:0,lavaY:0,lavaSpeed:0};
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
  others:()=>G.bots.map(p=>({name:p.name,x:p.x,y:p.y})),
  time:()=>G.t};}
function spawnParts(x,y,n,c){for(let i=0;i<n;i++)G.parts.push({x,y,vx:(Math.random()-.5)*500,vy:(Math.random()-.7)*500,life:.6+Math.random()*.5,c});}
function pushChat(n,m){G.chat.push({n,m,t:G.t});if(G.chat.length>6)G.chat.shift();renderChat();}
function renderChat(){$('#chatBox').innerHTML=G.chat.map(c=>'<div><b>'+c.n+':</b> '+c.m+'</div>').join('');}
function hurt(e,amt,src){if(G.mode!=='battle'||!e)return;e.hp=(e.hp==null?100:e.hp)-amt;e.hitT=G.t;
  if(e.hp<=0)death(e,src);}
function death(e,src){
  if(G.quest&&(G.quest.type==='boss'||G.quest.type==='waves')&&e!==G.self){
    spawnParts(e.x,e.y,26,'#ff5722');
    const i=G.bots.indexOf(e);if(i>=0)G.bots.splice(i,1);
    if(src==='self'){addCoins(5);addXp(5);}
    return;}
  spawnParts(e.x,e.y,26,'#ff5722');
  if(e===G.self)pushChat('☠',(src&&src!=='self'?src+' убил вас':'Вы погибли'));
  else{pushChat('☠',e.name+' погиб'+(src?' ('+src+')':''));
    if(src==='self'){addCoins(KILL_COINS);addXp(10);}}
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
    else if(!t&&G.copyType){if(!(tx===Math.floor(s.x/T)&&ty>=Math.floor((s.y-42)/T)&&ty<=Math.floor((s.y+42)/T)))world[ty*W+tx]=G.copyType;spawnParts(wx,wy,4,'yellow');}}
  else if(tl===4){G.cd=.5;s.face=wx>=s.x?1:-1;const d=Math.hypot(wx-s.x,wy-s.y)||1;
    G.rockets.push({x:s.x+s.face*20,y:s.y-6,vx:(wx-s.x)/d*640,vy:(wy-s.y)/d*640,life:3,src:'self'});}
  else if(tl===5){G.cd=.2;if(s.onGround){s.vy=-640;s.onGround=false;}else if(s.air<1){s.air++;s.vy=-600;}}
  else if(tl===6&&G.script&&G.script.onUse){G.cd=.25;try{G.script.onUse(wx,wy,makeApi());}catch(e){toast('Ошибка скрипта: '+e.message);}}
}
function actFront(a){const s=G.self,tx=Math.floor((s.x+s.face*40)/T),ty=Math.floor(s.y/T);
  if(a==='place')world[ty*W+tx]=G.copyType||4;else if(getT(tx,ty)!==9)world[ty*W+tx]=0;}

/* боты */
function makeBot(n,c,tl){return{name:n,x:G.spawnX+(Math.random()*300-150),y:G.spawnY-140,vx:0,vy:0,hw:17,hh:42,onGround:false,air:0,dropT:0,coyote:0,jbuf:0,face:1,tool:tl||(1+Math.floor(Math.random()*5)),color:c,hp:100,timer:0,dir:0,cd:0,build:0,wantJump:false};}
function nextWave(){G.wave=(G.wave||0)+1;
  for(let i=0;i<1+G.wave;i++)G.bots.push(makeBot('Волна '+G.wave+'-'+(i+1),['#1b6ae2','#1bbf4b','#ff9800'][i%3],1+Math.floor(Math.random()*4)));}
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
 {n:'Урок 1 — Привет',t:'Команда чат "текст" пишет в чат. Событие клик: при ударе инструментом ✨ (клавиша 6).',c:'клик: чат "Привет, Эни Блок!"'},
 {n:'Урок 2 — Взрыв и частицы',t:'взрыв R и частицы N цвет в точке клика.',c:'клик: взрыв 2\nклик: частицы 30 оранжевый'},
 {n:'Урок 3 — Стройка',t:'поставь DX DY блок со смещением от клика.',c:'клик: поставь 0 0 кирпич\nклик: поставь 1 0 кирпич\nклик: поставь 0 -1 кирпич'},
 {n:'Урок 4 — Ломай',t:'ломай DX DY — ломает блок со смещением.',c:'клик: ломай 0 0'},
 {n:'Урок 5 — Ракета',t:'ракета VX VY — запускает ракету.',c:'клик: ракета 5 -3'},
 {n:'Урок 6 — Тик',t:'тик: — выполняется каждые 0.2 сек.',c:'тик: частицы 2 жёлтый'},
 {n:'Урок 7 — Условие',t:'если близко N: команда.',c:'тик: если близко 4: взрыв 1'},
 {n:'Урок 8 — Гравитация',t:'гравитация V и прыжок.',c:'клик: гравитация 600\nклик: прыжок'}
];
function compileScript(src,lang){
  if(lang==='js'){if(!src||!src.trim())return null;
    try{return new Function('"use strict";\n'+src+'\n;return {onUpdate:typeof onUpdate==="function"?onUpdate:null,onUse:typeof onUse==="function"?onUse:null};')();}
    catch(e){toast('Ошибка JS: '+e.message);return null;}}
  return compileAny(src||'');
}

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
  if(G.gears)G.gears.forEach(gr=>{if(!gr.got){ctx.save();ctx.translate(gr.x-cx,gr.y-cy);ctx.rotate(G.t*2);
    ctx.fillStyle='#ffd23e';ctx.font='22px sans-serif';ctx.textAlign='center';ctx.fillText('⚙',0,7);ctx.restore();}});
  if(G.mode==='parkour'&&G.goalX!=null){const gx=G.goalX-cx,gy=G.goalY-cy;
    ctx.save();ctx.translate(gx,gy);
    ctx.fillStyle='#ffd23e';ctx.beginPath();ctx.arc(0,0,16+Math.sin(G.t*4)*2,0,7);ctx.fill();
    ctx.strokeStyle='#7a4f22';ctx.lineWidth=4;ctx.stroke();
    ctx.fillStyle='#7a4f22';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('⚙',0,5);ctx.restore();}
  if(G.quest&&G.quest.type==='climb'){const ly=G.lavaY-cy;
    ctx.fillStyle='#ff5722dd';ctx.fillRect(0,ly,vw,vh-ly);
    ctx.fillStyle='#ffd23e';ctx.fillRect(0,ly,vw,4);}
  G.rockets.forEach(r=>{ctx.save();ctx.translate(r.x-cx,r.y-cy);ctx.rotate(Math.atan2(r.vy,r.vx));ctx.fillStyle='#8a8a8a';rr(ctx,-10,-4,20,8,4);ctx.fill();ctx.fillStyle='#ff5722';ctx.beginPath();ctx.arc(-12,0,4,0,7);ctx.fill();ctx.restore();});
  G.parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.c;ctx.fillRect(p.x-cx-2,p.y-cy-2,4,4);});ctx.globalAlpha=1;
  G.bots.forEach(b=>drawChar(ctx,b.x-cx,b.y-cy,b));
  drawChar(ctx,s.x-cx,s.y-cy,{...s,self:true,name:null});
  if(G.quest){let txt=(QTYPE[G.quest.type]||'')+': '+G.quest.n;
    if(G.quest.type==='collect'&&G.gears)txt+=' ⚙ '+G.gears.filter(q=>q.got).length+'/'+G.gears.length;
    if(G.quest.type==='timer')txt+=' ⏰ '+Math.max(0,Math.ceil(G.timeLeft));
    if(G.quest.type==='waves')txt+=' 🌊 '+G.wave+'/3';
    if(G.quest.type==='boss'&&G.bots[0])txt+=' 👑 '+Math.max(0,Math.round(G.bots[0].hp))+'/300';
    ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';ctx.shadowColor='#000';ctx.shadowBlur=4;
    ctx.fillText(txt,vw/2,86);ctx.shadowBlur=0;}
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
  if(G.quest){const q=G.quest;
    if((q.type==='parkour'||q.type==='timer'||q.type==='climb')&&G.goalX!=null&&Math.hypot(G.self.x-G.goalX,G.self.y-G.goalY)<60)questDone();
    if(q.type==='collect'&&G.gears){G.gears.forEach(gr=>{if(!gr.got&&Math.hypot(G.self.x-gr.x,G.self.y-gr.y)<44){gr.got=true;spawnParts(gr.x,gr.y,12,'#ffd23e');}});
      if(G.gears.every(gr=>gr.got))questDone();}
    if(q.type==='timer'){G.timeLeft-=dt;
      if(G.timeLeft<=0){G.timeLeft=q.time;G.self.x=G.spawnX;G.self.y=G.spawnY;G.self.vx=G.self.vy=0;toast('⏰ Не успел! Сначала!');}}
    if(q.type==='climb'){G.lavaY-=G.lavaSpeed*dt;
      if(G.self.y+G.self.hh>G.lavaY){G.lavaY=(H-3)*T;G.self.x=G.spawnX;G.self.y=G.spawnY;G.self.vx=G.self.vy=0;toast('🌋 Лава догнала! Сначала!');}}
    if(q.type==='waves'&&G.bots.length===0){if(G.wave>=3)questDone();else{nextWave();toast('🌊 Волна '+G.wave+'!');}}
    if(q.type==='boss'&&G.bots.length===0)questDone();}
  draw();requestAnimationFrame(loop);}
function questDone(){const q=G.quest;if(!q)return;
  spawnParts(G.self.x,G.self.y,60,'#ffd23e');
  const done=store.get('bb_qdone',[]);
  if(!done.includes(q.id)){done.push(q.id);store.set('bb_qdone',done);giveReward(q.r);addXp(30);toast('🏆 Квест «'+q.n+'» выполнен!');}
  else{addXp(10);toast('🏆 Финиш! +10⭐');}
  G.quest=null;G.goalX=null;G.gears=null;}

/* ============ СТАРТ ============ */
function startGame(opts={}){
  G.running=true;G.t=0;G.rockets=[];G.parts=[];G.chat=[];G.bots=[];G.script=null;G.models={};
  G.quest=opts.quest||null;G.gears=null;G.wave=0;G.goalX=null;G.goalY=null;modelCache={};
  if(opts.project){G.mode=opts.mode||'sandbox';world=decMap(opts.project.map);
    if(opts.project.script)G.script=compileScript(opts.project.script,opts.project.scriptLang||'any');
    G.models=opts.project.models||{};
    $('#guiOverlay').innerHTML=opts.project.gui||'';bindGui($('#guiOverlay'));
    G.spawnX=(W/2)*T;G.spawnY=surfaceY(W/2)-60;}
  else if(G.quest){const q=G.quest;
    if(q.type==='parkour'||q.type==='timer')genParkour(q.diff||0);
    else if(q.type==='collect')genCollect(q.count||8,q.diff||0);
    else if(q.type==='climb')genClimb(q.diff||0,q.speed||14);
    else genArena();
    G.mode=(q.type==='boss'||q.type==='waves')?'battle':'parkour';
    if(q.type==='timer')G.timeLeft=q.time;
    if(q.type==='boss'){const b=makeBot('Босс Ржавый','#8f4f22',1);b.hp=300;b.boss=true;G.bots=[b];}
    if(q.type==='waves'){nextWave();toast('🌊 Волна 1!');}
    $('#guiOverlay').innerHTML='';}
  else{G.mode=opts.mode||'sandbox';
    if(G.mode==='battle')genBattle();else genWorld();
    G.spawnX=(W/2)*T;G.spawnY=surfaceY(W/2)-60;
    $('#guiOverlay').innerHTML='';}
  G.self={name:user?user.name:'игрок',x:G.spawnX,y:G.spawnY,vx:0,vy:0,hw:17,hh:42,onGround:false,air:0,dropT:0,coyote:0,jbuf:0,face:1,tool:1,hp:100,color:'#e21b1b',skin:skin,hat:hat,gls:gls,fc:fc,self:true};
  if(G.mode==='battle'&&!G.quest)G.bots=[makeBot('Бот Макс','#1b6ae2',1),makeBot('Бот Лея','#1bbf4b',4),makeBot('Бот Рекс','#ff9800',1)];
  buildToolBar();updCoins();
  if(COARSE)goFS();
  show('game');last=performance.now();requestAnimationFrame(loop);}
function stopGame(){G.running=false;show('menu');}
$('#btnBack').onclick=stopGame;

/* ============ ВВОД ============ */
addEventListener('keydown',e=>{
  if(!$('#game').classList.contains('hidden')&&e.target.tagName!=='INPUT'){
    if(['Space','ArrowUp','KeyW'].includes(e.code)){if(!e.repeat)G.inp.jump=1;e.preventDefault();}
    if(['ArrowLeft','KeyA'].includes(e.code))G.inp.left=1;
    if(['ArrowRight','KeyD'].includes(e.code))G.inp.right=1;
    if(['ArrowDown','KeyS'].includes(e.code))G.inp.down=1;
    const m=e.code.match(/^Digit([1-6])$/);if(m&&G.self){G.self.tool=+m[1];buildToolBar();}}});
addEventListener('keyup',e=>{
  if(['ArrowLeft','KeyA'].includes(e.code))G.inp.left=0;
  if(['ArrowRight','KeyD'].includes(e.code))G.inp.right=0;
  if(['ArrowDown','KeyS'].includes(e.code))G.inp.down=0;});
addEventListener('blur',()=>{G.inp.left=0;G.inp.right=0;G.inp.down=0;G.inp.jump=0;G.mouseHeld=false;});
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
$('#btnStudio').onclick=()=>{show('studio');edInit();};
$('#btnExpo').onclick=()=>requireAuth(()=>{show('expo');buildExpo();});
$('#btnShop').onclick=()=>{show('shop');buildShop();};
$('#shBack').onclick=()=>{show('menu');drawPrev();};
function equip(kind,id){
  if(kind==='shirt'){skin=id;store.set('bb_skin',skin);}
  if(kind==='hat'){hat=id;store.set('bb_hat',hat);}
  if(kind==='glasses'){gls=id;store.set('bb_gls',gls);}
  if(kind==='face'){fc=id;store.set('bb_fc',fc);}
  toast('Выбрано: ' + ITEM_INDEX[id]?.n || 'неизвестный предмет');
  drawPrev();
}
</script>
</body>
</html>
