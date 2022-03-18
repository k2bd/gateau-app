import usePlayersList from "../../hooks/usePlayersList";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import { GameEvent } from "../../types";
import { useStyletron } from "baseui";
import { StatefulTooltip } from "baseui/tooltip";

const LockoutCell = ({
  name,
  num,
  gameId,
  ownEvent,
}: {
  name: string;
  num: number;
  gameId: string;
  ownEvent?: GameEvent;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const { players } = usePlayersList({ gameId });
  const player = players.find((player) => player.uid === ownEvent?.player_id);

  const background = player?.color;
  const tooltip =
    ownEvent !== undefined
      ? `Caught ${ownEvent.timestamp} by ${player?.name}`
      : "Uncaught";

  return (
    <StatefulTooltip content={tooltip} placement="bottom">
      <img
        className={css({ width: "48px", height: "48px", background })}
        src={data?.sprites.front_default}
        alt={name}
      />
    </StatefulTooltip>
  );
};

export default LockoutCell;
