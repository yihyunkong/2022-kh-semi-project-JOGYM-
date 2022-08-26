'use strict';

const h1 = document.querySelector(".h1-title");
console.log(h1.textContent);

h1.addEventListener('click',() => {
  h1.remove();
  console.log("h1.textContent 삭제");
  const html = `<input class="input-title type="text">`
  $('div.div-title').append(html);
})

const h2 = document.querySelector(".h2-contents");
console.log(h2.textContent);

h2.addEventListener('click', () => {
  h2.remove();
  console.log('h2.textContents삭제');
  const html = `<textarea name="content" id="textarea-content" cols="200" rows="30"></textarea>`
  $('div.div-contents').append(html);
})

$('#image-button').click(function (e) {
  e.preventDefault();
  $('#file').click();
});

function uploadFile(e){
  console.log("File Name : ", e.value);
  const html=`<img src="${e.value}" width="100px" height="100px">`
  $('div.div-contents').append(html);
}





