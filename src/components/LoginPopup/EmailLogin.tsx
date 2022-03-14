import { auth } from "../../firebaseApp";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";

const GoogleLogin = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    onClose();
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
      <Button onClick={signIn}>Sign In</Button>
    </>
  );
};

export default GoogleLogin;
