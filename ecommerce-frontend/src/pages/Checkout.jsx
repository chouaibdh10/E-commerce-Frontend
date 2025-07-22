import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Formulaire de livraison
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France"
  });

  // Informations de paiement
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "card"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
    // Rediriger si le panier est vide
    if (cartItems.length === 0 && !orderComplete) {
      navigate("/cart");
    }
  }, [cartItems, navigate, orderComplete]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.2; // TVA 20%
  const finalTotal = total + shipping + tax;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!shippingInfo.firstName) newErrors.firstName = "Prénom requis";
      if (!shippingInfo.lastName) newErrors.lastName = "Nom requis";
      if (!shippingInfo.email) newErrors.email = "Email requis";
      if (!shippingInfo.address) newErrors.address = "Adresse requise";
      if (!shippingInfo.city) newErrors.city = "Ville requise";
      if (!shippingInfo.postalCode) newErrors.postalCode = "Code postal requis";
    }

    if (step === 2) {
      if (!paymentInfo.cardNumber) newErrors.cardNumber = "Numéro de carte requis";
      if (!paymentInfo.expiryDate) newErrors.expiryDate = "Date d'expiration requise";
      if (!paymentInfo.cvv) newErrors.cvv = "CVV requis";
      if (!paymentInfo.cardName) newErrors.cardName = "Nom sur la carte requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);

    // Simulation du traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      setCurrentStep(3);
    }, 3000);
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem"
  };

  const mainContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "3rem",
    alignItems: "start"
  };

  const leftColumnStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "2.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  };

  const rightColumnStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "2.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    position: "sticky",
    top: "2rem",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"
  };

  const stepIndicatorStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "3rem",
    gap: "1rem"
  };

  const stepStyle = (stepNumber) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    fontSize: "1.2rem",
    fontWeight: "700",
    background: stepNumber <= currentStep 
      ? "linear-gradient(135deg, #2563eb, #3b82f6)" 
      : "#e2e8f0",
    color: stepNumber <= currentStep ? "white" : "#64748b",
    transition: "all 0.3s ease",
    position: "relative"
  });

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    background: "#f8fafc",
    boxSizing: "border-box"
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#2563eb",
    boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.1)",
    background: "white"
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: "#ef4444",
    boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.1)"
  };

  const buttonStyle = {
    padding: "14px 28px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "#f1f5f9",
    color: "#475569",
    border: "2px solid #e2e8f0"
  };

  const errorStyle = {
    color: "#ef4444",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    fontWeight: "500"
  };

  if (orderComplete) {
    return (
      <div style={containerStyle}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          background: "white",
          borderRadius: "20px",
          padding: "4rem 2rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>🎉</div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#1e293b",
            marginBottom: "1rem"
          }}>
            Commande confirmée !
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "#64748b",
            marginBottom: "2rem"
          }}>
            Merci pour votre commande ! Vous recevrez un email de confirmation sous peu.
          </p>
          <div style={{
            background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            padding: "1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            border: "1px solid #93c5fd"
          }}>
            <p style={{ color: "#1e40af", fontWeight: "600", margin: 0 }}>
              📧 Un email de suivi vous sera envoyé à : {shippingInfo.email}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{
              ...primaryButtonStyle,
              fontSize: "1.1rem",
              padding: "16px 32px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
            }}
          >
            🏠 Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Colonne principale */}
        <div style={leftColumnStyle}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#1e293b",
            marginBottom: "2rem",
            textAlign: "center"
          }}>
            🛒 Finaliser la commande
          </h1>

          {/* Indicateur d'étapes */}
          <div style={stepIndicatorStyle}>
            <div style={stepStyle(1)}>1</div>
            <div style={{
              width: "50px",
              height: "2px",
              background: currentStep > 1 ? "#2563eb" : "#e2e8f0",
              alignSelf: "center"
            }}></div>
            <div style={stepStyle(2)}>2</div>
            <div style={{
              width: "50px",
              height: "2px",
              background: currentStep > 2 ? "#2563eb" : "#e2e8f0",
              alignSelf: "center"
            }}></div>
            <div style={stepStyle(3)}>✓</div>
          </div>

          {/* Étape 1: Informations de livraison */}
          {currentStep === 1 && (
            <div>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "2rem"
              }}>
                📦 Informations de livraison
              </h2>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    style={errors.firstName ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.firstName ? inputErrorStyle : inputStyle)}
                  />
                  {errors.firstName && <div style={errorStyle}>⚠️ {errors.firstName}</div>}
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    style={errors.lastName ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.lastName ? inputErrorStyle : inputStyle)}
                  />
                  {errors.lastName && <div style={errorStyle}>⚠️ {errors.lastName}</div>}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                  style={errors.email ? inputErrorStyle : inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, errors.email ? inputErrorStyle : inputStyle)}
                />
                {errors.email && <div style={errorStyle}>⚠️ {errors.email}</div>}
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Adresse *
                </label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  style={errors.address ? inputErrorStyle : inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, errors.address ? inputErrorStyle : inputStyle)}
                />
                {errors.address && <div style={errorStyle}>⚠️ {errors.address}</div>}
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "1rem",
                marginBottom: "2rem"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    style={errors.city ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.city ? inputErrorStyle : inputStyle)}
                  />
                  {errors.city && <div style={errorStyle}>⚠️ {errors.city}</div>}
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                    style={errors.postalCode ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.postalCode ? inputErrorStyle : inputStyle)}
                  />
                  {errors.postalCode && <div style={errorStyle}>⚠️ {errors.postalCode}</div>}
                </div>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "flex-end"
              }}>
                <button
                  onClick={handleNextStep}
                  style={primaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
                  }}
                >
                  Continuer → Paiement
                </button>
              </div>
            </div>
          )}

          {/* Étape 2: Paiement */}
          {currentStep === 2 && (
            <div>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "2rem"
              }}>
                💳 Informations de paiement
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Numéro de carte *
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  style={errors.cardNumber ? inputErrorStyle : inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, errors.cardNumber ? inputErrorStyle : inputStyle)}
                />
                {errors.cardNumber && <div style={errorStyle}>⚠️ {errors.cardNumber}</div>}
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Date d'expiration *
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    style={errors.expiryDate ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.expiryDate ? inputErrorStyle : inputStyle)}
                  />
                  {errors.expiryDate && <div style={errorStyle}>⚠️ {errors.expiryDate}</div>}
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    CVV *
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    style={errors.cvv ? inputErrorStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, errors.cvv ? inputErrorStyle : inputStyle)}
                  />
                  {errors.cvv && <div style={errorStyle}>⚠️ {errors.cvv}</div>}
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Nom sur la carte *
                </label>
                <input
                  type="text"
                  value={paymentInfo.cardName}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                  style={errors.cardName ? inputErrorStyle : inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, errors.cardName ? inputErrorStyle : inputStyle)}
                />
                {errors.cardName && <div style={errorStyle}>⚠️ {errors.cardName}</div>}
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem"
              }}>
                <button
                  onClick={handlePreviousStep}
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#2563eb";
                    e.target.style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.color = "#475569";
                  }}
                >
                  ← Retour
                </button>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  style={{
                    ...primaryButtonStyle,
                    background: isProcessing 
                      ? "linear-gradient(135deg, #94a3b8, #64748b)" 
                      : "linear-gradient(135deg, #10b981, #059669)",
                    cursor: isProcessing ? "not-allowed" : "pointer"
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcessing) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
                    }
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }}></div>
                      Traitement...
                    </>
                  ) : (
                    "🔒 Finaliser la commande"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Colonne de droite - Résumé de commande */}
        <div style={rightColumnStyle}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "2rem"
          }}>
            📋 Résumé de commande
          </h3>

          <div style={{ marginBottom: "2rem" }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 0",
                borderBottom: "1px solid #e2e8f0"
              }}>
                <div>
                  <h4 style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: "0 0 0.25rem 0"
                  }}>
                    {item.name}
                  </h4>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "#64748b",
                    margin: 0
                  }}>
                    Quantité: {item.quantity}
                  </p>
                </div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#2563eb"
                }}>
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#64748b" }}>Sous-total:</span>
              <span style={{ fontWeight: "600" }}>{total.toFixed(2)} €</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#64748b" }}>Livraison:</span>
              <span style={{ fontWeight: "600", color: shipping === 0 ? "#10b981" : "#1e293b" }}>
                {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#64748b" }}>TVA (20%):</span>
              <span style={{ fontWeight: "600" }}>{tax.toFixed(2)} €</span>
            </div>
            <hr style={{ margin: "1rem 0", border: "none", borderTop: "2px solid #e2e8f0" }} />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1e293b"
            }}>
              <span>Total:</span>
              <span>{finalTotal.toFixed(2)} €</span>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #93c5fd",
            textAlign: "center"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              fontSize: "0.875rem",
              color: "#1e40af",
              fontWeight: "500"
            }}>
              <span>🔒 Paiement sécurisé</span>
              <span>🚚 Livraison rapide</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .right-column {
            position: static !important;
          }
          
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .button-group {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Checkout;