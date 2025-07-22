import { useState, useEffect } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animation séquentielle des sections
    const timer = setInterval(() => {
      setActiveSection(prev => (prev < 3 ? prev + 1 : prev));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const teamMembers = [
    {
      name: "Marie Dubois",
      role: "CEO & Fondatrice",
      emoji: "👩‍💼",
      description: "Visionnaire passionnée par l'innovation"
    },
    {
      name: "Thomas Martin",
      role: "Développeur Lead",
      emoji: "👨‍💻",
      description: "Expert en technologies web modernes"
    },
    {
      name: "Sophie Laurent",
      role: "Designer UX/UI",
      emoji: "🎨",
      description: "Créatrice d'expériences utilisateur exceptionnelles"
    },
    {
      name: "Lucas Bernard",
      role: "Responsable E-commerce",
      emoji: "📊",
      description: "Spécialiste en stratégie commerciale digitale"
    }
  ];

  const stats = [
    { number: "10K+", label: "Clients satisfaits", icon: "😊" },
    { number: "500+", label: "Produits disponibles", icon: "📦" },
    { number: "99%", label: "Taux de satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support client", icon: "🛟" }
  ];

  return (
    <div className="about-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className={`main-title ${isVisible ? 'visible' : ''}`}>
            À propos de nous
          </h1>
          <p className={`hero-description ${activeSection >= 1 ? 'visible' : ''}`}>
            Bienvenue sur notre boutique en ligne ! <br />
            Nous sommes passionnés par les produits de qualité et nous mettons tout en œuvre 
            pour vous offrir la meilleure expérience possible.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="floating-element element-1">✨</div>
          <div className="floating-element element-2">🛍️</div>
          <div className="floating-element element-3">💎</div>
        </div>
      </div>

      <div className="content-container">
        {/* Section Mission */}
        <section className={`content-section ${activeSection >= 2 ? 'visible' : ''}`}>
          <div className="section-header">
            <div className="section-icon">🎯</div>
            <h2>Notre mission</h2>
          </div>
          <div className="mission-card">
            <p>
              Fournir des produits exceptionnels, un service client irréprochable et une plateforme 
              simple et agréable à utiliser. Nous croyons que chaque interaction doit être mémorable 
              et que la qualité ne doit jamais être compromise.
            </p>
            <div className="mission-highlights">
              <div className="highlight">
                <span className="highlight-icon">🏆</span>
                <span>Excellence</span>
              </div>
              <div className="highlight">
                <span className="highlight-icon">🤝</span>
                <span>Confiance</span>
              </div>
              <div className="highlight">
                <span className="highlight-icon">💡</span>
                <span>Innovation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Statistiques */}
        <section className={`stats-section ${activeSection >= 3 ? 'visible' : ''}`}>
          <h2>Nos chiffres parlent d'eux-mêmes</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Équipe */}
        <section className="team-section">
          <div className="section-header">
            <div className="section-icon">👥</div>
            <h2>Notre équipe</h2>
          </div>
          <p className="team-intro">
            Une équipe jeune et motivée, composée de développeurs, designers et passionnés de e-commerce, 
            tous unis par la même vision : créer la meilleure expérience d'achat en ligne.
          </p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="member-avatar">{member.emoji}</div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Valeurs */}
        <section className="values-section">
          <h2>Nos valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Durabilité</h3>
              <p>Nous privilégions des produits respectueux de l'environnement et des pratiques éthiques.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Nous restons à la pointe de la technologie pour améliorer constamment votre expérience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Passion</h3>
              <p>Chaque membre de notre équipe met son cœur dans ce qu'il fait pour vous servir au mieux.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Prêt à découvrir nos produits ?</h2>
            <p>Explorez notre catalogue et trouvez les produits qui vous correspondent</p>
            <button className="cta-button">
              <span>Découvrir la boutique</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-section {
          position: relative;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
          color: rgba(255, 255, 255, 0.9);
        }

        .hero-description.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .element-3 {
          top: 30%;
          right: 25%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .content-section {
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .content-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .section-icon {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          padding: 1rem;
          border-radius: 16px;
          border: 2px solid #93c5fd;
        }

        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mission-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .mission-card p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 2rem;
        }

        .mission-highlights {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .highlight {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-weight: 600;
          color: #1e293b;
        }

        .highlight-icon {
          font-size: 1.5rem;
        }

        .stats-section {
          text-align: center;
          margin: 5rem 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stats-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-section h2 {
          margin-bottom: 3rem;
          text-align: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat-card {
          background: white;
          padding: 2.5rem 1.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s ease;
          animation: slideUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 500;
        }

        .team-section {
          margin: 5rem 0;
        }

        .team-intro {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #475569;
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .team-card {
          background: white;
          padding: 2.5rem 1.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s ease;
          animation: slideUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .member-avatar {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border: 3px solid #93c5fd;
        }

        .member-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .member-role {
          font-size: 1.1rem;
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .member-description {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.6;
        }

        .values-section {
          margin: 5rem 0;
          text-align: center;
        }

        .values-section h2 {
          margin-bottom: 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .value-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .value-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .value-card p {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
        }

        .cta-section {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          padding: 4rem 2rem;
          border-radius: 24px;
          text-align: center;
          margin-top: 5rem;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 1rem;
          -webkit-text-fill-color: white;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-button {
          background: white;
          color: #2563eb;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        }

        .button-arrow {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .button-arrow {
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }

          .hero-section {
            padding: 3rem 1rem;
          }

          .content-container {
            padding: 2rem 1rem;
          }

          .mission-highlights {
            flex-direction: column;
            align-items: center;
          }

          .stats-grid,
          .team-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default About;