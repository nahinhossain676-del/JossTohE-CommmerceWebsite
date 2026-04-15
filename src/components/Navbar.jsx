import { useState, useEffect } from 'react';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, currentUser, onCartOpen, onAuthOpen, onLogout, onHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/50'
          : 'bg-zinc-950'
      } border-b border-zinc-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button
          onClick={onHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/Logo1.png" alt="Joss Toh" className="h-10 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={onHome} className="text-zinc-300 hover:text-white text-sm font-medium tracking-wide transition-colors">
            Home
          </button>
          <button
            onClick={() => { onHome(); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="text-zinc-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
          >
            Shop
          </button>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-zinc-400 text-xs">Hi, {currentUser.name.split(' ')[0]}</span>
              <button
                onClick={onLogout}
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAuthOpen('login')}
              className="hidden md:flex items-center gap-1 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
            >
              <User size={16} />
              <span>Login</span>
            </button>
          )}

          <button
            onClick={onCartOpen}
            className="relative p-2 text-zinc-300 hover:text-white transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-400 text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 flex flex-col gap-4">
          <button onClick={() => { onHome(); setMenuOpen(false); }} className="text-zinc-300 hover:text-white text-sm text-left">
            Home
          </button>
          <button
            onClick={() => { onHome(); setMenuOpen(false); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="text-zinc-300 hover:text-white text-sm text-left"
          >
            Shop
          </button>
          {currentUser ? (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Hi, {currentUser.name}</span>
              <button onClick={() => { onLogout(); setMenuOpen(false); }} className="text-zinc-400 hover:text-white text-sm flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button onClick={() => { onAuthOpen('login'); setMenuOpen(false); }} className="text-zinc-300 hover:text-white text-sm text-left flex items-center gap-1">
              <User size={14} /> Login / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
