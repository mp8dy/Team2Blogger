import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext.js";
import CartProvider from "./contexts/CartContext.js";
import CartUpdateProvider from "./contexts/CartUpdate.js";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <CartUpdateProvider>
          <App />
        </CartUpdateProvider>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
