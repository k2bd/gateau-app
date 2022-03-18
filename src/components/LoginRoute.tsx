import useUser from "../hooks/useUser";
import LoginPopup from "./LoginPopup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) navigate("/");
  }, [user]);

  return <LoginPopup isOpen={true} />;
};

export default LoginRoute;
