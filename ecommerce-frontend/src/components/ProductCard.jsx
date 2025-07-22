import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    setAdded(isInCart);
  }, [cartItems, product._id]);

  const handleAddToCart = async () => {
    if (!added && !isLoading) {
      setIsLoading(true);
      
      // Simulation d'un délai pour l'effet de chargement
      setTimeout(() => {
        addToCart({ ...product, quantity: 1 });
        setAdded(true);
        setIsLoading(false);
        setShowSuccess(true);
        
        // Masquer l'animation de succès après 2 secondes
        setTimeout(() => setShowSuccess(false), 2000);
      }, 500);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 }
  };

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Badge de succès animé */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-badge"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            ✨ Ajouté !
          </motion.div>
        )}
      </AnimatePresence>

      <div className="image-container">
        <motion.img
          src={product.image}
          alt={product.name}
          className="product-image"
          variants={imageVariants}
          whileHover="hover"
        />
        
        {/* Overlay avec effet de glassmorphism */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.button
                onClick={handleAddToCart}
                disabled={added || isLoading}
                className={`quick-view-btn ${added ? "added" : ""} ${isLoading ? "loading" : ""}`}
                whileHover={{ scale: added ? 1 : 1.05 }}
                whileTap={{ scale: added ? 1 : 0.95 }}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Ajout en cours...
                  </>
                ) : added ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      ✓
                    </motion.div>
                    Déjà ajouté
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.div>
                    Ajouter au panier
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicateur de prix en promotion */}
        {product.originalPrice && product.originalPrice > product.price && (
          <motion.div
            className="discount-badge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </motion.div>
        )}
      </div>

      <motion.div 
        className="product-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="product-name">{product.name}</h3>
        <div className="price-container">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">{product.originalPrice.toFixed(2)} €</span>
          )}
          <p className="product-price">{product.price.toFixed(2)} €</p>
        </div>
      </motion.div>

      <motion.div 
        className="buttons"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={handleAddToCart}
          disabled={added || isLoading}
          className={`add-btn ${added ? "added" : ""} ${isLoading ? "loading" : ""}`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Ajout...
            </>
          ) : added ? (
            <>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path 
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.polyline 
                  points="22 4 12 14.01 9 11.01"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.svg>
              Ajouté
            </>
          ) : (
            <>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </motion.svg>
              Ajouter
            </>
          )}
        </motion.button>

        <Link to="/cart" className="cart-link">
          <motion.button 
            className="cart-btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </motion.svg>
            Panier
          </motion.button>
        </Link>
      </motion.div>

      <style jsx>{`
        .card {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          width: 300px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
          margin: 0.75rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 25px 25px -12px rgba(0, 0, 0, 0.1);
        }

        .success-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          height: 220px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .discount-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .quick-view-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .quick-view-btn.added {
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: default;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }

        .quick-view-btn.loading {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          cursor: not-allowed;
        }

        .product-info {
          padding: 0 0.5rem;
          min-height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .product-name {
          font-size: 1.15rem;
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-weight: 700;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }

        .price-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .original-price {
          font-size: 1rem;
          color: #94a3b8;
          text-decoration: line-through;
          font-weight: 500;
        }

        .product-price {
          font-size: 1.4rem;
          color: #2563eb;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .add-btn, .cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .add-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .add-btn.added {
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: default;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .add-btn.loading {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          cursor: not-allowed;
        }

        .cart-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .cart-link {
          flex: 1;
          text-decoration: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Effet de brillance au survol */
        .add-btn:not(.added):not(.loading)::before,
        .cart-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .add-btn:not(.added):not(.loading):hover::before,
        .cart-btn:hover::before {
          left: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card {
            width: 280px;
            margin: 0.5rem;
          }

          .image-container {
            height: 200px;
          }

          .buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .cart-link {
            flex: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default ProductCard;