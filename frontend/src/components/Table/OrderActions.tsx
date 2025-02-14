import { OrderActionsProps } from "../../types/ActionsProps";
import Tooltip from "../Tooltip";

const OrderActions = ({ orderId, onDelete, onView, onEdit }: OrderActionsProps) => (
  <div className="flex gap-2">
    <div className="relative group">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 transition"
        onClick={() => onEdit(orderId)}
      >
        <i className="fa fa-edit"/>
      </button>
      <Tooltip label='Editar'/>
    </div>

    <div className="relative group">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
        onClick={() => onDelete(orderId)}
      >
        <i className="fa fa-trash"/>
      </button>
      <Tooltip label='Excluir'/>
    </div>

    <div className="relative group">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-500 transition"
        onClick={() => onView(orderId)}
      >
        <i className="fa fa-eye"/>
      </button>
      <Tooltip label='Ver detalhes'/>
    </div>
  </div>
);

export default OrderActions;
