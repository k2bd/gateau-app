import PlayersList from "./PlayersList";
import { Outlet, useParams } from "react-router-dom";

const PLAYER_JOIN_WIDTH = "200px";

const GamesRoute = () => {
  const { gameId } = useParams();
  return (
    <>
      <div style={{ height: "100%" }}>
        <div
          style={{
            position: "fixed",
            float: "right",
            top: 0,
            right: 0,
            height: "100%",
            width: PLAYER_JOIN_WIDTH,
          }}
        >
          <PlayersList gameId={gameId ?? ""} />
        </div>
        <div
          style={{
            top: 0,
            height: "100%",
            width: `calc(100% - ${PLAYER_JOIN_WIDTH})`,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default GamesRoute;
