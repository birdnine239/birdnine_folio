import { renderWhho } from './Menu/Who.js';
import { renderPersonality_Type } from './Menu/Personality_Type.js';

import { renderHangul } from './Portfolio/Hangul.js';
import { renderInDesign } from './Portfolio/InDesign.js';
import { renderPowerPoint } from './Portfolio/PowerPoint.js';
import { renderExcel } from './Portfolio/Excel.js';
import { renderIllustrator } from './Portfolio/Illustrator.js';
import { renderSketchUP } from './Portfolio/SketchUP.js';
import { renderStable_Diffusion } from './Portfolio/Stable_Diffusion.js';

const routeMap = {
  'Who': renderWhho,
  'Personality_Type': renderPersonality_Type,
  
  'Portfolio_Hangul': renderHangul,
  'Portfolio_InDesign': renderInDesign,
  'Portfolio_PowerPoint': renderPowerPoint,
  'Portfolio_Excel': renderExcel,
  'Portfolio_Illustrator': renderIllustrator,
  'Portfolio_SketchUP': renderSketchUP,
  'Portfolio_Stable_Diffusion': renderStable_Diffusion,
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const pageKey = link.dataset.page;
      const renderFunc = routeMap[pageKey];

      if (renderFunc) {
        const show = document.querySelector('.show');
        if (show) show.style.display = 'none';

        const main = document.querySelector('main');
        if (main) {
          if (pageKey === 'Personality_Type') {
            main.style.display = 'flex';
            main.style.justifyContent = 'space-between'; // CSS에 맞춰줌
          } else {
            main.style.display = 'block';  // 나머지는 block
            main.style.justifyContent = ''; // 혹시 남아있을 justify 제거
          }
          
          renderFunc(main);
        }

      } else {
        console.warn(`페이지 '${pageKey}'를 렌더링할 함수가 없습니다.`);
      }
    });
  });
});