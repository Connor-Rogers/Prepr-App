import React from "react";
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel 
} from "@ionic/react";

import recipeImage from "../images/recipe-image2.jpg"; // Update this to the image of the Gourmet Mushroom Risotto
import "./RecipePage.css";
import MacronutrientCalculator from "./MacronutrientCalculator";

const RecipePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* Recipe Title */}
        <IonItem>
          <IonLabel className="recipe-title">Gourmet Mushroom Risotto</IonLabel>
        </IonItem>

        {/* Recipe Image */}
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
        </IonItem>

        {/* Recipe Description */}
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            Authentic Italian-style risotto cooked the slow and painful way, but oh so worth it. Complements grilled meats and chicken dishes very well. Check the rice by biting into it. It should be slightly al dente (or resist slightly to the tooth but not be hard in the center).
          </IonLabel>
        </IonItem>

        {/* Recipe Details */}
        <IonItem><IonLabel>Category:</IonLabel> <IonLabel>Main Dish</IonLabel></IonItem>
        <IonItem><IonLabel>Author:</IonLabel> <IonLabel>Myleen Sagrado SjÃ¶din</IonLabel></IonItem>
        <IonItem><IonLabel>Rating:</IonLabel> <IonLabel>4.8</IonLabel></IonItem>
        <IonItem><IonLabel>Rating Count:</IonLabel> <IonLabel>3388</IonLabel></IonItem>
        <IonItem><IonLabel>Review Count:</IonLabel> <IonLabel>2245</IonLabel></IonItem>

        {/* Ingredients */}
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>6 cups chicken broth, divided</li>
              <li>3 tablespoons olive oil, divided</li>
              <li>1 pound portobello mushrooms, thinly sliced</li>
              <li>1 pound white mushrooms, thinly sliced</li>
              <li>2 shallots, diced</li>
              <li>1â€‰Â½ cups Arborio rice</li>
              <li>Â½ cup dry white wine</li>
              <li>sea salt to taste</li>
              <li>freshly ground black pepper to taste</li>
              <li>3 tablespoons finely chopped chives</li>
              <li>4 tablespoons butter</li>
              <li>â…“ cup freshly grated Parmesan cheese</li>
            </ul>
          </IonLabel>
        </IonItem>

        {/* Instructions */}
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>
              <li>In a saucepan, warm the broth over low heat. Warm 2 tablespoons olive oil in a large saucepan over medium-high heat. Stir in the mushrooms, and cook until soft, about 3 minutes. Remove mushrooms and their liquid, and setHere is the continued version of the above code:

```jsx
              aside.</li>
              <li>Add 1 tablespoon olive oil to skillet, and stir in the shallots. Cook 1 minute. Add rice, stirring to coat with oil, about 2 minutes. When the rice has taken on a pale, golden color, pour in wine, stirring constantly until the wine is fully absorbed.</li>
              <li>Add 1/2 cup broth to the rice, and stir until the broth is absorbed. Continue adding broth 1/2 cup at a time, stirring continuously, until the liquid is absorbed and the rice is al dente, about 15 to 20 minutes.</li>
              <li>Remove from heat, and stir in mushrooms with their liquid, butter, chives, and parmesan. Season with salt and pepper to taste.</li>
            </ol>
          </IonLabel>
        </IonItem>

        {/* Time Estimates */}
        <IonItem><IonLabel>Prep Time:</IonLabel> <IonLabel>20 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Cook Time:</IonLabel> <IonLabel>30 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Total Time:</IonLabel> <IonLabel>50 mins</IonLabel></IonItem>

        {/* Serving Details */}
        <IonItem><IonLabel>Servings:</IonLabel> <IonLabel>6</IonLabel></IonItem>
        <IonItem><IonLabel>Yields:</IonLabel> <IonLabel>6 servings</IonLabel></IonItem>

        {/* Nutritional Information */}
        <IonItem><IonLabel>Calories:</IonLabel> <IonLabel>430.6</IonLabel></IonItem>
        <IonItem><IonLabel>Carbohydrates (g):</IonLabel> <IonLabel>56.6</IonLabel></IonItem>
        <IonItem><IonLabel>Sugars (g):</IonLabel> <IonLabel>4.4</IonLabel></IonItem>
        <IonItem><IonLabel>Fat (g):</IonLabel> <IonLabel>16.6</IonLabel></IonItem>
        <IonItem><IonLabel>Saturated Fat (g):</IonLabel> <IonLabel>6.6</IonLabel></IonItem>
        <IonItem><IonLabel>Cholesterol (mg):</IonLabel> <IonLabel>29.3</IonLabel></IonItem>
        <IonItem><IonLabel>Protein (g):</IonLabel> <IonLabel>11.3</IonLabel></IonItem>
        <IonItem><IonLabel>Dietary Fiber (g):</IonLabel> <IonLabel>2.7</IonLabel></IonItem>
        <IonItem><IonLabel>Sodium (mg):</IonLabel> <IonLabel>1130.8</IonLabel></IonItem>
        {/* ...other fields... */}
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
