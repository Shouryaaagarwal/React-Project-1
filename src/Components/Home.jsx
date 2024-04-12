

import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loding from "./Loding"; 
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);  

  const [filteredProducts, setfilteredProducts] = useState(null) ;

  const getsproductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category} `); 
      setfilteredProducts(data) ;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    if(!filteredProducts || category=='undefined') setfilteredProducts(products) ;
    if (category != "undefined"){ 

      // getsproductcategory(); 
      setfilteredProducts(products.filter(p=>p.category==category))

    } 
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="h-full w-[85%]  p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto  ">
        {filteredProducts && filteredProducts.map((p, i) => (
          <Link
            to={`/details/${p.id}`}
            key={i}
            className="card border shadow rounded w-[18%] h-[30vh] p-3 flex justify-center items-center mr-3 mb-2 flex-col"
          >
            <div
              className="hover:scale-110 mr-2 mb-3 w-full h-[80%]  bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            ></div>
            <h1 className="hover:text-blue-400">{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loding />
  );
}

export default Home;
