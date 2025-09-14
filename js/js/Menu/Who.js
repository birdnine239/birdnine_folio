import { loadResponsiveCssSet } from '../css.js';

export function renderWhho(container) {
  loadResponsiveCssSet('Who', 'Menu');

  container.innerHTML = `
    <div class="top">
        <div id="Education">
            <div class="Who_title">
                <img src="./img/Menu/Who/Education.png" alt="학력사항">
                <p>학력사항(Education)</p>
            </div>

            <img class="content" src="./img/Menu/Who/Education_content.png" alt="학력사항 Content">
        </div>

        <div id="Career">
            <div class="Who_title">
                <img src="./img/Menu/Who/Career.png" alt="경력사항">
                <p>경력사항(Career)</p>
            </div>

            <img class="content" src="./img/Menu/Who/Career_content.png" alt="경력사항 Content">
        </div>

        <div id="Credentials">
            <div class="Who_title">
                <img src="./img/Menu/Who/Credentials.png" alt="자격사항">
                <p>자격사항(Credentials)</p>
            </div>

            <img class="content" src="./img/Menu/Who/Credentials_content.png" alt="자격사항 Content">
        </div>
        
        <div id="Hobby">
            <div class="Who_title">
                <img src="./img/Menu/Who/Hobby.png" alt="취미">
                <p>취미(Hobby)</p>
            </div>

            <img class="content" src="./img/Menu/Who/Hobby_content.png" alt="취미 Content">
        </div>
    </div>

    <div class="bottom">
        <div id="Computer_Skills">
            <div class="Who_title">
                <img src="./img/Menu/Who/Computer_Skills.png" alt="컴퓨터 활용능력">
                <p>컴퓨터 활용능력(Computer Skills)</p>
            </div>

            <div class="contents">
                <img src="./img/Menu/Who/Computer_Skills_contents01.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents02.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents03.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents04.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents05.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents06.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents07.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents08.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents09.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents10.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents11.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents12.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents13.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents14.png" alt="컴퓨터 활용능력 Contents">
                <img src="./img/Menu/Who/Computer_Skills_contents15.png" alt="컴퓨터 활용능력 Contents">
            </div>
        </div>
    </div>
  `;
}