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

  const caught = events.find(
    (e) =>
      e.player_id === playerId &&
      e.meaning === toOwned(pokemonName) &&
      e.value === "True"
  );

  return !!caught;
};

export default usePokemonOwned;
