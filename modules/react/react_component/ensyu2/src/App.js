import React, { Component } from 'react';

const title = 'This is title';
const message = 'This is message';

export default class extends Component {
    render() {
        return (
            <div>
                <h2> { title } </h2>
                <p> { message } </p>
            </div>
        );
    }
}
