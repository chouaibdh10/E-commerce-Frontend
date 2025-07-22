function About() {
  return (
    <div className="about-container">
      <h1>À propos de nous</h1>
      <p>
        Bienvenue sur notre boutique en ligne ! <br />
        Nous sommes passionnés par les produits de qualité et nous mettons tout en œuvre pour vous offrir la meilleure expérience possible.
      </p>

      <h2>Notre mission</h2>
      <p>
        Fournir des produits exceptionnels, un service client irréprochable et une plateforme simple et agréable à utiliser.
      </p>

      <h2>Notre équipe</h2>
      <p>
        Une équipe jeune et motivée, composée de développeurs, designers et passionnés de e-commerce.
      </p>

      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 3rem auto;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        h1 {
          font-size: 2rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        h2 {
          margin-top: 2rem;
          font-size: 1.5rem;
          color: #2563eb;
        }

        p {
          font-size: 1rem;
          line-height: 1.7;
          color: #374151;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default About;
