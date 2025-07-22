import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Nos produits</h1>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
