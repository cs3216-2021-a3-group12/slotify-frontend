import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, createAnimation } from "@ionic/react";
import "@ionic/react/css/core.css";
import "./index.css";
import { Switch } from "react-router";
import SideMenu from "./Components/SideMenu";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EditProfile from "./Profile/EditProfile";
import UserProfile from "./Profile/UserProfile";
import ChangePassword from "./Profile/ChangePassword";
import Home from "./Home";
import Event from "./Event";
import Explore from "./Explore";
import CreateGroup from "./CreateGroup";
import CreateEvent from "./CreateEvent";
import usePageTracking from "./Components/usePageTracking";
import { useAuthState } from "./AuthContext";
import AuthRoute from "./Components/AuthRoute";
import GroupView from "./GroupView";
import EditGroup from "./EditGroup";

// https://medium.com/nerd-for-tech/ionic-react-implementing-custom-page-transition-animation-48aa3086e9da
const animationBuilder = (baseEl: any, opts: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo("opacity", 0, 1)
    .duration(250);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo("opacity", 1, 0)
    .duration(250);

  const animation = createAnimation()
    .addAnimation(enteringAnimation)
    .addAnimation(leavingAnimation);

  return animation;
};

function App() {
  usePageTracking();
  const userDetails = useAuthState();

  return (
    <div id="app">
      <IonApp>
        <SideMenu />
        <IonRouterOutlet id="main" animation={animationBuilder}>
          <Switch>
            <AuthRoute path="/explore" component={Explore}></AuthRoute>
            <AuthRoute path="/events/:id" component={Event}></AuthRoute>
            <AuthRoute path="/groups/:id" component={GroupView}></AuthRoute>
            <AuthRoute
              path="/createEvent/:groupId"
              component={CreateEvent}
            ></AuthRoute>
            <AuthRoute path="/editGroup/:id" component={EditGroup}></AuthRoute>
            <AuthRoute
              exact
              path="/createGroup"
              component={CreateGroup}
            ></AuthRoute>
            <AuthRoute
              path="/profile/editprofile"
              component={EditProfile}
            ></AuthRoute>
            <AuthRoute
              path="/profile/changepassword"
              component={ChangePassword}
            ></AuthRoute>
            <AuthRoute
              path="/profile"
              exact={true}
              component={UserProfile}
            ></AuthRoute>
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
          </Switch>
        </IonRouterOutlet>
      </IonApp>
    </div>
  );
}

export default App;
