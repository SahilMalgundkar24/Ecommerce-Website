import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [nameValue, setnameValue] = useState("");
  const [priceValue, setpriceValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", nameValue);
    formData.append("Price", priceValue);
    formData.append("selectedImage", selectedImage);

    axios
      .post("/api/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formData);
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div>
        <h1 className="mb-2">Product Name</h1>
        <input
          type="text"
          placeholder="Enter product name"
          value={nameValue}
          onChange={(e) => setnameValue(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <h1 className="mb-2">Product Price</h1>
        <input
          type="text"
          placeholder="Enter product Price"
          value={priceValue}
          onChange={(e) => setpriceValue(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <h1 className="mb-2">Upload Images</h1>
        <input
          type="file"
          placeholder="Images"
          onChange={handleImageChange}
          name="Image"
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button onClick={handleUpload} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
    </div>
  );
};

export default AdminPanel;
