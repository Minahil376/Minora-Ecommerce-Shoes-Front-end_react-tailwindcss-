import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid */}
        <div className="flex flex-wrap -mx-3 mb-12">
          {/* Brand */}
          <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
            <Link to="/" className="block mb-4 h-12">
              <img src="/images/Minoralogo3 .png" alt="Minora" className="h-12 object-contain" />
            </Link>
            <p className="text-gray-500 text-sm">
              Elevating everyday lifestyle with premium footwear, apparel, and
              accessories. Experience absolute comfort, anywhere.
            </p>
            <div className="flex gap-2 mt-2">
              {['fa-facebook-f', 'fa-twitter', 'fa-instagram'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 transition-all duration-300 hover:bg-rose-500 hover:text-white"
                >
                  <i className={`fa-brands ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
            <h3 className="text-base font-bold text-[#2B3467] mb-6">Quick Links</h3>
            <ul className="list-none p-0 m-0">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop All' },
                { to: '/about', label: 'About Us' },
                { to: '/login', label: 'Login' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-600 text-sm block mb-3 transition-colors duration-300 hover:text-rose-600"
                  >
                    <i className="fa-solid fa-angle-right text-[10px] mr-2"></i>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
            <h3 className="text-base font-bold text-[#2B3467] mb-6">Customer Care</h3>
            <ul className="list-none p-0 m-0">
              {['My Account', 'Order Tracking', 'Return Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 text-sm block mb-3 transition-colors duration-300 hover:text-rose-600"
                  >
                    <i className="fa-solid fa-angle-right text-[10px] mr-2"></i>{item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
            <h3 className="text-base font-bold text-[#2B3467] mb-6">Get in Touch</h3>
            <ul className="list-none p-0 m-0 text-gray-600 text-sm">
              <li className="mb-4 relative pl-6">
                <i className="fa-solid fa-location-dot text-rose-500 absolute left-0 top-1"></i>
                123 Fashion Blvd, Suite 400<br />New York, NY 10012, USA
              </li>
              <li className="mb-4 relative pl-6">
                <i className="fa-solid fa-phone text-rose-500 absolute left-0 top-1"></i>
                +1 (800) 123-4567
              </li>
              <li className="mb-4 relative pl-6">
                <i className="fa-solid fa-envelope text-rose-500 absolute left-0 top-1"></i>
                support@minora.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-8">
          <p className="m-0 text-gray-500 text-sm">&copy; 2026 Minora Store. All rights reserved.</p>
          <div className="flex gap-3 text-2xl text-gray-500">
            <i className="fa-brands fa-cc-visa hover:text-[#2B3467] cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-cc-mastercard hover:text-[#2B3467] cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-cc-paypal hover:text-[#2B3467] cursor-pointer transition-colors"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
