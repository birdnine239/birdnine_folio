/* -------------------- 메뉴 호버 -------------------- */
$(function () {
  $('.portfolio-menu').hover(
    function () { 
      $('header .sub_menu').stop().slideDown(); 
    },
    function () {
      setTimeout(() => {
        if (!$('header .sub_menu:hover').length && !$(this).is(':hover')) {
          $('header .sub_menu').slideUp();
        }
      }, 300);
    }
  );

  // 서브메뉴 자체에 호버했을 때는 유지, 벗어나면 닫기
  $('.sub_menu').hover(
    function () { 
      $(this).stop().slideDown(); 
    },
    function () { 
      $(this).slideUp(); 
    }
  );

  // 포트폴리오 메뉴를 포함하는 li에 마우스가 올라갔을 때도 서브메뉴 유지
  $('menu ul li:has(.portfolio-menu)').hover(
    function () {
      $('header .sub_menu').stop().slideDown();
    },
    function () {
      setTimeout(() => {
        if (!$('header .sub_menu:hover').length && !$('.portfolio-menu:hover').length) {
          $('header .sub_menu').slideUp();
        }
      }, 300);
    }
  );

  // 모바일 메뉴 호버
  $('.menu_img').hover(
    function () { $('.mobile_menu').stop().slideDown(); },
    function () { $('.mobile_menu').slideUp(); }
  );

  // 모바일/테블릿 환경에서 서브메뉴 클릭 시 자동 스크롤
  $('.sub_menu, .mobile_menu').on('click', function(e) {
    if (window.innerWidth <= 1024) {
      this.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})