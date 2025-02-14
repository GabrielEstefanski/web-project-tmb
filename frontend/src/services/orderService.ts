import axios from "axios";
import Order from "../types/Order";

const API_URL = "http://localhost:3000/api/order/";

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos: ', error);
    throw error;
  }
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}${orderId}`);
  } catch (error) {
    console.error('Erro ao deleter o pedido: ', error);
    throw error;
  }
};

export const postOrder = async (data: Partial<Order>): Promise<Order> => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data
  } catch (error) {
    console.error('Erro ao criar pedido: ', error);
    throw error;
  }
};

export const putOrder = async (data: Partial<Order>): Promise<Order> => {
  try {
    const response = await axios.put(`${API_URL}${data.id}`, data);
    return response.data
  } catch (error) {
    console.error('Erro ao editar o pedido: ', error);
    throw error;
  }
};
