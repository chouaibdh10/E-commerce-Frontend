import { useState, useEffect } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%)",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            marginBottom: "1rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            background: "linear-gradient(135deg, #ffffff, #e0e7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            🛍️ Nos produits
          </h1>
          <p style={{
            fontSize: "1.25rem",
            opacity: isVisible ? 0.9 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.3s",
            marginBottom: "2rem"
          }}>
            Découvrez notre sélection de produits de qualité
          </p>
        </div>
        
        {/* Éléments décoratifs */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          fontSize: "2rem",
          animation: "float 6s ease-in-out infinite"
        }}>✨</div>
        <div style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          fontSize: "2rem",
          animation: "float 6s ease-in-out infinite 2s"
        }}>🎁</div>
        <div style={{
          position: "absolute",
          top: "30%",
          right: "25%",
          fontSize: "2rem",
          animation: "float 6s ease-in-out infinite 4s"
        }}>💎</div>
      </div>

      {/* Contenu principal */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "3rem 2rem"
      }}>
        {/* Statistiques */}
        <div style={{
          background: "white",
          padding: "1.5rem 2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          marginBottom: "3rem",
          border: "1px solid #e2e8f0",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}>
              <span style={{ fontSize: "1.5rem" }}>📦</span>
              <span style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#1e293b"
              }}>
                {products.length} produits disponibles
              </span>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#1e40af",
              border: "1px solid #93c5fd"
            }}>
              Livraison gratuite dès 50€
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
          justifyItems: "center"
        }}>
          {products.map((product, index) => (
            <div
              key={product._id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${index * 0.1}s`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Section Call to Action */}
        <div style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          padding: "3rem 2rem",
          borderRadius: "20px",
          textAlign: "center",
          marginTop: "4rem",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "relative",
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "white"
            }}>
              🎉 Offre spéciale !
            </h2>
            <p style={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              color: "rgba(255, 255, 255, 0.9)"
            }}>
              Profitez de la livraison gratuite sur toutes vos commandes
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}>
                <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>🚚</span>
                Livraison rapide
              </div>
              <div style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}>
                <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>💳</span>
                Paiement sécurisé
              </div>
              <div style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}>
                <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>🔄</span>
                Retour gratuit
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(10deg); 
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-section {
            padding: 3rem 1rem !important;
          }
          
          .main-content {
            padding: 2rem 1rem !important;
          }
          
          .products-grid {
            grid-template-columns: 1fr !important;
          }
          
          .stats-flex {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .cta-features {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;