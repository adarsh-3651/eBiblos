import DashboardPage from "../components/Dashboardpage";
import EditPost from "../pages/EditPost";
import AdminRoutes from "./AdminRoutes";


const other = [
  { path: "/dashboardPage", element: <DashboardPage /> },
  {path: "/editpost/:slug", element: <EditPost/>},
  {path: "/admin/*", element: <AdminRoutes/>},

];

export default other;