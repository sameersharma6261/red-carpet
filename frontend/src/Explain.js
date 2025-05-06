import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import "./Explain.css";


function Explain() {
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
    <div>
      <div className="explaination">
        <div className="text-content">
          <h2>Welcome to PHOENIX Mall Special Entry</h2>
          <p>
            Welcome to Phoenix Mall! We are thrilled to have you here today.
            This blue cart is a symbol of exclusivity and convenience, specially
            designed for our valued Rick and Loyal members. Your comfort and
            satisfaction are our top priority, and we hope this special entry
            makes your shopping experience even more delightful. Thank you for
            choosing PHOENIX Mall
          </p>
          <Link to={`/${id}/information`}>
            <button id="buyButtonn" onClick={() => (" ")}>
              Buy Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Explain;
