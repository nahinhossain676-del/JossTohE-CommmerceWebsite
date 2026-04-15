import { useState } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['All', 'Casual', 'Premium', 'Trending'];
const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = ['Black', 'White', 'Red', 'Brown'];

export default function ProductsSection({ products, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSize, setActiveSize] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = products.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeSize && !p.sizes.includes(activeSize)) return false;
    if (activeColor && !p.colors.includes(activeColor)) return false;
    return true;
  });

  function clearFilters() {
    setActiveCategory('All');
    setActiveSize('');
    setActiveColor('');
  }

  const hasFilters = activeCategory !== 'All' || activeSize || activeColor;

  return (
    <section id="products" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-400">Our Collection</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Shop The Drop</h2>
        <div className="w-16 h-px bg-amber-400 mx-auto" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-amber-400 border-amber-400 text-zinc-950'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
              <X size={12} /> Clear
            </button>
          )}
          <button
            onClick={() => setFiltersOpen(v => !v)}
            className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border px-3 py-1.5 transition-all duration-150 ${
              filtersOpen
                ? 'border-amber-400 text-amber-400'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="bg-zinc-900 border border-zinc-800 p-5 mb-8 flex flex-col sm:flex-row gap-6">
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Size</p>
            <div className="flex gap-2">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSize(activeSize === s ? '' : s)}
                  className={`w-9 h-9 text-xs font-semibold border transition-all duration-150 ${
                    activeSize === s
                      ? 'bg-amber-400 border-amber-400 text-zinc-950'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Color</p>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveColor(activeColor === c ? '' : c)}
                  className={`px-3 h-9 text-xs font-semibold border transition-all duration-150 ${
                    activeColor === c
                      ? 'bg-amber-400 border-amber-400 text-zinc-950'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 text-zinc-500 text-xs">
        Showing <span className="text-white font-semibold">{filtered.length}</span> products
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-lg font-semibold text-zinc-400">No products found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
          <button onClick={clearFilters} className="mt-4 text-amber-400 hover:text-amber-300 text-sm underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
