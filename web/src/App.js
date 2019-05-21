import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Listen from "./Components/Listen/Listen";
import Speak from './Components/Speak/Speak';
import Campaign from './Components/Campaign/Campaign';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import CreateCampaign from './Components/CreateCampaign/CreateCampaign';
import Transcribe from './Components/Transcribe/Transcribe';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Switch>
        <Route path="/" component={Campaign} exact/>
        <Route path="/tasks" component={List} exact/>
        <Route path="/listen" component={Listen} exact/>
        <Route path="/speak" component={Speak} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/signup" component={SignUp} exact/>
        <Route path="/createcampaign" component={CreateCampaign} exact/>
        <Route path="/Transcribe" component={Transcribe} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
