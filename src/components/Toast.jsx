import { useCart } from '../context/CartContext';
export default function Toast(){ const {notice}=useCart(); return notice ? <div className="toast" role="status">✓ {notice}</div> : null; }
