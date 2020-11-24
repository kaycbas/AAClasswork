import React from 'react';

class Autocomplete extends React.Component {

    constructor(props){
        super(props);
        this.state = {inputVal: ''};
        this.selectName = this.selectName.bind(this);
    }

    selectName(e) {
        let name = e.target.value;
        this.setState({inputVal: name});
    }

    render (){
        let names = this.props.names.map((name, idx) => {
            return (<li key={idx}>{name}</li>)
        })

        return (
        <div>
            <input onChange={this.selectName} type="text" value="search..."></input>
            <ul>{names}</ul>
        </div>)
    }
}


export default Autocomplete; 