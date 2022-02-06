import useUser from "../hooks/useUser";
import Navbar from "./Navbar";
import UserInfoModal from "./UserInfoModal";
import { Outlet } from "react-router-dom";

const App = () => {
  const { user } = useUser();
  const needsUpdate = user && !user.displayName;
  return (
    <>
      <Navbar />
      <UserInfoModal isOpen={!!needsUpdate} onClose={() => null} />
      <Outlet />
    </>
  );
};

export default App;
