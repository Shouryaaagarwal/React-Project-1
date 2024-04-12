import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";
export const ProductContext = createContext();

function Context(props) {
  const [prodcuts, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );
  // const getproducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setproducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(prodcuts);
  // useEffect(() => {
  //   getproducts();
  // }, []);

  return (
    <ProductContext.Provider value={[prodcuts, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
