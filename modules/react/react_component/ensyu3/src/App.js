import React, { Component } from 'react';

const text = ['This', 'is', 'a', 'message', '.'];

export default class extends Component {
    render() {
        return (
            <div>
                <p> { text } </p>
            </div>
        );
    }
}
