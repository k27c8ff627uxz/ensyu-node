import React from 'react';
import { FirebaseApp } from 'firebase/app';
import { User, Auth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { UserData } from './UserData';

interface UserDataProps {
  currentUser: User;
  app: FirebaseApp;
  auth: Auth;
  onSignout: (auth: Auth) => void;
}

interface UserDataState {
  currentList: string[] | undefined;
  isLoading: boolean;
}

export default class extends React.Component<UserDataProps, UserDataState> {
  functions = getFunctions();

  constructor(props: UserDataProps) {
    super(props);

    this.state = {
      currentList: undefined,
      isLoading: false,
    };

    this.signOut = this.signOut.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  async componentDidMount() {
    this.reload();
  }

  signOut() {
    this.props.onSignout(this.props.auth);
  }

  reload() {
    const call = httpsCallable<void, {response: string[]}>(this.functions, 'getListOnCall');
    this.setState(state => ({...state, isLoading: true}));
    call().then((value) => {
      this.setState(state => ({
        ...state,
        isLoading: false,
        currentList: value.data.response,
      }));
    }).catch(e => {
      console.log(e);
    })
  }

  async addList(data: string) {
    const call = httpsCallable<{value: string}, {response: string[]}>(this.functions, 'addListOnCall');
    this.setState(state => ({...state, isLoading: true}));
    await call({value: data});
    this.reload();
  }

  async deleteList(i: number) {
    const call = httpsCallable<{index: number}, {response: string[]}>(this.functions, 'deleteListOnCall');
    this.setState(state => ({...state, isLoading: true}));
    await call({index: i});
    this.reload();
  }

  render() {
    return (<React.Fragment>
      <div>Hello, {this.props.currentUser.email}!!</div>
      <button onClick={() => this.reload()}>
        Reload
      </button>
      {this.state.currentList === undefined
        ? <div>Data Loading...</div>
        : <UserData
          disabled={this.state.isLoading}
          currentList={this.state.currentList}
          addList={this.addList}
          deleteList={this.deleteList}
        />
      }
      <button onClick={this.signOut}>signout</button>
    </React.Fragment>);
  }
}
