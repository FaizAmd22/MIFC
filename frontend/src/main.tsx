import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Layout from "./layout/layout.tsx";
import store from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </StrictMode>
);
