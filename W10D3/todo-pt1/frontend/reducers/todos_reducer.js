import { RECEIVE_TODO, RECEIVE_TODOS, REMOVE_TODO } from '../actions/todo_actions'

// reducers/todos_reducer.js
const initialState = {
    1: {
        id: 1,
        title: "wash car",
        body: "with soap",
        done: false
    },
    2: {
        id: 2,
        title: "wash dog",
        body: "with shampoo",
        done: true
    }
};

const todosReducer = (oldState = initialState, action) => {
    let nextState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_TODO:
            nextState[action.todo.id] = action.todo;
            return nextState;
        case RECEIVE_TODOS:
            let newTodos = {};
            action.todos.forEach((todo, idx) => newTodos[idx] = todo);
            return newTodos;
        case REMOVE_TODO:
            delete nextState[action.todo.id]
            return nextState
        default:
            return oldState;
    }
};

export default todosReducer;