/* -------------------- 팝업 열기 이벤트 -------------------- */
$(document).on('click', '.e-book [data-ebook]', function (e) {
  if ($(e.target).closest('.title_hover').length) return;

  const $card = $(this);
  const ebookPath = $card.data('ebook');
  const displayMode = $card.attr('data-display') || 'double'; // ✅ 카드에서 읽음
  if (!ebookPath) return;

  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch && !$card.hasClass('active')) {
    $('.e-book [data-ebook].active').removeClass('active');
    $card.addClass('active');
    return;
  }
  openEbookPopup(ebookPath, displayMode); // ✅ displayMode 전달
});

/* -------------------- 팝업 전역 함수 -------------------- */
function openEbookPopup(path, displayMode = 'double') {
  $('#loadingMessage').show();
  $('#ebookIframe')
    .off('load')
    .on('load', function () {
      $('#loadingMessage').fadeOut(300);
    })
    .attr('src', path + '?display=' + displayMode);  // ✅ displayMode를 query string으로 전달
  $('#ebookPopupOverlay').css({ display: 'flex', overflow: 'hidden' });
}

function closeEbookPopup() {
  $('#ebookPopupOverlay').fadeOut(() => {
    $('#ebookIframe').attr('src', '');
    $('#ebookPopupOverlay').css('overflow', '');
    $('#loadingMessage').hide();
    $('#flipbook').html('');
  });
}

// 팝업 외부 클릭 시 닫기 이벤트
$(document).on('click', '#ebookPopupOverlay', function (e) {
  if (e.target.id === 'ebookPopupOverlay') {
    closeEbookPopup();
  }
});