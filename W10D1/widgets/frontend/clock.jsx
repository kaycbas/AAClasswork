import React from 'react';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {time: new Date()};
    }

    _tick(){
        this.setState({time: new Date()});
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this._tick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let hours = this.state.time.getHours();
        let minutes = this.state.time.getMinutes();
        let seconds = this.state.time.getSeconds();

        return (
            <div className="clock-div">
                <h1>Clock</h1>
                <div className="clock">
                    <div>
                        <span> Time:</span>
                        <span>{hours}:{minutes}:{seconds} PDT </span>
                    </div>
                    <br/>
                    <div>
                        <span>Date: </span> 
                        <span>{this.state.time.toDateString()}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Clock;