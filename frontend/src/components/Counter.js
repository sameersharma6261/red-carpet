import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Counter.css";
import { useParams } from "react-router-dom"; 

const Counter = () => {
  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_API_BASE_URL}/api/get-data`
         `${process.env.REACT_APP_API_BASE_URL}/api/get-data/${id}`
      );
      let fetchedData = response.data;

      // Retrieve clicked state from localStorage
      const savedClickedState =
        JSON.parse(localStorage.getItem("clickedState")) || {};

      fetchedData = fetchedData.map((item) => ({
        ...item,
        clicked: savedClickedState[item._id] || false,
      }));

      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [fetchData, isAuthenticated]);

  const saveClickedState = (updatedData) => {
    const clickedState = updatedData.reduce((acc, item) => {
      acc[item._id] = item.clicked;
      return acc;
    }, {});

    localStorage.setItem("clickedState", JSON.stringify(clickedState));
  };

  // Start Countdown
  const startCountdown = async (phoneNumber) => {
    const duration = 180; // 180 seconds countdown
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/start-countdown`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration, phoneNumber }),
    });
  };

  // Handle button click
  const handleClick = async (index) => {
    const newData = JSON.parse(JSON.stringify([...data]));
    newData[index].clicked = true;
    setData(newData);
    saveClickedState(newData);

    const userMobile = newData[index].mobile;

    if (!data[index].clicked) {
      await handleSendMessage(userMobile);
      await startCountdown(userMobile);
    }
  };

  // Handle sending the message
  const handleSendMessage = async (number) => {
    if (!number) {
      alert("Please enter a number!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/send-message`,
        { number }
      );

      if (response.data.success) {
        alert("Message Sent Successfully.");
        navigate("/countdown");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Check the console for details.");
    }
  };

  // Authentication Function
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      name.trim() === "itsoftlab" &&
      email.trim().toLowerCase() === "itsoftlab@gmail.com"
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Save auth state
    } else {
      alert("Invalid Credentials. Try again!");
    }
  };

  // Logout Function
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove auth state
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "35px",
          width: "100%",
          height: "60vh",
          backgroundColor: "transparent",
          flexDirection: "column",
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
      >
        <h2
          className="loginbutton"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#585858",
          }}
        >
          Enter Your Login Details
        </h2>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            width: "350px",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // counter Page
  const tableHeaderStyle = {
    padding: "12px",
    position: "sticky",
    zIndex: "10",
    // backgroundColor: "red",
    top: "0",
    fontSize: "22px",
    fontWeight: "bold",
    whiteSpace: "nowrap", // Prevent text from wrapping
  };

  const tableCellStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    whiteSpace: "nowrap",
    fontSize: "19px",
  };

  return (
    <div
      style={{
        paddingTop: "5px",
        paddingBottom: "5px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "5",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          float: "right",
          padding: "10px 18px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "0.3s",
          position: "fixed",
          bottom: "2%",
          left: "2%",
          zIndex: "2",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
      >
        Logout
      </button>

      {loading ? (
        <h3
          style={{
            textAlign: "center",
            fontSize: "22px",
            marginTop: "50px",
            color: "#333",
          }}
        >
          Loading...
        </h3>
      ) : data.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0",
            width: "100%",
          }}
        >
          {/* ✅ Scrollable container for mobile view */}
          {/* ✅ Scrollable container for mobile & desktop */}
          <div
            style={{
              width: "100%",
              maxHeight: "98vh", // Set max height for vertical scrolling
              overflowY: "auto", // Enable vertical scroll
              overflowX: "auto", // Keep horizontal scroll for mobile
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "600px",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#007bff",
                    position: "sticky",
                    zIndex: "10",
                    top: "0",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <th style={tableHeaderStyle}>S. No.</th>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Mobile Number</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Token</th>
                  <th style={tableHeaderStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    }}
                  >
                    <td style={tableCellStyle}>{index + 1}</td>
                    <td style={tableCellStyle}>{item.name}</td>
                    <td style={tableCellStyle}>{item.mobile}</td>
                    <td style={tableCellStyle}>{item.email}</td>
                    <td style={tableCellStyle}>{item.token}</td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => handleClick(index)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: item.clicked ? "#dc3545" : "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = item.clicked
                            ? "#a71d2a"
                            : "#1e7e34")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = item.clicked
                            ? "#dc3545"
                            : "#28a745")
                        }
                      >
                        {item.clicked ? "Clicked" : "OK"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3
          style={{
            textAlign: "center",
            fontSize: "22px",
            marginTop: "50px",
            color: "#333",
          }}
        >
          No data found
        </h3>
      )}
    </div>
  );
};

export default Counter;
