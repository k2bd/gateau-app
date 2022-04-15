import useGateauAxios from "./useGateauAxios";
import useUser from "./useUser";

/**
 * Add new subscriptions to a game
 */
const useAddSubscriptions = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  const [{ data, loading, error }, post] = useGateauAxios(
    {
      url: `/game/${gameId}/subscriptions`,
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  return {
    data,
    loading,
    error,
    addSubscriptions: async (subscriptions: string[]) => {
      const idToken = await user?.getIdToken();
      return post({
        data: { subscriptions },
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useAddSubscriptions;
