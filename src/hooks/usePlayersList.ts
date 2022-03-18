import { Player } from "../types";
import useWatchDatabase from "./useWatchDatabase";

/**
 * Get the live state of players in the game
 */
const usePlayersList = ({ gameId }: { gameId: string }) => {
  const path = `/games/${gameId}/players`;
  const { value, loading, error } = useWatchDatabase<{ [key: string]: Player }>(
    {
      path,
    }
  );

  const players = (value ? Object.values(value) : []) as Player[];

  return { players, loading, error };
};

export default usePlayersList;
