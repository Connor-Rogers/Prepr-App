import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonSelect, IonSelectOption, IonItem, IonCol, IonGrid, IonRow } from '@ionic/react';
import "./MacronutrientCalculator.css";
import { useAuth0 } from "@auth0/auth0-react";

const MacronutrientCalculator: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [age, setAge] = useState(0);
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");

  const calculateMacros = () => {
    let bmr = 0;
    let tdee = 0;

    const weightInKg = weight / 2.20462;
    const heightInCm = ((heightFeet * 12) + heightInches) * 2.54;

    if (sex === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else if (sex === "female") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }

    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "light":
        tdee = bmr * 1.375;
        break;
      case "moderate":
        tdee = bmr * 1.55;
        break;
      case "active":
        tdee = bmr * 1.725;
        break;
      case "very active":
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }

    if (goal === "lose") {
      tdee -= 500;
    } else if (goal === "gain") {
      tdee += 500;
    }

    const carbs = 0.5 * tdee / 4;
    const protein = 0.25 * tdee / 4;
    const fats = 0.25 * tdee / 9;

    return { carbs, protein, fats };
  }

  const { carbs, protein, fats } = calculateMacros();
  
  if (!isAuthenticated) return null;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Macronutrient Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Sex</IonLabel>
                <IonSelect value={sex} onIonChange={(e) => setSex(e.detail.value)}>
                  <IonSelectOption value="male">Male</IonSelectOption>
                  <IonSelectOption value="female">Female</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Weight (lbs)</IonLabel>
                <IonInput type="number" value={weight} onIonChange={(e) => setWeight(Number(e.detail.value!))}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Height (feet)</IonLabel>
                <IonInput type="number" value={heightFeet} onIonChange={(e) => setHeightFeet(Number(e.detail.value!))}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Height (inches)</IonLabel>
                <IonInput type="number" value={heightInches} onIonChange={(e) => setHeightInches(Number(e.detail.value!))}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Age (years)</IonLabel>
                <IonInput value={age} onIonChange={(e) => setAge(Number(e.detail.value))} />
              </IonItem>
              <IonItem>
                <IonLabel>Activity Level</IonLabel>
                <IonSelect value={activityLevel} onIonChange={(e) => setActivityLevel(e.detail.value)}>
                  <IonSelectOption value="sedentary">Sedentary</IonSelectOption>
                  <IonSelectOption value="light">Light</IonSelectOption>
                  <IonSelectOption value="moderate">Moderate</IonSelectOption>
                  <IonSelectOption value="active">Active</IonSelectOption>
                  <IonSelectOption value="very active">Very Active</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Goal</IonLabel>
                <IonSelect value={goal} onIonChange={(e) => setGoal(e.detail.value)}>
                  <IonSelectOption value="lose">Lose Weight</IonSelectOption>
                  <IonSelectOption value="gain">Gain Weight</IonSelectOption>
                  <IonSelectOption value="maintain">Maintain Weight</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton expand="full" onClick={calculateMacros}>
          Calculate
        </IonButton>
        <IonLabel>Carbohydrates: {carbs.toFixed(2)}g</IonLabel>
        <IonLabel>Protein: {protein.toFixed(2)}g</IonLabel>
        <IonLabel>Fats: {fats.toFixed(2)}g</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default MacronutrientCalculator;