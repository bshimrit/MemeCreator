/* */
'use strict'

var SHADOW_COLOR = "black";
var BLUR = 20;
var INITIAL_X = 20;
var INITIAL_TOP_Y = 40;
var INITIAL_BOTTOM_Y = 270;

var gNextId;
var gImgs;
var gMeme;
var gteams = [
    {
        id: 1,
        url: 'img/team/1.jpg',
        name: 'Ilana',
        title: 'developer',
        description: 'I do everything!',
        facebook: '',
        twitter: '',
        google: '',
        pintrest: '',
        linkedin: '',
        dribbble: ''
    },
    {
        id: 1,
        url: 'img/team/2.jpg',
        name: 'Shimrit',
        title: 'developer',
        description: 'I do everything!',
        facebook: '',
        twitter: '',
        google: '',
        pintrest: '',
        linkedin: '',
        dribbble: ''
    }

];

function init() {
    gNextId = 0;
    gMeme = creategMeme();
    gImgs = createImgs();
    renderImgs(gImgs);
    renderWords(gImgs);
    renderTxtContainer();
    renderTeam();

}

function creategMeme() {
    return {
        selectedImgId: 0,
        txts: [createNewLineObject(INITIAL_X, INITIAL_TOP_Y),
        createNewLineObject(INITIAL_X, INITIAL_BOTTOM_Y)]
    }
}

function getCanvasHeight() {
    var elCanvas = document.getElementById('meme-canvas');
    var height = elCanvas.height;
    return height;
}

function getCanvasWidth() {
    var elCanvas = document.getElementById('meme-canvas');
    var width = elCanvas.width;
    return width;
}

function createImgs() {
    var imgs = [];

    imgs.push(createImg('img/meme/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat', 'field', 'sky']));

    //TODO: fix data
    imgs.push(createImg('img/meme/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat', 'field', 'sky']));
    imgs.push(createImg('img/meme/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat', 'field', 'sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat', 'field', 'sky']));

    return imgs;
}

function createImg(url, keywords) {
    return {
        id: ++gNextId,
        url: url,
        keywords: keywords
    };
}

function createkeywordsMap(keywords) {
    var wordCountMap = keywords.reduce(function (acc, val) {
        acc[val] = (acc[val]) ? ++acc[val] : 1;
        return acc;
    }, {});

    return wordCountMap;
}

function createKeywordsForImgs(imgs) {
    var keywords = [];

    imgs.forEach(function (img) {
        (img.keywords).forEach(function (keyword) {
            keywords.push(keyword);
        });
    });

    return keywords;
}

function renderImgs(imgs) {
    var strHtml = '';

    var strHtmls = imgs.map(function (img, idx) {
        strHtml = `<img  id="${img.id}" src="${img.url}" onclick="openMemeEditor(this)"/>`;
        return strHtml;
    });
    // strHtmls.push(`<img src="img/addimg.png" onclick="addImg()"/>`);

    var elImgGrid = document.querySelector('.img-grid');
    elImgGrid.innerHTML = strHtmls.join('');
}

function searchImgInput() {
    var searchValue = document.querySelector('.search input').value;
    searchImg(searchValue);
}

function renderWords(imgs) {
    var MIN_SIZE = 5;
    var keywords = createKeywordsForImgs(imgs);
    var wordCountMap = createkeywordsMap(keywords);
    var strHtmls = '';

    for (var key in wordCountMap) {
        var count = wordCountMap[key];
        strHtmls += `<span style="font-size: ${MIN_SIZE * count}px" onclick="searchImg('${key}')">${key}</span>`;
    }

    var wordsCloud = document.querySelector('.filter-cloud');
    wordsCloud.innerHTML = strHtmls;
}

function searchImg(searchValue) {
    var filteredImgs = gImgs.filter(function (img) {
        return img.keywords.indexOf(searchValue) !== -1;
    });

    renderImgs(filteredImgs);
}

function addImg() {
    var elImgInput = document.querySelector('#imgFiles');
    var filename = elImgInput.value.replace(/^.*[\\\/]/, '');
    gImgs.push(createImg('img/meme/' + filename, []));
    renderImgs(gImgs);
    elImgInput.value = '';
}

function openMemeEditor(elImg) {
    updMeme(elImg);
    renderMeme(gMeme);
    toggleWin();
}

