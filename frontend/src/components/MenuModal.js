import React, { useState } from "react";
import axios from "axios";

const MenuModal = ({ shop, onClose }) => {
  const [menuItem, setMenuItem] = useState({ 
    name: "", 
    image: "", 
    description: "" ,
    link: ""  //  New field added for storing the link
  });

  const handleChange = (e) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shop?._id) {
      alert("Shop ID is missing!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/shops/${shop._id}/menu`, menuItem);
      alert("Menu item added successfully!");
      console.log("Success:", response.data);
      onClose();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to add menu item. Please try again.");
    }
  };

  return (
    <div>
      {/* <h1>Add Menu for {shop?.title || "this shop item"}</h1> */}
      <form onSubmit={handleSubmit}>
      <button style={{ padding: "10px 20px", background: "#ff6347", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }} onClick={onClose}>Close</button>
        <input type="text" name="name" placeholder="Item Name" value={menuItem.name} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }}/>
        <input type="text" name="image" placeholder="Image URL" value={menuItem.image} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <input type="text" name="description" placeholder="Description" value={menuItem.description} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <input type="text" name="link" placeholder="Enter Link" value={menuItem.link} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <button type="submit" style={{ padding: "10px 20px",marginBottom: "25px", background: "rgba(47,140,227)", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>Add Menu</button>
      </form>
    </div>
  );
};

export default MenuModal;