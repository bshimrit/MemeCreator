/* */
'use strict'
var gImgs = [
             {id: 1, url: 'img/img01.jpg', keywords: ['tree','green','mountain','field']},
             {id: 2, url: 'img/img02.jpg', keywords: ['water','field','sunrise','sky']},
             {id: 3, url: 'img/img03.jpg', keywords: ['wheat','field','sky']},
            ]; 
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


function searchImg(){
    var searchValue = document.querySelector(".search input").value;
    // console.log(searchValue);
    var filteredImgs = gImgs.filter(function(img) {
        return img.keywords.indexOf(searchValue) !== -1;
    }) ;

    console.log(filteredImgs);
    // renderImgs(filteredImgs);
}