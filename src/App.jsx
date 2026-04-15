import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import CheckoutPage from './components/CheckoutPage';
import InvoicePage from './components/InvoicePage';
import Footer from './components/Footer';

function getStoredProducts() {
  try {
    const stored = localStorage.getItem('jt_products');
    if (stored) return JSON.parse(stored);
  } catch {}
  return INITIAL_PRODUCTS;
}

function getStoredCart() {
  try {
    const stored = localStorage.getItem('jt_cart');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem('jt_currentUser');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function getStoredOrders() {
  try {
    const stored = localStorage.getItem('jt_orders');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState(getStoredProducts);
  const [cart, setCart] = useState(getStoredCart);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [orders, setOrders] = useState(getStoredOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    localStorage.setItem('jt_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jt_orders', JSON.stringify(orders));
  }, [orders]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product, size, color) {
    setCart(prev => {
      const existing = prev.find(
        i => i.productId === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map(i =>
          i.productId === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  }

  function removeFromCart(productId, size, color) {
    setCart(prev =>
      prev.filter(
        i => !(i.productId === productId && i.size === size && i.color === color)
      )
    );
  }

  function updateQty(productId, size, color, delta) {
    setCart(prev =>
      prev
        .map(i =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
    );
  }

  function placeOrder(orderData) {
    const newOrder = {
      id: 'ORD-' + Date.now(),
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('jt_orders', JSON.stringify(updated));
      return updated;
    });
    setProducts(prev =>
      prev.map(p => {
        const ordered = orderData.items.filter(i => i.productId === p.id);
        if (ordered.length) {
          const qty = ordered.reduce((s, i) => s + i.quantity, 0);
          return { ...p, stockQty: Math.max(0, p.stockQty - qty) };
        }
        return p;
      })
    );
    setCart([]);
    localStorage.setItem('jt_cart', JSON.stringify([]));
    setCurrentOrder(newOrder);
    setView('invoice');

    const phoneNumber = '+8801340885012';
    const items = orderData.items
      .map(i => `${i.name} (${i.size}/${i.color}) x${i.quantity}`)
      .join(', ');
    const msg = encodeURIComponent(
      `*New Order from Joss Toh*\n\nName: ${orderData.user.name}\nPhone: ${orderData.user.phone}\nAddress: ${orderData.user.address}\n\nProducts: ${items}\n\nSubtotal: ৳${orderData.subtotal}\nDelivery: ৳${orderData.delivery}\nTotal: ৳${orderData.total}\n\nPayment: ${orderData.paymentMethod}${orderData.transactionInfo ? '\nTransaction: ' + orderData.transactionInfo : ''}`
    );
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${msg}`, '_blank');
    }, 1500);
  }

  function loginUser(user) {
    setCurrentUser(user);
    localStorage.setItem('jt_currentUser', JSON.stringify(user));
    setAuthOpen(false);
  }

  function logoutUser() {
    setCurrentUser(null);
    localStorage.removeItem('jt_currentUser');
  }

  function openAuth(mode = 'login') {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function goCheckout() {
    if (!currentUser) {
      openAuth('login');
      return;
    }
    setCartOpen(false);
    setView('checkout');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <TopBar />
      <Navbar
        cartCount={cartCount}
        currentUser={currentUser}
        onCartOpen={() => setCartOpen(true)}
        onAuthOpen={openAuth}
        onLogout={logoutUser}
        onHome={() => setView('home')}
      />

      {view === 'home' && (
        <>
          <Hero />
          <ProductsSection products={products} onAddToCart={addToCart} />
        </>
      )}

      {view === 'checkout' && (
        <CheckoutPage
          cart={cart}
          currentUser={currentUser}
          onPlaceOrder={placeOrder}
          onBack={() => setView('home')}
        />
      )}

      {view === 'invoice' && currentOrder && (
        <InvoicePage
          order={currentOrder}
          onHome={() => setView('home')}
        />
      )}

      {view === 'home' && <Footer />}

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={goCheckout}
      />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onLogin={loginUser}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
}
