import Mods from "@/components/dashboard/sections/Mods";
import DashboardError from "./(components)/sections/DashboardError";
import Workspaces from "./(components)/sections/Workspaces";
import Overview from "./(components)/sections/Overview";

const sectionList = [
  {
    id: 1,
    name: "overview",
    component: <Overview />,
  },
  {
    id: 2,
    name: "mods",
    component: <Mods />,
  },
  {
    id: 2,
    name: "workspaces",
    component: <Workspaces />,
  },
  {
    id: 99,
    name: "dashboard_auth_error",
    component: (
      <DashboardError
        title="Your role is too low!"
        message={`You do not have the required permissions to access this section. Required permissions: ${["DASHBOARD_PERMS", "ADMIN_PERMS", "ACCESS_VIEW", "ACCESS_EDIT"].join(", ")}`}
        errorCode={403}
      />
    ),
  },

  {
    id: 4,
    name: "user_roles",
    component: <div className="text-white">Users and roles</div>,
  },
];

export default sectionList;
