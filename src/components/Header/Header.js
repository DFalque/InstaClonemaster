import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../../img/instaclone.png";
//COMPONENTS
import RightHeader from "./RightHeader/RightHeader";
import Search from "./Search/Search";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black" }}
          className="logo__Link"
        >
          <img src={logo} className="logo__image" alt="Logo" />
        </Link>
      </div>
      <div className="buscador">
        <Search />
      </div>
      <div className="iconos">
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
