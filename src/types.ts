export enum Stage {
  DEV,
  PROD,
}

export enum Cartridge {
  POKEMON_RED = "Pokemon Red",
  POKEMON_BLUE = "Pokemon Blue",
  POKEMON_GOLD = "Pokemon Gold",
  POKEMON_SILVER = "Pokemon Silver",
  POKEMON_CRYSTAL = "Pokemon Crystal",
}

export type Generation = 1 | 2;

export interface Player {
  uid: string;
  cartridge: Cartridge;
  color: string;
  name?: string | null;
  photo_url?: string | null;
}

export type EventValueType = string | number | boolean;

export interface GameEvent {
  meaning: string;
  value: EventValueType;
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

export interface PokemonAvatar {
  nationalDex: number;
  allowShiny: boolean;
  grantReason?: string | null;
}

export interface FirebaseUser {
  uid: string;
  claims?: { [key: string]: boolean } | null;
  displayName?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  avatars: PokemonAvatar[];
}
