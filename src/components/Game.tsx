import { GEN_1_POKEMON, toOwned, toSeen } from "../gameData/pokemon";
import useAddSubscriptions from "../hooks/useAddSubscriptions";
import useSetPlayer from "../hooks/useSetPlayer";
import { Cartridge } from "../types";
import Pokedex from "./Pokedex";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const { gameId } = useParams();

  const { addSubscriptions } = useAddSubscriptions({ gameId: gameId ?? "" });
  const { setPlayer } = useSetPlayer({ gameId: gameId ?? "" });

  const gen1Seen = GEN_1_POKEMON.map((pokemon) => toSeen(pokemon.name));
  const gen1Owned = GEN_1_POKEMON.map((pokemon) => toOwned(pokemon.name));

  const setupGame = () => {
    addSubscriptions(gen1Seen.concat(gen1Owned));
    setPlayer({
      uid: "tempPlayer123",
      name: "Kevin",
      cartridge: Cartridge.POKEMON_RED,
      color: "0x123456",
    });
  };

  useEffect(() => {
    setupGame();
  }, []);

  return (
    <>
      <Pokedex gameId={gameId ?? ""} />
    </>
  );
};

export default Game;
