import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {isLoggedIn} from "../../../helpers/helpers";
import {routes} from "../../../connect/routes/RouteConstants";

class ProtectedRoute extends React.Component {
    redirect = () => {
        return <Redirect to={routes.auth}/>;
    };

    render() {
        if (isLoggedIn() &&
            this.props.user !== null &&
            this.props.token !== null
        ) return <this.props.next {...this.props} user={this.props.user}/>;

        return this.redirect();
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.DataReducer.AuthReducer.token,
        user : state.DataReducer.AuthReducer.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRoute);
