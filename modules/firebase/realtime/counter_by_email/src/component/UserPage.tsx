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
  count: number;
}

const path_name = 'counter_by_email';

export default class extends React.Component<UserDataProps, UserDataState> {
  constructor(props: UserDataProps) {
    super(props);

    this.state = {
      isLoading: true,
      count: 0,
    };

    this.signOut = this.signOut.bind(this);
    this.addCounter = this.addCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  async componentDidMount() {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    onValue(dbref, (snapshot) => {
      this.setState(state => ({
        ...state,
        isLoading: false,
        count: snapshot.val() ?? 0,
      }))
    });
  }

  signOut() {
    this.props.onSignout(this.props.auth);
  }

  async addCounter() {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    const newData = this.state.count + 1;

    await dbset(dbref, newData);
  }

  async resetCounter() {
    const database = getDatabase();
    const dbref = ref(database, `k27c8data/${this.props.currentUser.uid}/${path_name}`);

    await dbset(dbref, 0);
  }

  render() {
    return (<React.Fragment>
      <div>Hello, {this.props.currentUser.email}!!</div>
      {this.state.isLoading
        ? <div>Data Loading...</div>
        : <UserData
          count={this.state.count}
          addCounter={this.addCounter}
          resetCounter={this.resetCounter}
        />
      }
      <button onClick={this.signOut}>signout</button>
    </React.Fragment>);
  }
}
