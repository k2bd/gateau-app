import useGateauAxios from "./useGateauAxios";

/**
 * Leave a game
 */
const useLeaveGame = ({ gameId }: { gameId: string }) => {
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
    leaveGame: leave,
  };
};

export default useLeaveGame;
