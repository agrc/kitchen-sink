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

function toggleStylesheet() {
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

function updateEsriUiElements() {
  const isDarkMode = media.matches;

  // Toggle ArcGIS Maps SDK widgets mode
  // ref: https://developers.arcgis.com/calcite-design-system/tutorials/build-a-dark-mode-switch/
  const widgets = document.getElementsByClassName('esri-ui');
  for (const widget of widgets) {
    if (isDarkMode) {
      widget.classList.replace('calcite-mode-light', 'calcite-mode-dark');
    } else {
      widget.classList.replace('calcite-mode-dark', 'calcite-mode-light');
    }
  }
}

export default function initializeTheme() {
  media = window.matchMedia(DARK_QUERY);
  toggleStylesheet();

  media.addEventListener('change', () => {
    toggleStylesheet();
    updateEsriUiElements();
  });

  // wait until the esri api has had a chance to create all of its elements
  window.addEventListener('load', () => {
    updateEsriUiElements();
  });
}
