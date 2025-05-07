// src/routes/footerRoutes.js
import Account from "../pages/Account.jsx";
import Help from "../pages/Help.jsx";
import Contact from "../pages/Contact.jsx";
import Support from "../pages/Support.jsx";
import Terms from "../pages/Terms.jsx";
import Privacy from "../pages/Privacy.jsx";
import Licensing from "../pages/Licensing.jsx";

const footerRoutes = [
  { path: "/account", element: <Account /> },
  { path: "/help", element: <Help /> },
  { path: "/contact", element: <Contact /> },
  { path: "/support", element: <Support /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/licensing", element: <Licensing /> },
];

export default footerRoutes;
