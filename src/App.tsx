import { Route, Switch, Redirect, Router } from "react-router-dom";
import { IonApp } from "@ionic/react";
import "@ionic/react/css/core.css";

import "./index.css";

import SideMenu from "./Components/SideMenu";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EditProfile from "./Profile/EditProfile";
import UserProfile from "./Profile/UserProfile";
import ChangePassword from "./Profile/ChangePassword";
import Home from "./Home";
import Explore from "./Explore";
import CreateGroup from "./CreateGroup";
import GroupView from "./GroupView/index";

function App() {
  return (
    <div id="app">
      <IonApp>
        <SideMenu />
        <Switch>
          <Route path="/profile/editprofile" component={EditProfile}></Route>
          <Route
            path="/profile/changepassword"
            component={ChangePassword}
          ></Route>
          <Route path="/group1" component={GroupView}></Route>
          <Route path="/profile" component={UserProfile}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/explore" component={Explore}></Route>
          <Route path="/group/create" component={CreateGroup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </IonApp>
    </div>
  );
}

export default App;
