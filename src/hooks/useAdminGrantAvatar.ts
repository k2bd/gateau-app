import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";
import useUser from "./useUser";

/**
 * ADMIN ONLY - Grant a user an avatar
 */
const useAdminGrantAvatar = () => {
  const { user } = useUser();
  const [{ data, loading, error }, post] = useGateauAxios(
    {
      url: `/admin/avatar`,
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  return {
    data,
    loading,
    error,
    grantAvatar: async ({
      userId,
      avatar,
    }: {
      userId: string;
      avatar: PokemonAvatar;
    }) => {
      const idToken = await user?.getIdToken();
      return post({
        params: { userId },
        data: avatar,
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useAdminGrantAvatar;
