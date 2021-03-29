import React from 'react';
import Signup from './user/Signup';
import { AuthProvider } from './user/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './user/Profile';
import Login from './user/Login';
import PrivateRoute from './user/PrivateRoute';
import ForgotPassword from './user/ForgotPassword';
import UpdateProfile from './user/UpdateProfile';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            {/* App */}
            <PrivateRoute exact path='/' component={Dashboard} />
            {/* Profile */}
            <PrivateRoute path='/user' component={Profile} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />

            {/* Auth */}
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
