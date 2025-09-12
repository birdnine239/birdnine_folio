import { loadResponsiveCssSet } from '../css.js';

export function renderIllustrator(container) {
  loadResponsiveCssSet('Illustrator', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/Illustrator/Illustrator.png" alt="Illustrator">
        <p>Illustrator</p>
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
        'English_egg_Business_Card',
        'English egg 명함',
        'English egg',
        '44㎜×55㎜',
        '4도',
        '2p + 칼선',
        { displayMode: 'single' }
      )}
      ${card(
        'Construction_Academy_-_D-Ring_Binder_Casebound',
        '건설 아카데미 - D링 바인더 싸바리',
        '신영흥화력건설본부',
        '600㎜×300㎜',
        '4도',
        '2p + 엠보판',
        { displayMode: 'single', extra: 'ai_r' }
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
  const classes = ['ai', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/Illustrator/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/Illustrator/${file}.jpg" alt="${title}">
      <div class="title_hover">
        <p class="p_title"><span>${title}</span></p>
        <div class="content">
          <p class="label">발행처</p>
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