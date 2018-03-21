/* */
'use strict'

var gNextId;
var gImgs;

var gMeme = {
    selectedImgId: 0,
    txts: [newLineObject(20, 40),
    newLineObject(20, 80)]
};

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
    // var elCanvas = document.getElementById('meme-canvas');
    // var height = elCanvas.height;
    var height = getCanvasHeight();

    return {
        selectedImgId: 0,
        txts: [newLineObject(20, 40),
        newLineObject(20, height - 70)]
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
    gImgs.push(createImg('img/' + filename, []));
    renderImgs(gImgs);
    elImgInput.value = '';
}

function openMemeEditor(elImg) {
    updMeme(elImg);
    drawImageWithText();
    toggleWin();
}

function updMeme(elImg) {
    gMeme.selectedImgId = parseInt(elImg.id);
}

function removeAligns(elPicTxt) {
    elPicTxt.classList.remove('align-text-right');
    elPicTxt.classList.remove('align-text-left');
    elPicTxt.classList.remove('align-text-center');
}


function drawImageWithText(el, direction) {
    var canvas = document.getElementById('meme-canvas');
    var context = canvas.getContext('2d');
    var memeImg = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    });
    var img = new Image();
    img.src = memeImg.url;

    img.onload = function () {
        context.drawImage(img, 0, 0, 400, 360);
        //debugger;
        if (el) {
            var idxStr = el.id;
            var width = getCanvasWidth();
            var idx = getIdxFromStr(idxStr);
            var elInput = document.getElementById('txt-input-' + idx);
            gMeme.txts[idx].line = elInput.value;

            var width = getCanvasWidth();

            //TODO: fix align according to direction
            if (direction) {
                switch (direction) {
                    case 'left':
                        context.textAlign = 'left';
                        break;

                    case 'center':
                        context.textAlign = 'center';
                        break;

                    case 'right':
                        context.textAlign = 'right';
                        break;
                }

                gMeme.txts[idx].x = width / 2;
            }

            drawTextForTxts(gMeme, context);
        };

    }
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
        var text = txt.line;
        var x = txt.x;
        var y = txt.y;
        var size = txt.size;
        drawTextForTxt(text, context, x, y, size);
    })
}

function drawTextForTxt(text, context, x, y, size) {
    context.fillStyle = "#000";
    context.lineStyle = "#ffff00";
    context.font = size + "px sans-serif";
    if (!text) text = "enter your text here";
    context.fillText(text, x, y);
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
        <input class="meme-line-txt" id="txt-input-${idx}" placeholder="${txt}" onkeydown="drawImageWithText(this)"></input>
        <div clas="txt-ctrl flex justify-center" id=txt-${idx}>
            <button id="btn-left-${idx}" onclick="drawImageWithText(this, 'left')">left</button>
            <button id="btn-center-${idx}" onclick="drawImageWithText(this, 'center')">center</button>
            <button id="btn-right-${idx}" onclick="drawImageWithText(this, 'right')">right</button>
            <button onclick="increaseFont(${idx})">+</button>
            <button onclick="decreaseFont(${idx})">-</button>
            <input type="color"></input>
            <label for="txt-shadow">Text shadow</label>
            <input type="checkbox" name="txt-shadow"></input>
            <label for="txt-font">Font</label>
            <input type="text" name="txt-font"></input>
            <button>up</button>
            <button>down</button>
            <button id=btn-${idx} onclick="deleteLine(this)">Delete</button>
        </div>
    </div>
    `;
}

function increaseFont(idx) {
    var elInput = document.getElementById('txt-input-' + idx);
    var MAX_VAL = 50;

    if (gMeme.txts[idx].size < MAX_VAL) {
        gMeme.txts[idx].size++;
        drawImageWithText(elInput);
    }
}

function decreaseFont(idx) {
    var elInput = document.getElementById('txt-input-' + idx);
    var MIN_VAL = 18;

    if (gMeme.txts[idx].size > MIN_VAL) {
        gMeme.txts[idx].size--;
    }
    drawImageWithText(elInput);
}

function addNewLine() {
    gMeme.txts.push(newLineObject(0, 0));
    var idx = gMeme.txts.length - 1;

    var elEditTxtCon = document.querySelector('.edit-txt-container');
    elEditTxtCon.innerHTML += renderNewLine(gMeme.txts[idx].line, idx);
}

function deleteLine(elBtn) {
    var idx = elBtn.id.split('-')[1];
    gMeme.txts.splice(idx, 1);
    renderTxtContainer();
}

function newLineObject(x, y) {
    return {
        line: 'Enter your text here',
        size: 20,
        align: 'center',
        color: '#fff',
        shadow: false,
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
        <img class="shape" src=${team.url} />
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
    // debugger;
    var dataURL = document.getElementById('meme-canvas').toDataURL();
    elBtn.href = dataURL;
}

