import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => setIsRegister(!isRegister);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      name: email.split("@")[0],
    };

    console.log(isRegister ? "Inscription :" : "Connexion :", email, password);
    login(userData);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? "Créer un compte" : "Connexion"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Adresse email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password"
                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
        <p className="toggle-text">
          {isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button onClick={toggleForm} className="toggle-button">
            {isRegister ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
        }

        .login-card h2 {
          color: #333;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .login-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s;
        }

        .login-input:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        .password-field {
          position: relative;
        }

        .show-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 5px;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background-color: #4a90e2;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-button:hover {
          background-color: #3a7bc8;
        }

        .toggle-text {
          text-align: center;
          margin-top: 1.5rem;
          color: #666;
        }

        .toggle-button {
          background: none;
          border: none;
          color: #4a90e2;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-left: 5px;
        }

        .toggle-button:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem;
          }
          
          .login-card h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .login-form {
            gap: 1rem;
          }
          
          .login-input {
            padding: 12px 14px;
          }
          
          .login-button {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginRegister;