import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} style={{ marginBottom: "1.5rem" }}>
                <strong>{item.name}</strong> - {item.price} € <br />
                Quantité :
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  style={{ margin: "0 0.5rem" }}
                >
                  –
                </button>
                {item.quantity}
                <button
                  onClick={() => increaseQuantity(item._id)}
                  style={{ margin: "0 0.5rem" }}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "crimson",
                    color: "white",
                    border: "none",
                    padding: "0.4rem 0.7rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <hr style={{ margin: "2rem 0" }} />
          <h3>Total : {total.toFixed(2)} €</h3>

          {/* ✅ Bouton vers la page de commande */}
          <Link to="/checkout">
            <button
              style={{
                marginTop: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Passer à la commande
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
