const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <nav>
      <ul className="flex space-x-2">
        <li>
          <button
            className="px-3 py-2 border-2 border-gray-400 rounded-md text-gray-800
                    black:text-gray-500 dark:text-gray-400 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
        </li>
        {Array.from(
          { length: Math.min(3, totalPages) },
          (_, i) => Math.max(1, Math.min(currentPage - 1, totalPages - 2)) + i
        ).map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-2 border-2 border-gray-400 rounded-md text-gray-500 dark:text-gray-400 ${
                currentPage === page ? "bg-gray-200 dark:bg-gray-600" : "bg-white dark:bg-gray-800"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-2 border-2 border-gray-400 rounded-md text-gray-800 black:text-gray-5
                  dark:text-gray-400 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
