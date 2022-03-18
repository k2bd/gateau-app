import { GATEAU_API_URL } from "../constants";
import useUser from "./useUser";
import useAxios from "axios-hooks";

/**
 * Leave a game
 */
const useLeaveGame = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  const [{ data, loading, error }, leave] = useAxios(
    {
      url: `/game/${gameId}/players`,
      baseURL: GATEAU_API_URL,
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
      return leave({
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useLeaveGame;
