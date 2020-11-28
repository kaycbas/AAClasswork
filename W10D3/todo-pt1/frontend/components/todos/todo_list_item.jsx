import React from 'react';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)

        let status = this.props.todo.done;
        let buttonText = status ? 'Undo' : 'Done';
        this.state = { buttonText: buttonText };

        this.updateTodo = this.updateTodo.bind(this);
    }

    handleClick(e) {
        this.props.removeTodo(this.props.todo)
    }

    updateTodo(e) {
        if (this.state.buttonText === 'Undo') {
            this.setState({buttonText: 'Done'});
            let todo = this.props.todo;
            todo.done = false;
            this.props.receiveTodo(todo);
        } else {
            this.setState({buttonText: 'Undo'});
            let todo = this.props.todo;
            todo.done = true;
            this.props.receiveTodo(todo);
        }
    }

    render() {
        return (
            <li>{this.props.todo.title}
                <ul>
                    <li>{this.props.todo.body}</li>
                    <li>{String(this.props.todo.done)}</li>
                </ul>
                <button onClick={this.updateTodo}>{this.state.buttonText}</button>
                <button onClick={this.handleClick}>Delete Todo</button>
            </li>
        )
    }
}


export default TodoListItem;