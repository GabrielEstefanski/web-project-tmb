const LoadingSkeleton = () => {
  return (
    <div className="relative w-full max-h-[1000px] overflow-auto z-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4 pt-4">
          <div className="relative mt-1 flex justify-between items-center px-4">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="fa fa-search text-gray-500 dark:text-gray-400" aria-hidden="true"/>
              </div>
              <div className="block py-2 w-full lg:w-80 sm:min-w-20 pl-10 pr-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse h-[38px]"></div>
            </div>
            <div className="hidden sm:flex">
              <div className="px-4 py-2 w-40 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse h-[38px]"></div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-300">
            <tr>
              {Array(4).fill(null).map((_, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(null).map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                {Array(4).fill(null).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
