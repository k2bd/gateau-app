import { GameEvent } from "../types";

/**
 * Find the latest event of the given type, regardless of value
 */
const findLatestEvent = ({
  events,
  playerId,
  eventType,
}: {
  events: GameEvent[];
  playerId: string;
  eventType: string;
}) => {
  const relevantEvents = events.filter((e) => e.meaning === eventType);
  const latestEvent = [...relevantEvents]
    .reverse()
    .find((e) => e.player_id === playerId);
  return latestEvent;
};

export default findLatestEvent;
