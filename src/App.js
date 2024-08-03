import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, X, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// Simulated product data with Pexels image URLs
const products = [
  { id: 1, name: "Oversized Blazer", price: 299.99, category: "outerwear", colors: ["Black", "Beige", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], newArrival: true, bestseller: false, image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 2, name: "Silk Slip Dress", price: 189.99, category: "dresses", colors: ["Ivory", "Black", "Navy"], sizes: ["XS", "S", "M", "L"], newArrival: false, bestseller: true, image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 3, name: "Wide-leg Trousers", price: 159.99, category: "bottoms", colors: ["Charcoal", "Black", "Cream"], sizes: ["0", "2", "4", "6", "8", "10"], newArrival: true, bestseller: false, image: "https://images.pexels.com/photos/1484808/pexels-photo-1484808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 4, name: "Puff-sleeve Blouse", price: 89.99, category: "tops", colors: ["White", "Sky Blue", "Blush"], sizes: ["XS", "S", "M", "L", "XL"], newArrival: false, bestseller: true, image: "https://images.pexels.com/photos/2820344/pexels-photo-2820344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  // Add more products as needed
];

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-black hover:bg-gray-100",
    outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };
  
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-w-2 aspect-h-3">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
          {product.newArrival && (
            <span className="bg-black text-white text-xs uppercase px-2 py-1 rounded">New Arrival</span>
          )}
          {product.bestseller && (
            <span className="bg-yellow-500 text-white text-xs uppercase px-2 py-1 rounded">Bestseller</span>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button onClick={() => addToCart(product)} className="flex-grow mr-2">
              Add to Bag
            </Button>
            <Button 
              onClick={() => toggleWishlist(product)} 
              variant="outline"
              className={`p-2 ${isWishlisted ? 'bg-red-500 text-white border-red-500' : ''}`}
            >
              <Heart size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex space-x-1">
          {product.colors.map(color => (
            <div key={color} className="w-4 h-4 rounded-full border border-gray-300" style={{backgroundColor: color}}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = ({ cart, updateQuantity, removeFromCart, clearCart, closeCart, proceedToCheckout }) => (
  <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl p-6 overflow-y-auto z-50">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Your Shopping Bag</h2>
      <button onClick={closeCart} className="text-gray-400 hover:text-gray-600">
        <X size={24} />
      </button>
    </div>
    {cart.length === 0 ? (
      <p className="text-center text-gray-500">Your shopping bag is empty.</p>
    ) : (
      <>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-30 object-cover mr-4" />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                <div className="mt-1 flex items-center">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-700">-</button>
                  <span className="mx-2 text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-700">+</button>
                </div>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
        ))}
        <div className="mt-6">
          <p className="text-xl font-bold">
            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <Button onClick={clearCart} variant="secondary" className="w-full">
            Clear Bag
          </Button>
          <Button onClick={proceedToCheckout} className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </>
    )}
  </div>
);

const AuthModal = ({ isOpen, closeModal, mode, onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => closeModal()} 
            className="text-black font-semibold hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === product.id);
      if (existingItem) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  );

  const handleLogin = (email, password) => {
    // Simulated login logic
    setUser({ email });
    setIsAuthModalOpen(false);
  };

  const handleSignup = (email, password) => {
    // Simulated signup logic
    setUser({ email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const proceedToCheckout = () => {
    if (user) {
      // Implement checkout logic here
      alert('Proceeding to checkout...');
    } else {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Luxe Fashions</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="relative">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User size={24} />
                  <span>{user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <button 
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}>
                <User size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
    <nav className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center space-x-8">
          <li><a href="#" className="text-gray-600 hover:text-black">New Arrivals</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Clothing</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Shoes</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Accessories</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Sale</a></li>
        </ul>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-end mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="all">All Categories</option>
          <option value="outerwear">Outerwear</option>
          <option value="dresses">Dresses</option>
          <option value="bottoms">Bottoms</option>
          <option value="tops">Tops</option>
          <option value="knitwear">Knitwear</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
            toggleWishlist={toggleWishlist}
            isWishlisted={wishlist.some(item => item.id === product.id)}
          />
        ))}
      </div>
    </main>
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Luxe Fashions is your destination for premium women's clothing and accessories.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Gift Cards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2024 Luxe Fashions. All rights reserved.</p>
        </div>
      </div>
    </footer>
    {isCartOpen && (
      <ShoppingCart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        closeCart={() => setIsCartOpen(false)}
        proceedToCheckout={proceedToCheckout}
      />
    )}
    <AuthModal
      isOpen={isAuthModalOpen}
      closeModal={() => setIsAuthModalOpen(false)}
      mode={authMode}
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
  </div>
);
};

export default App;