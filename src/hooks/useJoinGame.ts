import { Player } from "../types";
import useGateauAxios from "./useGateauAxios";
import useUser from "./useUser";

/**
 * Join a game with the local player
 */
const useJoinGame = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  const [{ data, loading, error }, post] = useGateauAxios(
    {
      url: `/game/${gameId}/players`,
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  return {
    data,
    loading,
    error,
    joinGame: async (player: Player) => {
      const idToken = await user?.getIdToken();
      return post({
        data: player,
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useJoinGame;
