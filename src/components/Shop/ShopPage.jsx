import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ProductList from "./ProductList";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((res) => {
        setProducts(res.data.results);
        // console.log(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ProductList products={products} loading={loading} />
    </div>
  );
};

export default ShopPage;
