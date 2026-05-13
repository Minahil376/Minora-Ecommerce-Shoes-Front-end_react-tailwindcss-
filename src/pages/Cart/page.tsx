import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../App';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

const COUPONS: Record<string, number> = {
  SAVE10: 0.1,
  MINORA20: 0.2,
  WELCOME15: 0.15,
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, appliedDiscount, setAppliedDiscount } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponMsgColor, setCouponMsgColor] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * appliedDiscount;
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * 0.1;
  const shipping = discountedSubtotal > 50 ? 0 : 10;
  const total = discountedSubtotal + tax + shipping;

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponMsg('Please enter a coupon code.'); setCouponMsgColor('#e74c3c'); return; }
    if (COUPONS[code] !== undefined) {
      setAppliedDiscount(COUPONS[code]);
      setCouponMsg(`Coupon applied! ${COUPONS[code] * 100}% discount.`);
      setCouponMsgColor('#f43f5e');
      setCouponApplied(true);
    } else {
      setAppliedDiscount(0);
      setCouponMsg('Invalid coupon code. Try SAVE10, MINORA20 or WELCOME15.');
      setCouponMsgColor('#e74c3c');
    }
  }

  function handleCheckout() {
    if (cart.length === 0) { alert('Your cart is empty'); return; }
    alert('Thank you for your order! This is a demo — payment processing would happen here.');
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gray-100 min-h-[200px] py-16 text-center flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-[#2B3467] mt-0 mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">Review your items and proceed to checkout.</p>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">

          {/* Cart Table */}
          <div className="overflow-x-auto mb-12">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-8">
                <i className="fa-solid fa-shopping-bag text-6xl text-gray-500 mb-4 block"></i>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                <Link to="/shop" className="inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-white hover:text-rose-500 px-8 py-4 text-lg">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <table className="w-full border-collapse rounded-2xl overflow-hidden text-left">
                <thead className="bg-[#2B3467] text-white">
                  <tr>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase">Remove</th>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase">Image</th>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase">Product</th>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase text-center">Price</th>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase text-center">Quantity</th>
                    <th className="p-[18px_20px] text-[0.72rem] font-bold tracking-[0.1em] uppercase text-center">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 bg-white">
                      <td className="p-5 text-center align-middle">
                        <button title="Remove item" onClick={() => removeFromCart(item.id)} className="bg-transparent border-none cursor-pointer text-gray-500 text-[1.4rem] leading-none transition-colors duration-200 hover:text-rose-600">
                          <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                      </td>
                      <td className="p-5 align-middle">
                        <img src={`/images/${item.image}`} alt={item.title} className="w-20 h-20 object-contain rounded-xl p-1.5 block" />
                      </td>
                      <td className="p-5 align-middle">
                        <span className="font-semibold text-[#2B3467] block mb-1">{item.title}</span>
                        <span className="text-[0.8rem] text-gray-500">ID: #{item.id}</span>
                      </td>
                      <td className="p-5 text-center align-middle font-semibold text-gray-800">${item.price.toFixed(2)}</td>
                      <td className="p-5 text-center align-middle">
                        <div className="inline-flex items-center bg-[#eef0f3] rounded-xl p-1 gap-1">
                          <button className="w-9 h-9 bg-[#e2e5ea] border-none cursor-pointer text-gray-800 text-lg font-bold rounded-lg transition-colors duration-200 hover:bg-gray-300" onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}>&#8722;</button>
                          <input type="number" value={item.quantity} min={1} className="w-12 h-9 text-center border-none bg-white font-semibold text-gray-800 text-[0.95rem] rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.08)] outline-none" onChange={(e) => { const qty = parseInt(e.target.value); if (qty > 0) updateQuantity(item.id, qty); }} />
                          <button className="w-9 h-9 bg-[#e2e5ea] border-none cursor-pointer text-gray-800 text-lg font-bold rounded-lg transition-colors duration-200 hover:bg-gray-300" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td className="p-5 text-center align-middle font-bold text-rose-600">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Bottom Row ── side-by-side on desktop, stacked on mobile */}
          <div className="flex flex-row gap-8 items-start flex-nowrap max-lg:flex-wrap">

            {/* LEFT: Continue Shopping + Coupon — takes remaining space */}
            <div className="flex flex-col gap-5 flex-1 min-w-0">

              {/* Continue Shopping */}
              <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#2B3467] border border-gray-200 rounded-lg font-semibold no-underline text-sm shadow-sm w-fit transition-all duration-300 hover:bg-[#2B3467] hover:text-white hover:border-[#2B3467]">
                <i className="fa-solid fa-arrow-left text-xs"></i> Continue Shopping
              </Link>

              {/* Coupon card */}
              <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-gray-100">
                <h3 className="m-0 mb-5 text-xl font-extrabold text-rose-600">Apply Coupon</h3>
                <div className="flex items-stretch rounded-xl border border-gray-200 bg-gray-100 overflow-hidden">
                  <input
                    type="text"
                    placeholder="Enter Your Coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1 px-5 py-4 border-none bg-transparent text-[0.95rem] text-gray-600 outline-none placeholder:text-gray-400 min-w-0"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    className={`px-8 py-4 bg-rose-600 text-white border-none cursor-pointer text-base font-bold transition-all duration-200 whitespace-nowrap hover:bg-rose-500 shrink-0 ${couponApplied ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponMsg && (
                  <p className="mt-3 mb-0 text-[0.85rem]" style={{ color: couponMsgColor }}>{couponMsg}</p>
                )}
              </div>
            </div>

            {/* RIGHT: Order Summary — fixed width */}
            <div className="w-[440px] shrink-0 max-lg:w-full">
              <div className="bg-white rounded-2xl px-8 py-8 shadow-md">
                <h3 className="mt-0 mb-5 text-2xl font-extrabold text-[#2B3467]">Order Summary</h3>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-base">Subtotal</span>
                  <span className="font-bold text-base text-gray-800">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-base">Shipping <span className="font-semibold text-gray-700">(Standard)</span></span>
                  <span className={`font-bold text-base ${shipping === 0 ? 'text-rose-500' : 'text-gray-800'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-base">Tax (10%)</span>
                  <span className="font-bold text-base text-gray-800">${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-500 text-base">Discount</span>
                    <span className="font-bold text-base text-rose-500">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-5 pb-6">
                  <span className="text-xl font-extrabold text-[#2B3467]">Total</span>
                  <span className="text-2xl font-extrabold text-rose-600">${total.toFixed(2)}</span>
                </div>

                <button onClick={handleCheckout} className="w-full bg-[#2B3467] text-white px-4 py-4 rounded-xl font-bold text-base flex items-center justify-center transition-all duration-300 hover:bg-rose-600 cursor-pointer border-none">
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
