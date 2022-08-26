// ======================================== firebase 초기화 코드 시작 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, doc, deleteDoc, addDoc, getDocs, collection, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
    authDomain: "boardtest-174d5.firebaseapp.com",
    databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "boardtest-174d5",
    storageBucket: "boardtest-174d5.appspot.com",
    messagingSenderId: "921590231442",
    appId: "1:921590231442:web:b8f515057daf4ed545114b",
    measurementId: "G-MWTSS92ZQR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// ========================================= firebase 초기화 코드 끝 ========================================= //

// 생성된 강좌에 대한 목록 조회하기
async function programInfoSpread() {
    console.log("프로그램 조회 함수 호출 성공");

    const programSnapshot = await getDocs(collection(db, "program"));
    programSnapshot.forEach((doc) => {
        // 프로그램 목록 조회
        // console.log("프로그램 목록  ==> " + doc.id, " ==> ", doc.data());

        const programName = doc.data().프로그램명;
        const trainerName = doc.data().강사명;
        const period = doc.data().기간;
        const time = doc.data().시간;
        const day = doc.data().요일;

        // console.log(doc.id);
        const programListTemplate = `
                <tr>
                    <td id="program">${programName}</td>
                    <td id="programTrainer">${trainerName}</td>
                    <td id="programPeriod">${period}</td>
                    <td id="programTime">${time}</td>
                    <td id="programDay">${day}</td>
                    <td><button type="button" class="programReservationBtn" value="${doc.id}">예약하기</button></td>
                    </tr>
            `;
        $("#programListAppend").append(programListTemplate);
    });

    // 신청하기
    onAuthStateChanged(auth, async (user) => {
        $(".programReservationBtn").on("click", async (e) => {
        e.preventDefault();
        const proSnap = JSON.stringify(programSnapshot);
        const obj = JSON.parse(proSnap);
        const field = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields;
        const teacher = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.강사명.stringValue;
        const day = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.기간.stringValue;
        const time = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.시간.stringValue;
        const day_week = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.요일.arrayValue.values;
        const programName = obj._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.프로그램명.stringValue;
        console.log(field);
        console.log(teacher);
        console.log(day);
        console.log(time);
        console.log(day_week);
        console.log(programName);
        const uid = user.uid;
        console.log(uid);

        if (confirm("선택한 강좌를 예약하시겠습니까?")) {
            console.log("if문 진입 성공");

            await updateDoc(doc(db, "user", uid), {
            강사명: teacher,
            수강기간: day,
            시간: time,
            요일: day_week,
            프로그램: programName,
            });
        } else {
            alert("예약이 취소되었습니다.");
        }
        });
    });
}
programInfoSpread();
