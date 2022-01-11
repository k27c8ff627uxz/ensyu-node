import React from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import * as firebase from 'firebase/app';
import { User, Auth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { SignInForm } from './component/SigninForm';
import UserPage from './component/UserPage';

interface State {
  auth: Auth | null;
  currentUser: User | null;
}

export default class extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      auth: null,
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
        auth,
        currentUser: user,
      }));
    })
  }

  async onSubmit(data: {email: string, password: string}, auth: Auth) {
    const {email, password} = data;
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

  async onSignout(auth: Auth) {
    await signOut(auth);
  }

  render() {
    const auth = this.state.auth
    if (auth === null) {
      return <div>Initializing...</div>;
    }
    const currentUser = this.state.currentUser;
    if (currentUser === null) {
      return (
        <SignInForm
          auth={auth}
          onSubmit={this.onSubmit}
        />
      );
    }
    return (
      <UserPage
        auth={auth}
        currentUser={currentUser}
        onSignout={this.onSignout}
      />
    );


  }
}
