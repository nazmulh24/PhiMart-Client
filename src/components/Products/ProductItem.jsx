import defaultImage from "../../assets/default_product.jpg";

const ProductItem = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={
              product.images.length > 0
                ? product.images[0]?.image
                : defaultImage
            }
            alt={product.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>
            {product.description.length > 100
              ? `${product.description.slice(0, 100)}...`
              : product.description}
          </p>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-lg font-semibold text-red-700">
              ${product.price}
            </span>
            <button className="btn btn-secondary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
