import usePlayersList from "../../hooks/usePlayersList";
import usePokemonFirstOwnedBy from "../../hooks/usePokemonFirstOwnedBy";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import { useStyletron } from "baseui";

const LockoutCell = ({
  name,
  num,
  gameId,
}: {
  name: string;
  num: number;
  gameId: string;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const { players } = usePlayersList({ gameId });
  const ownerId = usePokemonFirstOwnedBy({ gameId, pokemonName: name });

  const background = ownerId
    ? players.find((player) => player.uid === ownerId)?.color
    : undefined;

  return (
    <img
      className={css({ width: "48px", height: "48px", background })}
      src={data?.sprites.front_default}
      alt={name}
    />
  );
};

export default LockoutCell;
