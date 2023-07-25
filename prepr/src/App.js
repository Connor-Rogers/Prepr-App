import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation } from 'react-router-dom'; // added useLocation here
import { Goals } from './Goals';
import UserProfileForm from './CreateProfile';
import AuthForm from './AuthForm';
import { Home } from './Home';
import ProfileButton from './ProfileButton';
import RecipeView from './ViewRecipe';
import UserProfilePage from './UserProfilePage';


import { AuthContextProvider, useAuthState } from './firebase';
import './App.css';
import CreateRecipeForm from './CreateRecipe';

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

const Layout = ({ children }) => {
  const location = useLocation(); // added this line
  const hiddenRoutes = ['/auth', '/new-goal', '/new-profile'];

  return (
    <div>
      {!hiddenRoutes.includes(location.pathname) && <ProfileButton />}
      {children}
    </div>
  )
};

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Layout>
          <AuthenticatedRoute exact path="/new-recipe" component={CreateRecipeForm} />
          <AuthenticatedRoute exact path="/new-goals" component={Goals} />
          <AuthenticatedRoute exact path="/new-profile" component={UserProfileForm} />
          <AuthenticatedRoute exact path="/profile" component={UserProfilePage} />
          <AuthenticatedRoute exact path="/" component={Home} />
          <Route path="/recipe/:document_id" component={RecipeView} />
          <Route exact path="/auth" component={AuthForm} />
        </Layout>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
