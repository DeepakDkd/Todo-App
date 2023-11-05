var todolist = [];
let settitle = document.querySelector('#title');
let setdesc = document.querySelector('#desc');
let addtodo = document.querySelector('.add');
let clrfield = document.querySelector('.clear');

let title = document.querySelector('#todotitle');
let desc = document.querySelector('#tododesc');
let edittodo = document.querySelector('#edittodo');
let deletetodo = document.querySelector('#deletetodo');

let sectionn = document.querySelector('section')

clrfield.addEventListener('click', () => {
    settitle.value = ''
    setdesc.value = ''
})

addtodo.addEventListener('click', () => {
    if (settitle.value  && setdesc.value) {

        if(localStorage.getItem("todo")){
           todolist = JSON.parse(localStorage.getItem("todo"));  
        }
        let todoid = Math.random().toString(36).slice(-5)
        let obj = { id: todoid, title: settitle.value, desc: setdesc.value }
        settitle.value = ''
        setdesc.value = ''
        todolist.push(obj);
        localStorage.setItem("todo", JSON.stringify(todolist));
        showtodo();
    }

})

function showtodo() {
    if (localStorage.getItem("todo") !== null) {
        todolist = JSON.parse(localStorage.getItem("todo"));
        sectionn.innerHTML = ""
        for (i of todolist) {

           sectionn.innerHTML += `<div class="todo">
            <div class="icons">
                <i id="edittodo" class="ri-edit-2-fill" value="${i.id}"></i>
                <i id="deletetodo"  class="ri-delete-bin-2-fill"></i>
            </div>
            <h1 id="todotitle">${i.title}</h1>
            <p id="tododesc">${i.desc}</p>
        </div>`;

        }

    }
}
showtodo();