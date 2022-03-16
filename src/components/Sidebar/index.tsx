import useUser from "../../hooks/useUser";
import { SIDEBAR_COLLAPSED_WIDTH } from "../App";
import LoginPopup from "../LoginPopup";
import UserInfoModal from "./UserInfoModal";
import bg from "./assets/bg.png";
import { Avatar } from "baseui/avatar";
import { Button, SIZE } from "baseui/button";
import { ChevronRight, ChevronLeft } from "baseui/icon";
import { Dispatch, SetStateAction, useState } from "react";
import { FaGem, FaHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
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
  const { user, signOut } = useUser();
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);

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

  const footerContent = user ? (
    <FooterContent>
      <Button
        onClick={() => setUserInfoModalOpen(true)}
        size={SIZE.mini}
        kind="tertiary"
      >
        <Avatar
          name={user.displayName ?? user.email ?? ""}
          src={user.photoURL ?? undefined}
        />
      </Button>
      {!collapsed && (
        <>
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
          <Button onClick={signOut} kind="tertiary">
            <MdLogout />
          </Button>
        </>
      )}
    </FooterContent>
  ) : (
    <>
      <Button onClick={() => setLoginPopupOpen(true)}>Log In</Button>
    </>
  );

  return (
    <>
      <LoginPopup
        isOpen={loginPopupOpen}
        onClose={() => setLoginPopupOpen(false)}
      />
      <UserInfoModal
        isOpen={userInfoModalOpen}
        onClose={() => setUserInfoModalOpen(false)}
      />
      <ProSidebar collapsed={collapsed} image={bg}>
        <SidebarHeader>{headerContent}</SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
            <SubMenu title="Components" icon={<FaHeart />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>{footerContent}</SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
