import React from 'react';
import ReactDOM from 'react-dom';
import CSS from 'csstype';

const myStyle: CSS.Properties = {
    color: 'green',
    fontWeight: 900,
}

ReactDOM.render(
    <div style={myStyle}>
        Hello, React
    </div>,
    document.getElementById('root')
);
