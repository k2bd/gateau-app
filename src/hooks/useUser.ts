import { auth } from "../firebaseApp";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ADMIN_CLAIM = "admin";

const useUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getIsAdmin = async () => {
      const tokenResult = await user?.getIdTokenResult();
      const isAdmin = !!tokenResult?.claims[ADMIN_CLAIM];
      setIsAdmin(isAdmin);
    };
    getIsAdmin();
  }, [user]);

  return { user, loading, error, signOut: async () => signOut(auth), isAdmin };
};

export default useUser;
