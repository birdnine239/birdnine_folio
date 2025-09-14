import { loadResponsiveCssSet } from '../css.js';

export function renderHangul(container) {
  loadResponsiveCssSet('Hangul', 'Portfolio');  // 폴더 이름만 넘김
  container.innerHTML = `
    <div class="main_title">
      <div class="portfolio_title">
        <img class="title_icon" src="./img/Portfolio/Hangul/Hangul.png" alt="한글">
        <p>한&nbsp;&nbsp;글</p>
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
        'Level-2_EMT_Question_Book',
        '2급 응급구조사 문제집 - 내지',
        '서울 소방학교',
        '190㎜×260㎜',
        '1도',
        '376p',
        { bgColor: 'linear-gradient(to top, #d5d5d5, #848484)' }
      )}
      ${card(
        'Standard_Unit_Cost_for_Light-Framed_Timber_Construction',
        '경골목조건축 표준 일위대가 - 내지',
        '국립산림과학원',
        '190㎜×260㎜',
        '1도',
        '108p',
        { bgColor: 'linear-gradient(to top, #f2f6f5, white)' }
      )}
      ${card(
        'A_Study_on_Improving_the_Compensation_System_for_Public_Officials',
        '공무원 보수(임금)체계 개선 방안에 관한 연구 - 내지',
        '전국 공무원 노동 조합',
        '190㎜×260㎜',
        '1도',
        '464p',
        { bgColor: 'linear-gradient(to top, #ffffff, #929292)' }
      )}
      ${card(
        'Civil_Law_Legal_Terminology',
        '민법 법률용어 - 내지',
        '도서출판 지성',
        '188㎜×257㎜',
        '1도',
        '126p',
      )}
      ${card(
        'Postal_Knowledge(Domestic_and_International_Mail)',
        '우편상식(국내우편, 국제우편) - 내지',
        '우정사업본부',
        '182㎜×257㎜',
        '2도',
        '110p'
      )}
      ${card(
        'AK_Economics(Practice_Questions_&_Explanations)',
        'AK 경제학(문제편 & 해설편) - 내지',
        '도서출판 지성',
        '188㎜×257㎜',
        '2도',
        '문제편 - 452p, 해설편 - 290p'
      )}
      ${card(
        'Safety_Management_Manual_for_Mass_Gathering_Events',
        '다중운집 행사 안전관리 매뉴얼 - 내지',
        '경찰청',
        '187㎜×257㎜',
        '4도',
        '286p'
      )}
      ${card(
        'Megastudy_Academy_Consultation_Guidebook_for_the_Regular_Repeater_Course',
        '메가스터디 학원 재수정규반 상담 가이드북 - 내지',
        '메가스터디 학원',
        '150㎜×215㎜',
        '4도',
        '180p + 간지 탭 칼선'
      )}
      ${card(
        'Special_Lecture_on_Criminal_Procedure_Case_Law',
        '형소판례특강 - 내지',
        '안태영',
        '188㎜×257㎜',
        '4도',
        '310p',
        { bgColor: '#dcd9d2', labelTitle: '<span>편</span>저' }
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
function card(file, title, publisher, size, print, page, { bgColor = 'white', labelTitle = '발행처', displayMode = 'double', extra = '' } = {}) {
  const classes = ['hwp', extra].filter(Boolean).join(' ');

  return `
    <div class="${classes}" style="background: ${bgColor};" data-ebook="./e-book/Hangul/${file}.html" data-display="${displayMode}">
      <img src="./img/Portfolio/Hangul/${file}.jpg" alt="${title}">
      <div class="title_hover">
        <p class="p_title"><span>${title}</span></p>
        <div class="content">
          <p class="label">${labelTitle}</p>
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