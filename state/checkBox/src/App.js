import React, { Component } from 'react';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            check1: false,
            check2: false,
        };
        this.check1click = this.check1click.bind(this);
        this.check2click = this.check2click.bind(this);
    }

    check1click(e) {
        this.setState(state => ({
            ...state,
            check1: !state.check1,
        }));
    }
    check2click(e) {
        this.setState(state => ({
            ...state,
            check2: !state.check2,
        }));
    }
    render() {
        return (
            <div>
                <p><input type="checkbox" checked={this.state.check1} onClick={this.check1click} />Check1</p>
                <p><input type="checkbox" checked={this.state.check2} onClick={this.check2click} />Check2</p>
                <hr />
                { this.state.check1 && <p>Check1 is checked.</p>}
                <p>Check2 is {this.state.check2 ? <span>true</span> : <span>false</span>}</p>
            </div>
        );
    }
}
