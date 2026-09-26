(function(){
if (window.fpSound) return;
var KEY = 'fp-sound', on = localStorage.getItem(KEY) === 'on';
var ctx = null, master = null, last = null, lastT = 0;
function init(){
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = .55;
  var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200; lp.Q.value = .4;
  master.connect(lp); lp.connect(ctx.destination);
}
['pointerdown','keydown','touchstart'].forEach(function(ev){ addEventListener(ev, init, { passive: true, capture: true }); });
function r(a, b){ return a + Math.random() * (b - a); }
// one droplet: sine that glides up fast, like air escaping water
function drop(t, f0, f1, len, vol){
  var o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + len * .7);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + .008);
  g.gain.exponentialRampToValueAtTime(.0001, t + len);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + len + .02);
}
function wobble(t, f, len, vol){
  var o = ctx.createOscillator(), l = ctx.createOscillator(), lg = ctx.createGain(), g = ctx.createGain();
  o.type = 'sine'; o.frequency.value = f;
  l.type = 'sine'; l.frequency.value = r(14, 20); lg.gain.value = f * .06;
  l.connect(lg); lg.connect(o.frequency);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + .03);
  g.gain.exponentialRampToValueAtTime(.0001, t + len);
  o.connect(g); g.connect(master); o.start(t); l.start(t); o.stop(t + len + .02); l.stop(t + len + .02);
}
var lastBub = null;
var BUB = [
  // rising cluster
  function(t, b){ wobble(t, b * .5, .26, .03); drop(t, b, b * 2.3, .12, .09); drop(t + r(.045, .065), b * 1.35, b * 3, .09, .055); drop(t + r(.1, .13), b * 1.9, b * 3.8, .07, .03); },
  // single deep gulp
  function(t, b){ drop(t, b * .55, b * 1.6, .2, .1); wobble(t + .02, b * .4, .3, .025); },
  // fizz: many tiny quick bubbles
  function(t, b){ var n = 5 + Math.floor(Math.random() * 4); for (var i = 0; i < n; i++){ var f = b * r(1.8, 3.2); drop(t + i * r(.018, .035), f, f * r(1.6, 2.2), r(.03, .05), r(.018, .035)); } },
  // falling blip: a bubble that sinks
  function(t, b){ drop(t, b * 2.4, b * 1.1, .14, .07); drop(t + .07, b * 1.6, b * .9, .1, .03); },
  // wobbly gloop
  function(t, b){ wobble(t, b * .75, .34, .06); drop(t + .12, b * 1.5, b * 2.8, .08, .04); },
  // two-bubble hiccup
  function(t, b){ drop(t, b, b * 2, .08, .08); drop(t + r(.09, .14), b * 1.25, b * 2.6, .08, .06); },
  // bright ping bubble
  function(t, b){ drop(t, b * 1.6, b * 3.4, .1, .06); drop(t + .004, b * 3.2, b * 5, .05, .015); },
  // lazy float: slow rise
  function(t, b){ drop(t, b * .8, b * 2.2, .28, .06); drop(t + .16, b * 1.4, b * 2.8, .12, .03); }
];
var S = {
  // card hover: a small cluster of rising bubbles over a soft wobble
  bubble: function(t){
    var V = BUB[Math.floor(Math.random() * BUB.length)];
    if (V === lastBub) V = BUB[(BUB.indexOf(V) + 1 + Math.floor(Math.random() * (BUB.length - 1))) % BUB.length];
    lastBub = V; V(t, r(260, 480));
  },
  // links: a single tiny droplet
  tick: function(t){ var b = r(900, 1100); drop(t, b, b * 1.6, .045, .014); },
  // click: bubble surfacing and popping
  pop: function(t){
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(r(520, 600), t);
    o.frequency.exponentialRampToValueAtTime(140, t + .07);
    g.gain.setValueAtTime(.07, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + .09);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + .1);
    drop(t + .012, 1400, 2600, .03, .012);
  },
  // email copied: three bubbles rising in pitch
  copy: function(t){ [0, .07, .14].forEach(function(d, i){ var b = 420 * Math.pow(1.26, i); drop(t + d, b, b * 2, .1, .04); }); },
  toggle: function(t){ drop(t, 380, 760, .09, .04); }
};
function play(name){
  if (ctx && ctx.state === 'suspended' && navigator.userActivation && navigator.userActivation.hasBeenActive) ctx.resume();
  if (!on || !ctx || ctx.state !== 'running' || !S[name]) return;
  S[name](ctx.currentTime + .005);
}
var CARD = 'a[data-i], a[aria-label="Next case study"]';
var LINK = 'a, button, [role=button]';
document.addEventListener('pointerover', function(e){
  if (e.pointerType === 'touch') return;
  var t = e.target, el = t.closest && (t.closest(CARD) || t.closest(LINK));
  if (!el || el === last) return;
  last = el;
  var now = performance.now(); if (now - lastT < 60) return; lastT = now;
  play(el.matches(CARD) ? 'bubble' : 'tick');
}, { passive: true });
document.addEventListener('pointerout', function(e){
  if (last && !(e.relatedTarget && last.contains(e.relatedTarget))) last = null;
}, { passive: true });
document.addEventListener('pointerdown', function(e){
  if (e.target.closest && e.target.closest(LINK + ',' + CARD)) setTimeout(function(){ play('pop'); }, 0);
}, { passive: true });
// full-width sound alert at the top
var DISMISS = 'fp-sound-prompt';
function setOn(v){ init(); on = v; localStorage.setItem(KEY, v ? 'on' : 'off'); if (v) setTimeout(function(){ play('copy'); }, 60); dispatchEvent(new CustomEvent('fp-sound-change', { detail: { on: v } })); }
function mountBar(){
  if (document.querySelector('[data-fp-sound]')) return;
  if (on || sessionStorage.getItem(DISMISS)) return;
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var home = !!document.querySelector('[data-fp-controls]');
  var w = document.createElement('div');
  w.setAttribute('data-fp-sound', '1'); w.setAttribute('role', 'status');
  w.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;min-height:36px;padding:8px 56px;box-sizing:border-box;background:#ffffff;color:#0f0f0f;font-family:"IBM Plex Mono",monospace;font-size:11px;font-weight:500;letter-spacing:.08em;text-align:center;transform:translateY(-100%);transition:transform .5s cubic-bezier(.2,.8,.2,1)';
  w.innerHTML = '<span>This site has sound effects. <button type="button" data-on style="all:unset;cursor:pointer;text-decoration:underline;text-underline-offset:3px">Turn them on</button>, or use the speaker ' + (home ? 'under Contact' : 'on the homepage') + ' whenever.</span>' +
    '<button type="button" data-x aria-label="Dismiss" style="all:unset;cursor:pointer;position:absolute;right:clamp(14px,2vw,28px);top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:24px;height:24px;font-size:16px;line-height:1">×</button>';
  var shown = false;
  function push(px){ document.documentElement.style.setProperty('--fp-bar', px + 'px'); document.body.style.transition = 'padding-top .5s cubic-bezier(.2,.8,.2,1)'; document.body.style.paddingTop = px ? px + 'px' : ''; }
  function close(){ if (!shown) return; shown = false; sessionStorage.setItem(DISMISS, '1'); removeEventListener('scroll', onScroll); w.style.transform = 'translateY(-100%)'; push(0); setTimeout(function(){ w.remove(); }, 550); }
  function onScroll(){ if (scrollY > 240) close(); }
  w.querySelector('[data-on]').addEventListener('click', function(){ setOn(true); close(); });
  w.querySelector('[data-x]').addEventListener('click', close);
  addEventListener('fp-sound-change', function(e){ if (e.detail.on) close(); });
  document.body.appendChild(w);
  setTimeout(function(){ shown = true; w.style.transform = 'translateY(0)'; push(w.offsetHeight); addEventListener('scroll', onScroll, { passive: true }); }, 1200);
}
if (document.body) mountBar(); else document.addEventListener('DOMContentLoaded', mountBar);
window.fpSound = { play: play, isOn: function(){ return on; }, toggle: function(){ setOn(!on); } };
})();
