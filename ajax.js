window.onload = function () {
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");
    btnStu.addEventListener("click", getStudents);
    btnAdd.addEventListener("click", postData);
}

function getStudents() {
    let contents = document.getElementById("contents");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/students");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            contents.innerHTML = makeList(res);
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

function makeList(data) {
    let str = "<ul>";
    for (let key in data) {
        // console.log("Name :" + data[key].name + " , age :" + data[key].age);
        str += "<li>" + data[key].name + " (" + data[key].age + ")</li>";
    }
    str += "</ul>";
    return str;
}

function postData() {
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/students");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const data = { name: name.value, age: age.value };
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
        if (xhr.status === 201) {
            name.value = "";
            age.value = "";
            getStudents();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

function updateData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/students/" + id);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const data = { name: "Sally", age: 10 };
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getStudents();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}
