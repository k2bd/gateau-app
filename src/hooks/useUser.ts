import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseApp";

const useUser = () => {
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error };
};

export default useUser;
