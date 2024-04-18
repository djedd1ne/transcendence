import languages from './languages';

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  window.location.reload();
}

export { changeLanguage };
