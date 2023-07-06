import React from 'react';
import { BrowserRouter as Router, Route,  Redirect } from 'react-router-dom';
import { Home } from './Home';
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
        <AuthenticatedRoute exact path="/" component={Home} />
        <Route exact path="/auth" component={AuthForm} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;