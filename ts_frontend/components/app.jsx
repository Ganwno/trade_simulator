import React from 'react';
import { Route } from 'react-router-dom';

import LoggedOutNavBarContainer from './nav_bar/logged_out_nav_bar_container';
import LoggedInNavBarContainer from './nav_bar/logged_in_nav_bar_container';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import LogoutContainer from './session/logout_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Welcome from './session/welcome';
import Homepage from './home/homepage';

export default () => (
    <div>
        <Route exact path="/" component={LoggedOutNavBarContainer} />
        <AuthRoute exact path="/" component={Welcome} />
        <Route exact path="/signup" component={LoggedOutNavBarContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route exact path="/login" component={LoggedOutNavBarContainer} />
        <Route path="/login" component={LoginContainer} />
        <ProtectedRoute exact path="/homepage" component={LoggedInNavBarContainer} />
        <ProtectedRoute exact path="/homepage" component={Homepage} />
        <Route path="/logout" component={LogoutContainer} />
    
    </div>
);
