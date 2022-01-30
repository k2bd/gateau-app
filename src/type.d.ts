enum Cartridge {
  POKEMON_RED = "Pokemon Red",
  POKEMON_BLUE = "Pokemon Blue",
}

interface Player {
  uid: string;
  name: string;
  cartridge: Cartridge;
}

interface GameEvent {
  meaning: string;
  value: string | number | boolean;
  playerId: string;
  timestamp: string;
}

interface PokeSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

interface PokemonInfo {
  id: number;
  name: string;
  sprites: PokeSprites;
}
