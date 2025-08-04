import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import apiClient from "../../services/api-client";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto py-16 bg-gray-50">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Trending Products
        </h2>
        <a href="#" className="btn btn-secondary px-6 rounded-full text-lg">
          See All
        </a>
      </div>

      {isloading && (
        <div className="flex items-center justify-center pt-8">
          <span className="loading loading-dots loading-xl text-secondary"></span>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center pt-8 px-3 max-w-full sm:max-w-1/2 mx-auto  flex items-center justify-center">
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error fetching products: {error}</span>
          </div>
        </div>
      )}

      {!isloading && !error && products.length > 0 && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={true}
          className="mt-4 px-4 md:px-8 container mx-auto"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="swiper-slide">
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {products.length === 0 && !isloading && !error && (
        <div className="text-center py-8 px-4 md:px-8">
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default Product;
