import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Page/Login";
import Dasbord from "./Page/Dasbord";
import PageMovie from "./Page/PageMovie";
import { Provider } from "react-redux";
import store from "./Component/redux/Feture/strore";
import Footer from "./Page/Footer";
// Perbaikan rute
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dasbord",
    element: <Dasbord />,
  },
  {
    path: "/PageMovie/:id",
    element: <PageMovie />,
  },
  {
    path: "/Footer",
    element: <Footer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
