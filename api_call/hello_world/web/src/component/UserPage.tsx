import React from 'react';
import { FirebaseApp } from 'firebase/app';
import { User, Auth, signOut } from 'firebase/auth';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

interface Props {
  user: User;
  auth: Auth;
  app: FirebaseApp;
}

interface State {
  message1: string;
  message2: string;
}

export default class extends React.Component<Props, State> {
  func: Functions;

  constructor(props: Props) {
    super(props);

    this.state = {
      message1: '',
      message2: '',
    }
    this.onSignout = this.onSignout.bind(this);

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
  }

  async onSignout() {
    await signOut(this.props.auth)
  }

  render() {
    return (
      <React.Fragment>
        <div>Hello, {this.props.user.email}</div>
        <button onClick={this.onSignout}>signout</button>
        <div>Message: {this.state.message1}</div>
        <div>{this.state.message2}</div>
      </React.Fragment>
    );
  }
}
