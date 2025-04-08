// src/routes/routes.js
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes.jsx";
import appRoutes from "./appRoutes.jsx";
import footerRoutes from "./footerRoutes.jsx";
import googleRoutes from "./googleRoutes.jsx";

const router = createBrowserRouter([...appRoutes, ...authRoutes, ...footerRoutes, ...googleRoutes]);

export default router;
