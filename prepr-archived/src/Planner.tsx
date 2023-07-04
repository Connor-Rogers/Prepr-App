import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/react';

const Planner: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Planner</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <p>Welcome to the planner. This is a secured view.</p>
    </IonContent>
  </IonPage>
);

export default Planner;