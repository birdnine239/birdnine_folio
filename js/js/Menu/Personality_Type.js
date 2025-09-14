import { loadResponsiveCssSet } from '../css.js';

export function renderPersonality_Type(container) {
  loadResponsiveCssSet('Personality_Type', 'Menu');

  container.innerHTML = `
    <div id="MBTI">
      <div class="Personality_Type_title">
        <img class="Personality_Type_icon" src="./img/Menu/Personality_Type/MBTI.png" alt="MBTI">
        <p>MBTI</p>
      </div>

      <div id="MBTI_graph">
        <div class="chart">
          <img src="./img/Menu/Personality_Type/MBTI_chart.png" alt="MBTI 그래프">
          <div class="bar">
            <div class="bar-left"> 
              <div class="extraversion"></div>
              <div class="sensing"></div>
              <div class="thinking"></div>
              <div class="judging"></div>
            </div>
            <div class="bar-right">
              <div class="introversion"></div>
              <div class="intuition"></div>
              <div class="feeling"></div>
              <div class="perceiving"></div>
            </div>
          </div>
          
          <div class="text">
            <div class="text-left">
              <p class="ESTJ"><span class="bar-value">4</span>외향(<strong class="alphabet">E</strong>xtraversion)</p>
              <p class="ESTJ"><span class="bar-value">29</span>감각(<strong class="alphabet">S</strong>ensing)</p>
              <p class="ESTJ"><span class="bar-value">32</span>사고(<strong class="alphabet">T</strong>hinking)</p>
              <p class="ESTJ"><span class="bar-value">24</span>판단(<strong class="alphabet">J</strong>udging)</p>
            </div>
            <div class="text-right">
              <p class="INFP">내향(<strong class="alphabet">I</strong>ntroversion)<span class="bar-value">24</span></p>            
              <p class="INFP">직관(i<strong class="alphabet">N</strong>tuition)<span class="bar-value">2</span></p>
              <p class="INFP">감정(<strong class="alphabet">F</strong>eeling)<span class="bar-value">0</span></p>
              <p class="INFP">인식(<strong class="alphabet">P</strong>erceiving)<span class="bar-value">6</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="Personality_Type_explanation">
        <p>
          <span>결과 : </span>
          <strong>ISTJ</strong>로 사실에 대하여 정확하고 체계적으로 기억하며, 일처리도 신중하고 책임감이 강하며, 관례적이고, 보수적이며 일상적인 업무에 대해 인내력이 강한 것으로 나왔습니다.
        </p>
      </div>
    </div>

    <div id="Enneagram">
      <div class="Personality_Type_title">
        <img class="Personality_Type_icon" src="./img/Menu/Personality_Type/Enneagram.gif" alt="에니어그램(Enneagram)">
        <p>에니어그램(Enneagram)</p>
      </div>

      <div id="Enneagram_graph">
        <div class="chart">
          <img src="./img/Menu/Personality_Type/Enneagram_chart.png" alt="Enneagram 그래프">
          <svg></svg>
        </div>
      </div>

      <div class="Personality_Type_explanation">
        <p>
          <span>결과 : </span>
          <strong>5. 사색가 유형</strong>으로 지각력이 있고 사색적인 유형입니다. 경각심과 통찰력이 있고 호기심이 많으며, 복잡한 생각이나 기술을 발전시키는데 집중하는 능력이 탁월한 것으로 나왔습니다. 또한, <strong>6. 충성가 유형</strong>이 날개로 충성하고 안전을 중시하는 성향이 높은 것으로 나타났습니다.
        </p>
      </div>
    </div>
  `;

  // ✅ 그래프 그리기 실행 부분 추가
  const svgElem = container.querySelector('#Enneagram_graph .chart svg');
  drawEnneagram(svgElem);

  // 반응형 대응
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => drawEnneagram(svgElem));
    ro.observe(svgElem);
  } else {
    window.addEventListener('resize', () => drawEnneagram(svgElem));
  }
}

const enneagramValues = [21, 33, 22, 39, 37, 19, 30, 34, 32];

function drawEnneagram(svg) {
  if (!svg) return;

  while (svg.firstChild) svg.removeChild(svg.firstChild);

  const rect = svg.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  if (w === 0 || h === 0) return; // 크기가 0이면 리턴

  const maxValue = 43;
  const count = enneagramValues.length; // 9개

  // X 좌표: 9등분하여 각 점을 중앙에 배치
  const xs = [];
  for (let i = 0; i < count; i++) {
    xs.push(((i * 2) + 1) * w / (count * 2));
  }

  // Y 좌표: 43등분하여 값에 따른 높이로 배치 (값이 클수록 위로)
  const ys = enneagramValues.map(v => h - (v / maxValue) * h);

  // 개별 선분들 생성 (CSS 애니메이션과 맞추기 위해)
  for (let i = 0; i < count - 1; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', xs[i]);
    line.setAttribute('y1', ys[i]);
    line.setAttribute('x2', xs[i + 1]);
    line.setAttribute('y2', ys[i + 1]);
    line.classList.add('enneagram-line', `animate-line-${i}`);
    svg.appendChild(line);
  }

  // 점과 숫자 생성
  const belowValues = [21, 22, 19]; // 점 아래에 위치할 값들

  enneagramValues.forEach((v, i) => {
    const cx = xs[i], cy = ys[i];

    // 점 생성
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', 6);
    circle.classList.add('enneagram-point', `group-${Math.floor(i/3)+1}`, `animate-point-${i}`);
    svg.appendChild(circle);

    // 숫자 생성
    const valueText = document.createElementNS('http://www.w3.org/2000/svg','text');
    valueText.setAttribute('x', cx);
    
    if (belowValues.includes(v)) {
      valueText.setAttribute('y', cy + 20); // 점 아래
    } else {
      valueText.setAttribute('y', cy - 10); // 점 위
    }
    
    valueText.classList.add('enneagram-value', `animate-text-${i}`);
    valueText.textContent = String(v);
    svg.appendChild(valueText);
  });
}