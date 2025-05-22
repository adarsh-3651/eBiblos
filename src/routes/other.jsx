import DashboardPage from "../components/DashboardPage.jsx";
import EditPost from "../pages/EditPost";


const other = [
  { path: "/dashboardPage", element: <DashboardPage /> },
  {path: "/editpost/:postId", element: <EditPost/>},

];

export default other;