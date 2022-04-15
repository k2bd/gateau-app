import useGateauAxios from "./useGateauAxios";

/**
 * Add new subscriptions to a game
 */
const useAddSubscriptions = ({ gameId }: { gameId: string }) => {
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
    addSubscriptions: async (subscriptions: string[]) =>
      post({ data: { subscriptions } }),
  };
};

export default useAddSubscriptions;
