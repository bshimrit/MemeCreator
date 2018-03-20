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

function searchImg(){
    var searchValue = document.querySelector(".search input").value;
    // console.log(searchValue);
    var filteredImgs = gImgs.filter(function(img) {
        return img.keywords.indexOf(searchValue) !== -1;
    }) ;

    // console.log(filteredImgs);
    renderImgs(filteredImgs);
}