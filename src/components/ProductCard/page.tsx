import { useState } from 'react';
import { useCart } from '../../App';

// =========================================================
// PRODUCT DATA
// =========================================================
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  tag: string;
  image: string;
  reviews?: number;
}

export const PRODUCTS: Product[] = [
  // ── Men's (14 products) ──────────────────────────────────────────────────
  { id: 1,  title: 'Premium Running Shoe',          category: 'men',   price: 129.99, rating: 4.5, tag: 'HOT',  image: 'Men/shoe1.png',     reviews: 120 },
  { id: 2,  title: 'Classic Comfort Sneaker',        category: 'men',   price: 79.99,  rating: 4.5, tag: '-20%', image: 'Men/shoe2.png',     reviews: 95  },
  { id: 3,  title: 'Sport Athletic Shoe',            category: 'men',   price: 109.99, rating: 5,   tag: 'NEW',  image: 'Men/shoe3.png',     reviews: 156 },
  { id: 4,  title: 'Urban Lifestyle Shoe',           category: 'men',   price: 99.99,  rating: 4.5, tag: 'SALE', image: 'Men/shoe4.png',     reviews: 88  },
  { id: 5,  title: 'Professional Training Shoe',     category: 'men',   price: 119.99, rating: 4.5, tag: '-25%', image: 'Men/shoe5.png',     reviews: 142 },
  { id: 6,  title: 'Elite Performance Shoe',         category: 'men',   price: 139.99, rating: 5,   tag: 'HOT',  image: 'Men/shoe6.png',     reviews: 178 },
  { id: 7,  title: 'Casual Everyday Shoe',           category: 'men',   price: 89.99,  rating: 4.5, tag: 'NEW',  image: 'Men/shoe7.png',     reviews: 134 },
  { id: 8,  title: 'Outdoor Adventure Boot',         category: 'men',   price: 149.99, rating: 5,   tag: 'SALE', image: 'Men/shoe8.png',     reviews: 167 },
  { id: 9,  title: "Men's Classic Comfort Shoe",     category: 'men',   price: 125.99, rating: 5,   tag: '-15%', image: 'Men/shoe9.png',     reviews: 112 },
  { id: 10, title: "Men's Everyday Formal Shoe",     category: 'men',   price: 159.99, rating: 4.5, tag: 'NEW',  image: 'Men/shoe10.png',    reviews: 98  },
  { id: 11, title: "Men's Soft Sole Lace Shoe",      category: 'men',   price: 119.99, rating: 5,   tag: 'HOT',  image: 'Men/shoe11.png',    reviews: 189 },
  { id: 12, title: "Men's Lightweight Office Shoe",  category: 'men',   price: 89.99,  rating: 4.5, tag: '-30%', image: 'Men/shoe12.png',    reviews: 145 },
  { id: 13, title: "Men's Casual Walk Shoe",         category: 'men',   price: 59.99,  rating: 5,   tag: 'NEW',  image: 'Men/shoe13.png',    reviews: 156 },
  { id: 14, title: "Men's Soft Sole Casual",         category: 'men',   price: 85.99,  rating: 4.5, tag: 'SALE', image: 'Men/shoe14.png',    reviews: 123 },
  // ── Women's (11 products) ────────────────────────────────────────────────
  { id: 15, title: "Women's Open Toe Heels",         category: 'women', price: 124.99, rating: 5,   tag: '-20%', image: 'Women/Wshoe1.png',  reviews: 198 },
  { id: 16, title: "Women's Classic Party Heels",    category: 'women', price: 99.99,  rating: 4.5, tag: 'HOT',  image: 'Women/Wshoe2.png',  reviews: 167 },
  { id: 17, title: "Women's Strappy Sandals",        category: 'women', price: 89.99,  rating: 5,   tag: 'NEW',  image: 'Women/Wshoe3.png',  reviews: 143 },
  { id: 18, title: "Women's Block Heel Pumps",       category: 'women', price: 114.99, rating: 4.5, tag: 'SALE', image: 'Women/Wshoe4.png',  reviews: 112 },
  { id: 19, title: "Women's Casual Flats",           category: 'women', price: 69.99,  rating: 5,   tag: '-15%', image: 'Women/Wshoe5.png',  reviews: 189 },
  { id: 20, title: "Women's Ankle Boots",            category: 'women', price: 134.99, rating: 4.5, tag: 'HOT',  image: 'Women/Wshoe6.png',  reviews: 134 },
  { id: 21, title: "Women's Wedge Sneakers",         category: 'women', price: 94.99,  rating: 5,   tag: 'NEW',  image: 'Women/Wshoe7.png',  reviews: 156 },
  { id: 22, title: "Women's Slip-On Loafers",        category: 'women', price: 79.99,  rating: 4.5, tag: 'SALE', image: 'Women/Wshoe8.png',  reviews: 98  },
  { id: 23, title: "Women's Platform Heels",         category: 'women', price: 119.99, rating: 5,   tag: '-25%', image: 'Women/Wshoe9.png',  reviews: 167 },
  { id: 24, title: "Women's Running Trainers",       category: 'women', price: 109.99, rating: 4.5, tag: 'HOT',  image: 'Women/Wshoe10.png', reviews: 145 },
  { id: 25, title: "Women's Ballet Flats",           category: 'women', price: 64.99,  rating: 5,   tag: 'NEW',  image: 'Women/Wshoe11.png', reviews: 178 },
  // ── Extra products ────────────────────────────────────────────────────────
  { id: 26, title: "Men's Trail Runner",             category: 'men',   price: 134.99, rating: 4.5, tag: 'NEW',  image: 'Men/shoe15.png',    reviews: 102 },
  { id: 27, title: "Men's Canvas Slip-On",           category: 'men',   price: 74.99,  rating: 4.5, tag: 'SALE', image: 'Men/shoe16.png',    reviews: 87  },
  { id: 28, title: "Men's High-Top Sneaker",         category: 'men',   price: 109.99, rating: 5,   tag: 'HOT',  image: 'Men/shoe17.png',    reviews: 163 },
  { id: 29, title: "Men's Leather Derby",            category: 'men',   price: 169.99, rating: 4.5, tag: 'NEW',  image: 'Men/shoe18.png',    reviews: 74  },
  { id: 30, title: "Men's Mesh Running Shoe",        category: 'men',   price: 94.99,  rating: 5,   tag: '-10%', image: 'Men/shoe19.png',    reviews: 138 },
  { id: 31, title: "Men's Suede Loafer",             category: 'men',   price: 114.99, rating: 4.5, tag: 'SALE', image: 'Men/shoe20.png',    reviews: 91  },
  { id: 32, title: "Men's Waterproof Boot",          category: 'men',   price: 154.99, rating: 5,   tag: 'HOT',  image: 'Men/shoe21.png',    reviews: 176 },
  { id: 33, title: "Men's Oxford Dress Shoe",        category: 'men',   price: 144.99, rating: 4.5, tag: 'NEW',  image: 'Men/shoe22.png',    reviews: 109 },
  { id: 34, title: "Men's Slip-Resistant Work Shoe", category: 'men',   price: 99.99,  rating: 5,   tag: '-20%', image: 'Men/shoe23.png',    reviews: 152 },
  { id: 35, title: "Men's Knit Comfort Shoe",        category: 'men',   price: 84.99,  rating: 4.5, tag: 'NEW',  image: 'Men/shoe24.png',    reviews: 118 },
  { id: 36, title: "Men's Sport Sandal",             category: 'men',   price: 54.99,  rating: 5,   tag: 'SALE', image: 'Men/shoe25.png',    reviews: 93  },
];

