import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-xl shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>
        </div>
        <div className="p-6">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
