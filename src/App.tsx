import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IonApp } from "@ionic/react";

import Home from "./Home";

import "@ionic/react/css/core.css";
import "./index.css";
import SideMenu from "./Components/SideMenu";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

function App() {
  return (
    <Router>
      <div id="app">
        <IonApp>
          <SideMenu />
          <Switch>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonApp>
      </div>
    </Router>
  );
}

export default App;
