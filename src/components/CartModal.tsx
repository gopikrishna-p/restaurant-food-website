import React from 'react';
import Modal from './Modal';
import { Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  total: number;
  onProceedToCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  total,
  onProceedToCheckout
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Cart">
      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
              </div>
              <button 
                onClick={onProceedToCheckout}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;