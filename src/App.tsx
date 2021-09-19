import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";

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
import usePageTracking from "./Components/usePageTracking";

function App() {
  usePageTracking();
  return (
    <div id="app">
      <IonApp>
        <SideMenu />
        <IonRouterOutlet id="main" mode="md">
          <Route path="/group/create" component={CreateGroup}></Route>
          <Route path="/profile/editprofile" component={EditProfile}></Route>
          <Route
            path="/profile/changepassword"
            component={ChangePassword}
          ></Route>
          <Route path="/profile" component={UserProfile}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/explore" component={Explore}></Route>
          <Route path="/home" component={Home}></Route>
          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonApp>
    </div>
  );
}

export default App;
