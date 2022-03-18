import { toOwned } from "../gameData/pokemon";
import useGameEvents from "./useGameEvents";

/**
 * Hook providing the UID of the first player to own a pokemon, or null if it's
 * not been caught by anyone
 */
const usePokemonFirstOwnedBy = ({
  gameId,
  pokemonName,
}: {
  gameId: string;
  pokemonName: string;
}) => {
  const { events } = useGameEvents({ gameId });

  // TODO: handle the cases where a pokemon is caught then uncaught, etc.
  const firstOwner = events.find(
    (e) => e.meaning === toOwned(pokemonName) && e.value === "True"
  );

  return firstOwner?.player_id ?? null;
};

export default usePokemonFirstOwnedBy;
