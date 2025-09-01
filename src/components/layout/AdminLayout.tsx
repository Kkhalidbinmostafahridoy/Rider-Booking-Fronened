import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
