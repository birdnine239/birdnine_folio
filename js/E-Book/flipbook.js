/* -------------------- PDF flip-book -------------------- */
function sizeFlipbook($flip, pageAspect, displayMode = 'double') {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  // single 모드와 double 모드에 따라 최대 너비 계산
  const maxFlipWidth = displayMode === 'single' 
    ? windowWidth - 100  // single 모드: 전체 화면 너비 활용
    : windowWidth - 100; // double 모드: 기존과 동일

  let pageHeight = windowHeight - 120;
  let pageWidth = Math.floor(pageHeight / pageAspect);
  
  // single 모드일 때는 페이지 하나만, double 모드일 때는 두 페이지 고려
  let totalWidth = displayMode === 'single' ? pageWidth : pageWidth * 2;

  // 화면 너비를 초과하는 경우 조정
  if (totalWidth > maxFlipWidth) {
    if (displayMode === 'single') {
      // single 모드: 페이지 하나가 최대 너비에 맞도록
      pageWidth = Math.floor(maxFlipWidth);
      pageHeight = Math.floor(pageWidth * pageAspect);
      totalWidth = pageWidth;
    } else {
      // double 모드: 두 페이지가 최대 너비에 맞도록
      pageWidth = Math.floor(maxFlipWidth / 2);
      pageHeight = Math.floor(pageWidth * pageAspect);
      totalWidth = pageWidth * 2;
    }
  }
  
  return { pageWidth, pageHeight, totalWidth };
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

  // ✅ URL 파라미터에서 display 값 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const displayMode = urlParams.get('display') || 'double';

  $('#loadingMessage').show();

  const pdf = await pdfjsLib.getDocument(pdfPath).promise;

  const firstPage = await pdf.getPage(1);
  const vp = firstPage.getViewport({ scale: 1 });
  const pageAspect = vp.height / vp.width;

  // ✅ displayMode를 sizeFlipbook에 전달
  let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect, displayMode);

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

  $(window).on('resize', () => {
    // ✅ 리사이즈 시에도 displayMode 전달
    let { pageWidth, pageHeight, totalWidth } = sizeFlipbook($flip, pageAspect, displayMode);
    $flip.turn('size', totalWidth, pageHeight);
  });

  $('#prevBtn').off('click').on('click', () => $flip.turn('previous'));
  $('#nextBtn').off('click').on('click', () => $flip.turn('next'));
}

function adjustFlipContainerHeight() {
    const popupContent = parent.document.querySelector('.popupContent');
    const titleElement = document.querySelector('.e-book_title');
    const flipContainer = document.querySelector('.flip-container');
    
    if (!popupContent || !titleElement || !flipContainer) return;

    const popupHeight = popupContent.offsetHeight;
    const titleHeight = titleElement.offsetHeight;
    const popupPadding = 60; // 30px top + 30px bottom
    const titleMarginBottom = 15;
    
    const containerHeight = popupHeight - popupPadding - titleHeight - titleMarginBottom;
    flipContainer.style.height = `${containerHeight}px`;
}

// DOM이 로드된 후 높이 조정
document.addEventListener('DOMContentLoaded', () => {
    adjustFlipContainerHeight();
    
    // 타이틀 높이 변화 감지
    const resizeObserver = new ResizeObserver(() => {
        adjustFlipContainerHeight();
    });
    
    const titleElement = document.querySelector('.e-book_title');
    if (titleElement) {
        resizeObserver.observe(titleElement);
    }
    
    // 윈도우 리사이즈시 높이 재조정
    window.addEventListener('resize', adjustFlipContainerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  setupFlipBook('#flipbook');
});

function adjustContainerToPdfSize(pdf) {
    const viewport = pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const container = document.querySelector('.flip-container');
        const flipbook = document.querySelector('#flipbook');
        
        // PDF 높이에 맞춰 컨테이너 크기 조정
        const containerHeight = viewport.height;
        container.style.height = `${containerHeight}px`;
        flipbook.style.height = `${containerHeight}px`;
    });
}

// PDF 로드 후 크기 조정 추가
pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    // ...existing PDF loading code...
    adjustContainerToPdfSize(pdf);
});