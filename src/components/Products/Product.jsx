import axios from "axios";
import { useEffect } from "react";

const Product = () => {
  const root = "https://phi-mart-dun.vercel.app";

  useEffect(() => {
    axios
      .get(`${root}/api/v1/products`)
      .then((response) => {
        console.log("Product data fetched:", response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return <div></div>;
};

export default Product;
