import React, { useState, useEffect, useContext } from "react";
import { useProductsContext } from "../../context/products-context";
import { useAuthContext } from "../../context/auth-context";
import Specification from "./Specification";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PopUp from "./PopUp";
import DetailResponsive from "./DetailResponsive";

import Reviews from "../review/Reviews"
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { CommentsContext } from '../../context/comments-context';
import "./Detail.scss";
import MediaQuery from "react-responsive";

const Detail = (props) => {
  const { products, refreshQuantity } = useProductsContext();
  const { user } = useAuthContext();
  const { avgRating,labels,productComments } = useContext(CommentsContext)

  // Popup Function
  const [popUp, setPopUp] = useState(false);

  // Close if click modal background
  const popUpClose = () => {
    setPopUp(false);
  };

  const [chosenProductInfo, setchosenProductInfo] = useState({
    product: [],
    productUid: uuidv4(),
    size: "",
    color: "",
    quantity: 1,
    subTotal: 0,
  });
  const [addedProductsArr, setAddedProductsArr] = useState([]);

  useEffect(() => {
    if (user) {
      // Get user's own array (cart list) or create new
      localStorage.hasOwnProperty(user.uid) &&
        setAddedProductsArr(JSON.parse(localStorage.getItem(user.uid)));
    } else {
      const unknownData = localStorage.getItem("unknown");
      // If unknown user has put items to cart, set those items
      !!unknownData && setAddedProductsArr(JSON.parse(unknownData));
    }
  }, [user]);

  useEffect(() => {
    if (products.length !== 0) {
      const chosenProduct = products.filter(
        (product) => product.id === Number(props.match.params.id)
      );
      let size = "";
      if (chosenProduct[0].category === "electronics") size = "-";
      setchosenProductInfo((prevInfo) => ({
        ...prevInfo,
        product: chosenProduct,
        subTotal: (
          (Math.round(chosenProduct[0].price * 10) / 10) *
          prevInfo.quantity
        ).toFixed(2),
        size,
      }));
    }
  }, [products]);

  useEffect(() => {
    refreshQuantity(addedProductsArr);
    // user && localStorage.setItem(user.uid, JSON.stringify(addedProductsArr));
    if (user) {
      localStorage.setItem(user.uid, JSON.stringify(addedProductsArr));
    } else {
      localStorage.setItem("unknown", JSON.stringify(addedProductsArr));
    }
  }, [addedProductsArr]);

  const setChosenSize = (targetedEl) => {
    // targetedEl.classList.add("selected-size");
    setchosenProductInfo({
      ...chosenProductInfo,
      size: targetedEl.value,
      productUid: uuidv4(),
    });
  };

  const setChosenColor = (targetedEl) => {
    setchosenProductInfo({
      ...chosenProductInfo,
      color: targetedEl.value,
      productUid: uuidv4(),
    });
  };

  const changeQuantity = (selectedQuantity) => {
    setchosenProductInfo({
      ...chosenProductInfo,
      quantity: selectedQuantity,
      subTotal: (
        (Math.round(chosenProductInfo.product[0].price * 10) / 10) *
        selectedQuantity
      ).toFixed(2),
    });
  };

  // When click Add to Cart button
  const addToCart = (e) => {
    e.preventDefault();
    // for loaclStorage
    setAddedProductsArr((addedProductsArr) => {
      return [...addedProductsArr, chosenProductInfo];
    });

    // To go to cart page
    // props.history.push("/cart");
    setPopUp(true);
  };

  return (
    <main className="main-detail-container">
      {chosenProductInfo.product.length !== 0 && (
        <>
          <Link to="/" className="back-to-main-btn">
            Go Back to Main Page
          </Link>
          <MediaQuery maxDeviceWidth={768}>
            <DetailResponsive
              chosenProductInfo={chosenProductInfo}
              setChosenColor={setChosenColor}
              setChosenSize={setChosenSize}
              changeQuantity={changeQuantity}
              addToCart={addToCart}
              popUp={popUp}
              popUpClose={popUpClose}
              setPopUp={setPopUp}
              addedProductsArr={addedProductsArr}
            />
          </MediaQuery>
          <MediaQuery minDeviceWidth={769}>
            <div className="detail-container">
              <div className="img-wrap">
                <img
                  src={chosenProductInfo.product[0].image}
                  alt={chosenProductInfo.product[0].title}
                />
              </div>
              <div className="description-wrap">
                <p className="category">
                  {chosenProductInfo.product[0].category}
                </p>
                <h2 className="product-name">
                  {chosenProductInfo.product[0].title}
                </h2>
                <span className="rating-star">
                
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="simple-controlled"
                      value={avgRating ? avgRating : 0}
                      readOnly
                    />
                  </Box>
                  {avgRating ? 
                  <>
                  <span style={{color:"black",fontSize:"20pt",fontStyle:"italic"}}>"{labels[avgRating]}"</span>
                  <span style={{color:"grey",fontSize:"12pt",fontStyle:"italic"}}>rated by {productComments.length}customer(s)</span>
                  </>
                  :
                  <p style={{color:"grey",fontSize:"12pt",fontStyle:"italic"}}>This product have no rating yet.</p>
                }


              </span>
                <p className="price-title">Price:</p>
                <p className="price">
                  $
                {(
                    Math.round(chosenProductInfo.product[0].price * 10) / 10
                  ).toFixed(2)}
                </p>
                <p className="description">
                  {chosenProductInfo.product[0].description}
                </p>
                <Specification
                  {...chosenProductInfo}
                  setChosenColor={setChosenColor}
                  setChosenSize={setChosenSize}
                />
                <div className="quantity-wrap">
                  <p className="quantity-title">Quantity: </p>
                  <select
                    name="quantity"
                    onChange={(e) => changeQuantity(Number(e.target.value))}
                    value={chosenProductInfo.quantity}
                    className="quantity"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <button
                  className="add-to-cart-btn "
                  disabled={
                    chosenProductInfo.size && chosenProductInfo.color
                      ? false
                      : true
                  }
                  onClick={addToCart}
                >
                  Add to Cart
              </button>

                {popUp === true && (
                  <div className="popUp" onClick={() => popUpClose()}>
                    <div
                      className="popUpWrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PopUp
                        open={() => setPopUp(true)}
                        close={() => setPopUp(false)}
                        qty={addedProductsArr.length}
                        price={addedProductsArr}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </MediaQuery>
         
          <Reviews id={props.match.params.id} />
        </>
      )}
    </main>
  );
};

export default Detail;
