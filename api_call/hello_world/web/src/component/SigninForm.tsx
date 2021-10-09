import React from 'react';
import { FirebaseApp } from 'firebase/app';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

interface Props {
  app: FirebaseApp;
  onSubmit: (email: string, password: string) => Promise<void>;
}

interface State {
  email: string;
  password: string;
  message1: string;
  message2: string;
  errorMessage: string;
}

export default class extends React.Component<Props, State> {
  func: Functions;

  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message1: '',
      message2: '',
      errorMessage: '',
    }

    this.func = getFunctions(this.props.app);
    
    const call = httpsCallable<any, any>(this.func, 'helloOnCall');
    call({val: 3}).then((result) => {
      const mes = result.data;
      this.setState((state) => ({
        ...state,
        message1: mes.message1,
        message2: mes.message2,
      }))
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.state.email, this.state.password)
      .then()
      .catch(e => {
        this.setState(state => ({
          ...state,
          errorMessage: String(e),
        }))
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <div>
            <label>Enter your email: </label>
            <input
              type="text"
              onChange={(event) => this.setState((state) => ({...state, email: event.target.value}))}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              onChange={(event) => this.setState((state) => ({...state, password: event.target.value}))}
              required
            />
          </div>
          <div>
            <input type="button" value="Subscribe!" onClick={this.onSubmit} />
          </div>
        </form>
        <div>Message: {this.state.message1}</div>
        <div>{this.state.message2}</div>
        <div style={{color: 'red'}}>{this.state.errorMessage}</div>
      </React.Fragment>
    );
  }
}
