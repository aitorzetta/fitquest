const C="fitquest-v6";
const A=["./","index.html","manifest.webmanifest","icon.svg"];

self.addEventListener("install",e=>e.waitUntil(
  caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())
));

self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))
    .then(()=>self.clients.claim())
));

function healthImportScript(){
  return `<script>
  (function(){
    try{
      var q=new URLSearchParams(location.search);
      if(q.get("fq")!=="health")return;
      var K="fitquest_state_v1";
      var base={active:"aitor",view:"home",xp:0,profiles:{
        aitor:{name:"Aitor",emoji:"🧔",start:152.9,weight:152.9,startWaist:140,waist:140,fat:47.7,visceral:26,muscle:76,boss:145,protein:150,steps:5000},
        laura:{name:"Laura",emoji:"👩",start:107.8,weight:107.8,startWaist:112,waist:112,fat:52,visceral:21,muscle:48.5,boss:102,protein:100,steps:5000}},
        entries:{aitor:[],laura:[]},
        quests:{aitor:{nutrition:0,movement:0,strength:0,sleep:0,checkin:0},laura:{nutrition:0,movement:0,strength:0,sleep:0,checkin:0}},
        raid:{done:0,target:4}};
      var s;
      try{s=JSON.parse(localStorage.getItem(K)||"null")||base}catch(e){s=base}
      if(!s.entries)s.entries={aitor:[],laura:[]};
      var who=q.get("profile")==="laura"?"laura":"aitor";
      s.active=who;
      var d=new Date(),date=q.get("date")||(d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"));
      var steps=q.get("steps"),sleep=q.get("sleep");
      steps=steps==null||steps===""?null:Math.max(0,Math.round(Number(String(steps).replace(/[^0-9]/g,""))));
      sleep=sleep==null||sleep===""?null:Math.max(0,Number(String(sleep).replace(",",".")));
      var arr=s.entries[who]||(s.entries[who]=[]);
      var i=arr.findIndex(function(v){return v.date===date});
      var o=i>=0?arr[i]:{date:date,weight:null,waist:null,protein:null,steps:null,sleep:null,hunger:null,energy:null,training:"",notes:""};
      if(steps!==null&&Number.isFinite(steps))o.steps=steps;
      if(sleep!==null&&Number.isFinite(sleep))o.sleep=Math.round(sleep*100)/100;
      if(i>=0)arr[i]=o;else arr.push(o);
      localStorage.setItem(K,JSON.stringify(s));
      sessionStorage.setItem("fitquest_health_synced","1");
      location.replace(location.pathname);
    }catch(e){
      location.replace(location.pathname);
    }
  })();
  <\/script>`;
}

async function healthResponse(request){
  var cached=await caches.match("index.html");
  var response=cached||await fetch("index.html",{cache:"no-store"});
  var html=await response.text();
  html=html.replace("</body>",healthImportScript()+"</body>");
  return new Response(html,{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}});
}

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  var u=new URL(e.request.url);
  if(e.request.mode==="navigate"&&u.searchParams.get("fq")==="health"){
    e.respondWith(healthResponse(e.request));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});