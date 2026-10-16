(function(){
  if (window.__fpCards) return; window.__fpCards = 1;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var d = document, H = d.documentElement, t0 = performance.now();
  var gs = null;
  if (!window.gsap){ gs = d.createElement("script"); gs.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"; gs.async = true; (d.head || H).appendChild(gs); }
  var css = d.createElement("style");
  css.textContent = "html.fp-cards-fly a[data-i]{visibility:hidden!important}";
  (d.head || H).appendChild(css);
  H.classList.add("fp-cards-fly");
  var done = false;
  function finish(){ if (done) return; done = true; H.classList.remove("fp-cards-fly"); setTimeout(function(){ css.remove(); }, 50); }
  setTimeout(finish, 9000);

  function waitCards(cb, n){
    var els = [].slice.call(d.querySelectorAll("a[data-i]"));
    if (els.length >= 4 && els.every(function(e){ return e.offsetWidth > 0; })) return cb(els);
    if ((n || 0) > 120) return finish();
    setTimeout(function(){ waitCards(cb, (n || 0) + 1); }, 50);
  }

  function run(gsap, els){
    var vw = innerWidth, vh = innerHeight;
    var layer = d.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;z-index:2147482000;pointer-events:none";
    var byLeft = els.slice().sort(function(a, b){ return a.getBoundingClientRect().left - b.getBoundingClientRect().left; });
    var rs = byLeft.map(function(el){ return el.getBoundingClientRect(); });
    var cx = (rs[0].left + rs[rs.length - 1].right) / 2, cy = rs.reduce(function(t, r){ return t + r.top + r.height / 2; }, 0) / rs.length;
    var N = byLeft.length, landed = 0, tl = gsap.timeline({ onComplete: function(){ finish(); layer.remove(); } });
    var cards = byLeft.map(function(el, i){
      var r = rs[i], w = el.offsetWidth, h = el.offsetHeight;
      var m = new DOMMatrix(getComputedStyle(el).transform);
      var rz = Math.atan2(m.b, m.a) * 180 / Math.PI;
      var c = el.cloneNode(true);
      c.removeAttribute("href"); c.removeAttribute("data-i");
      c.querySelectorAll("video").forEach(function(v){ v.remove(); });
      var fx = r.left + r.width / 2, fy = r.top + r.height / 2;
      c.style.cssText = "position:absolute;margin:0;left:" + (fx - w / 2) + "px;top:" + (fy - h / 2) + "px;width:" + w + "px;height:" + h + "px;padding:2px;box-sizing:border-box;border-radius:10px;background:#fff;box-shadow:0 10px 24px rgba(0,0,0,.5);z-index:" + (N - i) + ";will-change:transform";
      layer.appendChild(c);
      return { el: el, c: c, w: w, dx: cx - fx, dy: cy - fy, rz: rz, z: +getComputedStyle(el).zIndex || 1 };
    });
    cards.forEach(function(k, i){ gsap.set(k.c, { x: k.dx - i * 1.5, y: k.dy + vh * 0.55 - i * 1.5, rotation: -2 + i * 1.2, transformOrigin: "50% 50%" }); });
    H.appendChild(layer);
    tl.to(cards.map(function(k){ return k.c; }), { y: function(i){ return cards[i].dy - i * 1.5; }, duration: .55, ease: "power3.out", stagger: .03 });
    function riffle(at, spread){
      cards.forEach(function(k, i){
        var side = i % 2 ? 1 : -1, newZ = (i + Math.round(at * 10)) % N + 1;
        tl.to(k.c, { x: k.dx + side * k.w * spread, rotation: side * 9, duration: .2, ease: "power2.out" }, at + i * .025)
          .set(k.c, { zIndex: newZ }, at + .2 + i * .025)
          .to(k.c, { x: k.dx - i * 1.5, rotation: -2 + newZ * 1.2, duration: .22, ease: "power2.inOut" }, at + .2 + i * .025);
      });
    }
    tl.timeScale(1.35);
    riffle(.55, .62); riffle(1.05, .5);
    var dealAt = 1.6;
    cards.forEach(function(k, i){
      var at = dealAt + i * .12;
      tl.set(k.c, { zIndex: 50 + i, boxShadow: "0 18px 44px rgba(0,0,0,.6)" }, at)
        .to(k.c, { x: 0, duration: .7, ease: "power3.out" }, at)
        .to(k.c, { keyframes: [{ y: k.dy * 0.5 - 50, duration: .3, ease: "power2.out" }, { y: 0, duration: .4, ease: "power2.in" }] }, at)
        .to(k.c, { rotation: k.rz, duration: .7, ease: "back.out(1.6)" }, at)
        .set(k.c, { zIndex: k.z }, at + .7)
        .call(function(){ k.el.style.visibility = "visible"; k.c.style.visibility = "hidden"; if (++landed === N) finish(); }, null, at + .72);
    });
  }

  function go(){
    var startAt = window.__fpIntro ? Math.max(0, 1900 - (performance.now() - t0)) : 150;
    waitCards(function(els){ setTimeout(function(){ run(window.gsap, els); }, startAt); });
  }
  if (window.gsap) go();
  else { gs.onload = go; gs.onerror = finish; }
})();
