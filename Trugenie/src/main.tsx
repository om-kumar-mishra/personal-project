import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import appStore from "./lib/common/store";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./widgets/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={appStore.store}>
          <PersistGate loading={null} persistor={appStore.persist}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
reportWebVitals(true);
