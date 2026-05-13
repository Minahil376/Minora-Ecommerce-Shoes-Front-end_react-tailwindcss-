import { useState } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

const inputCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const labelCls = "block font-semibold mb-2 text-[#2B3467]";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Login functionality is a demo.');
  }

  return (
    <>
      <section className="py-16 bg-gray-50 min-h-[calc(100vh-300px)] flex items-center justify-center">
        <div className="w-full max-w-[400px] mx-auto px-4">
          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-10">
            <div className="mb-4">
              <h1 className="text-3xl font-extrabold text-[#2B3467] m-0 mb-2">Welcome Back</h1>
              <p className="text-gray-600 m-0 text-sm">Sign in to your Minora account</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className={labelCls}>Email Address</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 font-medium">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-[18px] h-[18px] cursor-pointer accent-rose-600"
                  />
                  Remember me
                </label>
                <a href="#" className="text-rose-600 no-underline font-semibold hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-4 py-3 rounded-md font-bold text-base border-none cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(225,29,72,0.2)] hover:bg-rose-500"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6 text-gray-500 text-sm">
              <span className="flex-1 h-px bg-gray-200"></span>
              <span>Or</span>
              <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 px-4 py-2 text-base bg-white border border-gray-200 text-[#2B3467] cursor-pointer font-[inherit] hover:bg-[#2B3467] hover:text-white"
              >
                <i className="fa-brands fa-google"></i>
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 px-4 py-2 text-base bg-white border border-gray-200 text-[#2B3467] cursor-pointer font-[inherit] hover:bg-[#2B3467] hover:text-white"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm m-0">
                Don't have an account?{' '}
                <Link to="/signup" className="text-rose-600 font-bold no-underline hover:underline">Create one</Link>
              </p>
            </div>
          </div>

          {/* Features Below */}
          <div className="flex gap-6 text-center justify-between flex-nowrap mt-5">
            {[
              { icon: 'fa-truck-fast', title: 'Fast Shipping', desc: 'Delivered quickly' },
              { icon: 'fa-shield', title: 'Secure Payment', desc: '100% Protected' },
              { icon: 'fa-headset', title: '24/7 Support', desc: 'Always here to help' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex-1 min-w-0">
                <i className={`fa-solid ${icon} text-2xl text-[#2B3467] max-sm:text-2xl`}></i>
                <h4 className="text-sm font-bold text-[#2B3467] mb-0.5 mt-1 max-sm:text-xs">{title}</h4>
                <p className="text-xs text-gray-600 m-0 max-sm:text-[0.65rem]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
