import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Communication from "./Communication";
import Home from "./Home";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <h2>Navigation</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/comm/:cust_id">
                        <Communication />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
