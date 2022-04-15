import { FirebaseUser } from "../types";
import useGateauAxios from "./useGateauAxios";

/**
 * ADMIN ONLY - Get a list of users registered on the Gateau platform
 */
const useAdminUsersList = () => {
  const [{ data, loading, error }] = useGateauAxios<FirebaseUser[]>({
    url: `/admin/users`,
    method: "GET",
  });

  return { data, loading, error };
};

export default useAdminUsersList;
