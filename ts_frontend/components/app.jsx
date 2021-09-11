import React from 'react';
import { Route } from 'react-router-dom';

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import LogoutContainer from './session/logout_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Welcome from './session/welcome';
import Homepage from './home/homepage';

export default () => (
    <div>
        <AuthRoute exact path="/" component={Welcome} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/login" component={LoginContainer} />
        <ProtectedRoute exact path="/homepage" component={Homepage} />
        <Route path="/logout" component={LogoutContainer} />
    
    </div>
);
