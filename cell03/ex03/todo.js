// load To Do from cookie
function loadToDos() {
    let todos = getCookies('todos');
    if (todos) {
        todos = JSON.parse(todos);
        todos.forEach(todo => addToList(todo));
    }
}

// +To Do in list
function addToList(todoText) {
    const ftList = document.getElementById('ft_list');
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo-item');
    newDiv.textContent = todoText;

    // + event for remove
    newDiv.addEventListener('click', function() {
        if (confirm('Do you want to remove this To Do?')) {
            ftList.removeChild(newDiv);
            saveToDos();
        }
    });

    // + To Do new in top of list
    ftList.insertBefore(newDiv, ftList.firstChild);
}

// save To Do in cookie
function saveToDos() {
    const ftList = document.getElementById('ft_list');
    const todos = Array.from(ftList.children).map(todo => todo.textContent);
    document.cookie = 'todos=' + JSON.stringify(todos) + ';path=/';
}

// function data from cookie
function getCookies(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// ตsetting event for button "New" when+  new To Do 
document.getElementById('new-btn').addEventListener('click', function() {
    const todoText = prompt('Enter a new To Do:');
    if (todoText) {
        addToList(todoText);
        saveToDos();
    }
});

// load To Do 
loadToDos();