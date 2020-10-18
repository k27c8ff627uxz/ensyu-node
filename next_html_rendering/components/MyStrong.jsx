import React, { Component } from 'react';

const style = {
    margin: 0,
    color: "red",
    fontWeight: 700,
};

export default class extends Component {
    render() {
        return (<span style={style}>
            {this.props.children}
        </span>);
    }
}
