import useAxios from "axios-hooks";
import { GATEAU_API_URL } from "../constants";

/**
 * Set player info within a game
 */
const useSetPlayer = ({ gameId, player }: { gameId: string; player: Player }) =>
  useAxios(
    {
      url: `/game/${gameId}/players`,
      baseURL: GATEAU_API_URL,
      method: "POST",
      data: player,
    },
    { manual: true, autoCancel: false }
  );

export default useSetPlayer;