// =========================================================
// STAR RATING helper
// =========================================================
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="text-yellow-400 text-[10px] mt-1">
      {Array.from({ length: full }).map((_, i) => (
        <i key={i} className="fa-solid fa-star"></i>
      ))}
      {half && <i className="fa-solid fa-star-half-stroke"></i>}
    </div>
  );
}

// =========================================================
// PRODUCT CARD component
// =========================================================
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="flex-none w-full sm:w-1/2 lg:w-1/4 px-3 mb-8 flex justify-center">
      <div className="group flex flex-col w-full h-80 bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="relative overflow-hidden">

          <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white text-gray-500 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-600">
            <i className="fa-regular fa-heart"></i>
          </button>
          <div className="h-[150px] p-4 bg-white border-b border-gray-100 flex items-center justify-center">
            <img
              src={`/images/${product.image}`}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[#2B3467] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <a href="#">{product.title}</a>
          </h3>
          <div className="flex justify-between items-end mb-auto">
            <div>
              <p className="text-sm text-gray-500 m-0">
                {product.category === 'men' ? "Men's" : "Women's"} Footwear
              </p>
              <div>
                <StarRating rating={product.rating} />
                {product.reviews && <span className="text-gray-500 text-[10px]">({product.reviews})</span>}
              </div>
            </div>
            <span className="text-lg font-extrabold text-rose-600">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className="w-full mt-4 bg-[#2B3467] text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm flex items-center justify-center gap-0.5 transition-all duration-300 hover:bg-rose-600 disabled:opacity-70 cursor-pointer"
          >
            {added ? (
              <><i className="fa-solid fa-check mr-1"></i> Added!</>
            ) : (
              <><i className="fa-solid fa-cart-plus mr-1"></i> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
