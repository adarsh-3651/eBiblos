// src/routes/authRoutes.js
import { AuthLayout, Login } from "../components/index.js";
import Signup from "../pages/Signup.jsx";

const authRoutes = [
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
];

export default authRoutes;
