import { GATEAU_API_URL } from "../constants";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const useGateauAxios = makeUseAxios({
  axios: axios.create({ baseURL: GATEAU_API_URL }),
});

export default useGateauAxios;
