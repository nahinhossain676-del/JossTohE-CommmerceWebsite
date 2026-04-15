import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ open, cart, onClose, onRemove, onUpdateQty, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" />
            <h2 className="text-white font-bold text-lg">Your Cart</h2>
            {cart.length > 0 && (
              <span className="bg-amber-400 text-zinc-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-zinc-700 mb-4" />
              <p className="text-zinc-400 font-semibold">Your cart is empty</p>
              <p className="text-zinc-600 text-sm mt-1">Add some items to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item, idx) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 pb-4 border-b border-zinc-800 last:border-0">
                  <div className="w-16 h-16 flex-shrink-0 bg-zinc-800 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight truncate">{item.name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{item.size} / {item.color}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQty(item.productId, item.size, item.color, -1)}
                          className="w-6 h-6 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-white text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.productId, item.size, item.color, 1)}
                          className="w-6 h-6 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-bold text-sm">৳{item.price * item.quantity}</span>
                        <button
                          onClick={() => onRemove(item.productId, item.size, item.color)}
                          className="text-zinc-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-zinc-800 bg-zinc-950">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white font-semibold">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-xs mb-4">
              <span className="text-zinc-600">Delivery calculated at checkout</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-4 text-sm tracking-widest uppercase transition-all duration-200 active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
