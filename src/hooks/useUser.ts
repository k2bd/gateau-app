import { auth } from "../firebaseApp";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const useUser = () => {
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error, signOut: async () => signOut(auth) };
};

export default useUser;
