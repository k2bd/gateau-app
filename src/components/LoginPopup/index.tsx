import { auth } from "../../firebaseApp";
import { styled } from "baseui";
import { EmailAuthProvider } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";

const uiConfig = {
  signInOptions: [EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD],
};

const Centering = styled("div", {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

const LoginPopup = () => {
  return (
    <Centering>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Centering>
  );
};

export default LoginPopup;
