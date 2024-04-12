import React, { useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loding from "./Loding"; 
import { ProductContext } from "../utils/Context"; 
import { useContext } from "react";

function Details() {  
   const navigate = useNavigate() ;
 const [product, setproduct] = useState(null) ; 
 const [products, setproducts] = useContext(ProductContext);

 
const{id} =  useParams() ; 
console.log(id) ; 

    // const getsingleproducts =async()=>{
    //   try{ 
    //     const {data} = await axios.get(`/products/${id}`)  ;
    //     setproduct(data);
    //   }catch(error){
    //     console.log(error) ;
    //   }


    // }  ; 

    useEffect(()=>{ 
      if(!product){ 
        setproduct(products.filter((p)=>p.id == id)[0])
      } 
    
      // getsingleproducts()
    }, []) ;

const productDelete = (id)=>{ 
  const filteredProducts = products.filter((p)=>p.id !== id);  
 setproducts(filteredProducts) ;
 localStorage.setItem("products", JSON.stringify(filteredProducts)) ; 
 navigate("/")
}

  return product ? (
    <div className="w-[70%] flex  h-full justify-between items-center p-auto  m-auto p-[10%]  ">
      <img
        className=" w-[40%] h-[80% ] object-contain"
        src={`${product.image}`}
        alt=""
      />
      <div className="content  w-[50%]">
        <h1 className="text-4xl my-5 ">{`${product.title}`}.</h1>
        <h2 className="text-red-300 mb-2">{`${product.price}`}</h2>
        <h3 className="text-zinc-400 mb-2">{`${product.category}`}</h3>
        <p className="mb-[5%]">{`${product.description}`}</p>
        <Link to={`/edit/${product.id}`} className="py-1 px-5 mr-3 border rounded border-blue-200 mt-5 text-blue-300">
          Edit
        </Link>
        <button onClick={()=>productDelete(product.id)} className="py-1 px-5  border rounded border-red-200 text-red-300">
          Delete
        </button>
      </div>
    </div>
  ):( 
    <Loding/>
  );
}

export default Details;
