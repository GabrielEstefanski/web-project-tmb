import { useState } from "react";
import ToolBar from "./ToolBar";
import Pagination from "./Pagination";
import Order from "../../types/Order";
import OrderTableBody from "./OrderTableBody";

const OrderTable = ({
  orders,
  onDelete,
  onView,
  onSearch,
  onEdit,
  onOrderCreated,
}: {
  orders: Order[];
  onDelete: (id: string) => void;
  onView: (data: Order) => void;
  onSearch: (searchTerm: string) => void;
  onEdit: (data: Order) => void;
  onOrderCreated: () => void;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handleSearch = (term: string) => {
    onSearch(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  
  const startEntry = indexOfFirstItem + 1;
  const endEntry = Math.min(indexOfLastItem, orders.length);

  return (
    <div className="relative w-full max-h-[1000px] overflow-auto z-5">
      <ToolBar onSearch={handleSearch} onOrderCreated={onOrderCreated} />
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">Cliente</th>
            <th scope="col" className="px-6 py-3">Produto</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Data de Criação</th>
            <th scope="col" className="px-6 py-3">Ações</th>
          </tr>
        </thead>
        <OrderTableBody
          orders={currentOrders}
          onDelete={onDelete}
          onView={onView}
          onEdit={onEdit}
        />
      </table>
      <div className="flex sticky left-0  w-full justify-between p-4 text-sm items-center bg-white dark:bg-gray-800">
        <label className="text-gray-600 dark:text-gray-400">
          Mostrando {startEntry} até {endEntry} de {orders.length} produtos
        </label>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderTable;
