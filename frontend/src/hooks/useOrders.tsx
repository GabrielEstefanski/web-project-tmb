import { useState, useEffect } from 'react';
import { getOrders, deleteOrder, postOrder, putOrder } from '../services/orderService';
import Order from '../types/Order';
import formatDate from '../utils/formatDate';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch {
        console.error('Erro ao carregar os pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      setFilteredOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch {
      console.error('Erro ao excluir o pedido.');
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) =>
      order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(order.dataCriacao).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleAddOrder = async (newOrder: Partial<Order>) => {
    try {
      const createdOrder = await postOrder(newOrder);
      setOrders((prevOrders) => [...prevOrders, createdOrder]); 
      setFilteredOrders((prevOrders) => [...prevOrders, createdOrder]); 
    } catch {
      console.error('Erro ao criar o pedido.');
    }
  };

  const handleEditOrder = async (order: Partial<Order>) => {
    try {
      const updatedOrder = await putOrder(order);
      setOrders((prevOrders) =>
        prevOrders.map((existingOrder) =>
          existingOrder.id === updatedOrder.id ? updatedOrder : existingOrder
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((existingOrder) =>
          existingOrder.id === updatedOrder.id ? updatedOrder : existingOrder
        )
      );
    } catch {
      console.error('Erro ao editar o pedido.');
    }
  };

  return {
    orders,
    filteredOrders,
    loading,
    handleDelete,
    handleSearch,
    handleAddOrder,
    handleEditOrder
  };
};
