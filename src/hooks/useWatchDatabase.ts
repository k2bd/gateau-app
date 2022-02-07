import firebaseApp from "../firebaseApp";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

/**
 * Watch and get live data from a subpath of the realtime database
 */
const useWatchDatabase = <T>({ path }: { path: string }) => {
  const db = getDatabase(firebaseApp);
  const [value, loading, error] = useObjectVal<T>(ref(db, path));

  return { value, loading, error };
};

export default useWatchDatabase;
