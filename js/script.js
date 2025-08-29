$(function () {
  /* -------------------- 메뉴 호버 -------------------- */
  $('menu ul>li').eq(2).hover(
    function () { $('header .sub_menu').stop().slideDown(); },
    function () {
      setTimeout(() => {
        if (!$('header .sub_menu:hover').length) {
          $('header .sub_menu').slideUp();
        }
      }, 300);
    }
  );

  $('.sub_menu').hover(
    function () { $(this).stop().slideDown(); },
    function () { $(this).slideUp(); }
  );

  $('.menu_img').hover(
    function () { $('.mobile_menu').stop().slideDown(); },
    function () { $('.mobile_menu').slideUp(); }
  );

  /* -------------------- 폰트 크기 적용 -------------------- */
  function applyFontResize(el, width) {
    const fontSize = Math.max(15, Math.min(width / 10, 25));
    el.querySelectorAll('p').forEach(p => p.style.fontSize = `${fontSize}px`);
    el.querySelectorAll('.sub_menu p, .mobile_sub_menu p, .title_icon, .portfolio_title p, .search, h2')
      .forEach(p => p.style.fontSize = `${fontSize - 5}px`);
    el.querySelectorAll('.label, .colon, .value')
      .forEach(p => p.style.fontSize = `${fontSize - 3}px`);
    el.querySelectorAll('.e-book_tp p')
      .forEach(p => p.style.fontSize = `${fontSize - 10}px`);
    if (el.matches('.p_title')) el.style.fontSize = `${fontSize}px`;
  }

  window.__fontResizeObserver = window.__fontResizeObserver || new ResizeObserver(entries => {
    for (const entry of entries) {
      applyFontResize(entry.target, entry.contentRect.width);
    }
  });

  window.reapplyFontResize = function () {
    const targets = document.querySelectorAll(
      'menu, .mobile_menu, .main_title, .title_hover, .p_title, .e-book_title'
    );
    targets.forEach(t => {
      window.__fontResizeObserver.observe(t);
      applyFontResize(t, t.getBoundingClientRect().width);
    });
  };

  /* -------------------- 텍스트 스크롤 애니메이션 -------------------- */
  function restartScrollAnimation($el) {
    $el.removeClass('scroll');
    void $el[0].offsetWidth;
    $el.addClass('scroll');
  }

  function __applyScrollAnimation_internal() {
    $('.value').each(function () {
      const inner = $(this).find('.s_value');
      if (!inner.length) return;
      if (inner[0].scrollWidth > $(this).outerWidth() + 1) {
        if (!inner.hasClass('scroll')) inner.addClass('scroll');
        setTimeout(() => restartScrollAnimation(inner), 50);
      } else {
        inner.removeClass('scroll');
      }
    });

    $('.p_title').each(function () {
      const inner = $(this).find('span');
      if (!inner.length) return;
      if (inner[0].scrollWidth > $(this).outerWidth() + 1) {
        if (!inner.hasClass('scroll')) inner.addClass('scroll');
        setTimeout(() => restartScrollAnimation(inner), 50);
      } else {
        inner.removeClass('scroll');
      }
    });
  }

  window.applyScrollAnimation = () => __applyScrollAnimation_internal();

  $(document).on('mouseenter', '.title_hover', function () {
    $(this).find('.p_title span.scroll, .value .s_value.scroll').each(function () {
      restartScrollAnimation($(this));
    });
  });

  /* -------------------- 팝업 열기 -------------------- */
  $(document).on('click', '.e-book [data-ebook]', function (e) {
    if ($(e.target).closest('.title_hover').length) return;

    const $card = $(this);
    const ebookPath = $card.data('ebook');
    if (!ebookPath) return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch && !$card.hasClass('active')) {
      $('.e-book [data-ebook].active').removeClass('active');
      $card.addClass('active');
      return;
    }
    openEbookPopup(ebookPath);
  });

  /* -------------------- .xxx / .xxx_r 동기화 -------------------- */
  function syncEbookPairs() {
    const ebook = document.querySelector('main .e-book');
    if (!ebook) return;

    const map = {};
    ebook.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(cls => {
        const key = cls.endsWith('_r') ? cls.slice(0, -2) : cls;
        (map[key] ??= { base: [], r: [] })[cls.endsWith('_r') ? 'r' : 'base'].push(el);
      });
    });

    Object.values(map).forEach(({ base, r }) => {
      const n = Math.min(base.length, r.length);
      for (let i = 0; i < n; i++) {
        const left = base[i], right = r[i];
        right.style.height = `${left.offsetHeight}px`;
        const lHover = left.querySelector('.title_hover');
        const rHover = right.querySelector('.title_hover');
        if (lHover && rHover) {
          const cs = window.getComputedStyle(lHover);
          Object.assign(rHover.style, {
            width: cs.width,
            height: cs.height,
            paddingTop: cs.paddingTop,
            paddingRight: cs.paddingRight,
            paddingBottom: cs.paddingBottom,
            paddingLeft: cs.paddingLeft,
            fontSize: cs.fontSize
          });
        }
      }
    });
  }
  window.syncEbookPairs = syncEbookPairs;

  /* -------------------- 전역 보정 -------------------- */
  window.reapplyGlobalUIFixes = function () {
    if (typeof reapplyFontResize === 'function') reapplyFontResize();
    if (typeof applyScrollAnimation === 'function') {
      applyScrollAnimation();
      setTimeout(applyScrollAnimation, 50);
    }
    if (typeof syncEbookPairs === 'function') {
      syncEbookPairs();
      setTimeout(syncEbookPairs, 200);
      const main = document.querySelector('main');
      if (main && typeof runAfterImagesLoad === 'function') {
        runAfterImagesLoad(main, () => syncEbookPairs());
      }
    }
  };

  function scheduleGlobalUI() {
    clearTimeout(window.__globalUITimer);
    window.__globalUITimer = setTimeout(() => {
      window.reapplyGlobalUIFixes();
    }, 100);
  }

  window.addEventListener('load', scheduleGlobalUI);
  window.addEventListener('resize', scheduleGlobalUI);
  scheduleGlobalUI();
});

