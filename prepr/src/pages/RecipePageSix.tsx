import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel } from "@ionic/react";
import recipeImage from "../images/recipe-image6.jpg";
import "./RecipePage.css";
import "./MacronutrientCalcuator.css";
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
          <IonLabel className="recipe-title">Chicken Parmesan</IonLabel>
        </IonItem>
        <IonItem>
          <img src={recipeImage} alt="Recipe" className="recipe-image" />
        </IonItem>
        <IonItem>
          <IonLabel>Description:</IonLabel>
          <IonLabel className="recipe-description">
            My version of chicken parmesan is a little different than what they do in the restaurants, with less sauce and a crispier crust.
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Category:</IonLabel>
          <IonLabel>World Cuisine</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Author:</IonLabel>
          <IonLabel>Chef John</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Rating:</IonLabel>
          <IonLabel>4.83</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Rating Count:</IonLabel>
          <IonLabel>4245</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Review Count:</IonLabel>
          <IonLabel>2662</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Ingredients:</IonLabel>
          <IonLabel className="recipe-ingredients">
            <ul>
              <li>4 skinless, boneless chicken breast halves</li>
              <li>Salt and freshly ground black pepper to taste</li>
              <li>2 eggs</li>
              <li>1 cup panko bread crumbs, or more as needed</li>
              <li>½ cup grated Parmesan cheese</li>
              <li>2 tablespoons all-purpose flour, or more if needed</li>
              <li>1 cup olive oil for frying</li>
              <li>½ cup prepared tomato sauce</li>
              <li>¼ cup fresh mozzarella, cut into small cubes</li>
              <li>¼ cup chopped fresh basil</li>
              <li>½ cup grated provolone cheese</li>
              <li>¼ cup grated Parmesan cheese</li>
              <li>1 tablespoon olive oil</li>
            </ul>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Instructions:</IonLabel>
          <IonLabel className="recipe-instructions">
            <ol>
              <li>
                Preheat an oven to 450 degrees F (230 degrees C). Place chicken breasts between two sheets of heavy plastic (resealable freezer bags work well) on a solid, level surface. Firmly pound chicken with the smooth side of a meat mallet to a thickness of 1/2-inch. Season chicken thoroughly with salt and pepper.
              </li>
              <li>
                Beat eggs in a shallow bowl and set aside. Mix bread crumbs and 1/2 cup Parmesan cheese in a separate bowl, set aside. Place flour in a sifter or strainer; sprinkle over chicken breasts, evenly coating both sides. Dip flour-coated chicken breast in beaten eggs. Transfer breast to breadcrumb mixture, pressing the crumbs into both sides. Repeat for each breast. Set aside breaded chicken breasts for about 15 minutes.
              </li>
              <li>
                Heat 1 cup olive oil in a large skillet on medium-high heat until it begins to shimmer. Cook chicken until golden, about 2 minutes on each side. The chicken will finish cooking in the oven. Place chicken in a baking dish and top each breast with about 1/3 cup of tomato sauce. Layer each chicken breast with equal amounts of mozzarella cheese, fresh basil, and provolone cheese. Sprinkle 1 to 2 tablespoons of Parmesan cheese on top and drizzle with 1 tablespoon olive oil.
              </li>
              <li>
                Bake in the preheated oven until the cheese is browned and bubbly, and chicken breasts are no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).
              </li>
            </ol>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prep Time:</IonLabel>
          <IonLabel>25 mins</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Cook Time:</IonLabel>
          <IonLabel>20 mins</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Total Time:</IonLabel>
          <IonLabel>1 hr</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Servings:</IonLabel>
          <IonLabel>4</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Yields:</IonLabel>
          <IonLabel>4 servings</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Calories:</IonLabel>
          <IonLabel>470.8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Carbohydrates (g):</IonLabel>
          <IonLabel>24.8</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Sugars (g):</IonLabel>
          <IonLabel>1.7</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Fat (g):</IonLabel>
          <IonLabel>24.9</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Saturated Fat (g):</IonLabel>
          <IonLabel>9.1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Cholesterol (mg):</IonLabel>
          <IonLabel>186.7</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Protein (g):</IonLabel>
          <IonLabel>42.1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Dietary Fiber (g):</IonLabel>
          <IonLabel>0.6</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Sodium (mg):</IonLabel>
          <IonLabel>840.3</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
