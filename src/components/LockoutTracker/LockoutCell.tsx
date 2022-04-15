import usePlayersList from "../../hooks/usePlayersList";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import { GameEvent } from "../../types";
import { useStyletron } from "baseui";
import { StatefulTooltip } from "baseui/tooltip";
import moment from "moment";
import { FaEye } from "react-icons/fa";

const LockoutCell = ({
  name,
  num,
  gameId,
  ownEvent,
  seen,
  cellSize,
}: {
  name: string;
  num: number;
  gameId: string;
  ownEvent?: GameEvent;
  seen: boolean;
  cellSize: number;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const { players } = usePlayersList({ gameId });
  const owner = players.find((player) => player.uid === ownEvent?.player_id);

  const displayTimestamp = ownEvent
    ? moment(ownEvent.timestamp).format("HH:mm:ss, D MMM YYYY")
    : null;

  const background = owner?.color;
  const tooltip =
    ownEvent !== undefined
      ? `${owner?.name} at ${displayTimestamp}`
      : "Uncaught";

  return (
    <StatefulTooltip content={tooltip} placement="bottom">
      <div
        style={{
          position: "relative",
          display: "inline-flex",
        }}
      >
        <img
          className={css({
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            background,
          })}
          src={data?.sprites.front_default}
          alt={name}
        />
        {seen && (
          <div style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}>
            <FaEye />
          </div>
        )}
      </div>
    </StatefulTooltip>
  );
};

export default LockoutCell;
