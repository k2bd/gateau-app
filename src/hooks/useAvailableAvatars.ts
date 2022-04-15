import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";

/**
 * Get avatars you're allowed to use
 */
const useAvailableAvatars = () => {
  const [{ data, loading, error }] = useGateauAxios<PokemonAvatar[]>({
    url: `/user/avatars`,
    method: "GET",
  });

  return { data, loading, error };
};

export default useAvailableAvatars;
