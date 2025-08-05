import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchProduct = (currentPage, priceRange, selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const FetchProducts = async () => {
      setLoading(true);

      const url = `/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}`;

      try {
        const response = await apiClient.get(url);
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
  }, [currentPage, priceRange, selectedCategory]);

  return { products, loading, totalPages };
};

export default useFetchProduct;
