import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddproductHandler = (e) => {
    e.preventDefault();
    if (
      image.trim().length < 5 ||
      title.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every field must be filled");
      return;
    }
    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate("/"); 

    toast.success("Product added Successfully")
  };
  return (
    <form
      onSubmit={AddproductHandler}
      className="p-[5%] w-screen h-screen flex flex-col items-center"
      action=""
    >
      <h1 className="text-1xl font-semibold w-1/2 mb-3">Add New Product</h1>
      <input
        onChange={(e) => setImage(e.target.value)}
        value={image}
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
      />
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
      />

      <div className="flex w-1/2 justify-between mb-3">
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[45%]"
        />

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100  rounded p-3 w-[45%]"
        />
      </div>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="enter product description here..."
        className="text-1xl bg-zinc-100 rounded mb-3 p-3 w-1/2"
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button
          className=" self-start py-3 px-5 border rounded border-blue-200 text-blue-300"
          href="/create"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
}

export default Create;
