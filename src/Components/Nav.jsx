import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav() { 
  const [products] = useContext(ProductContext); 
  let distinct_cat = products && products.reduce((acc, cv)=>[...acc, cv.category], []) ; 
  distinct_cat = [...new Set(distinct_cat)] ;
  console.log(distinct_cat) ;

  const color = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4)`;
  }

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-3 px-5 border rounded border-blue-200 text-blue-300"
        href="/create"
      > 
        Add New Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3 font-semibold">Category Filter</h1>
      <div className="w-[80%]"> 
        {distinct_cat.map((c, i) => (
          <Link to={`/?category=${c}`} key={i} className="mb-3 flex items-center">
            <span style={{backgroundColor: color()}} className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-100"></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
} 

export default Nav;
