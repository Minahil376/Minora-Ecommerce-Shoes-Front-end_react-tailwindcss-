import { PRODUCTS } from '../../components/ProductCard/page';
import ProductCard from '../../components/ProductCard/page';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function Shop() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gray-100 min-h-[200px] py-16 text-center flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-[#2B3467] mt-0 mb-4">Shop Our Collection</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">Discover all our premium footwear and accessories in one place.</p>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-4">All Products</h2>
            <div className="w-24 h-1.5 bg-rose-500 mx-auto my-4 rounded-full"></div>
            <p className="text-gray-500 mb-6">Browse our complete collection.</p>
          </div>
          <div className="flex flex-wrap justify-center -mx-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
