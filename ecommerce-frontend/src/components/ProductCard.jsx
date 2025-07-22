import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    setAdded(isInCart);
  }, [cartItems, product._id]);

  const handleAddToCart = () => {
    if (!added) {
      addToCart({ ...product, quantity: 1 });
      setAdded(true);
    }
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        {isHovered && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`quick-view-btn ${added ? "added" : ""}`}
            >
              {added ? "✓ Déjà ajouté" : "+ Ajouter au panier"}
            </button>
          </motion.div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price.toFixed(2)} €</p>
      </div>

      <div className="buttons">
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`add-btn ${added ? "added" : ""}`}
        >
          {added ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Ajouté
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Ajouter
            </>
          )}
        </button>

        <Link to="/cart" className="cart-link">
          <button className="cart-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Panier
          </button>
        </Link>
      </div>

      <style jsx>{`
        .card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem;
          text-align: center;
          width: 280px;
          background-color: #fff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
          margin: 0.5rem;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1rem;
          height: 200px;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-view-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quick-view-btn.added {
          background: #10b981;
          cursor: default;
        }

        .quick-view-btn:not(.added):hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .product-info {
          padding: 0 0.5rem;
          min-height: 80px;
        }

        .product-name {
          font-size: 1.1rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-price {
          font-size: 1.25rem;
          color: #3b82f6;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .add-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          background: #3b82f6;
          color: white;
        }

        .add-btn.added {
          background: #10b981;
          cursor: default;
        }

        .add-btn:not(.added):hover {
          background: #2563eb;
        }

        .cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          background: #10b981;
          color: white;
        }

        .cart-btn:hover {
          background: #059669;
        }

        .cart-link {
          flex: 1;
          text-decoration: none;
        }
      `}</style>
    </motion.div>
  );
}

export default ProductCard;