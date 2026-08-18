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
  .thumb canvas{max-width:100%;max-height:100%}
  .secTitle{margin-top:6px;font-size:18px}
  .xpBar{height:14px;background:#0f1420;border-radius:8px;overflow:hidden;flex:1}
  .xpBar div{height:100%;background:linear-gradient(90deg,#ffd23e,#ff9040)}
  .modal{position:fixed;inset:0;background:#000a;display:flex;align-items:center;justify-content:center;z-index:50}
  .mCard{background:#fff;color:#202124;border-radius:16px;padding:26px;width:340px;max-width:92vw;display:flex;flex-direction:column;gap:14px;max-height:92dvh;overflow:auto}
  .gLogo{font-size:26px;font-weight:700}
  .gLogo span:nth-child(1){color:#4285F4}.gLogo span:nth-child(2){color:#EA4335}.gLogo span:nth-child(3){color:#FBBC05}.gLogo span:nth-child(4){color:#4285F4}.gLogo span:nth-child(5){color:#34A853}.gLogo span:nth-child(6){color:#EA4335}
  .mCard input{background:#f1f3f4;color:#202124;border:1px solid #dadce0}
  #toast{position:fixed;bottom:calc(16px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);background:#202124e6;padding:10px 18px;border-radius:30px;z-index:99;display:none;max-width:92vw}
  #musicPanel{position:fixed;bottom:calc(8px + env(safe-area-inset-bottom));right:calc(8px + env(safe-area-inset-right));display:flex;align-items:center;gap:8px;background:#1a2236;padding:8px 12px;border-radius:30px;z-index:100}
  #musicPanel.hidden{display:none}
  #musicPanel button{width:36px;height:36px;padding:0;border-radius:50%;font-size:16px}
  #trackName{font-size:12px;max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#ffd23e}
  #volSlider{width:60px;height:4px;background:#33406b;border-radius:2px;appearance:none}
  #volSlider::-webkit-slider-thumb{appearance:none;width:12px;height:12px;background:#ffd23e;border-radius:50%;cursor:pointer}
</style>
</head>
<body>

<audio id="bgMusic"></audio>

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

<div id="musicPanel" class="hidden">
  <button id="musicToggle">▶</button>
  <span id="trackName">Музыка</span>
  <input type="range" id="volSlider" min="0" max="100" value="50">
  <button id="musicNext">⏭</button>
</div>

<div id="toast"></div>

<script>
'use strict';
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let settings=store.get('bb_set',{gid:'',volume:50});
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
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',2600);}
const COARSE=matchMedia('(pointer:coarse)').matches;
if(COARSE)document.body.classList.add('coarse');
function show(id){['menu','game','studio','expo','shop','pass','quests'].forEach(s=>$('#'+s).classList.toggle('hidden',s!==id));
  if(id==='menu'){updateMusicUI();if(settings.musicOn!==false&&bgMusic.paused&&bgMusic.src)bgMusic.play().catch(()=>{});}
  else stopMusic();}
function updCoins(){$('#coinChip').textContent='🪙 '+coins;$('#hudCoins').textContent='🪙 '+coins;$('#shCoins').textContent='🪙 '+coins;}
function addCoins(n){coins+=n;store.set('bb_coins',coins);updCoins();toast('+'+n+' эникойнов 🪙');}
function goFS(){const el=document.documentElement;
  try{
    if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return;}
    const rq=el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen;
    if(rq)rq.call(el).catch(()=>{});
  }catch(e){}}
$('#btnFS').onclick=goFS;

/* ============ МУЗЫКА: РОВНО 5 ПЕСЕН ============ */
const MUSIC_LIST=[
  {name:'Winter Theme',file:'music/winter_theme.mp3'},
  {name:'Трек 2',file:'music/track_02.mp3'},
  {name:'Трек 3',file:'music/track_03.mp3'},
  {name:'Трек 4',file:'music/track_04.mp3'},
  {name:'Трек 5',file:'music/track_05.mp3'}
];
let currentTrack=0;
const bgMusic=$('#bgMusic');
bgMusic.volume=(settings.volume!=null?settings.volume:50)/100;
function updateMusicUI(){
  $('#trackName').textContent=MUSIC_LIST[currentTrack]?MUSIC_LIST[currentTrack].name:'Музыка';
  $('#musicToggle').textContent=bgMusic.paused?'▶':'⏸';
  const inMenu=!$('#menu').classList.contains('hidden');
  $('#musicPanel').classList.toggle('hidden',!inMenu);}
function playTrack(idx){
  if(!MUSIC_LIST[idx])return;
  currentTrack=idx;bgMusic.src=MUSIC_LIST[currentTrack].file;
  if(!$('#menu').classList.contains('hidden'))bgMusic.play().catch(()=>{});
  updateMusicUI();}
function stopMusic(){bgMusic.pause();updateMusicUI();}
$('#musicToggle').onclick=()=>{if(bgMusic.paused)bgMusic.play().catch(()=>{});else bgMusic.pause();updateMusicUI();};
$('#musicNext').onclick=()=>playTrack((currentTrack+1)%MUSIC_LIST.length);
$('#volSlider').oninput=e=>{const v=+e.target.value;bgMusic.volume=v/100;settings.volume=v;store.set('bb_set',settings);};
bgMusic.onended=()=>playTrack((currentTrack+1)%MUSIC_LIST.length);
document.addEventListener('pointerdown',function first(){if(!$('#menu').classList.contains('hidden')){playTrack(0);}document.removeEventListener('pointerdown',first);},{once:true});

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
$('#setSave').onclick=()=>{settings.gid=$('#setGid').value.trim();store.set('bb_set',settings);$('#settings').classList.add('hidden');toast('Сохранено');};

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
function spawnParts(x,y,n,c){if(COARSE)n=Math.ceil(n/2);if(G.parts.length>350)return;
  for(let i=0;i<n;i++)G.parts.push({x,y,vx:(Math.random()-.5)*500,vy:(Math.random()-.7)*500,life:.6+Math.random()*.5,c});}
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
  [G.self,...G.bots].forEach(p=>{if(p&&Math.hypot(p.x-cx,p.y-cy)<80)hurt(p,35,srcKey);});
}
function drawChar(ctx,x,y,e){
  ctx.save();ctx.translate(x,y);
  if(e.face<0)ctx.scale(-1,1);
  // Тело
  const shirt=AS.shirt[e.skin]||AS.shirt['red'];
  if(shirt){ctx.drawImage(shirt,-20,-30,40,50);}
  else{ctx.fillStyle=e.col;ctx.fillRect(-15,-20,30,40);}
  // Голова
  ctx.fillStyle='#ffccaa';ctx.fillRect(-12,-45,24,24);
  // Лицо
  if(e.fc&&AS.face[e.fc])ctx.drawImage(AS.face[e.fc],-12,-45,24,24);
  // Глаза
  ctx.fillStyle='#000';ctx.fillRect(-5,-40,4,4);ctx.fillRect(5,-40,4,4);
  // Шапка
  if(e.hat&&AS.hat[e.hat]){const h=AS.hat[e.hat];ctx.drawImage(h,-h.w/2+h.dx,-45+h.dy,h.w,30);}
  // Очки
  if(e.gls&&AS.glasses[e.gls]){const g=AS.glasses[e.gls];ctx.drawImage(g,-g.w/2+g.dx,-45+g.dy,g.w,20);}
  ctx.restore();
}
function draw(){
  const vw=cv.width,vh=cv.height;
  ctx.clearRect(0,0,vw,vh);
  if(!G.self)return;
  const p=G.self;
  let cx=p.x-vw/2,cy=p.y-vh/2;
  if(cx<0)cx=0;if(cy<0)cy=0;if(cx>W*T-vw)cx=W*T-vw;if(cy>H*T-vh)cy=H*T-vh;
  if(G.shake>0){cx+=(Math.random()-.5)*G.shake;cy+=(Math.random()-.5)*G.shake;G.shake*=.9;if(G.shake<.5)G.shake=0;}
  
  // Небо
  ctx.fillStyle='#87ceeb';ctx.fillRect(0,0,vw,vh);
  
  // Блоки
  const sx=Math.floor(cx/T),ex=Math.floor((cx+vw)/T)+1,sy=Math.floor(cy/T),ey=Math.floor((cy+vh)/T)+1;
  for(let y=sy;y<ey;y++)for(let x=sx;x<ex;x++){
    if(!inB(x,y))continue;const t=world[y*W+x];if(!t)continue;
    const m=modelOf(t,G.models[t]);
    const px=x*T-cx,py=y*T-cy;
    if(m.grad){const g=ctx.createLinearGradient(px,py,px,py+T);g.addColorStop(0,m.grad[0]);g.addColorStop(1,m.grad[1]);ctx.fillStyle=g;}
    else ctx.fillStyle=m.bg;
    ctx.globalAlpha=m.alpha;
    ctx.beginPath();ctx.roundRect(px+m.border,py+m.border,T-m.border*2,T-m.border*2,m.rad);ctx.fill();
    if(m.border>0){ctx.strokeStyle=m.bc;ctx.lineWidth=m.border;ctx.stroke();}
    ctx.globalAlpha=1;
  }
  
  // Цель квеста
  if(G.goalX){ctx.fillStyle='#ffd23e';ctx.beginPath();ctx.arc(G.goalX-cx,G.goalY-cy,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#000';ctx.font='12px sans';ctx.fillText('⚙',G.goalX-cx-6,G.goalY-cy+4);}
  
  // Шестерёнки
  if(G.gears)G.gears.forEach(g=>{if(!g.got){ctx.fillStyle='#aaa';ctx.beginPath();ctx.arc(g.x-cx,g.y-cy,10,0,Math.PI*2);ctx.fill();ctx.fillStyle='#000';ctx.fillText('⚙',g.x-cx-5,g.y-cy+4);}});
  
  // Частицы
  G.parts.forEach((pt,i)=>{pt.life-=0.016;pt.x+=pt.vx*0.016;pt.y+=pt.vy*0.016;pt.vy+=20*0.016;
    if(pt.life<=0){G.parts.splice(i,1);return;}
    ctx.globalAlpha=pt.life;ctx.fillStyle=pt.c;ctx.fillRect(pt.x-cx,pt.y-cy,4,4);ctx.globalAlpha=1;});
  
  // Боты
  G.bots.forEach(b=>drawChar(ctx,b.x-cx,b.y-cy,b));
  // Игрок
  drawChar(ctx,p.x-cx,p.y-cy,p);
  
  // Лава в квесте
  if(G.lavaY){ctx.fillStyle='#ff5722';ctx.fillRect(0,G.lavaY-cy,vw,vh-(G.lavaY-cy));}
  
  // GUI оверлей
  if(G.guiHtml){$('#guiOverlay').innerHTML=G.guiHtml;}
}
function loop(ts){
  if(!G.running)return;
  const dt=Math.min(0.05,(ts-lastTime)/1000);lastTime=ts;G.t+=dt;
  
  // Логика квестов
  if(G.quest){
    if(G.quest.type==='timer'){G.timeLeft-=dt;if(G.timeLeft<=0){death(G.self,'время');G.running=false;toast('Время вышло!');setTimeout(()=>show('menu'),1500);}}
    if(G.quest.type==='climb'){G.lavaY-=G.lavaSpeed*dt;if(G.self.y>G.lavaY)death(G.self,'лава');}
    if(G.goalX&&Math.hypot(G.self.x-G.goalX,G.self.y-G.goalY)<40){
      toast('Квест выполнен! +30⭐');addXp(30);giveReward(G.quest.r);
      const done=store.get('bb_qdone',[]);if(!done.includes(G.quest.id)){done.push(G.quest.id);store.set('bb_qdone',done);}
      G.running=false;setTimeout(()=>show('menu'),1500);
    }
    if(G.gears){let all=true;G.gears.forEach(g=>{if(!g.got&&Math.hypot(G.self.x-g.x,G.self.y-g.y)<30){g.got=true;toast('+1 ⚙');}});
      if(G.gears.every(g=>g.got)){toast('Все шестерёнки собраны!');addXp(30);giveReward(G.quest.r);G.running=false;setTimeout(()=>show('menu'),1500);}}
  }
  
  // Физика игрока
  if(G.self){phys(G.self,dt,G.inp);
    // Сбор монет/ящиков
    const tx=Math.floor(G.self.x/T),ty=Math.floor(G.self.y/T);
    if(getT(tx,ty)===7){world[ty*W+tx]=0;addCoins(5);spawnParts(G.self.x,G.self.y,10,'#ffd23e');}
  }
  
  // Боты
  G.bots.forEach(b=>{
    const inp={left:0,right:0,jump:0,down:0};
    if(G.self){
      if(b.x<G.self.x-50)inp.right=1;else if(b.x>G.self.x+50)inp.left=1;
      if(b.y>G.self.y+50&&b.onGround)inp.jump=1;
      if(Math.abs(b.x-G.self.x)<60&&Math.abs(b.y-G.self.y)<40){
        if(b.tool===1)meleeSwing(b,b.name,b.x+(b.face>0?30:-30),b.y);
        if(b.tool===4&&G.t-b.cd>1.5){G.rockets.push({x:b.x,y:b.y,vx:b.face*400,vy:-200,life:3,src:b.name});b.cd=G.t;}
      }
    }
    phys(b,dt,inp);
  });
  
  // Ракеты
  G.rockets.forEach((r,i)=>{r.life-=dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.vy+=100*dt;
    if(r.life<=0||tileAt(r.x,r.y)!==0){explode(r.x,r.y,3,r.src);G.rockets.splice(i,1);}
    else{[G.self,...G.bots].forEach(p=>{if(p&&Math.hypot(p.x-r.x,p.y-r.y)<20)hurt(p,40,r.src);});}
  });
  
  // Скрипт
  if(G.script&&G.script.onTick)try{G.script.onTick(makeApi());}catch(e){console.error(e);}
  
  draw();
  requestAnimationFrame(loop);
}
let lastTime=0;
function startGame(opt={}){
  G.running=true;G.mode=opt.mode||'battle';G.quest=opt.quest;G.script=opt.project?parseScript(opt.project.script,opt.project.scriptLang):null;
  G.models=opt.project?opt.project.models:{};G.guiHtml=opt.project?opt.project.gui:'';
  G.t=0;G.shake=0;G.bots=[];G.rockets=[];G.parts=[];G.chat=[];G.inp={left:0,right:0,down:0,jump:0};
  G.spawnX=80*T;G.spawnY=40*T;G.goalX=null;G.goalY=null;G.gears=null;G.lavaY=0;G.timeLeft=0;
  
  if(G.quest){
    if(G.quest.type==='parkour')genParkour(G.quest.diff);
    else if(G.quest.type==='collect')genCollect(G.quest.count,G.quest.diff);
    else if(G.quest.type==='timer')genParkour(G.quest.diff);
    else if(G.quest.type==='climb')genClimb(G.quest.diff,G.quest.speed);
    else if(G.quest.type==='boss'){genArena();spawnBoss();}
    else if(G.quest.type==='waves'){genArena();G.wave=0;nextWave();}
  }else if(G.mode==='sandbox'){genWorld();}
  else{genBattle();for(let i=0;i<6;i++)spawnBot();}
  
  G.self={x:G.spawnX,y:G.spawnY,vx:0,vy:0,hw:15,hh:30,onGround:false,face:1,air:0,dropT:0,slam:false,
    skin:skin,hat:hat,gls:gls,fc:fc,col:(SHIRTS.find(s=>s.id===skin)||SHIRTS[0]).col,tool:2,hp:100};
  
  show('game');resizeCanvas();lastTime=performance.now();requestAnimationFrame(loop);
  buildToolBar();
}
function spawnBot(){
  const names=['Алекс','Макс','Бот1','Бот2','Нуб','Про'];
  const b={x:G.spawnX+(Math.random()*200-100),y:G.spawnY-100,vx:0,vy:0,hw:15,hh:30,onGround:false,face:1,air:0,dropT:0,slam:false,
    skin:SHIRTS[Math.floor(Math.random()*SHIRTS.length)].id,hat:'none',gls:'none',fc:'none',col:'#fff',tool:Math.random()>0.5?1:4,hp:100,name:names[Math.floor(Math.random()*names.length)],cd:0};
  G.bots.push(b);
}
function spawnBoss(){
  const b={x:W*T/2,y:H*T/2-100,vx:0,vy:0,hw:25,hh:50,onGround:false,face:1,air:0,dropT:0,slam:false,
    skin:'burg',hat:'topp',gls:'g_yellow',fc:'f_sly',col:'#8f0322',tool:1,hp:300,name:'БОСС РЖАВЫЙ',cd:0};
  G.bots.push(b);
}
function nextWave(){
  if(G.wave>=3){toast('Победа!');addXp(30);giveReward(QUESTS.find(q=>q.id==='q8').r);G.running=false;setTimeout(()=>show('menu'),1500);return;}
  G.wave++;toast('Волна '+G.wave);
  for(let i=0;i<2+G.wave;i++)spawnBot();
}
function resizeCanvas(){cv.width=cv.clientWidth;cv.height=cv.clientHeight;}
window.addEventListener('resize',resizeCanvas);

/* ============ УПРАВЛЕНИЕ ============ */
// Клавиатура
window.addEventListener('keydown',e=>{
  if(e.code==='KeyA'||e.code==='ArrowLeft')G.inp.left=1;
  if(e.code==='KeyD'||e.code==='ArrowRight')G.inp.right=1;
  if(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')G.inp.jump=1;
  if(e.code==='KeyS'||e.code==='ArrowDown')G.inp.down=1;
  if(e.key>='1'&&e.key<='6'){const t=toolList().find(x=>x.id==e.key);if(t)setTool(t.id);}
});
window.addEventListener('keyup',e=>{
  if(e.code==='KeyA'||e.code==='ArrowLeft')G.inp.left=0;
  if(e.code==='KeyD'||e.code==='ArrowRight')G.inp.right=0;
  if(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')G.inp.jump=0;
  if(e.code==='KeyS'||e.code==='ArrowDown')G.inp.down=0;
});
// Мышь
cv.addEventListener('mousedown',e=>{
  G.mouseHeld=true;G.mouseBtn=e.button;handleMouse(e);
});
cv.addEventListener('mousemove',e=>{if(G.mouseHeld)handleMouse(e);});
window.addEventListener('mouseup',()=>{G.mouseHeld=false;});
function handleMouse(e){
  if(!G.self)return;const rect=cv.getBoundingClientRect();
  const mx=e.clientX-rect.left,cy=e.clientY-rect.top;
  const wx=mx+cx,wy=cy+cy; // cx/cy из draw() нужно глобально, упростим:
  // Пересчет координат мира из экрана
  const p=G.self;let camX=p.x-cv.width/2,camY=p.y-cv.height/2;
  const worldX=mx+camX,worldY=cy+camY;
  
  if(G.mouseBtn===0){ // ЛКМ - действие
    if(G.self.tool===1)meleeSwing(G.self,'self',worldX,worldY);
    else if(G.self.tool===3){G.copyType=tileAt(worldX,worldY);toast('Скопирован блок '+BLOCKS[G.copyType].n);}
    else if(G.self.tool===4&&G.t-G.cd>0.5){G.rockets.push({x:G.self.x,y:G.self.y,vx:(worldX-G.self.x)*0.5,vy:(worldY-G.self.y)*0.5,life:3,src:'self'});G.cd=G.t;}
    else if(G.self.tool===6&&G.script&&G.script.onClick)try{G.script.onClick(makeApi(),worldX,worldY);}catch(e){}
    else if(G.self.tool===2||G.self.tool===5){ // Ставить блок
       const tx=Math.floor(worldX/T),ty=Math.floor(worldY/T);
       if(inB(tx,ty)&&world[ty*W+tx]===0){world[ty*W+tx]=G.self.tool===5?6:(G.copyType||1);}
    }
  }else if(G.mouseBtn===2){ // ПКМ - ломать
    const tx=Math.floor(worldX/T),ty=Math.floor(worldY/T);
    if(inB(tx,ty)&&world[ty*W+tx]!==9)world[ty*W+tx]=0;
  }
}
cv.addEventListener('contextmenu',e=>e.preventDefault());

// Сенсор
const touchActions={};
$('#touch').addEventListener('touchstart',e=>{
  e.preventDefault();
  for(let i=0;i<e.touches.length;i++){
    const t=e.touches[i],btn=t.target.closest('button');
    if(btn){const act=btn.dataset.action;touchActions[t.identifier]=act;
      if(act==='left')G.inp.left=1;if(act==='right')G.inp.right=1;
      if(act==='jump')G.inp.jump=1;if(act==='down')G.inp.down=1;
      if(act==='place'){if(G.self){const tx=Math.floor((G.self.x+ (G.self.face>0?30:-30))/T),ty=Math.floor((G.self.y+20)/T);if(inB(tx,ty)&&world[ty*W+tx]===0)world[ty*W+tx]=G.copyType||1;}}
      if(act==='brk'){if(G.self){const tx=Math.floor((G.self.x+ (G.self.face>0?30:-30))/T),ty=Math.floor((G.self.y+20)/T);if(inB(tx,ty)&&world[ty*W+tx]!==9)world[ty*W+tx]=0;}}
    }
  }
},{passive:false});
$('#touch').addEventListener('touchend',e=>{
  e.preventDefault();
  for(let i=0;i<e.changedTouches.length;i++){
    const act=touchActions[e.changedTouches[i].identifier];delete touchActions[e.changedTouches[i].identifier];
    if(act==='left')G.inp.left=0;if(act==='right')G.inp.right=0;
    if(act==='jump')G.inp.jump=0;if(act==='down')G.inp.down=0;
  }
});

function setTool(id){G.self.tool=id;buildToolBar();}
function buildToolBar(){
  const w=$('#toolBar');w.innerHTML='';
  toolList().forEach(t=>{
    const b=document.createElement('button');b.textContent=t.ic;b.title=t.n;
    if(t.id===G.self.tool)b.classList.add('sel');
    b.onclick=()=>setTool(t.id);
    if(t.id<=5)b.innerHTML+=`<small>${t.id}</small>`;
    w.appendChild(b);
  });
}

/* ============ СТУДИЯ ============ */
function drawPrev(){
  const c=$('#prevCv'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
  drawChar(x,75,100,{skin:skin,hat:hat,gls:gls,fc:fc,col:(SHIRTS.find(s=>s.id===skin)||SHIRTS[0]).col,face:1});
}
function buildShop(){
  const sDiv=$('#shopShirts');sDiv.innerHTML='';
  SHIRTS.forEach(s=>{
    const d=document.createElement('div');d.className='card';
    d.innerHTML=`<div class="thumb" style="background:${s.col}"></div><b>${s.n}</b><small>${s.price} 🪙</small>`;
    const b=document.createElement('button');
    b.textContent=owned.includes(s.id)?'Надеть':'Купить';
    b.onclick=()=>{
      if(owned.includes(s.id)){skin=s.id;store.set('bb_skin',skin);drawPrev();toast('Надето!');}
      else if(coins>=s.price){coins-=s.price;owned.push(s.id);store.set('bb_coins',coins);store.set('bb_owned',owned);skin=s.id;store.set('bb_skin',skin);drawPrev();updCoins();toast('Куплено!');}
      else toast('Не хватает монет!');
    };
    d.appendChild(b);sDiv.appendChild(d);
  });
  // Аналогично для шапок, очков, лиц (сокращено для краткости, логика та же)
  const hDiv=$('#shopHats');hDiv.innerHTML='';
  HATS.forEach(h=>{
    const d=document.createElement('div');d.className='card';
    d.innerHTML=`<div class="thumb" style="background:#444"></div><b>${h.n}</b><small>${h.price} 🪙</small>`;
    const b=document.createElement('button');
    b.textContent=ownedH.includes(h.id)?'Надеть':'Купить';
    b.onclick=()=>{
      if(ownedH.includes(h.id)){hat=h.id;store.set('bb_hat',hat);drawPrev();toast('Надето!');}
      else if(coins>=h.price){coins-=h.price;ownedH.push(h.id);store.set('bb_coins',coins);store.set('bb_ownedH',ownedH);hat=h.id;store.set('bb_hat',hat);drawPrev();updCoins();toast('Куплено!');}
      else toast('Не хватает монет!');
    };
    d.appendChild(b);hDiv.appendChild(d);
  });
  // Очки и лица аналогично...
  const gDiv=$('#shopGlasses');gDiv.innerHTML='';
  GLASSES.forEach(g=>{
     const d=document.createElement('div');d.className='card';
     d.innerHTML=`<div class="thumb" style="background:#444"></div><b>${g.n}</b><small>${g.price} 🪙</small>`;
     const b=document.createElement('button');
     b.textContent=ownedG.includes(g.id)?'Надеть':'Купить';
     b.onclick=()=>{
       if(ownedG.includes(g.id)){gls=g.id;store.set('bb_gls',gls);drawPrev();toast('Надето!');}
       else if(coins>=g.price){coins-=g.price;ownedG.push(g.id);store.set('bb_coins',coins);store.set('bb_ownedG',ownedG);gls=g.id;store.set('bb_gls',gls);drawPrev();updCoins();toast('Куплено!');}
       else toast('Не хватает монет!');
     };
     d.appendChild(b);gDiv.appendChild(d);
  });
  const fDiv=$('#shopFaces');fDiv.innerHTML='';
  FACES.forEach(f=>{
     const d=document.createElement('div');d.className='card';
     d.innerHTML=`<div class="thumb" style="background:#444"></div><b>${f.n}</b><small>${f.price} 🪙</small>`;
     const b=document.createElement('button');
     b.textContent=ownedF.includes(f.id)?'Надеть':'Купить';
     b.onclick=()=>{
       if(ownedF.includes(f.id)){fc=f.id;store.set('bb_fc',fc);drawPrev();toast('Надето!');}
       else if(coins>=f.price){coins-=f.price;ownedF.push(f.id);store.set('bb_coins',coins);store.set('bb_ownedF',ownedF);fc=f.id;store.set('bb_fc',fc);drawPrev();updCoins();toast('Куплено!');}
       else toast('Не хватает монет!');
     };
     d.appendChild(b);fDiv.appendChild(d);
  });
}
$('#btnShop').onclick=()=>{show('shop');buildShop();updCoins();};
$('#shBack').onclick=()=>show('menu');

// Студия: палитра
const edCv=$('#edCv'),edCtx=edCv.getContext('2d');
let edSel=1,edDrag=false,edRm=false;
function drawEd(){
  edCv.width=edCv.clientWidth;edCv.height=edCv.clientHeight;
  const sc=Math.min(edCv.width/(W*T),edCv.height/(H*T));
  edCtx.clearRect(0,0,edCv.width,edCv.height);
  edCtx.save();edCtx.scale(sc,sc);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const t=world[y*W+x];if(!t)continue;
    const m=modelOf(t);
    if(m.grad){const g=edCtx.createLinearGradient(x*T,y*T,x*T,y*T+T);g.addColorStop(0,m.grad[0]);g.addColorStop(1,m.grad[1]);edCtx.fillStyle=g;}
    else edCtx.fillStyle=m.bg;
    edCtx.fillRect(x*T,y*T,T,T);
  }
  edCtx.restore();
}
function buildPalette(){
  const w=$('#palette');w.innerHTML='';
  Object.keys(BLOCKS).forEach(k=>{
    const b=document.createElement('button');b.style.background=BLOCKS[k].css.match(/background:[^;]+/)?.[0]?.split(':')[1]||'#888';
    if(+k===edSel)b.classList.add('sel');
    b.onclick=()=>{edSel=+k;buildPalette();};
    w.appendChild(b);
  });
}
edCv.addEventListener('mousedown',e=>{edDrag=true;edRm=e.button===2;paintEd(e);});
edCv.addEventListener('mousemove',e=>{if(edDrag)paintEd(e);});
window.addEventListener('mouseup',()=>edDrag=false);
function paintEd(e){
  const rect=edCv.getBoundingClientRect();
  const sc=Math.min(edCv.width/(W*T),edCv.height/(H*T));
  const x=Math.floor((e.clientX-rect.left)/sc/T),y=Math.floor((e.clientY-rect.top)/sc/T);
  if(inB(x,y)){world[y*W+x]=edRm?0:edSel;drawEd();}
}
$('#edNew').onclick=()=>{genWorld();drawEd();};
$('#edLoad').onclick=()=>{world=decMap(encMap(world));drawEd();};

// Вкладки студии
$('.tabs').onclick=e=>{
  if(e.target.dataset.tab){
    $('.tabs .sel').classList.remove('sel');e.target.classList.add('sel');
    $('.panel-content').classList.add('hidden');$('#tab-'+e.target.dataset.tab).classList.remove('hidden');
    if(e.target.dataset.tab==='css')buildCssTab();
  }
};
function buildCssTab(){
  const sel=$('#cssBlock');sel.innerHTML='';
  Object.keys(BLOCKS).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=BLOCKS[k].n;sel.appendChild(o);});
  sel.onchange=()=>{$('#cssTxt').value=G.models[sel.value]||BLOCKS[sel.value].css;updateCssPrev();};
  sel.dispatchEvent(new Event('change'));
}
function updateCssPrev(){
  const c=$('#cssPrev');c.style.cssText=$('#cssTxt').value;
}
$('#cssTxt').oninput=updateCssPrev;
$('#cssApply').onclick=()=>{G.models[$('#cssBlock').value]=$('#cssTxt').value;toast('Применено в тесте!');};

// Скрипт
function parseScript(code,lang){
  if(lang==='js'){try{return new Function('api',code+'\nreturn{onTick:typeof onTick==="function"?onTick:null,onClick:typeof onClick==="function"?onClick:null,onUse:typeof onUse==="function"?onUse:null};')();}catch(e){toast('Ошибка JS: '+e.message);return null;}}
  // Парсер ЭниЯзыка (упрощенный)
  const res={onTick:null,onClick:null,onUse:null};
  const lines=code.split('\n');
  let mode=null,body=[];
  lines.forEach(l=>{
    l=l.trim();if(!l)return;
    if(l.endsWith(':')){mode=l.slice(0,-1);body=[];return;}
    if(mode){
      body.push(l);
      if(mode==='клик')res.onClick=(api,x,y)=>runAny(body,api,x,y);
      if(mode==='тик')res.onTick=(api)=>runAny(body,api);
      if(mode==='использовать')res.onUse=(api)=>runAny(body,api);
    }
  });
  return res;
}
function runAny(lines,api,x,y){
  const apiObj=api();
  lines.forEach(l=>{
    const m=l.match(/взрыв\s+(\d+)/);if(m)return apiObj.explode(x||0,y||0,+m[1]);
    m=l.match(/частицы\s+(\d+)\s+(\w+)/);if(m)return apiObj.particles(x||0,y||0,+m[1],m[2]);
    m=l.match(/поставь\s+(-?\d+)\s+(-?\d+)\s+(\d+)/);if(m)return apiObj.place(Math.floor((x||0)/T)+ +m[1],Math.floor((y||0)/T)+ +m[2],+m[3]);
    m=l.match(/ломай\s+(-?\d+)\s+(-?\d+)/);if(m)return apiObj.break(Math.floor((x||0)/T)+ +m[1],Math.floor((y||0)/T)+ +m[2]);
    m=l.match(/ракета\s+(-?\d+)\s+(-?\d+)/);if(m)return apiObj.rocket(x||0,y||0,+m[1],+m[2]);
    m=l.match(/гравитация\s+(\d+)/);if(m)return apiObj.setGravity(+m[1]);
    m=l.match(/прыжок/);if(m)return apiObj.jump();
    m=l.match(/чат\s+"([^"]+)"/);if(m)return apiObj.chat(m[1]);
    m=l.match(/если близко\s+(\d+):\s*(.+)/);if(m){
       const dist=+m[1],cmd=m[2];
       apiObj.players().forEach(p=>{if(p.name!=='вы'&&Math.hypot(p.x-(x||0),p.y-(y||0))<dist*T)runAny([cmd],api,x,y);});
    }
  });
}
$('#scrCheck').onclick=()=>{parseScript($('#scrTxt').value,$('#langSel').value);toast('Синтаксис ОК');};

// Сохранение проекта
function saveProject(pub){
  const map=encMap(world),script=$('#scrTxt').value,lang=$('#langSel').value,css={},gui=$('#guiTxt').value;
  Object.keys(G.models).forEach(k=>css[k]=G.models[k]);
  const proj={name:$('#pName').value,map,script,scriptLang:lang,models:css,gui,pub};
  const all=store.get('bb_projects',[]);all.push(proj);store.set('bb_projects',all);
  toast(pub?'📢 Опубликовано!':'💾 Сохранено!');}
$('#pSave').onclick=()=>saveProject(false);
$('#pPub').onclick=()=>requireAuth(()=>saveProject(true));
$('#pTest').onclick=()=>{
  const map=encMap(world),script=$('#scrTxt').value,lang=$('#langSel').value,css={},gui=$('#guiTxt').value;
  Object.keys(G.models).forEach(k=>css[k]=G.models[k]);
  startGame({mode:'sandbox',project:{map,script,scriptLang:lang,models:css,gui}});};

/* Выставка */
function buildExpo(){
  const all=store.get('bb_projects',[]).filter(p=>p.pub);
  const w=$('#exCards');w.innerHTML='';
  if(!all.length){w.innerHTML='<div style="opacity:.6;padding:20px">Пока нет опубликованных игр</div>';return;}
  all.forEach(p=>{
    const d=document.createElement('div');d.className='card';
    d.innerHTML='<h3>'+p.name+'</h3><div style="font-size:12px;opacity:.7">Автор: '+ (user?.name||'Аноним') +'</div>';
    const b=document.createElement('button');b.textContent='Играть';b.onclick=()=>startGame({mode:'sandbox',project:p});
    d.appendChild(b);w.appendChild(d);});}
$('#btnExpo').onclick=()=>{requireAuth(()=>{show('expo');buildExpo();});};
$('#exBack').onclick=()=>show('menu');

// Инициализация
$('#btnPlay').onclick=()=>startGame('battle');
$('#btnSand').onclick=()=>startGame('sandbox');
$('#btnBack').onclick=()=>{G.running=false;show('menu');};
$('#stBack').onclick=()=>show('menu');

// Запуск
genWorld();drawEd();buildPalette();
initMusic();
</script>
</body>
</html>
