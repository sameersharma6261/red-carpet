import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrandDashboard = () => {
  const [shops, setFoods] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const shopId = localStorage.getItem("shopId");
  console.log("User's Shop ID:", shopId);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("shopId");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/shops`)
      .then((res) => setFoods(res.data));
  }, []);

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (role && role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);

  const filteredShops = shops.filter((shop) => {
    return shop.title?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        // background: "linear-gradient(to right,rgb(0, 0, 0),rgb(148, 148, 148))",
        // backgroundImage: "url('/images/f.jpg')", // 🖼️ Background image
        // backgroundSize: "cover",
        // backgroundPosition: "center",

        fontFamily: "Arial, sans-serif",
        zIndex: "1",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "20px", fontSize: "28px" }}>
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
          color: "gray",
          border: "1px solid #ccc",
          marginBottom: "20px",
          background: "transparent",
          // background: "linear-gradient(to right,rgba(79, 172, 254, 0.7),rgba(0, 241, 254, 0.6))",
          // boxShadow:"0px 1px 4px black",
          fontSize: "16px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          gap: "20px",
          zIndex: "2",
          textAlign: "center",
          position: "relative",
          // background: "red"
        }}
      >
        {filteredShops.map((shop) => (
          <div
            key={shop._id}
            style={{
              borderRadius: "15px",
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              color: "#333",
              zIndex: "2",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={shop.image}
              alt={shop?.title}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                transition: "opacity 0.3s ease",
              }}
            />
            <h3 style={{ margin: "15px 0", fontSize: "20px" }}>
              {shop?.title}
            </h3>
            <p style={{ fontSize: "14px", opacity: "0.7" }}>
              {shop.description}
            </p>
            <button
              style={{
                padding: "12px",
                background: "linear-gradient(to right, #4facfe, #00f2fe)",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "15px",
                width: "100%",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "background 0.3s ease",
              }}
              onClick={() => navigate(`/branddashboard2/${shop._id}`)}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #4facfe, #00f2fe)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "background: linear-gradient(to right, #00f2fe, #4facfe)")
              }
            >
              View More
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/ownerdashboard")}
        style={{
          padding: "12px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          position: "fixed",
          left: "15px",
          bottom: "15px",
          color: "white",
          fontSize: "15px",
          background: "linear-gradient(to right, #4facfe, #00f2fe)",
          fontWeight: "bold",
          zIndex: "3",
        }}
      >
        SETTING
      </button>
      <button
        onClick={handleLogout}
        style={{
          padding: "12px",
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          position: "fixed",
          right: "15px",
          bottom: "15px",
          zIndex: "2",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default BrandDashboard;
