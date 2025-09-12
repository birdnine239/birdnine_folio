import { loadResponsiveCssSet } from '../css.js';

export function renderInDesign(container) {
  loadResponsiveCssSet('InDesign', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/InDesign/InDesign.png" alt="InDesign">
        <p>InDesign</p>
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
        'List_of_Award_Recipients_for_the_110th_Anniversary_Celebration',
        '창립 110주년 기념 수상자 명단 - 내지',
        '대한 적십자사',
        '210㎜×297㎜',
        '1도',
        '600p'
      )}
      ${card(
        'A_Bee_Fallen_into_a_Honey_Jar',
        '꿀통에 빠진 벌 - 내지',
        '(사)한국 장애인 문인 복지후원회',
        '130㎜×210㎜',
        '2도',
        '144p'
      )}
      ${card(
        '2015_Korea-Japan_University_Student_Peace_Tour',
        '2015 한·일대학생 PEACE TOUR - 내지',
        '(사)평화 나눔회',
        '210㎜×275㎜',
        '4도',
        '44p',
        { bgColor: '#dddddd' }
      )}
      ${card(
        'KT_Business_Card',
        'KT 명함',
        'KT',
        '90㎜×50㎜',
        '4도',
        '2p',
        { displayMode: 'single' }
      )}
      ${card(
        'KG_Passone_Business_Card',
        'KG Passone 명함',
        'KG Passone',
        '90㎜×50㎜',
        '4도',
        '2p',
        { displayMode: 'single' }
      )}
      ${card(
        'Individual_Sewage_Treatment_Facility_(Septic_Tank)_-_Tri-Fold_Accordion-Style_Billing_Notice',
        '개인하수처리시설(정화조) - 병풍 접지 3단 고지서 2종',
        '성동구청',
        '177㎜×93㎜',
        '4도',
        '6p',
        { displayMode: 'single' }
      )}
      ${card(
        'Saerom_Village_-_Tri-Fold_Roll-Fold_Leaflet',
        '새롬마을 - 두루마리 접지 3단 리플렛',
        '새롬마을',
        '101㎜×210㎜',
        '4도',
        '6p',
        { displayMode: 'single', extra: 'indd_r' }
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

// 카드 컴포넌트 (HTML 템플릿)
function card(file, title, publisher, size, print, page, { bgColor = 'white', displayMode = 'double', extra = '' } = {}) {
  const classes = ['indd', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/InDesign/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/InDesign/${file}.jpg" alt="${title}">
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