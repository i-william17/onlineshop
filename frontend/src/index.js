import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

// Create a root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your application using the root
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

reportWebVitals();
