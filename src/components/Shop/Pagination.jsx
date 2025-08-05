const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center items-center my-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`btn btn-sm sm:btn-md mx-1 ${
            currentPage === i + 1 ? "btn-secondary" : ""
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {totalPages > 0 && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
