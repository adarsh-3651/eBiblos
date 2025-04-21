// src/routes/appRoutes.js
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import AddPost from "../pages/SellProduct.jsx";
import EditPost from "../pages/EditPost.jsx";
import Post from "../pages/ProductCard.jsx";
import AllPosts from "../pages/AllProducts.jsx";
import { AuthLayout } from "../components/index.js";
import DashboardPage from "../components/Dashboardpage.jsx";


const appRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
      { path: "/dashboardPage", element: <DashboardPage /> },
      {path: "/editpost/:postId", element: <EditPost/>},

    ],
  },
];

export default appRoutes;
