/* */
'use strict'

var gNextId;
var gImgs;

// var gImgs = [
//              {id: 1, url: 'img/img01.jpg', keywords: ['tree','green','mountain','field']},
//              {id: 2, url: 'img/img02.jpg', keywords: ['water','field','sunrise','sky']},
//              {id: 3, url: 'img/img03.jpg', keywords: ['wheat','field','sky']},

//              {id: 4, url: 'img/img01.jpg', keywords: ['tree','green','mountain','field']},
//              {id: 5, url: 'img/img02.jpg', keywords: ['water','field','sunrise','sky']},
//              {id: 6, url: 'img/img03.jpg', keywords: ['wheat','field','sky']},
//              {id: 7, url: 'img/img01.jpg', keywords: ['tree','green','mountain','field']},

//              {id: 8, url: 'img/img02.jpg', keywords: ['water','field','sunrise','sky']},
//              {id: 9, url: 'img/img03.jpg', keywords: ['wheat','field','sky']},
//              {id: 10, url: 'img/img01.jpg', keywords: ['tree','green','mountain','field']},
//             ]; 
var gMeme = {selectedImgId: 5,     
                  txts: [{
                            line: 'I never eat Falafel',
                            size: 20,
                            align: 'left',
                            color: 'red'
                        }
                        ]
            };

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
        keyWords: keywords
    };
}

function renderImgs(imgs){
    var strHtml = '';

    var strHtmls = gImgs.map(function(img, idx){
        strHtml = `<img id="${img.id}" src="${img.url}"/>`;
        return strHtml;
    });

    var imgGrid = document.querySelector('.img-grid');
    imgGrid.innerHTML = strHtmls.join('');
}