import React from 'react';
import uniqueId from '../../util/unique_id'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: uniqueId(),
            title: '',
            body: '',
            done: false
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        let input = e.target.value
        this.setState({ title: input })
    }

    handleBodyChange(e) {
        let input = e.target.value
        this.setState({ body: input })
    }

    handleDone(e) {
        if (e.target.value === 'true') {
            this.setState({ done: true })
        } else {
            this.setState({ done: false })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.receiveTodo(this.state);
        this.setState({
            id: uniqueId(),
            title: '',
            body: '',
            done: false
        });
        document.getElementById('radio').checked = true;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Title:
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                </label>
                <br />
                <label>Body:
                    <input type="text" value={this.state.body} onChange={this.handleBodyChange} />
                </label>
                <br />
                <p>Done?</p>
                <label>True:
                    <input type="radio" name="done" value="true" onChange={this.handleDone} />
                </label>
                <label>False:
                    <input id="radio" type="radio" name="done" value="false" onChange={this.handleDone} />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Add Todo" />
            </form>
        )
    }
}

export default TodoForm;
