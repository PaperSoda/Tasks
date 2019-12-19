import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/layout/Header";
import CreateFeedback from "./pages/CreateFeedback";
import ViewFeedback from "./pages/ViewFeedback";

const App = () => {
    return (
        <>
            <Router>
                <div>
                    <CssBaseline />
                    <Header />
                    <Switch>
                        <Route path="/create">
                            <CreateFeedback />
                        </Route>
                        <Route path="/view">
                            <ViewFeedback />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
};

export default App;
