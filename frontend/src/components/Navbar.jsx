import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">E-Shop</Link>

      <Link
        to="/cart"
        className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
      >
        Cart 
      </Link>
    </nav>
  );
}
