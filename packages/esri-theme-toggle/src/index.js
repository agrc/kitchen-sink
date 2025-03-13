import esriConfig from '@arcgis/core/config';

const PATHS = {
  light: 'esri/themes/light/main.css',
  dark: 'esri/themes/dark/main.css',
};
const DARK_QUERY = '(prefers-color-scheme: dark)';
const DARK_ID = 'esri-dark-css';
const LIGHT_ID = 'esri-light-css';

let media;

function addLink(path, id) {
  const linkElement = document.createElement('link');
  linkElement.setAttribute('rel', 'stylesheet');
  linkElement.setAttribute('id', id);
  linkElement.setAttribute('href', `${esriConfig.assetsPath}/${path}`);

  document.head.appendChild(linkElement);
}

function applyCss() {
  const isDarkMode = media.matches;
  const darkLink = document.getElementById(DARK_ID);
  const lightLink = document.getElementById(LIGHT_ID);

  if (isDarkMode) {
    if (darkLink) {
      darkLink.disabled = false;
    } else {
      addLink(PATHS.dark, DARK_ID);
    }
    if (lightLink) {
      lightLink.disabled = true;
    }
  } else {
    if (lightLink) {
      lightLink.disabled = false;
    } else {
      addLink(PATHS.light, LIGHT_ID);
    }
    if (darkLink) {
      darkLink.disabled = true;
    }
  }
}

export default function initializeTheme() {
  media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', applyCss);
  applyCss();
}
