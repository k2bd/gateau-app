import { useState } from "react";
import useLocalStorage from "use-local-storage";

/**
 * Control and access the content that should be displayed next to the player's
 * name in the player list on a per-game basis. For example, this might be the
 * score in a catch-em-all race.
 */
const usePlayerListTags = () => {
  const [tagContents, setTagContents] = useLocalStorage<{
    [gameId: string]: { [playerId: string]: string | undefined } | undefined;
  }>("playerTags", {});

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

  return { getTag, setTag };
};

export default usePlayerListTags;
