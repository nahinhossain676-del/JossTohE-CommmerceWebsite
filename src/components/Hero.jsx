import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.12),transparent)]" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.5) 49px, rgba(255,255,255,0.5) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.5) 49px, rgba(255,255,255,0.5) 50px)`
        }}
      />

      <div className={`relative z-10 text-center px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-6">
          <img
            src="/Logo1.png"
            alt="Joss Toh"
            className="h-24 md:h-32 w-auto mx-auto object-contain drop-shadow-2xl"
            style={{ filter: 'invert(1)' }}
          />
        </div>

        <div className="mb-3 inline-block">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full">
            Premium Streetwear
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mt-6 mb-4 leading-none">
          Luxury You Can
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
            Afford
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          Premium quality. Street-ready designs. Built for those who demand more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProducts}
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-8 py-4 text-sm tracking-widest uppercase transition-all duration-200 active:scale-95 shadow-lg shadow-amber-400/20"
          >
            Shop Now
          </button>
          <button
            onClick={scrollToProducts}
            className="border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-medium px-8 py-4 text-sm tracking-widest uppercase transition-all duration-200"
          >
            Explore Collection
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-10 text-center">
          {[['500+', 'Happy Customers'], ['6', 'Unique Designs'], ['100%', 'Premium Quality']].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-white">{num}</div>
              <div className="text-zinc-500 text-xs tracking-widest uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-amber-400 transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
}
