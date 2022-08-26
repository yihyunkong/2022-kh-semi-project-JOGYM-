'use strict';
/**********************************************************************************************************
 * 이 script는 공지사항 리스트에 대한 모든 동적인 처리를 담당합니다.
 * 데이터는 FIREBASE 저장소에 있습니다. 고로 데이터 정렬과 같은 데이터 가공은 FIREBASE쿼리를 사용합니다.
 * 
 * 무엇을 처리하나요?
 *      - FIREBASE의 board컬렉션에 저장된 문서들을 읽어온 후 table 형식으로 클라이언트에게 보여줍니다. 
 *          > collection, getDocs, getFirestore
 *      - 문서들은 작성일 컬럼을 기준으로 정렬되어 10개씩 끊어서 보여줄 예정입니다. 
 *          > query, startAfter, orderBy, limit 을 임포트 해야 합니다.
 *      - (11번째 - 20번째) 문서는 다음 페이지로 넘어가는 동작 이후에 비로소 볼 수 있습니다. 
 * 즉, 처리 과정은 크게 다음과 같은 절차로 진행이 될 것입니다. 
 *
 */

/*************************************** * import * ******************************************************************/
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {getFirestore, query, orderBy, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
/*************************************** * import * ******************************************************************/

const firebaseConfig = {
    apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
    authDomain: "boardtest-174d5.firebaseapp.com",
    databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "boardtest-174d5",
    storageBucket: "boardtest-174d5.appspot.com",
    messagingSenderId: "921590231442",
    appId: "1:921590231442:web:b8f515057daf4ed545114b",
    measurementId: "G-MWTSS92ZQR"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/********************************* 전역 스코프 ************************************************ */



let num = 0;

const totalSnapshot = await getDocs(query(collection(db,"board")));

// 전체 게시글의 갯수를 출력
const boardTotalDocs = totalSnapshot.docs.length;
console.log(`전체 게시글의 갯수 boardTotalDocs ===> ${boardTotalDocs}`);

// 작성일 순으로 정렬 
const total = query(collection(db, "board"), orderBy("작성일","desc"))
const snapshot = await getDocs(total);

export async function adminDataService(){
    console.log(`adminDataService()함수가 호출되었습니다.`);
    snapshot.forEach((doc)=>{
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    const template = `
                    <tr>
                        <th scope="row">
                        <input class="th-checkbox" type="checkbox" name = "id" value="${doc.id}"/>
                        </th>
                        <th scope="row">${++num}</th>
                        <td>
                            <a class="title-URL" href="./admin-dtail-page.html?id=${doc.id}">
                            ${(doc.data().제목)}
                            </a>
                        </td>
                        <td>${(doc.data().작성자)}</td>
                        <td>${(doc.data().작성일)}</td>
                        <td>${(doc.data().조회수)}</td>
                    </tr>
                    `
    $(".board-content").append(template);
    })
}


    $('#btn-select-all').click(()=>{
        console.log("전체 레코드가 클릭되었습니다.");
        $('input:checkbox[name="id"]').each(function(){
            this.checked = true;
        })
        console.log($('input:checkbox[name="id"]').val());
    })





