// Language toggle for the legal pages. Shares the preference with index.html (braced_lang).
(() => {
  const btn = document.getElementById('lang-toggle');
  const FLAG_EN = '<svg class="lang-flag" viewBox="0 0 20 14"><rect width="20" height="14" rx="2" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" stroke-width="2.5"/><path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" stroke-width="1.5"/><path d="M10 0V14M0 7H20" stroke="#fff" stroke-width="4"/><path d="M10 0V14M0 7H20" stroke="#C8102E" stroke-width="2.5"/></svg>';
  const FLAG_ES = '<svg class="lang-flag" viewBox="0 0 20 14"><rect width="20" height="14" rx="2" fill="#c60b1e"/><rect y="4" width="20" height="6" fill="#ffc400"/></svg>';
  let lang = 'es';

  function setLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== lang; });
    document.querySelectorAll('[data-es]').forEach(el => { el.textContent = el.getAttribute('data-' + lang); });
    document.title = document.body.getAttribute('data-title-' + lang);
    btn.innerHTML = lang === 'es' ? FLAG_EN + ' EN' : FLAG_ES + ' ES';
    try { localStorage.setItem('braced_lang', lang); } catch (e) {}
  }

  let saved = null;
  try { saved = localStorage.getItem('braced_lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'es');
  btn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));
})();
