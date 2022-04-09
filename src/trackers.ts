import { Cartridge } from "./types";

export const CATCH_EM_ALL = "Catch em all";
export const LOCKOUT_RACE = "Lockout Race";
export const PARTY_STATUS = "Party Status";

interface TrackerInfo {
  name: string;
  available: boolean;
  compatibleCartriges: string[];
}

export const TRACKERS: TrackerInfo[] = [
  {
    name: CATCH_EM_ALL,
    available: false,
    compatibleCartriges: [Cartridge.POKEMON_RED, Cartridge.POKEMON_BLUE],
  },
  {
    name: LOCKOUT_RACE,
    available: true,
    compatibleCartriges: [
      Cartridge.POKEMON_RED,
      Cartridge.POKEMON_BLUE,
      Cartridge.POKEMON_GOLD,
      Cartridge.POKEMON_SILVER,
    ],
  },
  {
    name: PARTY_STATUS,
    available: false,
    compatibleCartriges: [Cartridge.POKEMON_RED, Cartridge.POKEMON_BLUE],
  },
];
