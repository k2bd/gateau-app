import useUser from "../hooks/useUser";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Outlet, useNavigate } from "react-router-dom";

export const SIDEBAR_EXPANDED_WIDTH = "270px";
export const SIDEBAR_COLLAPSED_WIDTH = "80px";

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarWidth = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_EXPANDED_WIDTH;

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("login");
  }, [user]);

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          position: "fixed",
          float: "left",
          top: 0,
          left: 0,
          height: "100%",
          width: sidebarWidth,
        }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarWidth,
          height: "100%",
          width: `calc(100% - ${sidebarWidth})`,
          transition: "0.3s",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
