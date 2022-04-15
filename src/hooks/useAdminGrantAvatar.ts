import { PokemonAvatar } from "../types";
import useGateauAxios from "./useGateauAxios";

/**
 * ADMIN ONLY - Grant a user an avatar
 */
const useAdminGrantAvatar = () => {
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
    }) => post({ params: { userId }, data: { avatar } }),
  };
};

export default useAdminGrantAvatar;
