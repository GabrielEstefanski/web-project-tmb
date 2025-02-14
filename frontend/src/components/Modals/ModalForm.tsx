import { useState, useEffect } from "react";
import Modal from "./Modal";
import Order from "../../types/Order";
import CustomInput from "../Inputs/CustomInput";
import MoneyInput from "../Inputs/MoneyInput";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Partial<Order>) => void;
  orderToEdit?: Order | null;
}

const ModalForm = ({ isOpen, onClose, onSubmit, orderToEdit }: ModalFormProps) => {
  const [cliente, setCliente] = useState<string>("");
  const [produto, setProduto] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  useEffect(() => {
    if (orderToEdit) {
      setCliente(orderToEdit.cliente);
      setProduto(orderToEdit.produto);
      setValor(orderToEdit.valor);
    } else {
      setCliente("");
      setProduto("");
      setValor(0);
    }
  }, [orderToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Partial<Order> = orderToEdit
    ? {
        id: orderToEdit.id,
        cliente,
        produto,
        valor,
        status: orderToEdit.status,
        dataCriacao: orderToEdit.dataCriacao,
      }
    : {
        cliente,
        produto,
        valor
      };

    onSubmit(newOrder);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={orderToEdit ? "Editar Pedido" : "Criar Pedido"}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <CustomInput
            id="cliente"
            label="Cliente"
            value={cliente}
            required
            onChange={setCliente}
            icon={<i className="fa fa-user"/>}
            className="w-full!"
          />
          <CustomInput
            id="produto"
            label="Produto"
            value={produto}
            required
            onChange={setProduto}
            icon={<i className="fa fa-box"/>}
            className="w-full!"
          />
          <MoneyInput
            id="valor"
            label="Valor"
            value={valor}
            onChange={setValor}
            required
          />
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {orderToEdit ? "Salvar Alterações" : "Criar Pedido"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForm;
