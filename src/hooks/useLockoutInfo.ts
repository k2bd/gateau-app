import { toOwned, toSeen } from "../gameData/pokemon";
import { GameEvent, Generation } from "../types";
import findFirstEvent from "../util/findFirstEvent";
import findLatestEvent from "../util/findLatestEvent";
import pokemonForGen from "../util/pokemonForGen";
import useGameEvents from "./useGameEvents";
import usePlayersList from "./usePlayersList";
import useUser from "./useUser";
import { sortBy } from "lodash";

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
  const { players } = usePlayersList({ gameId });
  const { user } = useUser();

  const firstOwnedEvents = pokemonForGen(gen)
    .map((pokemon) => {
      // Latest event from each player - the chronologically earliest catch of
      // these defines the owner of the square.
      // This is to handle savescumming, and other cases where a player catches
      // then uncatches a pokemon, and so on.
      // TODO: fix this to support resets.
      const latestPlayerEvents = players.map((player) =>
        //findLatestEvent({
        findFirstEvent({
          events,
          playerId: player.uid,
          eventType: toOwned(pokemon.name),
          value: "True",
        })
      );
      const event = sortBy(latestPlayerEvents, ["timestamp"]).find(
        (e) => e?.value === "True"
      );

      return { ...event, dex: pokemon.nationalDex };
    })
    .filter((e): e is GameEvent & { dex: number } => e.player_id !== undefined);

  const playerSeenPokemon = pokemonForGen(gen)
    .filter(
      (pokemon) =>
        findLatestEvent({
          events,
          playerId: user?.uid ?? "",
          eventType: toSeen(pokemon.name),
        })?.value === "True"
    )
    .map((p) => p.nationalDex);

  return { firstOwnedEvents, playerSeenPokemon };
};

export default useLockoutInfo;
