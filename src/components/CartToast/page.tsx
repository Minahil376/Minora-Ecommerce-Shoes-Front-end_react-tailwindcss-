import { useCart } from '../../App';

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] bg-[#2B3467] text-white px-5 py-3 rounded-lg text-[0.9rem] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-opacity duration-300 pointer-events-none opacity-100">
      {toast}
    </div>
  );
}
