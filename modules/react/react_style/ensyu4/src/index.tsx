import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>
        <div className="mycolor">
            Hello, <span>React!!</span>
        </div>
        <style>{`
            .mycolor {
                color: green;
            }
            span {
                font-weight: 900;
            }
        `}</style>
    </div>,
    document.getElementById('root')
);
