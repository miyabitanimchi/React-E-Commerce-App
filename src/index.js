import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import ProductsProvider from "./context/products-context";
import AuthProvider from "./context/auth-context";
import AppRouter from "./routers/AppRouter";
import CartQty from "./components/cart/CartQty";
import CommentsProvider from "../src/context/comments-context";
// require('dotenv').config();

ReactDOM.render(
  <AuthProvider>
    <ProductsProvider>
      <CommentsProvider>
        <CartQty>
          <AppRouter />
        </CartQty>
      </CommentsProvider>
    </ProductsProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
