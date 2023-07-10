import React from 'react';
import { BrowserRouter as Router, Route,  Redirect } from 'react-router-dom';
import { Goals } from './Goals';
import UserProfileForm from './CreateProfile';
import AuthForm from './AuthForm';
import { AuthContextProvider, useAuthState } from './firebase';
import './App.css';

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/auth" />
      }
    />
  );
};

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AuthenticatedRoute exact path="/goals" component={Goals} />
        <AuthenticatedRoute exact path="/user" component={UserProfileForm} />``
        <Route exact path="/auth" component={AuthForm} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;