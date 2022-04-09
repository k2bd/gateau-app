import usePlayersList from "../../hooks/usePlayersList";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import usePokemonSeen from "../../hooks/usePokemonSeen";
import useUser from "../../hooks/useUser";
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
}: {
  name: string;
  num: number;
  gameId: string;
  ownEvent?: GameEvent;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const { user } = useUser();
  const seen = usePokemonSeen({
    gameId,
    playerId: user?.uid ?? "",
    pokemonName: name,
  });

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
          className={css({ width: "48px", height: "48px", background })}
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
