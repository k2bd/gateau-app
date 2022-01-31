import { sortBy } from "lodash";
import { GameEvent } from "../types";
import useWatchDatabase from "./useWatchDatabase";

/**
 * Get the live state of game events that have happened
 */
const useGameEvents = ({ gameId }: { gameId: string }) => {
  const path = `/games/${gameId}/events`;
  const { value, loading, error } = useWatchDatabase<{
    [key: string]: GameEvent;
  }>({
    path,
  });

  const events = sortBy(Object.values(value ?? {}) as GameEvent[], [
    "timestamp",
  ]);

  return { events, loading, error };
};

export default useGameEvents;
