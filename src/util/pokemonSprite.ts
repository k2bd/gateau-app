import { PokemonInfo } from "../types";

const pokemonSprite = ({
  pokemon,
  shiny,
}: {
  pokemon?: PokemonInfo;
  shiny: boolean;
}) => (shiny ? pokemon?.sprites.front_shiny : pokemon?.sprites.front_default);

export default pokemonSprite;
