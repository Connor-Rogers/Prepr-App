import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/home" component={Home} exact />
          <Redirect from="/" to="/home" exact />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;