import useAxios from "axios-hooks";
import { GATEAU_API_URL } from "../constants";

/**
 * Add new subscriptions to a game
 */
const useAddSubscriptions = ({
  gameId,
  subscriptions,
}: {
  gameId: string;
  subscriptions: string[];
}) =>
  useAxios(
    {
      url: `/game/${gameId}/subscriptions`,
      baseURL: GATEAU_API_URL,
      method: "POST",
      data: { subscriptions },
    },
    { manual: true, autoCancel: false }
  );

export default useAddSubscriptions;
