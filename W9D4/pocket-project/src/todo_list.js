

// let todos = [];
let todoUl = document.querySelector(".todos");
let todoForm = document.querySelector(".add-todo-form");
let todos = JSON.parse(localStorage.getItem('items')) || [];

function addTodo(e) {
    e.preventDefault();

    let input = document.querySelector("input[name='add-todo']");
    let inputVal = input.value;

    let todo = {
        'content': inputVal,
        'done': false
    };

    todos.push(todo);
    localStorage.setItem('items', JSON.stringify(todos));
    todoForm.reset();

    populateList();
}

function populateList() {
    todoUl.innerHTML = '';
    todos.forEach(todo => {
        let label = document.createElement("label");
        label.innerHTML = todo.content;

        let li = document.createElement("li");
        li.appendChild(label);

        todoUl.appendChild(li);
    })
}

function strikeLi(e) {
    let li = e.target;
    li.style.textDecoration = "line-through";
    li.data
}

todoForm.addEventListener("submit", addTodo);

todoUl.addEventListener("click", strikeLi);

populateList();