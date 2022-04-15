import { Player } from "../types";
import useGateauAxios from "./useGateauAxios";

/**
 * Join a game with the local player
 */
const useJoinGame = ({ gameId }: { gameId: string }) => {
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
    joinGame: async (player: Player) => post({ data: player }),
  };
};

export default useJoinGame;
