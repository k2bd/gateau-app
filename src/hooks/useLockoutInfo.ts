import { toOwned } from "../gameData/pokemon";
import { GameEvent, Generation } from "../types";
import pokemonForGen from "../util/pokemonForGen";
import useGameEvents from "./useGameEvents";

/**
 * Hook providing first catch event info for every pokemon caught in the game
 * so far.
 */
const useLockoutInfo = ({
  gameId,
  gen,
}: {
  gameId: string;
  gen: Generation;
}) => {
  const { events } = useGameEvents({ gameId });

  // TODO: handle the cases where a pokemon is caught then uncaught, etc.
  const firstOwnedEvents = pokemonForGen(gen)
    .map((pokemon) => {
      const event = events.find(
        (e) => e.meaning === toOwned(pokemon.name) && e.value === "True"
      );
      return { ...event, dex: pokemon.nationalDex };
    })
    .filter((e): e is GameEvent & { dex: number } => e !== undefined);

  return { firstOwnedEvents };
};

export default useLockoutInfo;
