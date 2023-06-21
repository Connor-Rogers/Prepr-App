import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
  };

  return <IonButton onClick={login} color={'##21ce99'}
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
  >Login / Sign Up</IonButton>;
};

export default LoginButton;