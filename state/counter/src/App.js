import React, { Component } from 'react';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
        this.count = this.count.bind(this);
    }

    count(e) {
        this.setState((state) => {
            return {
                counter: state.counter + 1,
            }
        });
    }

    get text() {
        if (this.state.counter === 0) {
            return 'The button has not pushed!!'
        } else {
            return `Count: ${this.state.counter}`;
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.count}>Counter</button>
                <p> { this.text } </p>
            </div>
        );
    }
}
