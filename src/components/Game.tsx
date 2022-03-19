import LockoutTracker from "./LockoutTracker";
import { useParams } from "react-router-dom";

const Game = () => {
  const { gameId } = useParams();

  return (
    <>
      <LockoutTracker gameId={gameId ?? ""} gen={1} />
    </>
  );
};

export default Game;
