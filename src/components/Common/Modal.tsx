interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
  }
  
  const Modal = ({ children, onClose }: ModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded p-6 w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  