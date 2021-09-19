import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./Home";
import Explore from "./Explore";

import "@ionic/react/css/core.css";
import "./index.css";
import SideMenu from "./Components/SideMenu";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EditProfile from "./Profile/EditProfile";
import UserProfile from "./Profile/UserProfile";
import ChangePassword from "./Profile/ChangePassword";

function App() {
  return (
    <div id="app">
      <IonApp>
        <IonReactRouter>
          <SideMenu />
          <IonRouterOutlet id="main">
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
        </IonReactRouter>
      </IonApp>
    </div>
  );
}

export default App;
