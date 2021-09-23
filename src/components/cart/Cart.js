import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { useAuthContext } from "../../context/auth-context";
import { useProductsContext } from "../../context/products-context";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useAuthContext();
  const { refreshQuantity } = useProductsContext();
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);

  const getProductsArrInLocalStorage = () => {
    if (user && localStorage.hasOwnProperty(user.uid)) {
      setProductsAddedToCart(JSON.parse(localStorage.getItem(user.uid)));
    } else if (localStorage.hasOwnProperty("unknown")) {
      setProductsAddedToCart(JSON.parse(localStorage.getItem("unknown")));
    }
  };

  // if user removes some of item in cart
  const getNewAddedProductsArr = (id) => {
    const newAddedProductsArr = productsAddedToCart.filter(
      (product) => product.productUid !== id
    );
    refreshQuantity(newAddedProductsArr);
    setProductsAddedToCart(newAddedProductsArr);
    if (user) {
      localStorage.removeItem(user.uid);
      localStorage.setItem(user.uid, JSON.stringify(newAddedProductsArr));
    } else {
      localStorage.removeItem("unknown");
      localStorage.setItem("unknown", JSON.stringify(newAddedProductsArr));
    }
  };

  useEffect(() => {
    getProductsArrInLocalStorage();
  }, [user]);



  
  return (
    <>
      {productsAddedToCart.length !== 0 ? (
        <main className="cart-container">
          {productsAddedToCart.map((product) => (
            <CartItem
              key={product.productUid}
              {...product}
              // ******* Need to rename this *******
              handleFunc={getNewAddedProductsArr}
            />
          ))}
          <div className="checkout-wrap">
            <p className="total-price">
              Total Price: $
              {productsAddedToCart
                .reduce((acc, productObj) => {
                  return Number(acc) + Number(productObj.subTotal);
                }, 0)
                .toFixed(2)}
            </p>
            <Link to={"/checkout/"} className="checkout-btn">
              Checkout
            </Link>
            <Link to={"/"} className="continue-shop-btn">
              Continue Shopping
            </Link>
          </div>
        </main>
      ) : (
        <main className="no-item-container">
          <div className="no-item-notice-wrap">
            <h1 className="no-item-notice">No Items in Cart.</h1>
            <Link to={"/"}>Go Back to Main Page</Link>
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;
