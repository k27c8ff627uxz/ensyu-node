import React, { Component, useRef } from 'react';

const initMsg = 'Hello';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            display: initMsg,
        };
    }

    doType = (e) => {
        e.persist();
        this.setState((state) => {
            return { ...state, text: e.target.value };
        });
    }

    doAction = () => {
        this.setState((state) => {
            return {
                text: '',
                display: state.text ? initMsg : `Hello, ${state.text}`,
            };
        });
    }

    render() {
        return (
            <div>
                <div>{ this.state.display }</div>
                <input type="text" onChange={this.doType} value={this.state.text} />
                <button onClick={this.doAction}>OK</button>
            </div>
        );
    }
}
