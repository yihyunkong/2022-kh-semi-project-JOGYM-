// ======================================== firebase 초기화 코드 시작 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, doc, deleteDoc, addDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

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
// ========================================= firebase 초기화 코드 끝 ========================================= //

// ==========  트레이너 값을 받아 select box의 option에 전달 ========== //
trainerSelect();

// 요일을 담을 배열 선언하기
const selectDay = [];

// select의 option이 변경되었을 때
function programOutoSelect() {
    $("#selectTrainerOption").change(async () => {
        // 선택된 트레이너 값을 text로 출력
        const trainerResult = $(".trainerSpread:selected").text();
        console.log("선택한 트레이너 ==> " + trainerResult);
        
        // 선택한 트레이너와 대치되는 프로그램명 출력 쿼리문
        const programQuery = query(collection(db, "trainer"), where("이름", "==", trainerResult));
        const programQuerySnapshot = await getDocs(programQuery);
        
        programQuerySnapshot.forEach((doc) => {
            const programUid = doc.id;
            const programResult = doc.data().프로그램; 
            
            // 트레이너를 재선택했을 때, 해당 span태그에 중복으로 출력되므로 초기화
            $(".selectProgram").html("");
            
            const programoOutoTemplate = `
            <span class="selectProgram">${programResult}</span>
            `
            $("#programOuto").append(programoOutoTemplate);
            // $(".selectProgram:selected").text()
            console.log("선택한 프로그램 ==> " + $(".selectProgram").text());
        })
        
    })
}

// 강사 선택 함수
async function trainerSelect() {
    console.log("트레이너 선택 함수 호출 성공");

    programOutoSelect();

    // firestore의 trainer 문서 snapshot
    const trainerSnapshot = await getDocs(collection(db, "trainer"));
    trainerSnapshot.forEach((doc) => {
        // const trainerUid = doc.id;
        const trainer = doc.data().이름; 

        // 트레이너 선택 selectBox에 넣어 줄 option을 template로 설정
        const trainerOptionTemplate = `
        <option value="trainer" class="trainerSpread" id="trainerSpread">${trainer}</option>
        `
        $("#selectTrainerOption").append(trainerOptionTemplate);
    })

    // 요일 다중 선택 함수
    function checkedDayArray(selectDay) {
        console.log("체크박스 다중 선택 배열 함수 호출 성공");
        $('input[type=checkbox][name=selectDay]').change(function() {
            if($($(this)).is(":checked")) {
                alert(`${this.value}요일이 선택되었습니다.`);
    
                selectDay.push(this.value);
                console.log("선택한 요일 ==> " + selectDay);
            } else {
                alert(`${this.value}요일이 해제되었습니다.`);

                selectDay.pop(this.value);

                // 선택 해제된 체크 박스 값 (index > indexOf)
                const index = selectDay.indexOf(this.value);
                console.log(index);
            }
        })
        return selectDay;
    }
    checkedDayArray(selectDay);

    // 강좌 생성하기 버튼을 눌렀을 때
    $('#program-submit').on("click", () => {
        console.log("강좌 생성하기 버튼 클릭");

        console.log("######강사명 =====> " + $("#selectTrainerOption option:selected").text());
        console.log("######프로그램명 ==> " + $(".selectProgram").text());
        console.log("######요일 ======> " + selectDay);
        //$("input[name=checkedDay]:checked").val()
        console.log("######시간 ======> " + $("#selectTime option:selected").text());
        console.log("######시작일 =====> " + $("#startDay").val());
        console.log("######종료일 =====> " + $("#endDay").val());

        try {
            alert("try문 접근 성공");

            // 변수명이 아닌 선택 값으로 직접 접근한다. (변수명으로 접근하면 각 함수 내에 적용된 변수명이 함수 바깥에서 사용될 경우 한계가 있다..)
            addDoc(collection(db, "program"), {
                강사명: $("#selectTrainerOption option:selected").text(),
                프로그램명: $(".selectProgram").text(),
                요일: selectDay,
                시간: $("#selectTime option:selected").text(),
                기간: ($("#startDay").val() + " ~ " + $("#endDay").val()),
            })
            
            alert("강좌 생성 완료");
        } catch(error) {
            alert("강좌 생성 실패");
            const errorMessage = error.message;
            const errorCode = error.code;
            console.log(errorCode + " = " + errorMessage);
        }
    })
}



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// 생성된 강좌에 대한 목록 조회하기
async function programInfoSpread() {
    console.log("프로그램 조회 함수 호출 성공");

    const programSnapshot = await getDocs(collection(db, "program"));
    programSnapshot.forEach((doc) => {
        // 프로그램 목록 조회
        console.log("프로그램 목록  ==> " + doc.id, " ==> ", doc.data());

        const programName = doc.data().프로그램명;
        const trainerName = doc.data().강사명;
        const period = doc.data().기간;
        const time = doc.data().시간;
        const day = doc.data().요일;

        const programListTemplate = `
            <tr>
                <td id="program">${programName}</td>
                <td id="programTrainer">${trainerName}</td>
                <td id="programPeriod">${period}</td>
                <td id="programTime">${time}</td>
                <td id="programDay">${day}</td>
                <td><button type="button" class="programDelBtn" value="${doc.id}">강좌삭제</button></td>
            </tr>
        `
        $("#programListAppend").append(programListTemplate);
    })

    // deleteProgram 위치 1
    $(".programDelBtn").on("click", async (e) => {
        console.log("프로그램 삭제 버튼 클릭");
        // console.log($(".programDelBtn").val());
        console.log(e.target.value);
    
        if (confirm("강좌를 삭제하시겠습니까?")) {
            console.log("if문 진입 성공");
            
            await deleteDoc(doc(db, "program", e.target.value));
            alert("강좌가 삭제되었습니다.");
            console.log("삭제된 프로그램 uid ==> " + e.target.value);
            
        } else {
            alert("삭제가 취소되었습니다.")
        }
    })
}
programInfoSpread();

// deleteProgram 위치 2
// 여기는 버튼 안먹어 