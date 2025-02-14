import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 w-full md:inset-0 max-h-full" >
      <div className="relative p-4 w-full max-w-2xl flex justify-center max-h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <i className="fa fa-times text-lg" />
        </button>

        {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>}

        <div className="mt-4">{children}</div>

        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
      </div>
    </div>
  );
};

export default Modal;
