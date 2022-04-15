import useUser from "./useUser";
import { useEffect, useState } from "react";
import useInterval from "react-useinterval";

/**
 * Get access to an ID token for the current user
 */
const useIdToken = () => {
  const { user } = useUser();
  const [idToken, setIdToken] = useState<string | undefined>(undefined);

  const getIdToken = async (force: boolean) => {
    const token = await user?.getIdToken(force);
    setIdToken(token);
  };

  useEffect(() => {
    getIdToken(true);
  }, [user]);

  // Refresh every 10 minutes
  useInterval(() => getIdToken(true), 600000);

  const authHeader = { Authorization: `Bearer ${idToken}` };

  return { idToken, authHeader };
};

export default useIdToken;
