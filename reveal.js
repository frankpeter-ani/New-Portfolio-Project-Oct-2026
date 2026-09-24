(function(){if(window.__fpReveal)return;window.__fpReveal=1;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var root=document.documentElement,w=document.createElement('div');w.setAttribute('aria-hidden','true');
w.style.cssText='position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:flex';
function half(){var d=document.createElement('div');d.style.cssText='flex:1;background:#0f0f0f;will-change:transform';w.appendChild(d);return d}
var L=half(),R=half();root.appendChild(w);
var ease='cubic-bezier(.76,0,.24,1)',o={duration:1000,delay:180,easing:ease,fill:'forwards'};
function go(){L.animate([{transform:'translateX(0)'},{transform:'translateX(-100%)'}],o);
var a=R.animate([{transform:'translateX(0)'},{transform:'translateX(100%)'}],o);a.onfinish=function(){w.remove()}}
if(document.fonts&&document.fonts.ready){var done=0,f=function(){if(!done){done=1;go()}};document.fonts.ready.then(f);setTimeout(f,900)}else go();
})();