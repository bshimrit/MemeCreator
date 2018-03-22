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
var gCurTeamIdx = 0;
var gteams = [
    {
        id: 1,
        url: 'img/team/5.jpg',
        name: 'Ilana',
        title: 'developer',
        description: 'Hi! My name is Ilana. I\'m a junior developer, experienced\
        in the languages: Javascript, html and css.I have previous occupational experience with C#, sql and visual basic.\
        I am also familliar with several.Net Technologies, including: MVC, Web Api and winforms.\
        I am currentlly studying in \'Coding academy\' to become a web developer.I have finished a .Net course in Hacker-u.\
        In addition, I have a degree in Biology from the \'Tel-Aviv\' University, and experience in working in a medical laborotory.\
        I always aspire to become better at what I do. I enjoy working in a team, and learning new things.\
        I am responsible, organized, independant, and can be an asset to any team.',
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
        description: 'I am an Industrial engineer who quickly discovered my real passion is development.\
        I have a 10+ year exprience in software development, implementation and product management.\
        I have recently joined the web development community and looking forward to making the best of this fresh start,\
        while putting my experience to use in this new and exciting world.',
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

    imgs.push(createImg('img/meme/img01.jpg', ['cartoon', 'surprised', 'yelling','All']));
    imgs.push(createImg('img/meme/img02.jpg', ['dog', 'cute','animal','All']));
    imgs.push(createImg('img/meme/img03.jpg', ['what?', 'angry', 'black','All']));
    imgs.push(createImg('img/meme/img04.jpg', ['matrix', 'movie','All']));
    imgs.push(createImg('img/meme/img05.jpg', ['cartoon', 'movie', 'spiderman','All']));
    imgs.push(createImg('img/meme/img06.jpg', ['cartoon', 'movie', 'toy story','one day','All']));
    imgs.push(createImg('img/meme/img07.jpg', ['cartoon', 'batman', 'slap','All']));
    imgs.push(createImg('img/meme/img08.jpg', ['cute', 'cat', 'animal', 'cartoon','All']));
    imgs.push(createImg('img/meme/img09.jpg', ['dance', 'kids', 'black','cute','All']));
    imgs.push(createImg('img/meme/img10.jpg', ['Haim', 'tv', 'יצאת צדיק']));

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
        strHtml = `<img  class="pointer" id="${img.id}" src="${img.url}" onclick="openMemeEditor(this)"/>`;
        return strHtml;
    });

    var elImgGrid = document.querySelector('.img-grid');
    elImgGrid.innerHTML = strHtmls.join('');
}

function searchImgInput() {
    var searchValue = document.querySelector('.search input').value;
    searchImg(searchValue);
}

function renderWords(imgs) {
    var MIN_SIZE = 15;
    var keywords = createKeywordsForImgs(imgs);
    var wordCountMap = createkeywordsMap(keywords);
    var strHtmls = '';

    for (var key in wordCountMap) {
        var count = wordCountMap[key];
        strHtmls += `<span class="pointer" style="font-size: ${MIN_SIZE * count}px" onclick="searchImg('${key}')">${key}</span>`;
    }

    var wordsCloud = document.querySelector('.filter-cloud');
    wordsCloud.innerHTML = strHtmls;
}

function searchImg(searchValue) {
    var filteredImgs = [];  
    if (searchValue === ''){
        filteredImgs = gImgs;
    } else {
        filteredImgs = gImgs.filter(function (img) {
            return img.keywords.indexOf(searchValue) !== -1;
        });
    }

    renderImgs(filteredImgs);
}

function addImg() {
    var elImgInput = document.querySelector('#imgFiles');
    // var filename = elImgInput.value.replace(/^.*[\\\/]/, '');
    // gImgs.push(createImg('img/meme/' + filename, []));
    gImgs.push(createImg(elImgInput.value,['All']));
    renderImgs(gImgs);
    elImgInput.value = '';
}

function openMemeEditor(elImg) {
    updMeme(elImg);
    renderMeme(gMeme);
    changeMainView();
    
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
        // debugger;
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
    var rightX = width - gMeme.txts[idx].size - INITIAL_X;
    var centerX = width / 2 - gMeme.txts[idx].size;
    
    // debugger;

    switch (direction) {
        case 'right':
            gMeme.txts[idx].x = rightX;
            gMeme.txts[idx].align = 'end';
            break;

        case 'center':
            gMeme.txts[idx].x = centerX;
            gMeme.txts[idx].align = 'center';
            break;

        default:
            gMeme.txts[idx].x = INITIAL_X;
            gMeme.txts[idx].align = 'start';
    }
    renderMeme(gMeme);
}

