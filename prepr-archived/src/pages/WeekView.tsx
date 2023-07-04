import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLabel, IonModal, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import recipeImage1 from "../images/recipe-image1.jpg";
import recipeImage2 from "../images/recipe-image2.jpg";
import recipeImage3 from "../images/recipe-image3.jpg";
import recipeImage4 from "../images/recipe-image4.jpg";
import recipeImage5 from "../images/recipe-image5.jpg";
import recipeImage6 from "../images/recipe-image6.jpg";
import recipeImage7 from "../images/recipe-image7.jpg";

interface Recipe {
  title: string;
  imageUrl: any;
  macronutrients: string;
  prepTime: string;
  rating: string;
}

const WeekView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<Recipe | null>(null);
  const history = useHistory();

  const recipes: Recipe[] = [
    { title: 'Simple Macaroni and Cheese ', imageUrl: recipeImage1, macronutrients: 'Carbs: 55g, Protein: 26.5g, Fat: 33.6g ', prepTime: '30 mins ', rating: '4.42' },
    { title: 'Gourmet Mushroom Risotto ', imageUrl: recipeImage2, macronutrients: 'Carbs: 56.6g, Protein: 11.3g, Fat: 16.6g ', prepTime: '50 mins ', rating: '4.8' },
    { title: 'Dessert Crepes ', imageUrl: recipeImage3, macronutrients: 'Carbs: 17.2g, Protein: 6.4g, Fat: 7.7g ', prepTime: '20 mins ', rating: '4.8' },
    { title: 'Pork Steaks ', imageUrl: recipeImage4, macronutrients: 'Carbs: 3.9g, Protein: 26.5g, Fat: 25.4g ', prepTime: '45 mins ', rating: '4.57' },
    { title: 'Quick and Easy Pizza Crust ', imageUrl: recipeImage5, macronutrients: 'Carbs: 28.1g, Protein: 4.8g, Fat: 4g ', prepTime: '10 mins ', rating: '4.7' },
    { title: 'Chicken Parmesan ', imageUrl: recipeImage6, macronutrients: 'Carbs: 24.8g, Protein: 42.1g, Fat: 24.9g ', prepTime: '60 mins ', rating: '4.83' },
    { title: 'Easy Sausage Gravy and Biscuits ', imageUrl: recipeImage7, macronutrients: 'Carbs: 30.8g, Protein: 9.8g, Fat: 18.7g ', prepTime: '15 mins ', rating: '4.81' },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleCardClick = (index: number) => {
    history.push(`/recipe${index + 1}`);
  };

  const handleModalOpen = (recipe: Recipe) => {
    setModalContent(recipe);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Week View</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', overflowX: 'scroll' }}>
          {days.map((day, index) => (
            <IonCard key={index} onClick={() => handleCardClick(index)} style={{ margin: '10px' }}>
              <IonCardHeader>
                <IonCardTitle>{day}</IonCardTitle>
              </IonCardHeader>

              <IonImg src={recipes[index].imageUrl} />

              <IonCardContent>
                <IonLabel>{recipes[index].title}</IonLabel>
                <IonLabel>Macronutrients: {recipes[index].macronutrients}</IonLabel>
                <IonLabel>Prep Time: {recipes[index].prepTime}</IonLabel>
                <IonLabel>Rating: {recipes[index].rating}</IonLabel>
              </IonCardContent>

              <IonButton expand="full" onClick={(e) => { e.stopPropagation(); handleModalOpen(recipes[index]); }}>View Details</IonButton>
            </IonCard>
          ))}
        </div>
      </IonContent>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        {modalContent && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{modalContent.title}</IonCardTitle>
            </IonCardHeader>

            <IonImg src={modalContent.imageUrl} />

            <IonCardContent>
              <IonLabel>Macronutrients: {modalContent.macronutrients}</IonLabel>
              <IonLabel>Prep Time: {modalContent.prepTime}</IonLabel>
              <IonLabel>Rating: {modalContent.rating}</IonLabel>
            </IonCardContent>

            <IonButton expand="full" onClick={() => setShowModal(false)}>Close</IonButton>
          </IonCard>
        )}
      </IonModal>
    </IonPage>
  );
};

export default WeekView;
