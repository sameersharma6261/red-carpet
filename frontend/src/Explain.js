import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import "./Explain.css";



function Explain() {
    const [showQR, setShowQR] = useState(false);
  const { id } = useParams();
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("buyButton").click();
    }
  };  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  
  useGSAP(() => {
    gsap.from(".text-content h2", {
      x: 200,
      duration: 2,
      opacity: 0,
      ease: "lastic.out",
    });

    gsap.from(".text-content p", {
      x: -200,
      duration: 2,
      opacity: 0,
      ease: "lastic.out",
    });

    gsap.from(".text-content button", {
      y: 100,
      delay: 1,
      duration: 2,
      opacity: 0,
      ease: "lastic.out",
    });
  }, []);
  return (
    <>
    <div>
      <div className="explaination">
        <div className="text-content">
          <h2>Welcome to RED CARPET Special Entry</h2>
          <p>
          We are thrilled to have you here today. This blue cart is a symbol of exclusivity and convenience,
        specially designed for our valued Rick and Loyal members. Your comfort and satisfaction are our top priority,
        and we hope this special entry makes your shopping experience even more delightful. Thank you for choosing us.
          </p>
          <Link to={`/${id}/information`}>
            <button id="buyButtonn" onClick={() => (" ")}>
              Buy Cart
            </button>
          </Link>
        </div>
      </div>
    </div>








     {/* this is only for qr temperary ....down css also*/}
     <div className="qr-container">
      <button className="qr-button" onClick={() => setShowQR(true)}>
       QR
      </button>

      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <button className="close-btn" onClick={() => setShowQR(false)}>
              ×
            </button>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=HelloReact"
              alt="QR Code"
              className="qr-image"
            />
          </div>
        </div>
      )}
    </div>
    <style>{`
        .qr-container {
      display: flex;
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 10;
      justify-content: center;
      align-items: center;
      // height: 100vh;
      background: #f9f9f9;
      font-family: sans-serif;
    }


    .qr-button {
    height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 24px;
      font-size: 20px;
      background-color:rgb(82, 151, 226);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .qr-button:hover {
      background-color:rgb(32, 107, 187);
    }

    .qr-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .qr-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }

    .qr-image {
      width: 100%;
      max-width: 400px;
      height: auto;
      border-radius: 10px;
      border: 4px solid white;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }

    .close-btn {
      position: absolute;
      top: -15px;
      right: -15px;
      background-color: red;
      color: white;
      border: none;
      font-size: 20px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
    }

    .close-btn:hover {
      background-color: darkred;
    }
    `}</style>
    </>
  );
}

export default Explain;
