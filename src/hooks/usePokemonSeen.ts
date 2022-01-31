import { toSeen } from "../gameData/pokemon";
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

  const seen = events.find(
    (e) =>
      e.player_id === playerId &&
      e.meaning === toSeen(pokemonName) &&
      e.value === "True"
  );

  return !!seen;
};

export default usePokemonSeen;
