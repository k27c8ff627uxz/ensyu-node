import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Switch> */}
        {/* <Route exact path="/"> */}
        <Route path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/about/ex">
          <AboutEx />
        </Route>
        <Route path="/:user" component={User} />
      {/* </Switch> */}
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function AboutEx() {
  return <h2>AboutEx</h2>;
}

function User(props: any) {
  const { params } = props.match
  return <h2>User: {params.user}</h2>;
}

export default App;
