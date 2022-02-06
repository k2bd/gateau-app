import { auth } from "../firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

const useUser = () => {
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error };
};

export default useUser;
