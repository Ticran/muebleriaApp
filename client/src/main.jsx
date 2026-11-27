import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </CartProvider>
    </StrictMode>
);
