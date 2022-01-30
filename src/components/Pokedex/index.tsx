import { useStyletron } from "baseui";
import { chunk } from "lodash";
import { GEN_1_POKEMON } from "../../gameData/pokemon";
import PokemonCell from "./PokemonCell";

const Pokedex = ({ gameId }: { gameId: string }) => {
  const [css] = useStyletron();

  const pokemon = GEN_1_POKEMON.map((name, index) => ({
    name,
    num: index + 1,
  }));

  const pokemonGroups = chunk(pokemon, 20);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      {pokemonGroups.map((group) => (
        <div className={css({ flexDirection: "row" })}>
          {group.map(({ name, num }) => (
            <PokemonCell num={num} name={name} gameId={gameId} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
