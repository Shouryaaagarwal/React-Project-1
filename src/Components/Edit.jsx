import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { ProductContext } from "../utils/Context";

function Edit() {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
//   const [product, setproduct] = useState({
//     title: "",
//     description: "",
//     image: "",
//     price: "",
//     category: "",
//   }); 
const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  
  const Changehandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

//   useEffect(() => {
//     setproduct(products.filter((p)=>p.id==id));
//   }, [id]) ; 
//   console.log(product) ;  
useEffect(() => {
    const filteredProduct = products.find(p => p.id ==id);
    if (filteredProduct) {
      setproduct(filteredProduct);
    }
  }, [id, products]);
//   console.log(product) ;

  const AddproductHandler = (e) => {
    e.preventDefault();
    if (
      product.image.trim().length < 5 ||
      product.title.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every field must be filled");
      return;
    }
    const pi = products.findIndex((p)=>p.id==id) ;
    console.log(product, pi) ; 
    const copyData= [...products] ;
    copyData[pi] = {...products[pi], ...product}  ;
      setproducts(copyData);
      localStorage.setItem("products", JSON.stringify(copyData));
      navigate(-1); 
  };
  return (
    <div>
      <form
        onSubmit={AddproductHandler}
        className="p-[5%] w-screen h-screen flex flex-col items-center"
        action=""
      >
        <h1 className="text-1xl font-semibold w-1/2 mb-3">Edit Product</h1>
        <input
          onChange={Changehandler}
          value={product && product.image}
          type="url"
          name="image"
          placeholder="image link"
          className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
        />
        <input
          onChange={Changehandler}
          value={product && product.title}
          type="text"
          name="title"
          placeholder="title"
          className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
        />

        <div className="flex w-1/2 justify-between mb-3">
          <input
            onChange={Changehandler}
            value={product && product.category}
            type="text"
            name="category"
            placeholder="category"
            className="text-1xl bg-zinc-100 rounded p-3 w-[45%]"
          />

          <input
            onChange={Changehandler}
            value={product&&product.price}
            name="price"
            type="number"
            placeholder="price"
            className="text-1xl bg-zinc-100  rounded p-3 w-[45%]"
          />
        </div>
        <textarea
          onChange={Changehandler}
          value={product&&product.description}
          name="description"
          placeholder="enter product description here..."
          className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
          rows="10"
        ></textarea>
        <div className="w-1/2">
          <button
            className=" self-start py-3 px-5 border rounded border-blue-200 text-blue-300"
            href="/create"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
