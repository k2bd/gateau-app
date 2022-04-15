import useGateauAxios from "./useGateauAxios";
import useUser from "./useUser";

/**
 * Leave a game
 */
const useLeaveGame = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  const [{ data, loading, error }, leave] = useGateauAxios(
    {
      url: `/game/${gameId}/players`,
      method: "DELETE",
    },
    { manual: true, autoCancel: false }
  );

  return {
    data,
    loading,
    error,
    leaveGame: async () => {
      const idToken = await user?.getIdToken();
      return leave({ headers: { Authorization: `Bearer ${idToken}` } });
    },
  };
};

export default useLeaveGame;
