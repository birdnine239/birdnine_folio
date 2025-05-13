$(function(){
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

    const divs = document.querySelectorAll('header, .mobile_menu, main');

    divs.forEach(div => {
      const text = div.querySelectorAll('p');
      const subMenuText = div.querySelectorAll('.sub_menu p, .mobile_sub_menu p');
    
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
    
          // 폰트 크기 계산
          const fontSize = Math.max(20, Math.min(width / 30, 25));
    
          text.forEach(p => {
            p.style.fontSize = `${fontSize}px`;
          });
          subMenuText.forEach(p => {
            p.style.fontSize = `${fontSize - 5}px`;
          });
        }
      });
    
      resizeObserver.observe(div);
    });
    
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
  });

// iframe의 높이를 자동 조정하는 함수
function adjustIframeHeight(iframe){
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
}