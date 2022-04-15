import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";
import useUser from "./useUser";

/**
 * ADMIN ONLY - Revoke an avatar from a user
 */
const useAdminRevokeAvatar = () => {
  const { user } = useUser();
  const [{ data, loading, error }, revoke] = useGateauAxios(
    {
      url: `/admin/avatar`,
      method: "DELETE",
    },
    { manual: true, autoCancel: false }
  );

  return {
    data,
    loading,
    error,
    revokeAvatar: async ({
      userId,
      avatar,
    }: {
      userId: string;
      avatar: PokemonAvatar;
    }) => {
      const idToken = await user?.getIdToken();
      return revoke({
        params: { userId },
        data: avatar,
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useAdminRevokeAvatar;
