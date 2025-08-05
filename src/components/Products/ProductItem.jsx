import defaultImage from "../../assets/default_product.jpg";

const ProductItem = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <figure className="flex-shrink-0">
          <img
            src={
              product.images.length > 0
                ? product.images[0]?.image
                : defaultImage
            }
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </figure>
        <div className="card-body p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
          <h2 className="card-title text-sm sm:text-base md:text-lg line-clamp-2">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm md:text-base line-clamp-3 mb-4">
            {product.description.length > 50
              ? `${product.description.slice(0, 50)}...`
              : product.description}
          </p>

          <div className="card-actions justify-between items-center mt-auto flex-shrink-0">
            <span className="text-base sm:text-lg md:text-xl font-semibold text-red-700">
              ${product.price}
            </span>
            <button className="btn btn-secondary btn-sm sm:btn-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
