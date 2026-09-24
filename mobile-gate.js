(function(){
if (window.__fpGate) return; window.__fpGate = 1;
var mq = matchMedia('(max-width: 820px)');
var EMAIL = 'hello@frankpeter.xyz';
var el, st;
function build(){
  st = document.createElement('style');
  st.textContent = 'html.fp-gated,html.fp-gated body{overflow:hidden!important;height:100%!important}html.fp-gated .fp-gate a{color:#ffffff}';
  document.head.appendChild(st);
  el = document.createElement('div');
  el.className = 'fp-gate';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'View on desktop');
  el.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#0f0f0f;color:#ffffff;display:flex;flex-direction:column;padding:32px 24px;box-sizing:border-box;text-align:center;font-family:Newsreader,Georgia,serif;-webkit-font-smoothing:antialiased;overflow:auto;-webkit-overflow-scrolling:touch';
  el.innerHTML = '<div style="margin:auto 0;display:flex;flex-direction:column;align-items:center;width:100%">' +
    '<div style="display:flex;align-items:center;gap:10px;font-family:\'IBM Plex Mono\',monospace;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">' +
      '<img src="logo-avatar.png" alt="" width="24" height="24" style="width:24px;height:24px;border-radius:50%;object-fit:cover;display:block;box-shadow:0 0 0 1px rgba(255,255,255,.14)">Frankpeter</div>' +
    '<div style="width:100%;max-width:420px;height:1px;background:rgba(255,255,255,.14);margin:28px 0"></div>' +
    '<div style="width:100%;max-width:420px;box-sizing:border-box;background:#171717;border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:44px 20px 40px">' +
      '<div style="font-size:clamp(64px,20vw,112px);line-height:.9;letter-spacing:-.035em;font-style:italic;font-weight:400">View on<br>desktop</div></div>' +
    '<div style="margin-top:28px;font-family:\'IBM Plex Mono\',monospace;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#8f8f8f">Mobile view in progress</div>' +
    '<p style="margin:16px 0 0;max-width:30ch;font-size:19px;line-height:1.45;color:#ffffff;text-wrap:pretty">The desktop version is finished. Open this on a laptop for the case studies, the process, and the details.</p>' +
    '<p style="margin:22px 0 0;font-size:16px;line-height:1.5;color:#8f8f8f">In the meantime, write to <a href="mailto:' + EMAIL + '" style="color:#ffffff;text-decoration:underline;text-underline-offset:3px">' + EMAIL + '</a></p></div>';
}
function apply(){
  if (mq.matches){
    if (!el) build();
    if (!el.isConnected) (document.body || document.documentElement).appendChild(el);
    document.documentElement.classList.add('fp-gated');
  } else if (el){
    el.remove();
    document.documentElement.classList.remove('fp-gated');
  }
}
apply();
if (!document.body) document.addEventListener('DOMContentLoaded', apply);
(mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply));
})();
