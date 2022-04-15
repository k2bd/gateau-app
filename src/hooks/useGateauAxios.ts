import { GATEAU_API_URL } from "../constants";
import { auth } from "../firebaseApp";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";

axios.interceptors.request.use(
  async (config) => {
    console.log(auth.currentUser);
    const token = await auth.currentUser?.getIdToken();
    config.headers = { authorization: `Bearer ${token}` };
  },
  (error) => Promise.reject(error)
);

const useGateauAxios = makeUseAxios({
  axios: axios.create({ baseURL: GATEAU_API_URL }),
});

export default useGateauAxios;
