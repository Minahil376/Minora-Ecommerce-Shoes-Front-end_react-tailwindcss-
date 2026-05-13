import { useState } from 'react';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

const inputCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const selectCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] bg-white transition-all duration-300 hover:border-gray-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const labelCls = "block font-semibold mb-2 text-[#2B3467]";

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: 'support',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Message sent! This is a demo.');
    setForm({ name: '', email: '', reason: 'support', message: '' });
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gray-100 min-h-[200px] py-16 text-center flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-[#2B3467] mt-0 mb-4">Get in Touch</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">We'd love to hear from you. Please fill out the form below.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-[600px] mx-auto bg-white p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className={labelCls}>Full Name</label>
                <input type="text" id="name" placeholder="John Doe" value={form.name} onChange={handleChange} className={inputCls} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className={labelCls}>Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" value={form.email} onChange={handleChange} className={inputCls} />
              </div>
              <div className="mb-3 relative w-full">
                <label htmlFor="reason" className={labelCls}>Reason for Contact</label>
                <select id="reason" value={form.reason} onChange={handleChange} className={selectCls}>
                  <option value="support">Customer Support</option>
                  <option value="returns">Returns &amp; Exchanges</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className={labelCls}>Message</label>
                <textarea
                  id="message"
                  placeholder="How can we help you today?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] min-h-[120px] resize-y transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-white hover:text-rose-500 px-8 py-4 text-lg border-none cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
