import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Planner from './planner';
import './styles.css'

const App: React.FC = () => (
  <IonReactRouter>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prepr</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonRouterOutlet>
        <Route path="/planner" component={withAuthenticationRequired(Planner)} exact={true} />
        <Route path="/" component={Home} exact={true} />
      </IonRouterOutlet>
    </IonPage>
  </IonReactRouter>
);

const Home: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <IonContent>
      {!isAuthenticated && (
        <IonButton expand="full" onClick={() => loginWithRedirect()}>
          Log In / Sign Up
        </IonButton>
      )}
      {isAuthenticated && <Redirect to="/planner" />}
    </IonContent>
  );
};

export default App;