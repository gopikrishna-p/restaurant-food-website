import React, { useState } from 'react';
import { Search, ShoppingCart, User, ClipboardCheck, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

interface NavbarProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  searchLocation: string;
  onSearchLocationChange: (location: string) => void;
  cartItemsCount: number;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  onLoginClick, 
  onSignupClick,
  onLogout,
  searchLocation,
  onSearchLocationChange,
  cartItemsCount,
  activeCategory,
  onCategoryChange,
  user
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for location:', searchLocation);
  };

  const categories = [
    { id: 'all', name: 'Home' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'starters', name: 'Starters' },
    { id: 'biryani', name: 'Biryani' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-yellow-400 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">Grab Foods...</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`hover:text-gray-700 px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.id 
                    ? 'font-bold text-gray-800 bg-yellow-300' 
                    : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Enter your Location"
                value={searchLocation}
                onChange={(e) => onSearchLocationChange(e.target.value)}
                className="w-48 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </form>

            <button
              onClick={onCartClick}
              className="flex items-center px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 relative"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="flex items-center px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <User className="w-5 h-5 sm:mr-1" />
                  <span className="hidden sm:inline">Login</span>
                </button>

                <button
                  onClick={onSignupClick}
                  className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <ClipboardCheck className="w-5 h-5 sm:mr-1" />
                  <span className="hidden sm:inline">SignUp</span>
                </button>
              </>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-yellow-300 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.id 
                    ? 'font-bold text-gray-800 bg-yellow-300' 
                    : ''
                }`}
              >
                {category.name}
              </button>
            ))}
            <form onSubmit={handleSearch} className="relative mt-4">
              <input
                type="text"
                placeholder="Enter your Location"
                value={searchLocation}
                onChange={(e) => onSearchLocationChange(e.target.value)}
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;