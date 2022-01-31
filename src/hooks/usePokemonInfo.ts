import useAxios from "axios-hooks";
import { PokemonInfo } from "../types";

const usePokemonInfo = ({ num }: { num: number }) =>
  useAxios<PokemonInfo>({
    url: `https://pokeapi.co/api/v2/pokemon/${num}/`,
  });

export default usePokemonInfo;
