import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { ThemeProvider } from "./components/Layout/ThemeContext.jsx";
import ContextProvider from "./context/ContextProvider.jsx";
import ToasterNotification from "./pages/Notifications/ToasterNotification.jsx"; 

import "./index.css";
import App from "./App.jsx";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    const { method } = response.config;
    const isMutation = ["post", "put", "patch", "delete"].includes(method.toLowerCase());
    
    if (isMutation && response.data?.status === "success") {
      toast.success(response.data.message || "Action completed successfully");
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || "An unexpected error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider>
          <ToasterNotification />
          <App />
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);