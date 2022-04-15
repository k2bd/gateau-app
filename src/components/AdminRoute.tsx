import useAdminUsersList from "../hooks/useAdminUsersList";
import { Avatar } from "baseui/avatar";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { data: users } = useAdminUsersList();
  return (
    <>
      <>
        {users?.map((user) => (
          <Avatar
            name={user.displayName ?? ""}
            src={user.photoUrl ?? undefined}
            size="scale1600"
          />
        ))}
      </>
      <Outlet />
    </>
  );
};

export default AdminRoute;
