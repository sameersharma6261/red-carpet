import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrandDashboard = () => {
  const [shops, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/shops`)
      .then((res) => setFoods(res.data));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
        padding: "20px 0px",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        zIndex: "1",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px", fontSize: "28px" }}>
        SELECT YOUR MALL
      </h1>
      <div
        style={{
          display: "grid",
          width: "90%",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "2",
        }}
      >
        {shops.map((shop) => (
          <div
            key={shop._id}
            style={{
              borderRadius: "15px",
              padding: "25px",
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
              alt={shop.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                transition: "opacity 0.3s ease",
              }}
            />
            <h3 style={{ margin: "15px 0", fontSize: "20px" }}>{shop.title}</h3>
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
              onClick={() => navigate(`/${shop.title}/branddashboard2/${shop._id}`)}
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
    </div>
  );
};

export default BrandDashboard;
