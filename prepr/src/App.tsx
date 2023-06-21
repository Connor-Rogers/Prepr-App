import {
  IonModal,
  IonRouterOutlet,
  IonApp,
  IonButton,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter,  } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useAuth0 } from "@auth0/auth0-react";
import { callbackUri } from "./auth.config";
import Home from "./pages/Home";
import MacronutrientCalculator from "./pages/MacronutrientCalculator";
import { useEffect, useState } from "react";

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
  const { handleRedirectCallback, isAuthenticated } = useAuth0()
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

  const [showModal, setShowModal] = useState(false);
  ;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
            {/* Button to open the Macronutrient Calculator Modal */}
            <IonButton onClick={() => setShowModal(true)}>
              Open Macronutrient Calculator
            </IonButton>

            {/* Modal */}
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
              {/* Check if user is authenticated before showing content */}
              {isAuthenticated ? (
                <MacronutrientCalculator />
              ) : (
                <div>You must be logged in to view this content</div>
              )}
            </IonModal>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;