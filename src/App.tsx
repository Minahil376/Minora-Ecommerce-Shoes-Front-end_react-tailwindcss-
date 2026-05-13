import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// =========================================================
// CART CONTEXT
// =========================================================
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  totalItems: number;
  toast: string;
  appliedDiscount: number;
  setAppliedDiscount: (d: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'minora_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [toast, setToast] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }, []);

  const addToCart = useCallback(
    (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + (product.quantity ?? 1) }
              : i
          );
        }
        return [...prev, { ...product, quantity: product.quantity ?? 1 }];
      });
      showToast(`${product.title} added to cart!`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
      );
    },
    [removeFromCart]
  );

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        toast,
        appliedDiscount,
        setAppliedDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

// =========================================================
// IMPORTS
// =========================================================
import Navbar from './components/Navbar/page';
import CartToast from './components/CartToast/page';
import SearchOverlay from './components/SearchOverlay/page';
import ProductCard, { PRODUCTS } from './components/ProductCard/page';
import Newsletter from './components/Newsletter/page';
import Footer from './components/Footer/page';

import Shop from './pages/Shop/page';
import Cart from './pages/Cart/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import About from './pages/About/page';
import Contact from './pages/Contact/page';
import Dashboard from './pages/Dashboard/page';

// =========================================================
// HOME PAGE
// =========================================================
const trendingProducts = PRODUCTS.slice(0, 20);

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center relative z-10">
            {/* Text */}
            <div className="flex-1 basis-1/2 min-w-[300px] pr-8">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-200 text-rose-600 text-sm font-bold uppercase mb-4">
                New Collection 2026
              </span>
              <h1 className="text-[4rem] text-[#2B3467] font-extrabold leading-[1.1] mb-6 mt-0">
                Step into <br />
                <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                  absolute
                </span>{' '}
                comfort.
              </h1>
              <p className="text-lg text-gray-600 max-w-[32rem] mb-4 leading-relaxed">
                Get more for less - Up to 70% OFF across all exclusive products.
                Experience premium quality.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-white hover:text-rose-500 px-8 py-4 text-lg"
                >
                  Shop Now <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
                <button className="inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 px-8 py-4 text-lg bg-white border border-gray-200 text-[#2B3467] cursor-pointer font-[inherit] hover:bg-[#2B3467] hover:text-white">
                  Explore Brands
                </button>
              </div>
            </div>
            {/* Image */}
            <div className="flex-1 basis-1/2 min-w-[300px] flex justify-center relative mt-12">
              <img
                src="/images/herobanner2.png"
                alt="Featured Shoes"
                className="w-full max-w-[28rem] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-105 animate-bounce"
                style={{ animation: 'heroBounce 5s infinite' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="max-w-7xl mx-auto px-4 relative -mt-8 z-20">
        <div className="flex items-center bg-white rounded-[40px] px-10 py-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] justify-between flex-wrap gap-4">
          {[
            { icon: 'fa-truck-fast', title: 'Free Shipping', desc: 'On all orders over $50' },
            { icon: 'fa-arrow-rotate-left', title: '30 Days Return', desc: 'Money back guarantee' },
            { icon: 'fa-headset', title: '24/7 Support', desc: 'Live chat or call' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                <i className={`fa-solid ${icon}`}></i>
              </div>
              <div>
                <h4 className="m-0 text-[#2B3467] font-bold text-base">{title}</h4>
                <p className="m-0 text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-4">Shop by Category</h2>
            <div className="w-24 h-1.5 bg-rose-500 mx-auto my-4 rounded-full"></div>
          </div>
          <div className="flex flex-wrap -mx-3">
            {[
              { img: '/images/category-men.jpg', label: 'Men' },
              { img: '/images/category-women.jpg', label: 'Women' },
              { img: '/images/category-kids.jpg', label: 'Kids' },
              { img: '/images/special-offer.png', label: 'Accessories' },
            ].map(({ img, label }) => (
              <div key={label} className="flex-none w-full sm:w-1/2 px-3 mb-6">
                <Link to="/shop" className="group block rounded-2xl overflow-hidden relative h-80 w-full">
                  <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <h3 className="absolute bottom-6 left-6 text-white text-3xl font-bold m-0">{label}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-4">Trending Products</h2>
            <div className="w-24 h-1.5 bg-rose-500 mx-auto my-4 rounded-full"></div>
            <p className="text-gray-500 mb-6">Top picks from our latest collection.</p>
          </div>
          <div className="flex flex-wrap justify-center -mx-3">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10 pt-8 border-t border-gray-100">
            <Link
              to="/shop"
              className="inline-block text-base font-extrabold text-[#2B3467] border-b-2 border-[#2B3467] pb-1 transition-all duration-300 hover:text-rose-600 hover:border-rose-600 tracking-[0.01em]"
            >
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="bg-[#2B3467] py-20 px-4 text-center text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-[3rem] font-extrabold mb-4 mt-0">Special Offer — Up to 70% Off!</h2>
          <p className="text-blue-200 text-2xl max-w-3xl mx-auto mb-8">
            Limited time deals on premium footwear. Don't miss out on our biggest sale of the year.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-white hover:text-rose-500 px-8 py-4 text-lg"
          >
            Shop the Sale
          </Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}

// =========================================================
// APP LAYOUT
// =========================================================
function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-[#2B3467] text-white text-sm text-center py-2 font-medium">
        Free shipping on all orders over $50.{' '}
        <Link to="/shop" className="underline hover:text-rose-500 transition-colors">Shop Now</Link>
      </div>

      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartToast />
    </>
  );
}

// =========================================================
// ROOT APP
// =========================================================
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
