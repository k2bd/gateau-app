import { GATEAU_API_URL } from "../constants";
import useAxios from "axios-hooks";

/**
 * Add new subscriptions to a game
 */
const useAddSubscriptions = ({ gameId }: { gameId: string }) => {
  const [result, post] = useAxios(
    {
      url: `/game/${gameId}/subscriptions`,
      baseURL: GATEAU_API_URL,
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  return {
    result,
    addSubscriptions: async (subscriptions: string[]) =>
      post({ data: { subscriptions } }),
  };
};

export default useAddSubscriptions;
