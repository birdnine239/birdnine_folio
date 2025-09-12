import { loadResponsiveCssSet } from '../css.js';

export function renderSketchUP(container) {
  loadResponsiveCssSet('SketchUP', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/SketchUP/SketchUP.png" alt="SketchUP">
        <p>SketchUP</p>
      </div>
      <div class="search">
        <form action="">
          <input type="text" placeholder="검색어를 입력해 주세요.">
          <a href="#">
            <img class="search_icon" src="./img/Portfolio/search_icon.png" alt="돋보기">
          </a>
        </form>
      </div>
    </div>

    <div class="e-book">
      ${card(
        '2013_Statistical_Yearbook_of_Regional_Medical_Utilization_(Volumes_1~4)',
        '김포 누산리 농가 주택',
        '1 / 100',
        '1층 - 105㎡, 2층 - 42㎡',
      )}
      ${card(
        '2013_Statistical_Yearbook_of_Regional_Medical_Utilization_(Volumes_1~4)',
        '전원주택 C형',
        '1 / 78',
        '㎡'
      )}
    </div>
  `;

  // 공통 UI 보정
  if (typeof reapplyGlobalUIFixes === 'function') reapplyGlobalUIFixes();

  // 이미지 로드 완료 후 다시 실행
  if (typeof runAfterImagesLoad === 'function') {
    runAfterImagesLoad(container, () => {
      if (typeof syncEbookPairs === 'function') syncEbookPairs();
    });
  }
}

// 카드 생성 함수 (HTML 템플릿)
function card(file, title, scale, area, { bgColor = 'white', extra = '' } = {}) {
  const classes = ['skp', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/SketchUP/${file}.html">
      <img src="./img/Portfolio/SketchUP/${file}.jpg" alt="${title}">
      <div class="title_hover">
        <p class="p_title"><span>${title}</span></p>
        <div class="content">
          <p class="label">SCALE</p>
          <p class="colon">:</p>
          <p class="value"><span class="s_value">${scale}</span></p>
        </div>
        <div class="content">
          <p class="label"><span>면</span>적</p>
          <p class="colon">:</p>
          <p class="value">${area}</p>
        </div>
      </div>
    </div>
  `;
}