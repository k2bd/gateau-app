import { auth } from "../../firebaseApp";
import useUser from "../../hooks/useUser";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";

const EmailLogin = ({ onClose }: { onClose?: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useUser();

  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    onClose?.();
  };

  const passwordReset = async () => {
    await sendPasswordResetEmail(auth, email);
    setPasswordResetSent(true);
  };

  return (
    <>
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
          setPasswordResetSent(false);
        }}
        startEnhancer={() => <MdOutlineEmail />}
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        startEnhancer={() => <MdOutlinePassword />}
        type="password"
      />
      <Button
        onClick={signIn}
        isLoading={loading}
        disabled={!email || !password}
      >
        Sign In
      </Button>
      <Button
        size="mini"
        onClick={passwordReset}
        disabled={!email || passwordResetSent}
        kind="secondary"
      >
        {passwordResetSent ? "Reset Email Sent" : "Forgot Password"}
      </Button>
    </>
  );
};

export default EmailLogin;
