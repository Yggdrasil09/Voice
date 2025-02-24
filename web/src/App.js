import React, { Component } from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

import url  from './url_service';
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Listen from "./Components/Listen/Listen";
import Speak from "./Components/Speak/Speak";
import Campaign from "./Components/Campaign/Campaign";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import CreateCampaign from "./Components/CreateCampaign/CreateCampaign";
import Transcribe from "./Components/Transcribe/Transcribe";
import TwofactorLogin from "./Components/Login/TwofactorLogin";
import ListenorTrans from "./Components/List/ListenorTrans";
import OtpLogin from "./Components/Login/OtpLogin";
import CampaignDescription from "./Components/Campaign/CampaignDescription";
import Stats from "./Components/Stats/Stats";
import Profile from './Components/Profile/Profile';
import ListenParallel from './Components/Listen/ListenParallel';
import EditCampaign from './Components/CreateCampaign/EditCampaign';
import ConversationSpeak from './Components/Speak/ConversationSpeak';

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    fetch(url + "/protected", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookies.get("token")
      },
      credentials: "same-origin"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if(data.message==="LoggedIn")
        {
          this.setState({
            loggedIn: true,
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <Switch>
          <Route path="/" component={Campaign} exact />
          <Route path="/tasks" component={List} exact />
          <Route path="/listen" component={Listen} exact />
          <Route path="/speak" component={Speak} exact />
          <Route path="/conversation" component={ConversationSpeak} exact />
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" component={SignUp} exact />
          <Route path="/otplogin" exact render={()=>(
            this.state.loggedIn&&localStorage.getItem("LoginMethod")==="listen"?<Redirect to="/lttasks"/>:<TwofactorLogin/>
          )}/>
          <Route path="/otpcheck" component={OtpLogin} exact />
          <Route path="/lttasks" component={ListenorTrans} exact />
          <Route path="/listenparallel" component={ListenParallel} exact/>
          <Route path="/stats" component={Stats} exact />
          <Route path="/campdescription" exact render={()=>(
            this.state.loggedIn&&localStorage.getItem("LoginMethod")==="speak"?<Redirect to="/speak"/>:<CampaignDescription/>
          )}/>
          <Route path="/profile" component={Profile} exact/>
          <Route path="/createcampaign" component={CreateCampaign} exact />
          <Route path="/editcampaign" component={EditCampaign} exact />
          <Route path="/Transcribe" component={Transcribe} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
