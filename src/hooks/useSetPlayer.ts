import { GATEAU_API_URL } from "../constants";
import { Player } from "../types";
import useUser from "./useUser";
import useAxios from "axios-hooks";

/**
 * Set player info within a game
 */
const useSetPlayer = ({ gameId }: { gameId: string }) => {
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
    setPlayer: async (player: Player) => {
      const idToken = await user?.getIdToken();
      return post({
        data: player,
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useSetPlayer;
