import { GEN_1_POKEMON } from "../../gameData/pokemon";
import PokemonCell from "./PokemonCell";
import { useStyletron } from "baseui";
import { chunk } from "lodash";

/**
 * A single player's Pokedex, that marks seen in blue and caught in red.
 */
const Pokedex = ({
  gameId,
  playerId,
}: {
  gameId: string;
  playerId: string;
}) => {
  const [css] = useStyletron();

  const pokemon = GEN_1_POKEMON;

  const pokemonGroups = chunk(pokemon, 20);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      {pokemonGroups.map((group) => (
        <div
          className={css({ flexDirection: "row" })}
          key={group[0].name ?? "emptyRow"}
        >
          {group.map(({ name, nationalDex }) => (
            <PokemonCell
              num={nationalDex}
              name={name}
              gameId={gameId}
              playerId={playerId}
              key={name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
