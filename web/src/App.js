import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Listen from "./Components/Listen/Listen";
import Speak from './Components/Speak/Speak';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Switch>
        <Route path="/" component={List} exact/>
        <Route path="/listen" component={Listen}/>
        <Route path="/speak" component={Speak} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
