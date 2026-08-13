// server.js — улучшенный сервер «Эни Блок» (без npm install, без game.js)
// Запуск:  node server.js
// Игра откроется прямо с сервера: http://localhost:8080
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),os=require('os');
const PORT=process.env.PORT||8080;
const players=new Map(); // id -> состояние игрока
const wsCon=new Map();   // сокет -> {id,room}
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain; charset=utf-8'};

function cleanup(){const n=Date.now();for(const[k,v]of players)if(n-(v.ts||0)>6000)players.delete(k);}
function list(room){cleanup();return[...players.values()].filter(p=>(p.room||'main')===room);}
function acceptKey(k){return crypto.createHash('sha1').update(k+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');}
function sendWS(s,o){const d=Buffer.from(JSON.stringify(o));let h;
  if(d.length<126)h=Buffer.from([0x81,d.length]);
  else if(d.length<65536)h=Buffer.from([0x81,126,d.length>>8,d.length&255]);
  else{h=Buffer.alloc(10);h[0]=0x81;h[1]=127;h.writeBigUInt64BE(BigInt(d.length),2);}
  try{s.write(Buffer.concat([h,d]));}catch(e){}}
function cast(room,p,except){for(const[s,c]of wsCon)if(s!==except&&c.room===room)sendWS(s,p);}

/* ---------- WebSocket: реальное время ---------- */
function handleWS(sock){
  let buf=Buffer.alloc(0);
  sock.on('data',d=>{buf=Buffer.concat([buf,d]);
    for(;;){
      if(buf.length<2)return;
      const op=buf[0]&15,masked=(buf[1]&128)!==0;
      let len=buf[1]&127,off=2;
      if(len===126){if(buf.length<4)return;len=buf.readUInt16BE(2);off=4;}
      else if(len===127){if(buf.length<10)return;len=Number(buf.readBigUInt64BE(2));off=10;}
      let mask=null;
      if(masked){if(buf.length<off+4)return;mask=buf.slice(off,off+4);off+=4;}
      if(buf.length<off+len)return;
      let pl=buf.slice(off,off+len);
      if(masked){const u=Buffer.alloc(len);for(let i=0;i<len;i++)u[i]=pl[i]^mask[i%4];pl=u;}
      buf=buf.slice(off+len);
      if(op===8){try{sock.end();}catch(e){}return;}
      if(op===9){try{sock.write(Buffer.from([0x8A,0]));}catch(e){}continue;}
      if(op===1||op===2){let m=null;try{m=JSON.parse(pl.toString());}catch(e){}if(m)route(sock,m);}
    }});
  sock.on('close',()=>wsCon.delete(sock));
  sock.on('error',()=>{});
}
function route(sock,p){
  const c=wsCon.get(sock)||{id:null,room:'main'};
  if(p.id)c.id=p.id;
  if(p.room)c.room=p.room;
  wsCon.set(sock,c);
  if(p.id){p.ts=Date.now();players.set(p.id,p);}
  if(p.t==='bye')players.delete(p.id);
  cast(c.room,p,sock); // всем в комнате, кроме отправителя
}

/* ---------- HTTP: запасной канал + раздача игры ---------- */
const server=http.createServer((q,s)=>{
  const u=new URL(q.url,'http://localhost');
  s.setHeader('Access-Control-Allow-Origin','*');
  s.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  s.setHeader('Access-Control-Allow-Headers','*');
  s.setHeader('Cache-Control','no-store');
  if(q.method==='OPTIONS'){s.end();return;}
  if(q.method==='POST'){let b='';q.on('data',d=>b+=d);q.on('end',()=>{
    let p=null;try{p=JSON.parse(b);}catch(e){}
    if(p&&p.id){p.ts=Date.now();p.room=p.room||'main';players.set(p.id,p);cast(p.room,p,null);}
    s.setHeader('Content-Type','application/json');
    s.end(JSON.stringify(list((p&&p.room)||u.searchParams.get('room')||'main')));});return;}
  if(u.pathname==='/status'){s.setHeader('Content-Type','application/json');
    s.end(JSON.stringify({ok:true,server:'Эни Блок',players:players.size,ws:wsCon.size,
      rooms:[...new Set([...players.values()].map(p=>p.room||'main'))],uptime:Math.round(process.uptime())}));return;}
  if(u.pathname==='/list'){s.setHeader('Content-Type','application/json');
    s.end(JSON.stringify(list(u.searchParams.get('room')||'main')));return;}
  // раздаём твой index.html и img/ с диска
  let fp=decodeURIComponent(u.pathname.split('?')[0]);if(fp==='/')fp='/index.html';
  if(fp.includes('..')){s.statusCode=403;s.end();return;}
  fs.readFile(path.join(__dirname,fp),(e,data)=>{
    if(e){s.setHeader('Content-Type','text/html; charset=utf-8');
      s.end('<h1>🟢 Сервер «Эни Блок» работает!</h1><p>Положи рядом свой <b>index.html</b> и папку <b>img</b> — игра откроется здесь.</p><p>Статистика: <a href="/status">/status</a> · Игроки: <a href="/list">/list</a></p>');return;}
    s.setHeader('Content-Type',MIME[path.extname(fp).toLowerCase()]||'application/octet-stream');
    s.end(data);});
});
server.on('upgrade',(q,sock)=>{
  const k=q.headers['sec-websocket-key'];
  if(!k){sock.destroy();return;}
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+acceptKey(k)+'\r\n\r\n');
  handleWS(sock);
});
setInterval(cleanup,3000);
server.listen(PORT,'0.0.0.0',()=>{
  console.log('⚔ Сервер «Эни Блок» запущен: http://localhost:'+PORT);
  Object.values(os.networkInterfaces()).flat().filter(i=>i&&i.family==='IPv4')
    .forEach(i=>console.log('   в сети: http://'+i.address+':'+PORT+'  ← впиши этот адрес в ⚙ Настройки игры'));
});