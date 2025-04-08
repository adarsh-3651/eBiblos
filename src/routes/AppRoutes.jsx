// src/routes/appRoutes.js
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import AddPost from "../pages/AddPost.jsx";
import EditPost from "../pages/EditPost.jsx";
import Post from "../pages/Post.jsx";
import AllPosts from "../pages/AllPosts.jsx";
import { AuthLayout } from "../components/index.js";

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
    ],
  },
];

export default appRoutes;
