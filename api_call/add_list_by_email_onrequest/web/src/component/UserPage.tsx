import React from 'react';
import { FirebaseApp } from 'firebase/app';
import { User, Auth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import axios from 'axios'
import { UserData } from './UserData';
import { BASE_URL } from '../firebaseConfig';

interface ResponseData {
  response: string[];
}

interface UserDataProps {
  currentUser: User;
  app: FirebaseApp;
  auth: Auth;
  token: string;
  onSignout: (auth: Auth) => void;
}

interface UserDataState {
  currentList: string[] | undefined;
  isLoading: boolean;
}

const basePath = `${BASE_URL}/add_list_by_email_onrequest`;

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
    axios.get<ResponseData>(`${basePath}/list`, { headers: { Authorization: `bearer ${this.props.token}`}})
      .then(value => {
        this.setState(state => ({
          ...state,
          isLoading: false,
          currentList: value.data.response,
        }));
      });
  }

  async addList(data: string) {
    axios.post<ResponseData>(
      `${basePath}/list`,
      { value: data },
      { headers: { Authorization: `bearer ${this.props.token}`}}
    ).then(value => {
      this.setState(state => ({
        ...state,
        currentList: value.data.response,
      }));
    });
  }

  async deleteList(i: number) {
    axios.delete<ResponseData>(
      `${basePath}/list/${i}`,
      { headers: { Authorization: `bearer ${this.props.token}`}}
    ).then(value => {
      this.setState(state => ({
        ...state,
        currentList: value.data.response,
      }));
    });
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
