import { loadResponsiveCssSet } from '../Portfolio_Css.js';

export function renderExcel(container) {
  loadResponsiveCssSet('Excel');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/menu/Excel.png" alt="Excel">
        <p>Excel</p>
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
        '2013 지역별 의료이용 통계연보 제1~4권 - 내지',
        '국민건강보험공단',
        '190㎜×260㎜',
        '1도',
        '제1권 - 494p, 제2권 - 318p, 제3권 - 326p, 제4권 - 468p'
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
function card(file, title, publisher, size, print, page, { bgColor = 'white', extension = 'jpg', displayMode = 'double', extra = '' } = {}) {
  const classes = ['xlsx', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/Excel/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/Excel/${file}.${extension}" alt="${title}">
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