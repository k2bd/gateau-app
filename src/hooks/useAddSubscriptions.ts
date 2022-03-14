import { GATEAU_API_URL } from "../constants";
import useUser from "./useUser";
import useAxios from "axios-hooks";

/**
 * Add new subscriptions to a game
 */
const useAddSubscriptions = ({ gameId }: { gameId: string }) => {
  const { user } = useUser();
  console.log(user);
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
    addSubscriptions: async (subscriptions: string[]) => {
      const idToken = await user?.getIdToken();
      console.log("AAA");
      console.log(idToken);
      console.log("/AAA");
      return post({
        data: { subscriptions },
        headers: { Authorization: `Bearer ${idToken}` },
      });
    },
  };
};

export default useAddSubscriptions;
