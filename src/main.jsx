import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientid={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      onScriptLoadError={() => console.error("Fail")}
      onScriptLoadSuccess={() => console.log("Success")}>
    <App />
  </GoogleOAuthProvider>
)
