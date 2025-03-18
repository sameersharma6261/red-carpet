import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BrandDashboard2 = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/shops/${id}`)
      .then((res) => setShop(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("shopId");
    navigate("/");
  };

  if (!shop)
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>
    );

  // Filter menu items based on search query
  const filteredMenuItems = shop.menuItems?.filter((menuItem) =>
    menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{display: "flex",width: "100%", height: "100vh",gap: "20px",position: "absolute", left: "0", zIndex: "1",
      }}
    >
      {/* Left Section */}
      <div
        style={{flex: "3",backdropFilter: "blur(10px)",  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",borderRadius: "10px",
        }}
      >
        <h1
          style={{textAlign: "center",color: " white",fontSize: "32px",marginBottom: "20px", marginTop: "20px",
          }}
        >
          {shop?.title}
        </h1>
        <div
          style={{display: "flex",justifyContent: "center",marginBottom: "10px",
          }}
        >
          <img src={shop.image} alt={shop?.title}
            style={{ width: "100%",maxWidth: "500px",borderRadius: "10px",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
        <p
          style={{textAlign: "center",fontSize: "18px",color: "gray",lineHeight: "1.6",
          }}
        >
          {shop.description}
        </p>

        {/* Menu Items */}
        <h2
          style={{textAlign: "center",color: "white",fontSize: "28px",display: "flex",
            justifyContent: "center",alignItems: "center",flexDirection: "column",marginBottom: "10px",
          }}
        >
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search Shop's..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{width: "60%",padding: "10px",fontSize: "18px",borderRadius: "5px", marginTop: "25px",
              border: "1px solid #ddd",
            }}
          />
          SHOP'S
        </h2>
        {shop.menuItems && shop.menuItems.length > 0 ? (
          <div
            style={{ display: "flex",gap: "20px",width: "100vw", overflowX: "auto",alignItems: "center", position: "absolute", bottom: "100px",
            }}
          >
            {filteredMenuItems.map((menuItem, index) => (
              <div
                key={index}
                style={{backdropFilter: "blur(10px)",background: "white",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "20px", borderRadius: "8px", textAlign: "center", position: "relative", display: "flex",flexDirection: "column",
                }}
              >
                <h3
                  style={{ color: "black", fontSize: "20px", marginBottom: "10px",
                  }}
                >
                  {menuItem.name}
                </h3>
                <p
                  style={{color: "black",fontSize: "16px",marginBottom: "10px",lineHeight: "1.5",
                  }}
                >
                  {menuItem.description}
                </p>
                
                {menuItem.image && (
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    style={{ width: "350px",height: "200px" ,borderRadius: "5px",marginTop: "10px",
                    }}
                  />
                  
                )}
                {menuItem.link && (
                  <div style={{ marginTop: "10px" }}>
                    <a
                      // href={`/${shop.title}/${menuItem._id}`}
                      href={`/?callbackUrl=${menuItem._id}`}
                      onClick={
                        () => {
                          localStorage.removeItem("token")
                        }
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        fontSize: "16px",
                        color: "#fff",
                        backgroundColor: "#007bff",
                        textDecoration: "none",
                        borderRadius: "5px",
                        boxShadow: "0px 5px 10px rgba(0, 123, 255, 0.3)",
                        transition: "0.3s",
                      }}
                    >
                      Visit Site
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{textAlign: "center",color: "white",marginTop: "10px",fontSize: "18px",
            }}
          >
            No menu items added yet.
          </p>
        )}
      </div>
      <button onClick={handleLogout} style={{ padding: "12px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    position: "fixed",
    left: "15px",
    top: "10px",
    zIndex: "2",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",}}>Logout</button>
    </div>
  );
};

export default BrandDashboard2;
