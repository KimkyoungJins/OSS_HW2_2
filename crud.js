// 페이지 로드 시 버튼에 이벤트 리스너를 추가
window.onload = function () {
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");

    // 학생 목록 불러오기 버튼 클릭 시
    btnStu.addEventListener("click", getStudents);

    // 학생 추가 버튼 클릭 시
    btnAdd.addEventListener("click", postData);
}

function getStudents() {
    let contents = document.getElementById("contents");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/students");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);  // 데이터를 로그로 확인
            contents.innerHTML = makeList(res); // 학생 목록을 HTML로 생성하여 표시
        } else {
            console.log(xhr.status, xhr.statusText);  // 에러 메시지 로그 출력
        }
    }
}


// POST: 서버에 새로운 학생 추가
function postData() {
    let name = document.getElementById("name");
    let age = document.getElementById("age");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/students");
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    const data = { name: name.value, age: age.value }; // 새 학생 데이터
    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
        if (xhr.status === 201) {
            name.value = ""; // 입력 필드 초기화
            age.value = "";
            getStudents(); // 학생 목록을 다시 불러오기
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

// PUT: 특정 학생 데이터를 업데이트
function updateData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:3000/students/${id}`);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    const data = { name: "Sally", age: 10 }; // 업데이트할 데이터
    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getStudents(); // 업데이트 후 학생 목록을 다시 불러오기
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

// 학생 목록을 HTML로 변환하는 함수
function makeList(data) {
    let str = "<ul>";
    for (let key in data) {
        str += `<li>${data[key].name} (${data[key].age} years old)</li>`;
    }
    str += "</ul>";
    return str;
}
