import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { IonApp } from "@ionic/react";

import Home from "./Home";
import Explore from "./Explore";

import "@ionic/react/css/core.css";
import "./index.css";
import SideMenu from "./Components/SideMenu";

function App() {
    return (
        <Router>
            <div id="app">
                <IonApp>
                    <SideMenu />
                    <Switch>
                        <Route path="/explore" component={Explore}></Route>
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
