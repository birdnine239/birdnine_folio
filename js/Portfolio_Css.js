export function loadCss(href) {
  const found = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .some(link => link.href.includes(href));
  if (!found) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

export function loadResponsiveCssSet(baseName) {
  const width = window.innerWidth;
  let responsiveCss;

  if (width >= 1025) {
    responsiveCss = `./css/Portfolio/${baseName}/${baseName}_style_web(1025px).css`;
  } else if (width >= 601) {
    responsiveCss = `./css/Portfolio/${baseName}/${baseName}_style_tablet(601px-1024px).css`;
  } else {
    responsiveCss = `./css/Portfolio/${baseName}/${baseName}_style_mobile(600px).css`;
  }

  loadCss(responsiveCss);
}