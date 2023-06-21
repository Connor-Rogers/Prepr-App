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

import recipeImage from "../images/recipe-image3.jpg"; 
import "./RecipePage.css";

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
          <IonLabel className="recipe-title">Dessert Crepes</IonLabel>
        </IonItem>

        {/* Recipe Image */}
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
        </IonItem>

        {/* Recipe Description */}
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            Essential crepe recipe. Sprinkle warm crepes with sugar and lemon, or serve with cream or ice cream and fruit.
          </IonLabel>
        </IonItem>

        {/* Recipe Details */}
        <IonItem><IonLabel>Category:</IonLabel> <IonLabel>Breakfast and Brunch</IonLabel></IonItem>
        <IonItem><IonLabel>Author:</IonLabel> <IonLabel>ANN57</IonLabel></IonItem>
        <IonItem><IonLabel>Rating:</IonLabel> <IonLabel>4.8</IonLabel></IonItem>
        <IonItem><IonLabel>Rating Count:</IonLabel> <IonLabel>1156</IonLabel></IonItem>
        <IonItem><IonLabel>Review Count:</IonLabel> <IonLabel>794</IonLabel></IonItem>

        {/* Ingredients */}
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>4 eggs, lightly beaten</li>
              <li>1â€‰â…“ cups milk</li>
              <li>2 tablespoons butter, melted</li>
              <li>1 cup all-purpose flour</li>
              <li>2 tablespoons white sugar</li>
              <li>Â½ teaspoon salt</li>
            </ul>
          </IonLabel>
        </IonItem>

        {/* Instructions */}
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>
              <li>In large bowl, whisk together eggs, milk, melted butter, flour sugar and salt until smooth.</li>
              <li>Heat a medium-sized skillet or crepe pan over medium heat. Grease pan with a small amount of butter or oil applied with a brush or paper towel.</li>
              <li>Using a serving spoon or small ladle, spoon about 3 tablespoons crepe batter into hot pan, tilting the pan so that bottom surface is evenly coated.</li>
              <li>Cook over medium heat, 1 to 2 minutes on a side, or until golden brown. Serve immediately.</li>
            </ol>
          </IonLabel>
        </IonItem>

        {/* Time Estimates */}
        <IonItem><IonLabel>Prep Time:</IonLabel> <IonLabel>10 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Cook Time:</IonLabel> <IonLabel>10 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Total Time:</IonLabel> <IonLabel>20 mins</IonLabel></IonItem>

        {/* Serving Details */}
        <IonItem><IonLabel>Servings:</IonLabel> <IonLabel>8</IonLabel></IonItem>
        <IonItem><IonLabel>Yields:</IonLabel> <IonLabel>8 crepes</IonLabel></IonItem>

        {/* Nutritional Information */}
        <IonItem><IonLabel>Calories:</IonLabel> <IonLabel>163.8</IonLabel></IonItem>
        <IonItem><IonLabel>Carbohydrates (g):</IonLabel> <IonLabel>17.2</IonLabel></IonItem>
        <IonItem><IonLabel>Sugars (g):</IonLabel> <IonLabel>5.3</IonLabel></IonItem>
        <IonItem><IonLabel>Fat (g):</IonLabel> <IonLabel>7.7</IonLabel></IonItem>
        <IonItem><IonLabel>Saturated Fat (g):</IonLabel> <IonLabel>3.4</IonLabel></IonItem>
        <IonItem><IonLabel>Cholesterol (mg):</IonLabel> <IonLabel>111.1</IonLabel></IonItem>
        <IonItem><IonLabel>Protein (g):</IonLabel> <IonLabel>6.4</IonLabel></IonItem>
        <IonItem><IonLabel>Dietary Fiber (g):</IonLabel> <IonLabel>0.4</IonLabel></IonItem>
        <IonItem><IonLabel>Sodium (mg):</IonLabel> <IonLabel>234.5</IonLabel></IonItem>
        {/* ...other fields... */}
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
