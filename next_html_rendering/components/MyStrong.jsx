import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (<span>
            {this.props.children}
            <style jsx>{`
                span {
                    margin: 0;
                    color: red;
                    font-weight: 700;
                }
            `}</style>
        </span>);
    }
}
