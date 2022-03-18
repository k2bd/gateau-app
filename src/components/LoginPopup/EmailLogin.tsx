import { auth } from "../../firebaseApp";
import useUser from "../../hooks/useUser";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";

const EmailLogin = ({ onClose }: { onClose?: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useUser();

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    onClose?.();
  };

  return (
    <>
      <Input
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        startEnhancer={() => <MdOutlineEmail />}
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        startEnhancer={() => <MdOutlinePassword />}
        type="password"
      />
      <Button onClick={signIn} isLoading={loading}>
        Sign In
      </Button>
    </>
  );
};

export default EmailLogin;
