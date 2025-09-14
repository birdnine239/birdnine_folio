import { loadResponsiveCssSet } from '../css.js';

export function renderPowerPoint(container) {
  loadResponsiveCssSet('PowerPoint', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/PowerPoint/PowerPoint.png" alt="PowerPoint">
        <p>PowerPoint</p>
      </div>
      <!--
      <div class="search">
        <form action="">
          <input type="text" placeholder="검색어를 입력해 주세요.">
          <a href="#">
            <img class="search_icon" src="./img/Portfolio/search_icon.png" alt="돋보기">
          </a>
        </form>
      </div>
      -->
    </div>

    <div class="e-book">
      ${card(
        'Seoul_City_Construction_Waste_Disposal_Company_Training_Materials',
        '서울시 건설폐기물 처리업체 교육자료 - 내지',
        '서울특별시',
        '210㎜×297㎜',
        '1도',
        '76p'
      )}
      ${card(
        'GKS_and_International_Student_Management_Workshop_for_Administrators',
        'GKS 및 유학생 관리 업무 담당자 워크샵 - 내지',
        '국립국제교육원',
        '210㎜×297㎜',
        '1도',
        '100p'
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
  const classes = ['pptx', extra].filter(Boolean).join(' ');
  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/PowerPoint/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/PowerPoint/${file}.jpg" alt="${title}">
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
