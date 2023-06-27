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

import recipeImage from "../images/recipe-image1.jpg";
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
          <IonLabel className="recipe-title">Simple Macaroni and Cheese</IonLabel>
        </IonItem>

        {/* Recipe Image */}
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
        </IonItem>

        {/* Recipe Description */}
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            A very quick and easy fix to a tasty side-dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many exotic and expensive cheeses, but they aren't always the best tasting. This recipe is cheap and tasty.
          </IonLabel>
        </IonItem>

        {/* Recipe Details */}
        <IonItem><IonLabel>Category:</IonLabel> <IonLabel>Main Dish</IonLabel></IonItem>
        <IonItem><IonLabel>Author:</IonLabel> <IonLabel>g0dluvsugly</IonLabel></IonItem>
        <IonItem><IonLabel>Rating:</IonLabel> <IonLabel>4.42</IonLabel></IonItem>
        <IonItem><IonLabel>Rating Count:</IonLabel> <IonLabel>834</IonLabel></IonItem>
        <IonItem><IonLabel>Review Count:</IonLabel> <IonLabel>575</IonLabel></IonItem>

        {/* Ingredients */}
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>1 (8 ounce) box elbow macaroni</li>
              <li>¼ cup butter</li>
              <li>¼ cup all-purpose flour</li>
              <li>½ teaspoon salt</li>
              <li>ground black pepper to taste</li>
              <li>2 cups milk</li>
              <li>2 cups shredded Cheddar cheese</li>
            </ul>
          </IonLabel>
        </IonItem>

        {/* Instructions */}
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>              
              <li>Bring a large pot of lightly salted water to a boil. Cook elbow macaroni in the boiling water, stirring occasionally until cooked through but firm to the bite, 8 minutes.</li>
              <li>Melt butter in a saucepan over medium heat. Add flour, salt, and pepper and stir until smooth, about 5 minutes. Pour in milk slowly, while stirring continuously. Continue to cook and stir until mixture is smooth and bubbling, about 5 minutes, making sure the milk doesn't burn.</li>
              <li>Add Cheddar cheese and stir until melted, 2 to 4 minutes.</li>
              <li>Drain macaroni and fold into cheese sauce until coated.</li>
              </ol>
          </IonLabel>
        </IonItem>

        {/* Time Estimates */}
        <IonItem><IonLabel>Prep Time:</IonLabel> <IonLabel>10 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Cook Time:</IonLabel> <IonLabel>20 mins</IonLabel></IonItem>
        <IonItem><IonLabel>Total Time:</IonLabel> <IonLabel>30 mins</IonLabel></IonItem>

        {/* Serving Details */}
        <IonItem><IonLabel>Servings:</IonLabel> <IonLabel>4</IonLabel></IonItem>
        <IonItem><IonLabel>Yields:</IonLabel> <IonLabel>4 servings</IonLabel></IonItem>

        {/* Nutritional Information */}
        <IonItem><IonLabel>Calories:</IonLabel> <IonLabel>630.2</IonLabel></IonItem>
        <IonItem><IonLabel>Carbohydrates (g):</IonLabel> <IonLabel>55</IonLabel></IonItem>
        <IonItem><IonLabel>Sugars (g):</IonLabel> <IonLabel>7.6</IonLabel></IonItem>
        <IonItem><IonLabel>Fat (g):</IonLabel> <IonLabel>33.6</IonLabel></IonItem>
        <IonItem><IonLabel>Saturated Fat (g):</IonLabel> <IonLabel>20.9</IonLabel></IonItem>
        <IonItem><IonLabel>Cholesterol (mg):</IonLabel> <IonLabel>99.6</IonLabel></IonItem>
        <IonItem><IonLabel>Protein (g):</IonLabel> <IonLabel>26.5</IonLabel></IonItem>
        <IonItem><IonLabel>Dietary Fiber (g):</IonLabel> <IonLabel>2.1</IonLabel></IonItem>
        <IonItem><IonLabel>Sodium (mg):</IonLabel> <IonLabel>777</IonLabel></IonItem>
        {/* ...other fields... */}

      </IonContent>
    </IonPage>
  );
};

export default RecipePage;

