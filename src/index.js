import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import ThemeContext from "./context/ThemeContext";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import "./App.css";
import store from "./jsx/redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ThemeContext>
          <App />
        </ThemeContext>
      </BrowserRouter>
    </Provider>
    <NotificationContainer />
  </>
);