/* -------------------- 팝업 전역 함수 -------------------- */
function openEbookPopup(path) {
  $('#ebookIframe').attr('src', path);
  $('#ebookPopupOverlay').css('display', 'flex');
}
function closeEbookPopup() {
  $('#ebookPopupOverlay').fadeOut();
  $('#ebookIframe').attr('src', '');
}

/* -------------------- PDF flip-book -------------------- */
function sizeFlipbook($flip, pageAspect) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const maxFlipWidth = windowWidth - 150;

  let pageHeight = windowHeight - 120;
  let pageWidth = Math.floor(pageHeight / pageAspect);
  let totalWidth = pageWidth * 2;

  if (totalWidth > maxFlipWidth) {
    pageWidth = Math.floor(maxFlipWidth / 2);
    pageHeight = Math.floor(pageWidth * pageAspect);
    totalWidth = pageWidth * 2;
  }
  return { pageWidth, pageHeight, totalWidth };
}

async function buildFlipPages($flip, pdf, pageWidth, pageHeight) {
  const pageCount = pdf.numPages;

  for (let i = 1; i <= pageCount; i++) {
    const $page = $('<div class="page"></div>').css({
      width: pageWidth + "px",
      height: pageHeight + "px"
    });
    const canvas = document.createElement('canvas');
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    $page.append(canvas);
    $flip.append($page);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const scale = Math.min(pageWidth / viewport.width, pageHeight / viewport.height);
    const scaledViewport = page.getViewport({ scale });

    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: scaledViewport
    }).promise;
  }
}

async function setupFlipBook(containerSelector) {
  const $flip = $(containerSelector);
  if (!$flip.length) return;
  const pdfPath = $flip.attr('data-pdf');
  if (!pdfPath) return;

  // PDF 불러오기
  const pdf = await pdfjsLib.getDocument(pdfPath).promise;

  // 첫 페이지로 원본 비율 추출
  const firstPage = await pdf.getPage(1);
  const vp = firstPage.getViewport({ scale: 1 });
  const pageAspect = vp.height / vp.width;

  // 페이지 크기 계산
  let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect);

  // PDF 페이지 렌더링
  await buildFlipPages($flip, pdf, pageWidth, pageHeight);

  // turn.js 초기화
  $flip.turn({
    width: totalWidth,
    height: pageHeight,
    autoCenter: true,
    display: 'double',
    gradients: true,
    elevation: 50
  });
  $flip.data('isTurn', true);

  // 리사이즈 대응
  $(window).on('resize', () => {
    let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect);
    $flip.turn('size', totalWidth, pageHeight);
  });

  // 버튼 연결
  $('#prevBtn').off('click').on('click', () => $flip.turn('previous'));
  $('#nextBtn').off('click').on('click', () => $flip.turn('next'));
}

document.addEventListener('DOMContentLoaded', () => {
  setupFlipBook('#flipbook');
});