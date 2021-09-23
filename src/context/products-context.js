import React, { useState, createContext, useContext, useEffect } from 'react';
import categoryArr, { additionalProducts } from '../products/additionalProducts';
import axios from 'axios';
import { useAuthContext } from './auth-context';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(null);

console.log(user)

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const originalProducts = res.data;

        // change products categories
        originalProducts.forEach((product) => {
          if (product.id === 1) product.category = categoryArr[1]; // Change a category of bag to accessories
          if (product.category === "men's clothing" || product.category === "women's clothing") {
            product.category = categoryArr[0];
          } else if (product.category === "jewelery") {
            product.category = categoryArr[1];
          }
        })
        const allProducts = originalProducts.concat(additionalProducts);
        // console.log(allProducts);
        setProducts(allProducts);
      } catch (err) {
        console.error(`Error happened: ${err}`);
      }
    };
    fetchAPI();
  }, []);

  const refreshQuantity = (cartContents) => {
    if (cartContents && cartContents.length !== 0) {
      let qty = 0;
      cartContents.forEach(productData => {
        qty += productData.quantity;
      })
      setCartQuantity(qty);  
    } else {
      setCartQuantity(null);
    }
  }

  useEffect(() => {
    const uid = user ? user.uid : "unknown";
    refreshQuantity(JSON.parse(localStorage.getItem(uid)));
  }, [user]);

  return (
    <ProductsContext.Provider value={{
      products,
      setProducts,
      cartQuantity,
      refreshQuantity
    }}>
      { children }
    </ProductsContext.Provider>
  )
};

const useProductsContext = () => useContext(ProductsContext);

export { useProductsContext, ProductsProvider as default }
