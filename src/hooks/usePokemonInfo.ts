import useAxios from "axios-hooks";

const usePokemonInfo = ({ num }: { num: number }) =>
  useAxios<PokemonInfo>({
    url: `https://pokeapi.co/api/v2/pokemon/${num}/`,
  });

export default usePokemonInfo;
