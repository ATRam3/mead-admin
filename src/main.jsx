import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Users from "./pages/Users.jsx";
import Meals from "./pages/Meals.jsx";
import Dashboard from "./pages/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Dashboard />
    <Users />
    <Meals />
  </StrictMode>,
);
