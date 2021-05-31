import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {authenticate} from "../actions/SessionApi";

class PrivateRoute extends Component {
    state = {
        haveAccess: false,
        loaded: false,
    }

    componentDidMount() {
        this.checkAccess();
    }

    roleChecker = (requiredRoles, role) => {
        return requiredRoles.includes(role)
    }


    checkAccess = () => {
        const { userRoles, history } = this.props;
        let { haveAccess } = this.state;

        // your fetch request
        authenticate((result) => {
            haveAccess = this.roleChecker(userRoles, result.role); // true || false
            if (haveAccess) {
                this.setState({
                    haveAccess,
                    loaded: true,
                });
            } else {
                history.push('/');
            }
        })

    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { loaded, haveAccess } = this.state;
        if (!loaded) return null;
        return (
            <Route
                {...rest}
                render={props => {
                    return haveAccess ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    );
                }}
            />
        );
    }
}

export default withRouter(PrivateRoute);
