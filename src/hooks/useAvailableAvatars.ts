import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";
import useIdToken from "./useIdToken";

/**
 * Get avatars you're allowed to use
 */
const useAvailableAvatars = () => {
  const { authHeader } = useIdToken();
  const [{ data, loading, error }] = useGateauAxios<PokemonAvatar[]>({
    url: `/user/avatars`,
    method: "GET",
    headers: authHeader,
  });

  return { data, loading, error };
};

export default useAvailableAvatars;
