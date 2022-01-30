import { useParams } from "react-router-dom";
import Pokedex from "./Pokedex";

const Game = () => {
  const { gameId } = useParams();

  return (
    <>
      <Pokedex gameId={gameId ?? ""} />
    </>
  );
};

export default Game;
