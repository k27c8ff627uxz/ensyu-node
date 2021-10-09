import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, User, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import SignInForm from './SigninForm';
import UserPage from './UserPage';

interface State {
  isUserLoading: boolean;
  user: User | null;
}

export default class extends React.Component<{}, State> {
  app = initializeApp(firebaseConfig);
  auth = getAuth();

  constructor() {
    super({});
    this.state = {
      isUserLoading: true,
      user: null,
    };
    try {
      this.app = initializeApp(firebaseConfig);
    } catch(e) {
      throw new Error('');
    }

    this.auth.onAuthStateChanged(user => {
      this.setState(state => ({
        ...state,
        isUserLoading: false,
        user,
      }));
    })

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(email: string, password: string) {
    await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
  }

  render() {
    if (this.state.isUserLoading) {
      return <div>Loading...</div>
    }

    if (this.state.user === null) {
      return <SignInForm app={this.app} onSubmit={this.onSubmit} />
    }

    return (
      <UserPage
        user={this.state.user}
        app={this.app}
        auth={this.auth}
      />
    );
  }
}
