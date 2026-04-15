import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <img src="/Logo1.png" alt="Joss Toh" className="h-12 w-auto object-contain mb-4" style={{ filter: 'invert(1)' }} />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Premium streetwear crafted for those who demand quality without compromise. Luxury you can afford.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {['Home', 'Shop', 'About'].map(link => (
                <a
                  key={link}
                  href="#"
                  onClick={e => { e.preventDefault(); if (link !== 'About') document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Customer Service</p>
                  <p className="text-white text-sm font-semibold">01986886116</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Website Creator</p>
                  <p className="text-white text-sm font-semibold">01749751370</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-white text-sm">Mohakhali SouthPara</p>
                  <p className="text-zinc-400 text-xs">G.P.KA-75/3 (Haji Bari)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} Joss Toh. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            Website by{' '}
            <a
              href="https://www.linkedin.com/in/nahinnumpy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Nahin Hossain
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
