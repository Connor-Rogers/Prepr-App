import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useAuth0 } from "@auth0/auth0-react";
import { callbackUri } from "./auth.config";
import Home from "./pages/Home";
import MacronutrientCalculator from "./pages/MacronutrientCalculator";
import RecipePage from "./pages/RecipePage";
import RecipePageTwo from "./pages/RecipePageTwo";
import RecipePageThree from "./pages/RecipePageThree";
import RecipePageFour from "./pages/RecipePageFour";
import RecipePageFive from "./pages/RecipePageFive";
import RecipePageSix from "./pages/RecipePageSix";
import RecipePageSeven from "./pages/RecipePageSeven";
import WeekView from "./pages/WeekView";


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
import { useEffect } from "react";


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
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/calculator">
            <MacronutrientCalculator />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/recipe1">
            <RecipePage />
          </Route>
          <Route exact path="/recipe2">
            <RecipePageTwo />
          </Route>
          <Route exact path="/recipe3">
            <RecipePageThree />
          </Route>
          <Route exact path="/recipe4">
            <RecipePageFour />
          </Route>
          <Route exact path="/recipe5">
            <RecipePageFive />
          </Route>
          <Route exact path="/recipe6">
            <RecipePageSix />
          </Route>
          <Route exact path="/recipe7">
            <RecipePageSeven />
          </Route>
          <Route exact path="/weekview">
            <WeekView />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
