import ProductItem from "../Products/ProductItem";

const ProductList = ({ products, loading }) => {
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen pt-8">
        <span className="loading loading-dots loading-xl text-secondary"></span>
      </div>
    );

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 py-6">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
