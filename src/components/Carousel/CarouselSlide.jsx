import bg_image from "../../assets/images/banner-image-bg.jpg";

const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <section
      className="w-full h-[650px] bg-cover bg-center flex justify-center items-center px-8"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="max-w-6xl flex justify-between items-center px-8">
        {/* left */}
        <div className="w-1/2 space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
          <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md">
            Shop product
          </button>
        </div>
        {/* right */}
        <div className="w-1/2 flex justify-center">
          <img
            className="max-w-md drop-shadow-lg"
            src={image}
            alt="Image of a book"
          />
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;
