import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { callbackUri } from "./auth.config";
import Home from "./pages/Home";
import MacronutrientCalculator from "./pages/MacronutrientCalculator";
import { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact({
  mode: "md",
});

const App: React.FC = () => {
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (url.startsWith(callbackUri)) {
        if (
          url.includes("state") &&
          (url.includes("code") || url.includes("error"))
        ) {
          await handleRedirectCallback(url);
        }

        await Browser.close();
      }
    });
  }, [handleRedirectCallback]);

  return (
    <IonReactRouter>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>prepr</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Route exact path="/calculator" component={MacronutrientCalculator} />
          <Route exact path="/" component={Home} />
          <Redirect exact from="*" to="/" />
        </IonContent>
      </IonPage>
    </IonReactRouter>
  );
};

export default App;