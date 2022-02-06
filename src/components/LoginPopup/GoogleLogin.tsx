import { auth } from "../../firebaseApp";
import { Button } from "baseui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = ({ onClose }: { onClose: () => void }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    onClose();
  };

  return (
    <Button onClick={signInWithGoogle} kind="minimal" size="mini">
      <img
        src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
        alt="google login"
      />
    </Button>
  );
};

export default GoogleLogin;
