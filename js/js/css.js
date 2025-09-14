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

export function loadResponsiveCssSet(baseName, category = 'Menu') {
  const width = window.innerWidth;
  let responsiveCss;

  if (width >= 1025) {
    responsiveCss = `./css/${category}/${baseName}/${baseName}_style_web(1025px).css`;
  } else if (width >= 601) {
    responsiveCss = `./css/${category}/${baseName}/${baseName}_style_tablet(601px-1024px).css`;
  } else {
    responsiveCss = `./css/${category}/${baseName}/${baseName}_style_mobile(600px).css`;
  }

  loadCss(responsiveCss);
}

// 기존 함수들과의 호환성을 위한 래퍼 함수들
export function loadMenuCss(baseName) {
  return loadResponsiveCssSet(baseName, 'Menu');
}

export function loadPortfolioCss(baseName) {
  return loadResponsiveCssSet(baseName, 'Portfolio');
}