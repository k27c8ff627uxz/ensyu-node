import { Component } from "react";
import router from "next/router";
import Link from 'next/link';

export default class extends Component {
    constructor() {
        super();
        this.state = { id: 'hoge', genType: 'static' };
        this.textChange = this.textChange.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        // this.onChangeStatic = this.onChangeStatic.bind(this);
        // this.onChangeDymamic = this.onChangeDymamic.bind(this);
        this.onChangeGenType = this.onChangeGenType.bind(this);
    }

    textChange(event) {
        event.persist();
        this.setState((state) => {
            return {
                ...state,
                id: event.target.value,
            }
        });
    }

    buttonClick() {
        router.push(this.getLinkStr(this.state.id));
    }

    onChangeGenType(value) {
        this.setState((state) => {
            return {
                ...state,
                genType: value,
            }
        })
    }

    getLinkStr(id) {
        return `/${id}/${this.state.genType}`
    }

    render() {
        return (<div>
            <div>
                <input type="text" value={this.state.id} onChange={this.textChange} />
                <button onClick={this.buttonClick}>OK</button>
            </div>
            <div><Link href={this.getLinkStr('normal_page')}>normal_page</Link></div>
            <div><Link href={this.getLinkStr('special_page')}>special_page</Link></div>
            <div>
                <span>
                    <input type="radio" name="genType" checked={this.state.genType === 'static'} onChange={() => this.onChangeGenType('static')} />
                    static
                </span>
                <span>
                    <input type="radio" name="genType" checked={this.state.genType === 'dynamic'} onChange={() => this.onChangeGenType('dynamic')} />
                    dynamic
                </span>
            </div>
        </div>);
    }
}
