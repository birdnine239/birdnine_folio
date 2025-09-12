import { loadResponsiveCssSet } from '../css.js';

export function renderStable_Diffusion(container) {
  loadResponsiveCssSet('Stable_Diffusion', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/Stable_Diffusion/Stable_Diffusion.png" alt="Stable Diffusion (생성형 AI)">
        <p>Stable Diffusion (생성형 AI)</p>
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
        'Invisible_Kingdom_E-Book',
        '보이지 않는 왕국(Invisible Kingdom) E-Book',
        '버드나인',
        '1366px×2048px',
        '4도',
        '68p'
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
function card(file, title, publisher, size, print, page, { bgColor = 'white', displayMode = 'double', extra = '' } = {}) {
  const classes = ['sd', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/Stable_Diffusion/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/Stable_Diffusion/${file}.jpg" alt="${title}">
      <div class="title_hover">
        <p class="p_title"><span>${title}</span></p>
        <div class="content">
          <p class="label"><span>편</span>저</p>
          <p class="colon">:</p>
          <p class="value"><span class="s_value">${publisher}</span></p>
        </div>
        <div class="content">
          <p class="label"><span>판</span>형</p>
          <p class="colon">:</p>
          <p class="value"><span class="s_value">${size}</span></p>
        </div>
        <div class="content">
          <p class="label"><span>인</span>쇄</p>
          <p class="colon">:</p>
          <p class="value">${print}</p>
        </div>
        <div class="content">
          <p class="label">페이지</p>
          <p class="colon">:</p>
          <p class="value"><span class="s_value">${page}</span></p>
        </div>
      </div>
    </div>
  `;
}