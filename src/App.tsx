import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IonApp } from "@ionic/react";

import Home from "./Home";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./index.css";
import SideMenu from "./Components/SideMenu";

function App() {
    return (
        <Router>
            <div id="app">
                <IonApp>
                    <SideMenu />
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </IonApp>
            </div>
        </Router>
    );
}

export default App;
