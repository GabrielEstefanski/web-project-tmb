import { useState } from "react";
import CustomInput from "../Inputs/CustomInput";

interface ToolBarProps {
  onOrderCreated: () => void;
  onSearch: (searchTerm: string) => void;
}

const ToolBar = ({ onSearch, onOrderCreated }: ToolBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="sticky left-0 w-full top-0 bg-white z-10 pb-4 pt-4 dark:bg-gray-800">
      <div className="flex justify-between items-center px-4">
        <div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <CustomInput
              id="table-search"
              value={searchTerm}
              icon={<i className="fa fa-search text-gray-500 dark:text-gray-400" aria-hidden="true"/>}
              onChange={handleSearch}
              placeholder="Filtrar produtos"
              className="lg:w-80 sm:min-w-20"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={onOrderCreated}
          >
            <i className="fa fa-plus" />
            <span className="hidden sm:inline ml-2">Adicionar Produto</span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default ToolBar;