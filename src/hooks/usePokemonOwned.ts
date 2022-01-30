import { toOwned } from "../gameData/pokemon";
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

  const caught =
    events.find(
      (e) =>
        e.playerId === playerId &&
        e.meaning === toOwned(pokemonName) &&
        e.value === true
    ) !== undefined;

  return caught;
};

export default usePokemonOwned;
