(function(){
  if (window.__fpIntro) return; window.__fpIntro = 1;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var COLS = 6, TEXT = "FRANKPETER", d = document;
  var fl = d.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap"; (d.head || d.documentElement).appendChild(fl);
  var css = d.createElement("style");
  css.textContent =
    "#fp-intro{position:fixed;inset:0;z-index:2147483000;pointer-events:none}" +
    "#fp-intro .c{position:absolute;top:0;height:100%;background:#0f0f0f;transition:transform .55s cubic-bezier(.76,0,.24,1)}" +
    "#fp-intro .w{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:18px}" +
    "#fp-intro .m{overflow:hidden;display:flex;align-items:center;gap:clamp(14px,1.6vw,24px);padding:4px 2px}" +
    "#fp-intro img{width:clamp(40px,4.4vw,64px);height:clamp(40px,4.4vw,64px);border-radius:50%;object-fit:cover;box-shadow:0 0 0 1px rgba(255,255,255,.14);opacity:0;transform:translateY(110%) scale(.8);transition:transform .6s cubic-bezier(.2,.8,.2,1),opacity .4s ease}" +
    "#fp-intro .l{display:inline-block;font:italic 400 clamp(30px,min(3.4vw,5.6vh),56px)/1.25 Newsreader,Georgia,serif;letter-spacing:-.02em;color:#fff;opacity:0;transform:translateY(110%);transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .35s ease}" +
    "#fp-intro.in img,#fp-intro.in .l{opacity:1;transform:none}" +
    "#fp-intro.out img,#fp-intro.out .l{opacity:1;transform:translateY(-120%);transition:transform .45s cubic-bezier(.7,0,.3,1)}" +
    "#fp-intro.lift .c{transform:translateY(-101%)}" +
    "html.fp-intro-run main{filter:blur(14px);opacity:.4;transform:scale(1.02)}" +
    "html.fp-intro-done main{transition:filter .9s ease,opacity .9s ease,transform 1.1s cubic-bezier(.2,.8,.2,1)}";
  d.head ? d.head.appendChild(css) : d.documentElement.appendChild(css);
  var root = d.createElement("div"); root.id = "fp-intro"; root.setAttribute("aria-hidden", "true");
  for (var i = 0; i < COLS; i++) {
    var c = d.createElement("div"); c.className = "c";
    c.style.left = (i * 100 / COLS) + "%"; c.style.width = "calc(" + (100 / COLS) + "% + 1px)";
    c.style.transitionDelay = (i * 0.07) + "s";
    root.appendChild(c);
  }
  var w = d.createElement("div"); w.className = "w";
  var m = d.createElement("div"); m.className = "m";
  var img = d.createElement("img"); img.src = "logo-avatar.png"; img.alt = "";
  m.appendChild(img);
  var t = d.createElement("span"); t.style.display = "flex";
  TEXT.split("").forEach(function(ch, k){
    var s = d.createElement("span"); s.className = "l"; s.textContent = ch;
    s.style.transitionDelay = (0.12 + k * 0.055) + "s"; t.appendChild(s);
  });
  m.appendChild(t); w.appendChild(m); root.appendChild(w);
  d.documentElement.classList.add("fp-intro-run");
  d.documentElement.appendChild(root);
  var n = TEXT.length;
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ root.classList.add("in"); }); });
  var tIn = 120 + n * 55 + 550;
  setTimeout(function(){
    root.querySelectorAll(".l").forEach(function(s, k){ s.style.transitionDelay = (k * 0.025) + "s"; });
    img.style.transitionDelay = "0s";
    root.classList.add("out");
  }, tIn + 450);
  setTimeout(function(){
    root.classList.add("lift");
    d.documentElement.classList.add("fp-intro-done");
    d.documentElement.classList.remove("fp-intro-run");
  }, tIn + 450 + 420);
  setTimeout(function(){
    root.remove(); css.remove();
    d.documentElement.classList.remove("fp-intro-done");
  }, tIn + 450 + 420 + 550 + COLS * 70 + 1200);
})();
