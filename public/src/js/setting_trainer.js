'use strict';

/***********************************************************************************************************************
 * 이 module은 FIREBASE에 트레이너 data를 삭제하는 기능을 담당하는 스크립트 입니다. 
/*************************************** * FIREBASE * ******************************************************************/
import {initializeApp} 
    from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, deleteDoc, doc} 
    from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
    //// 조회 ////
import retreive from "./retreiveDAO.js"
import firebaseConfig from './firebaseConfig.js';
import select from './select_all.js';

/*************************************** * FIREBASE * ******************************************************************/

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    /******* Import한 함수를 호출합니다. ********/
    // retreive.retreiveProgram();
    retreive.retreiveTrainer();
    retreive.doChangePro()
    retreive.doChangeTra()

/*************************************** deleteProcess() ******************************************** 
 * @param deleteIDs > 삭제할 id값을 담^을^ 배열 
 * @return deleteIDs > 삭제할 id값이 담^긴^ 배열 
 * 체크박스 선택 시 해당 체크박스에 있는 value가 전달되고 그 value값으로 삭제할 수 있도록 처리하기
 * 체크박스 선택하면 선택한 체크박스의 value값이 추출된다.
 * **** 추출한 값을 전역에 준비해 놓은 object에 담는다. ==> var idObj = {};
 * ** 체크박스 선택 해제하면 해제된 체크박스의 value값이 추출된다. 
 * **** 추출한 값을 전역에 준비해 놓은 object에서 삭제한다. ==> var idObj = {};
******************************************************************************************************/
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
    var deleteIDs = [];
    // 삭제처리하는 함수를 불러서 삭제할 빈 배열을 매개변수로 넣어준다. 
    const delRows = deleteProcess(deleteIDs);

    /********** 실질적으로 삭제처리를 진행하는 부분입니다. **********/
    delbtn.addEventListener('click',async()=>{
        console.log("선택삭제 버튼 클릭완료!! ");
        delRows.then((ids)=>{
        console.log("이제 삭제를 진행합니다. ==> " + ids);
        if(confirm("삭제 하시겠습니까?")){
            try {
                for(let id of ids){
                // 삭제 프로세스
                deleteDoc(doc(db, "trainer", id));
                    // 삭제되면 목록으로 돌아간다.
                    setTimeout(()=>{
                    alert("게시글이 삭제되었습니다.");
                    //location.host => 호스트:port 번호 반환..
                        const hostPort = location.host;
                        location.href = `http://${hostPort}/jogym/public/src/admin/ad-trainer/settings-trainer.html`;
                    }, 500)
                }
            } catch (error) {
                    console.log("삭제 실패! ==> " + error);
            }
        }else{
            return false;
        }
        })
    })


    /************************ 전체삭제처리 시작! ****************************
     * *****************************************************************/ 
    // 전체 선택 버튼을 누르면 전체 선택 박스가 체크가 된다. 
    const selectbtn = document.querySelector('#selbtn')
    select.selectAll(selectbtn);


