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
import Home from "./components/pcportrait/home";
import About from "./components/pcportrait/about";
import Scores from "./components/pcportrait/scores";
import Displayer from "./components/phoneportrait/displayer";


function PcPortait(props) {
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
                    <Displayer format="pcp-"/>
                </Route>
                <Route path="/about">
                    <About format="pcp-" language={props.language} toggleLanguage={props.toggleLanguage}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default PcPortait;