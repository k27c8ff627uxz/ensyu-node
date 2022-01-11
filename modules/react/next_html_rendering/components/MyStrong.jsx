import React, { Component } from 'react';
import style from '../styles/MyStrong.module.scss';

export default class extends Component {
    render() {
        return (<span className={style.main}>
            <span>{this.props.children}</span>
        </span>);
    }
}
