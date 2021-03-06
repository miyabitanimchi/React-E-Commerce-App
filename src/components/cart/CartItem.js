import React from "react";
import { IoMdClose } from "react-icons/io";
import "./CartItem.scss";

// child

const CartItem = (props) => {
  const { product, productUid, size, color, quantity, subTotal } = props;

  const removeProduct = (productUid) => {
    props.handleFunc(productUid);
  };
  return (
    <div className="product-container">
      <div className="img-wrap">
        <img src={product[0].image} alt={product[0].title} />
      </div>
      <div className="product-info-wrap">
        <h3 className="title">{product[0].title}</h3>
        <p className="size">Size: {size}</p>
        <p className="color">Colour: {color}</p>
        <p className="quantity">Quantity: {quantity}</p>
        <p className="unitPrice">
          CAD $ {(Math.round(product[0].price * 10) / 10).toFixed(2)}
        </p>
        <p className="subtotal">Subtotal: CAD ${Number(subTotal).toFixed(2)}</p>
      </div>
      <IoMdClose
        className="close-icon"
        onClick={() => removeProduct(productUid)}
      />
    </div>
  );
};

export default CartItem;
