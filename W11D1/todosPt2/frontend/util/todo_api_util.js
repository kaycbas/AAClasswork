export const fetchTodo = () => {
    return $.ajax({
            url: 'api/todos/4',
            method: 'GET'
        })
} 