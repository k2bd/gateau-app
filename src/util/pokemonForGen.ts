import { GEN_1_POKEMON, GEN_2_POKEMON } from "../gameData/pokemon";
import { Generation } from "../types";

const pokemonForGen = (gen: Generation) => {
  switch (gen) {
    case 1:
      return GEN_1_POKEMON;
    case 2:
      return GEN_2_POKEMON;
  }
};

export default pokemonForGen;
