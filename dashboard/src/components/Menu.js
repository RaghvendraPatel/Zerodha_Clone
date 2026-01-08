import React ,{useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data from:", API_BASE_URL);
        // Fetch user data from backend using token in cookie
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/`,
          {},
          { withCredentials: true }  // CRITICAL: Send token cookie with request
        );
        
        console.log("User data response:", data);
        
        if (data.status && data.user) {
          console.log("User set to:", data.user);
          setUser(data.user);
        } else {
          console.warn("User verification failed:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("Error details:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      // Clear token on backend (optional, for added security)
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      ).catch(() => {
        // If logout endpoint doesn't exist, that's ok
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Redirect to frontend login
      window.location.href = "http://localhost:3000/login";
    }
  };

  const getInitials = (username) => {
    if (!username) return "U";
    return username.substring(0, 2).toUpperCase();
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} style={{ position: "relative", cursor: "pointer" }}>
          <div className="avatar">{getInitials(user?.username)}</div>
          <p className="username">{user?.username ? user.username : "USER"}</p>
          
          {isProfileDropdownOpen && (
            <div style={{
              position: "fixed",
              right: "20px",
              top: "60px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              minWidth: "200px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 10000
            }}>
              <div style={{
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
                fontSize: "13px",
                color: "#666",
                fontWeight: "500"
              }}>
                {user?.email || "user@example.com"}
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: "#dc3545",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                  backgroundColor: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#fff3f3";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Menu;