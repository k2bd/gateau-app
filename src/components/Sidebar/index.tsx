import useUser from "../../hooks/useUser";
import { SIDEBAR_COLLAPSED_WIDTH } from "../App";
import UserInfoModal from "./UserInfoModal";
import bg from "./assets/bg.png";
import { Avatar } from "baseui/avatar";
import { Button, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { ChevronRight, ChevronLeft } from "baseui/icon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GiSwordsPower } from "react-icons/gi";
import { MdLogout, MdInfo, MdHome } from "react-icons/md";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { styled } from "styletron-react";

const HeaderContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  verticalAlign: "middle",
  alignItems: "center",
  justifyContent: "space-between",
});

const FooterContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  verticalAlign: "middle",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
});

const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, loading, signOut, isAdmin } = useUser();
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);

  useEffect(() => {
    if (user && !loading && (!user?.displayName || !user.photoURL))
      setUserInfoModalOpen(true);
  }, [user]);

  const headerContent = (
    <HeaderContent>
      {!collapsed && (
        <span style={{ marginLeft: "10px" }}>
          <h3>Gateau</h3>
        </span>
      )}
      <Button onClick={() => setCollapsed(!collapsed)} kind="tertiary">
        <div style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : undefined }}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </div>
      </Button>
    </HeaderContent>
  );

  const footerContent = (
    <FooterContent>
      {user && (
        <ButtonGroup kind="tertiary">
          <Button
            onClick={() => setUserInfoModalOpen(true)}
            size={SIZE.mini}
            kind="tertiary"
          >
            <Avatar
              name={user.displayName ?? user.email ?? ""}
              src={user.photoURL ?? undefined}
            />
            {!collapsed && (
              <span
                style={{
                  marginLeft: "5px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {user.displayName}
              </span>
            )}
          </Button>
          {!collapsed && (
            <Button onClick={signOut} kind="tertiary" size={SIZE.mini}>
              <MdLogout />
            </Button>
          )}
        </ButtonGroup>
      )}
    </FooterContent>
  );

  return (
    <>
      <UserInfoModal
        isOpen={userInfoModalOpen}
        onClose={() => setUserInfoModalOpen(false)}
      />
      <ProSidebar collapsed={collapsed} image={bg}>
        <SidebarHeader>{headerContent}</SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<MdHome />}>
              Home
              <Link to="/" />
            </MenuItem>
            <MenuItem icon={<MdInfo />}>
              About
              <Link to="/about" />
            </MenuItem>
            <MenuItem icon={<FaHeart />}>
              Support
              <Link to="/support" />
            </MenuItem>
            {isAdmin ? (
              <MenuItem icon={<GiSwordsPower />}>
                Admin
                <Link to="/admin" />
              </MenuItem>
            ) : (
              <></>
            )}
          </Menu>
        </SidebarContent>
        <SidebarFooter>{footerContent}</SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
