/* */
'use strict'

var gNextId;
var gImgs;

var gMeme = {selectedImgId: 5,     
                  txts: [{
                            line: 'I never eat Falafel',
                            size: 20,
                            align: 'left',
                            color: 'red'
                        }
                        ]
            };

// var gteams = { id: 1, url:}

// }

function init(){
    gNextId = 0;
    gImgs = createImgs();
    renderImgs(gImgs);
}

function createImgs(){
    var imgs = [];

    imgs.push(createImg('img/img01.jpg', ['tree','green','mountain','field']));
    imgs.push(createImg('img/img02.jpg', ['water','field','sunrise','sky']));
    imgs.push(createImg('img/img03.jpg', ['wheat','field','sky']));

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

function createImg(url, keywords){
    return{
        id: ++gNextId,
        url: url,
        keywords: keywords
    };
}

function renderImgs(imgs){
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

function searchImg(searchValue) {
    var filteredImgs = gImgs.filter(function(img) {
        return img.keywords.indexOf(searchValue) !== -1;
    }) ;

    renderImgs(filteredImgs);
}

function addImg(){
    debugger;
    var elImgInput = document.querySelector('#imgFiles');
    var filename = elImgInput.value.replace(/^.*[\\\/]/, '');
    gImgs.push(createImg('img/' + filename,[]));
    renderImgs(gImgs);
    elImgInput.value = '';
}

function openMemeEditor(elImg){
    // var memeImg = gImgs.find(function(img){
    //     return img.id === parseInt(elImg.id);
    // });
    gMeme = updMeme(elImg);
}

function updMeme(elImg){
    return {
        selectedImgId: parseInt(elImg.id),
        txts: []
    }   
}