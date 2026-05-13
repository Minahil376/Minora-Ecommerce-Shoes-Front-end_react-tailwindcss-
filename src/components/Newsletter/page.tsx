import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Card: horizontal layout — text left, form right */}
        <div className="bg-gray-50 rounded-2xl px-10 py-12 flex flex-row flex-wrap items-center justify-between gap-6 border border-gray-100">

          {/* Left: text */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-3">
              Subscribe to our Newsletter
            </h2>
            <p className="m-0 text-base text-gray-500">
              Get updates on new drops, exclusive offers, and VIP sales.
            </p>
          </div>

          {/* Right: email input + button */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-xl border border-gray-200 px-3 py-2 gap-4 shadow-sm min-w-[490px]"
          >
            <i className="fa-regular fa-envelope text-gray-400 text-lg shrink-0"></i>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-none outline-none bg-transparent text-base text-gray-600 placeholder:text-gray-400 min-w-0 py-1"
            />
            <button
              type="submit"
              className="bg-[#2B3467] text-white px-6 py-2.5 rounded-lg font-bold text-base border-none cursor-pointer whitespace-nowrap transition-all duration-300 hover:bg-rose-500 shrink-0"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
