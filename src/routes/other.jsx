import DashboardPage from "../components/Dashboardpage";
import EditPost from "../pages/EditPost";


const other = [
  { path: "/dashboardPage", element: <DashboardPage /> },
  {path: "/editpost/:slug", element: <EditPost/>},

];

export default other;