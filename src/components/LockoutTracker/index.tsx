import { GEN_1_POKEMON, GEN_2_POKEMON } from "../../gameData/pokemon";
import LockoutCell from "./LockoutCell";
import { useStyletron } from "baseui";
import { chunk } from "lodash";

type GenOptions = 1 | 2;

const LockoutTracker = ({
  gameId,
  gen,
}: {
  gameId: string;
  gen: GenOptions;
}) => {
  const [css] = useStyletron();

  let pokemon;
  switch (gen) {
    case 1: {
      pokemon = GEN_1_POKEMON;
      break;
    }
    case 2: {
      pokemon = GEN_2_POKEMON;
      break;
    }
  }

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
            <LockoutCell
              num={nationalDex}
              name={name}
              gameId={gameId}
              key={name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LockoutTracker;
