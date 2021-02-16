import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useLocation,
    useParams
} from "react-router-dom";
import Home from "./components/pclandscape/home";
import About from "./components/pclandscape/about";
import Scores from "./components/pclandscape/scores";

function PcLandscape(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
                <Route path="/scores">
                    <Scores language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default PcLandscape;