'use strict';

// 선택박스를 전체 클릭할 수 있도록 하는 함수 

function selectAll(buttonID){
  $(buttonID).click(()=>{
    console.log("전체 레코드가 클릭되었습니다.");
    $('input:checkbox[name="id"]').each(function(){
        this.checked = true;
    })
    console.log($('input:checkbox[name="id"]').val());
  })
}

function selectOption(){
  $('input[type=checkbox][name=id]').change(function() {
    if ($(this).is(':checked')) {
        alert(`${this.value} is checked`);
    }
    else {
        alert(`${this.value} is unchecked`);
    }
});
}

export default {selectAll, selectOption}