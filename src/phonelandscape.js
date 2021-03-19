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
import Home from "./components/phonelandscape/home";
import About from "./components/phonelandscape/about";
import Scores from "./components/phonelandscape/scores";
import Displayer from "./components/phonelandscape/displayer";

function PhoneLandscape(props) {
    console.log(`phone : ${props.displayPopUp}`)
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
                    <Displayer format="" displayPopUp={props.displayPopUp} setDisplayPopUp={props.setDisplayPopUp}/>
                </Route>
                <Route path="/about">
                    <About format="" language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default PhoneLandscape;