import React from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { User, Auth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { SignInForm } from './SigninForm';
import UserPage from './UserPage';

interface State {
  currentUserInfo: {user: User, token: string} | null | undefined;
}

export default class extends React.Component<{}, State> {
  app: FirebaseApp | null;
  auth: Auth | null;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentUserInfo: undefined,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSignout = this.onSignout.bind(this);

    try {
      this.app = initializeApp(firebaseConfig);
    } catch(e) {
      this.app = null;
      this.auth = null;
      return;
    }

    this.auth = getAuth(this.app);
    this.auth.onAuthStateChanged(user => {
      if (user === null) {
        this.setState(state => ({
          ...state,
          currentUserInfo: null,
        }));
        return;
      }
      user.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          this.setState(state => ({
            ...state,
            currentUserInfo: {
              user,
              token: idToken,
            },
          }));
        });
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
    if (this.app === null) {
      return <div>Failed initing Firebase!!!</div>
    }

    if (this.auth === null) {
      throw new Error('Unreached');
    }
  
    const currentUserInfo = this.state.currentUserInfo;
    if (currentUserInfo === undefined) {
      return <div>Initializing...</div>
    }

    if (currentUserInfo === null) {
      return (
        <SignInForm
          auth={this.auth}
          onSubmit={this.onSubmit}
        />
      );
    }
    return (
      <UserPage
        app={this.app}
        auth={this.auth}
        currentUser={currentUserInfo.user}
        token={currentUserInfo.token}
        onSignout={this.onSignout}
      />
    );


  }
}
