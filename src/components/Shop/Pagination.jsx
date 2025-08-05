const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex flex-col items-center my-5 space-y-4">
      <div className="flex flex-wrap justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm sm:btn-md rounded-full transition-colors duration-200 ${
              currentPage === i + 1 ? "btn-secondary" : "btn-outline"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {totalPages > 0 && (
        <div className="text-sm text-gray-500 font-medium">
          Page{" "}
          <span className="font-semibold text-gray-800">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-800">{totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
