import { toOwned } from "../gameData/pokemon";
import findLatestEvent from "../util/findLatestEvent";
import useGameEvents from "./useGameEvents";

const usePokemonOwned = ({
  gameId,
  playerId,
  pokemonName,
}: {
  gameId: string;
  playerId: string;
  pokemonName: string;
}) => {
  const { events } = useGameEvents({ gameId });

  const latestCaught = findLatestEvent({
    events,
    playerId,
    eventType: toOwned(pokemonName),
  });

  return latestCaught?.value === "True";
};

export default usePokemonOwned;
