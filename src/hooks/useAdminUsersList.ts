import { FirebaseUser } from "../types";
import useGateauAxios from "./useGateauAxios";
import useIdToken from "./useIdToken";

/**
 * ADMIN ONLY - Get a list of users registered on the Gateau platform
 */
const useAdminUsersList = () => {
  const { authHeader } = useIdToken();
  const [{ data, loading, error }, refetch] = useGateauAxios<FirebaseUser[]>({
    url: `/admin/users`,
    method: "GET",
    headers: authHeader,
  });

  return { data, loading, error, refetch };
};

export default useAdminUsersList;
