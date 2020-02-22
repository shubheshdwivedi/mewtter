import React, {Component} from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {routes} from '../routes/RouteConstants'
import Landing from "../../views/pages/landing/Landing";
import ProtectedRoute from "../../views/wrappers/private_routes/PrivateRoute";
import history from "../../helpers/history";
import Search from "../../views/pages/search/Search";
import NotFound from "../../views/pages/404";

class RouterBox extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={routes.landing} component={Landing}/>
                    <Route
                        path={routes.search}
                        render={(props) => <ProtectedRoute {...props} next={Search}/>}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

export default RouterBox;