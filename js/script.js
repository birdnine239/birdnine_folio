$(function() {
  // 메뉴 호버
  $('menu ul>li').eq(2).hover(
    function() {
      $('header .sub_menu').stop().slideDown();
    },
    function() {
      setTimeout(() => {
        if (!$('header .sub_menu:hover').length) {
          $('header .sub_menu').slideUp();
        }
      }, 300);
    }
  );
    
  $('.sub_menu').hover(
    function() {
      $(this).stop().slideDown();
    },
    function() {
      $(this).slideUp();
    }
  );

  $('.menu_img').hover(
    function() {
      $('.mobile_menu').stop().slideDown();
    },
    function() {
      $('.mobile_menu').slideUp();
    }
  );

  // 가변 폰트 사이즈
  const divs = document.querySelectorAll('header, .mobile_menu, main, .title_hover, .p_title, .e-book_title');

  divs.forEach(div => {
    const text = div.querySelectorAll('p');
    const subMenuText = div.querySelectorAll('.sub_menu p, .mobile_sub_menu p, h2');
    const HoverText = div.querySelectorAll('.label, .colon, .value');
    const EBookText = div.querySelectorAll('.e-book_tp p');
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
    
        // 폰트 크기 계산
        const fontSize = Math.max(15, Math.min(width / 10, 25));
    
        text.forEach(p => {
          p.style.fontSize = `${fontSize}px`;
        });
        subMenuText.forEach(p => {
          p.style.fontSize = `${fontSize - 5}px`;
        });
        HoverText.forEach(p => {
          p.style.fontSize = `${fontSize - 3}px`;
        });
        EBookText.forEach(p => {
          p.style.fontSize = `${fontSize - 12}px`;
        });
      }
    });
    
    resizeObserver.observe(div);
  });
    
  // 서브 페이지
    $('header a, .mobile_menu a').click(function(e) {
      var targetPage = $(this).attr('href'); // 클릭한 링크의 href 값 가져오기
    
      if (targetPage === './index.html') { // 홈 클릭 시 원래 화면으로 복귀
        e.preventDefault();
        window.location.href = './index.html';
        return;
      }
    
      e.preventDefault(); // 기본 이동 방지
      $('.show').hide(); // 기존 콘텐츠 숨기기
      $('header').show();
      $('main').show();
    
      if ($('main iframe').length > 0) {
        $('main iframe').attr('src', targetPage);
      }
    });

  // 넘치는 텍스트에 scroll 클래스 추가 (수정 버전)
  function applyScrollAnimation() {
    $('.value').each(function () {
      const inner = $(this).find('.s_value');
      if (!inner.length) return;

      const parentWidth = $(this).outerWidth();
      const scrollWidth = inner[0].scrollWidth;

      if (scrollWidth > parentWidth + 1) {
        inner.addClass('scroll');
      } else {
        inner.removeClass('scroll');
      }
    });

    $('.p_title').each(function () {
      const inner = $(this).find('span');
      if (!inner.length) return;

      const parentWidth = $(this).outerWidth();
      const scrollWidth = inner[0].scrollWidth;

      if (scrollWidth > parentWidth + 1) {
        inner.addClass('scroll');
      } else {
        inner.removeClass('scroll');
      }
    });
  }

  // 초기 적용 + 리사이즈 시 적용
  $(window).on('load resize', function () {
    applyScrollAnimation();
  });

  // 동기화 이후에도 다시 scroll 클래스 재적용
  window.addEventListener('load', () => {
    setTimeout(applyScrollAnimation, 100); // syncEbookPairs 이후 약간의 딜레이
  });
  window.addEventListener('resize', () => {
    setTimeout(applyScrollAnimation, 100);
  });

  // 팝업 열기 처리 (PC/모바일 공통, 모든 카드 유형)
  $('.e-book').on('click', '[data-ebook]', function (e) {
    if ($(e.target).closest('.title_hover').length) return; // 타이틀 클릭은 무시

    const $card = $(this); // 클릭된 카드
    const ebookPath = $card.data('ebook');
    if (!ebookPath) return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouch && !$card.hasClass('active')) {
      $('.e-book [data-ebook].active').removeClass('active');
      $card.addClass('active');
      return; // 첫 탭엔 강조만
    }

    // ✅ 부모(index.html)에 있는 팝업 함수 호출
    parent.openEbookPopup(ebookPath);
  });
});

// iframe의 높이를 자동 조정하는 함수
function adjustIframeHeight(iframe) {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
}

function openEbookPopup(path) {
  console.log('팝업 열기:', path);
  $('#ebookIframe').attr('src', path);
  $('#ebookPopupOverlay').css('display', 'flex');
}

function closeEbookPopup() {
  $('#ebookPopupOverlay').fadeOut();
  $('#ebookIframe').attr('src', '');
}

// .xxx .title_hover 값과 .xxx_r .title_hover 값 동기화
function syncEbookPairs () {
  const ebook = document.querySelector('main .e-book');
  if (!ebook) return;

  // .aaa / .aaa_r, .hwp / .hwp_r, … 전부 수집
  const map = {};
  ebook.querySelectorAll('[class]').forEach(el => {
    el.classList.forEach(cls => {
      const key = cls.endsWith('_r') ? cls.slice(0, -2) : cls;
      (map[key] ??= { base: [], r: [] })[cls.endsWith('_r') ? 'r' : 'base'].push(el);
    });
  });

  // 각 쌍을 동일 인덱스로 대응
  Object.values(map).forEach(({ base, r }) => {
    const n = Math.min(base.length, r.length);
    for (let i = 0; i < n; i++) {
      const left  = base[i];
      const right = r[i];

      // 1) 카드 높이
      right.style.height = `${left.offsetHeight}px`;

      // 2) title_hover 폭·높이·패딩·글자 크기
      const lHover = left .querySelector('.title_hover');
      const rHover = right.querySelector('.title_hover');
      if (lHover && rHover) {
        const cs = window.getComputedStyle(lHover);

        rHover.style.width = cs.width;
        rHover.style.height = cs.height;
        rHover.style.paddingTop = cs.paddingTop;
        rHover.style.paddingRight = cs.paddingRight;
        rHover.style.paddingBottom = cs.paddingBottom;
        rHover.style.paddingLeft = cs.paddingLeft;
        rHover.style.fontSize = cs.fontSize;   // 자식도 자연스레 상속

        /* 가변 폰트 스크립트가 이미 붙어 있으므로
           width·padding을 바꿨다면 ResizeObserver가 다시 계산 → 안정 */
      }
    }
  });
}

window.addEventListener('load',   syncEbookPairs);
window.addEventListener('resize', syncEbookPairs);