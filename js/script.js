$(function () {
  /* -------------------- 폰트 크기 적용 -------------------- */
  function applyFontResize(el, width) {
    const fontSize = Math.max(15, Math.min(width / 10, 25));
    el.querySelectorAll('p').forEach(p => p.style.fontSize = `${fontSize}px`);

    el.querySelectorAll('.label, .colon, .value')
      .forEach(p => p.style.fontSize = `${fontSize - 3}px`);
    
    el.querySelectorAll('.sub_menu p, .mobile_sub_menu p, .Who_title p, .Personality_Type_title p, .Personality_Type_explanation p, .title_icon, .portfolio_title p, .search, h2')
      .forEach(p => p.style.fontSize = `${fontSize - 5}px`);
    
    el.querySelectorAll('.show_title p, .ESTJ, .INFP')
      .forEach(p => p.style.fontSize = `${fontSize - 8}px`);

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
    const targets = document.querySelectorAll('menu, .mobile_menu, .show_title, .spinner, .Who_title, .Personality_Type_title, .text-left, .text-right, .Personality_Type_explanation, .main_title, .title_hover, .p_title, .e-book_title');
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

  /* -------------------- .xxx / .xxx_r 동기화 -------------------- */
  function waitForImages(container, timeout = 3000) {
    return new Promise(resolve => {
      if (!container) return resolve();
      const imgs = Array.from(container.querySelectorAll('img'));
      if (!imgs.length) return resolve();
      let loaded = 0;
      const done = () => { loaded++; if (loaded >= imgs.length) resolve(); };

      imgs.forEach(img => {
        if (img.complete && img.naturalWidth !== 0) {
          done();
        } else {
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }
      });

      setTimeout(() => resolve(), timeout);
    });
  }

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

    Object.keys(map).forEach(k => {
      const info = map[k];
      if (info.base.length !== info.r.length) {
        console.debug(`[syncEbookPairs] mismatch for "${k}": base=${info.base.length}, r=${info.r.length}`);
      }
    });

    Object.values(map).forEach(({ base, r }) => {
      const n = Math.min(base.length, r.length);
      for (let i = 0; i < n; i++) {
        const left = base[i], right = r[i];
        const lh = left.offsetHeight;
        right.style.height = `${lh}px`;

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
            paddingLeft: cs.paddingLeft
          });
        }
      }
    });

    if (typeof applyScrollAnimation === 'function') {
      applyScrollAnimation();
      setTimeout(applyScrollAnimation, 50);
    }
  }
  window.syncEbookPairs = syncEbookPairs;

  async function performFullUIAdjustments() {
    const main = document.querySelector('main');
    const ebook = main ? main.querySelector('.e-book') : document.querySelector('.e-book');

    await Promise.all([
      waitForImages(ebook, 4000),
      (document.fonts ? document.fonts.ready : Promise.resolve())
    ]);

    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 30)));

    if (typeof reapplyFontResize === 'function') reapplyFontResize();
    if (typeof syncEbookPairs === 'function') {
      syncEbookPairs();
      await new Promise(r => setTimeout(r, 40));
    }
    if (typeof applyScrollAnimation === 'function') {
      applyScrollAnimation();
      setTimeout(applyScrollAnimation, 80);
    }
  }

  window.reapplyGlobalUIFixes = function () {
    if (typeof applyScrollAnimation === 'function') {
      applyScrollAnimation();
      setTimeout(applyScrollAnimation, 50);
    }
    performFullUIAdjustments();
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

  /* -------------------- 좌변/우변 높이 동기화 -------------------- */
  function adjustDownloadHeight() {
    const left = document.querySelector('.show #show_title .show_title p');
    const download = document.querySelector('.show #show_title .download');
    const caption = document.querySelector('.show #show_title .download .caption');
    const img = document.querySelector('.show #show_title .download a img');

    if (!left || !download || !caption || !img) return;

    // 좌변 높이
    const leftHeight = left.offsetHeight;

    // download 전체 높이를 좌측 p와 동일하게
    download.style.height = leftHeight + 'px';

    // 캡션 높이 (마진 포함)
    const cs = getComputedStyle(caption);
    const captionHeight = caption.offsetHeight + parseFloat(cs.marginTop);

    // 기존 로직: 좌변 높이에 맞춤
    const imgHeight = leftHeight - captionHeight;
    if (imgHeight > 0) {
      img.style.height = imgHeight + 'px';
      img.style.width = 'auto';          
      img.style.objectFit = 'contain';
    }
  }

  // 초기 실행 (즉시)
  adjustDownloadHeight();

  // DOM 준비 직후 바로 실행
  document.addEventListener('DOMContentLoaded', adjustDownloadHeight);

  // 이미지가 다 로드되면 다시 실행
  window.addEventListener('load', adjustDownloadHeight);

  // 창 크기 바뀔 때마다 다시 실행
  window.addEventListener('resize', adjustDownloadHeight);

  // 폰트 로드 완료 후에도 실행
  if (document.fonts) {
    document.fonts.ready.then(adjustDownloadHeight);
  }

  // 추가적인 안전장치: 짧은 지연 후 재실행
  setTimeout(adjustDownloadHeight, 100);
  setTimeout(adjustDownloadHeight, 500);
});