import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Truck } from 'lucide-react';

export default function CheckoutPage({ cart, currentUser, onPlaceOrder, onBack }) {
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.identifier || '',
    address: '',
    city: 'dhaka',
    paymentMethod: 'cod',
    transactionInfo: '',
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = form.city === 'dhaka' ? 80 : 130;
  const total = subtotal + delivery;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (form.paymentMethod === 'bkash' && !form.transactionInfo.trim()) {
      errs.transactionInfo = 'Transaction ID or sender number is required';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setPlacing(true);
    setTimeout(() => {
      onPlaceOrder({
        user: { name: form.name, phone: form.phone, address: form.address, city: form.city },
        items: cart,
        subtotal,
        delivery,
        total,
        paymentMethod: form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'bKash',
        transactionInfo: form.transactionInfo,
      });
      setPlacing(false);
    }, 800);
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-zinc-400 text-lg font-semibold">Your cart is empty</p>
        <button onClick={onBack} className="mt-4 text-amber-400 hover:text-amber-300 underline text-sm">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Shopping
        </button>

        <h1 className="text-3xl font-black text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <Truck size={18} className="text-amber-400" />
                Shipping Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600"
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Full Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600 resize-none"
                    placeholder="House, Road, Area"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">Delivery Zone</label>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center justify-between px-4 py-3 border cursor-pointer transition-all ${form.city === 'dhaka' ? 'border-amber-400 bg-amber-400/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                      <div>
                        <p className="text-white text-sm font-semibold">Inside Dhaka</p>
                        <p className="text-zinc-400 text-xs">Delivery: ৳80</p>
                      </div>
                      <input type="radio" name="city" value="dhaka" checked={form.city === 'dhaka'} onChange={handleChange} className="accent-amber-400" />
                    </label>
                    <label className={`flex-1 flex items-center justify-between px-4 py-3 border cursor-pointer transition-all ${form.city === 'outside' ? 'border-amber-400 bg-amber-400/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                      <div>
                        <p className="text-white text-sm font-semibold">Outside Dhaka</p>
                        <p className="text-zinc-400 text-xs">Delivery: ৳130</p>
                      </div>
                      <input type="radio" name="city" value="outside" checked={form.city === 'outside'} onChange={handleChange} className="accent-amber-400" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-amber-400" />
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-4 px-4 py-4 border cursor-pointer transition-all ${form.paymentMethod === 'cod' ? 'border-amber-400 bg-amber-400/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === 'cod'} onChange={handleChange} className="accent-amber-400" />
                  <div>
                    <p className="text-white font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-zinc-400 text-xs">Pay when your order arrives</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 px-4 py-4 border cursor-pointer transition-all ${form.paymentMethod === 'bkash' ? 'border-amber-400 bg-amber-400/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                  <input type="radio" name="paymentMethod" value="bkash" checked={form.paymentMethod === 'bkash'} onChange={handleChange} className="accent-amber-400" />
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-pink-400" />
                    <div>
                      <p className="text-white font-semibold text-sm">bKash</p>
                      <p className="text-zinc-400 text-xs">Mobile banking payment</p>
                    </div>
                  </div>
                </label>
              </div>

              {form.paymentMethod === 'bkash' && (
                <div className="mt-4 bg-pink-950/30 border border-pink-800/40 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone size={16} className="text-pink-400" />
                    <p className="text-pink-300 font-bold text-sm">bKash Payment Instructions</p>
                  </div>
                  <p className="text-zinc-300 text-sm mb-1">
                    Send <span className="text-amber-400 font-bold">৳{total}</span> to bKash number:
                  </p>
                  <p className="text-white font-black text-xl mb-2 tracking-widest">01316862383</p>
                  <p className="text-zinc-400 text-xs mb-4">
                    Send payment manually via bKash, then enter your transaction ID or sender number below.
                  </p>
                  <div>
                    <label className="text-zinc-400 text-xs uppercase tracking-widest mb-1.5 block">
                      Transaction ID or Sender Number
                    </label>
                    <input
                      name="transactionInfo"
                      value={form.transactionInfo}
                      onChange={handleChange}
                      placeholder="Enter transaction ID or your bKash number"
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-400 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-600"
                    />
                    {errors.transactionInfo && <p className="text-red-400 text-xs mt-1">{errors.transactionInfo}</p>}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-4 text-sm tracking-widest uppercase transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {placing ? 'Placing Order...' : `Place Order — ৳${total}`}
            </button>
          </form>

          <div className="bg-zinc-900 border border-zinc-800 p-6 h-fit">
            <h2 className="text-white font-bold text-base mb-5">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-6">
              {cart.map(item => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="w-12 h-12 bg-zinc-800 flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">👕</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{item.name}</p>
                    <p className="text-zinc-500 text-xs">{item.size} / {item.color} × {item.quantity}</p>
                  </div>
                  <span className="text-white text-xs font-semibold flex-shrink-0">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Delivery ({form.city === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                <span className="text-white">৳{delivery}</span>
              </div>
              <div className="flex justify-between text-base font-black mt-2 pt-3 border-t border-zinc-800">
                <span className="text-white">Total</span>
                <span className="text-amber-400">৳{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
