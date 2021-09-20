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
import CreateEvent from "./CreateEvent";
import usePageTracking from "./Components/usePageTracking";
import { useAuthState } from "./AuthContext";
import AuthRoute from "./Components/AuthRoute";

function App() {
  usePageTracking();
  const userDetails = useAuthState();

  return (
    <div id="app">
      <IonApp>
        <SideMenu />
        <IonRouterOutlet id="main">
          <AuthRoute path="/event/create" component={CreateEvent}></AuthRoute>
          <AuthRoute path="/group/create" component={CreateGroup}></AuthRoute>
          <AuthRoute
            path="/profile/editprofile"
            component={EditProfile}
          ></AuthRoute>
          <AuthRoute
            path="/profile/changepassword"
            component={ChangePassword}
          ></AuthRoute>
          <AuthRoute path="/profile" component={UserProfile}></AuthRoute>
          <AuthRoute path="/explore" component={Explore}></AuthRoute>
          <Route path="/signup" component={Signup}></Route>
          <Route
            path="/login"
            render={() =>
              Boolean(userDetails.accessToken) ? (
                <Redirect to="/home" />
              ) : (
                <Login />
              )
            }
          />
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonApp>
    </div>
  );
}

export default App;
