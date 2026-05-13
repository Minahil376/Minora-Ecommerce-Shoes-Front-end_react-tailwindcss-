import { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PRIMARY = '#2B3467';
const SECONDARY = '#e11d48';
const THIRD = '#f43f5e';
const FOURTH = '#fecdd3';

const barData = { labels: months, datasets: [{ label: 'Stock Added', data: [200,180,220,260,300,280,310,290,340,320,380,400], backgroundColor: PRIMARY, borderRadius: 4 }, { label: 'Stock Sold', data: [150,160,190,230,270,250,280,260,300,290,350,370], backgroundColor: SECONDARY, borderRadius: 4 }] };
const doughnutData = { labels: ["Men's Footwear","Women's Footwear","Kids' Footwear",'Accessories'], datasets: [{ data: [45,35,12,8], backgroundColor: [PRIMARY,SECONDARY,THIRD,FOURTH], borderWidth: 2, borderColor: '#ffffff' }] };
const lineData = { labels: months, datasets: [{ label: 'Revenue ($)', data: [13500,12000,17000,13000,19500,18000,17500,20500,20000,23500,22500,28500], borderColor: PRIMARY, backgroundColor: 'rgba(43,52,103,0.12)', fill: true, tension: 0.4, pointBackgroundColor: PRIMARY, pointBorderColor: '#ffffff', pointBorderWidth: 2, pointRadius: 4 }] };

const stockRecords = [
  { id: 1, name: 'Premium Running Shoe', category: "Men's Footwear", sku: 'MF-001', qty: 120, price: '$129.99', status: 'In Stock' },
  { id: 2, name: 'Classic Comfort Sneaker', category: "Men's Footwear", sku: 'MF-002', qty: 85, price: '$79.99', status: 'In Stock' },
  { id: 3, name: "Women's Open Toe Heels", category: "Women's Footwear", sku: 'WF-001', qty: 8, price: '$124.99', status: 'Low Stock' },
  { id: 4, name: 'Sport Athletic Shoe', category: "Men's Footwear", sku: 'MF-003', qty: 0, price: '$109.99', status: 'Out of Stock' },
  { id: 5, name: "Women's Classic Party Heels", category: "Women's Footwear", sku: 'WF-002', qty: 67, price: '$99.99', status: 'In Stock' },
  { id: 6, name: 'Outdoor Adventure Boot', category: "Men's Footwear", sku: 'MF-008', qty: 45, price: '$149.99', status: 'In Stock' },
];

const inputCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const selectCls = "w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] bg-white transition-all duration-300 hover:border-gray-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]";
const labelCls = "block font-semibold mb-2 text-[#2B3467]";
const sectionCls = "py-16 bg-gray-50 border-b border-gray-100";
const containerCls = "max-w-7xl mx-auto px-4";
const headingCls = "text-3xl font-extrabold text-[#2B3467] mt-0 mb-4";
const subTextCls = "text-gray-500 mb-6";
const dividerCls = "w-24 h-1.5 bg-rose-500 mx-auto my-4 rounded-full";
const primaryBtnCls = "w-full mt-4 bg-[#2B3467] text-white px-4 py-2 rounded-md font-bold text-sm flex items-center justify-center gap-1 transition-all duration-300 hover:bg-rose-600 cursor-pointer border-none";

export default function Dashboard() {
  const stockTableRef = useRef<HTMLElement>(null);
  const insertRef = useRef<HTMLElement>(null);
  const updateRef = useRef<HTMLElement>(null);
  const deleteRef = useRef<HTMLElement>(null);

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gray-100 min-h-[200px] py-16 text-center flex flex-col items-center justify-center">
        <div className={containerCls}>
          <h1 className="text-5xl font-extrabold text-[#2B3467] mt-0 mb-4">Stock Dashboard</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">Manage your inventory — view, insert, update and delete stock records.</p>
        </div>
      </section>

      {/* KPI Stats Row */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <div className="flex gap-6 text-center justify-between flex-nowrap max-lg:gap-4 max-md:gap-3 max-sm:gap-2 max-sm:mt-5">
            {[
              { icon: 'fa-boxes-stacked', val: '1,240', label: 'Total Items' },
              { icon: 'fa-circle-check', val: '980', label: 'In Stock' },
              { icon: 'fa-triangle-exclamation', val: '48', label: 'Low Stock' },
              { icon: 'fa-ban', val: '12', label: 'Out of Stock' },
              { icon: 'fa-dollar-sign', val: '$84,320', label: 'Stock Value' },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex-1 min-w-0 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl mx-auto mb-2">
                  <i className={`fa-solid ${icon}`}></i>
                </div>
                <h4 className="text-base font-bold text-[#2B3467] mb-0 mt-0 max-sm:text-xs">{val}</h4>
                <p className="text-sm text-gray-600 m-0 max-sm:text-[0.65rem]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stock Action Cards */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Stock Management</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Perform all stock operations from one place.</p>
          </div>
          <div className="flex flex-wrap justify-center -mx-3">
            {[
              { icon: 'fa-eye', title: 'View All Stock', desc: 'Browse the complete inventory list with filters and search.', ref: stockTableRef, btnLabel: 'View Stock' },
              { icon: 'fa-plus', title: 'Insert New Stock', desc: 'Add a new product or restock an existing item to inventory.', ref: insertRef, btnLabel: 'Add Stock' },
              { icon: 'fa-pen-to-square', title: 'Update Stock', desc: 'Edit product details, pricing, or quantity for existing items.', ref: updateRef, btnLabel: 'Update Stock' },
              { icon: 'fa-trash', title: 'Delete Stock', desc: 'Remove discontinued or expired items from the inventory.', ref: deleteRef, btnLabel: 'Delete Stock' },
            ].map(({ icon, title, desc, ref, btnLabel }) => (
              <div key={title} className="flex-none w-full sm:w-1/2 lg:w-1/4 px-3 mb-8 flex justify-center">
                <div className="group flex flex-col w-full h-80 bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <div className="h-[150px] p-4 bg-white border-b border-gray-100 flex items-center justify-center">
                    <i className={`fa-solid ${icon} fa-3x text-[#2B3467]`}></i>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#2B3467] mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 m-0">{desc}</p>
                    <button className={primaryBtnCls} onClick={() => scrollTo(ref)}>
                      <i className={`fa-solid ${icon}`}></i> {btnLabel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Quick Links</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Jump to any section of the dashboard instantly.</p>
          </div>
          <div className="flex items-center bg-white rounded-[40px] px-10 py-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] justify-between flex-wrap gap-4">
            {[
              { icon: 'fa-chart-line', title: 'Sales Analytics', href: '#charts-section', desc: 'View graphical reports' },
              { icon: 'fa-table-list', title: 'Stock Table', href: '#stock-table-section', desc: 'Full inventory records' },
              { icon: 'fa-file-export', title: 'Export Report', href: '#', desc: 'Download CSV / PDF' },
              { icon: 'fa-bell', title: 'Alerts', href: '#', desc: 'Low stock notifications' },
              { icon: 'fa-gear', title: 'Settings', href: '#', desc: 'Configure dashboard' },
            ].map(({ icon, title, href, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                  <i className={`fa-solid ${icon}`}></i>
                </div>
                <div>
                  <h4 className="m-0 text-[#2B3467] font-bold text-base">
                    <a href={href} className="text-[#2B3467] no-underline hover:text-rose-600 transition-colors">{title}</a>
                  </h4>
                  <p className="m-0 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className={sectionCls} id="charts-section">
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Stock Analytics</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Graphical overview of your inventory and sales performance.</p>
          </div>
          <div className="flex items-center flex-wrap gap-14 mb-8">
            <div className="flex-1 basis-1/2 min-w-[300px] pr-8">
              <h3 className="text-lg font-bold text-[#2B3467] mb-1">Monthly Stock Movement</h3>
              <p className="text-gray-600 mb-4">Units added vs units sold per month.</p>
              <Bar data={barData} />
            </div>
            <div className="flex-1 basis-1/2 flex justify-center min-w-[300px]">
              <div>
                <h3 className="text-lg font-bold text-[#2B3467] mb-1">Stock by Category</h3>
                <p className="text-gray-600 mb-4">Distribution across product categories.</p>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl px-16 py-8 flex flex-wrap items-center shadow-xs border border-gray-100 mb-6">
            <div className="flex-1 basis-1/2 min-w-[300px] mb-6">
              <h3 className="text-lg font-bold text-[#2B3467] mb-1">Revenue Trend</h3>
              <p className="text-gray-600 m-0">Monthly revenue generated from stock sales over the year.</p>
            </div>
            <div className="flex-1 basis-1/2 min-w-[300px] flex justify-end">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-200 text-rose-600 text-sm font-bold uppercase">2026 Data</span>
            </div>
          </div>
          <Line data={lineData} />
        </div>
      </section>

      {/* Stock Table Section */}
      <section className={sectionCls} id="stock-table-section" ref={stockTableRef}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>All Stock Records</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Complete inventory database with all product details.</p>
          </div>
          <div className="w-full overflow-x-auto mt-5 bg-white rounded-xl shadow-sm">
            <table className="w-full border-collapse rounded-xl overflow-hidden text-left">
              <thead className="bg-[#2B3467] text-white">
                <tr>
                  {['#','Product Name','Category','SKU','Qty','Price','Status','Actions'].map(h => (
                    <th key={h} className="p-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stockRecords.map((row, i) => (
                  <tr key={row.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-rose-100 transition-colors`}>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.id}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.name}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.category}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.sku}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.qty}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">{row.price}</td>
                    <td className={`p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px] ${row.status === 'In Stock' ? 'text-rose-600 font-extrabold' : 'text-gray-600'}`}>{row.status}</td>
                    <td className="p-4 whitespace-nowrap">
                      <button className="inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 hover:bg-white hover:text-rose-500 px-4 py-2 text-sm shadow-sm mr-1 border-none cursor-pointer">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 px-4 py-2 text-sm bg-transparent border border-[#2B3467] text-[#2B3467] hover:bg-[#2B3467] hover:text-white cursor-pointer">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insert New Stock */}
      <section className={sectionCls} id="insert-section" ref={insertRef}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Insert New Stock</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Add a new product to the inventory database.</p>
          </div>
          <div className="max-w-[600px] mx-auto bg-white p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock inserted! (demo)'); }}>
              <div className="mb-3"><label className={labelCls}>Product Name</label><input type="text" placeholder="e.g. Premium Running Shoe" className={inputCls} /></div>
              <div className="mb-3">
                <label className={labelCls}>Category</label>
                <div className="relative w-full">
                  <select className={selectCls}>
                    <option>Men's Footwear</option><option>Women's Footwear</option><option>Kids' Footwear</option><option>Accessories</option>
                  </select>
                </div>
              </div>
              <div className="mb-3"><label className={labelCls}>SKU</label><input type="text" placeholder="e.g. MF-001" className={inputCls} /></div>
              <div className="mb-3"><label className={labelCls}>Quantity</label><input type="number" placeholder="e.g. 100" className={inputCls} /></div>
              <div className="mb-3"><label className={labelCls}>Price ($)</label><input type="number" placeholder="e.g. 129.99" className={inputCls} /></div>
              <div className="mb-3">
                <label className={labelCls}>Description</label>
                <textarea placeholder="Brief product description..." className="w-full px-3 py-3 border border-gray-200 rounded-md font-[inherit] min-h-[120px] resize-y transition-all duration-300 focus:outline-none focus:border-rose-600 focus:shadow-[0_0_0_2px_#fecdd3]"></textarea>
              </div>
              <button type="submit" className={primaryBtnCls}><i className="fa-solid fa-plus"></i> Insert Stock</button>
            </form>
          </div>
        </div>
      </section>

      {/* Update Stock */}
      <section className={sectionCls} id="update-section" ref={updateRef}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Update Stock</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Search for a product by SKU or name and update its details.</p>
          </div>
          <div className="max-w-[600px] mx-auto bg-white p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock updated! (demo)'); }}>
              <div className="mb-3"><label className={labelCls}>Search by SKU or Product Name</label><input type="text" placeholder="e.g. MF-001 or Premium Running Shoe" className={inputCls} /></div>
              <div className="mb-3"><label className={labelCls}>New Quantity</label><input type="number" placeholder="Enter updated quantity" className={inputCls} /></div>
              <div className="mb-3"><label className={labelCls}>New Price ($)</label><input type="number" placeholder="Enter updated price" className={inputCls} /></div>
              <div className="mb-3">
                <label className={labelCls}>Stock Status</label>
                <div className="relative w-full">
                  <select className={selectCls}><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
                </div>
              </div>
              <button type="submit" className={primaryBtnCls}><i className="fa-solid fa-pen-to-square"></i> Update Stock</button>
            </form>
          </div>
        </div>
      </section>

      {/* Delete Stock */}
      <section className={sectionCls} id="delete-section" ref={deleteRef}>
        <div className={containerCls}>
          <div className="text-center mb-12">
            <h2 className={headingCls}>Delete Stock</h2>
            <div className={dividerCls}></div>
            <p className={subTextCls}>Remove a product from the inventory. This action cannot be undone.</p>
          </div>
          <div className="max-w-[600px] mx-auto bg-white p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock deleted! (demo)'); }}>
              <div className="mb-3"><label className={labelCls}>Search by SKU or Product Name</label><input type="text" placeholder="e.g. MF-001 or Premium Running Shoe" className={inputCls} /></div>
              <div className="mb-3"><label className={labelCls}>Confirm Product Name</label><input type="text" placeholder="Re-enter product name to confirm" className={inputCls} /></div>
              <button type="submit" className={primaryBtnCls}><i className="fa-solid fa-trash"></i> Delete Stock</button>
            </form>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-[#2B3467] py-20 px-4 text-center text-white">
        <div className={containerCls}>
          <h2 className="text-white text-[3rem] font-extrabold mb-4 mt-0">Keep Your Inventory Updated</h2>
          <p className="text-blue-200 text-2xl max-w-3xl mx-auto mb-8">Regular stock audits help prevent overselling and improve customer satisfaction.</p>
          <a href="#stock-table-section" className="inline-flex items-center justify-center font-bold bg-rose-600 text-white rounded-md transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-white hover:text-rose-500 px-8 py-4 text-lg no-underline">
            Go to Stock Table
          </a>
        </div>
      </section>

      <Newsletter />

      {/* Dashboard Footer */}
      <footer className="bg-gray-50 pt-12 pb-6 border-t border-gray-200">
        <div className={containerCls}>
          <div className="flex flex-wrap -mx-3 mb-12">
            <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
              <Link to="/" className="block mb-4 h-12"><img src="/images/Minoralogo3 .png" alt="Minora" className="h-12 object-contain" /></Link>
              <p className="text-gray-500 text-sm">Elevating everyday lifestyle with premium footwear, apparel, and accessories. Experience absolute comfort, anywhere.</p>
              <div className="flex gap-2 mt-2">
                {['fa-facebook-f','fa-twitter','fa-instagram'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 transition-all duration-300 hover:bg-rose-500 hover:text-white">
                    <i className={`fa-brands ${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
              <h3 className="text-base font-bold text-[#2B3467] mb-6">Quick Links</h3>
              <ul className="list-none p-0 m-0">
                {[{to:'/',l:'Home'},{to:'/shop',l:'Shop All'},{to:'/about',l:'About Us'},{to:'/login',l:'Login'}].map(({to,l}) => (
                  <li key={to}><Link to={to} className="text-gray-600 text-sm block mb-3 transition-colors duration-300 hover:text-rose-600"><i className="fa-solid fa-angle-right text-[10px] mr-2"></i>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
              <h3 className="text-base font-bold text-[#2B3467] mb-6">Dashboard</h3>
              <ul className="list-none p-0 m-0">
                {[{href:'#stock-table-section',l:'View Stock'},{href:'#insert-section',l:'Insert Stock'},{href:'#update-section',l:'Update Stock'},{href:'#delete-section',l:'Delete Stock'}].map(({href,l}) => (
                  <li key={l}><a href={href} className="text-gray-600 text-sm block mb-3 transition-colors duration-300 hover:text-rose-600"><i className="fa-solid fa-angle-right text-[10px] mr-2"></i>{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="px-3 flex-1 basis-[25%] min-w-[200px]">
              <h3 className="text-base font-bold text-[#2B3467] mb-6">Get in Touch</h3>
              <ul className="list-none p-0 m-0 text-gray-600 text-sm">
                <li className="mb-4 relative pl-6"><i className="fa-solid fa-location-dot text-rose-500 absolute left-0 top-1"></i>123 Fashion Blvd, Suite 400<br />New York, NY 10012, USA</li>
                <li className="mb-4 relative pl-6"><i className="fa-solid fa-phone text-rose-500 absolute left-0 top-1"></i>+1 (800) 123-4567</li>
                <li className="mb-4 relative pl-6"><i className="fa-solid fa-envelope text-rose-500 absolute left-0 top-1"></i>support@minora.com</li>
              </ul>
            </div>
          </div>
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
    </>
  );
}
