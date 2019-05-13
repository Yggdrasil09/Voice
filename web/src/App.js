import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Listen from "./Components/Listen/Listen";
import Speak from './Components/Speak/Speak';
import SignUp from './Components/Login/SignUp';
import Login from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Switch>
        <Route path="/" component={List} exact/>
        <Route path="/listen" component={Listen}/>
        <Route path="/speak" component={Speak} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
