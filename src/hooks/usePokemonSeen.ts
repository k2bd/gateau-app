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

  const seen =
    events.find(
      (e) =>
        e.playerId === playerId &&
        e.meaning === toSeen(pokemonName) &&
        e.value === true
    ) !== undefined;

  return seen;
};

export default usePokemonSeen;
