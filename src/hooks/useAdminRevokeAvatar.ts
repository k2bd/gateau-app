import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";

/**
 * ADMIN ONLY - Revoke an avatar from a user
 */
const useAdminRevokeAvatar = () => {
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
    }) => revoke({ params: { userId }, data: { avatar } }),
  };
};

export default useAdminRevokeAvatar;
