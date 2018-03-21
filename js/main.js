/* */
'use strict'

var gNextId;
var gImgs;

var gMeme = {
    selectedImgId: 0,
    txts: [{
        line: 'Your text will appear here',
        size: 20,
        align: 'left',
        color: 'red'
    }
    ]
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
    imgs.push(createImg('img/img01.jpg', ['tree','green','mountain','field']));
    imgs.push(createImg('img/img02.jpg', ['water','field','sunrise','sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat','field','sky']));
    imgs.push(createImg('img/img01.jpg', ['tree','green','mountain','field']));
    imgs.push(createImg('img/img02.jpg', ['water','field','sunrise','sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat','field','sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat','field','sky']));

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

    var strHtmls = imgs.map(function(img, idx){
        strHtml = `<img  id="${img.id}" src="${img.url}" onclick="openMemeEditor(this)"/>`;
        return strHtml;
    });

    var elImgGrid = document.querySelector('.img-grid');
    elImgGrid.innerHTML = strHtmls.join('');
}

function searchImgInput(){
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
        strHtmls += `<span style="font-size: ${MIN_SIZE * count}px">${key}</span>`;
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

function addImg(){
    var elImgInput = document.querySelector('#imgFiles');
    var filename = elImgInput.value.replace(/^.*[\\\/]/, '');
    gImgs.push(createImg('img/' + filename,[]));
    renderImgs(gImgs);
    elImgInput.value = '';
}

function openMemeEditor(elImg){
    gMeme = updMeme(elImg);
    drawImage();
    toggleWin();
}

function updMeme(elImg){
    return {
        selectedImgId: parseInt(elImg.id),
        txts: []
    }   
}


function drawImage() {
    var canvas = document.getElementById('meme-canvas');    
    var context = canvas.getContext('2d');
    var memeImg = gImgs.find(function(img){
        return img.id === gMeme.selectedImgId;
    });
    var img = new Image();
    img.src = memeImg.url;

    img.onload = function () {
        context.drawImage(img, 0, 0, 400, 360);
    };
}

function toggleWin()
{
    var elOpen = document.querySelector('.open');
    var elClose = document.querySelector('.close');
    elOpen.classList.toggle('open');
    elOpen.classList.toggle('close');
    elClose.classList.toggle('open');
    elClose.classList.toggle('close');
}