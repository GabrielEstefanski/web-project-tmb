import Order from "../../types/Order";
import { OrderStatus } from "../../types/OrderStatus";
import formatDate from "../../utils/formatDate";
import OrderActions from "./OrderActions";

const OrderTableBody = ({
  orders,
  onDelete,
  onView,
  onEdit,
}: {
  orders: Order[];
  onDelete: (id: string) => void;
  onView: (data: Order) => void;
  onEdit: (data: Order) => void;
}) => {
  return (
    <tbody>
      {orders.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-gray-700 dark:text-gray-400 bg-gray-200 dark:bg-gray-700">
            Sem registro de pedidos
          </td>
        </tr>
      ) : (
        orders.map((order) => (
          <tr
            key={order.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="px-6 py-4">{order.cliente}</td>
            <td className="px-6 py-4">{order.produto}</td>
            <td className="px-6 py-4">{OrderStatus[order.status]}</td>
            <td className="px-6 py-4">{formatDate(order.dataCriacao)}</td>
            <td className="px-6 py-4 flex gap-3">
              <OrderActions orderId={order.id} onDelete={onDelete} onView={() => onView(order)} onEdit={() => onEdit(order)} />
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default OrderTableBody;
