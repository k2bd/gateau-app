import { auth } from "../../firebaseApp";
import useUser from "../../hooks/useUser";
import { Button } from "baseui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

/**
 * WIP: Google Login button.
 */
const GoogleLogin = ({ onClose }: { onClose?: () => void }) => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    onClose?.();
  };
  const { loading } = useUser();

  return (
    <Button
      onClick={signInWithGoogle}
      kind="tertiary"
      size="mini"
      isLoading={loading}
    >
      <img
        src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
        alt="google login"
      />
    </Button>
  );
};

export default GoogleLogin;
