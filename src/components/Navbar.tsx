import { auth } from "../firebaseApp";
import useUser from "../hooks/useUser";
import LoginPopup from "./LoginPopup";
import { AppNavBar, NavItemT } from "baseui/app-nav-bar";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [loginOpen, setLoginOpen] = useState(false);

  const loginItems: NavItemT[] = [{ label: "Log In" }];

  const logOut = () => signOut(auth);

  const logoutItems: NavItemT[] = [{ label: "Log Out" }];

  return (
    <>
      <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <AppNavBar
        username={user?.displayName ?? user?.email ?? ""}
        usernameSubtitle={user ? undefined : "Not Logged In"}
        userImgUrl={user?.photoURL ?? undefined}
        userItems={user ? logoutItems : loginItems}
        onUserItemSelect={user ? logOut : () => setLoginOpen(true)}
      />
    </>
  );
};

export default Navbar;
