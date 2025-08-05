import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const FetchProducts = async () => {
      setLoading(true);

      try {
        const response = await apiClient.get(`/products/?page=${currentPage}`);
        const data = await response.data;

        // console.log(data.results);
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    FetchProducts();
  }, [currentPage]);

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
