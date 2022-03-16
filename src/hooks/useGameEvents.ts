import { GameEvent } from "../types";
import useWatchDatabase from "./useWatchDatabase";
import { sortBy } from "lodash";

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

  const events = sortBy(
    Object.values(value ?? {}).filter(
      (value): value is GameEvent => value !== undefined
    ),
    ["timestamp"]
  );

  return { events, loading, error };
};

export default useGameEvents;
