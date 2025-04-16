import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ClipboardCheck } from 'lucide-react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Checkout from './components/Checkout';
import { useAuth } from './contexts/AuthContext';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  prepTime: string;
  rating: number;
}

interface CartItem extends FoodItem {
  quantity: number;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const foodItems: FoodItem[] = [
    // Starters
    {
      "id": 1,
      "name": "BURGER",
      "price": 99,
      "image": "public/images/food/Snakes/Burger.png",
      "category": "snacks",
      "prepTime": "15 mins",
      "rating": 4.0
    },
    {
      "id": 2,
      "name": "DUMPLING CARVINGS",
      "price": 149,
      "image": "public/images/food/Snakes/Carvings.png",
      "category": "snacks",
      "prepTime": "25 mins",
      "rating": 4.5
    },
    {
      "id": 3,
      "name": "CHEESE PIZZA",
      "price": 199,
      "image": "public/images/food/Snakes/CheesePizza.png",
      "category": "snacks",
      "prepTime": "20 mins",
      "rating": 4.8
    },
    {
      "id": 4,
      "name": "CROISSANT",
      "price": 80,
      "image": "public/images/food/Snakes/Crossiant.png",
      "category": "snacks",
      "prepTime": "10 mins",
      "rating": 4.5
    },
    {
      "id": 5,
      "name": "DABELI",
      "price": 40,
      "image": "public/images/food/Snakes/Dabeli.png",
      "category": "snacks",
      "prepTime": "10 mins",
      "rating": 4.4
    },
    {
      "id": 6,
      "name": "HOTDOG",
      "price": 50,
      "image": "public/images/food/Snakes/HotDog.png",
      "category": "snacks",
      "prepTime": "15 mins",
      "rating": 4.0
    },
    {
      "id": 7,
      "name": "HAKKA NOODLES",
      "price": 80,
      "image": "public/images/food/Snakes/Noodels.png",
      "category": "snacks",
      "prepTime": "15 mins",
      "rating": 4.2
    },
    {
      "id": 8,
      "name": "PANEER TIKKA",
      "price": 149,
      "image": "public/images/food/Snakes/PaneerTikka.png",
      "category": "snacks",
      "prepTime": "15 mins",
      "rating": 4.5
    },
    {
      "id": 9,
      "name": "NON-VEG PIZZA",
      "price": 149,
      "image": "public/images/food/Snakes/Pizza.png",
      "category": "snacks",
      "prepTime": "20 mins",
      "rating": 4.5
    },
    {
      "id": 10,
      "name": "SAMOSA",
      "price": 20,
      "image": "public/images/food/Snakes/Samosa.png",
      "category": "snacks",
      "prepTime": "5 mins",
      "rating": 4.5
    },
    {
      "id": 11,
      "name": "TOMATO & OLIVE PIZZA",
      "price": 149,
      "image": "public/images/food/Snakes/TomatoPizza.png",
      "category": "snacks",
      "prepTime": "20 mins",
      "rating": 4.0
    },
    {
      "id": 12,
      "name": "VADAPAV",
      "price": 30,
      "image": "public/images/food/Snakes/vadapav.png",
      "category": "snacks",
      "prepTime": "10 mins",
      "rating": 4.5
    },
    {
      "id": 13,
      "name": "CHOCOLATE COOKIES",
      "price": 10,
      "image": "public/images/food/Cakes/Cookie.png",
      "category": "cakes",
      "prepTime": "5 mins",
      "rating": 5.0
    },
    {
      "id": 14,
      "name": "CHOCOLATE DONUT",
      "price": 49,
      "image": "public/images/food/Cakes/Donut1.png",
      "category": "cakes",
      "prepTime": "10 mins",
      "rating": 4.5
    },
    {
      "id": 15,
      "name": "TARO DONUT",
      "price": 49,
      "image": "public/images/food/Cakes/Donut2.png",
      "category": "cakes",
      "prepTime": "10 mins",
      "rating": 4.5
    },
    {
      "id": 16,
      "name": "CREAME DONUT",
      "price": 49,
      "image": "public/images/food/Cakes/Donut3.png",
      "category": "cakes",
      "prepTime": "10 mins",
      "rating": 4.5
    },
    {
      "id": 17,
      "name": "ROASTED CHICKEN",
      "price": 399,
      "image": "public/images/food/Staters/Roasted_Chiken.png",
      "category": "starters",
      "prepTime": "30 mins",
      "rating": 4.8
    },
    {
      "id": 18,
      "name": "CHICKEN LOLLIPOP",
      "price": 99,
      "image": "public/images/food/Staters/ChickenLollipop.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.5
    },
    {
      "id": 19,
      "name": "CHICKEN KABAB",
      "price": 99,
      "image": "public/images/food/Staters/ChikenKabab.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.5
    },
    {
      "id": 20,
      "name": "CHICKEN WINGS",
      "price": 150,
      "image": "public/images/food/Staters/ChikenWings.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.6
    },
    {
      "id": 21,
      "name": "CHICKEN TIKKA",
      "price": 99,
      "image": "public/images/food/Staters/ChikkenTikka.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.5
    },
    {
      "id": 22,
      "name": "MEAT BALLS",
      "price": 99,
      "image": "public/images/food/Staters/MeatBalls.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.2
    },
    {
      "id": 23,
      "name": "BLUE CRABS",
      "price": 499,
      "image": "public/images/food/Staters/BlueCrabs.png",
      "category": "starters",
      "prepTime": "20 mins",
      "rating": 4.8
    },
    {
      "id": 24,
      "name": "POT BIRYANI",
      "price": 250,
      "image": "public/images/food/Biryani/PotBiryani.png",
      "category": "biryani",
      "prepTime": "15 mins",
      "rating": 4.4
    },
    {
      "id": 25,
      "name": "CHICKEN MANDI",
      "price": 699,
      "image": "public/images/food/Biryani/MandiBiryani.png",
      "category": "biryani",
      "prepTime": "15 mins",
      "rating": 4.5
    },
    {
      "id": 26,
      "name": "PALUO + MAKHANI",
      "price": 199,
      "image": "public/images/food/Biryani/Paluo.png",
      "category": "biryani",
      "prepTime": "15 mins",
      "rating": 4.4
    },
    {
      "id": 27,
      "name": "MUTTON BIRYANI",
      "price": 350,
      "image": "public/images/food/Biryani/MuttonBiryani.png",
      "category": "biryani",
      "prepTime": "15 mins",
      "rating": 4.8
    },
    {
      "id": 28,
      "name": "FISH BIRYANI",
      "price": 300,
      "image": "public/images/food/Biryani/FishBiryani.png",
      "category": "biryani",
      "prepTime": "15 mins",
      "rating": 4.4
    }
  ];

