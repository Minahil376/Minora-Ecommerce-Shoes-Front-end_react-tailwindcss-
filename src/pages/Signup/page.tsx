import { useState } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

const inputCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const labelCls = "block font-semibold mb-2 text-[#2B3467]";

export default function Signup() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms: false,
    subscribe: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match.');
      return;
    }
    alert('Account created! This is a demo.');
  }

  return (
    <>
      <section className="py-16 bg-gray-50 min-h-[calc(100vh-300px)] flex items-center justify-center">
        <div className="w-full max-w-[450px] mx-auto px-4">
          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-10">
            <div className="mb-4">
              <h1 className="text-3xl font-extrabold text-[#2B3467] m-0 mb-2">Create Account</h1>
              <p className="text-gray-600 m-0 text-sm">Join Minora and enjoy exclusive benefits</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {[
                { id: 'firstname', label: 'First Name', type: 'text', placeholder: 'Enter your first name', required: true },
                { id: 'lastname', label: 'Last Name', type: 'text', placeholder: 'Enter your last name', required: true },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', required: true },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', required: false },
                { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true },
                { id: 'confirm_password', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', required: true },
              ].map(({ id, label, type, placeholder, required }) => (
                <div key={id}>
                  <label htmlFor={id} className={labelCls}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    required={required}
                    value={form[id as keyof typeof form] as string}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
              ))}

              <div>
                <label className="flex items-center font-medium text-gray-600 gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    checked={form.terms}
                    onChange={handleChange}
                    className="w-[18px] h-[18px] cursor-pointer accent-rose-600"
                  />
                  I agree to the Terms &amp; Conditions
                </label>
              </div>

              <div>
                <label className="flex items-center font-medium text-gray-600 gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="subscribe"
                    checked={form.subscribe}
                    onChange={handleChange}
                    className="w-[18px] h-[18px] cursor-pointer accent-rose-600"
                  />
                  Subscribe to our newsletter for exclusive deals
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-4 py-3 rounded-md font-bold text-base border-none cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(225,29,72,0.2)] hover:bg-rose-500"
              >
                Create Account
              </button>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm m-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-rose-600 font-bold no-underline hover:underline">Sign In</Link>
                </p>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm text-center">
              Your information is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
