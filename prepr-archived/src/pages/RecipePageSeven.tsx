import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel } from "@ionic/react";
import recipeImage from "../images/recipe-image7.jpg";
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
        <IonItem>
          <IonLabel className="recipe-title">Easy Sausage Gravy and Biscuits</IonLabel>
        </IonItem>
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
          
        </IonItem>
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            Hot jumbo buttermilk biscuits with creamy sausage gravy are ready in just 15 minutes for a hearty, family-favorite breakfast.
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Category:</IonLabel>
          <IonLabel>Trusted Brands Recipes and Tips</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Author:</IonLabel>
          <IonLabel>JimmyDean</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Rating:</IonLabel>
          <IonLabel>4.81</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Rating Count:</IonLabel>
          <IonLabel>1063</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Review Count:</IonLabel>
          <IonLabel>692</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>1 (16 ounce) can refrigerated jumbo buttermilk biscuits</li>
              <li>1 (9.6 ounce) package Jimmy Dean® Original Hearty Pork Sausage Crumbles</li>
              <li>¼ cup flour</li>
              <li>2 ½ cups milk</li>
              <li>Salt and ground black pepper to taste</li>
            </ul>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>
              <li>Bake biscuits according to package directions.</li>
              <li>
                Meanwhile, cook sausage in a large skillet over medium heat for 5-6 minutes or until thoroughly heated, stirring frequently. Stir in flour. Gradually add milk; cook until mixture comes to a boil and thickens, stirring constantly. Reduce heat to medium-low; simmer 2 minutes, stirring constantly. Season to taste with salt and pepper.
              </li>
              <li>
                Split biscuits in half. Place 2 halves on each of 8 plates; top with about 1/3 cup of gravy.
              </li>
            </ol>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prep Time:</IonLabel>
          <IonLabel>5 mins</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Cook Time:</IonLabel>
          <IonLabel>10 mins</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Total Time:</IonLabel>
          <IonLabel>15 mins</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Servings:</IonLabel>
          <IonLabel>8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Yields:</IonLabel>
          <IonLabel>8 servings</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Calories:</IonLabel>
          <IonLabel>332.8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Carbohydrates (g):</IonLabel>
          <IonLabel>30.8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Sugars (g):</IonLabel>
          <IonLabel>7.7</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Fat (g):</IonLabel>
          <IonLabel>18.7</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Saturated Fat (g):</IonLabel>
          <IonLabel>6.1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Cholesterol (mg):</IonLabel>
          <IonLabel>24.9</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Protein (g):</IonLabel>
          <IonLabel>9.8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Dietary Fiber (g):</IonLabel>
          <IonLabel>0.5</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Sodium (mg):</IonLabel>
          <IonLabel>718.3</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
