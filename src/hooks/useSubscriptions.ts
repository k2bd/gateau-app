import useWatchDatabase from "./useWatchDatabase";

/**
 * Get the live state of players in the game
 */
const useSubscriptions = ({ gameId }: { gameId: string }) => {
  const path = `/games/${gameId}/subscriptions`;
  const { value, loading, error } = useWatchDatabase<{
    [key: string]: boolean;
  }>({
    path,
  });

  const subscriptions = value ? Object.keys(value) : [];

  return { subscriptions, loading, error };
};

export default useSubscriptions;
