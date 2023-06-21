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

import recipeImage from "../images/recipe-image4.jpg";
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
          <IonLabel className="recipe-title">Pork Steaks</IonLabel>
        </IonItem>

        {/* Recipe Image */}
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
        </IonItem>

        {/* Recipe Description */}
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            My mom came up with this recipe when I was a child. It is the ONLY way I will eat green onions.
          </IonLabel>
        </IonItem>

        {/* Recipe Details */}
        <IonItem><IonLabel>Category:</IonLabel> <IonLabel>Meat and Poultry</IonLabel></IonItem>
        <IonItem><IonLabel>Author:</IonLabel> <IonLabel>BABYLOVE1222</IonLabel></IonItem>
        <IonItem><IonLabel>Rating:</IonLabel> <IonLabel>4.57</IonLabel></IonItem>
        <IonItem><IonLabel>Rating Count:</IonLabel> <IonLabel>689</IonLabel></IonItem>
        <IonItem><IonLabel>Review Count:</IonLabel> <IonLabel>539</IonLabel></IonItem>

        {/* Ingredients */}
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>Â¼ cup butter</li>
              <li>Â¼ cup soy sauce</li>
              <li>1 bunch green onions</li>
              <li>2 cloves garlic, minced</li>
              <li>6 pork butt steaks</li>
            </ul>
          </IonLabel>
        </IonItem>

        {/* Instructions */}
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>
              <li>Melt butter in a skillet, and mix in the soy sauce.</li>
              <li>Saute the green onions and garlic until lightly browned.</li>
              <li>Place the pork steaks in the skillet, cover, and cook 8 to 10 minutes on each side,</li>
              <li>Remove cover, and continue cooking 10 minutes, or to an internal temperature of 145 degrees F (63 degrees C).</li>
            </ol>
          </IonLabel>
        </IonItem>

        {/* Time Estimates */}
        <IonItem><IonLabel>Prep Time:</IonLabel> <IonLabel>15 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Cook Time:</IonLabel> <IonLabel>30 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Total Time:</IonLabel> <IonLabel>45 mins</IonLabel></IonItem>

        {/* Serving Details */}
        <IonItem><IonLabel>Servings:</IonLabel> <IonLabel>6</IonLabel></IonItem>
        <IonItem><IonLabel>Yields:</IonLabel> <IonLabel>6 servings</IonLabel></IonItem>

        {/* Nutritional Information */}
        <IonItem><IonLabel>Calories:</IonLabel> <IonLabel>353.1</IonLabel></IonItem>
        <IonItem><IonLabel>Carbohydrates (g):</IonLabel> <IonLabel>3.9</IonLabel></IonItem>
        <IonItem><IonLabel>Sugars (g):</IonLabel> <IonLabel>1.1</IonLabel></IonItem>
        <IonItem><IonLabel>Fat (g):</IonLabel> <IonLabel>25.4</IonLabel></IonItem>
        <IonItem><IonLabel>Saturated Fat (g):</IonLabel> <IonLabel>11.4</IonLabel></IonItem>
        <IonItem><IonLabel>Cholesterol (mg):</IonLabel> <IonLabel>118</IonLabel></IonItem>
        <IonItem><IonLabel>Protein (g):</IonLabel> <IonLabel>26.5</IonLabel></IonItem>
        <IonItem><IonLabel>Dietary Fiber (g):</IonLabel> <IonLabel>1.1</IonLabel></IonItem>
        <IonItem><IonLabel>Sodium (mg):</IonLabel> <IonLabel>719.7</IonLabel></IonItem>
        <IonItem><IonLabel>Calories from Fat:</IonLabel> <IonLabel>228.4</IonLabel></IonItem>
        <IonItem><IonLabel>Calcium (mg):</IonLabel> <IonLabel>59</IonLabel></IonItem>
        <IonItem><IonLabel>Iron (mg):</IonLabel> <IonLabel>2.5</IonLabel></IonItem>
        <IonItem><IonLabel>Magnesium (mg):</IonLabel> <IonLabel>35.4</IonLabel></IonItem>
        <IonItem><IonLabel>Potassium (mg):</IonLabel> <IonLabel>436.9</IonLabel></IonItem>
        <IonItem><IonLabel>Phosphorus (mg):</IonLabel> <IonLabel>618.3</IonLabel></IonItem>
        <IonItem><IonLabel>Zinc (mg):</IonLabel> <IonLabel>9</IonLabel></IonItem>
        <IonItem><IonLabel>Magnesium (mg):</IonLabel> <IonLabel>7.4</IonLabel></IonItem>
        <IonItem><IonLabel>Potassium (mg):</IonLabel> <IonLabel>25.8</IonLabel></IonItem>
        <IonItem><IonLabel>Zinc (mg):</IonLabel> <IonLabel>0.7</IonLabel></IonItem>

      </IonContent>
    </IonPage>
  );
};

export default RecipePage;

