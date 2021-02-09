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
import Home from "./components/tabletportrait/home";
import About from "./components/tabletportrait/about";
import Scores from "./components/tabletportrait/scores";

function TabletPortait() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
export default TabletPortait;