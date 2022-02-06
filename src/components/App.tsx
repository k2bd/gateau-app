import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
