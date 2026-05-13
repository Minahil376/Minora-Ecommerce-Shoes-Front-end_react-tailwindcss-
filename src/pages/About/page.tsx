import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gray-100 min-h-[200px] py-16 text-center flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-[#2B3467] mt-0 mb-4">About Our Journey</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">We are a professional team crafting the ultimate shopping experience.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-100 min-h-[200px] py-16 flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center flex-wrap gap-14">
            <div className="flex-1 basis-1/2 min-w-[300px] pr-8">
              <h2 className="text-rose-600 text-3xl font-extrabold mt-0 mb-5">Who We Are?</h2>
              <p className="text-gray-600 leading-[1.8] mb-4">
                At Minora, footwear isn't just about what you wear — it's about how you move. We craft shoes that blend
                timeless design with modern comfort, creating styles that help you express confidence and individuality
                in every step. Each pair in our collection is built with care, using premium materials and expert
                craftsmanship to ensure both durability and style. From everyday essentials to standout statement
                pieces, we believe every shoe should tell your story. Our goal is to inspire confidence through designs
                that fit seamlessly into your lifestyle — comfortable, versatile, and effortlessly stylish. Because at
                Minora, footwear is more than a product; it's your identity, your energy, and your way to move through
                the world.
              </p>
            </div>
            <div className="flex-1 basis-1/2 flex justify-center min-w-[300px]">
              <img src="/images/about/about1.png" alt="Who We Are" className="w-full rounded-2xl object-cover max-h-[300px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-100 min-h-[200px] py-16 flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center flex-wrap gap-14">
            <div className="flex-1 basis-1/2 min-w-[300px] pr-8">
              <h2 className="text-rose-600 text-3xl font-extrabold mt-0 mb-5">Our Story</h2>
              <p className="text-gray-600 leading-[1.8] mb-4">
                Minora was born from a simple idea: to design shoes that feel as exceptional as they look. What began
                as a small passion project soon grew into a brand that celebrates individuality and effortless style.
                Each silhouette, material, and sole reflects our belief that true footwear should express confidence
                without saying a word. Over time, Minora has evolved into a community loved by those who value comfort,
                authenticity, and timeless design. Every collection is thoughtfully created to blend quality with
                simplicity, giving you pairs that move with your lifestyle and help you express your story through every
                stride.
              </p>
            </div>
            <div className="flex-1 basis-1/2 flex justify-center min-w-[300px]">
              <img src="/images/about/about2.jpg" alt="Our Story" className="w-full rounded-2xl object-cover max-h-[300px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-100 min-h-[200px] py-16 flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center flex-wrap gap-14">
            <div className="flex-1 basis-1/2 min-w-[300px] pr-8">
              <h2 className="text-rose-600 text-3xl font-extrabold mt-0 mb-5">Our Mission</h2>
              <p className="text-gray-600 leading-[1.8] mb-4">
                At Minora, our mission is to redefine everyday footwear by crafting shoes that inspire self-expression
                and confidence. We want every individual to feel comfortable, bold, and unique — because style is not
                just about what you wear, it's about how you feel with every step. From clean minimalist sneakers to
                versatile performance boots, Minora designs for every mood and moment. Our goal is to create footwear
                that empowers — shoes that make you look good, feel good, and walk confidently every day.
              </p>
            </div>
            <div className="flex-1 basis-1/2 flex justify-center min-w-[300px]">
              <img src="/images/about/about3.jpg" alt="Our Mission" className="w-full rounded-2xl object-cover max-h-[300px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Stores Table */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#2B3467] mt-0 mb-4">Our Global Stores</h2>
          <p className="text-gray-600 mb-4">Find us anywhere.</p>
          <div className="flex justify-center">
            <div className="w-full overflow-x-auto mt-5 bg-white rounded-xl shadow-sm">
              <table className="w-full border-collapse rounded-xl overflow-hidden text-left">
                <thead className="bg-[#2B3467] text-white">
                  <tr>
                    <th className="p-4 font-semibold">Location</th>
                    <th className="p-4 font-semibold">Address</th>
                    <th className="p-4 font-semibold">Contact Phone</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { loc: 'New York Flagship', addr: '123 Fashion Ave, NY 10001', phone: '(555) 123-4567', open: true },
                    { loc: 'London Boutique', addr: '45 Oxford St, London W1D 1DZ', phone: '+44 20 7123 4567', open: true },
                    { loc: 'Tokyo Hub', addr: 'Shinjuku City, Tokyo', phone: '+81 3 1234 5678', open: false },
                    { loc: 'Paris Showroom', addr: 'Champs-Élysées, Paris', phone: '+33 1 23 45 67 89', open: true },
                  ].map((row, i) => (
                    <tr
                      key={row.loc}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-rose-100 transition-colors`}
                    >
                      <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.loc}</td>
                      <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.addr}</td>
                      <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.phone}</td>
                      <td className={`p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px] ${row.open ? 'text-rose-600 font-extrabold' : 'text-gray-600'}`}>
                        {row.open ? 'Open' : 'Coming Soon'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
