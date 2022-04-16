import { createContext } from "react";
import { useState } from "react";

type ContextType = {
  [gameId: string]: { [playerId: string]: string | undefined } | undefined;
};

const playerListTagsContext = createContext<{
  state: ContextType;
  setTag: (tag: { gameId: string; playerId: string; content: string }) => void;
  getTag: (from: { gameId: string; playerId: string }) => string | undefined;
}>({
  state: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTag: () => {},
  getTag: () => undefined,
});

/**
 * Control and access the content that should be displayed next to the player's
 * name in the player list on a per-game basis. For example, this might be the
 * score in a catch-em-all race.
 */
export const usePlayerListTags = () => {
  const [tagContents, setTagContents] = useState<ContextType>({});

  const setTag = ({
    gameId,
    playerId,
    content,
  }: {
    gameId: string;
    playerId: string;
    content: string;
  }) => {
    setTagContents((tagContents) => ({
      ...tagContents,
      [gameId]: { ...(tagContents?.[gameId] ?? {}), [playerId]: content },
    }));
  };

  const getTag = ({
    gameId,
    playerId,
  }: {
    gameId: string;
    playerId: string;
  }) => {
    const gameData = tagContents[gameId] ?? {};
    const playerData = gameData[playerId] ?? undefined;
    return playerData;
  };

  return { tagContents, getTag, setTag };
};

export default playerListTagsContext;
