import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

import { Analytics } from "@vercel/analytics/react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { persistor } from "../";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
          <Analytics />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
