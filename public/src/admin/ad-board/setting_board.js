'use strict';
/**********************************************************************************************************
 * 이 script는 공지사항 리스트에 대한 모든 동적인 처리를 담당합니다.
 * 데이터는 FIREBASE 저장소에 있습니다. 고로 데이터 정렬과 같은 데이터 가공은 FIREBASE쿼리를 사용합니다.
 * 
 * 무엇을 처리하나요?
 *      - FIREBASE의 board컬렉션에 저장된 문서들을 읽어온 후 table 형식으로 클라이언트에게 보여줍니다. 
 *          > collection, getDocs, getFirestore
 */
/*************************************** * import * ********************************************************/
import firebaseConfig from "../../js/firebaseConfig.js";
import {initializeApp} 
    from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, doc, query, getDocs, deleteDoc} 
    from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import ref from "../../collection/ref.js"
import select from '../../js/select_all.js';
import retreive from '../../js/retreiveDAO.js'
import pagination from "./admin_paginate.js"
// import del from "../../js/setting_trainer.js"
/*************************************** * import * ******************************************************************/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const totalSnapshot = await getDocs(query(ref.boardRef));

// 전체 게시글의 갯수를 출력
const boardTotalDocs = totalSnapshot.docs.length;
console.log(`전체 게시글의 갯수 boardTotalDocs ===> ${boardTotalDocs}`);

/********************************* 전역 스코프 ************************************************ */

// 페이지네이션
if(typeof(window.paginate) === 'undefined'){
    const result = retreive.retreiveAdBoard();
    window.paginate = pagination.lignePaginate();
    console.log("paginate.init");

    let options = {
        numberPerPage:10, //Cantidad de datos por pagina
        goBar:true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
        pageCounter:true, //Contador de paginas, en cual estas, de cuantas paginas

    };

    let filterOptions = {
        el:'#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
    };

    paginate.init('.myTable',options,filterOptions);
}

// 선택 함수 호출
const selectAllBtn = document.getElementById('btn-select-all');
// 전체 input을 선택하도록 기능하는 함수
select.selectAll(selectAllBtn);

// 삭제할 id 리스트를 담아준다. 
async function deleteProcess(deleteIDs){
    console.log("deleteProcess()호출 성공!!");
    $('input[type=checkbox][name=id]').change(function(){
        if($($(this)).is(":checked")) {
            alert(`${this.value} is checked`);
            // 선택된 value를 deleteIDs배열에 넣는다. 
            deleteIDs.push(this.value);
            console.log("삭제할 ID ==> "+deleteIDs);
            }
        else {
            alert(`${this.value} is unchecked`);
            // 선택해제된 값의 인덱스를 찾는다. 
            const index = deleteIDs.indexOf(this.value);
            console.log(index);
            // 인덱스가 -1보다 크다면 ^인덱스 ~ 1의 양만큼^ 삭제 
            if(index > -1){
            deleteIDs.splice(index, 1);
            }
            console.log("삭제할 ID ==> "+deleteIDs);
        }
        });
    
        return deleteIDs;
}

const delbtn = document.querySelector('.delbtn');
// 선택된 input type:selectbox 의 value즉, id를 담을 빈 배열을 선언한다. 
const idArr = []
// 삭제처리하는 함수를 불러서 삭제할 빈 배열을 매개변수로 넣어준다. 
const delRows = deleteProcess(idArr);

/********** 실질적으로 삭제처리를 진행하는 부분입니다. **********/
delbtn.addEventListener('click',async()=>{
console.log("선택삭제 버튼 클릭완료!! ");

delRows.then((ids)=>{
    console.log("이제 삭제를 진행합니다. ==> " + ids);

    if(confirm("삭제 하시겠습니까?")){
        try {
        for(let id of ids){
            // 삭제 프로세스
            deleteDoc(doc(db, "board", id));

            // 삭제되면 목록으로 돌아간다.
            setTimeout(()=>{
                alert("게시글이 삭제되었습니다.");
                //location.host => 호스트:port 번호 반환..
                const hostPort = location.host;
                location.href = `http://${hostPort}/jogym/public/src/admin/ad-board/setting-board.html`;
            }, 500)
        }
        
        } catch (error) {
            console.log("삭제 실패! ==> " + error);
        }
    }
    else{
    return false;
    }
    })
})












