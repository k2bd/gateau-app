import { toSeen } from "../gameData/pokemon";
import findLatestEvent from "../util/findLatestEvent";
import useGameEvents from "./useGameEvents";

const usePokemonSeen = ({
  gameId,
  playerId,
  pokemonName,
}: {
  gameId: string;
  playerId: string;
  pokemonName: string;
}) => {
  const { events } = useGameEvents({ gameId });

  const latestSeen = findLatestEvent({
    events,
    playerId,
    eventType: toSeen(pokemonName),
  });

  return latestSeen?.value === "True";
};

export default usePokemonSeen;