  const handleAddToCart = (item: FoodItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const filteredFoodItems = activeCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
        onLogout={handleLogout}
        searchLocation={searchLocation}
        onSearchLocationChange={setSearchLocation}
        cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        user={user}
      />
      
      <Routes>
        <Route path="/" element={
          <main className="container mx-auto px-4 pt-24">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
              {filteredFoodItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md w-full max-w-[250px] mx-auto">
                  <img 
                    src={item.image}
                    alt={item.name} 
                    className="w-full h-50 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-m font-bold">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-black-600 font-bold">₹{item.price}</p>
                      <div className="flex items-center text-yellow-500 font-bold">
                        <span className="text-sm">★ {item.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-bold">
                      Prep time: {item.prepTime}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="mt-4 w-full bg-green-500 font-bold text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </main>
        } />
        <Route 
          path="/checkout" 
          element={
            user ? (
              <Checkout 
                cartItems={cartItems} 
                total={calculateTotal()} 
                onOrderComplete={() => {
                  setCartItems([]);
                  navigate('/');
                }}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        total={calculateTotal()}
        onProceedToCheckout={handleProceedToCheckout}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={() => {
          setIsLoginOpen(false);
          if (cartItems.length > 0) {
            navigate('/checkout');
          }
        }}
        onSignupClick={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSuccess={() => {
          setIsSignupOpen(false);
          if (cartItems.length > 0) {
            navigate('/checkout');
          }
        }}
      />
    </div>
  );
}

export default App;