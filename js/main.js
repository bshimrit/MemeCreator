/* */
'use strict'

var gNextId;
var gImgs;

var gMeme = {
    selectedImgId: 0,
    txts: [{
        line: 'Enter your text here',
        size: 20,
        align: 'left',
        color: 'red',
        x: 20,
        y: 40
    },
    {
        line: 'Enter your text here',
        size: 20,
        align: 'left',
        color: 'red',
        x: 20,
        y: 80
    }]
};

// var gteams = { id: 1, url:}

// }

function init() {
    gNextId = 0;
    gImgs = createImgs();
    renderImgs(gImgs);
    renderWords(gImgs);
}

function createImgs() {
    var imgs = [];

    imgs.push(createImg('img/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat', 'field', 'sky']));

    //TODO: fix data
    imgs.push(createImg('img/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat', 'field', 'sky']));
    imgs.push(createImg('img/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat', 'field', 'sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat', 'field', 'sky']));

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
    gMeme = updMeme(elImg);
    drawImage();
    toggleWin();
}

function updMeme(elImg) {
    return {
        selectedImgId: parseInt(elImg.id),
        txts: []
    }
}

function removeAligns(elPicTxt) {
    elPicTxt.classList.remove('align-text-right');
    elPicTxt.classList.remove('align-text-left');
    elPicTxt.classList.remove('align-text-center');
}

function alignLeft() {
    var elPicTxt = document.getElementById('div1');
    removeAligns(elPicTxt);
    elPicTxt.classList.add('align-text-left');
}

function alignRight() {
    var elPicTxt = document.getElementById('div1');
    removeAligns(elPicTxt);
    elPicTxt.classList.add('align-text-right');
}

function alignCenter() {
    var elPicTxt = document.getElementById('div1');
    removeAligns(elPicTxt);
    elPicTxt.classList.add('align-text-center');
}


function drawImage(elInput) {
    var canvas = document.getElementById('meme-canvas');
    var context = canvas.getContext('2d');
    var memeImg = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    });
    var img = new Image();
    img.src = memeImg.url;

    img.onload = function () {
        context.drawImage(img, 0, 0, 400, 360);
  
        if(elInput){
        var idxStr = elInput.id;
        var id = +idxStr.substring((0, idxStr.lastIndexOf('-') + 1));
        
        gMeme.txts[id].line = elInput.value;
        var text = gMeme.txts[id].line;
        var x = gMeme.txts[id].x;
        var y = gMeme.txts[id].y;
        drawText(text, context, x, y);
        }
    };
    context.save();
}

// Gets a string such as: '2,7' and returns {i:2, j:7}
// function getCellCoord(strCellId) {
//     var coord = {};
//     coord.i = +strCellId.substring(0, strCellId.lastIndexOf(','));
//     coord.j = +strCellId.substring(strCellId.lastIndexOf(',') + 1);
//     // console.log('coord', coord);
//     return coord;
// }

function toggleWin() {
    var elOpen = document.querySelector('.open');
    var elClose = document.querySelector('.close');
    elOpen.classList.toggle('open');
    elOpen.classList.toggle('close');
    elClose.classList.toggle('open');
    elClose.classList.toggle('close');
}

function drawText(text, context, x, y) {
    context.fillStyle = "#000";
    context.lineStyle = "#ffff00";
    context.font = "18px sans-serif";
    if (!text) text = "enter your text here";
    context.fillText(text, x, y);
    // context.fillText(text, 20, 40);
}


