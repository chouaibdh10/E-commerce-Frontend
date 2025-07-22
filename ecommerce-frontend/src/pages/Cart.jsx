import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [removingItems, setRemovingItems] = useState(new Set());

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = async (itemId) => {
    setRemovingItems(prev => new Set([...prev, itemId]));
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 300);
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    padding: "2rem",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    overflow: "hidden"
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    color: "white",
    padding: "2rem",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const contentStyle = {
    padding: "2rem"
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "#64748b"
  };

  const emptyIconStyle = {
    fontSize: "4rem",
    marginBottom: "1rem",
    opacity: "0.5"
  };

  const itemStyle = {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden"
  };

  const itemHoverStyle = {
    ...itemStyle,
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    borderColor: "#cbd5e1"
  };

  const itemHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem"
  };

  const itemNameStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0"
  };

  const itemPriceStyle = {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#2563eb",
    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "1px solid #93c5fd"
  };

  const quantityControlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem"
  };

  const quantityButtonStyle = {
    width: "40px",
    height: "40px",
    border: "2px solid #e2e8f0",
    background: "white",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#475569",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const quantityButtonHoverStyle = {
    ...quantityButtonStyle,
    borderColor: "#2563eb",
    color: "#2563eb",
    transform: "scale(1.1)"
  };

  const quantityDisplayStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#1e293b",
    minWidth: "3rem",
    textAlign: "center",
    background: "#f1f5f9",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0"
  };

  const removeButtonStyle = {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
  };

  const removeButtonHoverStyle = {
    ...removeButtonStyle,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)"
  };

  const totalSectionStyle = {
    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
    padding: "2rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    marginTop: "2rem",
    textAlign: "center"
  };

  const totalStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 1.5rem 0"
  };

  const checkoutButtonStyle = {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)",
    textDecoration: "none",
    display: "inline-block"
  };

  const checkoutButtonHoverStyle = {
    ...checkoutButtonStyle,
    transform: "translateY(-3px)",
    boxShadow: "0 12px 35px rgba(37, 99, 235, 0.4)"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>🛒 Mon Panier</h2>
        </div>

        <div style={contentStyle}>
          {cartItems.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>🛒</div>
              <h3 style={{ color: "#64748b", marginBottom: "1rem" }}>
                Votre panier est vide
              </h3>
              <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <Link 
                to="/" 
                style={{
                  ...checkoutButtonStyle,
                  background: "linear-gradient(135deg, #10b981, #059669)"
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(16, 185, 129, 0.4)"
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)"
                  });
                }}
              >
                Continuer mes achats
              </Link>
            </div>
          ) : (
            <>
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      ...itemStyle,
                      opacity: removingItems.has(item._id) ? 0.5 : 1,
                      transform: removingItems.has(item._id) ? 'scale(0.95)' : 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!removingItems.has(item._id)) {
                        Object.assign(e.currentTarget.style, itemHoverStyle);
                      }
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, itemStyle);
                    }}
                  >
                    <div style={itemHeaderStyle}>
                      <h3 style={itemNameStyle}>{item.name}</h3>
                      <div style={itemPriceStyle}>{item.price} €</div>
                    </div>

                    <div style={quantityControlsStyle}>
                      <span style={{ color: "#64748b", fontWeight: "500" }}>
                        Quantité :
                      </span>
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        style={quantityButtonStyle}
                        onMouseEnter={(e) => {
                          Object.assign(e.target.style, quantityButtonHoverStyle);
                        }}
                        onMouseLeave={(e) => {
                          Object.assign(e.target.style, quantityButtonStyle);
                        }}
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span style={quantityDisplayStyle}>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        style={quantityButtonStyle}
                        onMouseEnter={(e) => {
                          Object.assign(e.target.style, quantityButtonHoverStyle);
                        }}
                        onMouseLeave={(e) => {
                          Object.assign(e.target.style, quantityButtonStyle);
                        }}
                      >
                        +
                      </button>
                      <div style={{ marginLeft: "auto" }}>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          style={removeButtonStyle}
                          onMouseEnter={(e) => {
                            Object.assign(e.target.style, removeButtonHoverStyle);
                          }}
                          onMouseLeave={(e) => {
                            Object.assign(e.target.style, removeButtonStyle);
                          }}
                          disabled={removingItems.has(item._id)}
                        >
                          {removingItems.has(item._id) ? "Suppression..." : "🗑️ Supprimer"}
                        </button>
                      </div>
                    </div>

                    <div style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      textAlign: "right",
                      marginTop: "1rem",
                      fontWeight: "500"
                    }}>
                      Sous-total : <strong style={{ color: "#2563eb" }}>
                        {(item.price * item.quantity).toFixed(2)} €
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div style={totalSectionStyle}>
                <h3 style={totalStyle}>
                  Total : {total.toFixed(2)} €
                </h3>
                <div style={{
                  color: "#64748b",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem"
                }}>
                  Livraison gratuite pour les commandes de plus de 50€
                </div>
                <Link 
                  to="/checkout" 
                  style={checkoutButtonStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, checkoutButtonHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, checkoutButtonStyle);
                  }}
                >
                  🚀 Passer à la commande
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;