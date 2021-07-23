import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import logo from "../../assets/logo.svg";
import search from "../../assets/search-icon.svg";
import wheel from "../../assets/wheel-icon.svg";
import close from "../../assets/close.svg";
import userlogo from "../../assets/user.svg";

import "./Navbar.css";

export default function Navbar({ user, setUser, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);
  const [userIsClicked, setUserIsClicked] = useState(false);

  const handleOnSearchClick = () => {
    isSearch ? setIsSearch(false) : setIsSearch(true);
  };

  const handleOnUserClick = () => {
    userIsClicked ? setUserIsClicked(false) : setUserIsClicked(true);
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setUser({});
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <div className="Navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Reciplan app logo"></img>
      </Link>
      <div className="navbar-right">
        {!isSearch ? (
          <div className="search-btn" onClick={handleOnSearchClick}>
            <img src={search} alt="Search icon"></img>
          </div>
        ) : (
          <>
            <div className="search-btn">
              <img src={search} alt="Search icon"></img>
            </div>
            <form onSubmit={handleOnSubmit}>
              <input
                className="search-input"
                type="text"
                placeholder="search recipes..."
                onChange={handleInputChange}
              ></input>
            </form>
            <div className="search-btn" onClick={handleOnSearchClick}>
              <img src={close} alt="Close button"></img>
            </div>
          </>
        )}
        <Link
          to="/wheel"
          className={`wheel-link ${user?.email ? "margin-right" : ""}`}
        >
          <img src={wheel} alt="Wheel icon"></img>
        </Link>

        {user?.email ? (
          <div className="user-btn">
            <img
              onClick={handleOnUserClick}
              src={userlogo}
              alt="User button"
            ></img>
            {userIsClicked ? (
              <div className="user-drop">
                <Link onClick={handleOnUserClick} to="/profile">
                  profile
                </Link>
                <Link onClick={handleOnUserClick} to="/saved">
                  saved
                </Link>
                <Link onClick={handleLogout} to="/">
                  logout
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
