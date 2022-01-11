import React from 'react';
import { User, Auth } from 'firebase/auth';
import { getDatabase, onValue, set as dbset, ref, get as dbget } from 'firebase/database';
import { UserData } from './UserData';

interface UserDataProps {
  currentUser: User;
  auth: Auth;
  onSignout: (auth: Auth) => void;
}

interface UserDataState {
  isLoading: boolean;
  currentList: string[];
}

const path_name = 'add_list_by_email';

export default class extends React.Component<UserDataProps, UserDataState> {
  constructor(props: UserDataProps) {
    super(props);

    this.state = {
      isLoading: true,
      currentList: [],
    };

    this.signOut = this.signOut.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  async componentDidMount() {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    onValue(dbref, (snapshot) => {
      this.setState(state => ({
        ...state,
        isLoading: false,
        currentList: snapshot.val() ?? [],
      }))
    });
  }

  signOut() {
    this.props.onSignout(this.props.auth);
  }

  async addList(data: string) {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    const newData = [
      ...this.state.currentList,
      data,
    ];

    await dbset(dbref, newData);
  }

  async deleteList(i: number) {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    const newData = this.state.currentList.filter((v, index) => i !== index);
    await dbset(dbref, newData);

  }

  render() {
    return (<React.Fragment>
      <div>Hello, {this.props.currentUser.email}!!</div>
      {this.state.isLoading
        ? <div>Data Loading...</div>
        : <UserData
          currentList={this.state.currentList}
          addList={this.addList}
          deleteList={this.deleteList}
        />
      }
      <button onClick={this.signOut}>signout</button>
    </React.Fragment>);
  }
}
