import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function Navbar() {
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="nav">
      <NavLink to="/" className="logo">
        <span className="logo-icon">L</span>
        <span className="logo-text">LOGO</span>
      </NavLink>

      {/* Menu hamburger pour mobile */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">ℹ️</span>
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🛒</span>
            Panier
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">👤</span>
            Connexion
          </NavLink>
        </li>
      </ul>

      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          padding: 0 5%;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(147, 197, 253, 0.3);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.025em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0.5rem;
          border-radius: 12px;
        }

        .logo:hover {
          transform: translateY(-2px) scale(1.05);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          border-radius: 10px;
          font-weight: 900;
          font-size: 1.2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo-text {
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          list-style: none;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          position: relative;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          backdrop-filter: blur(10px);
        }

        .nav-links li a:hover {
          color: white;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .nav-links li a.active {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
          color: white;
          font-weight: 700;
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
        }

        .nav-links li a::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nav-links li a:hover::before {
          opacity: 1;
        }

        .nav-icon {
          font-size: 1.1rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .cart-badge {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 50px;
          padding: 0.25rem 0.5rem;
          min-width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.5rem;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
          animation: pulse 2s infinite;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav {
            padding: 0 4%;
            height: 60px;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 60px;
            right: -100%;
            width: 280px;
            height: calc(100vh - 60px);
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.98) 0%, rgba(59, 130, 246, 0.98) 100%);
            backdrop-filter: blur(20px);
            flex-direction: column;
            gap: 0;
            padding: 2rem 0;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-left: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          }

          .nav-links.mobile-open {
            right: 0;
          }

          .nav-links li {
            width: 100%;
            padding: 0 1.5rem;
          }

          .nav-links li a {
            width: 100%;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            justify-content: flex-start;
            font-size: 1.1rem;
          }

          .logo-text {
            display: none;
          }

          .logo-icon {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav {
            padding: 0 3%;
          }

          .nav-links {
            width: 100vw;
            right: -100vw;
          }

          .nav-links.mobile-open {
            right: 0;
          }
        }

        /* Animation pour le menu hamburger */
        .mobile-open + .mobile-menu-toggle span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-open + .mobile-menu-toggle span:nth-child(2) {
          opacity: 0;
        }

        .mobile-open + .mobile-menu-toggle span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Effet de glassmorphism amélioré */
        @supports (backdrop-filter: blur(12px)) {
          .nav {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%);
          }
        }

        /* Animation d'entrée pour les éléments de navigation */
        .nav-links li {
          animation: slideInFromRight 0.6s ease-out;
          animation-fill-mode: both;
        }

        .nav-links li:nth-child(1) { animation-delay: 0.1s; }
        .nav-links li:nth-child(2) { animation-delay: 0.2s; }
        .nav-links li:nth-child(3) { animation-delay: 0.3s; }
        .nav-links li:nth-child(4) { animation-delay: 0.4s; }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Effet de survol amélioré pour le logo */
        .logo::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.6s ease;
          pointer-events: none;
        }

        .logo:hover::after {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;