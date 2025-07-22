import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (isRegister && password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulation d'une requête API
    setTimeout(() => {
      const userData = {
        email,
        name: email.split("@")[0],
        id: Date.now()
      };

      console.log(isRegister ? "Inscription :" : "Connexion :", email, password);
      login(userData);
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden"
  };

  const backgroundDecorationStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
    `,
    pointerEvents: "none"
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
    padding: "3rem",
    width: "100%",
    maxWidth: "450px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    zIndex: 2
  };

  const titleStyle = {
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "2.5rem",
    fontSize: "2.2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  };

  const inputGroupStyle = {
    marginBottom: "0.5rem"
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "rgba(248, 250, 252, 0.8)",
    backdropFilter: "blur(10px)",
    boxSizing: "border-box"
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#667eea",
    boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
    background: "rgba(255, 255, 255, 0.9)"
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: "#ef4444",
    boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.1)"
  };

  const passwordFieldStyle = {
    position: "relative"
  };

  const showPasswordButtonStyle = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    padding: "8px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    color: "#64748b"
  };

  const showPasswordButtonHoverStyle = {
    ...showPasswordButtonStyle,
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea"
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "white",
    background: isLoading 
      ? "linear-gradient(135deg, #94a3b8, #64748b)" 
      : "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    borderRadius: "12px",
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1rem"
  };

  const submitButtonHoverStyle = {
    ...submitButtonStyle,
    transform: isLoading ? "none" : "translateY(-2px)",
    boxShadow: isLoading ? "0 8px 25px rgba(102, 126, 234, 0.3)" : "0 12px 35px rgba(102, 126, 234, 0.4)"
  };

  const errorStyle = {
    color: "#ef4444",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  };

  const toggleTextStyle = {
    textAlign: "center",
    marginTop: "2rem",
    color: "#64748b",
    fontSize: "1rem"
  };

  const toggleButtonStyle = {
    background: "none",
    border: "none",
    color: "#667eea",
    fontWeight: "700",
    cursor: "pointer",
    padding: "0",
    marginLeft: "5px",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    borderRadius: "4px",
    
  };

  const toggleButtonHoverStyle = {
    ...toggleButtonStyle,
    background: "rgba(102, 126, 234, 0.1)",
    transform: "translateY(-1px)"
  };

  const spinnerStyle = {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundDecorationStyle}></div>
      
      {/* Éléments décoratifs flottants */}
      <div style={{
        position: "absolute",
        top: "15%",
        left: "10%",
        fontSize: "2rem",
        opacity: "0.6",
        animation: "float 6s ease-in-out infinite"
      }}>🔐</div>
      <div style={{
        position: "absolute",
        top: "70%",
        right: "15%",
        fontSize: "2rem",
        opacity: "0.6",
        animation: "float 6s ease-in-out infinite 2s"
      }}>✨</div>
      <div style={{
        position: "absolute",
        top: "25%",
        right: "20%",
        fontSize: "2rem",
        opacity: "0.6",
        animation: "float 6s ease-in-out infinite 4s"
      }}>🛡️</div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {isRegister ? "🚀 Créer un compte" : "👋 Connexion"}
        </h2>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <input
              type="email"
              placeholder="✉️ Adresse email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={errors.email ? inputErrorStyle : inputStyle}
              onFocus={(e) => {
                if (!errors.email) {
                  Object.assign(e.target.style, inputFocusStyle);
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  Object.assign(e.target.style, inputStyle);
                }
              }}
            />
            {errors.email && (
              <div style={errorStyle}>
                ⚠️ {errors.email}
              </div>
            )}
          </div>

          <div style={inputGroupStyle}>
            <div style={passwordFieldStyle}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="🔒 Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={errors.password ? inputErrorStyle : inputStyle}
                onFocus={(e) => {
                  if (!errors.password) {
                    Object.assign(e.target.style, inputFocusStyle);
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    Object.assign(e.target.style, inputStyle);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={showPasswordButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, showPasswordButtonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, showPasswordButtonStyle)}
                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <div style={errorStyle}>
                ⚠️ {errors.password}
              </div>
            )}
          </div>

          {isRegister && (
            <div style={inputGroupStyle}>
              <div style={passwordFieldStyle}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="🔒 Confirmer le mot de passe"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={errors.confirmPassword ? inputErrorStyle : inputStyle}
                  onFocus={(e) => {
                    if (!errors.confirmPassword) {
                      Object.assign(e.target.style, inputFocusStyle);
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.confirmPassword) {
                      Object.assign(e.target.style, inputStyle);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={showPasswordButtonStyle}
                  onMouseEnter={(e) => Object.assign(e.target.style, showPasswordButtonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.target.style, showPasswordButtonStyle)}
                  aria-label={showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={errorStyle}>
                  ⚠️ {errors.confirmPassword}
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={submitButtonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                Object.assign(e.target.style, submitButtonHoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, submitButtonStyle);
            }}
          >
            {isLoading ? (
              <>
                <div style={spinnerStyle}></div>
                {isRegister ? "Création en cours..." : "Connexion en cours..."}
              </>
            ) : (
              <>
                {isRegister ? "🚀 S'inscrire" : "🔑 Se connecter"}
              </>
            )}
          </button>
        </form>

        <p style={toggleTextStyle}>
          {isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button 
            onClick={toggleForm} 
            style={toggleButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, toggleButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, toggleButtonStyle)}
          >
            {isRegister ? "Se connecter" : "S'inscrire"}
          </button>
        </p>

        {/* Indicateurs de sécurité */}
        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "rgba(16, 185, 129, 0.1)",
          borderRadius: "12px",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            fontSize: "0.875rem",
            color: "#059669",
            fontWeight: "500"
          }}>
            <span>🔒 Sécurisé</span>
            <span>🛡️ Chiffré</span>
            <span>✅ Confidentiel</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(10deg); 
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem !important;
            margin: 1rem !important;
          }
          
          .login-card h2 {
            font-size: 1.8rem !important;
            margin-bottom: 2rem !important;
          }
          
          .login-form {
            gap: 1.25rem !important;
          }
          
          .login-input {
            padding: 14px 18px !important;
          }
          
          .login-button {
            padding: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginRegister;