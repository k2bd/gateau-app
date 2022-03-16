import { GEN_2_POKEMON, toOwned, toSeen } from "../gameData/pokemon";
import useAddSubscriptions from "../hooks/useAddSubscriptions";
import PlayersList from "./Game/PlayersList";
import LockoutTracker from "./LockoutTracker";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const { gameId } = useParams();

  const { addSubscriptions } = useAddSubscriptions({ gameId: gameId ?? "" });

  const gen1Seen = GEN_2_POKEMON.map((pokemon) => toSeen(pokemon.name));
  const gen1Owned = GEN_2_POKEMON.map((pokemon) => toOwned(pokemon.name));

  const setupGame = () => {
    addSubscriptions(gen1Seen.concat(gen1Owned));
  };

  useEffect(() => {
    setupGame();
  }, []);

  return (
    <>
      <PlayersList gameId={gameId ?? ""} />
      <LockoutTracker gameId={gameId ?? ""} gen={2} />
    </>
  );
};

export default Game;
