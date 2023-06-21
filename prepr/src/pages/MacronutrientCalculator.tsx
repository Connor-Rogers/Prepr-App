import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonAlert } from "@ionic/react";

const MacronutrientCalculator: React.FC = () => {
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [age, setAge] = useState(0);
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [showResults, setShowResults] = useState(false);

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

    setCarbs(0.5 * tdee / 4);
    setProtein(0.25 * tdee / 4);
    setFats(0.25 * tdee / 9);
    setShowResults(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Macronutrient Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Sex</IonLabel>
          <IonSelect value={sex} onIonChange={e => setSex(e.detail.value)}>
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption value="female">Female</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Weight (lbs)</IonLabel>
          <IonInput type="number" value={weight} onIonChange={e => setWeight(Number(e.detail.value!))}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Height (feet)</IonLabel>
          <IonInput type="number" value={heightFeet} onIonChange={e => setHeightFeet(Number(e.detail.value!))}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Height (inches)</IonLabel>
          <IonInput type="number" value={heightInches} onIonChange={e => setHeightInches(Number(e.detail.value!))}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonInput type="number" value={age} onIonChange={e => setAge(Number(e.detail.value!))}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Activity Level</IonLabel>
          <IonSelect value={activityLevel} onIonChange={e => setActivityLevel(e.detail.value)}>
            <IonSelectOption value="sedentary">Sedentary</IonSelectOption>
            <IonSelectOption value="light">Light</IonSelectOption>
            <IonSelectOption value="moderate">Moderate</IonSelectOption>
            <IonSelectOption value="active">Active</IonSelectOption>
            <IonSelectOption value="very active">Very Active</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Goal</IonLabel>
          <IonSelect value={goal} onIonChange={e => setGoal(e.detail.value)}>
            <IonSelectOption value="lose">Lose Weight</IonSelectOption>
            <IonSelectOption value="maintain">Maintain Weight</IonSelectOption>
            <IonSelectOption value="gain">Gain Weight</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="full" onClick={calculateMacros}>Calculate</IonButton>

        <IonAlert
          isOpen={showResults}
          onDidDismiss={() => setShowResults(false)}
          header={'Macronutrient Results'}
          message={`Carbohydrates: ${carbs.toFixed(2)}g<br/>Protein: ${protein.toFixed(2)}g<br/>Fats: ${fats.toFixed(2)}g`}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default MacronutrientCalculator;
