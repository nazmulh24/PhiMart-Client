import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Product = () => {
  const root = "https://phi-mart-dun.vercel.app";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${root}/api/v1/products`)
      .then((response) => {
        setProducts(response.data.results);
        // console.log("Product data fetched:", response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
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

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={true}
        className="mt-4 px-4 container mx-auto"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="swiper-slide">
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Product;
