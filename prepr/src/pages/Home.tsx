import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const Home: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return null;
  }

  return (
    <div className="container">
      <Profile />
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Home;
