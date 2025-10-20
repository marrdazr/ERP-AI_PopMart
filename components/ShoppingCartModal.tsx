import React from 'react';
import { CartItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './icons/Icons';

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (customerDetails: { name: string, email: string }) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
    };
    onCheckout({
      name: target.name.value,
      email: target.email.value
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-text-primary">Keranjang Belanja</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <p className="text-text-secondary text-center">Keranjang Anda kosong.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-bold text-text-primary">{item.name}</p>
                    <p className="text-sm text-primary">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                       <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50" disabled={item.quantity <= 1}><MinusIcon /></button>
                       <span className="px-3 font-medium">{item.quantity}</span>
                       <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-lg"><PlusIcon /></button>
                    </div>
                     <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700"><TrashIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
            <div className="p-6 border-t">
                 <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
                <form onSubmit={handleCheckoutSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="name" placeholder="Nama Lengkap Anda" required className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary"/>
                        <input type="email" name="email" placeholder="Alamat Email Anda" required className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary"/>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                        Bayar Sekarang (Simulasi)
                    </button>
                </form>
            </div>
        )}

      </div>
    </div>
  );
};

export default ShoppingCartModal;