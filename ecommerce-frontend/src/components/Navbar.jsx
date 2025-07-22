import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="nav">
      <NavLink to="/" className="logo">
        LOGO
      </NavLink>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
            Panier
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
            Connexion
          </NavLink>
        </li>
      </ul>

      <style jsx>{`
        .nav {
          transition: all 0.3s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 10vh;
          padding: 0 5%;
          background: rgba(37, 99, 235, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(147, 197, 253, 0.4);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          text-decoration: none;
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .nav-links li a:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.15);
        }

        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-links li a:hover::after {
          width: 70%;
        }

        .nav-links li a.active {
          background-color: rgba(255, 255, 255, 0.2);
          font-weight: 600;
        }

        .nav-links li a.active::after {
          width: 70%;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          letter-spacing: -0.025em;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .logo:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .cart-badge {
          background-color: #ff3b30;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 1.25rem;
          height: 1.25rem;
          margin-left: 0.3rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