function updMeme(elImg) {
    gMeme.selectedImgId = parseInt(elImg.id);
}



function renderMeme(meme) {
    var canvas = document.getElementById('meme-canvas');
    var context = canvas.getContext('2d');
    var memeImg = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    });
    var img = new Image();
    img.src = memeImg.url;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        drawTextForTxts(gMeme, context);
    }
}
function changeMemeText(elInput) {
    var idxStr = elInput.id;
    var width = getCanvasWidth();
    var idx = getIdxFromStr(idxStr);
    gMeme.txts[idx].line = elInput.value;

    renderMeme(gMeme);
}

function alignText(idx, direction) {
    var width = getCanvasWidth();

    switch (direction) {
        case 'right':
            gMeme.txts[idx].x = width - 50;
            gMeme.txts[idx].align = 'end';
            break;
        case 'center':
            gMeme.txts[idx].x = width / 2
            gMeme.txts[idx].align = 'center';
            break;
        default:
            gMeme.txts[idx].x = 20;
            gMeme.txts[idx].align = 'start';
    }

    renderMeme(gMeme);
}

function getIdxFromStr(idxStr) {
    var idx = +idxStr.substring((0, idxStr.lastIndexOf('-') + 1));
    return idx;
}

function toggleWin() {
    var elOpen = document.querySelector('.open');
    var elClose = document.querySelector('.close');
    elOpen.classList.toggle('open');
    elOpen.classList.toggle('close');
    elClose.classList.toggle('open');
    elClose.classList.toggle('close');
}

function drawTextForTxts(gMeme, context) {
    gMeme.txts.forEach(function (txt) {
        drawTextForTxt(context, txt);
    })
}

function drawTextForTxt(context, txt) {
    context.fillStyle = txt.color;
    context.lineStyle = "#ffff00";
    // context.font = txt.size + "px sans-serif";
    context.font = txt.size + "px" + " " + txt.font;
    context.shadowColor = txt.shadowColor;
    context.shadowBlur = txt.blur;
    if (!txt.line) txt.line = "Your text will appear here";
    context.fillText(txt.line, txt.x, txt.y);
}

function renderTxtContainer() {
    var strHtml = '';
    var strHtmls = gMeme.txts.map(function (txt, idx) {
        strHtml = renderNewLine(txt.line, idx);
        return strHtml;
    });

    var elEditTxtCon = document.querySelector('.edit-txt-container');
    elEditTxtCon.innerHTML = strHtmls.join('');
}

function renderNewLine(txt, idx) {
    var width = getCanvasWidth();

    return `
    <div class="meme-txt-wrapper">  
        <input class="meme-line-txt" id="txt-input-${idx}" placeholder="${txt}" oninput="changeMemeText(this)"></input>
        <div clas="txt-ctrl flex justify-center" id=txt-${idx}>
            <button id="btn-left-${idx}" onclick="alignText(${idx}, 'left')">left</button>
            <button id="btn-center-${idx}" onclick="alignText(${idx}, 'center')">center</button>
            <button id="btn-right-${idx}" onclick="alignText(${idx}, 'right')">right</button>
            <button onclick="increaseFont(${idx})">+</button>
            <button onclick="decreaseFont(${idx})">-</button>
            <label for="color">Color</label>
            <input type="color" name="color" id="input-color-${idx}" onchange="changeFontColor(this, ${idx})"></input>
            </br>
            <label for="txt-shadow-color">Text shadow</label>
            <input type="checkbox" name="txt-shadow" onchange="switchShadow(this,${idx})"></input>
            <label for="txt-font">Font</label>
            <form>
            <select id = "font" onchange = "changeFont(this,${idx})">
             <option value = "Arial">Arial</option>
             <option value = "David">David</option>
            </select>
             </form>
            <button onclick="moveUp(${idx})">up</button>
            <button onclick="moveDown(${idx})">down</button>
            <button id=btn-${idx} onclick="deleteLine(this)">Delete</button>
        </div>
    </div>
    `;
}

function getElInput(idx) {
    return document.getElementById('txt-input-' + idx);
}

function changeFont(elFont, idx) {
    gMeme.txts[idx].font = elFont.value;
    renderMeme(gMeme);
}


