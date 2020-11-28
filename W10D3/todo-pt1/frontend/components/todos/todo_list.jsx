import React from 'react';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form'
import { removeTodo } from '../../actions/todo_actions';

export default ({ todos, receiveTodo, removeTodo }) => (
    <div>
        <h1>Todo List goes here!</h1>
        <ul>
            {todos.map((todo) => {
                return (<TodoListItem key={todo.id} todo={todo} receiveTodo={receiveTodo} removeTodo={removeTodo}/>);
            })}
        </ul>

        <TodoForm receiveTodo={receiveTodo} />
    </div>
)
