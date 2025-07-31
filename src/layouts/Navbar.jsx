import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div>
      {/* <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link> */}

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-blue-500" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "text-blue-500" : "")}
      >
        Products
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "text-blue-500" : "")}
      >
        About
      </NavLink>
    </div>
  );
};

export default Navbar;
