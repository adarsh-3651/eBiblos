// Main components
export { default as Header } from "./Header/Header.jsx";
export { default as Footer } from "./Footer/Footer.jsx";
export { default as Container } from "./Container/Container.jsx";

// Auth components
export { default as Login } from "./Login.jsx";
export { default as Signup } from "./Signup.jsx";
export { default as LogoutBtn } from "./Header/LogoutBtn.jsx";
export { default as AuthLayout } from "./AuthLayout.jsx";

// UI Elements
export { default as Button } from "./Button.jsx";
export { default as Input } from "./Input.jsx";
export { default as Select } from "./Select.jsx";
export { default as Logo } from "./Logo.jsx";

// Post-related components
export { default as PostForm } from "./postform/PostForm.jsx";
export { default as PostCard } from "./PostCard.jsx";

// Optional: Export all as default for namespace imports
export * as Components from "./index.js";