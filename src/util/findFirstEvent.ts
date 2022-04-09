import { EventValueType, GameEvent } from "../types";

/**
 * Find the first event of the given type, optionally filtering by the given
 * value.
 */
const findFirstEvent = ({
  events,
  playerId,
  eventType,
  value,
}: {
  events: GameEvent[];
  playerId: string;
  eventType: string;
  value?: EventValueType;
}) => {
  let relevantEvents = events.filter((e) => e.meaning === eventType);
  if (value !== undefined) {
    relevantEvents = relevantEvents.filter((e) => e.value === value);
  }
  const firstEvent = [...relevantEvents].find((e) => e.player_id === playerId);
  return firstEvent;
};

export default findFirstEvent;
