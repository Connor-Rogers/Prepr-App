import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";
import { callbackUri } from "../auth.config";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();
  
    const doLogout = async () => {
      await logout({
        async openUrl(url) {
          await Browser.open({
            url,
            windowName: "_self",
          });
        },
        logoutParams: {
          returnTo: callbackUri
        }
      });
    };
  
    return (
      <IonButton 
        onClick={doLogout} color={'##21ce99'}
        style={{
            backgroundColor: '#21ce99', // This sets the background color to a dark grey
            color: '#FFFFFF', // This sets the text color to a light blue
            border: 'none', // Removes the border
            borderRadius: '5px', // Gives the button slightly rounded corners
            textTransform: 'uppercase', // Makes the text uppercase
            fontSize: '14px', // Sets the font size
            letterSpacing: '1px', // Increases spacing between letters
            transition: '0.3s', // Adds a transition effect when hovering over the button
          }}
      >
        Log out
      </IonButton>
    );
  };
  
  export default LogoutButton;