import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Product from "../pages/Products/product";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route index element={<Home />} />
      <Route path="/about" element={<About />} /> */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
