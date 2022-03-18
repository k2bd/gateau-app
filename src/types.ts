export enum Stage {
  DEV,
  PROD,
}

export enum Cartridge {
  POKEMON_RED = "Pokemon Red",
  POKEMON_BLUE = "Pokemon Blue",
}

export type Generation = 1 | 2;

export interface Player {
  uid: string;
  cartridge: Cartridge;
  color: string;
  name?: string | null;
  photo_url?: string | null;
}

export interface GameEvent {
  meaning: string;
  value: string | number | boolean;
  player_id: string;
  timestamp: string;
}

export interface PokeSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

export interface PokemonInfo {
  id: number;
  name: string;
  sprites: PokeSprites;
}