function switchShadow(elShadow, idx) {
    if (elShadow.checked) {
        gMeme.txts[idx].blur = BLUR;
        gMeme.txts[idx].shadowColor = SHADOW_COLOR;

    } else {
        gMeme.txts[idx].blur = 0;
        gMeme.txts[idx].shadowColor = "rgba(0,0,0,0)";
    }
    renderMeme(gMeme);
}

function moveUp(idx) {
    var elInput = getElInput(idx);
    if (gMeme.txts[idx].y > gMeme.txts[idx].size) gMeme.txts[idx].y--;
    renderMeme(gMeme);
}

function moveDown(idx) {
    var elInput = getElInput(idx);
    var height = getCanvasHeight();
    var max = (height - gMeme.txts[idx].size);
    if (gMeme.txts[idx].y < (height - 5)) {
        gMeme.txts[idx].y++;
        renderMeme(gMeme);
    }
}

function increaseFont(idx) {
    var elInput = getElInput(idx);
    var MAX_VAL = 50;

    if (gMeme.txts[idx].size < MAX_VAL) {
        gMeme.txts[idx].size++;
        renderMeme(gMeme);
    }
}

function decreaseFont(idx) {
    var elInput = getElInput(idx);
    var MIN_VAL = 18;

    if (gMeme.txts[idx].size > MIN_VAL) {
        gMeme.txts[idx].size--;
        renderMeme(gMeme);
    }
}

function changeFontColor(elFontColor, idx) {
    gMeme.txts[idx].color = elFontColor.value;
    renderMeme(gMeme);
}

function addNewLine() {
    var y = calcNewY();
    var max = INITIAL_BOTTOM_Y - gMeme.txts[gMeme.txts.length - 1].size;
    if (y < max) {
        gMeme.txts.push(createNewLineObject(INITIAL_X, y));
        renderMeme(gMeme);

        var idx = gMeme.txts.length - 1;
        var elEditTxtCon = document.querySelector('.edit-txt-container');
        elEditTxtCon.innerHTML += renderNewLine(gMeme.txts[idx].line, idx);
    }
}

function calcNewY() {
    var y = gMeme.txts.reduce(function (acc, txt) {
        acc += txt.size;
        return acc;
    }, INITIAL_TOP_Y)

    return y;
}

function deleteLine(elBtn) {
    var idx = elBtn.id.split('-')[1];
    gMeme.txts.splice(idx, 1);
    renderTxtContainer();
}

function createNewLineObject(x, y) {
    return {
        line: 'Your text will appear here',
        size: 20,
        font: 'sans-serif',
        align: 'center',
        color: '#fff',
        shadowColor: "rgba(0,0,0,0)",
        blur: 0,
        x: x,
        y: y
    }
}

function renderTeam() {
    var strHtml = '';
    var strHtmls = gteams.map(function (team, idx) {
        strHtml = renderTeamMemeber(team, idx);
        return strHtml;
    });

    var elAbout = document.querySelector('.about-container');
    elAbout.innerHTML = strHtmls.join('');
}

function renderTeamMemeber(team) {
    return `
        <div class="about-img">
        <img src=${team.url} />
        </div>
        <div class="about-info flex flex-column align-start" id="about">
            <h1>${team.name}</h1>
            <h2>${team.title}</h2>
            <p>${team.description}</p>
            <div class="social flex">
                <ul class="clean-list inline-flex">
                    <li class="fa facebook pointer flex justify-center align-center">
                        <a href="${team.facebook}"></a>
                    </li>
                    <li class="fa twitter pointer flex justify-center align-center">
                        <a href="${team.twitter}"></a>
                    </li>
                    <li class="fa google-plus pointer flex justify-center align-center">
                        <a href="${team.google}"></a>
                    </li>
                    <li class="fa pinterest pointer flex justify-center align-center">
                        <a href="${team.pintrest}"></a>
                    </li>
                    <li class="fa linkedin pointer flex justify-center align-center">
                        <a href="${team.linkedin}"></a>
                    </li>
                    <li class="fa dribbble pointer flex justify-center align-center">
                        <a href="${team.dribble}"></a>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

function downloadCanvas(elBtn) {
    var dataURL = document.getElementById('meme-canvas').toDataURL();
    elBtn.href = dataURL;
}

