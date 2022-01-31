import useAxios from "axios-hooks";
import { GATEAU_API_URL } from "../constants";
import { Player } from "../types";

/**
 * Set player info within a game
 */
const useSetPlayer = ({ gameId }: { gameId: string }) => {
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
    setPlayer: async (player: Player) => post({ data: player }),
  };
};

export default useSetPlayer;
