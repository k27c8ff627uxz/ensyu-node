import React from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { SignInForm } from './SigninForm';

interface State {
  isInitializing: boolean;
  currentUser: User | null;
}

export default class extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isInitializing: true,
      currentUser: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount() {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch(e) {
      console.log(e);
      return;
    }
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      this.setState(state => ({
        ...state,
        isInitializing: false,
        currentUser: user,
      }));
    })
  }

  async onSubmit(email: string, password: string) {
    const auth = getAuth();

    try{
      await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch(e) {
      console.log(e);
    }
  }

  async onSignout() {
    const auth = getAuth();
    await signOut(auth);
  }

  MainComponent: React.FC = () => {
    const currentUser = this.state.currentUser;
    if (currentUser === null) {
      return (
        <SignInForm
          onSubmit= {this.onSubmit}
        />
      )
    } else {
      return (<React.Fragment>
        <div>Hello, {currentUser.email}!!</div>
        <button onClick={this.onSignout}>signout</button>
      </React.Fragment>);
    }
  }

  render() {
    if (this.state.isInitializing) {
      return <div>Initializing...</div>;
    } else {
      return <this.MainComponent />;
    }
  }
}
