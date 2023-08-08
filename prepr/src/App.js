import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation } from 'react-router-dom';
import { Goals } from './Goals';
import UserProfileForm from './CreateProfile';
import AuthForm from './AuthForm';
import { Home } from './Home';
import ProfileButton from './ProfileButton';
import RecipeView from './ViewRecipe';
import UserProfilePage from './UserProfilePage';
import MealPlanPage from './MealPlanner';
import Landing from './Landing';
import Pantry from './Pantry';

import { AuthContextProvider, useAuthState } from './firebase';
import './App.css';
import CreateRecipeForm from './CreateRecipe';
import SearchRecipe from './SearchRecipe';

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
  const location = useLocation();
  const hiddenRoutes = ['/auth', '/new-goals/signup', '/new-profile', '/'];

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
          <AuthenticatedRoute exact path="/new-goals/:text" component={Goals} />
          <AuthenticatedRoute exact path="/new-profile" component={UserProfileForm} />
          <AuthenticatedRoute exact path="/profile" component={UserProfilePage} />
          <AuthenticatedRoute exact path="/search" component={SearchRecipe} />
          <AuthenticatedRoute exact path="/home" component={Home} />
          <AuthenticatedRoute path="/recipe/:document_id" component={RecipeView} />
          <AuthenticatedRoute exact path="/meal-plan" component={MealPlanPage} />
          <AuthenticatedRoute exact path="/pantry" component={Pantry} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/auth" component={AuthForm} />
        </Layout>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
