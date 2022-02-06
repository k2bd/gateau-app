import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "baseui/button";
import { auth } from "../../firebaseApp";

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
