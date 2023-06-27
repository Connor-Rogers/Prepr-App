import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel } from '@ionic/react';
import './RecipePage.css';
const RecipePage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quick and Easy Pizza Crust</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Description</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>This is a great recipe when you don't want to wait for the dough to rise. You just mix it and allow it to rest for 5 minutes and then it's ready to go! It yields a soft, chewy crust.</IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Prep and Cook Time</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Prep Time: 10 mins</IonLabel>
            <IonLabel>Cook Time: 15 mins</IonLabel>
            <IonLabel>Total Time: 45 mins</IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Ingredients</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              1 cup warm water (110 degrees F/45 degrees C)<br/>
              1 (.25 ounce) package active dry yeast<br/>
              1 teaspoon white sugar<br/>
              2 ½ cups bread flour<br/>
              2 tablespoons olive oil<br/>
              1 teaspoon salt
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Directions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              1. Gather all ingredients. Preheat oven to 450 degrees F (230 degrees C), and lightly grease a pizza pan. <br/>
              2. Place warm water in a bowl; add yeast and sugar. Mix and let stand until creamy, about 10 minutes. <br/>
              3. Add flour, oil, and salt to the yeast mixture; beat until smooth. Let rest for 5 minutes. <br/>
              4. Turn dough out onto a lightly floured surface and pat or roll into a 12-inch circle. <br/>
              5. Transfer to the prepared pizza pan. Spread crust with sauce and toppings of your choice. <br/>
              6. Bake in the preheated oven until golden brown, 15 to 20 minutes. Remove from the oven and let cool for 5 minutes before serving.
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Cook's Note</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              You can use all-purpose flour, but the bread flour makes a superior crust. If you have a pizza stone, dust it with cornmeal and use it instead of a greased pizza pan.
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Nutrition Facts (per serving)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              Calories: 170<br/>
              Fat: 4g<br/>
              Carbs: 28g<br/>
              Protein: 5g
            </IonLabel>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
