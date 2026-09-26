(function(){
if (window.fpTheme) return;
var KEY = 'fp-theme', root = document.documentElement;
var st = document.createElement('style');
st.textContent =
  'html.fp-light{filter:invert(1) hue-rotate(180deg);background:#0f0f0f}' +
  'html.fp-light img,html.fp-light video,html.fp-light canvas,html.fp-light image-slot{filter:invert(1) hue-rotate(180deg)}' +
  'html.fp-light main[data-theme="dark"]{background:#0f0f0f!important}' +
  'html.fp-theming,html.fp-theming *{transition:none!important}';
(document.head || root).appendChild(st);
function set(light, save){
  root.classList.add('fp-theming');
  root.classList.toggle('fp-light', light);
  if (save) localStorage.setItem(KEY, light ? 'light' : 'dark');
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ root.classList.remove('fp-theming'); }); });
  dispatchEvent(new CustomEvent('fp-theme-change', { detail: { light: light } }));
}
set(localStorage.getItem(KEY) === 'light', false);
window.fpTheme = {
  isLight: function(){ return root.classList.contains('fp-light'); },
  toggle: function(){ set(!root.classList.contains('fp-light'), true); }
};
})();
