import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = async () => {
    apiClient
      .get("/products")
      .then((res) => {
        setProducts(res.data.results);
        setTotalPages(Math.ceil(res.data.count / res.data.results.length));
        // console.log(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <ProductList products={products} loading={loading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
