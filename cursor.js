(function(){
if(window.__fpCursor||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;window.__fpCursor=1;
var st=document.createElement('style');st.textContent='html,body,*{cursor:none!important}';document.head.appendChild(st);
function mk(css){var d=document.createElement('div');d.setAttribute('aria-hidden','true');d.style.cssText='position:fixed;left:0;top:0;pointer-events:none;z-index:2147483647;will-change:transform;'+css;document.body.appendChild(d);return d}
var ring=mk('width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;border:1px solid rgba(255,255,255,.7);opacity:0;transition:opacity .2s ease,width .2s ease,height .2s ease,margin .2s ease');
var dot=mk('width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:url(cursor-ball.png) center/contain no-repeat;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35));transition:opacity .2s');
var inner=dot;var mx=-100,my=-100,rx=mx,ry=my,shown=false;
var SEL='a,button,[role=button],input,select,textarea,label,summary,[onclick],[data-hover]';
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!shown){rx=mx;ry=my;shown=true;dot.style.opacity=1}
var t=e.target,h=t&&t.closest&&(t.closest(SEL)||getComputedStyle(t).cursor==='pointer');ring.style.opacity=h?1:0},{passive:true});
document.addEventListener('mouseleave',function(){dot.style.opacity=0;ring.style.opacity=0;shown=false});
addEventListener('pointerdown',function(){dot.animate([{scale:'1'},{scale:'.7'},{scale:'1'}],{duration:260,easing:'cubic-bezier(.3,0,.2,1)'});
ring.animate([{scale:'1'},{scale:'.85'},{scale:'1'}],{duration:260,easing:'cubic-bezier(.3,0,.2,1)'})});
(function loop(){rx+=(mx-rx)*.25;ry+=(my-ry)*.25;dot.style.transform='translate('+mx+'px,'+my+'px)';ring.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
})();