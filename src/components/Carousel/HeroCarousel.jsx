import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";

import book from "../../assets/images/book.png";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Exclusive Fashion Collections",
      subtitle: "Discover the latest trends",
      image: book,
    },
    {
      title: "Latest Tech Gadgets",
      subtitle: "Stay ahead with cutting-edge technology",
      image: book,
    },
    {
      title: "Home Decor Essentials",
      subtitle: "Transform your space with style",
      image: book,
    },
  ];

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroCarousel;
