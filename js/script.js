$(function(){
  // 메뉴 호버
  $('menu ul>li').eq(2).hover(
    function(){
      $('header .sub_menu').stop().slideDown();
    },
    function(){
      setTimeout(() => {
        if (!$('header .sub_menu:hover').length){
          $('header .sub_menu').slideUp();
        }
      }, 100);
    }
  );
    
  $('.sub_menu').hover(
    function(){
      $(this).stop().slideDown();
    },
    function(){
      $(this).slideUp();
    }
  );

  $('.menu_img').hover(
    function(){
      $('.mobile_menu').stop().slideDown();
    },
    function(){
      $('.mobile_menu').slideUp();
    }
  );

  // 가변 폰트 사이즈
  const divs = document.querySelectorAll('header, .mobile_menu, main, .title_hover, .p_title');

  divs.forEach(div => {
    const text = div.querySelectorAll('p');
    const subMenuText = div.querySelectorAll('.sub_menu p, .mobile_sub_menu p');
    const HoverText = div.querySelectorAll('.label, .colon, .value');
    
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
          p.style.fontSize = `${fontSize -3}px`;
        });
      }
    });
    
    resizeObserver.observe(div);
  });
    
  // 서브 페이지
    $('header a, .mobile_menu a').click(function(e){
      var targetPage = $(this).attr('href'); // 클릭한 링크의 href 값 가져오기
    
      if (targetPage === './index.html'){ // 홈 클릭 시 원래 화면으로 복귀
        e.preventDefault();
        window.location.href = './index.html';
        return;
      }
    
      e.preventDefault(); // 기본 이동 방지
      $('.show').hide(); // 기존 콘텐츠 숨기기
      $('header').show();
      $('main').show();
    
      if ($('main iframe').length > 0){
        $('main iframe').attr('src', targetPage);
      } else {
        $('main').html('<iframe src="' + targetPage + '" scrolling="no" frameborder="0" onload="adjustIframeHeight(this)"></iframe>'); // iframe 삽입
      }
    });

  // 넘치는 텍스트에 scroll 클래스 추가
  $(window).on('load', function(){
    $('.value').each(function(){
      const innerText = $(this).find('.s_value');
      if(innerText.length && innerText[0].scrollWidth > $(this).width()){
        innerText.addClass('scroll');
      }
    });
  });

  // 팝업 열기 함수
  function openEbookPopup(path) {
    const iframe = document.getElementById('ebookIframe');
    iframe.src = path;
    document.getElementById('ebookPopupOverlay').style.display = 'flex';
  }

  // 팝업 닫기 이벤트
  document.getElementById('ebookPopupOverlay').addEventListener('click', function (e) {
    if (e.target.id === 'ebookPopupOverlay') {
      this.style.display = 'none';
      document.getElementById('ebookIframe').src = '';
    }
  });

  // e-book 클릭 처리 (모바일/PC 분기)
  document.querySelectorAll('.e-book').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.closest('.title_hover')) return;

      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const isActive = item.classList.contains('active');

      if (isTouch) {
        if (!isActive) {
          document.querySelectorAll('.e-book.active').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
        } else {
          const ebookPath = item.getAttribute('data-ebook');
          if (ebookPath) openEbookPopup(ebookPath);
        }
      } else {
        const ebookPath = item.getAttribute('data-ebook');
        if (ebookPath) openEbookPopup(ebookPath);
      }
    });
  });

  //슬라이드 배치
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    breakpoints: {
      // 모바일: 600px 이하
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
          fill: 'row'
        }
      },
      // 태블릿: 601~1024px
      601: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
          fill: 'row'
        }
      },
      // 웹: 1025px 이상
      1025: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        grid: {
          rows: 2,
          fill: 'row'
        }
      }
    }
  });
});

// iframe의 높이를 자동 조정하는 함수
function adjustIframeHeight(iframe){
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
}

// iframe 팝업 닫기 함수 (부모 창에서 정의)
function closeEbookPopup() {
  $('#ebookPopupOverlay').fadeOut();
  $('#ebookIframe').attr('src', '');
}