
$(document).ready(function() {
    // Load To Dos from cookie
    loadToDos();

    // Event for button "New"
    $('#new-btn').on('click', function() {
        const todoText = prompt('Enter a new To Do:');
        if (todoText) {
            addToList(todoText);
            saveToDos();
        }
    });

    // Load To Dos from cookie
    function loadToDos() {
        let todos = getCookies('todos');
        if (todos) {
            todos = JSON.parse(todos);
            todos.forEach(todo => addToList(todo));
        }
    }

    // Add To Do to list
    function addToList(todoText) {
        const $ftList = $('#ft_list');
        const $newDiv = $('<div></div>')
            .addClass('todo-item')
            .text(todoText)
            .click(function() {
                if (confirm('Do you want to remove this To Do?')) {
                    $(this).remove();
                    saveToDos();
                }
            });

        // Add new To Do at the top of the list
        $ftList.prepend($newDiv);
    }

    // Save To Do in cookie
    function saveToDos() {
        const todos = $('#ft_list .todo-item').map(function() {
            return $(this).text();
        }).get();
        document.cookie = 'todos=' + JSON.stringify(todos) + '; path=/';
    }

    // Get cookie value by name
    function getCookies(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});