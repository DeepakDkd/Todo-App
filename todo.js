var todolist = [];
let settitle = document.querySelector('#title');
let setdesc = document.querySelector('#desc');
let addtodo = document.querySelector('.add');
let clrfield = document.querySelector('.clear');
let sectionn = document.querySelector('section');
let todo = document.querySelectorAll('.todo');
let title = document.querySelector('#todotitle');
let desc = document.querySelector('#tododesc');
let update = document.querySelector('#update')
let cancel = document.querySelector('#cancel')

clrfield.addEventListener('click', () => {
    settitle.value = ''
    setdesc.value = ''
})

addtodo.addEventListener('click', () => {
    if (settitle.value && setdesc.value) {

        if (localStorage.getItem("todo")) {
            todolist = JSON.parse(localStorage.getItem("todo"));
        }
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let todoid = Math.random().toString(36).slice(-5)
        let obj = { id: todoid, title: settitle.value, desc: setdesc.value, date: date, time: time }
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
        todolist.reverse();
        sectionn.innerHTML = ''
        for (i of todolist) {

            sectionn.innerHTML += `<div class="todo" id="${i.id}">
            <div class="icons">
                <span class="datetime">🕒${i.time} 📅${i.date}</span>
                <i id="${i.id}" class="ri-edit-2-fill"></i>
                <i id="${i.id}"  class="ri-delete-bin-2-fill"></i>
            </div>
            <h1 id="todotitle">✪ ${i.title}</h1>
            <p id="tododesc">${i.desc}</p>
            
        </div>`;

        }
    }


    remove()
    edit();
}
showtodo();

function remove() {
    let removetodo = document.querySelectorAll('.ri-delete-bin-2-fill');

    removetodo.forEach(element => {


        element.addEventListener('click', (i) => {
            console.log(i.target.id)
            let objidx = todolist.findIndex(item => item.id == i.target.id)
            todolist.splice(objidx, 1);
            localStorage.setItem("todo", JSON.stringify(todolist));
            showtodo();

        })
    });
    settitle.value = ''
    setdesc.value = ''
}


function edit() {

    let edittodo = document.querySelectorAll('.ri-edit-2-fill');
    let index;
    edittodo.forEach(elem => {
        elem.addEventListener('click', (e) => {

            index = todolist.findIndex(item => item.id == e.target.id)
            var id = e.target.id;
            settitle.value = todolist[index].title
            setdesc.value = todolist[index].desc
            update.style.display = 'block';
            cancel.style.display = 'block';
            addtodo.style.display = 'none';
            clrfield.style.display = 'none';

            let arr = document.getElementsByClassName('container');
            let elem = Array.from(arr);
            let array = elem[0].childNodes;
            array.forEach((e) => {
                if (e.id !== id) {
                    e.classList.add('hide');
                }
            })

        })
    })
    update.addEventListener('click', () => {
        if (settitle.value && setdesc.value) {
            todolist[index].title = settitle.value;
            todolist[index].desc = setdesc.value;
            settitle.value = ''
            setdesc.value = ''
            localStorage.setItem("todo", JSON.stringify(todolist))
            showtodo();
        }
    })
    cancel.addEventListener('click', () => {
        settitle.value = ''
        setdesc.value = ''
        update.style.display = 'none';
        cancel.style.display = 'none';
        addtodo.style.display = 'block';
        clrfield.style.display = 'block';
        showtodo();
    })

}

