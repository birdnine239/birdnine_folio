$(function(){
    $('.main_menu>li').eq(2).hover(
      function(){
        $('header .sub_menu').stop().slideDown();
      },
      function(){
        setTimeout(() => {
          if (!$('header .sub_menu:hover').length){
            $('header .sub_menu').slideUp();
          }
        }, 100);
      });

      $('.sub_menu').hover(
        function(){
          $(this).stop().slideDown();
        },
        function(){
          $(this).slideUp();
        });

    const div = document.querySelector('header');
    const text = div.querySelectorAll('p');
    const subMenuText = div.querySelectorAll('.sub_menu p');

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        // 폰트 크기 계산 방식 (비율 조절 가능)
        const fontSize = Math.max(15, Math.min(width / 30, 25)); // 비율: 너비의 1/20
        text.forEach(p => {
            p.style.fontSize = `${fontSize}px`;
        });
        subMenuText.forEach(p => {
            p.style.fontSize = `${fontSize -5}px`;
        });
      }
    });

    resizeObserver.observe(div);

    $('header a').click(function(e){
      var targetPage = $(this).attr('href'); // 클릭한 링크의 href 값 가져오기

      if (targetPage === './index.html'){ // 홈 클릭 시 원래 화면으로 복귀
        e.preventDefault();
        window.location.href = './index.html';
        return;
      } 
      
      if (!targetPage || targetPage.trim() === ''){
          e.preventDefault();
          $('.show').hide();
      } else {
          e.preventDefault(); // 기본 이동 방지
          $('.show').hide(); // 기존 콘텐츠 숨기기
          $('header').show();

          if ($('main').find('iframe').length){
            $('main').find('iframe').attr('src', targetPage);
          } else {
            $('main').html('<iframe src="' + targetPage + '" scrolling="no" onload="adjustIframeHeight(this)"></iframe>'); // iframe 삽입
          }
          $('main').show();
      }
  });
})

// iframe의 높이를 자동 조정하는 함수
function adjustIframeHeight(iframe){
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
}