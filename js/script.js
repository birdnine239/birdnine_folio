$(function(){
    // $('.main_menu>li').mouseenter(function(){
    //     $('header').find('.sub_menu').stop().slideDown('main');
    // })
    // $('.main_menu>li').mouseleave(function(){
    //     $('header').find('.sub_menu').stop().slideUp();
    // })

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
})

function applyDynamicPaddingFromDataAttr() {
  document.querySelectorAll('[data-padding]').forEach(el => {
    const [yRatio, xRatio] = el.dataset.padding.split(' ').map(parseFloat);
    const height = el.offsetHeight;
    const width = el.offsetWidth;

    el.style.paddingTop = `${height * yRatio}px`;
    el.style.paddingBottom = `${height * yRatio}px`;
    el.style.paddingLeft = `${width * xRatio}px`;
    el.style.paddingRight = `${width * xRatio}px`;
  });
}

window.addEventListener('load', () => {
  applyDynamicPaddingFromDataAttr();
  setTimeout(applyDynamicPaddingFromDataAttr, 100);
});
window.addEventListener('resize', applyDynamicPaddingFromDataAttr);
