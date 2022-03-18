import usePokemonInfo from "../../hooks/usePokemonInfo";
import usePokemonOwned from "../../hooks/usePokemonOwned";
import usePokemonSeen from "../../hooks/usePokemonSeen";
import { useStyletron } from "baseui";

const PokemonCell = ({
  name,
  num,
  gameId,
  playerId,
}: {
  name: string;
  num: number;
  gameId: string;
  playerId: string;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const seen = usePokemonSeen({
    gameId,
    playerId,
    pokemonName: name,
  });
  const owned = usePokemonOwned({
    gameId,
    playerId,
    pokemonName: name,
  });

  const background = owned ? "red" : seen ? "blue" : undefined;

  return (
    <img
      className={css({ width: "48px", height: "48px", background })}
      src={data?.sprites.front_default}
      alt={name}
    />
  );
};

export default PokemonCell;
