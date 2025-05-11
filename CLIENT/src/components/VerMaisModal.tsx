import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // Ou use um <button> padrão

interface VerMaisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInscrever: () => void;
  titulo: string;
  descricao: string;
}

const VerMaisModal = ({
  isOpen,
  onClose,
  onInscrever,
  titulo,
  descricao,
}: VerMaisModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>

          <Dialog.Title className="text-xl font-bold mb-2">{titulo}</Dialog.Title>
          <Dialog.Description className="text-gray-700 mb-6">
            {descricao}
          </Dialog.Description>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={onInscrever}>
              Inscrever-se
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VerMaisModal;
