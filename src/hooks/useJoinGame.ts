import { GATEAU_API_URL } from "../constants";
import { Player } from "../types";
import useUser from "./useUser";
import useAxios from "axios-hooks";

/**
 * Join a game with the local player
 */
const useJoinGame = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  const [result, post] = useAxios(
    {
      url: `/game/${gameId}/players`,
      baseURL: GATEAU_API_URL,
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  return {
    result,
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
