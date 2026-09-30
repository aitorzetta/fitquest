const C="fitquest-v14";
const A=["manifest.webmanifest","icon.svg"];

self.addEventListener("install",e=>e.waitUntil(
  caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())
));

self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))
    .then(()=>self.clients.claim())
));

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);

  // Always try the network first for the app shell so published updates
  // appear immediately. Fall back to the cached copy when offline.
  if(e.request.mode==="navigate"){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .then(r=>{
          const copy=r.clone();
          caches.open(C).then(c=>c.put("./",copy)).catch(()=>{});
          return r;
        })
        .catch(()=>caches.match("./").then(r=>r||caches.match("index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{
      if(net&&net.ok&&u.origin===location.origin){
        const copy=net.clone();
        caches.open(C).then(c=>c.put(e.request,copy)).catch(()=>{});
      }
      return net;
    }))
  );
});