function getIdxFromStr(idxStr) {
    var idx = +idxStr.substring((0, idxStr.lastIndexOf('-') + 1));
    return idx;
}

function toggleWin(elObject) {
    elObject.classList.toggle('open');
    elObject.classList.toggle('close');
}

function changeMainView(){
    toggleWin(document.querySelector('.img-wrapper'));
    toggleWin(document.querySelector('.meme-container'));
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
    context.textAlign = txt.align;
    context.font = txt.size + "px" + " " + txt.font;
    context.shadowColor = txt.shadowColor;
    context.shadowBlur = txt.blur;
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
    var options = renderOptions();

    return `
    <div class="meme-txt-wrapper">  
        <div>
            <input type="text" class="meme-line-txt" id="txt-input-${idx}" placeholder="${txt}" oninput="changeMemeText(this)"></input>
        </div>
        <div class="txt-ctrl flex justify-start flex-wrap" id=txt-${idx}>
            <button id="btn-left-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'left')"></button>
            <button id="btn-center-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'center')"></button>
            <button id="btn-right-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'right')"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="increaseFont(${idx})"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="decreaseFont(${idx})"></button>
            <input class="base-btn base-btn-small" type="color" name="color" id="input-color-${idx}" onchange="changeFontColor(this, ${idx})" value="${gMeme.txts[idx].color}"></input>
            <button class="fa clear-btn base-btn base-btn-small" onclick="moveUp(${idx})"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="moveDown(${idx})"></button>
            <button id=btn-${idx} class="fa clear-btn base-btn base-btn-small" onclick="deleteLine(this)"></button>
            <label class="fa cb-container">Shadow
                <input  type="checkbox" onchange="switchShadow(this,${idx})">
                <span class="checkmark"></span>
            </label>
            </div>
            <form>
            <label class="fa" for="txt-font"></label>
            <select id = "font" onchange = "changeFont(this,${idx})">
             ${options}
            </select>
             </form>
    </div>
    `;
}

function renderOptions() {
    var fonts = [{fontName: "impactRegular", displayedText: "Impact"},
    {fontName: "Verdana", displayedText: "Verdana"},
    {fontName: "Comic Sans MS", displayedText: "Comic Sans MS"},
    {fontName: "Times New Roman", displayedText: "Times New Roman"},
    {fontName: "Arial Black", displayedText: "Arial Black"}
    ];

    var strHtmls = '';
    var options = fonts.map(function (font) {
        strHtmls += `<option value ="${font.fontName}">${font.displayedText}</option>`;
    });

    return strHtmls;
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
    var height = getCanvasHeight();
    var max = (gMeme.txts.length > 0) ? INITIAL_BOTTOM_Y - gMeme.txts[gMeme.txts.length - 1].size : height;

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
    renderMeme(gMeme);
}

function createNewLineObject(x, y) {
    return {
        line: 'Your text will appear here',
        size: 20,
        font: 'impactRegular',
        align: 'center',
        color: '#ffffff',
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

function renderTeamMemeber(team, idx) {
    // flex space-between align-start
    // <div class="shape_row_even">
    //         <div class="center">
    //             <div class="about-img shape">
    //                 <div class="shape1">
    //                     <div class="shape2" style="background: url('${team.url}') center no-repeat"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    return `
    <div id="team-${idx}" class="${idx ? 'close' : 'open'} flex space-between align-start">
        <div class="about-img">
        <img src=${team.url} />
        </div>
            <div class="about-info flex flex-column justify-end" id="about">
                <div class="info">
                <h1>${team.name}</h1>
                <h2>${team.title}</h2>
                <p>${team.description}</p>
                </div>
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
            <button class="fa pointer clear-btn" onclick="changeTeamMember()"></button>
        </div>
    </div>
    `;
}

function downloadCanvas(elBtn) {
    var dataURL = document.getElementById('meme-canvas').toDataURL();
    elBtn.href = dataURL;
}

function changeTeamMember(){
    var elCurTeamMember = document.getElementById('team-'+ gCurTeamIdx);
    toggleWin(elCurTeamMember);
    
    gCurTeamIdx++;
    gCurTeamIdx = (gCurTeamIdx >= gteams.length ? 0 : gCurTeamIdx);
    var elTeamMember = document.getElementById('team-' + gCurTeamIdx);
    toggleWin(elTeamMember);

}
