import { useState } from 'react';
import OrderTable from '../components/Table/OrderTable';
import Order from '../types/Order';
import LoadingSkeleton from '../components/Table/LoadingSkeleton';
import ModalForm from '../components/Modals/ModalForm';
import { useOrders } from '../hooks/useOrders';
import ModalView from '../components/Modals/ModalView';
import ConfirmDeleteModal from '../components/Modals/ConfirmDeleteModal';

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const {
    filteredOrders,
    loading,
    handleDelete,
    handleSearch,
    handleAddOrder,
    handleEditOrder
  } = useOrders();

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      handleDelete(orderToDelete);
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOrderToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalViewOpen(true);
  };

  const handleOpenAddEditModal = (order: Order | null) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAddEditOrder = (newOrder: Partial<Order>) => {
    if (selectedOrder === null) {
      handleAddOrder(newOrder); 
    } else {
      handleEditOrder(newOrder)
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-gray-700 dark:text-gray-300 text-xl sm:text-3xl lg:text-4xl">
          Gerenciamento de Produtos
        </h1>
        <div className="relative shadow-md rounded-lg mt-4 lg:mt-8 overflow-hidden">
          {loading ? (
              <LoadingSkeleton />
            ) : (
              <OrderTable
                orders={filteredOrders}
                onDelete={handleOpenDeleteModal}
                onView={handleOpenViewModal}
                onEdit={handleOpenAddEditModal}
                onSearch={handleSearch}
                onOrderCreated={() => handleOpenAddEditModal(null)}
              />
            )}
            <ModalForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddEditOrder}
              orderToEdit={selectedOrder}
            />
            <ModalView
              isOpen={isModalViewOpen}
              orderToView={selectedOrder}
              onClose={() => setIsModalViewOpen(false)}
            />
            <ConfirmDeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
            />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
