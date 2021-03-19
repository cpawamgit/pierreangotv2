import React, { useState } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useLocation,
    useParams
} from "react-router-dom";
import Home from "./components/phoneportrait/home";
import About from "./components/phoneportrait/about";
import Scores from "./components/phoneportrait/scores";
import Displayer from "./components/phoneportrait/displayer";


function PhonePortrait(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
                <Route path="/scores">
                    <Scores language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
                <Route path="/displayer">
                    <Displayer format="pcp-" displayPopUp={props.displayPopUp} setDisplayPopUp={props.setDisplayPopUp}/>
                </Route>
                <Route path="/about">
                    <About format="pcp-" language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default PhonePortrait;