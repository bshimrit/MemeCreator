/* */
'use strict'

var gNextId;
var gImgs;

var gMeme = {
    selectedImgId: 0,
<<<<<<< HEAD
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
=======
    txts: [newLineObject(20,40),
        newLineObject(20,80)]
>>>>>>> 78a9f86cac66c61aa3d7ba85d212a32ae05b55c8
};

var gteams = [
    { id: 1,
      url:'img/team/1.jpg',
      name:'Ilana', 
      title:'developer',
      description: 'I do everything!'},
    { id: 1,
    url:'img/team/2.jpg',
    name:'Ilana', 
    title:'developer',
    description: 'I do everything!'}

];

function init() {
    gNextId = 0;
    gImgs = createImgs();
    renderImgs(gImgs);
    renderWords(gImgs);
    renderTxtContainer();
}

function createImgs() {
    var imgs = [];

    imgs.push(createImg('img/meme/img01.jpg', ['tree', 'green', 'mountain', 'field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water', 'field', 'sunrise', 'sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat', 'field', 'sky']));

    //TODO: fix data
    imgs.push(createImg('img/meme/img01.jpg', ['tree','green','mountain','field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water','field','sunrise','sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat','field','sky']));
    imgs.push(createImg('img/meme/img01.jpg', ['tree','green','mountain','field']));
    imgs.push(createImg('img/meme/img02.jpg', ['water','field','sunrise','sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat','field','sky']));
    imgs.push(createImg('img/meme/img03.jpg', ['wheat','field','sky']));

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

<<<<<<< HEAD
function openMemeEditor(elImg) {
    gMeme = updMeme(elImg);
=======
function openMemeEditor(elImg){
    updMeme(elImg);
>>>>>>> 78a9f86cac66c61aa3d7ba85d212a32ae05b55c8
    drawImage();
    toggleWin();
}

function updMeme(elImg){
    gMeme.selectedImgId = parseInt(elImg.id);
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

<<<<<<< HEAD
function drawText(text, context, x, y) {
    context.fillStyle = "#000";
    context.lineStyle = "#ffff00";
    context.font = "18px sans-serif";
    if (!text) text = "enter your text here";
    context.fillText(text, x, y);
    // context.fillText(text, 20, 40);
}


=======
function renderTxtContainer(){
    var strHtml = '';
    var strHtmls = gMeme.txts.map(function(txt, idx){
        strHtml = renderNewLine(txt.line,idx);
        return strHtml;
    });

    var elEditTxtCon = document.querySelector('.edit-txt-container');
    elEditTxtCon.innerHTML = strHtmls.join('');
}

function renderNewLine(txt,idx){
    return `
    <div class="meme-txt-wrapper">  
        <input class="meme-line-txt" id="txt-input-${idx} placeholder="${txt}"></input>
        <div clas="txt-ctrl flex justify-center" id=txt-${idx}>
            <button>left</button>
            <button>center</button>
            <button>right</button>
            <button>+</button>
            <button>-</button>
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

function addNewLine(){
    gMeme.txts.push(newLineObject(0,0));
    var idx = gMeme.txts.length - 1;
    
    var elEditTxtCon = document.querySelector('.edit-txt-container');
    elEditTxtCon.innerHTML += renderNewLine(gMeme.txts[idx].line,idx);
}

function deleteLine(elBtn){
    var idx = elBtn.id.split('-')[1];
    gMeme.txts.splice(idx,1);
    renderTxtContainer();
}

function newLineObject(x,y){
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
>>>>>>> 78a9f86cac66c61aa3d7ba85d212a32ae05b55c8
