import { Printer, Home, CheckCircle } from 'lucide-react';

export default function InvoicePage({ order, onHome }) {
  function printInvoice() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 no-print">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white">Order Confirmed!</h1>
          <p className="text-zinc-400 mt-2">
            Your order <span className="text-amber-400 font-semibold">{order.id}</span> has been placed successfully.
          </p>
          <p className="text-zinc-500 text-sm mt-1">We will contact you on WhatsApp shortly.</p>
        </div>

        <div id="invoice-print" className="bg-white text-zinc-900 p-8">
          <div className="border-b-2 border-zinc-900 pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-zinc-900 tracking-tight">JOSS TOH</h2>
                <p className="text-zinc-500 text-xs tracking-widest uppercase">Premium Streetwear</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Invoice</p>
                <p className="font-bold text-zinc-900 text-sm">{order.id}</p>
                <p className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString('en-BD')}</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Customer</p>
              <p className="font-bold text-zinc-900">{order.user.name}</p>
              <p className="text-zinc-600 text-sm">{order.user.phone}</p>
              <p className="text-zinc-600 text-sm">{order.user.address}</p>
              <p className="text-zinc-600 text-sm">{order.user.city === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Payment</p>
              <p className="font-bold text-zinc-900">{order.paymentMethod}</p>
              {order.transactionInfo && (
                <p className="text-zinc-600 text-sm">Ref: {order.transactionInfo}</p>
              )}
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 border border-amber-300 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                <span className="text-amber-700 text-xs font-semibold">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Items</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left text-zinc-500 font-semibold pb-2 text-xs uppercase tracking-wider">Product</th>
                  <th className="text-center text-zinc-500 font-semibold pb-2 text-xs uppercase tracking-wider">Size</th>
                  <th className="text-center text-zinc-500 font-semibold pb-2 text-xs uppercase tracking-wider">Color</th>
                  <th className="text-center text-zinc-500 font-semibold pb-2 text-xs uppercase tracking-wider">Qty</th>
                  <th className="text-right text-zinc-500 font-semibold pb-2 text-xs uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="py-3 font-medium text-zinc-900">{item.name}</td>
                    <td className="py-3 text-center text-zinc-600">{item.size}</td>
                    <td className="py-3 text-center text-zinc-600">{item.color}</td>
                    <td className="py-3 text-center text-zinc-600">{item.quantity}</td>
                    <td className="py-3 text-right font-semibold text-zinc-900">৳{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end gap-1 border-t-2 border-zinc-900 pt-4">
            <div className="flex justify-between w-48 text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-semibold">৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between w-48 text-sm">
              <span className="text-zinc-500">Delivery</span>
              <span className="font-semibold">৳{order.delivery}</span>
            </div>
            <div className="flex justify-between w-48 text-base font-black mt-1 pt-2 border-t border-zinc-200">
              <span>Total</span>
              <span>৳{order.total}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
            <p className="text-zinc-500 text-xs">Joss Toh — Mohakhali SouthPara G.P.KA-75/3 (Haji Bari)</p>
            <p className="text-zinc-500 text-xs mt-0.5">Phone: 01986886116</p>
            <p className="text-zinc-400 text-xs mt-3 font-medium">Thank you for shopping with Joss Toh!</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 no-print">
          <button
            onClick={printInvoice}
            className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold py-3.5 text-sm tracking-widest uppercase transition-all duration-200"
          >
            <Printer size={16} />
            Print Invoice
          </button>
          <button
            onClick={onHome}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-3.5 text-sm tracking-widest uppercase transition-all duration-200 active:scale-95"
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
