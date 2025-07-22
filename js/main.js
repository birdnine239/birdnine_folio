// js/main.js
import { renderHangul } from './Portfolio/Hangul.js';
import { renderInDesign } from './Portfolio/InDesign.js';
import { renderPowerPoint } from './Portfolio/PowerPoint.js';
import { renderExcel } from './Portfolio/Excel.js';
import { renderIllustrator } from './Portfolio/Illustrator.js';
import { renderSketchUP } from './Portfolio/SketchUP.js';
import { renderStable_Diffusion } from './Portfolio/Stable_Diffusion.js';
// ⬆️ 필요한 render 함수만 import 해주세요

// URL 키 이름과 함수 연결
const routeMap = {
  'Portfolio_Hangul': renderHangul,
  'Portfolio_InDesign': renderInDesign,
  'Portfolio_PowerPoint': renderPowerPoint,
  'Portfolio_Excel': renderExcel,
  'Portfolio_Illustrator': renderIllustrator,
  'Portfolio_SketchUP': renderSketchUP,
  'Portfolio_Stable_Diffusion': renderStable_Diffusion,
  // 🔁 다른 포트폴리오도 여기에 추가
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const pageKey = link.dataset.page;
      const renderFunc = routeMap[pageKey];

      if (renderFunc) {
        document.querySelector('main').style.display = 'block';
        document.querySelector('.show')?.style.display = 'none';
        renderFunc(document.querySelector('main'));
      } else {
        console.warn(`페이지 '${pageKey}'를 렌더링할 함수가 없습니다.`);
      }
    });
  });
});