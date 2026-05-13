import { useState, useEffect, useRef } from 'react';
import { PRODUCTS, type Product } from '../ProductCard/page';
import { useCart } from '../../App';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  keyword: string;
  category: string;
  sort: string;
  priceMin: string;
  priceMax: string;
  rating: string;
  tag: string;
}

const defaultFilters: FilterState = {
  keyword: '',
  category: '',
  sort: '',
  priceMin: '',
  priceMax: '',
  rating: '',
  tag: '',
};

const inputCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const selectCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] bg-white transition-all duration-300 hover:border-gray-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const labelCls = "block font-semibold mb-2 text-[#2B3467]";

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();
  const keywordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && keywordRef.current) keywordRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function runSearch() {
    const keyword = filters.keyword.trim().toLowerCase();
    const minPrice = parseFloat(filters.priceMin) || 0;
    const maxPrice = parseFloat(filters.priceMax) || Infinity;
    const minRating = parseFloat(filters.rating) || 0;

    let filtered = PRODUCTS.filter((p) => {
      const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword);
      const matchCategory = !filters.category || p.category === filters.category;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      const matchTag = !filters.tag || p.tag === filters.tag;
      return matchKeyword && matchCategory && matchPrice && matchRating && matchTag;
    });

    if (filters.sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'name-asc')   filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sort === 'name-desc')  filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (filters.sort === 'rating')     filtered.sort((a, b) => b.rating - a.rating);

    setResults(filtered);
    setSearched(true);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setResults([]);
    setSearched(false);
  }

  function handleAddToCart(product: Product) {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);
  }

  function handleChange(field: keyof FilterState, value: string) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[999] flex items-start justify-center pt-20 px-4 pb-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-[760px] max-h-[90vh] overflow-y-auto animate-[fadeInDown_0.25s_ease] bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-4">Search Products</h2>
          <button
            aria-label="Close search"
            onClick={onClose}
            className="cursor-pointer bg-transparent border-none text-[#2B3467] text-xl inline-flex items-center justify-center transition-all duration-300 hover:text-rose-500"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Keyword */}
        <div className="mb-6 inline-flex relative bg-white rounded-xl p-1.5 shadow-xs border border-gray-200 w-full max-w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"></i>
          <input
            type="text"
            placeholder="Search by name or keyword..."
            ref={keywordRef}
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
            className="border-none pl-10 pr-28 w-full text-base h-11 outline-none bg-transparent placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={runSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2B3467] text-white px-6 rounded-md font-bold border-none cursor-pointer h-8 whitespace-nowrap transition-all duration-300 hover:bg-rose-500"
          >
            Search
          </button>
        </div>

        {/* Category + Sort */}
        <div className="flex items-center flex-wrap gap-14 mb-3">
          <div className="flex-1 min-w-[300px] pr-8">
            <label className={labelCls}>Category</label>
            <div className="relative w-full">
              <select value={filters.category} onChange={(e) => handleChange('category', e.target.value)} className={selectCls}>
                <option value="">All Categories</option>
                <option value="men">Men's Footwear</option>
                <option value="women">Women's Footwear</option>
                <option value="kids">Kids' Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
          <div className="flex-1 min-w-[300px] pr-8">
            <label className={labelCls}>Sort By</label>
            <div className="relative w-full">
              <select value={filters.sort} onChange={(e) => handleChange('sort', e.target.value)} className={selectCls}>
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-3">
          <label className={labelCls}>Price Range</label>
          <div className="flex items-center flex-wrap gap-14">
            <div className="flex-1 min-w-[300px] pr-8">
              <input type="number" placeholder="Min price e.g. 50" value={filters.priceMin} onChange={(e) => handleChange('priceMin', e.target.value)} className={inputCls} />
            </div>
            <div className="flex-1 min-w-[300px] pr-8">
              <input type="number" placeholder="Max price e.g. 200" value={filters.priceMax} onChange={(e) => handleChange('priceMax', e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Rating + Tag */}
        <div className="flex items-center flex-wrap gap-14 mb-3">
          <div className="flex-1 min-w-[300px] pr-8">
            <label className={labelCls}>Min Rating</label>
            <div className="relative w-full">
              <select value={filters.rating} onChange={(e) => handleChange('rating', e.target.value)} className={selectCls}>
                <option value="">Any Rating</option>
                <option value="4">4 Stars &amp; Above</option>
                <option value="3">3 Stars &amp; Above</option>
                <option value="2">2 Stars &amp; Above</option>
              </select>
            </div>
          </div>
          <div className="flex-1 min-w-[300px] pr-8">
            <label className={labelCls}>Product Tag</label>
            <div className="relative w-full">
              <select value={filters.tag} onChange={(e) => handleChange('tag', e.target.value)} className={selectCls}>
                <option value="">All Tags</option>
                <option value="HOT">HOT</option>
                <option value="NEW">NEW</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-14 mb-3">
          <div className="flex-1 min-w-[300px] pr-8">
            <button
              onClick={runSearch}
              className="w-full mt-4 bg-[#2B3467] text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm flex items-center justify-center gap-1 transition-all duration-300 hover:bg-rose-600 cursor-pointer"
            >
              <i className="fa-solid fa-filter"></i> Apply Filters
            </button>
          </div>
          <div className="flex-1 min-w-[300px] pr-8">
            <button
              onClick={resetFilters}
              className="w-full mt-4 bg-[#2B3467] text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm flex items-center justify-center gap-1 transition-all duration-300 hover:bg-rose-600 cursor-pointer"
            >
              <i className="fa-solid fa-rotate-left"></i> Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div>
            <h3 className="text-lg font-bold text-[#2B3467] mt-6 border-t border-gray-200 pt-5">Search Results</h3>
            <p className="text-gray-600 mb-0">
              <strong>{results.length}</strong> product(s) found.
            </p>
            <div className="flex flex-wrap justify-center -mx-3 mt-2">
              {results.length === 0 ? (
                <p className="text-center py-8 text-gray-500 italic">
                  No products match your search. Try different filters.
                </p>
              ) : (
                results.map((p) => (
                  <div className="flex-none w-full sm:w-1/2 lg:w-1/4 px-3 mb-8 flex justify-center" key={p.id}>
                    <div className="flex flex-col w-full h-80 bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                      <div className="h-[150px] p-4 bg-white border-b border-gray-100 flex items-center justify-center relative">
                        <img src={`/images/${p.image}`} alt={p.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-[#2B3467] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{p.title}</h3>
                        <div className="flex justify-between items-end mb-auto">
                          <p className="text-sm text-gray-500 m-0">
                            {p.category === 'men' ? "Men's" : p.category === 'women' ? "Women's" : p.category} Footwear
                          </p>
                          <span className="text-lg font-extrabold text-rose-600">${p.price.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={addedIds.has(p.id)}
                          className="w-full mt-4 bg-[#2B3467] text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm flex items-center justify-center gap-1 transition-all duration-300 hover:bg-rose-600 disabled:opacity-70 cursor-pointer"
                        >
                          {addedIds.has(p.id) ? (
                            <><i className="fa-solid fa-check"></i> Added!</>
                          ) : (
                            <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
