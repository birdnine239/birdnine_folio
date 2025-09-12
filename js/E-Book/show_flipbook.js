/* -------------------- PDF flip-book -------------------- */
// PDF 높이 = p 태그 아래부터 .show padding-bottom 까지 (DOM 좌표 기준)
// 세로 기준 크기 계산 후, 가로가 .flip-container 너비를 넘지 않도록 제한
function sizeFlipbook($flip, pageAspect) {
  const $show = $('.show');
  const $container = $show.find('.flip-container');
  const containerWidth = $container.length ? $container.width() : $show.width();

  // 쇼 내부 높이
  const showHeight = $show.innerHeight();

  // p 태그 (제목/설명)
  const $p = $show.find('> #show_title');
  const pHeight = $p.length ? $p.outerHeight(true) : 0;

  // 사용 가능한 높이 (데스크탑 전용)
  const paddingBottom = parseFloat($show.css('padding-bottom')) || 0;
  let availableHeight = showHeight - pHeight - paddingBottom - 15;
  if (availableHeight < 200) availableHeight = 200;

  let pageWidth, pageHeight;

  if (window.innerWidth <= 768) {
    // ✅ 모바일/태블릿: 고정 비율 1 : 1.4142857
    const fixedAspect = 1 / 1.414285714285714; // width/height 값
    pageWidth = containerWidth;                 // 가로 100%
    pageHeight = Math.floor(pageWidth / fixedAspect);
  } else {
    // ✅ 데스크탑: PDF 원본 비율
    pageHeight = availableHeight;
    pageWidth = Math.floor(pageHeight * pageAspect);

    if (pageWidth > containerWidth) {
      pageWidth = containerWidth;
      pageHeight = Math.floor(pageWidth / pageAspect);
    }
  }

  return { pageWidth, pageHeight, totalWidth: pageWidth };
}

async function buildFlipPages($flip, pdf, pageWidth, pageHeight) {
  const pageCount = pdf.numPages;
  const pageElements = [];

  for (let i = 1; i <= pageCount; i++) {
    const $page = $('<div class="page"></div>').css({
      width: pageWidth + "px",
      height: pageHeight + "px"
    });
    const canvas = document.createElement('canvas');
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    $page.append(canvas);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const scale = Math.min(pageWidth / viewport.width, pageHeight / viewport.height);
    const scaledViewport = page.getViewport({ scale });

    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: scaledViewport
    }).promise;

    pageElements.push($page);
  }

  $flip.append(pageElements);
  return true;
}

async function setupFlipBook(containerSelector) {
  const $flip = $(containerSelector);
  if (!$flip.length) return;
  const pdfPath = $flip.attr('data-pdf');
  if (!pdfPath) return;

  $('#loadingMessage').show();

  const pdf = await pdfjsLib.getDocument(pdfPath).promise;

  const firstPage = await pdf.getPage(1);
  const vp = firstPage.getViewport({ scale: 1 });
  const pageAspect = vp.width / vp.height; // ✅ 원본 비율 유지

  const displayMode = 'single'; // ✅ 항상 싱글 모드

  let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect);

  await buildFlipPages($flip, pdf, pageWidth, pageHeight);

  $flip.turn({
    width: totalWidth,
    height: pageHeight,
    autoCenter: true,
    display: displayMode,
    gradients: true,
    elevation: 50
  });
  $flip.data('isTurn', true);

  $('#loadingMessage').fadeOut(300);

  // 반응형
  $(window).on('resize', () => {
    let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect);
    $flip.turn('size', totalWidth, pageHeight);
  });

  // 버튼 이벤트
  $('#prevBtn').off('click').on('click', () => $flip.turn('previous'));
  $('#nextBtn').off('click').on('click', () => $flip.turn('next'));
}

document.addEventListener('DOMContentLoaded', () => {
  setupFlipBook('#flipbook');
});