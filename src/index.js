// Load your styles first (optional)
import "./styles.css";

// Load Bootstrap last so it overrides everything else
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
