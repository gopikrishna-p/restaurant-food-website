import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, total, onOrderComplete }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store order in localStorage
    const order = {
      id: Date.now(),
      items: cartItems,
      total,
      paymentMethod,
      address,
      status: 'pending',
      userId: user?.id,
      createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setLoading(false);
    onOrderComplete();
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              required
              placeholder="Enter your delivery address"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                UPI
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-3 rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            }`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;