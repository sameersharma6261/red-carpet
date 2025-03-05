import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();
    const [search, setSearch] = useState("");
  const [shops, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editFood, setEditFood] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/shops`)
      .then((res) => setFoods(res.data));
  }, []);

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFood) {
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/shops/${editFood._id}`,
          newFood
        )
        .then((res) => {
          setFoods(
            shops.map((shop) => (shop._id === editFood._id ? res.data : shop))
          );
          setNewFood({ title: "", description: "", image: "" });
          setEditFood(null);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/shops`, newFood)
        .then((res) => {
          setFoods([...shops, res.data]);
          setNewFood({ title: "", description: "", image: "" });
        });
    }
  };

  const handleEdit = (shop) => {
    setNewFood(shop);
    setEditFood(shop);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/shops/${id}`)
      .then(() => {
        setFoods(shops.filter((shop) => shop._id !== id));
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredShops = shops.filter((shop) =>
    shop.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
       <h1 style={{ color: "#333", marginBottom: "20px", fontSize: "28px" }}>
        SELECT YOUR MALL
      </h1>
      <input
        type="text"
        placeholder="Search Mall..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "60%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      <form onSubmit={handleSubmit} className="shop-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newFood.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newFood.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newFood.image}
          onChange={handleChange}
          required
        />
        <button type="submit">{editFood ? "Update mall" : "Add mall"}</button>
      </form>

      <div className="shop-container">
      {filteredShops.map((shop) => (
          <div key={shop._id} className="shop-card">
            <img src={shop.image} alt={shop.title} className="shop-image" />
            <h3>{shop.title}</h3>
            <p>{shop.description}</p>
            <div className="button-group">
              <button onClick={() => navigate(`/shop/${shop._id}`)}>
                Shop's
              </button>
              <button onClick={() => handleEdit(shop)}>Edit Mall</button>
              <button onClick={() => handleDelete(shop._id)}>
                Delete Mall
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          position: absolute;
          left: 0;
          background: linear-gradient(to right, #e0f7fa, #ffffff);
          min-height: 100vh;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          z-index: 1;
        }
        .logout-btn {
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }

        h3{
        margin: 10px;
        }

        h1{
        margin-top: 20px;
        }

        p{
        margin: 10px;
        }




        .shop-form {
          display: flex;
          width: 100%;
          justify-content: center;
          gap: 10px;
          margin-top: 0;
           margin-bottom: 20px;
        }
        .shop-form input, .shop-form button {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          text-align: center;

        }
          .shop-form button{
          color: #fff;
          cursor: pointer;
          background: linear-gradient(to right,rgba(79, 172, 254, 0.64),rgba(0, 241, 254, 0.69));}

        .shop-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          width: 100%;
        }
        .shop-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 100%;
          max-width: 500px;
          text-align: center;
          transition: transform 0.3s;
        }
        .shop-card:hover {
          transform: scale(1.05);
        }
        .shop-image {
          width: 100%;
          max-width: 500px;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
        }
        .button-group button {
          background: linear-gradient(to right, #4facfe, #00f2fe);
          color: white;
          border: none;
          padding: 10px 25px;
          margin: 5px;
          font-weight: 600;
          border-radius: 5px;
          font-size: 13px;
          cursor: pointer;
          transition: 0.3s;
        }
        .button-group button:hover {
          background: linear-gradient(to right, #00f2fe, #4facfe);
        }
          @media (max-width: 677px) {
           .shop-form input, .shop-form button {
           padding: 10px;
           margin-left: 5px;
           margin-right: 5px;
           width: 100%;
           gap: 15px;
        }


background: linear-gradient(to right, #00f2fe, #4facfe);
        }
      `}</style>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default OwnerDashboard;
