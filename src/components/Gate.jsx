import "../styles/Gate.css";

function Gate({ isOpen }) {
  return (
    <div className="gate-container">

      <h2> Smart Parking Gate</h2>

      <div className="traffic-light">
        <div className={`light red ${!isOpen ? "active" : ""}`}></div>
        <div className={`light green ${isOpen ? "active" : ""}`}></div>
      </div>

      <div className="gate-area">

        <div className={`gate-arm ${isOpen ? "open" : ""}`}></div>

      </div>

      <p className="gate-status">
        {isOpen ? "🟢 Gate Open" : "🔴 Gate Closed"}
      </p>

    </div>
  );
}

export default Gate;